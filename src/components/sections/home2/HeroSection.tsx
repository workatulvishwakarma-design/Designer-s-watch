"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#040806] select-none">
      {/* 1. Full Page Zoomed-In Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/home1.PNG"
          alt="Luxury D'Signer Timepiece"
          fill
          priority
          className="object-cover object-center scale-105 filter brightness-[0.45] contrast-[1.05]"
        />
        {/* Subtle Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 z-10" />
      </div>

      {/* 2. Centered Core Hero Content */}
      <div className="relative z-30 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center">
        {/* Small Top Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="font-montserrat text-[11px] md:text-[13px] tracking-[0.25em] uppercase text-[#E8D9C0] font-medium">
            FOUR GENERATIONS OF PRECISION
          </span>
        </motion.div>

        {/* Main Heading - Miraggio Spec: Desktop 56px, Mobile 32px, Line Height 110%, Letter-spacing -0.02em, Weight 500 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-montserrat text-[32px] md:text-[56px] text-white font-medium leading-[1.1] tracking-[-0.02em] max-w-3xl mb-5"
        >
          A Legacy Crafted <br className="hidden sm:inline" />
          <span className="font-medium text-[#F5E7C6]">
            For Eternity.
          </span>
        </motion.h1>

        {/* Minimal Subtitle - Miraggio Spec: Desktop 16px, Mobile 14px, Line Height 150%, Weight 400 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-montserrat text-[14px] md:text-[16px] text-white/80 font-normal leading-[1.5] tracking-[0em] max-w-xl mb-8"
        >
          Timeless craftsmanship. Enduring heritage. Discover hand-assembled luxury timepieces engineered with horological mastery.
        </motion.p>

        {/* Transparent Button - Miraggio Spec: Montserrat, 14px, Weight 500, Letter Spacing 0.04em, Hover Green */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href="#featured-products"
            className="inline-flex items-center gap-3 px-8 py-4 font-montserrat text-[14px] tracking-[0.04em] uppercase text-white font-medium bg-transparent border border-white/60 hover:bg-[#003926] hover:border-[#003926] transition-all duration-300 shadow-xl"
          >
            <span>EXPLORE COLLECTION</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-60">
        <span className="font-montserrat text-[11px] tracking-[0.2em] uppercase text-white font-normal">SCROLL DOWN</span>
        <div className="w-[1px] h-8 bg-white/40 animate-pulse" />
      </div>
    </section>
  );
}

