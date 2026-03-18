import { prisma } from "@/lib/db"
import { DollarSign, ShoppingBag, Users as UsersIcon, Clock, PackageCheck } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboardPage() {
  const [
    totalProducts, 
    totalOrders, 
    totalCustomers,
    recentOrders,
    pendingOrders,
    revenueAgg
  ] = await Promise.all([
    prisma.product.count({ where: { status: "ACTIVE" } }),
    prisma.order.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { user: true } }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: { notIn: ["CANCELLED", "REFUNDED"] } }
    })
  ])

  const totalRevenue = revenueAgg._sum.totalAmount || 0

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:tracking-tight">
          Good Morning, Admin
        </h2>
        <p className="mt-1 text-sm text-gray-500">Here is what is happening with your store today.</p>
      </div>

      {/* Primary Stats */}
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={DollarSign} />
        <StatCard title="Pending Orders" value={pendingOrders.toString()} icon={Clock} highlight />
        <StatCard title="Active Products" value={totalProducts.toString()} icon={PackageCheck} />
        <StatCard title="Total Customers" value={totalCustomers.toString()} icon={UsersIcon} />
      </dl>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Orders List */}
        <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white flex items-center">
              <ShoppingBag className="h-4 w-4 mr-2 text-gray-400" /> Recent Orders
            </h3>
            <Link href="/admin/orders" className="text-sm font-medium text-black dark:text-white hover:underline">View All</Link>
          </div>
          <ul className="divide-y divide-gray-100 dark:divide-zinc-800">
            {recentOrders.map((order) => (
              <li key={order.id} className="flex items-center justify-between px-4 py-4 sm:px-6">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Order #{order.id.slice(-8).toUpperCase()}</span>
                  <span className="text-xs text-gray-500">{order.user.name || order.user.email}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">₹{Number(order.totalAmount).toLocaleString()}</span>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{order.status}</span>
                </div>
              </li>
            ))}
            {recentOrders.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-gray-500">No recent orders found.</li>
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
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, highlight = false }: any) {
  return (
    <div className={`relative overflow-hidden rounded-xl shadow-sm ring-1 ring-gray-900/5 px-4 pb-12 pt-5 sm:px-6 sm:pt-6 ${highlight ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white dark:bg-zinc-900'}`}>
      <dt>
        <div className={`absolute rounded-md p-3 ${highlight ? 'bg-white/10 dark:bg-black/10' : 'bg-gray-50 dark:bg-zinc-800'}`}>
          <Icon className={`h-6 w-6 ${highlight ? 'text-white dark:text-black' : 'text-gray-400 dark:text-gray-500'}`} aria-hidden="true" />
        </div>
        <p className={`ml-16 truncate text-sm font-medium ${highlight ? 'text-gray-300 dark:text-gray-700' : 'text-gray-500 dark:text-gray-400'}`}>{title}</p>
      </dt>
      <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
        <p className={`text-2xl font-semibold text-gray-900 ${highlight ? 'text-white dark:text-black' : 'dark:text-white'}`}>{value}</p>
      </dd>
    </div>
  )
}
