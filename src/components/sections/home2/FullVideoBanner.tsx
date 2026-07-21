"use client";

import { motion } from "framer-motion";

export default function FullVideoBanner() {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Autoplay Video */}
      <video
        src="/images/new-content/videobanner-1.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-102 pointer-events-none"
      />

      {/* Multi-layer premium overlay gradient */}
      <div 
        className="absolute inset-0 pointer-events-none z-10" 
        style={{
          background: "linear-gradient(180deg, rgba(0,57,38,0.45) 0%, rgba(0,0,0,0.2) 50%, rgba(0,57,38,0.5) 100%)"
        }}
      />
      <div className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />

      {/* Edge blur & ambient lighting */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          boxShadow: "inset 0 0 120px rgba(0,0,0,0.6)"
        }}
      />

      {/* Text overlay contents */}
      <div className="relative z-20 max-w-[800px] mx-auto px-6 text-center text-white flex flex-col items-center">
        <span className="font-dm text-[10px] tracking-[0.35em] text-[#D4C5A0] font-bold block mb-4 uppercase">
          ✦ CINEMATIC HOROLOGY ✦
        </span>
        <h2 className="font-cormorant text-[36px] sm:text-[54px] lg:text-[68px] font-light leading-[1.1] mb-6">
          Precision in <span className="italic text-[#D4C5A0]">Every Gesture.</span>
        </h2>
        <div className="w-16 h-[1px] bg-[#D4C5A0] mb-8" />
        <p className="font-dm text-[13px] sm:text-[14px] text-white/70 max-w-md leading-relaxed tracking-wide mb-10">
          Witness the art of hand-assembly and mechanical design captured in slow motion. Engineered for those who understand luxury.
        </p>

        <a
          href="/about"
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-sm font-dm text-[11px] tracking-[0.2em] uppercase text-white bg-transparent border border-white/30 hover:border-white hover:bg-white hover:text-[#003926] transition-all duration-500"
        >
          Explore Heritage
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
            <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
