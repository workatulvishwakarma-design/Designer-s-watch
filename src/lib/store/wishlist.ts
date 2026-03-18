import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface WishlistItem {
  productId: string
  name: string
  price: number
  image?: string
  slug: string
}

interface WishlistState {
  items: WishlistItem[]
  toggleItem: (item: WishlistItem) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      toggleItem: (newItem) => {
        const { items } = get()
        const isExisting = items.some((item) => item.productId === newItem.productId)

        if (isExisting) {
          // Remove if it exists
          set({ items: items.filter((item) => item.productId !== newItem.productId) })
        } else {
          // Add if it doesn't exist
          set({ items: [...items, newItem] })
        }
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId)
        }))
      },

      isInWishlist: (productId) => {
        return get().items.some(item => item.productId === productId)
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "watch-wishlist-storage",
    }
  )
)
