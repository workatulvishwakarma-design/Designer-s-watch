"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { collections, type Collection } from "@/data/collections";

/* ─── Select featured collections for the editorial grid ─── */
const FEATURED = collections.filter((c) => c.featured);
// Ensure we have at least 6 for the grid layout
const GRID_COLLECTIONS = FEATURED.length >= 6
  ? FEATURED.slice(0, 6)
  : [...FEATURED, ...collections.filter(c => !c.featured)].slice(0, 6);

/* ─── Gender label helper removed per PROMPT 1.4 ─── */

/* ─── Editorial Collection Card ─── */
function EditorialCard({
  collection,
  size = "medium",
  index,
}: {
  collection: Collection;
  size: "large" | "medium" | "compact";
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const img = collection.heroImage;

  const heights: Record<string, string> = {
    large: "100%",
    medium: "100%",
    compact: "100%",
  };

  const titleSizes: Record<string, string> = {
    large: "text-[36px] sm:text-[44px] lg:text-[48px]",
    medium: "text-[28px] sm:text-[32px] lg:text-[36px]",
    compact: "text-[22px] sm:text-[24px] lg:text-[26px]",
  };

  const showDescription = size !== "compact";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className="relative cursor-pointer group"
      style={{ height: heights[size] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/collections/${collection.slug}`} className="block w-full h-full">
        <div
          className="relative w-full h-full rounded-[24px] overflow-hidden transition-all duration-700"
          style={{
            background: "linear-gradient(180deg, #111110 0%, #171615 100%)",
            border: hovered ? "1px solid rgba(184,147,90,0.3)" : "1px solid rgba(184,147,90,0.08)",
            boxShadow: hovered 
              ? "0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(184,147,90,0.15), inset 0 1px 0 rgba(255,255,255,0.05)" 
              : "0 10px 30px -10px rgba(0, 0, 0, 0.4)",
            minHeight: size === "large" ? "520px" : size === "medium" ? "440px" : "360px",
          }}
        >
          {/* Hero image with custom scale transition */}
          {img && (
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={img}
                alt={collection.name}
                fill
                className="object-cover"
                style={{ 
                  opacity: hovered ? 0.55 : 0.4,
                  transform: hovered ? "scale(1.08)" : "scale(1)",
                  transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)"
                }}
                sizes={size === "large" ? "50vw" : size === "medium" ? "33vw" : "25vw"}
              />
            </div>
          )}

          {/* Dial pattern fallback when no image */}
          {!img && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
              <div className="w-[180px] h-[180px] rounded-full" style={{ border: "2px solid rgba(184,147,90,0.3)" }}>
                <div className="w-full h-full rounded-full flex items-center justify-center" style={{ border: "1px solid rgba(184,147,90,0.15)" }}>
                  <div className="w-[100px] h-[100px] rounded-full" style={{ border: "1px solid rgba(184,147,90,0.1)" }}>
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#B8935A]/30" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gradient overlay — ensures text legibility */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: img
              ? "linear-gradient(180deg, rgba(17,17,16,0.2) 0%, rgba(17,17,16,0.05) 25%, rgba(17,17,16,0.5) 55%, rgba(17,17,16,0.92) 100%)"
              : "linear-gradient(180deg, transparent 0%, rgba(17,17,16,0.2) 50%, rgba(17,17,16,0.7) 100%)"
          }} />

          {/* Emerald ambient hover glow */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
            background: "radial-gradient(circle at bottom, rgba(0,57,38,0.25), transparent 70%)"
          }} />

          {/* Gold top shimmer on hover */}
          <div className="absolute top-0 left-0 right-0 h-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
            background: "linear-gradient(90deg, transparent, rgba(184,147,90,0.5), transparent)"
          }} />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-8 z-10">
            {/* Gender badge at top */}
            <div className="mb-auto pt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-dm text-[8px] tracking-[0.18em] uppercase" style={{
                background: hovered ? "rgba(184,147,90,0.2)" : "rgba(184,147,90,0.1)",
                color: "#B8935A",
                border: "1px solid rgba(184,147,90,0.15)",
                transition: "all 0.4s ease"
              }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8935A] animate-pulse" />
                {collection.identity?.split('·')[0]?.trim() || 'Signature Collection'}
              </span>
            </div>

            {/* Collection name */}
            <h3 className={`font-cormorant ${titleSizes[size]} font-normal leading-[0.95] text-white mb-2 tracking-[0.02em] transition-all duration-500`} style={{ textShadow: "0 2px 15px rgba(0,0,0,0.5)" }}>
              {collection.name}<span className="text-[#B8935A]">.</span>
            </h3>

            {/* Tagline */}
            <p className="font-cormorant italic text-[14.5px] mb-2.5 text-white/50 group-hover:text-[#B8935A]/80 transition-colors duration-400 line-clamp-1">
              &ldquo;{collection.meaning}&rdquo;
            </p>

            {/* Short description — hidden on compact */}
            {showDescription && (
              <p className="font-dm text-[11.5px] text-white/35 leading-relaxed mb-5 line-clamp-2 max-w-[340px] group-hover:text-white/45 transition-colors duration-400">
                {collection.description}
              </p>
            )}

            {/* Divider */}
            <div className="w-full h-px mb-4" style={{ background: hovered ? "linear-gradient(90deg, rgba(184,147,90,0.4), transparent 80%)" : "linear-gradient(90deg, rgba(184,147,90,0.2), transparent 70%)", transition: "all 0.4s ease" }} />

            {/* CTA + Identity */}
            <div className="flex items-center justify-between">
              <span className="font-dm text-[9.5px] tracking-[0.2em] uppercase text-white/40 group-hover:text-[#B8935A] transition-colors duration-400">
                Discover Collection
              </span>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-white/35 group-hover:text-[#B8935A] group-hover:translate-x-1.5 transition-all duration-400">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Main Section ─── */
export default function CollectionStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Assign grid roles: [0]=large, [1,2]=medium, [3,4,5]=compact
  const large = GRID_COLLECTIONS[0];
  const mediums = GRID_COLLECTIONS.slice(1, 3);
  const compacts = GRID_COLLECTIONS.slice(3, 6);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#0B0B0A" }}>
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none blur-[100px]" style={{ background: "radial-gradient(ellipse, rgba(0,57,38,0.4), transparent)", opacity: 0.15 }} />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center">
          <span className="font-dm uppercase text-[10px] tracking-[0.4em] text-[#B8935A] block mb-4">THE COLLECTION ARCHIVE</span>
          <h2 className="font-cormorant text-[38px] sm:text-[48px] lg:text-[56px] text-white leading-[1.08]">
            Named by <span className="italic font-light text-white/70">Character</span><span className="text-[#B8935A]">.</span>
          </h2>
          <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }} className="w-14 h-px mx-auto mt-5 origin-center" style={{ background: "linear-gradient(90deg, transparent, #003926, #B8935A, #003926, transparent)" }} />
          <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="font-dm text-[13.5px] text-white/40 mt-5 max-w-xl mx-auto leading-relaxed">
            Each collection carries a distinct identity — a name that evokes the spirit of its design. Grandeur speaks to magnificence. Serene whispers calm. Explore the full archive.
          </motion.p>
        </motion.div>
      </div>

      {/* Editorial Grid */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Large featured card */}
          <div className="lg:row-span-2">
            {large && <EditorialCard collection={large} size="large" index={0} />}
          </div>

          {/* Two medium cards stacked */}
          <div className="flex flex-col gap-6">
            {mediums.map((c, i) => (
              <EditorialCard key={c.slug} collection={c} size="medium" index={i + 1} />
            ))}
          </div>
        </div>

        {/* Three compact cards in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {compacts.map((c, i) => (
            <EditorialCard key={c.slug} collection={c} size="compact" index={i + 3} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }} className="text-center mt-16 relative z-10">
        <Link href="/collections/dsigner" className="luxury-cta-outline-dark group">
          <span>Explore All {collections.length} Collections</span>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="inline-block ml-1 group-hover:translate-x-1.5 transition-transform duration-300">
            <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </motion.div>

      {/* Bottom ambient */}
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[150px] pointer-events-none blur-[80px]" style={{ background: "radial-gradient(ellipse, rgba(0,57,38,0.4), transparent)", opacity: 0.1 }} />
    </section>
  );
}
