import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Package, ChevronRight } from "lucide-react"
import { Badge } from "@/components/admin/Badge"
import { OrderStatus } from "@prisma/client"
import { resolveOrderItemImage } from "@/lib/orderImageResolver"
import { OrderActionButtons } from "@/components/user/OrderActionModals"

export default async function OrdersPage() {
  const session = await auth()
  if (!session || !session.user?.id) return redirect("/login")

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      shippingAddress: true,
      items: {
        include: {
          variant: {
            include: {
              family: {
                select: { name: true, slug: true, images: true }
              }
            }
          }
        }
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
             <Link href="/collections/dsigner-men" className="rounded-md bg-black dark:bg-white px-4 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-zinc-800">
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
                 <div className="flex flex-wrap items-center gap-3">
                    <OrderActionButtons
                      order={{
                        id: order.id,
                        totalAmount: order.totalAmount.toString(),
                        createdAt: order.createdAt.toISOString(),
                        status: order.status,
                        shippingAddress: order.shippingAddress ? {
                          firstName: order.shippingAddress.firstName ?? undefined,
                          lastName: order.shippingAddress.lastName ?? undefined,
                          city: order.shippingAddress.city ?? undefined,
                          state: order.shippingAddress.state ?? undefined,
                          postalCode: order.shippingAddress.postalCode ?? undefined,
                          phone: order.shippingAddress.phone ?? undefined,
                        } : null,
                        items: order.items.map((item) => ({
                          variant: {
                            sku: item.variant?.sku ?? undefined,
                            family: { name: item.variant?.family?.name ?? undefined }
                          },
                          quantity: item.quantity
                        }))
                      }}
                    />
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="inline-flex items-center text-sm font-medium text-[#B8935A] hover:text-[#9A7640] transition-colors"
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
                  {order.items.map((item) => {
                    const itemImage = resolveOrderItemImage({
                      sku: item.variant?.sku,
                      name: item.variant?.family?.name,
                      familySlug: item.variant?.family?.slug,
                      dbUrl: item.variant?.family?.images?.[0]?.url
                    })
                    return (
                      <li key={item.id} className="py-4 flex items-center">
                         <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={itemImage}
                              alt={item.variant?.family?.name || "Timepiece"}
                              className="h-full w-full object-contain"
                            />
                         </div>
                         <div className="ml-4 flex flex-1 flex-col">
                           <div>
                              <div className="flex justify-between text-sm font-medium text-gray-900 dark:text-white">
                                 <h4>{item.variant?.family?.name || item.variant?.sku}</h4>
                              </div>
                              <p className="mt-1 text-xs text-gray-500">Qty: {item.quantity}</p>
                           </div>
                         </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
