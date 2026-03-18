import Link from "next/link"
import { 
  LayoutDashboard, ShoppingBag, Users, Settings, LogOut, Tags, 
  MessageSquare, Star, Ticket, Percent, Truck, Image as ImageIcon, 
  Files, Search, Bell, History, ShieldCheck, Mail, Briefcase
} from "lucide-react"
import { auth, signOut } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Toaster } from "@/components/admin/Toaster"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/login")
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-950 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-gray-200 dark:border-zinc-800">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
             <div className="w-8 h-8 bg-black dark:bg-white flex items-center justify-center rounded-lg">
                <ShieldCheck className="w-5 h-5 text-white dark:text-black" />
             </div>
             <span className="text-sm font-semibold tracking-[0.2em] text-black dark:text-white uppercase leading-none">
                Admin Panel
             </span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto scrollbar-hide">
          {/* Main */}
          <div>
            <h3 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Overview</h3>
            <div className="space-y-1">
              <NavLink href="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
              <NavLink href="/admin/analytics" icon={Briefcase} label="Reports" />
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Catalog</h3>
            <div className="space-y-1">
              <NavLink href="/admin/products" icon={Tags} label="Products" />
              <NavLink href="/admin/categories" icon={ShoppingBag} label="Collections" />
              <NavLink href="/admin/media" icon={ImageIcon} label="Media Library" />
            </div>
          </div>

          {/* Sales & Operations */}
          <div>
            <h3 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Sales & Operations</h3>
            <div className="space-y-1">
              <NavLink href="/admin/orders" icon={ShoppingBag} label="Orders" />
              <NavLink href="/admin/coupons" icon={Ticket} label="Coupons" />
              <NavLink href="/admin/taxes" icon={Percent} label="Taxes" />
              <NavLink href="/admin/shipping" icon={Truck} label="Shipping" />
            </div>
          </div>

          {/* Customer Focus */}
          <div>
            <h3 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Customers</h3>
            <div className="space-y-1">
              <NavLink href="/admin/customers" icon={Users} label="Customer List" />
              <NavLink href="/admin/reviews" icon={Star} label="Reviews" />
              <NavLink href="/admin/messages" icon={Mail} label="Inquiries" />
              <NavLink href="/admin/testimonials" icon={MessageSquare} label="Testimonials" />
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Experience</h3>
            <div className="space-y-1">
              <NavLink href="/admin/content" icon={Files} label="Content Manager" />
              <NavLink href="/admin/pages" icon={Files} label="Pages Manager" />
              <NavLink href="/admin/seo" icon={Search} label="SEO Manager" />
            </div>
          </div>

          {/* System */}
          <div>
            <h3 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">System</h3>
            <div className="space-y-1">
              <NavLink href="/admin/settings" icon={Settings} label="Global Settings" />
              <NavLink href="/admin/staff" icon={ShieldCheck} label="Staff Roles" />
              <NavLink href="/admin/logs" icon={History} label="Activity Logs" />
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/50">
           <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-lg bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800">
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold uppercase">
                {session.user?.name?.[0] || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{session.user?.name || 'Admin'}</p>
                <p className="text-[10px] text-gray-500 truncate">Super Administrator</p>
              </div>
           </div>
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <button className="flex w-full items-center px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out Securely
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50/30 dark:bg-zinc-950/30">
        <header className="h-20 flex items-center justify-between px-8 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-light tracking-[0.1em] text-gray-900 dark:text-white uppercase">Control Center</h2>
            <div className="h-4 w-[1px] bg-gray-300 dark:bg-zinc-700 mx-2" />
            <div className="flex items-center text-xs font-medium text-gray-400">
               Live Platform Status: <span className="ml-2 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="p-2 text-gray-400 hover:text-black dark:hover:text-white relative">
               <Bell className="w-5 h-5" />
               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
            </button>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
               {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </div>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto min-h-[calc(100vh-5rem)] pb-24">
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  )
}

function NavLink({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
  // A real app would check if current path matches href
  return (
    <Link 
      href={href} 
      className="group flex items-center px-3 py-2 text-[13px] font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
    >
      <Icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
      {label}
    </Link>
  )
}

