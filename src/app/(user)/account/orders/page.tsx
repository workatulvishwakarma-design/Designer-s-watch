import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Package, ChevronRight, Calendar, Hash, ShieldCheck, ArrowUpRight } from "lucide-react"
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

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "DELIVERED":
        return {
          label: "Delivered",
          bg: "bg-[#EBF7F0]",
          text: "text-[#003926]",
          border: "border-[#CDE9D9]",
          dot: "bg-[#003926]"
        }
      case "SHIPPED":
        return {
          label: "Shipped",
          bg: "bg-[#EEF4FF]",
          text: "text-[#2554C7]",
          border: "border-[#D5E1FC]",
          dot: "bg-[#2554C7]"
        }
      case "PROCESSING":
        return {
          label: "Processing",
          bg: "bg-[#FAF3E8]",
          text: "text-[#9A7640]",
          border: "border-[#E8D7BE]",
          dot: "bg-[#B8935A]"
        }
      case "PENDING":
        return {
          label: "Order Placed",
          bg: "bg-[#FFF9EC]",
          text: "text-[#9A7640]",
          border: "border-[#ECDBC3]",
          dot: "bg-[#D9822B]"
        }
      case "CANCELLED":
      case "REFUNDED":
        return {
          label: status,
          bg: "bg-[#FEF2F2]",
          text: "text-[#B91C1C]",
          border: "border-[#FECACA]",
          dot: "bg-[#DC2626]"
        }
      default:
        return {
          label: status,
          bg: "bg-[#FAF8F4]",
          text: "text-[#706B65]",
          border: "border-[#EDE8DF]",
          dot: "bg-[#9C9690]"
        }
    }
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E0D5]">
        <div>
          <span className="text-[11px] font-body tracking-[0.25em] uppercase text-[#B8935A] font-medium block mb-1">
            Account Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-display text-[#1A1918] tracking-tight">
            Order History & Status
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#7A756D] font-body">
            Review recent timepiece acquisitions, track shipments, and request doorstep returns or exchanges.
          </p>
        </div>

        {orders.length > 0 && (
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#FAF8F4] border border-[#E8E0D5] text-xs font-body text-[#706B65]">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"} Found
            </span>
          </div>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="text-center rounded-3xl border-2 border-dashed border-[#E8E0D5] bg-[#FAF8F4]/50 p-12 sm:p-16">
          <div className="w-16 h-16 bg-white rounded-2xl border border-[#E8E0D5] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Package className="h-8 w-8 text-[#B8935A]" />
          </div>
          <h3 className="text-lg font-display text-[#1A1918]">No Orders Yet</h3>
          <p className="mt-2 text-xs sm:text-sm text-[#7A756D] max-w-sm mx-auto font-body">
            Explore our handcrafted luxury collections and place your first order.
          </p>
          <div className="mt-6">
            <Link
              href="/collections/dsigner"
              className="inline-flex items-center gap-2 rounded-full bg-[#1A1918] px-6 py-3 text-xs font-body tracking-[0.2em] uppercase text-white shadow-md hover:bg-[#B8935A] transition-colors"
            >
              <span>Explore Timepieces</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const statusConfig = getStatusBadge(order.status)
            const shortId = order.id.slice(-8).toUpperCase()
            const formattedDate = order.createdAt.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })

            return (
              <div
                key={order.id}
                className="bg-white border border-[#E8E0D5] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(184,147,90,0.08)] transition-all duration-300"
              >
                {/* Order Card Header */}
                <div className="bg-gradient-to-r from-[#FAF8F4] to-[#F5F0E6] px-5 py-4 sm:px-6 border-b border-[#E8E0D5]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Order Metadata Pills */}
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 sm:gap-8">
                      <div>
                        <div className="flex items-center gap-1 text-[11px] font-body uppercase tracking-wider text-[#9C9690]">
                          <Calendar size={12} className="text-[#B8935A]" />
                          <span>Order Placed</span>
                        </div>
                        <dd className="mt-1 text-xs sm:text-sm font-body font-semibold text-[#1A1918]">
                          {formattedDate}
                        </dd>
                      </div>

                      <div>
                        <div className="flex items-center gap-1 text-[11px] font-body uppercase tracking-wider text-[#9C9690]">
                          <Hash size={12} className="text-[#B8935A]" />
                          <span>Reference</span>
                        </div>
                        <dd className="mt-1 text-xs sm:text-sm font-mono font-medium text-[#B8935A]">
                          #{shortId}
                        </dd>
                      </div>

                      <div>
                        <div className="text-[11px] font-body uppercase tracking-wider text-[#9C9690]">
                          Total Amount
                        </div>
                        <dd className="mt-1 text-xs sm:text-sm font-body font-semibold text-[#1A1918]">
                          ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                        </dd>
                      </div>
                    </div>

                    {/* Status Pill with Pulsing Dot */}
                    <div className="flex items-center self-start md:self-auto">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-body font-medium ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                      >
                        <span className={`w-2 h-2 rounded-full animate-pulse ${statusConfig.dot}`} />
                        <span>{statusConfig.label}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="p-5 sm:p-6 divide-y divide-[#F0EBE1]">
                  {order.items.map((item) => {
                    const itemImage = resolveOrderItemImage({
                      sku: item.variant?.sku,
                      name: item.variant?.family?.name,
                      familySlug: item.variant?.family?.slug,
                      dbUrl: item.variant?.family?.images?.[0]?.url,
                    })

                    return (
                      <div
                        key={item.id}
                        className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          {/* Watch Photo Showcase */}
                          <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] p-2 flex items-center justify-center group shadow-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={itemImage}
                              alt={item.variant?.family?.name || "Luxury Timepiece"}
                              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 mix-blend-multiply"
                            />
                          </div>

                          {/* Timepiece Info */}
                          <div className="space-y-1">
                            <h4 className="font-display text-base sm:text-lg text-[#1A1918] font-medium leading-snug">
                              {item.variant?.family?.name || item.variant?.sku}
                            </h4>

                            <div className="flex flex-wrap items-center gap-2 pt-0.5">
                              {item.variant?.sku && (
                                <span className="inline-block px-2 py-0.5 rounded bg-[#F0EBE1] text-[#6E685E] text-[11px] font-mono tracking-wider">
                                  {item.variant.sku}
                                </span>
                              )}
                              <span className="text-xs text-[#9C9690] font-body">
                                Quantity: <strong className="text-[#1A1918] font-medium">{item.quantity}</strong>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Price Column */}
                        <div className="sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
                          <span className="text-[11px] text-[#9C9690] uppercase tracking-wider font-body sm:block">
                            Item Total
                          </span>
                          <span className="text-base font-body font-semibold text-[#1A1918]">
                            ₹{(Number(item.priceAtPurchase) * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Card Action Bar */}
                <div className="bg-[#FAF8F4]/60 border-t border-[#E8E0D5] px-5 py-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Reassurance Badge */}
                  <div className="flex items-center gap-2 text-xs text-[#7A756D] font-body">
                    <ShieldCheck size={16} className="text-[#003926] flex-shrink-0" />
                    <span>Eligible for 7-day doorstep return & warranty support</span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <OrderActionButtons
                      order={{
                        id: order.id,
                        totalAmount: order.totalAmount.toString(),
                        createdAt: order.createdAt.toISOString(),
                        status: order.status,
                        shippingAddress: order.shippingAddress
                          ? {
                              firstName: order.shippingAddress.firstName ?? undefined,
                              lastName: order.shippingAddress.lastName ?? undefined,
                              city: order.shippingAddress.city ?? undefined,
                              state: order.shippingAddress.state ?? undefined,
                              postalCode: order.shippingAddress.postalCode ?? undefined,
                              phone: order.shippingAddress.phone ?? undefined,
                            }
                          : null,
                        items: order.items.map((item) => ({
                          variant: {
                            sku: item.variant?.sku ?? undefined,
                            family: { name: item.variant?.family?.name ?? undefined },
                          },
                          quantity: item.quantity,
                        })),
                      }}
                    />

                    <Link
                      href={`/account/orders/${order.id}`}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A1918] text-white hover:bg-[#B8935A] text-xs font-body tracking-wider uppercase transition-all duration-200 shadow-sm"
                    >
                      <span>View Details</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
