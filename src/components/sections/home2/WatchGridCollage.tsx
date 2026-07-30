"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";

const IMAGES = {
  col1: {
    id: "915BFS-3G",
    name: "D'Signer 915BFS.3G",
    price: 14500,
    slug: "dsigner-915",
    src: "/img/models/915BFS.3G.jpg",
    alt: "D'Signer 915BFS.3G – Black Gold Skeleton Chronograph",
    label: "915BFS.3G",
  },
  col2_top: {
    id: "875RGBLM-5G",
    name: "D'Signer 875RGBLM.5G",
    price: 12800,
    slug: "dsigner-875-rgblm",
    src: "/img/models/875RGBLM.5G.jpg",
    alt: "D'Signer 875RGBLM.5G – Rose Gold Black Link Bracelet",
    label: "875RGBLM.5G",
  },
  col2_bottom: {
    id: "875RGGNM-3G",
    name: "D'Signer 875RGGNM.3G",
    price: 13200,
    slug: "dsigner-875-rggnm",
    src: "/img/models/875RGGNM.3G.jpg",
    alt: "D'Signer 875RGGNM.3G – Rose Gold Multi Sub-Dial",
    label: "875RGGNM.3G",
  },
  col3_top: {
    id: "980GFS-16",
    name: "D'Signer 980GFS.16",
    price: 18900,
    slug: "dsigner-980-gfs",
    src: "/img/models/980GFS.16.jpg",
    alt: "D'Signer 980GFS.16 – Green Gold Skeleton Tourbillon",
    label: "980GFS.16",
  },
  col3_bottom: {
    id: "916GNM-16G",
    name: "D'Signer 916GNM.16G",
    price: 15500,
    slug: "dsigner-916-gnm",
    src: "/img/models/916GNM.16G.jpg",
    alt: "D'Signer 916GNM.16G – Green Drum Chrono",
    label: "916GNM.16G",
  },
  col4: {
    id: "824GFS-16G",
    name: "D'Signer 824GFS.16G",
    price: 11200,
    slug: "dsigner-824-gfs",
    src: "/images/new-img/model-2/916/916/916GNM.16G.png",
    alt: "D'Signer 824GFS.16G",
    label: "824GFS.16G",
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
    <section className="relative w-full bg-[#E8E4DC] py-14 md:py-24 px-4 sm:px-8 overflow-hidden select-none">
      {/* Main Full-Width Catalog Shell Container */}
      <div className="relative w-full max-w-[1800px] mx-auto p-4 sm:p-8 md:p-12 overflow-hidden">
        
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
              className="px-8 py-3.5 bg-[#003926] text-white font-montserrat text-[12px] md:text-[13px] tracking-[0.18em] uppercase font-medium hover:bg-[#1A1918] transition-all duration-300 shadow-md"
            >
              MEN'S COLLECTION
            </Link>
            <Link
              href="/collections/womens-dsigner"
              className="px-8 py-3.5 bg-transparent border border-[#003926] text-[#003926] font-montserrat text-[12px] md:text-[13px] tracking-[0.18em] uppercase font-medium hover:bg-[#003926] hover:text-white transition-all duration-300"
            >
              WOMEN'S COLLECTION
            </Link>
          </div>
        </div>

        {/* 4-Column Grid Collage with Edge-to-Edge Premium Fitting Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 items-stretch relative z-10">
          
          {/* COLUMN 1: Tall Left Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden aspect-[3/5] bg-[#0A120E] group rounded-sm border border-black/10 shadow-lg"
          >
            <Image
              src={IMAGES.col1.src}
              alt={IMAGES.col1.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
              priority
            />
            {/* Dark Gradient Overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
              <span className="font-montserrat text-[12px] text-white font-medium tracking-wider block bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/20 shadow-md">
                {IMAGES.col1.label}
              </span>
            </div>

            {/* Plus Quick-Add Symbol Button */}
            <button
              onClick={(e) => handleQuickAdd(IMAGES.col1, e)}
              className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-transparent text-white flex items-center justify-center hover:bg-[#003926] hover:border-[#003926] transition-all duration-300 cursor-pointer border border-white/40 backdrop-blur-sm shadow-lg"
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
            <div className="relative overflow-hidden aspect-[4/3] bg-[#0A120E] group flex-grow rounded-sm border border-black/10 shadow-lg">
              <Image
                src={IMAGES.col2_top.src}
                alt={IMAGES.col2_top.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="font-montserrat text-[12px] text-white font-medium tracking-wider block bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/20 shadow-md">
                  {IMAGES.col2_top.label}
                </span>
              </div>

              <button
                onClick={(e) => handleQuickAdd(IMAGES.col2_top, e)}
                className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-transparent text-white flex items-center justify-center hover:bg-[#003926] hover:border-[#003926] transition-all duration-300 cursor-pointer border border-white/40 backdrop-blur-sm shadow-lg"
                title="Quick Add to Cart"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>

            {/* Bottom Card */}
            <div className="relative overflow-hidden aspect-[4/3] bg-[#0A120E] group flex-grow rounded-sm border border-black/10 shadow-lg">
              <Image
                src={IMAGES.col2_bottom.src}
                alt={IMAGES.col2_bottom.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="font-montserrat text-[12px] text-white font-medium tracking-wider block bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/20 shadow-md">
                  {IMAGES.col2_bottom.label}
                </span>
              </div>

              <button
                onClick={(e) => handleQuickAdd(IMAGES.col2_bottom, e)}
                className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-transparent text-white flex items-center justify-center hover:bg-[#003926] hover:border-[#003926] transition-all duration-300 cursor-pointer border border-white/40 backdrop-blur-sm shadow-lg"
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
            <div className="relative overflow-hidden aspect-[4/3] bg-[#0A120E] group flex-grow rounded-sm border border-black/10 shadow-lg">
              <Image
                src={IMAGES.col3_top.src}
                alt={IMAGES.col3_top.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="font-montserrat text-[12px] text-white font-medium tracking-wider block bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/20 shadow-md">
                  {IMAGES.col3_top.label}
                </span>
              </div>

              <button
                onClick={(e) => handleQuickAdd(IMAGES.col3_top, e)}
                className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-transparent text-white flex items-center justify-center hover:bg-[#003926] hover:border-[#003926] transition-all duration-300 cursor-pointer border border-white/40 backdrop-blur-sm shadow-lg"
                title="Quick Add to Cart"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>

            {/* Bottom Card */}
            <div className="relative overflow-hidden aspect-[4/3] bg-[#0A120E] group flex-grow rounded-sm border border-black/10 shadow-lg">
              <Image
                src={IMAGES.col3_bottom.src}
                alt={IMAGES.col3_bottom.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="font-montserrat text-[12px] text-white font-medium tracking-wider block bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/20 shadow-md">
                  {IMAGES.col3_bottom.label}
                </span>
              </div>

              <button
                onClick={(e) => handleQuickAdd(IMAGES.col3_bottom, e)}
                className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-transparent text-white flex items-center justify-center hover:bg-[#003926] hover:border-[#003926] transition-all duration-300 cursor-pointer border border-white/40 backdrop-blur-sm shadow-lg"
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
            className="relative overflow-hidden aspect-[3/5] bg-[#0A120E] group rounded-sm border border-black/10 shadow-lg"
          >
            {/* Cutout PNG Watch product styling with dark background */}
            <div className="relative w-full h-full p-6 flex items-center justify-center">
              <Image
                src={IMAGES.col4.src}
                alt={IMAGES.col4.alt}
                fill
                className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-108 drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                sizes="(max-width: 768px) 100vw, 25vw"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
              <span className="font-montserrat text-[12px] text-white font-medium tracking-wider block bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/20 shadow-md">
                {IMAGES.col4.label}
              </span>
            </div>

            <button
              onClick={(e) => handleQuickAdd(IMAGES.col4, e)}
              className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-transparent text-white flex items-center justify-center hover:bg-[#003926] hover:border-[#003926] transition-all duration-300 cursor-pointer border border-white/40 backdrop-blur-sm shadow-lg"
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
