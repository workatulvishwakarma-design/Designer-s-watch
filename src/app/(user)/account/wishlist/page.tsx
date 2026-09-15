import { WishlistGrid } from "@/components/user/WishlistGrid"

export default function WishlistPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-[#E8E0D5]">
        <span className="text-[11px] font-body tracking-[0.25em] uppercase text-[#B8935A] font-medium block mb-1">
          Account Portal
        </span>
        <h2 className="text-2xl sm:text-3xl font-display text-[#1A1918] tracking-tight">
          Your Saved Timepieces
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-[#7A756D] font-body">
          Timepieces you&apos;ve earmarked for your personal collection. Move them to your shopping bag when you&apos;re ready.
        </p>
      </div>

      <WishlistGrid />
    </div>
  )
}
