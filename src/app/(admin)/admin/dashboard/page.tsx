import { prisma } from "@/lib/db"
import { DollarSign, ShoppingBag, Users as UsersIcon, Clock, PackageCheck, AlertTriangle, TrendingUp } from "lucide-react"
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
    prisma.productFamily.count({ where: { status: "ACTIVE" } }),
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
      by: ['variantId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5
    }),
    prisma.inventory.findMany({
      where: { stock: { lt: 10 } },
      include: {
        variant: {
          select: {
            id: true,
            price: true,
            sku: true,
            family: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        }
      },
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
  const topVariantIds = topSellersAgg.map((item: any) => item.variantId) || [];
  const topVariants = await prisma.productVariant.findMany({
    where: { id: { in: topVariantIds } },
    select: {
      id: true,
      sku: true,
      price: true,
      family: {
        select: {
          id: true,
          name: true,
          status: true,
        }
      }
    }
  });

  // Map quantity back
  const topSellingList = topVariants.map(v => ({
    id: v.family.id,
    name: `${v.family.name} (${v.sku})`,
    price: v.price,
    status: v.family.status,
    sales: topSellersAgg.find((ts: any) => ts.variantId === v.id)?._sum?.quantity || 0
  })).sort((a,b) => b.sales - a.sales);

  const totalRevenue = revenueAgg._sum.totalAmount || 0
  const avgOrderValue = totalOrders > 0 ? Math.round(Number(totalRevenue) / totalOrders) : 0

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Executive Dashboard
        </h1>
        <p className="mt-1 text-xs text-slate-500 font-medium">
          Comprehensive overview of store performance, revenue, orders, and operational metrics.
        </p>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Gross Revenue" 
          value={`₹${Number(totalRevenue).toLocaleString()}`} 
          icon={DollarSign} 
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          href="/admin/analytics" 
        />
        <StatCard 
          title="Pending Orders" 
          value={pendingOrders.toString()} 
          icon={Clock} 
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          href="/admin/orders" 
        />
        <StatCard 
          title="Active Watch Families" 
          value={totalProducts.toString()} 
          icon={PackageCheck} 
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          href="/admin/products" 
        />
        <StatCard 
          title="Total Registered Customers" 
          value={totalCustomers.toString()} 
          icon={UsersIcon} 
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
          href="/admin/customers" 
        />
      </div>

      {/* Secondary Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3.5">
        <MiniStat label="Avg. Order" value={`₹${avgOrderValue.toLocaleString()}`} href="/admin/analytics" />
        <MiniStat label="New Customers" value={newCustomersThisMonth} href="/admin/customers" />
        <MiniStat label="Low Stock Items" value={lowStockProducts.length} alert={lowStockProducts.length > 0} href="/admin/products" />
        <MiniStat label="Pending Inquiries" value={pendingInquiries} alert={pendingInquiries > 0} href="/admin/messages" />
        <MiniStat label="Active Coupons" value={activeCoupons} href="/admin/coupons" />
        <MiniStat label="Abandoned Carts" value={abandonedCheckouts} alert={abandonedCheckouts > 0} href="/admin/analytics" />
      </div>

      {/* Charts Section */}
      <div className="mt-8">
        <DashboardCharts orders={rawOrders.map((o: any) => ({ createdAt: o.createdAt, totalAmount: Number(o.totalAmount), isCOD: o.isCOD }))} />
      </div>

      {/* Grids: Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mt-8">
        {/* Recent Orders List */}
        <div className="bg-white shadow-xs border border-slate-200/80 rounded-2xl overflow-hidden">
          <div className="px-6 py-4.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-slate-400" /> Recent Orders
            </h3>
            <Link href="/admin/orders" className="text-xs font-semibold text-slate-700 hover:text-black hover:underline transition-colors">
              View All Orders →
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {recentOrders.map((order) => (
              <li key={order.id}>
                <Link href={`/admin/orders/${order.id}`} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50/80 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">Order #{order.id.slice(-8).toUpperCase()}</span>
                    <span className="text-[11px] text-slate-500 mt-0.5">{order.user.name || order.user.email}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-bold text-slate-900">₹{Number(order.totalAmount).toLocaleString()}</span>
                    <Badge variant={order.status === "DELIVERED" ? "success" : order.status === "CANCELLED" ? "error" : order.status === "PENDING" ? "warning" : "info"}>
                      {order.status}
                    </Badge>
                  </div>
                </Link>
              </li>
            ))}
            {recentOrders.length === 0 && (
              <li className="px-6 py-12 text-center text-xs text-slate-400">No recent orders recorded yet.</li>
            )}
          </ul>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white shadow-xs border border-slate-200/80 rounded-2xl overflow-hidden">
          <div className="px-6 py-4.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Low Stock Alerts
            </h3>
            <Link href="/admin/products" className="text-xs font-semibold text-slate-700 hover:text-black hover:underline transition-colors">
              Manage Inventory →
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {lowStockProducts.map((inv) => (
              <li key={inv.id}>
                <Link href={`/admin/products`} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50/80 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">{inv.variant.family.name} ({inv.variant.sku})</span>
                    <span className="text-[11px] text-slate-500 mt-0.5">₹{Number(inv.variant.price).toLocaleString()}</span>
                  </div>
                  <Badge variant={inv.stock === 0 ? "error" : "warning"}>
                    {inv.stock === 0 ? "Out of Stock" : `${inv.stock} units left`}
                  </Badge>
                </Link>
              </li>
            ))}
            {lowStockProducts.length === 0 && (
              <li className="px-6 py-12 text-center text-xs text-emerald-600 font-medium">All products are well stocked. ✓</li>
            )}
          </ul>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white shadow-xs border border-slate-200/80 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Quick Management Actions</h3>
          <div className="grid grid-cols-2 gap-3.5">
            <Link href="/admin/products/new" className="flex items-center justify-center p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-all hover:border-slate-300">
              <span className="text-xs font-bold text-slate-800">Add New Product</span>
            </Link>
            <Link href="/admin/categories/new" className="flex items-center justify-center p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-all hover:border-slate-300">
              <span className="text-xs font-bold text-slate-800">Add Collection</span>
            </Link>
            <Link href="/admin/stores" className="flex items-center justify-center p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-all hover:border-slate-300">
              <span className="text-xs font-bold text-slate-800">Manage Stores & Dealers</span>
            </Link>
            <Link href="/admin/coupons/new" className="flex items-center justify-center p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-all hover:border-slate-300">
              <span className="text-xs font-bold text-slate-800">Create Coupon</span>
            </Link>
          </div>
        </div>

        {/* Top Sellers Card */}
        <div className="bg-white shadow-xs border border-slate-200/80 rounded-2xl overflow-hidden">
          <div className="px-6 py-4.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" /> Trending Products
            </h3>
            <Link href="/admin/products" className="text-xs font-semibold text-slate-700 hover:text-black hover:underline transition-colors">
              View All Products →
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {topSellingList.map((product, idx) => (
              <li key={product.id}>
                <Link href={`/admin/products/${product.id}`} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-[11px] font-bold text-slate-600 shrink-0">
                      {idx + 1}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-slate-900 truncate max-w-[200px] sm:max-w-[260px]">{product.name}</span>
                      <span className="text-[11px] text-slate-500 mt-0.5">₹{Number(product.price).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-xs font-bold text-slate-900">{product.sales} sold</span>
                    <span className={`text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 ${product.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                      {product.status}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
            {topSellingList.length === 0 && (
              <li className="px-6 py-12 text-center text-xs text-slate-400">No sales data recorded yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, iconColor = "text-slate-700", iconBg = "bg-slate-100", href }: any) {
  const content = (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex items-center justify-between">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{title}</p>
        <p className="text-2xl font-extrabold text-slate-950 mt-1.5 tracking-tight">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-2xs`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  )
  return href ? <Link href={href} className="block">{content}</Link> : content
}

function MiniStat({ label, value, href, alert = false }: { label: string; value: any; href?: string; alert?: boolean }) {
  const content = (
    <div className={`bg-white border ${alert ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200/80'} rounded-xl p-3.5 shadow-2xs text-center hover:border-slate-300 hover:shadow-xs transition-all`}>
      <p className={`text-xl font-extrabold ${alert ? 'text-amber-600' : 'text-slate-900'}`}>{value}</p>
      <p className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 mt-1 truncate">{label}</p>
    </div>
  )
  return href ? <Link href={href} className="block">{content}</Link> : content
}
