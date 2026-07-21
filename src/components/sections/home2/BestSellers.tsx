"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
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

  const formattedPrice = family.priceRange.min === family.priceRange.max
    ? `₹${family.priceRange.min.toLocaleString("en-IN")}`
    : `From ₹${family.priceRange.min.toLocaleString("en-IN")}`;

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
        className="w-[260px] sm:w-[300px] rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          background: "#0A2E21",
          border: "1px solid rgba(212,197,160,0.12)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered ? "0 20px 50px rgba(0,0,0,0.3)" : "0 4px 16px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "1/1", background: "radial-gradient(ellipse at center, #163828, #0A2E21)" }}
        >
          {showImages ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={primaryImage}
                alt={family.name}
                className="absolute inset-0 w-full h-full object-contain p-6"
                style={{
                  transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
                  transform: hovered ? "scale(1.08)" : "scale(1)",
                }}
                onError={handleImageError}
                loading="lazy"
              />
            </>
          ) : (
            <LuxuryPlaceholder />
          )}

          {/* Hover overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300"
            style={{
              background: "rgba(0,57,38,0.65)",
              backdropFilter: "blur(4px)",
              opacity: hovered ? 1 : 0,
              pointerEvents: hovered ? "auto" : "none",
            }}
          >
            <span className="px-6 py-2.5 rounded-full border border-[#D4C5A0] text-white font-dm text-[10px] uppercase tracking-[0.15em] flex items-center gap-2">
              <Eye size={12} className="text-[#D4C5A0]" />
              View Watch
            </span>
          </div>

          {/* Variant count badge */}
          {family.variantCount > 1 && (
            <span
              className="absolute top-3 left-3 rounded-full font-dm px-3 py-1 z-10"
              style={{
                fontSize: "9px",
                letterSpacing: "0.1em",
                background: "rgba(0,57,38,0.7)",
                color: "#D4C5A0",
                border: "1px solid rgba(212,197,160,0.3)",
                backdropFilter: "blur(4px)",
              }}
            >
              {family.variantCount} Styles
            </span>
          )}
        </div>

        {/* Details */}
        <div className="p-5">
          <span className="font-dm text-[8px] tracking-[0.2em] text-[#D4C5A0] uppercase font-bold block">
            {family.brand}
          </span>
          <h3 className="font-dm font-semibold text-[13px] text-white mt-1 leading-tight truncate">
            {family.name}
          </h3>
          <p className="font-cormorant italic text-[18px] text-[#D4C5A0] mt-1.5">
            {formattedPrice}
          </p>
        </div>
      </div>
    </Link>
  );
}
