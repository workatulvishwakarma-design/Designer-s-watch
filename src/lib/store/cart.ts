import { create } from "zustand"
import { persist } from "zustand/middleware"
import { trackCartEvent } from "@/lib/cart-tracking"

export interface CartItem {
  id: string // cart item ID if synced, or local random id
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  slug: string
  variant?: {
    color?: string
    size?: string
  }
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  toggleCart: () => void
  addItem: (item: Omit<CartItem, "id">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getUniqueItemCount: () => number
  getSubtotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (isOpen: boolean) => set({ isOpen }),
      toggleCart: () => set((state: CartState) => ({ isOpen: !state.isOpen })),
      
      addItem: (newItem: Omit<CartItem, "id">) => {
        const { items } = get()
        
        // Find item with same productId AND same variant
        const existingItemIndex = items.findIndex((item: CartItem) => {
          const sameProduct = item.productId === newItem.productId
          const sameColor = item.variant?.color === newItem.variant?.color
          const sameSize = item.variant?.size === newItem.variant?.size
          return sameProduct && sameColor && sameSize
        })

        if (existingItemIndex !== -1) {
          // If product variant already in cart, increment quantity
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += newItem.quantity
          set({ items: updatedItems, isOpen: true })
          trackCartEvent(newItem.slug || newItem.productId, newItem.name, "ADD", newItem.quantity)
        } else {
          // Add new item variant
          set({ 
            items: [...items, { ...newItem, id: Math.random().toString(36).substring(2, 11) }],
            isOpen: true
          })
          trackCartEvent(newItem.slug || newItem.productId, newItem.name, "ADD", newItem.quantity)
        }
      },

      removeItem: (id: string) => {
        const item = get().items.find((i: CartItem) => i.id === id)
        if (item) trackCartEvent(item.slug || item.productId, item.name, "REMOVE", item.quantity)
        set((state: CartState) => ({
          items: state.items.filter((item: CartItem) => item.id !== id)
        }))
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity < 1) return
        set((state: CartState) => ({
          items: state.items.map((item: CartItem) => 
            item.id === id ? { ...item, quantity } : item
          )
        }))
      },

      clearCart: () => set({ items: [] }),

      getUniqueItemCount: () => {
        return get().items.length
      },

      getSubtotal: () => {
        return get().items.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0)
      }
    }),
    {
      name: "watch-cart-storage",
    }
  )
)
