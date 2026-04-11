"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import SmoothScrolling from '@/components/SmoothScrolling';
import CustomCursor from '@/components/ui/CustomCursor';
import HeroBanner from '@/components/sections/HeroBanner';
import LegacySection from '@/components/sections/LegacySection';
import FeatureScroller from '@/components/sections/FeatureScroller';
import HomeBrands from '@/components/sections/HomeBrands';
import WatchDetails from '@/components/sections/WatchDetails';
import StatsCounter from '@/components/sections/StatsCounter';
import OemCta from '@/components/sections/OemCta';
import TrustGrid from '@/components/sections/TrustGrid';
import FeatureStrip from '@/components/sections/FeatureStrip';
import CraftSection from '@/components/sections/CraftSection';
import FAQSection from '@/components/sections/FAQSection';
import BrandPillars from '@/components/sections/BrandPillars';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Loader2, ShoppingBag, Eye, Flame, Package, Shield, Truck } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { toast } from 'sonner';
import { allProducts } from '@/data/productData';
import { staticToUnified, filterByBrand, getBestSellers, type UnifiedProduct } from '@/lib/products';

/* ─────────── Reusable Arrow Button ─────────── */
function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isLeft = direction === "left";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center rounded-full cursor-pointer"
      style={{
        width: 44,
        height: 44,
        [isLeft ? "left" : "right"]: -16,
        background: hovered ? "#B8935A" : "white",
        border: `1px solid ${hovered ? "#B8935A" : "#EDE8DF"}`,
        boxShadow: hovered
          ? "0 8px 28px rgba(184,147,90,0.35)"
          : "0 4px 20px rgba(0,0,0,0.10)",
        transition: "all 0.3s ease",
      }}
    >
      {isLeft ? (
        <ChevronLeft size={18} color={hovered ? "white" : "#1A1918"} />
      ) : (
        <ChevronRight size={18} color={hovered ? "white" : "#1A1918"} />
      )}
    </button>
  );
}

