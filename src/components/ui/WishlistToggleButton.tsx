import { useState, useEffect } from "react"
import { useWishlistStore } from "@/lib/store/wishlist"
import { toast } from "sonner"
import { Heart } from "lucide-react"

interface WishlistToggleButtonProps {
  product: {
    id: string
    name: string
    price: number
    image?: string
    slug: string
  }
  className?: string
}

export function WishlistToggleButton({ product, className = "" }: WishlistToggleButtonProps) {
  const { toggleItem, isInWishlist } = useWishlistStore()
  
  // We use hydration-safe initial render pattern by defaulting to false during SSR
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const isSaved = mounted ? isInWishlist(product.id) : false

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    toggleItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug
    })

    if (isSaved) {
      toast.info("Removed from wishlist")
    } else {
      toast.success("Added to wishlist")
    }
  }

  return (
    <button 
      onClick={handleToggle}
      className={`p-2 rounded-full shadow-sm transition-colors ${
        isSaved 
          ? "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400" 
          : "bg-white text-gray-400 hover:text-red-500 dark:bg-zinc-800 dark:hover:text-red-400"
      } ${className}`}
      aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
    </button>
  )
}
