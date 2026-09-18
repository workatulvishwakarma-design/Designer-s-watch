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
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const parsedCredentials = credentialsSchema.safeParse(credentials)

          if (!parsedCredentials.success) {
            return null;
          }

          const { email, password } = parsedCredentials.data
          
          let user;
          try {
            user = await prisma.user.findUnique({
              where: { email },
            })
          } catch (dbError) {
            console.error("Database connection error during authorize:", dbError);
            return null;
          }

          if (!user) {
            return null;
          }

          if (!user.passwordHash) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.passwordHash)

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
