"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";

const IMAGES = {
  col1: {
    id: "dsigner-808-gm",
    name: "D'Signer 808 Gold Chrono",
    price: 14500,
    slug: "dsigner-808-gm",
    src: "/images/new-img/model-1/808/PNG/808GM.8.G.png",
    alt: "D'Signer 808 Gold Chronograph Timepiece",
    label: "D'Signer 808 Gold",
  },
  col2_top: {
    id: "dsigner-804-rgm",
    name: "D'Signer 804 Rose Gold",
    price: 12800,
    slug: "dsigner-804-rgm",
    src: "/images/new-img/model-1/804/804RGM.3G.png",
    alt: "D'Signer 804 Rose Gold Variant",
    label: "D'Signer 804 Rose",
  },
  col2_bottom: {
    id: "escort-830-rbg",
    name: "Escort 830 Rose Black",
    price: 9800,
    slug: "escort-830-rbg",
    src: "/images/new-img/model-2/830/830/830RBGFS.16G.png",
    alt: "Escort 830 Rose Black Dial",
    label: "Escort 830 Black",
  },
  col3_top: {
    id: "dsigner-753-rgm",
    name: "D'Signer 753 Champagne",
    price: 13900,
    slug: "dsigner-753-rgm",
    src: "/images/new-img/model-1/808/PNG/753RGM.16.G.png",
    alt: "D'Signer 753 Champagne Dial",
    label: "D'Signer 753 Gold",
  },
  col3_bottom: {
    id: "escort-830-gnfs",
    name: "Escort 830 Emerald Green",
    price: 10500,
    slug: "escort-830-gnfs",
    src: "/images/new-img/model-2/830/830/830GNFS.8G.png",
    alt: "Escort 830 Emerald Green Dial",
    label: "Escort 830 Emerald",
  },
  col4: {
    id: "dsigner-873-gm",
    name: "D'Signer 873 Women Grace",
    price: 11200,
    slug: "dsigner-873-gm",
    src: "/images/new-img/model-1/808/PNG/873GM.16.L.png",
    alt: "D'Signer 873 Women Grace Timepiece",
    label: "D'Signer 873 Grace",
  },
};

