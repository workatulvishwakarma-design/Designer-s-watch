import { prisma } from "@/lib/db"
import { OrdersTable } from "./OrdersTable"

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { name: true, email: true } },
      shippingAddress: { select: { phone: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  const mappedData = orders.map(o => {
    let paymentStr = "Gateway"
    if (o.paymentMethod === 'CARD') paymentStr = 'Card'
    if (o.paymentMethod === 'UPI') paymentStr = 'UPI'
    if (o.paymentMethod === 'NET_BANKING') paymentStr = 'NetBanking'
    if (o.paymentMethod === 'COD' || o.paymentMethod === 'COD_ADVANCE') paymentStr = 'COD'
    if (o.paymentMethod === 'PREPAID') paymentStr = 'Prepaid'

    return {
      id: o.id,
      date: o.createdAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      customer: o.user?.name || o.user?.email || "Unknown Customer",
      method: paymentStr,
      total: `₹${Number(o.totalAmount).toLocaleString("en-IN")}`,
      status: o.status,
      // New payment fields
      paymentStatus: (o as any).paymentStatus,
      isCOD: (o as any).isCOD,
      advancePaid: `₹${Number((o as any).advancePaid || 0).toLocaleString("en-IN")}`,
      balanceDue: `₹${Number((o as any).balanceDue || 0).toLocaleString("en-IN")}`,
      transactionRef: (o as any).transactionRef,
      phone: (o as any).customerPhone || o.shippingAddress?.phone || null,
    }
  })

  // Recent cart events for admin
  let recentCartEvents: any[] = []
  try {
    recentCartEvents = await prisma.cartEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 15,
    })
  } catch { /* Table may not exist yet */ }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-100">Orders Explorer</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            All orders with payment status, COD tracking, and customer details.
          </p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <OrdersTable data={mappedData} />
      </div>

      {/* Recent Cart Activity */}
      {recentCartEvents.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Recent Cart Activity</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-zinc-700">
                  <th className="text-left py-2 pr-4 font-medium text-gray-500 text-xs uppercase">Time</th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-500 text-xs uppercase">Cart ID</th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-500 text-xs uppercase">Product</th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-500 text-xs uppercase">Action</th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-500 text-xs uppercase">Qty</th>
                </tr>
              </thead>
              <tbody>
                {recentCartEvents.map((event: any) => (
                  <tr key={event.id} className="border-b border-gray-100 dark:border-zinc-800">
                    <td className="py-2 pr-4 text-gray-400 text-xs">
                      {new Date(event.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="py-2 pr-4 font-mono text-xs text-gray-500">{event.cartId.slice(-8)}</td>
                    <td className="py-2 pr-4 text-gray-900 dark:text-gray-200">{event.productName}</td>
                    <td className="py-2 pr-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                        event.action === "ADD" ? "bg-green-100 text-green-700" :
                        event.action === "REMOVE" ? "bg-red-100 text-red-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {event.action}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-gray-600">{event.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
