"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Cinematic Zoom */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.85 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/new-content/home2-hero.png"
          alt="Luxury Watch Background"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Luxury Dark Green Overlay & Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,57,38,0.35)_0%,transparent_80%)] z-10" />

      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.02]">
        <svg width="100%" height="100%" aria-hidden>
          <filter id="hero-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-grain)" />
        </svg>
      </div>

      {/* Core Hero Content */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Subtle Gold Subtitle */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-dm text-[11px] tracking-[0.3em] uppercase text-[#D4C5A0] mb-6 block"
        >
          FOUR GENERATIONS OF PRECISION
        </motion.span>

        {/* Floating Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-cormorant text-[45px] sm:text-[68px] md:text-[85px] text-white font-light leading-[1.08] tracking-tight max-w-4xl"
        >
          A Legacy Crafted <br />
          <span className="italic font-normal text-[#D4C5A0]">For Eternity.</span>
        </motion.h1>

        {/* Minimal Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="font-dm text-[14px] sm:text-[16px] text-white max-w-md mt-6 leading-relaxed tracking-wide"
        >
          Discover hand-assembled luxury timepieces engineered with horological mastery and timeless sophistication.
        </motion.p>

        {/* Luxury CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#featured-collections"
            className="group px-10 py-4 rounded-full font-dm text-[12px] tracking-[0.18em] uppercase text-white bg-[#003926] border border-[#D4C5A0]/30 hover:border-[#D4C5A0] hover:bg-transparent shadow-2xl transition-all duration-500 hover:-translate-y-0.5"
          >
            Explore Masterpieces
          </a>
          <a
            href="#story"
            className="group px-10 py-4 rounded-full font-dm text-[12px] tracking-[0.18em] uppercase text-[#D4C5A0] border border-[#D4C5A0]/20 hover:border-[#D4C5A0] hover:text-white transition-all duration-500 hover:-translate-y-0.5"
          >
            The Heritage
          </a>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => {
          const el = document.getElementById("featured-collections");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="font-dm text-[9px] tracking-[0.2em] text-[#D4C5A0]/80 uppercase">Scroll Down</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#D4C5A0]/60 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#D4C5A0]"
          />
        </div>
      </motion.div>
    </section>
  );
}
