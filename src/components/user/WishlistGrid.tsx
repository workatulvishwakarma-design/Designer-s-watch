"use client"

import { useWishlistStore } from "@/lib/store/wishlist"
import { useCartStore } from "@/lib/store/cart"
import Link from "next/link"
import { HeartOff, ShoppingCart, Trash2 } from "lucide-react"
import { toast } from "sonner"

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
    toast.success(`${item.name} added to cart!`)
  }

  if (items.length === 0) {
    return (
      <div className="text-center rounded-xl border-2 border-dashed border-gray-300 dark:border-zinc-800 p-12 mt-6">
        <HeartOff className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">Empty Wishlist</h3>
        <p className="mt-1 text-sm text-gray-500">You haven't saved any items to your wishlist yet.</p>
        <div className="mt-6">
          <Link href="/watches" className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400 hover:text-blue-500">
            Browse Watches <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {items.map((item) => (
        <div key={item.productId} className="group relative border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-50 dark:bg-zinc-950">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image || "https://picsum.photos/400"}
              alt={item.name}
              className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4 flex flex-col gap-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              <Link href={`/product/${item.slug}`}>
                <span aria-hidden="true" className="absolute inset-0 z-0" />
                {item.name}
              </Link>
            </h3>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">₹{item.price.toLocaleString()}</p>
            
            <div className="mt-2 pt-4 border-t border-gray-100 dark:border-zinc-800 flex justify-between relative z-10 w-full">
               <button
                  onClick={(e) => { e.preventDefault(); handleAddToCart(item) }}
                  className="flex flex-1 items-center justify-center bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 transition-colors py-2 rounded-md text-xs font-semibold mr-2"
               >
                 <ShoppingCart className="h-4 w-4 mr-1.5" /> Move to Cart
               </button>
               <button
                  onClick={(e) => { e.preventDefault(); removeItem(item.productId); toast.info("Removed from wishlist") }}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
               >
                 <Trash2 className="h-4 w-4" />
               </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
