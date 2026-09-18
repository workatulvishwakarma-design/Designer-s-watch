import { prisma } from "@/lib/db"
import { OrdersTable } from "./OrdersTable"

export const dynamic = "force-dynamic"

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
      paymentStatus: (o as any).paymentStatus || "PENDING",
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Orders & Fulfillment</h1>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Monitor real-time customer purchases, COD vs prepaid settlement, and order shipment lifecycles.
          </p>
        </div>
      </div>
      
      <div className="bg-white shadow-xs border border-slate-200/80 rounded-2xl p-2">
        <OrdersTable data={mappedData} />
      </div>

      {/* Recent Cart Activity */}
      {recentCartEvents.length > 0 && (
        <div className="bg-white shadow-xs border border-slate-200/80 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Live Cart Add/Remove Activity</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="text-left py-3 px-4">Time</th>
                  <th className="text-left py-3 px-4">Cart ID</th>
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Action</th>
                  <th className="text-left py-3 px-4">Qty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentCartEvents.map((event: any) => (
                  <tr key={event.id} className="hover:bg-slate-50/75 transition-colors">
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                      {new Date(event.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">{event.cartId.slice(-8)}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{event.productName}</td>
                    <td className="py-3 px-4">
                      <span className={`text-[10.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        event.action === "ADD" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        event.action === "REMOVE" ? "bg-rose-50 text-rose-700 border-rose-200" :
                        "bg-blue-50 text-blue-700 border-blue-200"
                      }`}>
                        {event.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">{event.quantity}</td>
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
