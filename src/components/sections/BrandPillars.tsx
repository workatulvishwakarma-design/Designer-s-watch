"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ─────────────────────────────────────────────────────
   COMPACT PILLAR TEASER — PROMPT 1.6
   Replaces the full 7-pillar grid to reduce homepage
   duplication with /nagpal-group. Shows 4 key pillars
   as styled badges + a CTA to the full page.
   ───────────────────────────────────────────────────── */

const KEY_PILLARS = [
  { icon: "⚙️", label: "Manufacturing", desc: "Swiss-grade precision at scale" },
  { icon: "🌍", label: "Distribution", desc: "15,000+ retail points pan-India" },
  { icon: "🔧", label: "Components", desc: "Vertically integrated supply" },
  { icon: "💎", label: "Brand Dev", desc: "D'Signer & Escort — 2 iconic brands" },
];

export default function BrandPillars() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="w-full relative z-10 bg-[#FAF8F4] py-16 lg:py-20 overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none opacity-[0.04] blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(0,57,38,0.4), transparent)" }}
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-dm text-[10px] tracking-[0.35em] uppercase text-[#B8935A] mb-3"
          >
            PILLARS OF EXCELLENCE
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-cormorant text-[32px] sm:text-[40px] lg:text-[48px] text-[#1A1918] leading-[1.08]"
          >
            The Engine Behind{" "}
            <span className="italic font-light text-[#1A1918]/70">the Industry</span>
            <span className="text-[#B8935A]">.</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-12 h-px mx-auto mt-5 origin-center"
            style={{ background: "linear-gradient(90deg, transparent, #B8935A, transparent)" }}
          />
        </div>

        {/* 4-Pillar Badge Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
          {KEY_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="group flex flex-col items-center text-center p-6 lg:p-8 rounded-2xl border border-[#EDE8DF] bg-white/50 backdrop-blur-sm transition-all duration-500 hover:border-[#B8935A]/30 hover:shadow-[0_12px_30px_rgba(184,147,90,0.08)] hover:-translate-y-1"
            >
              <span className="text-2xl mb-3 transition-transform duration-500 group-hover:scale-110">
                {pillar.icon}
              </span>
              <h3 className="font-dm text-[13px] font-medium tracking-[0.1em] uppercase text-[#1A1918] mb-2 transition-colors duration-300 group-hover:text-[#003926]">
                {pillar.label}
              </h3>
              <div className="w-6 h-[1px] bg-[#B8935A]/40 mb-2 transition-all duration-500 group-hover:w-10 group-hover:bg-[#B8935A]" />
              <p className="font-dm text-[11px] text-[#9C9690] leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <Link
            href="/nagpal-group"
            className="group inline-flex items-center gap-3 font-dm text-[11px] tracking-[0.2em] uppercase text-[#B8935A] hover:text-[#1A1918] transition-colors duration-300"
          >
            <span className="relative">
              Discover All 7 Pillars
              <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out bg-[#1A1918]" />
            </span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:translate-x-1 transition-transform duration-500">
              <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
