import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import { z } from "zod"

// Validate credentials using zod
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const rawEmail = typeof credentials?.email === "string" ? credentials.email.trim().toLowerCase() : ""
          const rawPassword = typeof credentials?.password === "string" ? credentials.password : ""

          if (!rawEmail || !rawPassword) {
            return null;
          }

          const parsedCredentials = credentialsSchema.safeParse({
            email: rawEmail,
            password: rawPassword,
          })

          if (!parsedCredentials.success) {
            return null;
          }

          const { email, password } = parsedCredentials.data
          
          let user;
          try {
            user = await prisma.user.findFirst({
              where: {
                email: {
                  equals: email,
                  mode: "insensitive",
                },
              },
            })
          } catch (dbError) {
            console.error("Database connection error during authorize:", dbError);
            return null;
          }

          if (!user || !user.passwordHash) {
            return null;
          }

          let passwordsMatch = await bcrypt.compare(password, user.passwordHash)
          if (!passwordsMatch && password.trim() !== password) {
            passwordsMatch = await bcrypt.compare(password.trim(), user.passwordHash)
          }

          if (passwordsMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: (user as any).role || "USER",
            }
          }

          return null;
        } catch (error) {
          console.error("Authorize function error:", error);
          return null;
        }
      },
    }),
  ],
})
