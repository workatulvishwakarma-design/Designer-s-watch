import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, User, ShoppingBag, MapPin, CreditCard, Clock, DollarSign, Package, Heart } from "lucide-react"
import { Badge } from "@/components/admin/Badge"

export default async function AdminCustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        include: {
          items: { include: { product: { select: { name: true } } } },
        }
      },
      addresses: { orderBy: { isDefault: "desc" } },
      reviews: {
        include: { product: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 5
      },
    }
  })

  if (!user || user.role !== "CUSTOMER") notFound()

  const totalSpent = user.orders.reduce((sum, o) => sum + Number(o.totalAmount), 0)
  const deliveredOrders = user.orders.filter(o => o.status === "DELIVERED").length
  const codOrders = user.orders.filter(o => o.isCOD).length
  const prepaidOrders = user.orders.filter(o => !o.isCOD).length

  // Abandoned checkouts
  let abandonedCount = 0
  try {
    abandonedCount = await prisma.abandonedCheckout.count({
      where: { OR: [{ email: user.email || undefined }, { phone: user.addresses?.[0]?.phone || undefined }] }
    })
  } catch {}

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED": return "success"
      case "PENDING": case "PROCESSING": return "warning"
      case "CANCELLED": case "REFUNDED": return "error"
      case "SHIPPED": return "info"
      default: return "neutral"
    }
  }

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <Link href="/admin/customers" className="text-sm font-medium text-gray-500 hover:text-gray-900 inline-flex items-center mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Customers
        </Link>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-2xl font-bold">
            {(user.name || "?")[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name || "Unnamed Customer"}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-400 mt-0.5">Member since {user.createdAt.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>
          </div>
        </div>
      </div>

      {/* Customer Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        <MetricCard icon={ShoppingBag} label="Total Orders" value={user.orders.length} />
        <MetricCard icon={DollarSign} label="Lifetime Value" value={`₹${totalSpent.toLocaleString()}`} highlight />
        <MetricCard icon={Package} label="Delivered" value={deliveredOrders} />
        <MetricCard icon={CreditCard} label="Prepaid" value={prepaidOrders} />
        <MetricCard icon={CreditCard} label="COD" value={codOrders} />
        <MetricCard icon={Clock} label="Abandoned" value={abandonedCount} alert={abandonedCount > 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order History */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-800">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-gray-400" /> Order History
            </h3>
          </div>
          {user.orders.length === 0 ? (
            <div className="py-12 text-center">
              <ShoppingBag className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No orders placed yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-zinc-800">
              {user.orders.map((order) => (
                <Link key={order.id} href={`/admin/orders/${order.id}`} className="block px-6 py-4 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Order #{order.id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {order.createdAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        {" · "}
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                        {order.isCOD && <span className="ml-2 text-amber-600">COD</span>}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">₹{Number(order.totalAmount).toLocaleString()}</p>
                      <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Addresses */}
          <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-gray-400" /> Saved Addresses
            </h3>
            {user.addresses.length === 0 ? (
              <p className="text-xs text-gray-500">No addresses saved.</p>
            ) : (
              <div className="space-y-4">
                {user.addresses.map((addr) => (
                  <div key={addr.id} className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                      <p className="font-medium text-gray-900 dark:text-white">{addr.firstName} {addr.lastName}
                        {addr.isDefault && <span className="ml-2 text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Default</span>}
                      </p>
                      <p>{addr.addressLine1}</p>
                      {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                      <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                      {addr.phone && <p className="text-gray-500">{addr.phone}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Reviews */}
          <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <Heart className="h-4 w-4 text-gray-400" /> Recent Reviews
            </h3>
            {user.reviews.length === 0 ? (
              <p className="text-xs text-gray-500">No reviews written.</p>
            ) : (
              <div className="space-y-3">
                {user.reviews.map((review) => (
                  <div key={review.id} className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800">
                    <div className="flex items-center gap-1 text-yellow-500 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`text-xs ${i < review.rating ? "" : "opacity-20"}`}>★</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">{review.comment}</p>
                    <p className="text-[10px] text-gray-400 mt-1">on {review.product.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Breakdown */}
          <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <CreditCard className="h-4 w-4 text-gray-400" /> Payment Methods Used
            </h3>
            <div className="space-y-2">
              {prepaidOrders > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Online / Prepaid</span>
                  <span className="text-xs font-semibold text-blue-600">{prepaidOrders} orders</span>
                </div>
              )}
              {codOrders > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Cash on Delivery</span>
                  <span className="text-xs font-semibold text-amber-600">{codOrders} orders</span>
                </div>
              )}
              {user.orders.length === 0 && (
                <p className="text-xs text-gray-500">No payment data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ icon: Icon, label, value, highlight = false, alert = false }: any) {
  return (
    <div className={`bg-white dark:bg-zinc-900 border ${alert ? 'border-amber-200' : 'border-gray-100 dark:border-zinc-800'} rounded-xl p-4 shadow-sm text-center`}>
      <Icon className={`w-4 h-4 mx-auto mb-2 ${highlight ? 'text-emerald-600' : alert ? 'text-amber-500' : 'text-gray-400'}`} />
      <p className={`text-lg font-semibold ${highlight ? 'text-emerald-600' : alert ? 'text-amber-600' : 'text-gray-900 dark:text-white'}`}>{value}</p>
      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">{label}</p>
    </div>
  )
}
