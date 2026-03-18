import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, Package, MapPin, CreditCard, ChevronRight } from "lucide-react"

export default async function OrderSuccessPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session || !session.user?.id) {
    redirect("/login")
  }

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: {
        include: {
          product: {
            select: { name: true, images: { take: 1 } }
          }
        }
      },
      shippingAddress: true,
      coupon: true
    }
  })

  // Ensure order belongs to user
  if (!order || order.userId !== session.user.id) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12 animate-in slide-in-from-bottom-6 fade-in duration-700">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-[#1A1918] mb-4">Order Confirmed</h1>
          <p className="text-[#9C9690] font-body text-lg">Thank you for your purchase from Designer&apos;s Watch.</p>
          <div className="inline-block mt-4 px-4 py-2 bg-white border border-[#E8E0D5] rounded-lg">
            <span className="text-[10px] text-[#9C9690] uppercase tracking-widest font-body block mb-1">Order Reference</span>
            <span className="font-mono text-[#B8935A] font-medium tracking-wider">{order.id.slice(-12).toUpperCase()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Order Details Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#E8E0D5] shadow-sm">
              <h2 className="font-display text-xl text-[#1A1918] mb-6 flex items-center gap-2 pb-4 border-b border-[#E8E0D5]">
                <Package className="text-[#B8935A]" size={20} /> Items Ordered
              </h2>
              <ul className="space-y-6">
                {order.items.map((item: any) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-[#F5F2ED] rounded-xl flex items-center justify-center p-2 flex-shrink-0">
                      <img 
                        src={item.product.images[0]?.url || "https://picsum.photos/200"} 
                        alt={item.product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-body font-medium text-[#1A1918] text-sm line-clamp-2">{item.product.name}</h3>
                      <p className="text-[10px] text-[#9C9690] uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-[#1A1918] font-medium font-body text-sm flex items-center">
                      ₹{(Number(item.priceAtPurchase) * item.quantity).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-8 border border-[#E8E0D5] shadow-sm">
                <h2 className="font-display text-lg text-[#1A1918] mb-4 flex items-center gap-2 pb-3 border-b border-[#E8E0D5]">
                  <MapPin className="text-[#B8935A]" size={18} /> Shipping Info
                </h2>
                <div className="text-sm font-body text-[#5C5752] space-y-1">
                  <p className="font-medium text-[#1A1918]">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                  <p>{order.shippingAddress?.addressLine1}</p>
                  {order.shippingAddress?.addressLine2 && <p>{order.shippingAddress?.addressLine2}</p>}
                  <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</p>
                  <p>{order.shippingAddress?.country}</p>
                  {order.shippingAddress?.phone && <p className="pt-2 text-[#9C9690]">{order.shippingAddress?.phone}</p>}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-[#E8E0D5] shadow-sm">
                <h2 className="font-display text-lg text-[#1A1918] mb-4 flex items-center gap-2 pb-3 border-b border-[#E8E0D5]">
                  <CreditCard className="text-[#B8935A]" size={18} /> Payment Status
                </h2>
                <div className="text-sm font-body space-y-3 text-[#5C5752]">
                  <div className="flex justify-between items-center">
                    <span>Method</span>
                    <span className="font-medium text-[#1A1918]">
                      {order.paymentMethod === 'CARD' ? 'Credit/Debit Card' :
                       order.paymentMethod === 'UPI' ? 'UPI Transfer' :
                       order.paymentMethod === 'NET_BANKING' ? 'Net Banking' :
                       order.paymentMethod === 'COD' ? 'Cash on Delivery' :
                       order.paymentMethod || 'Secure Gateway'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Status</span>
                    {order.paymentMethod === 'COD' ? (
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200">Pending</span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold tracking-widest text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200">Successful</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Order Date</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-3xl p-8 border border-[#E8E0D5] shadow-sm sticky top-32">
              <h2 className="font-display text-xl text-[#1A1918] mb-6 pb-4 border-b border-[#E8E0D5]">Order Summary</h2>
              
              <dl className="space-y-4 font-body text-sm mb-8 text-[#5C5752]">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="font-medium text-[#1A1918]">
                    ₹{(Number(order.totalAmount) + Number(order.taxAmount) - Number(order.shippingAmount)).toLocaleString()}
                  </dd>
                </div>
                {order.coupon && (
                  <div className="flex justify-between text-green-600">
                    <dt>Promo Code Applied</dt>
                    <dd className="uppercase">{order.coupon.code}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd>{Number(order.shippingAmount) === 0 ? <span className="text-green-600">Free</span> : `₹${Number(order.shippingAmount).toLocaleString()}`}</dd>
                </div>
                <div className="flex justify-between text-[#9C9690] text-xs">
                  <dt>Taxes (GST)</dt>
                  <dd>₹{Number(order.taxAmount).toLocaleString()}</dd>
                </div>
                <div className="pt-4 border-t border-[#E8E0D5] flex justify-between text-[#1A1918] text-xl font-medium items-end">
                  <dt className="text-sm">Total Paid</dt>
                  <dd>₹{Number(order.totalAmount).toLocaleString()}</dd>
                </div>
              </dl>

              <div className="space-y-3">
                <Link
                  href={`/account/orders/${order.id}`}
                  className="w-full bg-[#1A1918] text-white py-4 flex items-center justify-center gap-2 rounded-full font-body text-xs tracking-[0.2em] uppercase hover:bg-[#B8935A] transition-colors"
                >
                  View Order Status <ChevronRight size={16} />
                </Link>
                <Link
                  href="/collections/dsigner"
                  className="w-full bg-white text-[#1A1918] border border-[#E8E0D5] py-4 flex items-center justify-center rounded-full font-body text-xs tracking-[0.2em] uppercase hover:bg-[#FAF8F4] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
