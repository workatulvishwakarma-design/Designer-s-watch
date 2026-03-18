import { WishlistGrid } from "@/components/user/WishlistGrid"

export default function WishlistPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:tracking-tight">
          Your Wishlist
        </h2>
        <p className="mt-1 text-sm text-gray-500">Items you've saved for later. Move them to your cart when you're ready.</p>
      </div>

      <WishlistGrid />
    </div>
  )
}
