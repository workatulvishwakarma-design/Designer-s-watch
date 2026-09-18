import { prisma } from "@/lib/db"
import { DollarSign, ShoppingBag, Users, TrendingUp, BarChart3, Package, AlertTriangle, Ticket } from "lucide-react"
import { Badge } from "@/components/admin/Badge"
import Link from "next/link"

export const dynamic = "force-dynamic"

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
      by: ['variantId'],
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
      include: {
        variant: {
          select: {
            id: true,
            sku: true,
            family: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            }
          }
        }
      },
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

  // Fetch variant and family names for top variants
  const topVariantIds = topProducts.map(tp => tp.variantId)
  const topVariants = await prisma.productVariant.findMany({
    where: { id: { in: topVariantIds } },
    include: { family: true }
  })
  const productNameMap = Object.fromEntries(topVariants.map(v => [v.id, `${v.family.name} (${v.sku})`]))
  const variantToFamilyIdMap = Object.fromEntries(topVariants.map(v => [v.id, v.family.id]))

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
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reports & Business Intelligence</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">Real-time revenue metrics, inventory health, and marketing performance.</p>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <ClickableMetric icon={DollarSign} label="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} accent="text-emerald-700" bg="bg-emerald-50" href="/admin/orders" />
        <ClickableMetric icon={ShoppingBag} label="Total Orders" value={totalOrders.toString()} accent="text-blue-700" bg="bg-blue-50" href="/admin/orders" />
        <ClickableMetric icon={Users} label="Total Customers" value={totalCustomers.toString()} accent="text-purple-700" bg="bg-purple-50" href="/admin/customers" />
        <ClickableMetric icon={TrendingUp} label="Avg. Order Value" value={`₹${avgOrderValue.toLocaleString()}`} accent="text-amber-700" bg="bg-amber-50" href="/admin/orders" />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <Link href="/admin/orders" className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs text-center hover:border-slate-300 transition-all">
          <p className="text-2xl font-extrabold text-slate-900">{completedOrders}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">Delivered</p>
        </Link>
        <Link href="/admin/orders" className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs text-center hover:border-slate-300 transition-all">
          <p className="text-2xl font-extrabold text-rose-600">{cancelledOrders}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">Cancelled</p>
        </Link>
        <Link href="/admin/customers" className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs text-center hover:border-slate-300 transition-all">
          <p className="text-2xl font-extrabold text-slate-900">{newCustomersThisMonth}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">New Customers</p>
        </Link>
        <Link href="/admin/coupons" className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs text-center hover:border-slate-300 transition-all">
          <p className="text-2xl font-extrabold text-slate-900">{couponUsageTotal}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">Coupons Redeemed</p>
        </Link>
        <div className="bg-white border border-amber-300/80 rounded-xl p-3.5 shadow-2xs text-center">
          <p className="text-2xl font-extrabold text-amber-600">{abandonedCheckouts}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">Abandoned Carts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Status Distribution */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-slate-400" /> Order Fulfillment Distribution
          </h3>
          <div className="space-y-4">
            {statusDistribution.map(s => {
              const pct = totalOrders > 0 ? Math.round((s.count / totalOrders) * 100) : 0
              return (
                <Link key={s.label} href={s.href} className="flex items-center gap-4 hover:bg-slate-50 -mx-2 px-2.5 py-1.5 rounded-xl transition-colors">
                  <div className="w-24 text-xs font-semibold text-slate-700">{s.label}</div>
                  <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        s.variant === 'success' ? 'bg-emerald-500' :
                        s.variant === 'warning' ? 'bg-amber-500' :
                        s.variant === 'error' ? 'bg-rose-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-xs font-bold text-slate-900">{s.count}</span>
                    <span className="text-[10px] text-slate-400 ml-1">({pct}%)</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Package className="w-4 h-4 text-slate-400" /> Top Selling Models
          </h3>
          {topProducts.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">No sales data recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map((tp, idx) => {
                const familyId = variantToFamilyIdMap[tp.variantId] || ""
                return (
                  <Link key={tp.variantId} href={`/admin/products/${familyId}`} className="flex items-center gap-4 hover:bg-slate-50 -mx-2 px-2.5 py-1.5 rounded-xl transition-colors">
                    <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{productNameMap[tp.variantId] || "Product"}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-slate-900">{tp._sum?.quantity || 0} units</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Critical Low Stock Items
            </h3>
            <Link href="/admin/products" className="text-xs font-semibold text-slate-700 hover:text-black hover:underline">
              Inventory →
            </Link>
          </div>
          {lowStockProducts.length === 0 ? (
            <p className="text-xs text-emerald-600 font-medium text-center py-6">All products have healthy inventory levels. ✓</p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map(inv => {
                const familyId = inv.variant?.family?.id || ""
                const familyName = inv.variant?.family?.name || "Watch"
                return (
                  <Link key={inv.id} href={`/admin/products/${familyId}`} className="flex items-center justify-between hover:bg-slate-50 -mx-2 px-2.5 py-1.5 rounded-xl transition-colors">
                    <p className="text-xs font-bold text-slate-900 truncate max-w-[220px]">{familyName} ({inv.variant?.sku})</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={inv.stock === 0 ? "error" : "warning"}>
                        {inv.stock === 0 ? "Out of Stock" : `${inv.stock} left`}
                      </Badge>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Coupon Performance */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-slate-400" /> Coupon Campaign Performance
            </h3>
            <Link href="/admin/coupons" className="text-xs font-semibold text-slate-700 hover:text-black hover:underline">
              Manage →
            </Link>
          </div>
          {coupons.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">No promotional coupons created yet.</p>
          ) : (
            <div className="space-y-3">
              {coupons.map(coupon => (
                <Link key={coupon.code} href={`/admin/coupons`} className="flex items-center justify-between hover:bg-slate-50 -mx-2 px-2.5 py-1.5 rounded-xl transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">{coupon.code}</span>
                    <Badge variant={coupon.isActive ? "success" : "neutral"}>
                      {coupon.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{coupon.usedCount} redemptions</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ClickableMetric({ icon: Icon, label, value, accent, bg, href }: { icon: any, label: string, value: string, accent: string, bg: string, href: string }) {
  return (
    <Link href={href} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all block">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${bg} shrink-0`}>
          <Icon className={`w-5 h-5 ${accent}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 truncate">{label}</p>
          <p className="text-xl font-extrabold text-slate-950 mt-1 tracking-tight">{value}</p>
        </div>
      </div>
    </Link>
  )
}
