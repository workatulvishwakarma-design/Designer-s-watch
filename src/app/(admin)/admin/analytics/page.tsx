import { prisma } from "@/lib/db"
import { DollarSign, ShoppingBag, Users, TrendingUp, BarChart3, Package, AlertTriangle, Ticket } from "lucide-react"
import { Badge } from "@/components/admin/Badge"

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
    prisma.coupon.findMany({ select: { code: true, usedCount: true, isActive: true } }),
    prisma.order.findMany({ 
      take: 10, 
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true } } }
    }),
    prisma.inventory.findMany({
      where: { stock: { lt: 10 } },
      include: { product: { select: { name: true, slug: true } } },
      take: 5,
      orderBy: { stock: "asc" }
    }),
    prisma.user.count({
      where: {
        role: "CUSTOMER",
        createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
      }
    }),
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
    { label: "Pending", count: pendingOrders, variant: "warning" as const },
    { label: "Processing", count: processingOrders, variant: "info" as const },
    { label: "Shipped", count: shippedOrders, variant: "info" as const },
    { label: "Delivered", count: completedOrders, variant: "success" as const },
    { label: "Cancelled", count: cancelledOrders, variant: "error" as const },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white uppercase">Reports & Analytics</h2>
        <p className="text-xs text-gray-500 mt-1">Real-time business intelligence from your boutique's data.</p>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard icon={DollarSign} label="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} accent="text-emerald-600" bg="bg-emerald-50 dark:bg-emerald-900/10" />
        <MetricCard icon={ShoppingBag} label="Total Orders" value={totalOrders.toString()} accent="text-blue-600" bg="bg-blue-50 dark:bg-blue-900/10" />
        <MetricCard icon={Users} label="Total Customers" value={totalCustomers.toString()} accent="text-purple-600" bg="bg-purple-50 dark:bg-purple-900/10" />
        <MetricCard icon={TrendingUp} label="Avg. Order Value" value={`₹${avgOrderValue.toLocaleString()}`} accent="text-amber-600" bg="bg-amber-50 dark:bg-amber-900/10" />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MiniMetric label="Completed" value={completedOrders} />
        <MiniMetric label="Cancelled" value={cancelledOrders} />
        <MiniMetric label="New This Month" value={newCustomersThisMonth} />
        <MiniMetric label="Coupons Used" value={couponUsageTotal} />
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
                <div key={s.label} className="flex items-center gap-4">
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
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-400" /> Top Selling Products
          </h3>
          {topProducts.length === 0 ? (
            <p className="text-sm text-gray-500 py-8 text-center">No sales data available yet.</p>
          ) : (
            <div className="space-y-4">
              {topProducts.map((tp, idx) => (
                <div key={tp.productId} className="flex items-center gap-4">
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Sales */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-400" /> Recent Sales
          </h3>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-gray-500 py-8 text-center">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 dark:border-zinc-800 last:border-0">
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
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">₹{Number(order.totalAmount).toLocaleString()}</p>
                    <Badge variant={order.status === "DELIVERED" ? "success" : order.status === "CANCELLED" ? "error" : "neutral"}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock + Coupon Stats */}
        <div className="space-y-8">
          {/* Low Stock Alert */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Low Stock Alert
            </h3>
            {lowStockProducts.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">All products are well stocked.</p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map(inv => (
                  <div key={inv.id} className="flex items-center justify-between">
                    <p className="text-sm text-gray-900 dark:text-white truncate">{inv.product.name}</p>
                    <Badge variant={inv.stock === 0 ? "error" : "warning"}>
                      {inv.stock} left
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Coupon Performance */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-gray-400" /> Coupon Performance
            </h3>
            {coupons.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No coupons created yet.</p>
            ) : (
              <div className="space-y-3">
                {coupons.map(coupon => (
                  <div key={coupon.code} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">{coupon.code}</span>
                      <Badge variant={coupon.isActive ? "success" : "neutral"}>
                        {coupon.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{coupon.usedCount} uses</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ icon: Icon, label, value, accent, bg }: { icon: any, label: string, value: string, accent: string, bg: string }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${bg}`}>
          <Icon className={`w-5 h-5 ${accent}`} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
      </div>
    </div>
  )
}

function MiniMetric({ label, value }: { label: string, value: number }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center">
      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">{label}</p>
    </div>
  )
}
