import Link from "next/link"
export const dynamic = "force-dynamic"
import { 
  LayoutDashboard, ShoppingBag, Users, Settings, LogOut, Tags, 
  MessageSquare, Star, Ticket, Percent, Truck, Image as ImageIcon, 
  Files, Search, Bell, History, ShieldCheck, Mail, Briefcase, MapPin
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
    <div className="admin-shell flex h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 bg-white border-r border-slate-200/90 flex flex-col shadow-[1px_0_4px_rgba(0,0,0,0.02)]">
        {/* Brand Header */}
        <div className="h-20 flex items-center px-6 border-b border-slate-100 bg-white">
          <Link href="/admin/dashboard" className="flex items-center gap-3.5 group">
             <div className="w-9 h-9 bg-slate-950 flex items-center justify-center rounded-xl shadow-xs group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-white" />
             </div>
             <div className="flex flex-col">
                <span className="text-xs font-bold tracking-[0.2em] text-slate-900 uppercase leading-none font-montserrat">
                   Designer World
                </span>
                <span className="text-[10px] font-semibold tracking-[0.12em] text-slate-400 uppercase mt-1">
                   Admin Panel
                </span>
             </div>
          </Link>
        </div>
        
        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto scrollbar-hide">
          {/* Main */}
          <div>
            <h3 className="px-3 text-[10.5px] font-bold text-slate-400 uppercase tracking-widest mb-2">Overview</h3>
            <div className="space-y-1">
              <NavLink href="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
              <NavLink href="/admin/analytics" icon={Briefcase} label="Reports & Analytics" />
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="px-3 text-[10.5px] font-bold text-slate-400 uppercase tracking-widest mb-2">Catalog</h3>
            <div className="space-y-1">
              <NavLink href="/admin/products" icon={Tags} label="Products" />
              <NavLink href="/admin/categories" icon={ShoppingBag} label="Collections" />
              <NavLink href="/admin/stores" icon={MapPin} label="Stores & Dealers" />
              <NavLink href="/admin/media" icon={ImageIcon} label="Media Library" />
              <NavLink href="/admin/image-audit" icon={ImageIcon} label="Image Audit" />
            </div>
          </div>

          {/* Sales & Operations */}
          <div>
            <h3 className="px-3 text-[10.5px] font-bold text-slate-400 uppercase tracking-widest mb-2">Sales & Operations</h3>
            <div className="space-y-1">
              <NavLink href="/admin/orders" icon={ShoppingBag} label="Orders" />
              <NavLink href="/admin/coupons" icon={Ticket} label="Coupons" />
              <NavLink href="/admin/taxes" icon={Percent} label="Taxes" />
              <NavLink href="/admin/shipping" icon={Truck} label="Shipping" />
            </div>
          </div>

          {/* Customer Focus */}
          <div>
            <h3 className="px-3 text-[10.5px] font-bold text-slate-400 uppercase tracking-widest mb-2">Customers</h3>
            <div className="space-y-1">
              <NavLink href="/admin/customers" icon={Users} label="Customer List" />
              <NavLink href="/admin/reviews" icon={Star} label="Reviews" />
              <NavLink href="/admin/messages" icon={Mail} label="Inquiries" />
              <NavLink href="/admin/testimonials" icon={MessageSquare} label="Testimonials" />
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="px-3 text-[10.5px] font-bold text-slate-400 uppercase tracking-widest mb-2">Experience</h3>
            <div className="space-y-1">
              <NavLink href="/admin/content" icon={Files} label="Content Manager" />
              <NavLink href="/admin/pages" icon={Files} label="Pages Manager" />
              <NavLink href="/admin/seo" icon={Search} label="SEO Manager" />
            </div>
          </div>

          {/* System */}
          <div>
            <h3 className="px-3 text-[10.5px] font-bold text-slate-400 uppercase tracking-widest mb-2">System</h3>
            <div className="space-y-1">
              <NavLink href="/admin/settings" icon={Settings} label="Global Settings" />
              <NavLink href="/admin/staff" icon={ShieldCheck} label="Staff Roles" />
              <NavLink href="/admin/logs" icon={History} label="Activity Logs" />
            </div>
          </div>
        </nav>

        {/* User Card & Sign Out */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70">
           <div className="flex items-center gap-3 px-3 py-2.5 mb-2.5 rounded-xl bg-white shadow-2xs border border-slate-200/70">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold uppercase shadow-2xs">
                {session.user?.name?.[0] || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{session.user?.name || 'Administrator'}</p>
                <p className="text-[10px] font-medium text-slate-400 truncate">Super Administrator</p>
              </div>
           </div>
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <button className="flex w-full items-center justify-center px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200/60 transition-all cursor-pointer">
              <LogOut className="mr-2 h-3.5 w-3.5" />
              Sign Out Securely
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
        {/* Sticky Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-4">
            <h2 className="text-xs font-bold tracking-[0.18em] text-slate-900 uppercase">Control Center</h2>
            <div className="h-4 w-[1px] bg-slate-200 mx-1" />
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[11px] font-semibold text-emerald-700">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               Live Platform
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg shadow-2xs">
               {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </header>

        {/* Page Inner Container */}
        <div className="p-8 max-w-7xl mx-auto min-h-[calc(100vh-5rem)] pb-24">
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  )
}

function NavLink({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link 
      href={href} 
      className="group flex items-center px-3 py-2 text-[13px] font-medium rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-all duration-150"
    >
      <Icon className="mr-3 h-4 w-4 text-slate-400 group-hover:text-slate-900 transition-colors" strokeWidth={1.75} />
      <span>{label}</span>
    </Link>
  )
}