export default function WatchGridCollage() {
  const addItem = useCartStore((state) => state.addItem);

  const handleQuickAdd = (item: (typeof IMAGES)[keyof typeof IMAGES], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.src,
      slug: item.slug,
    });
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

        {/* 4-Column Grid Collage with Real Watch Product Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 items-stretch relative z-10">
          
          {/* COLUMN 1: Tall Left Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden shadow-md aspect-[3/5] bg-[#FAF8F4] group rounded-xs border border-black/5"
          >
            <div className="relative w-full h-full p-6 md:p-8 flex items-center justify-center">
              <Image
                src={IMAGES.col1.src}
                alt={IMAGES.col1.alt}
                fill
                className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-108"
                sizes="(max-width: 768px) 100vw, 25vw"
                priority
              />
            </div>

            <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
              <span className="font-montserrat text-[13px] text-[#1A1918] font-semibold tracking-wide block bg-white/80 backdrop-blur-md px-3 py-1 rounded-xs border border-black/5">
                {IMAGES.col1.label}
              </span>
            </div>

            {/* Plus Quick-Add Symbol Button */}
            <button
              onClick={(e) => handleQuickAdd(IMAGES.col1, e)}
              className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-[#003926] text-white flex items-center justify-center hover:bg-[#1A1918] transition-all cursor-pointer shadow-lg border border-white/20"
              title="Quick Add to Cart"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
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
            <div className="relative overflow-hidden shadow-md aspect-[4/3] bg-[#FAF8F4] group flex-grow rounded-xs border border-black/5">
              <div className="relative w-full h-full p-4 flex items-center justify-center">
                <Image
                  src={IMAGES.col2_top.src}
                  alt={IMAGES.col2_top.alt}
                  fill
                  className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="font-montserrat text-[13px] text-[#1A1918] font-semibold tracking-wide block bg-white/80 backdrop-blur-md px-3 py-1 rounded-xs border border-black/5">
                  {IMAGES.col2_top.label}
                </span>
              </div>

              <button
                onClick={(e) => handleQuickAdd(IMAGES.col2_top, e)}
                className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-[#003926] text-white flex items-center justify-center hover:bg-[#1A1918] transition-all cursor-pointer shadow-lg border border-white/20"
                title="Quick Add to Cart"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>

            {/* Bottom Card */}
            <div className="relative overflow-hidden shadow-md aspect-[4/3] bg-[#FAF8F4] group flex-grow rounded-xs border border-black/5">
              <div className="relative w-full h-full p-4 flex items-center justify-center">
                <Image
                  src={IMAGES.col2_bottom.src}
                  alt={IMAGES.col2_bottom.alt}
                  fill
                  className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="font-montserrat text-[13px] text-[#1A1918] font-semibold tracking-wide block bg-white/80 backdrop-blur-md px-3 py-1 rounded-xs border border-black/5">
                  {IMAGES.col2_bottom.label}
                </span>
              </div>

              <button
                onClick={(e) => handleQuickAdd(IMAGES.col2_bottom, e)}
                className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-[#003926] text-white flex items-center justify-center hover:bg-[#1A1918] transition-all cursor-pointer shadow-lg border border-white/20"
                title="Quick Add to Cart"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
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
            <div className="relative overflow-hidden shadow-md aspect-[4/3] bg-[#FAF8F4] group flex-grow rounded-xs border border-black/5">
              <div className="relative w-full h-full p-4 flex items-center justify-center">
                <Image
                  src={IMAGES.col3_top.src}
                  alt={IMAGES.col3_top.alt}
                  fill
                  className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="font-montserrat text-[13px] text-[#1A1918] font-semibold tracking-wide block bg-white/80 backdrop-blur-md px-3 py-1 rounded-xs border border-black/5">
                  {IMAGES.col3_top.label}
                </span>
              </div>

              <button
                onClick={(e) => handleQuickAdd(IMAGES.col3_top, e)}
                className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-[#003926] text-white flex items-center justify-center hover:bg-[#1A1918] transition-all cursor-pointer shadow-lg border border-white/20"
                title="Quick Add to Cart"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>

            {/* Bottom Card */}
            <div className="relative overflow-hidden shadow-md aspect-[4/3] bg-[#FAF8F4] group flex-grow rounded-xs border border-black/5">
              <div className="relative w-full h-full p-4 flex items-center justify-center">
                <Image
                  src={IMAGES.col3_bottom.src}
                  alt={IMAGES.col3_bottom.alt}
                  fill
                  className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="font-montserrat text-[13px] text-[#1A1918] font-semibold tracking-wide block bg-white/80 backdrop-blur-md px-3 py-1 rounded-xs border border-black/5">
                  {IMAGES.col3_bottom.label}
                </span>
              </div>

              <button
                onClick={(e) => handleQuickAdd(IMAGES.col3_bottom, e)}
                className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-[#003926] text-white flex items-center justify-center hover:bg-[#1A1918] transition-all cursor-pointer shadow-lg border border-white/20"
                title="Quick Add to Cart"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* COLUMN 4: Tall Right Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden shadow-md aspect-[3/5] bg-[#FAF8F4] group rounded-xs border border-black/5"
          >
            <div className="relative w-full h-full p-6 md:p-8 flex items-center justify-center">
              <Image
                src={IMAGES.col4.src}
                alt={IMAGES.col4.alt}
                fill
                className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-108"
                sizes="(max-width: 768px) 100vw, 25vw"
                priority
              />
            </div>

            <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
              <span className="font-montserrat text-[13px] text-[#1A1918] font-semibold tracking-wide block bg-white/80 backdrop-blur-md px-3 py-1 rounded-xs border border-black/5">
                {IMAGES.col4.label}
              </span>
            </div>

            <button
              onClick={(e) => handleQuickAdd(IMAGES.col4, e)}
              className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-[#003926] text-white flex items-center justify-center hover:bg-[#1A1918] transition-all cursor-pointer shadow-lg border border-white/20"
              title="Quick Add to Cart"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
