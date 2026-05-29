"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, X, ArrowRight, TrendingUp, Sparkles, Compass, FileText, ChevronRight } from "lucide-react";
import { searchItems, STATIC_PAGES, type SearchableProduct, type SearchableCollection } from "@/lib/searchIndex";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: SearchableProduct[];
  collections: SearchableCollection[];
}

const TRENDING_COLLECTIONS = [
  { name: "Grandeur", slug: "grandeur", desc: "Precision Meets Commanding Aesthetics" },
  { name: "Eternal", slug: "eternal", desc: "A Tribute to Uncompromising Elegance" },
  { name: "Bolt", slug: "bolt", desc: "Architectural Strength & Bold Design" },
  { name: "Serene", slug: "serene", desc: "Graceful Harmony for the Discerning Eye" },
  { name: "Glimmer", slug: "glimmer", desc: "Sophisticated Radiance & Luxury Details" },
  { name: "Pinnacle", slug: "pinnacle", desc: "The Peak of Haute Horology" },
];

const QUICK_LINKS = [
  { name: "Men's D'Signer", href: "/collections/mens-designer" },
  { name: "Women's D'Signer", href: "/collections/womens-designer" },
  { name: "Affordable Escort Series", href: "/collections/escort" },
  { name: "Returns & Exchanges", href: "/return-cancellation-policy" },
];

