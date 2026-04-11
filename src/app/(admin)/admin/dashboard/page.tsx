import { prisma } from "@/lib/db"
import { DollarSign, ShoppingBag, Users as UsersIcon, Clock, PackageCheck, AlertTriangle, Mail, Ticket, ShoppingCart, TrendingUp, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { DashboardCharts } from "@/components/admin/DashboardCharts"
import { Badge } from "@/components/admin/Badge"

export default async function AdminDashboardPage() {
  const oneYearAgo = new Date();
  oneYearAgo.setDate(oneYearAgo.getDate() - 365);
  const thisMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  const [
    totalProducts, 
    totalOrders, 
    totalCustomers,
    recentOrders,
    pendingOrders,
    revenueAgg,
    rawOrders,
    topSellersAgg,
    lowStockProducts,
    pendingInquiries,
    newCustomersThisMonth,
    activeCoupons,
    couponUsageTotal,
    abandonedCheckouts,
  ] = await Promise.all([
    prisma.product.count({ where: { status: "ACTIVE" } }),
    prisma.order.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.findMany({ take: 7, orderBy: { createdAt: "desc" }, include: { user: true } }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: { notIn: ["CANCELLED", "REFUNDED"] } }
    }),
    prisma.order.findMany({
      where: { status: { notIn: ["CANCELLED", "REFUNDED"] }, createdAt: { gte: oneYearAgo } },
      select: { createdAt: true, totalAmount: true, isCOD: true }
    }),
    prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5
    }),
    prisma.inventory.findMany({
      where: { stock: { lt: 10 } },
      include: { product: { select: { id: true, name: true, price: true } } },
      take: 5,
      orderBy: { stock: "asc" }
    }),
    prisma.contactQuery.count({ where: { status: "PENDING" } }),
    prisma.user.count({
      where: { role: "CUSTOMER", createdAt: { gte: thisMonthStart } }
    }),
    prisma.coupon.count({ where: { isActive: true } }),
    prisma.coupon.aggregate({ _sum: { usedCount: true } }),
    prisma.abandonedCheckout.count({ where: { recovered: false } }).catch(() => 0),
  ])

  // Get product details for top sellers
  const topProductIds = topSellersAgg.map((item: any) => item.productId) || [];
  const topProducts = await prisma.product.findMany({
    where: { id: { in: topProductIds } },
    select: { id: true, name: true, price: true, status: true }
  });

  // Map quantity back
  const topSellingList = topProducts.map(p => ({
    ...p,
    sales: topSellersAgg.find((ts: any) => ts.productId === p.id)?._sum?.quantity || 0
  })).sort((a,b) => b.sales - a.sales);

  const totalRevenue = revenueAgg._sum.totalAmount || 0
  const avgOrderValue = totalOrders > 0 ? Math.round(Number(totalRevenue) / totalOrders) : 0

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:tracking-tight">
          Good Morning, Admin
        </h2>
        <p className="mt-1 text-sm text-gray-500">Here is what is happening with your store today.</p>
      </div>

      {/* Primary Stats — All Clickable */}
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value={`₹${Number(totalRevenue).toLocaleString()}`} icon={DollarSign} href="/admin/analytics" />
        <StatCard title="Pending Orders" value={pendingOrders.toString()} icon={Clock} highlight href="/admin/orders" />
        <StatCard title="Active Products" value={totalProducts.toString()} icon={PackageCheck} href="/admin/products" />
        <StatCard title="Total Customers" value={totalCustomers.toString()} icon={UsersIcon} href="/admin/customers" />
      </dl>

      {/* Secondary Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        <MiniStat label="Avg. Order" value={`₹${avgOrderValue.toLocaleString()}`} href="/admin/analytics" />
        <MiniStat label="New This Month" value={newCustomersThisMonth} href="/admin/customers" />
        <MiniStat label="Low Stock" value={lowStockProducts.length} alert={lowStockProducts.length > 0} href="/admin/analytics" />
        <MiniStat label="Pending Inquiries" value={pendingInquiries} alert={pendingInquiries > 0} href="/admin/messages" />
        <MiniStat label="Active Coupons" value={activeCoupons} href="/admin/coupons" />
        <MiniStat label="Abandoned Carts" value={abandonedCheckouts} alert={abandonedCheckouts > 0} href="/admin/analytics" />
      </div>

      {/* Charts */}
      <div className="mt-8">
        <DashboardCharts orders={rawOrders.map((o: any) => ({ createdAt: o.createdAt, totalAmount: Number(o.totalAmount), isCOD: o.isCOD }))} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mt-8">
        {/* Recent Orders List — Clickable Rows */}
        <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white flex items-center">
              <ShoppingBag className="h-4 w-4 mr-2 text-gray-400" /> Recent Orders
            </h3>
            <Link href="/admin/orders" className="text-sm font-medium text-black dark:text-white hover:underline inline-flex items-center gap-1">
              View All <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="divide-y divide-gray-100 dark:divide-zinc-800">
            {recentOrders.map((order) => (
              <li key={order.id}>
                <Link href={`/admin/orders/${order.id}`} className="flex items-center justify-between px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Order #{order.id.slice(-8).toUpperCase()}</span>
                    <span className="text-xs text-gray-500">{order.user.name || order.user.email}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">₹{Number(order.totalAmount).toLocaleString()}</span>
                    <Badge variant={order.status === "DELIVERED" ? "success" : order.status === "CANCELLED" ? "error" : order.status === "PENDING" ? "warning" : "info"}>
                      {order.status}
                    </Badge>
                  </div>
                </Link>
              </li>
            ))}
            {recentOrders.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-gray-500">No recent orders found.</li>
            )}
          </ul>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" /> Low Stock Alerts
            </h3>
            <Link href="/admin/products" className="text-sm font-medium text-black dark:text-white hover:underline inline-flex items-center gap-1">
              All Products <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="divide-y divide-gray-100 dark:divide-zinc-800">
            {lowStockProducts.map((inv) => (
              <li key={inv.id}>
                <Link href={`/admin/products/${inv.product.id}/edit`} className="flex items-center justify-between px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{inv.product.name}</span>
                    <span className="text-xs text-gray-500">₹{Number(inv.product.price).toLocaleString()}</span>
                  </div>
                  <Badge variant={inv.stock === 0 ? "error" : "warning"}>
                    {inv.stock === 0 ? "Out of Stock" : `${inv.stock} left`}
                  </Badge>
                </Link>
              </li>
            ))}
            {lowStockProducts.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-gray-500">All products are well stocked. ✓</li>
            )}
          </ul>
        </div>

         {/* Quick Actions */}
         <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/products/new" className="flex items-center justify-center p-4 border border-gray-200 dark:border-zinc-800 rounded-lg hover:border-black dark:hover:border-white transition-colors">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Add Product</span>
              </Link>
              <Link href="/admin/categories/new" className="flex items-center justify-center p-4 border border-gray-200 dark:border-zinc-800 rounded-lg hover:border-black dark:hover:border-white transition-colors">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Add Collection</span>
              </Link>
              <Link href="/admin/coupons/new" className="flex items-center justify-center p-4 border border-gray-200 dark:border-zinc-800 rounded-lg hover:border-black dark:hover:border-white transition-colors">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Create Coupon</span>
              </Link>
              <Link href="/admin/settings" className="flex items-center justify-center p-4 border border-gray-200 dark:border-zinc-800 rounded-lg hover:border-black dark:hover:border-white transition-colors">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Store Settings</span>
              </Link>
            </div>
         </div>

         {/* Top Sellers */}
         <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
           <div className="px-4 py-5 sm:px-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
             <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white pb-1 pt-1 flex items-center">
               <TrendingUp className="h-4 w-4 mr-2 text-gray-400" /> Trending Products
             </h3>
             <Link href="/admin/products" className="text-sm font-medium text-black dark:text-white hover:underline inline-flex items-center gap-1">
               View All <ArrowUpRight className="h-3 w-3" />
             </Link>
           </div>
           <ul className="divide-y divide-gray-100 dark:divide-zinc-800">
             {topSellingList.map((product, idx) => (
               <li key={product.id}>
                 <Link href={`/admin/products/${product.id}/edit`} className="flex items-center justify-between px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                   <div className="flex items-center gap-3">
                     <span className="w-7 h-7 bg-gray-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500">{idx + 1}</span>
                     <div className="flex flex-col">
                       <span className="text-sm font-medium text-gray-900 dark:text-white truncate w-48 sm:w-64">{product.name}</span>
                       <span className="text-xs text-gray-500 mt-0.5">₹{Number(product.price).toLocaleString()}</span>
                     </div>
                   </div>
                   <div className="flex flex-col items-end">
                     <span className="text-sm font-semibold text-gray-900 dark:text-white">{product.sales} sold</span>
                     <span className={`text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full mt-1 ${product.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{product.status}</span>
                   </div>
                 </Link>
               </li>
             ))}
             {topSellingList.length === 0 && (
               <li className="px-4 py-8 text-center text-sm text-gray-500">No sales data yet.</li>
             )}
           </ul>
         </div>

      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, highlight = false, href }: any) {
  const content = (
    <div className={`relative overflow-hidden rounded-xl shadow-sm ring-1 ring-gray-900/5 px-4 pb-12 pt-5 sm:px-6 sm:pt-6 group transition-all hover:shadow-md ${highlight ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white dark:bg-zinc-900'}`}>
      <dt>
        <div className={`absolute rounded-md p-3 ${highlight ? 'bg-white/10 dark:bg-black/10' : 'bg-gray-50 dark:bg-zinc-800'}`}>
          <Icon className={`h-6 w-6 ${highlight ? 'text-white dark:text-black' : 'text-gray-400 dark:text-gray-500'}`} aria-hidden="true" />
        </div>
        <p className={`ml-16 truncate text-sm font-medium ${highlight ? 'text-gray-300 dark:text-gray-700' : 'text-gray-500 dark:text-gray-400'}`}>{title}</p>
      </dt>
      <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
        <p className={`text-2xl font-semibold text-gray-900 ${highlight ? 'text-white dark:text-black' : 'dark:text-white'}`}>{value}</p>
        {href && <ArrowUpRight className={`ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ${highlight ? 'text-white/60 dark:text-black/60' : 'text-gray-400'}`} />}
      </dd>
    </div>
  )
  return href ? <Link href={href}>{content}</Link> : content
}

function MiniStat({ label, value, href, alert = false }: { label: string; value: any; href?: string; alert?: boolean }) {
  const content = (
    <div className={`bg-white dark:bg-zinc-900 border ${alert ? 'border-amber-200 dark:border-amber-800' : 'border-gray-100 dark:border-zinc-800'} rounded-xl p-4 shadow-sm text-center hover:shadow-md transition-all group`}>
      <p className={`text-2xl font-semibold ${alert ? 'text-amber-600 dark:text-amber-400' : 'text-gray-900 dark:text-white'}`}>{value}</p>
      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">{label}</p>
    </div>
  )
  return href ? <Link href={href}>{content}</Link> : content
}
