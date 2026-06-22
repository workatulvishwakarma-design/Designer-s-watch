"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────
   PARTNER LOGOS MARQUEE — PROMPT 2.2
   Auto-scrolling partner logo strip. Uses text labels
   as placeholders until actual logos are provided.
   ───────────────────────────────────────────────────── */

const PARTNERS = [
  "Tissot",
  "Daniel Klein",
  "Mathey Tissot",
  "D1 Milano",
  "Christian Bernard",
  "Givenchy Paris",
  "Rotary",
  "Police",
  "Donear",
  "Siyaram",
];

export default function PartnerLogos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="w-full py-14 lg:py-16 bg-white relative overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-dm text-[10px] tracking-[0.35em] uppercase text-[#B8935A] mb-3"
        >
          TRUSTED PARTNERSHIPS
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cormorant text-[28px] sm:text-[34px] text-[#1A1918] leading-[1.1]"
        >
          Brands That Trust Nagpal Group<span className="text-[#B8935A]">.</span>
        </motion.h3>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        {/* Scrolling track */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex whitespace-nowrap"
          style={{
            animation: "marquee-scroll 30s linear infinite",
          }}
        >
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => (
            <div
              key={`${partner}-${i}`}
              className="inline-flex items-center justify-center mx-6 sm:mx-10 lg:mx-14 flex-shrink-0 group"
            >
              {/* Text label placeholder — swap with <img> when logos arrive */}
              <span
                className="font-cormorant text-[18px] sm:text-[22px] lg:text-[26px] tracking-wide transition-all duration-500 select-none"
                style={{
                  color: "#C8C2BA",
                  filter: "grayscale(100%)",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLSpanElement).style.color = "#1A1918";
                  (e.target as HTMLSpanElement).style.filter = "grayscale(0%)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLSpanElement).style.color = "#C8C2BA";
                  (e.target as HTMLSpanElement).style.filter = "grayscale(100%)";
                }}
              >
                {partner}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Inline keyframes for marquee */}
      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
}