/* ─────────── Product Card Component ─────────── */
function InlineProductCard({
  product,
  variant = "light",
}: {
  product: UnifiedProduct;
  variant?: "light" | "dark" | "escort";
}) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCartStore();

  const cardBg = variant === "dark" ? "#1A1918" : "white";
  const cardBorder =
    variant === "dark" ? "rgba(184,147,90,0.12)" : "#EDE8DF";
  const imageBg = variant === "dark" ? "#222220" : "#F5F2ED";
  const nameColor = variant === "dark" ? "white" : "#1A1918";
  const brandColor = "#B8935A";
  const priceColor = "#B8935A";
  const addBg =
    variant === "dark"
      ? "#B8935A"
      : variant === "escort"
      ? "#003926"
      : "#1A1918";
  const addText = variant === "dark" ? "#111110" : "white";
  const subtextColor = variant === "dark" ? "rgba(255,255,255,0.5)" : "#9C9690";

  /* Badge colour */
  let badgeBg = "#1A1918";
  let badgeText = "white";
  if (product.badge === "NEW") {
    badgeBg = "#003926";
  } else if (product.badge === "LIMITED") {
    badgeBg = "#B8935A";
    badgeText = "#1A1918";
  } else if (product.badge === "BEST SELLER") {
    badgeBg = "#1A1918";
  } else if (product.badge === "VALUE PICK") {
    badgeBg = "#F0F7F4";
    badgeText = "#003926";
  }

  /* Sale calculation */
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  /* Stock status */
  const isLowStock = product.stock > 0 && product.stock <= (product.lowStockThreshold || 5);

  /* Formatted price */
  const formattedPrice = "₹" + product.price.toLocaleString("en-IN");

  return (
    <Link href={`/product/${product.slug}`} className="block relative group">
    <div
      className="w-[280px] sm:w-[320px] md:w-[375px] flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer relative"
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 24px 60px rgba(0,0,0,0.10)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        borderColor: hovered ? "rgba(184,147,90,0.4)" : cardBorder,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* IMAGE CONTAINER — 4:5 ratio for taller cards */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4/5", background: imageBg }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image || product.images?.[0] || "/images/main-img1.png"}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-6"
          style={{
            transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
          onError={(e) => { (e.target as HTMLImageElement).src = "/images/main-img1.png"; }}
        />

        {/* Badge */}
        {product.badge && (
          <span
            className="absolute top-3 left-3 rounded-full font-dm px-3 py-1.5 z-10"
            style={{
              fontSize: "9px",
              letterSpacing: "0.1em",
              background: badgeBg,
              color: badgeText,
              border: product.badge === "VALUE PICK" ? "1px solid rgba(0,57,38,0.3)" : "none",
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Sale badge */}
        {hasDiscount && (
          <span
            className="absolute top-3 right-3 rounded-full font-dm px-2.5 py-1 z-10"
            style={{
              fontSize: "9px",
              letterSpacing: "0.05em",
              background: "#D4455A",
              color: "white",
            }}
          >
            {discountPercent}% OFF
          </span>
        )}

        {/* Blur overlay on hover */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10"
          style={{
            background: variant === "dark" ? "rgba(26,25,24,0.75)" : "rgba(250,248,244,0.70)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem({
                productId: product.slug,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image || product.images?.[0] || "/images/main-img1.png",
                slug: product.slug,
              });
              toast.success(`${product.name} added to cart`);
            }}
            className="rounded-full font-dm flex items-center gap-2"
            style={{
              background: addBg,
              color: addText,
              fontSize: "12px",
              padding: "10px 20px",
              transition: "all 0.3s ease, transform 0.4s ease",
              transform: hovered ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <ShoppingBag size={14} />
            Add to Cart
          </button>
          <button
            className="rounded-full font-dm flex items-center gap-2"
            style={{
              background: "transparent",
              border: `1px solid ${variant === "dark" ? "rgba(255,255,255,0.2)" : "#E0D8CE"}`,
              color: variant === "dark" ? "white" : "#1A1918",
              fontSize: "12px",
              padding: "10px 20px",
              transition: "all 0.3s ease, transform 0.4s ease 0.07s",
              transform: hovered ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <Eye size={14} />
            View Details
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 md:p-6 flex flex-col">
        <p
          className="font-dm uppercase"
          style={{
            fontSize: "9px",
            color: brandColor,
            letterSpacing: "0.2em",
          }}
        >
          {product.brand}
        </p>
        <p
          className="font-dm font-medium mt-1"
          style={{ fontSize: "14px", color: nameColor }}
        >
          {product.name}
        </p>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-2">
          <p
            className="font-cormorant italic"
            style={{ fontSize: "20px", color: priceColor }}
          >
            {formattedPrice}
          </p>
          {hasDiscount && (
            <p
              className="font-dm line-through"
              style={{ fontSize: "13px", color: subtextColor }}
            >
              ₹{product.comparePrice!.toLocaleString("en-IN")}
            </p>
          )}
        </div>

        {/* Stock status */}
        {isLowStock && (
          <div className="flex items-center gap-1.5 mt-2">
            <Flame size={12} className="text-[#D4455A]" />
            <span className="font-dm text-[11px] text-[#D4455A]">
              Only {product.stock} left
            </span>
          </div>
        )}
      </div>
    </div>
    </Link>
  );
}

/* ─────────── Skeleton Loader for Cards ─────────── */
function CardSkeleton({ variant = "light" }: { variant?: "light" | "dark" }) {
  const bg = variant === "dark" ? "#222220" : "#F5F2ED";
  const cardBg = variant === "dark" ? "#1A1918" : "white";
  const shimmer = variant === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
  
  return (
    <div
      className="w-[280px] sm:w-[320px] md:w-[375px] flex-shrink-0 rounded-2xl overflow-hidden animate-pulse"
      style={{ background: cardBg, border: `1px solid ${variant === "dark" ? "rgba(184,147,90,0.12)" : "#EDE8DF"}` }}
    >
      <div style={{ aspectRatio: "4/5", background: bg }} />
      <div className="p-5 md:p-6 space-y-3">
        <div className="h-2 w-16 rounded-full" style={{ background: shimmer }} />
        <div className="h-4 w-32 rounded-full" style={{ background: shimmer }} />
        <div className="h-5 w-20 rounded-full" style={{ background: shimmer }} />
      </div>
    </div>
  );
}

/* ─────────── Scroll helper ─────────── */
function scrollTrack(ref: React.RefObject<HTMLDivElement | null>, dir: "left" | "right") {
  const el = ref.current;
  if (!el) return;
  const firstChild = el.firstElementChild as HTMLElement;
  const amount = firstChild ? firstChild.offsetWidth + 16 : 391;
  el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
}

/* ─────────── Trust Strip ─────────── */
function TrustStrip() {
  const items = [
    { icon: <Truck size={18} />, text: "Free Shipping Above ₹5,000" },
    { icon: <Shield size={18} />, text: "100% Genuine Products" },
    { icon: <Package size={18} />, text: "Easy 7-Day Returns" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 mt-8 mb-4">
      <div className="flex flex-wrap justify-center gap-6 md:gap-12">
        {items.map((item) => (
          <div key={item.text} className="flex items-center gap-2 text-[#9C9690]">
            <span className="text-[#B8935A]">{item.icon}</span>
            <span className="font-dm text-[11px] tracking-wider uppercase">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  const bestRef = useRef<HTMLDivElement>(null);
  const dsignerRef = useRef<HTMLDivElement>(null);
  const escortRef = useRef<HTMLDivElement>(null);

  // Load products directly from static catalog — guaranteed to work
  const allUnified = useMemo(() => allProducts.map(staticToUnified), []);
  const bestSellers = useMemo(() => getBestSellers(allUnified), [allUnified]);
  const designerProducts = useMemo(() => filterByBrand(allUnified, "D'SIGNER"), [allUnified]);
  const escortProducts = useMemo(() => filterByBrand(allUnified, "ESCORT"), [allUnified]);
  const isLoading = false;

  const hasProducts = bestSellers.length > 0 || designerProducts.length > 0 || escortProducts.length > 0;

  return (
    <>
      <CustomCursor />
      <SmoothScrolling>
        <main>
          <HeroBanner />
          <HomeBrands />
          <WatchDetails />

          {/* ===== PRODUCTS SECTION ===== */}
          <section className="bg-[#FAF8F4] py-16">
            <div className="text-center mb-12">
              <p
                className="font-dm uppercase mb-3"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  color: "#B8935A",
                }}
              >
                CURATED FOR YOU
              </p>
              <h2 className="font-cormorant text-5xl text-[#1A1918]">
                Timepieces Worth Wearing.
              </h2>
              <div className="w-12 h-0.5 bg-[#B8935A] mx-auto mt-4" />
            </div>

            {/* Trust strip */}
            <TrustStrip />

            {/* Loading state */}
            {isLoading && (
              <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
                <div className="flex items-center gap-3 text-[#B8935A]">
                  <Loader2 size={20} className="animate-spin" />
                  <span className="font-dm text-sm tracking-widest uppercase">Loading Collection...</span>
                </div>
                <div className="flex gap-4 overflow-hidden">
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </div>
              </div>
            )}

            {/* Empty state — no products in database yet */}
            {!isLoading && !hasProducts && (
              <div className="max-w-lg mx-auto text-center px-6 py-16">
                <div className="bg-white rounded-3xl border border-[#EDE8DF] p-12 shadow-sm">
                  <p className="font-cormorant text-2xl text-[#1A1918] mb-3">Collection Coming Soon</p>
                  <p className="font-dm text-sm text-[#9C9690] mb-6">
                    Our curated timepieces are being prepared. Add products via the Admin Dashboard to see them here.
                  </p>
                  <Link
                    href="/admin/products"
                    className="inline-block bg-[#1A1918] text-white px-6 py-3 rounded-full font-dm text-xs tracking-widest uppercase hover:bg-[#B8935A] transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            )}

            {/* ── COLLECTION 1: BEST SELLERS ── */}
            {bestSellers.length > 0 && (
            <div className="mb-12">
              <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <span className="inline-block bg-[#FFF3E8] text-[#B8935A] border border-[rgba(184,147,90,0.2)] px-4 py-1.5 rounded-full font-dm text-[11px]">
                    🔥 TRENDING NOW
                  </span>
                  <h3 className="font-bebas text-[36px] text-[#1A1918] mt-2">
                    Best Sellers
                  </h3>
                  <div className="w-10 h-0.5 bg-[#B8935A] mt-1" />
                </div>
                <Link
                  href="/collections/dsigner"
                  className="font-dm text-[12px] text-[#B8935A] tracking-widest hover:underline underline-offset-2 mt-3 md:mt-0"
                >
                  View All →
                </Link>
              </div>
              <div className="relative max-w-7xl mx-auto px-6">
                <CarouselArrow direction="left" onClick={() => scrollTrack(bestRef, "left")} />
                <CarouselArrow direction="right" onClick={() => scrollTrack(bestRef, "right")} />
                <div className="overflow-hidden">
                  <div
                    ref={bestRef}
                    className="carousel-track flex gap-4 overflow-x-auto py-2 px-1"
                    style={{ scrollSnapType: "x mandatory" }}
                  >
                    {bestSellers.map((p) => (
                      <div key={p.slug} style={{ scrollSnapAlign: "start" }}>
                        <InlineProductCard product={p} variant="light" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* ── COLLECTION 2: D'SIGNER (dark) ── */}
            {designerProducts.length > 0 && (
            <div className="bg-[#111110] py-12 mb-12">
              <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <span className="inline-block bg-[#003926] text-white border border-[#003926]/30 px-4 py-1.5 rounded-full font-dm text-[11px]">
                    💎 PREMIUM
                  </span>
                  <h3 className="font-bebas text-[36px] text-white mt-2">
                    D&apos;SIGNER
                  </h3>
                  <div className="w-10 h-0.5 bg-[#B8935A] mt-1" />
                </div>
                <Link
                  href="/collections/dsigner"
                  className="font-dm text-[12px] text-[#B8935A] tracking-widest hover:underline underline-offset-2 mt-3 md:mt-0"
                >
                  View All →
                </Link>
              </div>
              <div className="relative max-w-7xl mx-auto px-6">
                <CarouselArrow direction="left" onClick={() => scrollTrack(dsignerRef, "left")} />
                <CarouselArrow direction="right" onClick={() => scrollTrack(dsignerRef, "right")} />
                <div className="overflow-hidden">
                  <div
                    ref={dsignerRef}
                    className="carousel-track-dark flex gap-4 overflow-x-auto py-2 px-1"
                    style={{ scrollSnapType: "x mandatory" }}
                  >
                    {designerProducts.map((p) => (
                      <div key={p.slug} style={{ scrollSnapAlign: "start" }}>
                        <InlineProductCard product={p} variant="dark" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* ── COLLECTION 3: ESCORT ── */}
            {escortProducts.length > 0 && (
            <div className="bg-[#F2EDE6] py-12">
              <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <span className="inline-block bg-[#F0F7F4] text-[#003926] border border-[#003926]/20 px-4 py-1.5 rounded-full font-dm text-[11px]">
                    ⌚ EVERYDAY
                  </span>
                  <h3 className="font-bebas text-[36px] text-[#1A1918] mt-2">
                    ESCORT
                  </h3>
                  <div className="w-10 h-0.5 bg-[#B8935A] mt-1" />
                </div>
                <Link
                  href="/collections/escort"
                  className="font-dm text-[12px] text-[#B8935A] tracking-widest hover:underline underline-offset-2 mt-3 md:mt-0"
                >
                  View All →
                </Link>
              </div>
              <div className="relative max-w-7xl mx-auto px-6">
                <CarouselArrow direction="left" onClick={() => scrollTrack(escortRef, "left")} />
                <CarouselArrow direction="right" onClick={() => scrollTrack(escortRef, "right")} />
                <div className="overflow-hidden">
                  <div
                    ref={escortRef}
                    className="carousel-track flex gap-4 overflow-x-auto py-2 px-1"
                    style={{ scrollSnapType: "x mandatory" }}
                  >
                    {escortProducts.map((p) => (
                      <div key={p.slug} style={{ scrollSnapAlign: "start" }}>
                        <InlineProductCard product={p} variant="escort" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            )}
          </section>

          <LegacySection />
          <CraftSection />
          <FeatureScroller />
          <BrandPillars />
          <StatsCounter />
          <OemCta />
          <TrustGrid />
          <FeatureStrip />
          <FAQSection />

        </main>
      </SmoothScrolling>
    </>
  );
}
