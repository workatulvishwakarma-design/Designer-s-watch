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
        console.log("NextAuth Authorize start:", { email: credentials?.email });
        
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }

          const parsedCredentials = credentialsSchema.safeParse(credentials)

          if (!parsedCredentials.success) {
            console.log("Zod validation failed:", parsedCredentials.error.issues);
            return null;
          }

          const { email, password } = parsedCredentials.data

          console.log("Attempting database lookup for:", email);
          
          let user;
          try {
            user = await prisma.user.findUnique({
              where: { email },
            })
          } catch (dbError) {
            console.error("Database connection error during authorize:", dbError);
            // Don't throw here, just return null so Auth.js handles it as a login failure
            return null;
          }

          if (!user) {
            console.log("No user found with email:", email);
            return null;
          }

          if (!user.passwordHash) {
            console.log("User has no password hash (maybe social login only)");
            return null;
          }

          console.log("Comparing password for user:", user.id);
          const passwordsMatch = await bcrypt.compare(password, user.passwordHash)

          if (passwordsMatch) {
            console.log("Login successful for user:", user.id);
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: (user as any).role || "USER",
            }
          }

          console.log("Invalid password for user:", email);
          return null;
        } catch (error) {
          console.error("Authorize function crashed:", error);
          return null;
        }
      },
    }),
  ],
})
