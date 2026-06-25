"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   HOME VIDEO BANNER — Main Hero Banner
   Premium TV-commercial style with meaningful brand story.
   Replaces the old HeroBanner as the primary homepage hero.
   ═══════════════════════════════════════════════════════════════ */

const LEFT_CONTENT = [
  {
    heading: "THE ART OF TIME",
    paragraph:
      "Every movement is assembled by hand — a tradition carried through four generations of master watchmakers.",
  },
  {
    heading: "BORN IN CRAFT",
    paragraph:
      "From raw components to refined timepieces, each watch passes through 127 quality checkpoints before it earns our name.",
  },
  {
    heading: "HERITAGE IN MOTION",
    paragraph:
      "Since the 1940s, the Nagpal legacy has shaped India's horological landscape — one dial at a time.",
  },
];

const RIGHT_CONTENT = [
  {
    heading: "ENGINEERED TO LAST",
    paragraph:
      "Surgical-grade stainless steel, sapphire crystal, and Japanese movements — built to outlive trends.",
  },
  {
    heading: "20+ GLOBAL BRANDS",
    paragraph:
      "From Swiss precision to Italian design, we bring the world's finest watch brands to every wrist.",
  },
  {
    heading: "500+ PRIVATE LABELS",
    paragraph:
      "Trusted by brands worldwide, our OEM & ODM division manufactures timepieces for over 500 private labels.",
  },
];

const CYCLE_MS = 4000;

/* Easing curves for premium TV-ad feel */
const EASE_ENTRY: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* ──────────────── MAIN COMPONENT ──────────────── */

export default function HomeVideoBanner() {
  const [idx, setIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % LEFT_CONTENT.length);
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden min-h-screen flex items-center"
      style={{ background: "#003926" }}
    >
      {/* Cinematic grain overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]">
        <svg width="100%" height="100%" aria-hidden>
          <filter id="home-hero-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#home-hero-grain)" />
        </svg>
      </div>

      {/* Background texture & ambient glow */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.08] blur-[150px]" style={{ background: "radial-gradient(circle, rgba(212,197,160,0.8), transparent)" }} />
        <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] opacity-[0.06] blur-[120px]" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent)" }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 md:pt-24 pb-12 md:pb-16 lg:pb-20 w-full">

        {/* ═══════ DESKTOP / TABLET: 3-Column Layout ═══════ */}
        <div className="hidden md:flex items-center justify-center gap-0">

          {/* ── LEFT TEXT PANEL ── */}
          <div className="flex-1 flex flex-col items-end justify-center pr-6 lg:pr-10 xl:pr-14 min-h-[450px] lg:min-h-[550px]">
            <SideTextPanel
              content={LEFT_CONTENT}
              idx={idx}
              direction="left"
              isInView={isInView}
            />
          </div>

          {/* ── CENTER VIDEO ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-[380px] lg:w-[480px] xl:w-[560px] shrink-0"
          >
            <VideoBlock />
          </motion.div>

          {/* ── RIGHT TEXT PANEL ── */}
          <div className="flex-1 flex flex-col items-start justify-center pl-6 lg:pl-10 xl:pl-14 min-h-[450px] lg:min-h-[550px]">
            <SideTextPanel
              content={RIGHT_CONTENT}
              idx={idx}
              direction="right"
              isInView={isInView}
            />
          </div>
        </div>

        {/* ═══════ MOBILE: Stacked Layout ═══════ */}
        <div className="md:hidden flex flex-col items-center gap-8">
          {/* Video first on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[360px]"
          >
            <VideoBlock />
          </motion.div>

          {/* Text content below */}
          <MobileTextBlock content={LEFT_CONTENT} idx={idx} direction="left" />
          <MobileTextBlock content={RIGHT_CONTENT} idx={idx} direction="right" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VIDEO BLOCK — Square, muted, looping, no controls, Ken Burns
   ═══════════════════════════════════════════════════════════════ */

