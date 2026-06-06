"use client";

/**
 * Luxury skeleton loaders for collection pages.
 * Uses CSS-based shimmer animation (skeleton-shimmer class from globals.css).
 */

/* ─── Product Card Skeleton ─── */
export function ProductCardSkeleton({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  const shimmerClass = isDark ? "skeleton-shimmer-dark" : "skeleton-shimmer";

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: isDark ? "#1A1918" : "white",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#EDE8DF"}`,
      }}
    >
      {/* Image area */}
      <div
        className={`w-full ${shimmerClass} rounded-t-2xl`}
        style={{ aspectRatio: "4/5" }}
      />
      {/* Content area */}
      <div className="p-5 md:p-6 space-y-3">
        <div className={`h-2 w-16 rounded-full ${shimmerClass}`} />
        <div className={`h-3.5 w-32 rounded-full ${shimmerClass}`} />
        <div className={`h-5 w-24 rounded-full ${shimmerClass}`} />
      </div>
    </div>
  );
}

/* ─── Product Grid Skeleton ─── */
export function ProductGridSkeleton({
  count = 8,
  variant = "light",
}: {
  count?: number;
  variant?: "light" | "dark";
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} variant={variant} />
      ))}
    </div>
  );
}

/* ─── Collection Card Skeleton (for editorial grid) ─── */
export function CollectionCardSkeleton({ size = "medium" }: { size?: "large" | "medium" | "compact" }) {
  const heights: Record<string, string> = {
    large: "500px",
    medium: "420px",
    compact: "340px",
  };

  return (
    <div
      className="rounded-[20px] overflow-hidden relative"
      style={{
        height: heights[size],
        background: "linear-gradient(180deg, #1A1918 0%, #111110 100%)",
        border: "1px solid rgba(184,147,90,0.08)",
      }}
    >
      <div className="absolute inset-0 skeleton-shimmer-dark opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 p-7 space-y-3">
        <div className="h-2 w-16 rounded-full skeleton-shimmer-dark" />
        <div className="h-6 w-40 rounded-full skeleton-shimmer-dark" />
        <div className="h-3 w-full max-w-[200px] rounded-full skeleton-shimmer-dark" />
        <div className="h-2 w-20 rounded-full skeleton-shimmer-dark mt-4" />
      </div>
    </div>
  );
}

/* ─── Hero Skeleton ─── */
export function HeroSkeleton() {
  return (
    <div className="relative bg-[#111110] pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="space-y-6">
          <div className="h-2 w-24 rounded-full skeleton-shimmer-dark" />
          <div className="h-3 w-40 rounded-full skeleton-shimmer-dark" />
          <div className="h-12 w-64 rounded-lg skeleton-shimmer-dark" />
          <div className="h-4 w-48 rounded-full skeleton-shimmer-dark" />
          <div className="h-0.5 w-16 rounded-full skeleton-shimmer-dark" />
          <div className="h-3 w-full max-w-md rounded-full skeleton-shimmer-dark" />
          <div className="h-3 w-full max-w-sm rounded-full skeleton-shimmer-dark" />
        </div>
      </div>
    </div>
  );
}

/* ─── Section Skeleton (generic content area) ─── */
export function SectionSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-4">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3 rounded-full skeleton-shimmer"
            style={{ width: `${80 - i * 15}%`, maxWidth: "500px" }}
          />
        ))}
      </div>
    </div>
  );
}
