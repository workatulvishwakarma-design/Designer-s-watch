import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, MapPin, Package, User } from "lucide-react"
import { Badge } from "@/components/admin/Badge"
import { OrderTimelineManager } from "@/components/admin/OrderTimelineManager"

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      shippingAddress: true,
      items: { include: { product: true } },
      trackingEvents: { orderBy: { createdAt: "desc" } }
    }
  })

  if (!order) notFound()

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <Link href="/admin/orders" className="text-sm font-medium text-gray-500 hover:text-gray-900 inline-flex items-center mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Orders
        </Link>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:tracking-tight">
              Order #{order.id.slice(-8).toUpperCase()}
            </h2>
            <p className="mt-1 text-sm text-gray-500">Placed on {order.createdAt.toLocaleString()}</p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 flex gap-2">
            <Badge variant="neutral" className="text-sm px-3 py-1.5">{order.status}</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Items & Timeline) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Items */}
          <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-100 dark:border-zinc-800">
              <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white flex items-center">
                <Package className="h-4 w-4 mr-2 text-gray-400" /> Ordered Items
              </h3>
            </div>
            <ul className="divide-y divide-gray-100 dark:divide-zinc-800">
              {order.items.map((item) => (
                <li key={item.id} className="flex px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.product.name}</p>
                      <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                      <p className="font-medium text-gray-900 dark:text-white">₹{item.priceAtPurchase.toString()}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="bg-gray-50 dark:bg-zinc-950 px-4 py-4 sm:px-6 border-t border-gray-100 dark:border-zinc-800 flex justify-end">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">₹{order.totalAmount.toString()}</p>
              </div>
            </div>
          </div>

          {/* Timeline History */}
          <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl px-4 py-5 sm:px-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white mb-6">Tracking Timeline</h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {order.trackingEvents.map((event, eventIdx) => (
                  <li key={event.id}>
                    <div className="relative pb-8">
                      {eventIdx !== order.trackingEvents.length - 1 ? (
                        <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-zinc-800" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center ring-8 ring-white dark:ring-zinc-900">
                            <div className="h-2.5 w-2.5 rounded-full bg-black dark:bg-white" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-medium text-gray-900 dark:text-white mr-2">{event.label || event.status}</span>
                              {event.location && `at ${event.location}`}
                            </p>
                            {event.description && <p className="mt-1 text-xs text-gray-400">{event.description}</p>}
                          </div>
                          <div className="whitespace-nowrap text-right text-xs text-gray-500">
                            {event.createdAt.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                {order.trackingEvents.length === 0 && <p className="text-sm text-gray-500 pb-8 text-center italic">No tracking events recorded yet.</p>}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column (Customer, Address, Controls) */}
        <div className="space-y-8">
          {/* Admin Controls */}
          <OrderTimelineManager orderId={order.id} currentStatus={order.status} />

          {/* Customer */}
          <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
            <h3 className="text-sm font-medium leading-6 text-gray-900 dark:text-white flex items-center mb-4">
              <User className="h-4 w-4 mr-2" /> Customer
            </h3>
            <div className="text-sm text-gray-900 dark:text-gray-300">
              <p className="font-semibold">{order.user.name || "Guest"}</p>
              <p className="text-gray-500">{order.user.email}</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
            <h3 className="text-sm font-medium leading-6 text-gray-900 dark:text-white flex items-center mb-4">
              <MapPin className="h-4 w-4 mr-2" /> Shipping Address
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p className="text-gray-900 dark:text-white font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
              {order.shippingAddress.phone && <p className="pt-2">P: {order.shippingAddress.phone}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
