import { prisma } from "@/lib/db"
import { DollarSign, ShoppingBag, Users, TrendingUp, BarChart3, Package, AlertTriangle, Ticket, ShoppingCart, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/admin/Badge"
import Link from "next/link"

export default async function AdminAnalyticsPage() {
  const [
    totalOrders,
    completedOrders,
    cancelledOrders,
    pendingOrders,
    totalCustomers,
    allOrders,
    topProducts,
    coupons,
    recentOrders,
    lowStockProducts,
    newCustomersThisMonth,
    abandonedCheckouts,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "DELIVERED" } }),
    prisma.order.count({ where: { status: "CANCELLED" } }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.findMany({ select: { totalAmount: true, status: true, createdAt: true } }),
    prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    }),
    prisma.coupon.findMany({ select: { id: true, code: true, usedCount: true, isActive: true } }),
    prisma.order.findMany({ 
      take: 10, 
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true } } }
    }),
    prisma.inventory.findMany({
      where: { stock: { lt: 10 } },
      include: { product: { select: { id: true, name: true, slug: true } } },
      take: 5,
      orderBy: { stock: "asc" }
    }),
    prisma.user.count({
      where: {
        role: "CUSTOMER",
        createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
      }
    }),
    prisma.abandonedCheckout.count({ where: { recovered: false } }).catch(() => 0),
  ])

  // Compute metrics
  const totalRevenue = allOrders.reduce((acc, o) => acc + Number(o.totalAmount), 0)
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0
  const processingOrders = allOrders.filter(o => o.status === "PROCESSING").length
  const shippedOrders = allOrders.filter(o => o.status === "SHIPPED").length
  const couponUsageTotal = coupons.reduce((acc, c) => acc + c.usedCount, 0)

  // Fetch product names for top products
  const topProductIds = topProducts.map(tp => tp.productId)
  const productNames = await prisma.product.findMany({
    where: { id: { in: topProductIds } },
    select: { id: true, name: true }
  })
  const productNameMap = Object.fromEntries(productNames.map(p => [p.id, p.name]))

  // Order status distribution
  const statusDistribution = [
    { label: "Pending", count: pendingOrders, variant: "warning" as const, href: "/admin/orders" },
    { label: "Processing", count: processingOrders, variant: "info" as const, href: "/admin/orders" },
    { label: "Shipped", count: shippedOrders, variant: "info" as const, href: "/admin/orders" },
    { label: "Delivered", count: completedOrders, variant: "success" as const, href: "/admin/orders" },
    { label: "Cancelled", count: cancelledOrders, variant: "error" as const, href: "/admin/orders" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white uppercase">Reports & Analytics</h2>
        <p className="text-xs text-gray-500 mt-1">Real-time business intelligence from your boutique&apos;s data.</p>
      </div>

      {/* Primary Metrics — Clickable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ClickableMetric icon={DollarSign} label="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} accent="text-emerald-600" bg="bg-emerald-50 dark:bg-emerald-900/10" href="/admin/orders" />
        <ClickableMetric icon={ShoppingBag} label="Total Orders" value={totalOrders.toString()} accent="text-blue-600" bg="bg-blue-50 dark:bg-blue-900/10" href="/admin/orders" />
        <ClickableMetric icon={Users} label="Total Customers" value={totalCustomers.toString()} accent="text-purple-600" bg="bg-purple-50 dark:bg-purple-900/10" href="/admin/customers" />
        <ClickableMetric icon={TrendingUp} label="Avg. Order Value" value={`₹${avgOrderValue.toLocaleString()}`} accent="text-amber-600" bg="bg-amber-50 dark:bg-amber-900/10" href="/admin/orders" />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <Link href="/admin/orders" className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center hover:shadow-md transition-all">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{completedOrders}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Completed</p>
        </Link>
        <Link href="/admin/orders" className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center hover:shadow-md transition-all">
          <p className="text-2xl font-semibold text-red-600">{cancelledOrders}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Cancelled</p>
        </Link>
        <Link href="/admin/customers" className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center hover:shadow-md transition-all">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{newCustomersThisMonth}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">New This Month</p>
        </Link>
        <Link href="/admin/coupons" className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center hover:shadow-md transition-all">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{couponUsageTotal}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Coupons Used</p>
        </Link>
        <div className="bg-white dark:bg-zinc-900 border border-amber-200 dark:border-amber-800 rounded-xl p-4 shadow-sm text-center">
          <p className="text-2xl font-semibold text-amber-600">{abandonedCheckouts}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Abandoned Carts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Status Distribution */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-gray-400" /> Order Status Distribution
          </h3>
          <div className="space-y-4">
            {statusDistribution.map(s => {
              const pct = totalOrders > 0 ? Math.round((s.count / totalOrders) * 100) : 0
              return (
                <Link key={s.label} href={s.href} className="flex items-center gap-4 group hover:bg-gray-50 dark:hover:bg-zinc-800/30 -mx-2 px-2 py-1 rounded-lg transition-colors">
                  <div className="w-24 text-xs font-medium text-gray-600 dark:text-gray-400">{s.label}</div>
                  <div className="flex-1 h-3 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        s.variant === 'success' ? 'bg-green-500' :
                        s.variant === 'warning' ? 'bg-yellow-500' :
                        s.variant === 'error' ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{s.count}</span>
                    <span className="text-xs text-gray-400 ml-1">({pct}%)</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Top Selling Products — Clickable */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-400" /> Top Selling Products
          </h3>
          {topProducts.length === 0 ? (
            <p className="text-sm text-gray-500 py-8 text-center">No sales data available yet.</p>
          ) : (
            <div className="space-y-4">
              {topProducts.map((tp, idx) => (
                <Link key={tp.productId} href={`/admin/products/${tp.productId}/edit`} className="flex items-center gap-4 group hover:bg-gray-50 dark:hover:bg-zinc-800/30 -mx-2 px-2 py-1 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {productNameMap[tp.productId] || tp.productId.slice(0, 8)}
                    </p>
                  </div>
                  <Badge variant="neutral">
                    {tp._sum.quantity || 0} sold
                  </Badge>
                  <ArrowUpRight className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Sales — Clickable */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-400" /> Recent Sales
          </h3>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-gray-500 py-8 text-center">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map(order => (
                <Link key={order.id} href={`/admin/orders/${order.id}`} className="flex items-center justify-between py-2.5 border-b border-gray-50 dark:border-zinc-800 last:border-0 hover:bg-gray-50 dark:hover:bg-zinc-800/30 -mx-2 px-2 rounded-lg transition-colors group">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{order.user.name || "Customer"}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-[10px] text-gray-400">{order.createdAt.toLocaleDateString()}</p>
                      <span className="text-[9px] font-bold tracking-widest uppercase bg-gray-100 dark:bg-zinc-800 text-gray-500 px-1.5 py-0.5 rounded">
                        {order.paymentMethod === 'CARD' ? 'Card' :
                         order.paymentMethod === 'UPI' ? 'UPI' :
                         order.paymentMethod === 'NET_BANKING' ? 'NetBanking' :
                         order.paymentMethod === 'COD' ? 'COD' :
                         order.paymentMethod || 'Gateway'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">₹{Number(order.totalAmount).toLocaleString()}</p>
                      <Badge variant={order.status === "DELIVERED" ? "success" : order.status === "CANCELLED" ? "error" : "neutral"}>
                        {order.status}
                      </Badge>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock + Coupon Stats */}
        <div className="space-y-8">
          {/* Low Stock Alert — Clickable */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Low Stock Alert
            </h3>
            {lowStockProducts.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">All products are well stocked.</p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map(inv => (
                  <Link key={inv.id} href={`/admin/products/${inv.product.id}/edit`} className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-zinc-800/30 -mx-2 px-2 py-1 rounded-lg transition-colors group">
                    <p className="text-sm text-gray-900 dark:text-white truncate">{inv.product.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={inv.stock === 0 ? "error" : "warning"}>
                        {inv.stock === 0 ? "Out of Stock" : `${inv.stock} left`}
                      </Badge>
                      <ArrowUpRight className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Coupon Performance — Clickable */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2">
                <Ticket className="w-4 h-4 text-gray-400" /> Coupon Performance
              </h3>
              <Link href="/admin/coupons" className="text-xs font-medium text-black dark:text-white hover:underline flex items-center gap-1">
                Manage <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            {coupons.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No coupons created yet.</p>
            ) : (
              <div className="space-y-3">
                {coupons.map(coupon => (
                  <Link key={coupon.code} href={`/admin/coupons/${coupon.id}/edit`} className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-zinc-800/30 -mx-2 px-2 py-1 rounded-lg transition-colors group">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">{coupon.code}</span>
                      <Badge variant={coupon.isActive ? "success" : "neutral"}>
                        {coupon.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{coupon.usedCount} uses</span>
                      <ArrowUpRight className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ClickableMetric({ icon: Icon, label, value, accent, bg, href }: { icon: any, label: string, value: string, accent: string, bg: string, href: string }) {
  return (
    <Link href={href} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${bg}`}>
          <Icon className={`w-5 h-5 ${accent}`} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
        <ArrowUpRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  )
}
