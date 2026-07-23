"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const IMAGES = {
  col1: {
    src: "/images/new-content/home2-gender-men.png",
    alt: "D'Signer Men's Executive Model",
    label: "Men's Flagship Series",
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
    alt: "Skeleton Dial on Wrist",
    label: "Skeleton Automatix",
  },
  col4: {
    src: "/images/new-content/home2-gender-women.png",
    alt: "D'Signer Women's Elegance Model",
    label: "Women's Grace Series",
  },
};

export default function WatchGridCollage() {
  const [likedCards, setLikedCards] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="relative w-full bg-[#E8E4DC] py-14 md:py-24 px-4 sm:px-8 overflow-hidden select-none border-b border-[#D6D0C4]">
      {/* Soft Studio Ambient Light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.75) 0%, rgba(228,222,213,0.5) 60%, rgba(205,198,187,0.9) 100%)",
        }}
      />

      {/* Main Full-Width Catalog Shell Container */}
      <div className="relative w-full max-w-[1800px] mx-auto bg-[#DFD9CE]/60 backdrop-blur-md border border-white/60 shadow-2xl p-4 sm:p-8 md:p-12 overflow-hidden rounded-sm">
        
        {/* Top Header & Navigation Buttons (Men's & Women's) */}
        <div className="flex flex-col items-center justify-center text-center mb-8 md:mb-12 relative z-10">
          <span className="font-montserrat text-[10px] sm:text-[11px] tracking-[0.35em] text-[#003926] font-semibold uppercase mb-2">
            ✦ LIFESTYLE EDITORIAL ✦
          </span>
          <h2 className="font-montserrat text-[28px] sm:text-[40px] md:text-[48px] text-[#1A1918] font-medium leading-none tracking-[-0.01em] mb-6">
            Horology on Wrist
          </h2>

          {/* Men's & Women's Collection Buttons */}
          <div className="flex items-center gap-4 flex-wrap justify-center mt-2">
            <Link
              href="/collections/mens-dsigner"
              className="px-8 py-3.5 bg-[#003926] text-white font-montserrat text-[12px] md:text-[13px] tracking-[0.18em] uppercase font-medium hover:bg-[#1A1918] transition-all duration-300 shadow-lg"
            >
              MEN'S COLLECTION
            </Link>
            <Link
              href="/collections/womens-dsigner"
              className="px-8 py-3.5 bg-transparent border border-[#003926] text-[#003926] font-montserrat text-[12px] md:text-[13px] tracking-[0.18em] uppercase font-medium hover:bg-[#003926] hover:text-white transition-all duration-300 shadow-lg"
            >
              WOMEN'S COLLECTION
            </Link>
          </div>
        </div>

        {/* 4-Column Grid Collage with Real Model Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 items-stretch relative z-10">
          
          {/* COLUMN 1: Tall Left Portrait (Real Men's Model) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden shadow-md aspect-[3/5] bg-[#D4CEBF] group rounded-xs"
          >
            <Image
              src={IMAGES.col1.src}
              alt={IMAGES.col1.alt}
              fill
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 25vw"
              priority
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />

            <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
              <span className="font-montserrat text-[14px] text-white font-medium drop-shadow-md tracking-wide block">
                {IMAGES.col1.label}
              </span>
            </div>

            <button
              onClick={(e) => toggleLike("col1", e)}
              className="absolute bottom-4 right-4 z-30 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white/90 hover:bg-black/60 transition-all cursor-pointer"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill={likedCards["col1"] ? "#EF4444" : "none"}
                stroke={likedCards["col1"] ? "#EF4444" : "currentColor"}
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </motion.div>

          {/* COLUMN 2: Two Stacked Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 md:gap-5"
          >
            {/* Top Card */}
            <div className="relative overflow-hidden shadow-md aspect-[4/3] bg-[#D4CEBF] group flex-grow rounded-xs">
              <Image
                src={IMAGES.col2_top.src}
                alt={IMAGES.col2_top.alt}
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="font-montserrat text-[14px] text-white font-medium drop-shadow-md tracking-wide block">
                  {IMAGES.col2_top.label}
                </span>
              </div>

              <button
                onClick={(e) => toggleLike("col2_top", e)}
                className="absolute bottom-4 right-4 z-30 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white/90 hover:bg-black/60 transition-all cursor-pointer"
              >
                <svg
                  width="13"
                  height="13"
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
            <div className="relative overflow-hidden shadow-md aspect-[4/3] bg-[#D4CEBF] group flex-grow rounded-xs">
              <Image
                src={IMAGES.col2_bottom.src}
                alt={IMAGES.col2_bottom.alt}
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="font-montserrat text-[14px] text-white font-medium drop-shadow-md tracking-wide block">
                  {IMAGES.col2_bottom.label}
                </span>
              </div>

              <button
                onClick={(e) => toggleLike("col2_bottom", e)}
                className="absolute bottom-4 right-4 z-30 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white/90 hover:bg-black/60 transition-all cursor-pointer"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill={likedCards["col2_bottom"] ? "#EF4444" : "none"}
                  stroke={likedCards["col2_bottom"] ? "#EF4444" : "currentColor"}
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* COLUMN 3: Two Stacked Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 md:gap-5"
          >
            {/* Top Card */}
            <div className="relative overflow-hidden shadow-md aspect-[4/3] bg-[#D4CEBF] group flex-grow rounded-xs">
              <Image
                src={IMAGES.col3_top.src}
                alt={IMAGES.col3_top.alt}
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="font-montserrat text-[14px] text-white font-medium drop-shadow-md tracking-wide block">
                  {IMAGES.col3_top.label}
                </span>
              </div>

              <button
                onClick={(e) => toggleLike("col3_top", e)}
                className="absolute bottom-4 right-4 z-30 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white/90 hover:bg-black/60 transition-all cursor-pointer"
              >
                <svg
                  width="13"
                  height="13"
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
            <div className="relative overflow-hidden shadow-md aspect-[4/3] bg-[#D4CEBF] group flex-grow rounded-xs">
              <Image
                src={IMAGES.col3_bottom.src}
                alt={IMAGES.col3_bottom.alt}
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="font-montserrat text-[14px] text-white font-medium drop-shadow-md tracking-wide block">
                  {IMAGES.col3_bottom.label}
                </span>
              </div>

              <button
                onClick={(e) => toggleLike("col3_bottom", e)}
                className="absolute bottom-4 right-4 z-30 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white/90 hover:bg-black/60 transition-all cursor-pointer"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill={likedCards["col3_bottom"] ? "#EF4444" : "none"}
                  stroke={likedCards["col3_bottom"] ? "#EF4444" : "currentColor"}
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* COLUMN 4: Tall Right Portrait (Real Women's Model) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden shadow-md aspect-[3/5] bg-[#D4CEBF] group rounded-xs"
          >
            <Image
              src={IMAGES.col4.src}
              alt={IMAGES.col4.alt}
              fill
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 25vw"
              priority
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />

            <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
              <span className="font-montserrat text-[14px] text-white font-medium drop-shadow-md tracking-wide block">
                {IMAGES.col4.label}
              </span>
            </div>

            <button
              onClick={(e) => toggleLike("col4", e)}
              className="absolute bottom-4 right-4 z-30 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white/90 hover:bg-black/60 transition-all cursor-pointer"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill={likedCards["col4"] ? "#EF4444" : "none"}
                stroke={likedCards["col4"] ? "#EF4444" : "currentColor"}
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
