"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const IMAGES = {
  col1: {
    src: "/images/new-content/home2-grid-1.png",
    alt: "Gold Chronograph at Outdoor Cafe",
    label: "Chrono Heritage",
  },
  col2_top: {
    src: "/images/new-content/home2-grid-2.png",
    alt: "Rose Gold Ladies Watch with Handbag",
    label: "Regal Rose",
  },
  col2_bottom: {
    src: "/images/new-content/home2-grid-3.png",
    alt: "Steel Diver on Steering Wheel",
    label: "Motorsport Diver",
  },
  col3_top: {
    src: "/images/new-content/home2-grid-4.png",
    alt: "Gold Evening Gala Watch",
    label: "Champagne Velvet",
  },
  col3_bottom: {
    src: "/images/new-content/home2-grid-5.png",
    alt: "Skeleton Dial on Marble",
    label: "Skeleton Automatix",
  },
  col4: {
    src: "/images/new-content/home2-grid-6.png",
    alt: "Royal Blue Watch with Tailored Suit",
    label: "Royal Ocean Blue",
  },
};

export default function WatchGridCollage() {
  const [likedCards, setLikedCards] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="relative w-full bg-[#E8E4DC] py-16 md:py-24 px-4 sm:px-8 overflow-hidden select-none border-b border-[#D6D0C4]">
      {/* Soft Studio Ambient Light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.7) 0%, rgba(228,222,213,0.5) 60%, rgba(205,198,187,0.9) 100%)",
        }}
      />

      {/* Main Catalog Shell Window */}
      <div className="relative max-w-[1440px] mx-auto bg-[#DFD9CE]/60 backdrop-blur-md rounded-2xl border border-white/60 shadow-2xl p-5 sm:p-8 md:p-10 overflow-hidden">
        
        {/* Top Header / Title */}
        <div className="flex flex-col items-center justify-center text-center mb-8 md:mb-12 relative z-10">
          <span className="font-dm text-[9px] sm:text-[10px] tracking-[0.35em] text-[#003926] font-bold uppercase mb-2">
            ✦ LIFESTYLE EDITORIAL ✦
          </span>
          <h2 className="font-cormorant text-[36px] sm:text-[48px] md:text-[56px] text-[#1A1918] font-light leading-none tracking-tight">
            Horology on Wrist
          </h2>
          <div className="w-12 h-[1.5px] bg-[#B8935A] mt-4 opacity-80" />
        </div>

        {/* 4-Column Grid Collage matching Cucinelli / Luxury Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 items-stretch relative z-10">
          
          {/* COLUMN 1: Tall Left Portrait */}
          <div className="relative overflow-hidden rounded-lg shadow-md aspect-[3/5] bg-[#D4CEBF] group">
            <Image
              src={IMAGES.col1.src}
              alt={IMAGES.col1.alt}
              fill
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 25vw"
              priority
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />

            {/* Bottom Label Overlay */}
            <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
              <span className="font-cormorant italic text-[16px] text-white font-medium drop-shadow-md">
                {IMAGES.col1.label}
              </span>
            </div>

            {/* Heart Wishlist Icon Button */}
            <button
              onClick={(e) => toggleLike("col1", e)}
              className="absolute bottom-3 right-3 z-30 w-7 h-7 rounded-full bg-black/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white/90 hover:bg-black/50 transition-all"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill={likedCards["col1"] ? "#EF4444" : "none"}
                stroke={likedCards["col1"] ? "#EF4444" : "currentColor"}
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* COLUMN 2: Two Stacked Cards */}
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Top Card */}
            <div className="relative overflow-hidden rounded-lg shadow-md aspect-[4/3] bg-[#D4CEBF] group flex-grow">
              <Image
                src={IMAGES.col2_top.src}
                alt={IMAGES.col2_top.alt}
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />

              <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
                <span className="font-cormorant italic text-[16px] text-white font-medium drop-shadow-md">
                  {IMAGES.col2_top.label}
                </span>
              </div>

              <button
                onClick={(e) => toggleLike("col2_top", e)}
                className="absolute bottom-3 right-3 z-30 w-7 h-7 rounded-full bg-black/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white/90 hover:bg-black/50 transition-all"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill={likedCards["col2_top"] ? "#EF4444" : "none"}
                  stroke={likedCards["col2_top"] ? "#EF4444" : "currentColor"}
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Bottom Card */}
            <div className="relative overflow-hidden rounded-lg shadow-md aspect-[4/3] bg-[#D4CEBF] group flex-grow">
              <Image
                src={IMAGES.col2_bottom.src}
                alt={IMAGES.col2_bottom.alt}
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />

              <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
                <span className="font-cormorant italic text-[16px] text-white font-medium drop-shadow-md">
                  {IMAGES.col2_bottom.label}
                </span>
              </div>

              <button
                onClick={(e) => toggleLike("col2_bottom", e)}
                className="absolute bottom-3 right-3 z-30 w-7 h-7 rounded-full bg-black/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white/90 hover:bg-black/50 transition-all"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill={likedCards["col2_bottom"] ? "#EF4444" : "none"}
                  stroke={likedCards["col2_bottom"] ? "#EF4444" : "currentColor"}
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </div>

          {/* COLUMN 3: Two Stacked Cards */}
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Top Card */}
            <div className="relative overflow-hidden rounded-lg shadow-md aspect-[4/3] bg-[#D4CEBF] group flex-grow">
              <Image
                src={IMAGES.col3_top.src}
                alt={IMAGES.col3_top.alt}
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />

              <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
                <span className="font-cormorant italic text-[16px] text-white font-medium drop-shadow-md">
                  {IMAGES.col3_top.label}
                </span>
              </div>

              <button
                onClick={(e) => toggleLike("col3_top", e)}
                className="absolute bottom-3 right-3 z-30 w-7 h-7 rounded-full bg-black/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white/90 hover:bg-black/50 transition-all"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill={likedCards["col3_top"] ? "#EF4444" : "none"}
                  stroke={likedCards["col3_top"] ? "#EF4444" : "currentColor"}
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Bottom Card */}
            <div className="relative overflow-hidden rounded-lg shadow-md aspect-[4/3] bg-[#D4CEBF] group flex-grow">
              <Image
                src={IMAGES.col3_bottom.src}
                alt={IMAGES.col3_bottom.alt}
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />

              <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
                <span className="font-cormorant italic text-[16px] text-white font-medium drop-shadow-md">
                  {IMAGES.col3_bottom.label}
                </span>
              </div>

              <button
                onClick={(e) => toggleLike("col3_bottom", e)}
                className="absolute bottom-3 right-3 z-30 w-7 h-7 rounded-full bg-black/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white/90 hover:bg-black/50 transition-all"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill={likedCards["col3_bottom"] ? "#EF4444" : "none"}
                  stroke={likedCards["col3_bottom"] ? "#EF4444" : "currentColor"}
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </div>

          {/* COLUMN 4: Tall Right Portrait */}
          <div className="relative overflow-hidden rounded-lg shadow-md aspect-[3/5] bg-[#D4CEBF] group">
            <Image
              src={IMAGES.col4.src}
              alt={IMAGES.col4.alt}
              fill
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 25vw"
              priority
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />

            <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
              <span className="font-cormorant italic text-[16px] text-white font-medium drop-shadow-md">
                {IMAGES.col4.label}
              </span>
            </div>

            <button
              onClick={(e) => toggleLike("col4", e)}
              className="absolute bottom-3 right-3 z-30 w-7 h-7 rounded-full bg-black/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white/90 hover:bg-black/50 transition-all"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill={likedCards["col4"] ? "#EF4444" : "none"}
                stroke={likedCards["col4"] ? "#EF4444" : "currentColor"}
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

        </div>

        {/* Floating Pills at Bottom Center (Brunello Cucinelli Style) */}
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 relative z-20">
          
          {/* Pill 1: Scroll to Explore */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90 text-[10px] sm:text-[11px] font-dm tracking-[0.18em] uppercase shadow-lg hover:bg-black/60 transition-all cursor-pointer">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 9l-7 7-7-7" />
            </svg>
            <span>Scroll to explore</span>
          </div>

          {/* Pill 2: AI / Occasion Search Bar */}
          <div className="inline-flex items-center justify-between gap-4 px-5 py-2.5 rounded-full bg-black/45 backdrop-blur-lg border border-white/20 text-white/80 text-[11px] font-dm shadow-2xl max-w-sm w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-white text-[10px] font-bold">
                +
              </span>
              <span className="text-white/80 text-[11px] font-light italic">
                What should I wear for an aperitif?
              </span>
            </div>
            <span className="text-white/60 text-[11px] font-bold">↑</span>
          </div>

        </div>

      </div>
    </section>
  );
}