export default function SearchOverlay({ isOpen, onClose, products, collections }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = "hidden";
    } else {
      setQuery("");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const results = useMemo(() => {
    return searchItems(query, products, collections, STATIC_PAGES);
  }, [query, products, collections]);

  const hasResults =
    results.products.length > 0 ||
    results.collections.length > 0 ||
    results.pages.length > 0;

  const showSuggestions = !query.trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[8vh] md:pt-[12vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#111110]/80 backdrop-blur-md"
          />

          {/* Centered Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            ref={panelRef}
            className="relative w-full max-w-[720px] mx-4 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[78vh]"
            style={{
              background: "rgba(250, 248, 244, 0.96)",
              border: "1px solid rgba(0, 57, 38, 0.08)",
              boxShadow: "0 30px 70px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            {/* Input Bar */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-[#003926]/5">
              <Search size={22} className="text-[#003926]/60 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, collections, pages..."
                className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-[#001F14] placeholder-[#003926]/30 text-base md:text-lg font-dm"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="p-1 rounded-full hover:bg-[#003926]/5 transition-colors shrink-0"
                >
                  <X size={16} className="text-[#003926]/60" />
                </button>
              )}
              <button
                onClick={onClose}
                className="font-dm text-[11px] tracking-widest uppercase text-[#B8935A] hover:text-[#003926] transition-colors pl-2 border-l border-[#003926]/10 shrink-0"
              >
                Close
              </button>
            </div>

            {/* Content Area */}
            <div className="overflow-y-auto flex-1 p-6 md:p-8 space-y-8 hide-scrollbar">
              {/* SUGGESTIONS & TRENDING */}
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Quick links */}
                  <div className="space-y-3">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#003926]/40 font-bold font-body">Quick Links</h3>
                    <div className="flex flex-wrap gap-2.5">
                      {QUICK_LINKS.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={onClose}
                          className="px-4 py-2 rounded-full text-[12px] font-dm bg-[#003926]/5 border border-[#003926]/5 text-[#003926] hover:bg-[#003926] hover:text-white transition-all duration-300"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Trending Collections */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#003926]/40 font-bold font-body flex items-center gap-2">
                      <TrendingUp size={12} /> Trending Collections
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {TRENDING_COLLECTIONS.map((c) => (
                        <Link
                          key={c.name}
                          href={`/collections/${c.slug}`}
                          onClick={onClose}
                          className="group p-4 rounded-2xl bg-white border border-[#003926]/5 hover:border-[#003926]/15 hover:shadow-md transition-all duration-300 flex items-center justify-between"
                        >
                          <div>
                            <h4 className="text-[13px] font-body font-semibold text-[#001F14] uppercase tracking-wide group-hover:text-[#003926] transition-colors">
                              {c.name}
                            </h4>
                            <p className="text-[10px] text-[#9C9690] mt-0.5">{c.desc}</p>
                          </div>
                          <ChevronRight size={14} className="text-[#003926]/30 group-hover:translate-x-1 group-hover:text-[#003926] transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SEARCH RESULTS */}
              {!showSuggestions && hasResults && (
                <div className="space-y-6">
                  {/* Products Grid */}
                  {results.products.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#003926]/40 font-bold font-body flex items-center gap-2">
                        <Sparkles size={12} /> Products
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {results.products.map((p) => (
                          <Link
                            key={p.slug}
                            href={`/product/${p.slug}`}
                            onClick={onClose}
                            className="group p-3 rounded-2xl bg-white border border-[#003926]/5 hover:border-[#003926]/15 hover:shadow-md transition-all duration-300 flex items-center gap-3.5"
                          >
                            <div className="w-14 h-14 bg-[#F5F2ED] rounded-xl flex items-center justify-center p-1 shrink-0 overflow-hidden relative">
                              {p.image ? (
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <span className="text-[9px] text-[#003926]/30">Watch</span>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-[8px] font-bold uppercase tracking-wider text-[#B8935A]">{p.brand}</span>
                              <h4 className="text-[13px] font-body font-semibold text-[#001F14] truncate group-hover:text-[#003926] transition-colors leading-snug">
                                {p.name}
                              </h4>
                              <p className="text-[12px] font-cormorant italic text-[#003926] font-medium mt-0.5">{p.price}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Collections */}
                  {results.collections.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#003926]/40 font-bold font-body flex items-center gap-2">
                        <Compass size={12} /> Collections
                      </h3>
                      <div className="grid grid-cols-1 gap-2.5">
                        {results.collections.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/collections/${c.slug}`}
                            onClick={onClose}
                            className="group p-4 rounded-xl bg-white border border-[#003926]/5 hover:border-[#003926]/15 transition-all duration-300 flex items-center justify-between"
                          >
                            <div>
                              <h4 className="text-[13px] font-body font-semibold text-[#001F14] uppercase tracking-wide group-hover:text-[#003926] transition-colors">
                                {c.name}
                              </h4>
                              <p className="text-[11px] text-[#9C9690] mt-0.5 line-clamp-1">{c.description}</p>
                            </div>
                            <ArrowRight size={14} className="text-[#003926]/30 group-hover:translate-x-1 group-hover:text-[#003926] transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pages */}
                  {results.pages.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#003926]/40 font-bold font-body flex items-center gap-2">
                        <FileText size={12} /> Editorial & Customer Care
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {results.pages.map((p) => (
                          <Link
                            key={p.href}
                            href={p.href}
                            onClick={onClose}
                            className="group p-4 rounded-2xl bg-white border border-[#003926]/5 hover:border-[#003926]/15 hover:shadow-md transition-all duration-300 flex items-center justify-between"
                          >
                            <div className="min-w-0 flex-1">
                              <h4 className="text-[12px] font-body font-semibold text-[#001F14] uppercase tracking-wider group-hover:text-[#003926] transition-colors">
                                {p.name}
                              </h4>
                              <p className="text-[10px] text-[#9C9690] mt-0.5 truncate">{p.description}</p>
                            </div>
                            <ChevronRight size={14} className="text-[#003926]/30 group-hover:translate-x-1 group-hover:text-[#003926] transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* NO RESULTS STATE */}
              {!showSuggestions && !hasResults && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <p className="font-cormorant italic text-lg text-[#9C9690]">
                    No horological masterpieces matched &quot;{query}&quot;
                  </p>
                  <div className="max-w-[400px] mx-auto p-[1px] bg-gradient-to-r from-transparent via-[#003926]/10 to-transparent my-4" />
                  <p className="text-[10px] uppercase tracking-wider text-[#9C9690]">
                    Try searching for <span className="font-bold text-[#003926]">Grandeur</span>, <span className="font-bold text-[#003926]">Eternal</span>, <span className="font-bold text-[#003926]">Serene</span> or <span className="font-bold text-[#003926]">Bolt</span>
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
