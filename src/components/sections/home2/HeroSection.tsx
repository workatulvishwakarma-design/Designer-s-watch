"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-[#040806] select-none">
      {/* 1. Deep Radial Dark Emerald Glow on Right Side */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(0,70,45,0.45)_0%,rgba(0,30,20,0.2)_50%,transparent_75%)] pointer-events-none z-0" />

      {/* 2. Concentric Orbit Circles behind Watch */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[70%] h-[120%] pointer-events-none z-0 opacity-40">
        <svg viewBox="0 0 800 800" className="w-full h-full">
          <circle cx="550" cy="400" r="320" fill="none" stroke="#D4C5A0" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.3" />
          <circle cx="550" cy="400" r="260" fill="none" stroke="#005032" strokeWidth="1" opacity="0.4" />
          <circle cx="550" cy="400" r="200" fill="none" stroke="#D4C5A0" strokeWidth="0.5" opacity="0.25" />
        </svg>
      </div>

      {/* 3. Top Header Elements (Logo Top-Left, Dots Top-Right) */}
      <div className="absolute top-6 left-6 md:top-8 md:left-12 z-40 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border border-[#D4C5A0]/50 flex items-center justify-center text-[#D4C5A0] font-serif text-[12px] font-bold tracking-tighter bg-black/30 backdrop-blur-sm">
          D
        </div>
      </div>

      <div className="absolute top-6 right-6 md:top-8 md:right-12 z-40 flex items-center gap-1.5 opacity-80">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4C5A0]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4C5A0]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4C5A0]" />
      </div>

      {/* 4. Left Side Core Hero Content */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-center">
        <div className="max-w-xl text-left">
          
          {/* Small Top Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="font-montserrat text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#D4C5A0] font-medium">
              FOUR GENERATIONS OF PRECISION
            </span>
          </motion.div>

          {/* Main Heading (Refined, smaller & elegant as requested) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant text-[38px] sm:text-[48px] md:text-[56px] lg:text-[62px] text-white font-normal leading-[1.08] tracking-tight"
          >
            A Legacy Crafted <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F5E7C6] via-[#D4C5A0] to-[#B89855]">
              For Eternity.
            </span>
          </motion.h1>

          {/* Short Horizontal Accent Line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 0.6, width: "40px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-[1.5px] bg-[#D4C5A0] my-6"
          />

          {/* Minimal Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-montserrat text-[13px] sm:text-[14px] text-white/80 font-light tracking-wide mb-8"
          >
            Timeless craftsmanship. Enduring heritage.
          </motion.p>

          {/* Luxury Sharp Rectangular CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <a
              href="#featured-collections"
              className="inline-flex items-center gap-3 px-7 py-3.5 font-montserrat text-[11px] tracking-[0.22em] uppercase text-[#D4C5A0] font-semibold bg-[#031A12]/80 border border-[#D4C5A0]/40 hover:border-[#D4C5A0] hover:bg-[#002B1D] hover:text-white shadow-xl transition-all duration-300"
            >
              <span>EXPLORE COLLECTION</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
          </motion.div>

        </div>
      </div>

      {/* 5. Right Side Watch Showcase Image */}
      <motion.div
        initial={{ opacity: 0, x: 50, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-[-8%] sm:right-[-2%] md:right-[2%] lg:right-[4%] top-1/2 -translate-y-1/2 w-[72%] sm:w-[62%] md:w-[54%] lg:w-[50%] h-[85%] pointer-events-none z-10 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"
      >
        <Image
          src="/img/watch-hero-cutout.png"
          alt="Luxury D'Signer Rose Gold Timepiece"
          fill
          priority
          className="object-contain object-right drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
        />
      </motion.div>

      {/* 6. Bottom Corner Badges */}
      {/* Bottom Left Circle Badge */}
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-12 z-40">
        <div className="w-8 h-8 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 font-montserrat text-[11px] font-medium">
          N
        </div>
      </div>

      {/* Bottom Right Floating Chat / Support Icon */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-12 z-40">
        <button
          aria-label="Contact Support"
          className="w-11 h-11 rounded-full border border-[#D4C5A0]/40 bg-black/50 backdrop-blur-md flex items-center justify-center text-[#D4C5A0] hover:border-[#D4C5A0] hover:bg-[#002B1D] hover:text-white transition-all shadow-lg cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>
    </section>
  );
}

