"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────
   NAGPAL VIDEO BANNER — Pillar Page Showpiece
   3-column layout: animated text | centered video | animated text
   White background with brand green (#003926) typography
   ───────────────────────────────────────────────────── */

const PHRASES = [
  "DESIGNER WORLD",
  "PILLARS OF CRAFT",
  "SINCE 1940s",
  "4 GENERATIONS",
  "PRECISION & TRUST",
];

const CYCLE_MS = 4000;
const TRANSITION_DURATION = 0.5;

export default function NagpalVideoBanner() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIdx((prev) => (prev + 1) % PHRASES.length);
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden"
    >
      {/* Subtle top/bottom border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#003926]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#003926]/10 to-transparent" />

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(0,57,38,0.03)_0%,transparent_70%)] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-16 lg:pb-24">
        {/* ═══════ DESKTOP: 3-Column Layout ═══════ */}
        <div className="hidden lg:flex items-center justify-center gap-0">
          {/* Left Text Column */}
          <div className="flex-1 flex flex-col items-end justify-center pr-10 xl:pr-14 min-h-[400px]">
            <AnimatedSideText
              phrases={PHRASES}
              phraseIdx={phraseIdx}
              align="right"
              isInView={isInView}
            />
          </div>

          {/* Center Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[800px] shrink-0"
          >
            <VideoPlayer />
          </motion.div>

          {/* Right Text Column */}
          <div className="flex-1 flex flex-col items-start justify-center pl-10 xl:pl-14 min-h-[400px]">
            <AnimatedSideText
              phrases={PHRASES}
              phraseIdx={phraseIdx}
              align="left"
              isInView={isInView}
              offset={2}
            />
          </div>
        </div>

        {/* ═══════ TABLET/MOBILE: Stacked Layout ═══════ */}
        <div className="lg:hidden flex flex-col items-center gap-8">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="w-full max-w-[800px]"
          >
            <VideoPlayer />
          </motion.div>

          {/* Text below video (visible on tablet <1200px, hidden on mobile <800px handled by inner) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden sm:flex flex-col items-center text-center gap-4"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: TRANSITION_DURATION }}
                className="font-dm text-[13px] tracking-[0.3em] uppercase font-medium"
                style={{ color: "#003926" }}
              >
                {PHRASES[phraseIdx]}
              </motion.p>
            </AnimatePresence>

            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[#003926]/20" />
              <span className="font-cormorant italic text-[18px] text-[#003926]/40">
                Pillars
              </span>
              <div className="w-8 h-px bg-[#003926]/20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   VIDEO PLAYER — Autoplay, looped, no controls, sound toggle
   Starts muted (browser autoplay policy), user can unmute
   ───────────────────────────────────────────────────── */

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,57,38,0.08)] border border-[#003926]/5">
      {/* Inner frame accent */}
      <div className="absolute inset-3 border border-[#003926]/[0.04] rounded-xl pointer-events-none z-10" />

      <video
        ref={videoRef}
        src="/images/new-content/designer watch 001 june.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full aspect-video object-cover"
        style={{
          display: "block",
          backgroundColor: "#FAF8F4",
        }}
      />

      {/* Subtle gradient overlay on edges */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.05) 100%)",
        }}
      />

      {/* Corner brand badge */}
      <div className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#003926]/8 shadow-sm">
        <span className="font-dm text-[9px] tracking-[0.25em] uppercase text-[#003926] font-medium">
          Designer World
        </span>
      </div>

      {/* Sound toggle button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-[#003926]/10 shadow-md flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 cursor-pointer"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003926" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003926" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   ANIMATED SIDE TEXT — Vertical rotating text columns
   ───────────────────────────────────────────────────── */

function AnimatedSideText({
  phrases,
  phraseIdx,
  align,
  isInView,
  offset = 0,
}: {
  phrases: string[];
  phraseIdx: number;
  align: "left" | "right";
  isInView: boolean;
  offset?: number;
}) {
  const adjustedIdx = (phraseIdx + offset) % phrases.length;
  const nextIdx = (adjustedIdx + 1) % phrases.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className={`flex flex-col gap-8 ${
        align === "right" ? "items-end text-right" : "items-start text-left"
      }`}
    >
      {/* Decorative vertical line */}
      <div
        className={`w-px h-16 bg-gradient-to-b from-transparent via-[#003926]/15 to-transparent ${
          align === "right" ? "ml-auto mr-0" : "mr-auto ml-0"
        }`}
      />

      {/* Primary rotating phrase */}
      <div className="min-h-[40px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={adjustedIdx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: TRANSITION_DURATION, ease: "easeInOut" }}
            className="font-dm text-[12px] xl:text-[13px] tracking-[0.35em] uppercase font-semibold"
            style={{ color: "#003926" }}
          >
            {phrases[adjustedIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Accent separator */}
      <div
        className={`flex items-center gap-2 ${
          align === "right" ? "flex-row-reverse" : ""
        }`}
      >
        <div className="w-6 h-px bg-[#B8935A]/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#B8935A]/30" />
      </div>

      {/* Secondary rotating phrase (offset by 1) */}
      <div className="min-h-[32px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={nextIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.5, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: TRANSITION_DURATION,
              ease: "easeInOut",
              delay: 0.15,
            }}
            className="font-cormorant italic text-[18px] xl:text-[20px]"
            style={{ color: "#003926" }}
          >
            {phrases[nextIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Static label */}
      <div className={`flex items-center gap-2 ${align === "right" ? "flex-row-reverse" : ""}`}>
        <div className="w-10 h-px bg-[#003926]/10" />
        <span className="font-dm text-[9px] tracking-[0.2em] uppercase text-[#003926]/25 font-medium">
          Pillars
        </span>
      </div>

      {/* Decorative vertical line */}
      <div
        className={`w-px h-16 bg-gradient-to-b from-transparent via-[#003926]/15 to-transparent ${
          align === "right" ? "ml-auto mr-0" : "mr-auto ml-0"
        }`}
      />
    </motion.div>
  );
}
