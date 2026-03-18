"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Package, Heart, MapPin, LogOut } from "lucide-react"

export function AccountNav({ signOutAction }: { signOutAction: () => Promise<void> }) {
  const pathname = usePathname()

  const links = [
    { href: "/account/profile", label: "Profile Details", icon: User },
    { href: "/account/orders", label: "Your Orders", icon: Package },
    { href: "/account/wishlist", label: "Wishlist", icon: Heart },
    { href: "/account/addresses", label: "Addresses", icon: MapPin },
  ]

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href || (link.href !== "/account/profile" && pathname.startsWith(link.href))
          
          return (
            <Link 
              key={link.href}
              href={link.href} 
              className={`flex items-center px-5 py-4 text-[11px] font-body tracking-[0.2em] uppercase rounded-xl transition-all duration-300 ${
                isActive 
                  ? "bg-[#1A1918] text-white shadow-lg shadow-black/5" 
                  : "text-[#5C5752] hover:bg-[#FAF8F4] hover:text-[#B8935A] border border-transparent hover:border-[#E8E0D5]"
              }`}
            >
              <Icon className="mr-4 h-4 w-4 opacity-70" />
              {link.label}
            </Link>
          )
        })}
        
        <div className="pt-6 mt-6 border-t border-[#E8E0D5]">
          <form action={signOutAction}>
            <button className="flex w-full items-center px-5 py-4 text-[11px] font-body tracking-[0.2em] uppercase rounded-xl text-red-500 hover:bg-red-50 transition-all duration-300 group">
              <LogOut className="mr-4 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              Secure Sign Out
            </button>
          </form>
        </div>
      </nav>
    </aside>
  )
}
