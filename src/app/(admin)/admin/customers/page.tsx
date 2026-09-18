import { prisma } from "@/lib/db"
import { CustomersTable } from "./CustomersTable"

export const dynamic = "force-dynamic"

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

  const isDemoEnv = process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview"

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Registered Customers</h1>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Directory of all registered shoppers, total order history, and accumulated customer lifetime value (LTV).
          </p>
        </div>
      </div>

      {isDemoEnv && (
        <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 mb-4 shadow-2xs">
          <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">Demo Access Credentials</h3>
          <p className="text-xs text-blue-700 mb-3">
            Seed accounts provided for local development and review testing.
          </p>
          <div className="overflow-x-auto bg-white rounded-xl shadow-2xs border border-blue-100">
            <table className="min-w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10.5px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-2.5 text-left">Role</th>
                  <th className="px-4 py-2.5 text-left">Name</th>
                  <th className="px-4 py-2.5 text-left">Login / Email</th>
                  <th className="px-4 py-2.5 text-left">Password</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-800 font-mono">
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3"><span className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded text-[10px] font-sans font-bold">ADMIN</span></td>
                  <td className="px-4 py-3 font-sans font-medium text-slate-900">Admin User</td>
                  <td className="px-4 py-3 text-slate-700">admin@designerworld.com</td>
                  <td className="px-4 py-3 text-slate-500">password123</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3"><span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-sans font-bold">CUSTOMER</span></td>
                  <td className="px-4 py-3 font-sans font-medium text-slate-900">Vip Customer</td>
                  <td className="px-4 py-3 text-slate-700">customer@designerworld.com</td>
                  <td className="px-4 py-3 text-slate-500">password123</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <CustomersTable data={mappedData} />
    </div>
  )
}
