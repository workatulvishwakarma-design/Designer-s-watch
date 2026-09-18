"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, Sparkles, SlidersHorizontal, Watch } from "lucide-react";

export interface CollectionCardData {
  slug: string;
  name: string;
  meaning: string;
  description: string;
  identity: string;
  category: string;
  gender: string;
  heroImage: string;
  modelFamilies: string[];
  totalTimepieces: number;
}

interface CollectionsDirectoryClientProps {
  collections: CollectionCardData[];
}

const CATEGORIES = [
  "All",
  "Signature Collections",
  "Performance Collections",
  "Minimal Collections",
  "Women's Collections",
  "Couple Collections",
];

export default function CollectionsDirectoryClient({ collections }: CollectionsDirectoryClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return collections.filter((c) => {
      const matchesCategory =
        activeCategory === "All" ||
        c.category.toLowerCase() === activeCategory.toLowerCase() ||
        (activeCategory === "Women's Collections" && (c.gender === "Women" || c.category.includes("Women"))) ||
        (activeCategory === "Couple Collections" && (c.category.includes("Couple") || c.slug === "duetto" || c.slug === "bondline"));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.meaning.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.modelFamilies.some((f) => f.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [collections, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#111110] selection:bg-[#B8935A] selection:text-white pt-28 md:pt-36 pb-24">
      {/* Background Subtle Gradient & Grid Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #003926 0.75px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#003926]/5 border border-[#B8935A]/30 mb-6"
          >
            <Sparkles size={13} className="text-[#B8935A]" />
            <span className="font-montserrat text-[11px] tracking-[0.2em] uppercase font-bold text-[#003926]">
              Haute Horlogerie Directory
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-normal tracking-[0.04em] text-[#003926] uppercase leading-[1.08] mb-6"
          >
            D&apos;SIGNER COLLECTIONS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-montserrat text-sm sm:text-[15px] text-[#555555] leading-[1.8] font-normal"
          >
            Explore all 24 signature collections from D&apos;SIGNER. From the commanding presence of Grandeur to the timeless serenity of Eternal and precision of Hallmark, select any collection to discover its complete range of timepieces.
          </motion.p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 pb-8 border-b border-[#EDE8DF]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-montserrat text-[12px] tracking-[0.06em] uppercase px-4 py-2.5 rounded-full transition-all duration-300 font-medium ${
                    isSelected
                      ? "bg-[#003926] text-white shadow-md shadow-[#003926]/10"
                      : "bg-white text-[#555555] border border-[#EDE8DF] hover:border-[#B8935A]/50 hover:text-[#003926]"
                  }`}
                >
                  {cat === "All" ? `All Collections (${collections.length})` : cat.replace(" Collections", "")}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80 shrink-0">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999999]" />
            <input
              type="text"
              placeholder="Search collections or models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#EDE8DF] font-montserrat text-[13px] text-[#111110] placeholder:text-[#999999] focus:outline-none focus:border-[#B8935A] transition-colors duration-300 shadow-sm"
            />
          </div>
        </div>

        {/* Collections Responsive Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 md:gap-8"
        >
          <AnimatePresence>
            {filtered.map((col, idx) => (
              <motion.div
                key={col.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col bg-white rounded-2xl border border-[#EDE8DF] overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,57,38,0.12)] hover:border-[#B8935A]/60 transition-all duration-500 hover:-translate-y-1.5"
              >
                <Link href={`/collections/${col.slug}`} className="flex flex-col h-full">
                  {/* Image Hero Preview */}
                  <div className="relative aspect-[4/3] w-full bg-[#FAF8F4] overflow-hidden flex items-center justify-center p-6 border-b border-[#F0EBE1]">
                    {/* Background Radial Glow on Hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
                      style={{ background: "radial-gradient(circle, rgba(184, 147, 90, 0.12) 0%, transparent 70%)" }}
                    />

                    {/* Category / Gender Pill Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#EDE8DF] shadow-xs">
                      <span className="font-montserrat text-[10px] tracking-[0.08em] uppercase font-semibold text-[#003926]">
                        {col.gender}
                      </span>
                    </div>

                    {/* Timepieces Count Badge */}
                    <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 bg-[#003926] text-[#B8935A] px-2.5 py-1 rounded-full text-[10px] font-montserrat font-semibold shadow-xs">
                      <Watch size={11} className="text-[#B8935A]" />
                      <span>{col.totalTimepieces} {col.totalTimepieces === 1 ? "Piece" : "Pieces"}</span>
                    </div>

                    {/* Watch Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={col.heroImage || "/images/img01.png"}
                      alt={col.name}
                      className="max-h-[170px] w-auto object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108 group-hover:rotate-[2deg]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/new-img/model-2/950/950/950GNFS.16G.png";
                      }}
                    />
                  </div>

                  {/* Card Information */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Name & Tagline */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="font-cormorant text-2xl font-medium tracking-[0.03em] text-[#111110] group-hover:text-[#003926] transition-colors duration-300">
                          {col.name}
                        </h3>
                        <div className="w-7 h-7 rounded-full bg-[#FAF8F4] group-hover:bg-[#003926] flex items-center justify-center transition-colors duration-300 text-[#777777] group-hover:text-[#B8935A] shrink-0">
                          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>

                      <p className="font-montserrat text-[12px] text-[#B8935A] font-semibold tracking-[0.04em] mb-3 line-clamp-1">
                        {col.identity || col.meaning}
                      </p>

                      <p className="font-montserrat text-[13px] text-[#666666] leading-[1.6] line-clamp-2 mb-4 font-normal">
                        {col.description}
                      </p>
                    </div>

                    {/* Models Tag Pills & Action Footer */}
                    <div className="pt-4 border-t border-[#F0EBE1] flex flex-col gap-2.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-montserrat text-[10px] uppercase tracking-[0.1em] text-[#888888] font-medium">Models:</span>
                        {col.modelFamilies.slice(0, 4).map((fam) => (
                          <span
                            key={fam}
                            className="font-montserrat text-[10px] bg-[#FAF8F4] text-[#003926] border border-[#E5E0D5] px-2 py-0.5 rounded font-medium"
                          >
                            {fam}
                          </span>
                        ))}
                        {col.modelFamilies.length > 4 && (
                          <span className="font-montserrat text-[10px] text-[#888888] font-medium">
                            +{col.modelFamilies.length - 4} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[#003926] font-montserrat text-[11px] uppercase tracking-[0.14em] font-bold group-hover:text-[#B8935A] transition-colors duration-300 mt-1">
                        <span>View Timepieces</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#EDE8DF] max-w-md mx-auto">
            <Watch size={32} className="mx-auto text-[#B8935A] mb-3" />
            <h4 className="font-cormorant text-2xl font-medium text-[#111110] mb-2">No Collections Found</h4>
            <p className="font-montserrat text-sm text-[#777777] mb-6">
              No D&apos;SIGNER collection matched &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full bg-[#003926] text-white font-montserrat text-[12px] uppercase tracking-[0.1em] font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
