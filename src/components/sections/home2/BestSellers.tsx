"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ModelFamilyGroup } from "@/types/product";
import { getAllPrimaryImageCandidates } from "@/lib/imageResolver";
import LuxuryPlaceholder from "@/components/ui/LuxuryPlaceholder";

interface BestSellersProps {
  families: ModelFamilyGroup[];
}

export default function BestSellers({ families }: BestSellersProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Deduplicate families by slug to avoid React key warnings
  const uniqueFamilies = useMemo(() => {
    const seen = new Set<string>();
    return families.filter((f) => {
      if (seen.has(f.slug)) return false;
      seen.add(f.slug);
      return true;
    }).slice(0, 12);
  }, [families]);

  const scroll = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement;
    const scrollAmount = firstChild ? firstChild.offsetWidth + 20 : 340;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden" style={{ background: "#003926" }}>
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.06] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,197,160,0.6), transparent)" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-24 md:py-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#D4C5A0] font-bold block mb-4">
              ⌚ MOST COVETED
            </span>
            <h2 className="font-cormorant text-[38px] sm:text-[52px] text-white font-light leading-[1.1]">
              Best Sellers<span className="text-[#D4C5A0]">.</span>
            </h2>
            <div className="w-20 h-[1px] mt-5" style={{ background: "linear-gradient(90deg, #D4C5A0, rgba(212,197,160,0.15))" }} />
          </motion.div>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-[#D4C5A0]/25 flex items-center justify-center text-[#D4C5A0] hover:bg-[#D4C5A0] hover:text-[#003926] transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-[#D4C5A0]/25 flex items-center justify-center text-[#D4C5A0] hover:bg-[#D4C5A0] hover:text-[#003926] transition-all duration-300 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto py-4 px-1 scroll-smooth"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {uniqueFamilies.map((family) => (
            <div key={family.slug} className="snap-start shrink-0">
              <ProductCard family={family} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ family }: { family: ModelFamilyGroup }) {
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  const primaryVariant = family.variants[0];
  const primaryCandidates = useMemo(() => {
    if (!primaryVariant) return [];
    return getAllPrimaryImageCandidates(family.familyId, primaryVariant.sku);
  }, [family.familyId, primaryVariant]);

  const primaryImage = primaryCandidates[imgIdx] || primaryVariant?.gallery?.primary || "";
  const hoverImage = primaryVariant?.gallery?.hover || (primaryCandidates.length > 1 ? primaryCandidates[1] : "") || primaryImage;
  const hasSecondImage = hoverImage && hoverImage !== primaryImage;

  const price = family.priceRange.min;
  const mrp = primaryVariant?.mrp || 0;
  const discount = mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const handleImageError = () => {
    if (imgIdx < primaryCandidates.length - 1) {
      setImgIdx((prev) => prev + 1);
    } else {
      setImgFailed(true);
    }
  };

  const showImages = primaryImage && !imgFailed;

  return (
    <Link href={`/product/${family.slug}`} className="block">
      <div
        className="w-[260px] sm:w-[300px] rounded-2xl overflow-hidden transition-all duration-500 bg-white"
        style={{
          border: `1px solid ${hovered ? "rgba(0,57,38,0.2)" : "#EDE8DF"}`,
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered ? "0 20px 50px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "4/5", background: "#FAFAF8" }}
        >
          {showImages ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={primaryImage}
                alt={family.name}
                className="absolute inset-0 w-full h-full object-contain p-8"
                style={{
                  transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
                  transform: hovered ? "scale(1.06)" : "scale(1)",
                  opacity: hovered && hasSecondImage ? 0 : 1,
                }}
                onError={handleImageError}
                loading="lazy"
              />
              {hasSecondImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={hoverImage}
                  alt={`${family.name} alt`}
                  className="absolute inset-0 w-full h-full object-contain p-8"
                  style={{
                    transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
                    transform: hovered ? "scale(1.06)" : "scale(1.02)",
                    opacity: hovered ? 1 : 0,
                  }}
                  loading="lazy"
                />
              )}
            </>
          ) : (
            <LuxuryPlaceholder />
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <span
              className="absolute top-3 left-3 z-10 font-montserrat font-bold text-white px-3 py-1.5"
              style={{
                fontSize: "11px",
                letterSpacing: "0.02em",
                background: "#C8102E",
              }}
            >
              {discount}% OFF
            </span>
          )}

          {/* Wishlist Heart */}
          <button
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#9C9690] hover:text-[#C8102E] transition-colors duration-300 shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Details */}
        <div className="p-5 flex items-end justify-between">
          <div>
            <span className="font-montserrat uppercase block" style={{ fontSize: "10px", color: "#003926", letterSpacing: "0.15em", fontWeight: 600 }}>
              {family.brand}
            </span>
            <h3 className="font-dm font-medium text-[14px] text-[#1A1918] mt-1 leading-tight truncate max-w-[200px]">
              {family.name}
            </h3>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="font-cormorant italic text-[18px] text-[#003926] font-semibold">
                Rs. {price.toLocaleString("en-IN")}
              </span>
              {mrp > price && (
                <span className="font-dm text-[13px] text-[#9C9690] line-through">
                  ₹{mrp.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>

          {/* Quick Add */}
          <button
            className="w-8 h-8 flex items-center justify-center text-[#003926] hover:bg-[#003926] hover:text-white rounded-full border border-[#003926]/20 transition-all duration-300 shrink-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}

