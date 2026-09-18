"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface WatchVariant {
  titleLine1: string;
  titleLine2: string;
  sku: string;
  description: string;
  image: string;
  href: string;
}

interface WatchComparisonModel {
  id: string;
  collection: string;
  modelNo: string;
  displayName: string;
  gender: "MEN" | "WOMEN";
  priceFormatted: string;
  thumbnail: string;
  leftVariant: WatchVariant;
  rightVariant: WatchVariant;
}

const WATCH_SHOWCASE_MODELS: WatchComparisonModel[] = [
  {
    id: "glimmer-860",
    collection: "Glimmer",
    modelNo: "860",
    displayName: "GLIMMER 860",
    gender: "WOMEN",
    priceFormatted: "₹6,495",
    thumbnail: "/images/transparent-img/model-2/860/860RGM.16.L/860RGM.16 (1).png",
    leftVariant: {
      titleLine1: "Emerald Green",
      titleLine2: "Sunburst",
      sku: "860RGM.16L",
      description: "A radiant green dial with a sunburst finish that captures elegance in every angle.",
      image: "/images/transparent-img/model-2/860/860RGM.16.L/860RGM.16 (1).png",
      href: "/product/860rgm-16l",
    },
    rightVariant: {
      titleLine1: "Ocean Blue",
      titleLine2: "Mother of Pearl",
      sku: "860RGM.12L",
      description: "A serene blue mother of pearl dial that reflects timeless beauty.",
      image: "/images/transparent-img/model-2/860/860RGM.12.L/860RGM.12 (1).png",
      href: "/product/860rgm-12l",
    },
  },
  {
    id: "serene-812",
    collection: "Serene",
    modelNo: "812",
    displayName: "SERENE 812",
    gender: "WOMEN",
    priceFormatted: "₹8,995",
    thumbnail: "/images/new-img/model-1/812/812/812/812RGM.16L.png",
    leftVariant: {
      titleLine1: "Rose Gold &",
      titleLine2: "Emerald Green",
      sku: "812RGM.16L",
      description: "Lustrous emerald sunray dial harmonized with a radiant rose gold finish.",
      image: "/images/new-img/model-1/812/812/812/812RGM.16L.png",
      href: "/product/812rgm-16l",
    },
    rightVariant: {
      titleLine1: "Yellow Gold &",
      titleLine2: "Champagne",
      sku: "812GM.2L",
      description: "Pure champagne sunray dial encased in timeless yellow gold refinement.",
      image: "/images/new-img/model-1/812/812/812/812GM.2L.png",
      href: "/product/812gm-2l",
    },
  },
  {
    id: "quest-806",
    collection: "Quest",
    modelNo: "806",
    displayName: "QUEST 806",
    gender: "MEN",
    priceFormatted: "₹12,995",
    thumbnail: "/images/new-img/model-1/806/806/806BFS.3G.png",
    leftVariant: {
      titleLine1: "Imperial Gold &",
      titleLine2: "Emerald",
      sku: "806GFS.16G",
      description: "Skeletonized dial engineering accented with opulent gold and rich green tones.",
      image: "/images/new-img/model-1/806/806/806GFS.16G.png",
      href: "/product/806gfs-16g",
    },
    rightVariant: {
      titleLine1: "Stealth Matte",
      titleLine2: "Black PVD",
      sku: "806BFS.3G",
      description: "Bold black PVD casing framing an intricate openwork mechanical balance.",
      image: "/images/new-img/model-1/806/806/806BFS.3G.png",
      href: "/product/806bfs-3g",
    },
  },
  {
    id: "daymark-809",
    collection: "Daymark",
    modelNo: "809",
    displayName: "DAYMARK 809",
    gender: "MEN",
    priceFormatted: "₹7,495",
    thumbnail: "/images/new-img/model-1/809/809 new colors/809/809RTM.16G.png",
    leftVariant: {
      titleLine1: "Two-Tone",
      titleLine2: "Emerald Green",
      sku: "809RTM.16G",
      description: "Executive multifunction display enriched with emerald green and rose gold links.",
      image: "/images/new-img/model-1/809/809 new colors/809/809RTM.16G.png",
      href: "/product/809rtm-16g",
    },
    rightVariant: {
      titleLine1: "Champagne Gold &",
      titleLine2: "Ivory",
      sku: "809GM.4G",
      description: "Classic sunburst ivory dial paired with a full champagne gold bracelet.",
      image: "/images/new-img/model-1/809/809 new colors/809/809GM.4G.png",
      href: "/product/809gm-4g",
    },
  },
  {
    id: "echo-853",
    collection: "Echo",
    modelNo: "853",
    displayName: "ECHO 853",
    gender: "WOMEN",
    priceFormatted: "₹6,495",
    thumbnail: "/images/new-img/model-2/853/853/853GM.2L.png",
    leftVariant: {
      titleLine1: "Classic Gold &",
      titleLine2: "Opal White",
      sku: "853GM.2L",
      description: "Petite diamond-set bezel framing a pristine white dial for daily luxury.",
      image: "/images/new-img/model-2/853/853/853GM.2L.png",
      href: "/product/853gm-2l",
    },
    rightVariant: {
      titleLine1: "Gunmetal &",
      titleLine2: "Anthracite Grey",
      sku: "853GNM.8L",
      description: "Contemporary smoky grey profile accented with brilliant diamond markers.",
      image: "/images/new-img/model-2/853/853/853GNM.8L.png",
      href: "/product/853gnm-8l",
    },
  },
  {
    id: "grandeur-950",
    collection: "Grandeur",
    modelNo: "950",
    displayName: "GRANDEUR 950",
    gender: "MEN",
    priceFormatted: "₹34,995",
    thumbnail: "/images/new-img/model-2/950/950/950RGBFS.3G.png",
    leftVariant: {
      titleLine1: "Emerald Green &",
      titleLine2: "Titanium",
      sku: "950GNFS.16G",
      description: "Avant-garde tonneau silhouette showcasing an openwork dual-balance calibre.",
      image: "/images/new-img/model-2/950/950/950GNFS.16G.png",
      href: "/product/950gnfs-16g",
    },
    rightVariant: {
      titleLine1: "Obsidian Black &",
      titleLine2: "Rose Gold",
      sku: "950RGBFS.3G",
      description: "Deep obsidian skeleton dial with rose gold hour markers and bridge accents.",
      image: "/images/new-img/model-2/950/950/950RGBFS.3G.png",
      href: "/product/950rgbfs-3g",
    },
  },
  {
    id: "escort-7931",
    collection: "Escort",
    modelNo: "E-7931",
    displayName: "ESCORT 7931",
    gender: "WOMEN",
    priceFormatted: "₹2,450",
    thumbnail: "/images/new-content/new-1/escort womens/E-7931/E-7931.RGM_Blue.png",
    leftVariant: {
      titleLine1: "Ocean Blue",
      titleLine2: "Dial",
      sku: "E-7931.RGM_Blue",
      description: "Deep ocean blue multi-function dial framed by a gleaming rose gold bracelet.",
      image: "/images/new-content/new-1/escort womens/E-7931/E-7931.RGM_Blue.png",
      href: "/product/escort-e-7931?variant=E-7931.RGM_Blue",
    },
    rightVariant: {
      titleLine1: "Alabaster White",
      titleLine2: "Dial",
      sku: "E-7931.RGM_White",
      description: "Pristine alabaster white dial featuring precision sub-dials and crystal indices.",
      image: "/images/new-content/new-1/escort womens/E-7931/E-7931.RGM_White.png",
      href: "/product/escort-e-7931?variant=E-7931.RGM_White",
    },
  },
];

