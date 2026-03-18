import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  providers: [], // Empty for Edge compatibility
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        if (user.id) token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role
        if (token.sub) {
          (session.user as any).id = token.sub
        } else if (token.id) {
          (session.user as any).id = token.id
        }
      }
      return session
    },
  },
  secret: process.env.AUTH_SECRET || "fallback_secret_for_local_dev_only",
} satisfies NextAuthConfig
