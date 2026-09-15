import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, MapPin, Package, CheckCircle2, Clock, Truck } from "lucide-react"
import { resolveOrderItemImage } from "@/lib/orderImageResolver"
import { OrderActionButtons } from "@/components/user/OrderActionModals"

export default async function UserOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth()
  if (!session || !session.user?.id) return redirect("/login")

  const order = await prisma.order.findUnique({
    where: { 
       id: id,
       userId: session.user.id // Security constraint: user can only see their own order
    },
    include: {
      shippingAddress: true,
      items: {
        include: {
          variant: {
            include: {
              family: {
                include: { images: true }
              }
            }
          }
        }
      },
      trackingEvents: { orderBy: { createdAt: "desc" } } // Newest first
    }
  })

  if (!order) return notFound()

  // Reverse to show oldest first in visual timeline
  const chronologicalEvents = [...order.trackingEvents].reverse() 

  const getStatusIcon = (status: string) => {
    if (status === "DELIVERED") return <CheckCircle2 className="h-5 w-5 text-white" />
    if (status === "SHIPPED") return <Truck className="h-5 w-5 text-white" />
    return <Clock className="h-5 w-5 text-[#9A7640]" />
  }

  const getStatusBg = (status: string) => {
    if (status === "DELIVERED") return "bg-[#003926] ring-4 ring-[#EBF7F0]"
    if (status === "SHIPPED") return "bg-[#2554C7] ring-4 ring-[#EEF4FF]"
    return "bg-[#FAF3E8] ring-4 ring-[#F5EAD8]"
  }

  return (
    <div className="space-y-8 max-w-5xl">
       {/* Breadcrumb & Actions */}
       <div className="pb-6 border-b border-[#E8E0D5]">
        <Link href="/account/orders" className="text-xs font-body tracking-wider uppercase text-[#7A756D] hover:text-[#B8935A] inline-flex items-center mb-4 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Orders
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-body uppercase tracking-[0.2em] text-[#B8935A] font-medium block">
              Order Details
            </span>
            <h2 className="text-2xl sm:text-3xl font-display text-[#1A1918] tracking-tight">
              #{order.id.slice(-8).toUpperCase()}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#7A756D] font-body">
              Placed on <time>{order.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </p>
          </div>
          <div>
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
          </div>
        </div>
      </div>

      {/* Visual Tracking Timeline */}
      <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <h3 className="text-base font-display text-[#1A1918] font-medium mb-6">Package Tracking & Shipment</h3>
        
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {chronologicalEvents.map((event, eventIdx) => (
              <li key={event.id}>
                <div className="relative pb-8">
                  {eventIdx !== chronologicalEvents.length - 1 ? (
                    <span className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-[#E8E0D5]" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex items-start space-x-4">
                    <div className="relative">
                      <span className={`h-10 w-10 rounded-full flex items-center justify-center ${getStatusBg(event.status)}`}>
                        {getStatusIcon(event.status)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 py-1">
                      <div className="text-sm">
                        <span className="font-semibold text-[#1A1918]">{event.status}</span>
                        {event.description && <p className="text-xs sm:text-sm mt-0.5 text-[#5C5752]">{event.description}</p>}
                      </div>
                      <div className="mt-1 text-xs text-[#9C9690] font-mono">
                        {event.createdAt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric'})}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {chronologicalEvents.length === 0 && (
               <p className="text-sm text-[#7A756D] italic py-2">We&apos;re preparing your order details with our logistics partners...</p>
            )}
          </ul>
        </div>
      </div>

       <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-8">
          {/* Order Details List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[#E8E0D5] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
               <div className="px-6 py-4 bg-[#FAF8F4] border-b border-[#E8E0D5]">
                 <h3 className="flex items-center text-sm font-body uppercase tracking-wider text-[#1A1918] font-semibold">
                   <Package className="mr-2 h-4 w-4 text-[#B8935A]" /> Timepieces in Order
                 </h3>
               </div>
               <ul className="divide-y divide-[#F0EBE1] px-6">
                  {order.items.map((item) => {
                    const itemImage = resolveOrderItemImage({
                      sku: item.variant?.sku,
                      name: item.variant?.family?.name,
                      familySlug: item.variant?.family?.slug,
                      dbUrl: item.variant?.family?.images?.[0]?.url
                    })
                    return (
                      <li key={item.id} className="flex py-6 items-center">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] p-2 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={itemImage} alt={item.variant?.family?.name || "Timepiece"} className="h-full w-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="ml-6 flex flex-1 flex-col">
                          <div className="flex justify-between text-base font-medium text-[#1A1918]">
                             <h4 className="font-display text-lg">{item.variant?.family?.name || item.variant?.sku}</h4>
                             <p className="ml-4 font-semibold text-[#1A1918]">₹{item.priceAtPurchase.toString()}</p>
                          </div>
                          <p className="mt-1 text-xs text-[#7A756D] line-clamp-2">{item.variant?.family?.description}</p>
                          <div className="flex flex-1 items-end justify-between text-xs mt-3">
                             <span className="px-2 py-0.5 rounded bg-[#F0EBE1] text-[#6E685E] font-mono">{item.variant?.sku}</span>
                             <p className="text-[#9C9690]">Qty: <strong className="text-[#1A1918]">{item.quantity}</strong></p>
                          </div>
                        </div>
                      </li>
                    )
                  })}
               </ul>
            </div>
          </div>

          {/* Logistics Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h3 className="flex items-center text-xs font-body uppercase tracking-wider font-semibold text-[#1A1918] mb-4">
                  <MapPin className="mr-2 h-4 w-4 text-[#B8935A]" /> Shipping Address
                </h3>
                <address className="not-italic text-xs sm:text-sm text-[#5C5752] space-y-1">
                   <p className="font-semibold text-[#1A1918]">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                   <p>{order.shippingAddress.addressLine1}</p>
                   {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                   <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                   <p>{order.shippingAddress.country}</p>
                   {order.shippingAddress.phone && <p className="pt-2 text-[#9C9690]">{order.shippingAddress.phone}</p>}
                </address>
            </div>

             <div className="bg-[#FAF8F4] rounded-2xl border border-[#E8E0D5] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                 <h3 className="text-xs font-body uppercase tracking-wider font-semibold text-[#1A1918] mb-4">Payment & Summary</h3>
                 <dl className="space-y-3 text-xs sm:text-sm text-[#5C5752] border-b border-[#E8E0D5] pb-4">
                    <div className="flex justify-between">
                       <dt>Subtotal</dt>
                       <dd className="text-[#1A1918] font-medium">₹{order.totalAmount.toString()}</dd>
                    </div>
                    <div className="flex justify-between">
                       <dt>Doorstep Delivery</dt>
                       <dd className="text-[#003926] font-medium">Complimentary</dd>
                    </div>
                 </dl>
                 <div className="flex justify-between pt-4 font-semibold text-[#1A1918] text-base">
                    <dt>Total</dt>
                    <dd className="text-[#1A1918]">₹{Number(order.totalAmount).toLocaleString("en-IN")}</dd>
                 </div>
                 <p className="mt-3 text-[11px] text-[#9C9690]">Payment verified and processed securely.</p>
             </div>
          </div>
       </div>

    </div>
  )
}
