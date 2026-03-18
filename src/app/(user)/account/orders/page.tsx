import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Package, ChevronRight } from "lucide-react"
import { Badge } from "@/components/admin/Badge"
import { OrderStatus } from "@prisma/client"

export default async function OrdersPage() {
  const session = await auth()
  if (!session || !session.user?.id) return redirect("/login")

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: {
        include: { product: { select: { name: true, images: true } } }
      }
    },
    orderBy: { createdAt: "desc" }
  })

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "DELIVERED": return "success"
      case "PENDING":
      case "PROCESSING": return "warning"
      case "CANCELLED":
      case "REFUNDED": return "error"
      case "SHIPPED": return "info"
      default: return "neutral"
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:tracking-tight">
          Your Orders
        </h2>
        <p className="mt-1 text-sm text-gray-500">Check the status of recent orders, manage returns, and discover similar products.</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center rounded-xl border-2 border-dashed border-gray-300 dark:border-zinc-800 p-12 mt-6">
           <Package className="mx-auto h-12 w-12 text-gray-400" />
           <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No orders yet</h3>
           <p className="mt-1 text-sm text-gray-500">When you place an order, it will appear here.</p>
           <div className="mt-6">
             <Link href="/watches" className="rounded-md bg-black dark:bg-white px-4 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-zinc-800">
               Start Shopping
             </Link>
           </div>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
              <div className="px-4 py-4 sm:px-6 bg-gray-50 dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                   <div>
                     <dt className="text-xs font-medium text-gray-500">Order Placed</dt>
                     <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{order.createdAt.toLocaleDateString()}</dd>
                   </div>
                   <div>
                     <dt className="text-xs font-medium text-gray-500">Total</dt>
                     <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">₹{order.totalAmount.toString()}</dd>
                   </div>
                   <div>
                     <dt className="text-xs font-medium text-gray-500">Order Number</dt>
                     <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">#{order.id.slice(-8).toUpperCase()}</dd>
                   </div>
                 </div>
                 <div>
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                    >
                      View details <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                 </div>
              </div>

              {/* Items Summary */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                   <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Status</h4>
                   <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                </div>
                
                <ul className="divide-y divide-gray-100 dark:divide-zinc-800">
                  {order.items.map((item) => (
                    <li key={item.id} className="py-4 flex">
                       <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.product.images?.[0]?.url || "https://picsum.photos/100"}
                            alt={item.product.name}
                            className="h-full w-full object-cover object-center"
                          />
                       </div>
                       <div className="ml-4 flex flex-1 flex-col">
                         <div>
                            <div className="flex justify-between text-sm font-medium text-gray-900 dark:text-white">
                              <h4>{item.product.name}</h4>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">Qty: {item.quantity}</p>
                         </div>
                       </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