function VideoBlock() {
  return (
    <div className="relative w-full aspect-square rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.14)] bg-black">
      <video
        src="/images/new-content/videobanner-1.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover ken-burns-zoom"
        style={{ display: "block" }}
      />

      {/* Corner badge */}
      <div className="absolute top-4 left-4 z-10 bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10">
        <span className="font-dm text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-white/80 font-medium">
          Handcrafted Precision
        </span>
      </div>

      {/* Bottom vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.35) 100%)"
      }} />

      {/* Bottom tagline */}
      <div className="absolute bottom-5 left-0 right-0 z-10 text-center">
        <span className="font-cormorant italic text-white/60 text-[14px] lg:text-[16px] tracking-wide">
          Where heritage meets the future
        </span>
      </div>

      <style jsx>{`
        @keyframes kenBurnsZoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        .ken-burns-zoom {
          animation: kenBurnsZoom 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SIDE TEXT PANEL — Desktop
   Heading + paragraph, sliding from edges with TV-ad timing
   ═══════════════════════════════════════════════════════════════ */

function SideTextPanel({
  content,
  idx,
  direction,
  isInView,
}: {
  content: { heading: string; paragraph: string }[];
  idx: number;
  direction: "left" | "right";
  isInView: boolean;
}) {
  const isLeft = direction === "left";
  const slideDistance = 200;
  const entryX = isLeft ? -slideDistance : slideDistance;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`flex flex-col gap-5 max-w-[280px] xl:max-w-[320px] ${
        isLeft ? "items-end text-right" : "items-start text-left"
      }`}
    >
      {/* Decorative vertical line */}
      <div
        className={`w-px h-10 bg-gradient-to-b from-transparent via-[#D4C5A0]/25 to-transparent ${
          isLeft ? "ml-auto" : "mr-auto"
        }`}
      />

      {/* Animated heading */}
      <div className="min-h-[40px] flex items-center overflow-hidden w-full">
        <AnimatePresence mode="wait">
          <motion.h2
            key={`${direction}-h-${idx}`}
            initial={{ x: entryX, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: entryX, opacity: 0 }}
            transition={{
              x: { duration: 0.6, ease: EASE_ENTRY },
              opacity: { duration: 0.3, ease: "easeOut" },
            }}
            className={`font-dm font-bold text-[20px] lg:text-[24px] xl:text-[28px] tracking-[0.05em] uppercase whitespace-nowrap w-full ${
              isLeft ? "text-right" : "text-left"
            }`}
            style={{
              color: "#FFFFFF",
              textShadow: "0 2px 10px rgba(0,0,0,0.35)",
              lineHeight: 1.3,
            }}
          >
            {content[idx].heading}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Gold accent separator */}
      <div className={`flex items-center gap-2 ${isLeft ? "flex-row-reverse" : ""}`}>
        <div className="w-12 h-px bg-[#D4C5A0]/80" />
        <div className="w-2 h-2 rounded-full bg-[#D4C5A0]" />
      </div>

      {/* Animated paragraph */}
      <div className="min-h-[70px] flex items-start overflow-hidden w-full">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${direction}-p-${idx}`}
            initial={{ x: entryX * 0.6, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: entryX * 0.6, opacity: 0 }}
            transition={{
              x: { duration: 0.7, ease: EASE_ENTRY, delay: 0.1 },
              opacity: { duration: 0.35, ease: "easeOut", delay: 0.1 },
            }}
            className={`font-dm font-medium text-[13px] lg:text-[14px] xl:text-[15px] leading-[1.75] w-full ${
              isLeft ? "text-right" : "text-left"
            }`}
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            {content[idx].paragraph}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Static brand signature */}
      <div className={`flex items-center gap-2 mt-1 ${isLeft ? "flex-row-reverse" : ""}`}>
        <div className="w-8 h-px bg-[#D4C5A0]/30" />
        <span className="font-dm text-[9px] tracking-[0.25em] uppercase text-[#D4C5A0]/70 font-semibold">
          {isLeft ? "Designer World" : "Since 1940s"}
        </span>
      </div>

      {/* Bottom decorative line */}
      <div
        className={`w-px h-10 bg-gradient-to-b from-transparent via-[#D4C5A0]/25 to-transparent ${
          isLeft ? "ml-auto" : "mr-auto"
        }`}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE TEXT BLOCK — Compact stacked text with slide animation
   ═══════════════════════════════════════════════════════════════ */

function MobileTextBlock({
  content,
  idx,
  direction,
}: {
  content: { heading: string; paragraph: string }[];
  idx: number;
  direction: "left" | "right";
}) {
  const isLeft = direction === "left";
  const entryX = isLeft ? -100 : 100;

  return (
    <div className="w-full flex flex-col items-center text-center gap-3 px-4 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`mobile-${direction}-${idx}`}
          initial={{ x: entryX, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: entryX, opacity: 0 }}
          transition={{
            x: { duration: 0.5, ease: EASE_ENTRY },
            opacity: { duration: 0.25, ease: "easeOut" },
          }}
          className="flex flex-col items-center gap-2"
        >
          <h3
            className="font-dm font-bold text-[16px] sm:text-[18px] tracking-[0.05em] uppercase text-white"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
          >
            {content[idx].heading}
          </h3>
          <div className="w-10 h-px bg-[#D4C5A0]/70" />
          <p
            className="font-dm font-medium text-[12px] sm:text-[13px] leading-[1.7] max-w-[300px] text-white/90"
          >
            {content[idx].paragraph}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