export default function SlideToSwitch() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [position, setPosition] = useState(50); // percentage 0-100
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const activeModel = WATCH_SHOWCASE_MODELS[selectedIdx] || WATCH_SHOWCASE_MODELS[0];

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    const observer = new ResizeObserver(updateWidth);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", updateWidth);
      observer.disconnect();
    };
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    updatePosition(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if already released
    }
  };

  return (
    <section className="w-full bg-[#FAF7F2] py-14 md:py-20 lg:py-24 overflow-hidden select-none border-b border-[#E8E2D8]">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        
        {/* Main 3-Column Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-4 relative">
          
          {/* Left Column: Left Variant Details */}
          <div className="order-2 lg:order-1 lg:col-span-3 xl:col-span-3 text-left lg:pl-4 xl:pl-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-details-${activeModel.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Header tag */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-montserrat text-[11px] tracking-[0.2em] text-[#B8935A] uppercase font-semibold">
                    LEFT VARIANT
                  </span>
                  <span className="inline-block w-8 sm:w-12 h-[1px] bg-[#B8935A]/50" />
                </div>

                {/* Big Serif Title */}
                <h3
                  className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] leading-[1.12] text-[#1A1918] font-normal my-2 tracking-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {activeModel.leftVariant.titleLine1}
                  <br />
                  {activeModel.leftVariant.titleLine2}
                </h3>

                {/* Subtitle with Model & Price */}
                <p className="font-montserrat text-[12px] sm:text-[13px] tracking-[0.14em] uppercase text-[#1A1918] font-semibold mt-3 mb-3">
                  {activeModel.displayName} · {activeModel.priceFormatted}
                </p>

                {/* Accent Divider */}
                <div className="w-10 h-[1px] bg-[#B8935A]/40 mb-4" />

                {/* Description */}
                <p className="font-montserrat text-[12px] sm:text-[13px] text-[#6E685F] leading-relaxed max-w-sm mb-6 font-light">
                  {activeModel.leftVariant.description}
                </p>

                {/* Shop Now Outlined Button */}
                <Link
                  href={activeModel.leftVariant.href}
                  className="inline-flex items-center justify-center px-7 py-3 border border-[#003926] text-[#003926] font-montserrat text-[11px] tracking-[0.2em] font-semibold uppercase hover:bg-[#003926] hover:text-white transition-all duration-300 group cursor-pointer"
                >
                  <span>SHOP NOW</span>
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Column: Interactive Split Watch Canvas */}
          <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-6 relative flex items-center justify-center">
            
            {/* Background Halo Circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Soft radial aura glow */}
              <div className="w-[340px] sm:w-[440px] lg:w-[500px] h-[340px] sm:h-[440px] lg:h-[500px] rounded-full bg-gradient-to-br from-[#F2ECE0]/70 via-[#F7F2E8]/40 to-transparent blur-md" />
              {/* Concentric subtle rings */}
              <div className="absolute w-[320px] sm:w-[420px] lg:w-[480px] h-[320px] sm:h-[420px] lg:h-[480px] rounded-full border border-[#E8E1D5]/70" />
              <div className="absolute w-[240px] sm:w-[320px] lg:w-[360px] h-[240px] sm:h-[320px] lg:h-[360px] rounded-full border border-[#E8E1D5]/40" />
            </div>

            {/* Split Screen Slider Canvas Box */}
            <div
              ref={containerRef}
              className="relative w-full h-[480px] sm:h-[540px] md:h-[600px] lg:h-[640px] overflow-hidden cursor-ew-resize touch-none select-none flex items-center justify-center"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Base Layer: Right Variant Watch (Fixed Center) */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center py-4 px-2 pointer-events-none">
                <div className="relative w-full h-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`right-img-${activeModel.id}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={activeModel.rightVariant.image}
                        alt={`${activeModel.displayName} - ${activeModel.rightVariant.titleLine1}`}
                        fill
                        draggable={false}
                        className="object-contain select-none pointer-events-none scale-105 sm:scale-115 md:scale-120"
                        sizes="(max-width: 1024px) 80vw, 500px"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Overlay Layer: Left Variant Watch (Clipped via position percentage) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden z-10 pointer-events-none"
                style={{ width: `${position}%` }}
              >
                {/* Pinned inner width so left image overlays center watch dead-on */}
                <div
                  className="absolute inset-y-0 left-0 h-full flex items-center justify-center py-4 px-2 pointer-events-none"
                  style={{ width: containerWidth ? `${containerWidth}px` : "100%" }}
                >
                  <div className="relative w-full h-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`left-img-${activeModel.id}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={activeModel.leftVariant.image}
                          alt={`${activeModel.displayName} - ${activeModel.leftVariant.titleLine1}`}
                          fill
                          draggable={false}
                          className="object-contain select-none pointer-events-none scale-105 sm:scale-115 md:scale-120"
                          sizes="(max-width: 1024px) 80vw, 500px"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Vertical Slider Divider Line & Drag Handle */}
              <div
                className="absolute inset-y-0 z-20 w-[2px] bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
                style={{ left: `${position}%` }}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-xl border border-neutral-300 flex items-center justify-center text-[#1A1918] pointer-events-none">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M8 19l-7-7 7-7M16 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Right Variant Details */}
          <div className="order-3 lg:col-span-3 xl:col-span-3 text-left lg:pr-4 xl:pr-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-details-${activeModel.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Header tag */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-montserrat text-[11px] tracking-[0.2em] text-[#B8935A] uppercase font-semibold">
                    RIGHT VARIANT
                  </span>
                  <span className="inline-block w-8 sm:w-12 h-[1px] bg-[#B8935A]/50" />
                </div>

                {/* Big Serif Title */}
                <h3
                  className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] leading-[1.12] text-[#1A1918] font-normal my-2 tracking-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {activeModel.rightVariant.titleLine1}
                  <br />
                  {activeModel.rightVariant.titleLine2}
                </h3>

                {/* Subtitle with Model & Price */}
                <p className="font-montserrat text-[12px] sm:text-[13px] tracking-[0.14em] uppercase text-[#1A1918] font-semibold mt-3 mb-3">
                  {activeModel.displayName} · {activeModel.priceFormatted}
                </p>

                {/* Accent Divider */}
                <div className="w-10 h-[1px] bg-[#B8935A]/40 mb-4" />

                {/* Description */}
                <p className="font-montserrat text-[12px] sm:text-[13px] text-[#6E685F] leading-relaxed max-w-sm mb-6 font-light">
                  {activeModel.rightVariant.description}
                </p>

                {/* Shop Now Outlined Button */}
                <Link
                  href={activeModel.rightVariant.href}
                  className="inline-flex items-center justify-center px-7 py-3 border border-[#003926] text-[#003926] font-montserrat text-[11px] tracking-[0.2em] font-semibold uppercase hover:bg-[#003926] hover:text-white transition-all duration-300 group cursor-pointer"
                >
                  <span>SHOP NOW</span>
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Section: Side Labels & Clean Circular Watch Selectors */}
        <div className="mt-12 pt-8 border-t border-[#EAE4D9]/60 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Bottom Left Corner Text */}
          <div className="hidden lg:block text-left shrink-0">
            <span className="font-montserrat text-[10px] tracking-[0.25em] text-[#A09A8F] uppercase font-semibold block leading-tight">
              TWO WORLDS
            </span>
            <span className="font-montserrat text-[10px] tracking-[0.25em] text-[#A09A8F] uppercase font-semibold block leading-tight">
              ONE EXPRESSION
            </span>
            <div className="w-8 h-[1px] bg-[#B8935A]/50 mt-2" />
          </div>

          {/* Center: Circular Watch Selector Row */}
          <div className="flex items-center justify-start lg:justify-center gap-5 sm:gap-6 md:gap-7 overflow-x-auto py-2 px-3 max-w-full no-scrollbar">
            {WATCH_SHOWCASE_MODELS.map((model, idx) => {
              const isCurrent = idx === selectedIdx;
              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className="flex flex-col items-center group cursor-pointer shrink-0 transition-transform duration-300 hover:scale-105 focus:outline-none"
                  aria-label={`Select ${model.displayName}`}
                >
                  {/* Circular Watch Selector Avatar */}
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 transition-all duration-300 flex items-center justify-center relative bg-white ${
                      isCurrent
                        ? "ring-2 ring-[#B8935A] ring-offset-2 ring-offset-[#FAF7F2] shadow-md scale-105"
                        : "border border-[#DDD6CB] hover:border-[#B8935A] shadow-xs"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={model.thumbnail}
                        alt={model.displayName}
                        fill
                        className="object-contain p-0.5"
                        sizes="64px"
                      />
                    </div>
                  </div>

                  {/* Model Name Label */}
                  <span
                    className={`font-montserrat text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] uppercase mt-2.5 block text-center ${
                      isCurrent ? "text-[#1A1918]" : "text-[#7A7368] group-hover:text-[#1A1918]"
                    }`}
                  >
                    {model.displayName}
                  </span>

                  {/* Gender Pill Badge */}
                  <span
                    className={`inline-block font-montserrat text-[9px] font-bold tracking-widest uppercase px-2 py-0.2 rounded-xs mt-1 text-center ${
                      isCurrent ? "bg-[#003926] text-white" : "bg-[#003926]/10 text-[#003926]"
                    }`}
                  >
                    {model.gender}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Right Corner Text */}
          <div className="hidden lg:block text-right shrink-0">
            <span className="font-montserrat text-[10px] tracking-[0.25em] text-[#A09A8F] uppercase font-semibold block leading-tight">
              D'SIGNER
            </span>
            <span className="font-montserrat text-[10px] tracking-[0.25em] text-[#A09A8F] uppercase font-semibold block leading-tight">
              COLLECTION
            </span>
            <div className="w-8 h-[1px] bg-[#B8935A]/50 mt-2 ml-auto" />
          </div>

        </div>

      </div>
    </section>
  );
}
