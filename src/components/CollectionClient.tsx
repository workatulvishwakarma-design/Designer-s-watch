"use client";

import { useMemo, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Eye } from "lucide-react";
import type { ModelFamilyGroup } from "@/types/product";
import { collections } from "@/data/collections";
import LuxuryPlaceholder from "@/components/ui/LuxuryPlaceholder";

/* ── Product Family Card ── */
function CollectionFamilyCard({ family }: { family: ModelFamilyGroup }) {
  const [hovered, setHovered] = useState(false);
  const primaryImage = family.variants[0]?.gallery?.primary || "";
  const secondaryImage = family.variants[0]?.gallery?.hover || family.variants[0]?.gallery?.detail?.[1] || primaryImage;
  const formattedPrice = `From ₹${family.priceRange.min.toLocaleString("en-IN")}`;

  return (
    <Link href={`/product/${family.slug}`} className="block group">
      <div
        className="rounded-2xl overflow-hidden cursor-pointer relative"
        style={{
          background: "white",
          border: `1px solid ${hovered ? "rgba(0,57,38,0.2)" : "#EDE8DF"}`,
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.1), 0 0 40px rgba(0,57,38,0.06)" : "0 2px 8px rgba(0,0,0,0.04)",
          transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5", background: "#F5F2ED" }}>
          {primaryImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={primaryImage} alt={family.name} className="absolute inset-0 w-full h-full object-contain p-6"
                style={{ transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)", transform: hovered ? "scale(1.08)" : "scale(1)", opacity: hovered && secondaryImage !== primaryImage ? 0 : 1 }}
                onError={(e) => { (e.target as HTMLImageElement).src = "/images/main-img1.png"; }} loading="lazy" />
              {secondaryImage !== primaryImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={secondaryImage} alt={`${family.name} alt`} className="absolute inset-0 w-full h-full object-contain p-6"
                  style={{ transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)", transform: hovered ? "scale(1.08)" : "scale(1.02)", opacity: hovered ? 1 : 0 }} loading="lazy" />
              )}
            </>
          ) : (
            <LuxuryPlaceholder />
          )}
          
          <span className="absolute top-3 left-3 rounded-full font-dm px-3 py-1.5 z-10"
            style={{ fontSize: "9px", letterSpacing: "0.1em", background: "#1A1918", color: "white" }}>
            {family.variantCount} {family.variantCount === 1 ? "Style" : "Styles"}
          </span>

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10"
            style={{ background: "rgba(250,248,244,0.70)", backdropFilter: "blur(12px)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease", pointerEvents: hovered ? "auto" : "none" }}>
            <button className="rounded-full font-dm flex items-center gap-2"
              style={{ background: "transparent", border: "1px solid #E0D8CE", color: "#1A1918", fontSize: "12px", padding: "10px 20px", transition: "all 0.3s ease, transform 0.4s ease 0.07s", transform: hovered ? "translateY(0)" : "translateY(16px)" }}>
              <Eye size={14} />Explore Series
            </button>
          </div>
        </div>
        
        <div className="p-5 md:p-6 flex flex-col">
          <p className="font-dm uppercase" style={{ fontSize: "9px", color: "#003926", letterSpacing: "0.2em" }}>{family.brand}</p>
          <p className="font-dm font-medium mt-1" style={{ fontSize: "14px", color: "#1A1918" }}>{family.name}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="font-cormorant italic" style={{ fontSize: "20px", color: "#003926" }}>{formattedPrice}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CollectionClient({
  collection,
  families,
  slug
}: {
  collection: any;
  families: ModelFamilyGroup[];
  slug: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  if (!collection) {
    return (
      <main className="min-h-screen bg-[#FAF8F4] flex items-center justify-center">
        <div className="text-center px-6">
            <h1 className="font-cormorant text-[48px] text-[#1A1918]">Collection Not Found</h1>
            <p className="font-dm text-[14px] text-[#9C9690] mt-4">The collection &ldquo;{slug}&rdquo; does not exist.</p>
            <Link href="/collections/dsigner" className="inline-block mt-8 px-8 py-3 rounded-full bg-[#1A1918] text-white font-dm text-[12px] tracking-[0.15em] uppercase hover:-translate-y-1 transition-transform">
              Browse All Watches
            </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F4]">
        <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden" style={{ background: "#111110" }}>
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] pointer-events-none opacity-10 blur-[120px] -translate-y-1/2"
            style={{ background: "radial-gradient(circle, rgba(0,57,38,0.5), transparent)" }} />

          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-8">
              <Link href="/" className="font-dm text-[11px] text-white/40 tracking-[0.1em] uppercase hover:text-[#B8935A] transition-colors">Home</Link>
              <span className="text-white/20">/</span>
              <Link href="/collections/dsigner" className="font-dm text-[11px] text-white/40 tracking-[0.1em] uppercase hover:text-[#B8935A] transition-colors">Collections</Link>
              <span className="text-white/20">/</span>
              <span className="font-dm text-[11px] text-[#B8935A] tracking-[0.1em] uppercase">{collection.name}</span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
              <div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                  className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-px bg-[#B8935A]" />
                  <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#B8935A]">
                    {collection.gender === "Unisex" ? "HIS & HERS" : collection.gender === "Men" ? "FOR HIM" : "FOR HER"} COLLECTION
                  </span>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-cormorant text-[48px] sm:text-[64px] lg:text-[76px] text-white leading-[1.02]">
                  {collection.name}<span className="text-[#B8935A]">.</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-cormorant italic text-[18px] text-white/50 mt-3">
                  &ldquo;{collection.meaning || "Elegance and Precision"}&rdquo;
                </motion.p>
              </div>
              <div>
                <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                  className="font-dm text-[14px] text-white/40 leading-[1.85] max-w-lg lg:ml-auto">
                  {collection.description}
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex items-center gap-6 mt-6 lg:justify-end">
                  <span className="font-dm text-[11px] text-white/30 tracking-[0.15em] uppercase">
                    {families.length} {families.length === 1 ? "Family" : "Families"}
                  </span>
                  <span className="font-dm text-[11px] text-[#B8935A] tracking-[0.1em] uppercase">
                    {collection.identity}
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section ref={sectionRef} className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            {families.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {families.map((f, i) => (
                  <motion.div key={f.slug}
                    initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.05 }}>
                    <CollectionFamilyCard family={f} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <div className="w-12 h-px mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, #B8935A, transparent)" }} />
                <p className="font-cormorant text-[28px] text-[#1A1918] mb-3">Explore Our Full Catalog</p>
                <p className="font-dm text-[14px] text-[#9C9690] max-w-md mx-auto mb-8">
                  Discover timepieces across all collections that embody {collection.meaning?.toLowerCase() || "excellence and craftsmanship"}.
                </p>
                <Link href="/collections/dsigner" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1A1918] text-white font-dm text-[12px] tracking-[0.15em] uppercase hover:-translate-y-1 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,57,38,0.15)]">
                  <span>Browse All D&apos;Signer Watches</span>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-[#F0EDE8]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <p className="font-dm uppercase text-[10px] tracking-[0.3em] text-[#B8935A] mb-3">EXPLORE MORE</p>
              <h2 className="font-cormorant text-[36px] text-[#1A1918]">Other Collections<span className="text-[#003926]">.</span></h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {collections.filter(c => c.slug !== slug).slice(0, 12).map(c => (
                <Link key={c.slug} href={`/collections/${c.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-dm text-[12px] text-[#5C5752] bg-white border border-[#EDE8DF] hover:border-[#B8935A] hover:text-[#B8935A] transition-all duration-300">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
  );
}
