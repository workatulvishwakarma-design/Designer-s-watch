"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ─────────────────────────────────────────────────────
   7 PILLARS — DATA
   ───────────────────────────────────────────────────── */
type Pillar = {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  span: "normal" | "tall" | "wide";
};

const PILLARS: Pillar[] = [
  {
    index: "01",
    title: "Watch Manufacturing",
    subtitle: "Precision at Scale",
    description: "State-of-the-art manufacturing facilities producing timepieces with Swiss-grade precision and Indian craftsmanship heritage.",
    image: "/images/new-content/pillars/Nagpal_s Bombay/ng-bombay.jpg",
    span: "tall",
  },
  {
    index: "02",
    title: "Distribution Network",
    subtitle: "Global Reach",
    description: "An expansive distribution network spanning 15,000+ retail points across India and international markets.",
    image: "/images/new-content/pillars/Corporate B2B/2a.jpg",
    span: "normal",
  },
  {
    index: "03",
    title: "Component Supply",
    subtitle: "Vertical Integration",
    description: "End-to-end component manufacturing — from movements and dials to cases and straps — ensuring quality at every level.",
    image: "/images/new-content/pillars/OEM- ODM/WhatsApp Image 2026-04-04 at 4.14.22 PM (1).jpeg",
    span: "normal",
  },
  {
    index: "04",
    title: "Global Markets",
    subtitle: "International Presence",
    description: "Exporting to 25+ countries with tailored collections for diverse markets and cultural preferences.",
    image: "/images/new-img/pillars/8.jpg",
    span: "wide",
  },
  {
    index: "05",
    title: "Brand Development",
    subtitle: "Identity & Vision",
    description: "Nurturing two iconic brands — D'Signer and Escort — each with distinct identity, unified by four generations of legacy.",
    image: "/images/new-content/pillars/Exports/WhatsApp Image 2026-04-15 at 11.30.22 AM.jpeg",
    span: "normal",
  },
  {
    index: "06",
    title: "Quality Control",
    subtitle: "Zero Compromise",
    description: "Multi-stage quality assurance with 12-point inspection at every production phase, ensuring flawless timepieces.",
    image: "/images/new-content/pillars/Time Corridor/time corriddor/1A1A8499.JPG",
    span: "tall",
  },
  {
    index: "07",
    title: "Retail Excellence",
    subtitle: "Customer Experience",
    description: "Premium retail environments and exceptional service standards that transform watch buying into a luxury experience.",
    image: "/images/new-content/pillars/Batteries/batteries-banner.webp",
    span: "normal",
  },
];

/* ─────────────────────────────────────────────────────
   PILLAR CARD COMPONENT
   ───────────────────────────────────────────────────── */
function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  // Grid span classes
  const spanClass =
    pillar.span === "tall" ? "row-span-2" :
    pillar.span === "wide" ? "md:col-span-2" :
    "";

  const minH = pillar.span === "tall" ? "min-h-[500px]" : pillar.span === "wide" ? "min-h-[280px]" : "min-h-[320px]";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-[20px] cursor-pointer group ${spanClass} ${minH}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered
          ? "0 30px 70px rgba(0,0,0,0.25), 0 0 40px rgba(0,57,38,0.1)"
          : "0 8px 30px rgba(0,0,0,0.12)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden rounded-[20px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pillar.image}
          alt={pillar.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
          onError={(e) => { (e.target as HTMLImageElement).src = "/images/main-img1.png"; }}
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[20px] transition-all duration-700"
        style={{
          background: hovered
            ? "linear-gradient(180deg, rgba(0,20,12,0.25) 0%, rgba(0,10,6,0.40) 40%, rgba(0,10,6,0.85) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Emerald hover glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[20px] transition-opacity duration-700"
        style={{
          background: "radial-gradient(ellipse at bottom center, rgba(0,57,38,0.25), transparent 60%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Glassmorphism edge highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(184,147,90,0.5), transparent)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Index number */}
      <div className="absolute top-6 right-6 z-10">
        <span
          className="font-cormorant italic text-[48px] leading-none select-none transition-all duration-500"
          style={{
            color: hovered ? "rgba(184,147,90,0.25)" : "rgba(255,255,255,0.12)",
          }}
        >
          {pillar.index}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 z-10">
        {/* Subtitle badge */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-3 self-start transition-all duration-500"
          style={{
            background: hovered ? "rgba(184,147,90,0.2)" : "rgba(255,255,255,0.08)",
            border: `1px solid ${hovered ? "rgba(184,147,90,0.3)" : "rgba(255,255,255,0.1)"}`,
          }}
        >
          <span className="w-1 h-1 rounded-full bg-[#B8935A]" />
          <span className="font-dm text-[9px] tracking-[0.15em] uppercase text-white/70">{pillar.subtitle}</span>
        </div>

        {/* Title */}
        <h3
          className="font-cormorant text-[24px] sm:text-[28px] lg:text-[32px] text-white leading-[1.05] mb-2 transition-all duration-500"
          style={{
            textShadow: "0 2px 16px rgba(0,0,0,0.4)",
            letterSpacing: hovered ? "0.02em" : "0",
          }}
        >
          {pillar.title}<span className="text-[#B8935A]">.</span>
        </h3>

        {/* Description — revealed on hover */}
        <p
          className="font-dm text-[12px] sm:text-[13px] text-white/50 leading-relaxed max-w-sm transition-all duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
          }}
        >
          {pillar.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   MAIN SECTION EXPORT
   ───────────────────────────────────────────────────── */
export default function BrandPillars() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} className="w-full relative z-10 bg-[#FAF8F4] py-20 lg:py-28 overflow-hidden">
      {/* Ambient emerald glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.05] blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(0,57,38,0.4), transparent)" }} />

      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-cormorant italic text-[180px] lg:text-[260px] leading-none" style={{ color: "rgba(184,147,90,0.03)" }}>
          VII
        </span>
      </div>

      {/* Section Header */}
      <div className="text-center px-6 mb-14 lg:mb-20 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-dm text-[10px] tracking-[0.4em] uppercase text-[#B8935A] mb-4"
        >
          PILLARS — CORE DIVISIONS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cormorant text-[38px] sm:text-[48px] lg:text-[60px] text-[#1A1918] leading-[1.08] max-w-3xl mx-auto"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          Seven <span className="italic font-light">Pillars</span> of{" "}
          <span className="italic font-light text-[#1A1918]/70">Excellence</span>
          <span className="text-[#B8935A]">.</span>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-14 h-px mx-auto mt-7 origin-center"
          style={{ background: "linear-gradient(90deg, transparent, #B8935A, transparent)" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-dm text-[14px] sm:text-[15px] text-[#9C9690] mt-5 max-w-lg mx-auto leading-[1.8]"
        >
          Specialised business verticals spanning manufacturing, distribution,
          components, and global supply — four generations deep.
        </motion.p>
      </div>

      {/* Masonry/Grid Layout */}
      <div
        className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[280px] relative z-10"
      >
        {PILLARS.map((pillar, i) => (
          <PillarCard key={pillar.index} pillar={pillar} index={i} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-14 relative z-10"
      >
        <Link
          href="/nagpal-group"
          className="group inline-flex items-center gap-3 font-dm text-[11px] tracking-[0.2em] uppercase text-[#B8935A] hover:text-[#1A1918] transition-colors duration-300"
        >
          <span className="relative">
            Discover Our Heritage
            <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out bg-[#1A1918]" />
          </span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:translate-x-1 transition-transform duration-500">
            <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
