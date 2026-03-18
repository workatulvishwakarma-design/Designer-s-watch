import { prisma } from "@/lib/db"
import { CustomersTable } from "./CustomersTable"

export default async function AdminCustomersPage() {
  const users = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    include: {
      _count: { select: { orders: true } },
      orders: { select: { totalAmount: true } }
    },
    orderBy: { createdAt: "desc" },
  })

  const mappedData = users.map(u => {
    const ltv = u.orders.reduce((sum, ord) => sum + Number(ord.totalAmount), 0)
    return {
      id: u.id,
      name: u.name || "N/A",
      email: u.email || "N/A",
      joined: u.createdAt.toLocaleDateString(),
      orderCount: u._count.orders,
      ltv: `₹${ltv.toLocaleString()}`,
    }
  })

  // We only show this in development/demo environments.
  const isDemoEnv = process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview"

  return (
    <div className="space-y-6">
      {isDemoEnv && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">Demo Credentials Reference</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
            Warning: This table is only visible in development/demo environments. Do not expose real passwords in production. 
            These are the seed accounts provided for testing the checkout and admin flows.
          </p>
          <div className="overflow-x-auto bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-zinc-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Login / Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seed Password</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm text-gray-900 dark:text-gray-100 font-mono">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-sans tracking-wide">ADMIN</span></td>
                  <td className="px-6 py-4 whitespace-nowrap">Admin User</td>
                  <td className="px-6 py-4 whitespace-nowrap">admin@designerworld.com</td>
                  <td className="px-6 py-4 whitespace-nowrap">password123</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-sans tracking-wide">CUSTOMER</span></td>
                  <td className="px-6 py-4 whitespace-nowrap">Vip Customer</td>
                  <td className="px-6 py-4 whitespace-nowrap">customer@designerworld.com</td>
                  <td className="px-6 py-4 whitespace-nowrap">password123</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-100">Customers</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            A list of all registered customers with their order counts and lifetime value metrics.
          </p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <CustomersTable data={mappedData} />
      </div>
    </div>
  )
}
