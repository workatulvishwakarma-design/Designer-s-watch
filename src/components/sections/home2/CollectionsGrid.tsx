"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const COLLECTIONS = [
  {
    slug: "chrono-heritage",
    name: "Chrono-Heritage",
    tagline: "Mechanical Precision",
    image: "/images/new-content/home2-coll-1.png",
  },
  {
    slug: "diamond-regal",
    name: "Diamond Regal",
    tagline: "Sovereign Splendor",
    image: "/images/new-content/home2-coll-2.png",
  },
  {
    slug: "skeleton-modern",
    name: "Skeleton Modern",
    tagline: "Visible Heartbeat",
    image: "/images/new-content/home2-coll-3.png",
  },
];

export default function CollectionsGrid() {
  return (
    <section id="featured-collections" className="relative overflow-hidden" style={{ background: "#FAF8F4" }}>
      {/* Section Header */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#B8935A] font-bold block mb-4">
            ✦ FEATURED COLLECTIONS ✦
          </span>
          <h2 className="font-cormorant text-[38px] sm:text-[52px] text-[#1A1918] font-light leading-[1.1]">
            Curated for Distinction
          </h2>
          <div className="w-20 h-[1px] mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #B8935A, transparent)" }} />
        </div>
      </div>

      {/* Full-Bleed Collection Cards — Reference-style overlay text on images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {COLLECTIONS.map((col, idx) => (
          <motion.div
            key={col.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={`/collections/${col.slug}`} className="block group relative aspect-[3/4] overflow-hidden cursor-pointer">
              <Image
                src={col.image}
                alt={col.name}
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 group-hover:from-black/90 transition-all duration-700 z-10" />

              {/* Text overlay */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-12 px-6 text-center">
                <span className="font-dm text-[9px] tracking-[0.25em] text-[#D4C5A0] uppercase block mb-3 opacity-80">
                  {col.tagline}
                </span>
                <h3 className="font-cormorant text-[32px] sm:text-[40px] text-white font-light leading-none mb-5 group-hover:tracking-wider transition-all duration-500">
                  {col.name}
                </h3>
                <span className="inline-flex items-center gap-2 font-dm text-[10px] tracking-[0.2em] uppercase text-white/70 border-b border-white/30 pb-1 group-hover:text-[#D4C5A0] group-hover:border-[#D4C5A0] transition-all duration-500">
                  Discover
                  <svg width="10" height="10" viewBox="0 0 20 20" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                    <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
