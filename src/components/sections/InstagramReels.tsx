"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Reel card data — curated editorial images ─── */
const REELS = [
  { id: 1, image: "/images/new-img/pillars/1.jpeg", label: "The Art of Assembly" },
  { id: 2, image: "/images/new-img/pillars/2.jpg", label: "Precision Engineering" },
  { id: 3, image: "/images/new-img/pillars/4.jpg", label: "Heritage Craftsmanship" },
  { id: 4, image: "/images/new-img/pillars/GW-Ads-BArtboard 2.jpg", label: "The D'Signer Atelier" },
  { id: 5, image: "/images/new-img/pillars/GW-Ads-BArtboard 3.jpg", label: "Dial Mastery" },
  { id: 6, image: "/images/new-img/pillars/GW-Ads-BArtboard 5.jpg", label: "Quality Control" },
  { id: 7, image: "/images/new-img/pillars/GW-Ads-BArtboard 6.jpg", label: "The Final Touch" },
  { id: 8, image: "/images/new-img/pillars/GW-Ads-BArtboard 8.jpg", label: "Movement Assembly" },
  { id: 9, image: "/images/new-img/pillars/GW-Ads-BArtboard 9.jpg", label: "Global Standards" },
  { id: 10, image: "/images/new-img/pillars/WhatsApp Image 2026-04-04 at 4.14.22 PM.jpeg", label: "Luxury Packaging" },
  { id: 11, image: "/images/new-img/pillars/WhatsApp Image 2026-04-04 at 4.14.23 PM.jpeg", label: "Strap Finishing" },
  { id: 12, image: "/images/new-img/pillars/WhatsApp Image 2026-04-04 at 4.15.22 PM.jpeg", label: "Crown Detailing" },
];

function ReelCard({ reel, index }: { reel: typeof REELS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="flex-shrink-0 relative group cursor-pointer"
      style={{ width: 220, height: 340 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card Container */}
      <div 
        className="relative w-full h-full rounded-[20px] overflow-hidden"
        style={{
          boxShadow: hovered
            ? "0 20px 50px rgba(0,0,0,0.25), 0 0 30px rgba(0,57,38,0.1)"
            : "0 8px 30px rgba(0,0,0,0.15)",
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        }}
      >
        {/* Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={reel.image}
          alt={reel.label}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Play icon pulse */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center pointer-events-none"
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
            <path d="M1 1L15 9L1 17V1Z" fill="white" fillOpacity="0.9" />
          </svg>
        </div>

        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p
            className="font-dm text-[11px] tracking-[0.1em] uppercase text-white/90 font-medium"
            style={{
              textShadow: "0 1px 8px rgba(0,0,0,0.5)",
            }}
          >
            {reel.label}
          </p>
        </div>

        {/* Instagram-style top UI */}
        <div className="absolute top-3 left-3 right-3 flex items-center gap-2 pointer-events-none">
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <span className="text-[8px] text-white font-bold">DW</span>
          </div>
          <span className="text-[9px] text-white/80 font-dm tracking-wider uppercase">designerworld</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function InstagramReels() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate reels for seamless infinite scroll
  const duplicatedReels = [...REELS, ...REELS];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: "#111110" }}
    >
      {/* Ambient green glow — top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none opacity-15 blur-[80px]"
        style={{ background: "radial-gradient(ellipse, rgba(0,57,38,0.6), transparent)" }}
      />

      {/* Section Header */}
      <div className="text-center mb-14 px-6 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-dm uppercase text-[10px] tracking-[0.4em] text-[#B8935A] mb-4"
        >
          THE CRAFT BEHIND THE COLLECTION
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cormorant text-[36px] sm:text-[44px] lg:text-[56px] text-white leading-[1.1]"
        >
          From Our Hands{" "}
          <span className="italic font-light text-white/70">To Yours</span>
          <span className="text-[#003926]">.</span>
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-14 h-px mx-auto mt-6 origin-center"
          style={{ background: "linear-gradient(90deg, transparent, #003926, #B8935A, #003926, transparent)" }}
        />
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-dm text-[14px] text-white/50 mt-5 max-w-lg mx-auto leading-relaxed"
        >
          A glimpse into the workshops, hands, and heritage behind every timepiece we create.
        </motion.p>
      </div>

      {/* Marquee Container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #111110 0%, transparent 100%)" }}
        />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(270deg, #111110 0%, transparent 100%)" }}
        />

        {/* Scrolling track */}
        <div
          className="flex gap-5 px-6 py-4"
          style={{
            animation: "reelMarquee 50s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
            width: "max-content",
          }}
        >
          {duplicatedReels.map((reel, i) => (
            <ReelCard key={`${reel.id}-${i}`} reel={reel} index={i % REELS.length} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center mt-12 relative z-10"
      >
        <a
          href="https://instagram.com/designerworldofficial"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 font-dm text-[11px] tracking-[0.2em] uppercase text-[#B8935A] hover:text-white transition-colors duration-300"
        >
          <span className="relative">
            Follow @designerworldofficial
            <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out bg-white" />
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </a>
      </motion.div>

      {/* Ambient green glow — bottom */}
      <div
        className="absolute bottom-0 left-1/3 w-[400px] h-[150px] pointer-events-none opacity-10 blur-[80px]"
        style={{ background: "radial-gradient(ellipse, rgba(0,57,38,0.6), transparent)" }}
      />
    </section>
  );
}
