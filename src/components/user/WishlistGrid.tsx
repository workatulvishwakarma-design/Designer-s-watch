"use client"

import { useWishlistStore } from "@/lib/store/wishlist"
import { useCartStore } from "@/lib/store/cart"
import Link from "next/link"
import { HeartOff, ShoppingBag, Trash2, ArrowUpRight, Eye } from "lucide-react"
import { toast } from "sonner"
import { resolveOrderItemImage } from "@/lib/orderImageResolver"

export function WishlistGrid() {
  const { items, removeItem } = useWishlistStore()
  const { addItem } = useCartStore()

  const handleAddToCart = (item: any) => {
    addItem({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      slug: item.slug
    })
    toast.success(`${item.name} added to your shopping bag!`)
  }

  if (items.length === 0) {
    return (
      <div className="text-center rounded-3xl border-2 border-dashed border-[#E8E0D5] bg-[#FAF8F4]/50 p-12 sm:p-16">
        <div className="w-16 h-16 bg-white rounded-2xl border border-[#E8E0D5] flex items-center justify-center mx-auto mb-4 shadow-sm">
          <HeartOff className="h-8 w-8 text-[#B8935A]" />
        </div>
        <h3 className="text-lg font-display text-[#1A1918]">Your Wishlist is Empty</h3>
        <p className="mt-2 text-xs sm:text-sm text-[#7A756D] max-w-sm mx-auto font-body">
          You haven&apos;t saved any timepieces yet. Explore our handcrafted collections to curate your favorites.
        </p>
        <div className="mt-6">
          <Link
            href="/collections/dsigner"
            className="inline-flex items-center gap-2 rounded-full bg-[#1A1918] px-6 py-3 text-xs font-body tracking-[0.2em] uppercase text-white shadow-md hover:bg-[#B8935A] transition-colors"
          >
            <span>Browse Timepieces</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {items.map((item) => {
        const watchImage = resolveOrderItemImage({
          sku: item.name,
          name: item.name,
          familySlug: item.slug,
          dbUrl: item.image,
        })

        return (
          <div
            key={item.productId}
            className="group relative rounded-2xl border border-[#E8E0D5] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(184,147,90,0.12)] hover:border-[#B8935A]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Image Stage */}
            <div className="relative aspect-[4/3] w-full bg-gradient-to-b from-[#FAF8F4] to-[#F5F0E6] p-6 flex items-center justify-center overflow-hidden">
              {/* Remove button (top right) */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  removeItem(item.productId)
                  toast.info("Removed from wishlist")
                }}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-[#E8E0D5] text-[#9C9690] hover:text-red-500 hover:border-red-200 transition-all duration-200 flex items-center justify-center shadow-sm"
                title="Remove from wishlist"
              >
                <Trash2 size={15} />
              </button>

              {/* Product Photo */}
              <Link href={`/product/${item.slug}`} className="w-full h-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={watchImage}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-500"
                />
              </Link>
            </div>

            {/* Content & Actions */}
            <div className="p-5 flex flex-col flex-1 justify-between bg-white border-t border-[#F0EBE1]">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-[#F0EBE1] text-[#6E685E]">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-body text-[#003926] font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#003926]" />
                    In Stock
                  </span>
                </div>

                <h3 className="font-display text-base sm:text-lg text-[#1A1918] font-medium leading-snug group-hover:text-[#B8935A] transition-colors line-clamp-1">
                  <Link href={`/product/${item.slug}`}>
                    {item.name}
                  </Link>
                </h3>

                <div className="mt-2 text-base sm:text-lg font-body font-semibold text-[#1A1918]">
                  ₹{Number(item.price).toLocaleString("en-IN")}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-[#F0EBE1] flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleAddToCart(item)
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1A1918] text-white hover:bg-[#B8935A] text-xs font-body tracking-wider uppercase transition-all duration-200 shadow-sm"
                >
                  <ShoppingBag size={14} />
                  <span>Move to Bag</span>
                </button>

                <Link
                  href={`/product/${item.slug}`}
                  className="p-2.5 rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] hover:bg-white text-[#706B65] hover:text-[#1A1918] transition-colors"
                  title="View Timepiece"
                >
                  <Eye size={16} />
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
