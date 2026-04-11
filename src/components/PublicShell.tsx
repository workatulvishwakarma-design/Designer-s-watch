"use client"

import { usePathname } from "next/navigation"
import SmoothScrolling from "./SmoothScrolling"

export function PublicShell({ 
  children,
  header,
  footer,
  announcement,
  cartDrawer,
  customCursor,
}: {
  children: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
  announcement: React.ReactNode | null
  cartDrawer: React.ReactNode
  customCursor: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  // Admin routes render ONLY children — no public chrome
  if (isAdmin) {
    return <>{children}</>
  }

  // Public routes render full website shell
  return (
    <>
      {customCursor}
      {announcement}
      {header}
      {cartDrawer}
      <SmoothScrolling>
        {children}
      </SmoothScrolling>
      {footer}
    </>
  )
}
