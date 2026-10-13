import { NextResponse } from "next/server"
import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config" // NextAuth edge configuration

const { auth } = NextAuth(authConfig)

// Set to true to lock down the whole website to only the Under Construction page
const IS_UNDER_CONSTRUCTION = true;

// Define paths that require different access levels
const ADMIN_PATHS = ["/admin"]
const USER_PATHS = ["/account", "/checkout"]
const AUTH_PATHS = ["/login", "/signup", "/forgot-password"]

export async function proxy(req: any) {
  const { nextUrl } = req
  const pathname = nextUrl.pathname

  // 1. UNDER CONSTRUCTION LOCKDOWN
  // If active, every page (collections, products, checkout, etc.) redirects to /
  if (IS_UNDER_CONSTRUCTION) {
    if (pathname === "/") return NextResponse.next()

    const isSystemOrAdmin =
      pathname.startsWith("/admin") ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/_next")

    if (!isSystemOrAdmin) {
      return NextResponse.redirect(new URL("/", nextUrl))
    }
  }
  
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
  const isAdminRoute = ADMIN_PATHS.some((path) => nextUrl.pathname.startsWith(path))
  const isUserRoute = USER_PATHS.some((path) => nextUrl.pathname.startsWith(path))
  const isAuthRoute = AUTH_PATHS.some((path) => nextUrl.pathname.startsWith(path))

  // Allow next-auth API routes immediately
  if (isApiAuthRoute) return NextResponse.next()

  // Only call auth() if we are dealing with a route that needs it
  if (isAdminRoute || isUserRoute || isAuthRoute) {
    const session = await auth()
    const isLoggedIn = !!session?.user
    const role = (session?.user as any)?.role

    // Prevent logged-in users from accessing login/signup pages
    if (isAuthRoute) {
      if (isLoggedIn) {
        // Respect callbackUrl if it exists and is a valid relative path
        const callbackUrl = nextUrl.searchParams.get("callbackUrl")
        if (callbackUrl && callbackUrl.startsWith("/")) {
          return NextResponse.redirect(new URL(callbackUrl, nextUrl))
        }

        if (role === "ADMIN") {
          return NextResponse.redirect(new URL("/admin/dashboard", nextUrl))
        }
        return NextResponse.redirect(new URL("/account/profile", nextUrl))
      }
      return NextResponse.next()
    }

    // Protect Admin Routes
    if (isAdminRoute) {
      if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login?callbackUrl=" + nextUrl.pathname, nextUrl))
      }
      if (role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", nextUrl))
      }
      return NextResponse.next()
    }

    // Protect User Accounts Routes
    if (isUserRoute) {
      if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login?callbackUrl=" + nextUrl.pathname, nextUrl))
      }
      return NextResponse.next()
    }
  }

  // Allow all other public routes without calling auth()
  return NextResponse.next()
}

// Configure the matcher to run on necessary routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
}
