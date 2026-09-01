"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Pillar4BrandsTrust() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 lg:py-24 bg-[#FAFAF8] relative overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-montserrat text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-[#B8935A] font-bold mb-3"
        >
          TRUSTED PARTNERSHIPS
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-montserrat text-[26px] sm:text-[32px] md:text-[38px] uppercase tracking-[0.06em] text-[#1A1918] leading-[1.2] font-bold"
        >
          Brands That Trust Nagpal Group<span className="text-[#B8935A]">.</span>
        </motion.h3>
      </div>

      {/* Image Grid Container */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full overflow-hidden rounded-2xl border border-[#EDE8DF] bg-white p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:border-[#D4C5A0]/40 group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/new-img/pillars/frame-1.png"
            alt="Brands That Trust Nagpal Group"
            className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]"
          />
        </motion.div>
      </div>
    </section>
  );
}
