"use client"

import { usePathname } from "next/navigation"
import SmoothScrolling from "./SmoothScrolling"
import ChatbotWidget from "./ui/ChatbotWidget"

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
  const isStandalone = pathname === "/about-2"

  // Admin and standalone custom layout routes render ONLY children — no default public header/footer
  if (isAdmin || isStandalone) {
    return <>{children}</>
  }

  // Public routes render full website shell
  return (
    <>
      {customCursor}
      {announcement}
      {header}
      {cartDrawer}
      <ChatbotWidget />
      <SmoothScrolling>
        {children}
      </SmoothScrolling>
      {footer}
    </>
  )
}
