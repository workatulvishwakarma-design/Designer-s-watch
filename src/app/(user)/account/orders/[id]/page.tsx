import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, MapPin, Package, CheckCircle2, Clock, Truck } from "lucide-react"

export default async function UserOrderDetailPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session || !session.user?.id) return redirect("/login")

  const order = await prisma.order.findUnique({
    where: { 
       id: params.id,
       userId: session.user.id // Security constraint: user can only see their own order
    },
    include: {
      shippingAddress: true,
      items: { include: { product: { include: { images: true } } } },
      trackingEvents: { orderBy: { createdAt: "desc" } } // Newest first
    }
  })

  if (!order) return notFound()

  // Reverse to show oldest first in visual timeline
  const chronologicalEvents = [...order.trackingEvents].reverse() 

  const getStatusIcon = (status: string) => {
    if (status === "DELIVERED") return <CheckCircle2 className="h-5 w-5 text-white" />
    if (status === "SHIPPED") return <Truck className="h-5 w-5 text-white" />
    return <Clock className="h-5 w-5 text-gray-400" />
  }

  const getStatusBg = (status: string) => {
    if (status === "DELIVERED") return "bg-green-500"
    if (status === "SHIPPED") return "bg-blue-500"
    return "bg-gray-100 dark:bg-zinc-800 ring-1 ring-gray-200 dark:ring-zinc-700"
  }

  return (
    <div className="space-y-8 max-w-5xl">
       {/* Breadcrumb */}
       <div>
        <Link href="/account/orders" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 inline-flex items-center mb-6 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Orders
        </Link>
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Order #{order.id.slice(-8).toUpperCase()}
          </h2>
          <p className="mt-2 text-sm text-gray-500 sm:mt-0">
            Placed on <time>{order.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </p>
        </div>
      </div>

      {/* Visual Tracking Timeline */}
      <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6 sm:p-10">
        <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white mb-8">Package Tracking</h3>
        
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {chronologicalEvents.map((event, eventIdx) => (
              <li key={event.id}>
                <div className="relative pb-8">
                  {eventIdx !== chronologicalEvents.length - 1 ? (
                    <span className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200 dark:bg-zinc-800" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex items-start space-x-4">
                    <div className="relative">
                      <span className={`h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-zinc-900 ${getStatusBg(event.status)}`}>
                        {getStatusIcon(event.status)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 py-1.5">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium text-gray-900 dark:text-white">{event.status}</span>
                        {event.description && <p className="text-sm mt-1 text-gray-600">{event.description}</p>}
                      </div>
                      <div className="mt-1 text-xs text-gray-400 font-mono">
                        {event.createdAt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric'})}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {chronologicalEvents.length === 0 && (
               <p className="text-sm text-gray-500 italic py-4">We're preparing your order details...</p>
            )}
          </ul>
        </div>
      </div>

       <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-8">
          {/* Order Details List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
               <div className="px-4 py-5 border-b border-gray-100 dark:border-zinc-800 sm:px-6">
                 <h3 className="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                   <Package className="mr-2 h-4 w-4 text-gray-400" /> Items in order
                 </h3>
               </div>
               <ul className="divide-y divide-gray-100 dark:divide-zinc-800 px-4 sm:px-6">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={(item.product as any).images?.[0]?.url || "https://picsum.photos/150"} alt={item.product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                           <h4>{item.product.name}</h4>
                           <p className="ml-4">₹{item.priceAtPurchase.toString()}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.product.description}</p>
                        <div className="flex flex-1 items-end justify-between text-sm">
                           <p className="text-gray-500">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
               </ul>
            </div>
          </div>

          {/* Logistics Panel */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
                <h3 className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  <MapPin className="mr-2 h-4 w-4" /> Shipping Address
                </h3>
                <address className="not-italic text-sm text-gray-600 dark:text-gray-400 space-y-1">
                   <p className="font-medium text-gray-900 dark:text-white">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                   <p>{order.shippingAddress.addressLine1}</p>
                   {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                   <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                   <p>{order.shippingAddress.country}</p>
                </address>
            </div>

             <div className="bg-gray-50 dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
                 <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Summary</h3>
                 <dl className="space-y-4 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-zinc-800 pb-4">
                    <div className="flex justify-between">
                       <dt>Subtotal</dt>
                       <dd className="text-gray-900 dark:text-white font-medium">₹{order.totalAmount.toString()}</dd>
                    </div>
                    <div className="flex justify-between">
                       <dt>Shipping</dt>
                       <dd className="text-gray-900 dark:text-white font-medium">Calculated</dd>
                    </div>
                 </dl>
                 <div className="flex justify-between pt-4 font-semibold text-gray-900 dark:text-white text-base">
                    <dt>Total</dt>
                    <dd>₹{order.totalAmount.toString()}</dd>
                 </div>
                 <p className="mt-4 text-xs text-gray-500">Payment Processed securely via Offline/Mock Method.</p>
             </div>
          </div>
       </div>

    </div>
  )
}
