import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  providers: [], // Empty for Edge compatibility
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        console.log("JWT callback - User detected:", { id: user.id, role: (user as any).role });
        token.role = (user as any).role || "USER"
        if (user.id) token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        console.log("Session callback - Token found:", { id: token.id, role: token.role });
        (session.user as any).role = token.role || "USER"
        if (token.sub) {
          (session.user as any).id = token.sub
        } else if (token.id) {
          (session.user as any).id = token.id
        }
      }
      return session
    },
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
} satisfies NextAuthConfig
