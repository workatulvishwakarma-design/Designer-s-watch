import { prisma } from "@/lib/db"
import { OrdersTable } from "./OrdersTable"

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  const mappedData = orders.map(o => {
    let paymentStr = "Gateway"
    if (o.paymentMethod === 'CARD') paymentStr = 'Card'
    if (o.paymentMethod === 'UPI') paymentStr = 'UPI'
    if (o.paymentMethod === 'NET_BANKING') paymentStr = 'NetBanking'
    if (o.paymentMethod === 'COD') paymentStr = 'COD'

    return {
      id: o.id,
      date: o.createdAt.toLocaleDateString(),
      customer: o.user.name || o.user.email || "Unknown Customer",
      method: paymentStr,
      total: `₹${o.totalAmount.toString()}`,
      status: o.status,
    }
  })

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-100">Orders Explorer</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            A list of all orders including status, customer details, and total amounts.
          </p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <OrdersTable data={mappedData} />
      </div>
    </div>
  )
}
