"use client"

import { useCartStore } from "@/lib/store/cart"
import { toast } from "sonner"
import { ShoppingCart } from "lucide-react"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image?: string
    slug: string
  }
  variant?: "primary" | "secondary" | "icon"
  selectedVariant?: {
    color?: string
    size?: string
  }
  className?: string
}

export function AddToCartButton({ product, variant = "primary", selectedVariant, className = "" }: AddToCartButtonProps) {
  const { addItem } = useCartStore()

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      slug: product.slug,
      variant: selectedVariant
    })
    
    toast.success(`${product.name} added to cart`, {
       description: selectedVariant 
         ? `${selectedVariant.color || ''} ${selectedVariant.size || ''}`.trim()
         : "View your cart to checkout."
    })
  }

  if (variant === "icon") {
    return (
      <button 
        onClick={handleAdd}
        className={`p-2 rounded-full bg-white dark:bg-zinc-800 shadow-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors ${className}`}
        aria-label="Add to cart"
      >
        <ShoppingCart className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={handleAdd}
      className={`flex items-center justify-center font-body text-[11px] tracking-[0.2em] uppercase transition-all duration-500 rounded-full ${
        variant === "primary" 
          ? "bg-[#1A1918] text-white hover:bg-[#B8935A] shadow-lg shadow-black/5" 
          : "border border-[#EDE8DF] text-[#1A1918] hover:border-[#B8935A] hover:text-[#B8935A]"
      } ${className}`}
    >
      Add to Cart
    </button>
  )
}
