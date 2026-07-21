"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#003926" }}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #D4C5A0 0.5px, transparent 0)", backgroundSize: "40px 40px" }}
      />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.05] blur-[150px]"
        style={{ background: "radial-gradient(circle, #D4C5A0, transparent)" }}
      />

      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 py-24 md:py-32 text-center relative z-10">
        {/* Diamond ornament */}
        <div className="flex justify-center mb-5">
          <div className="w-2 h-2 rotate-45 bg-[#D4C5A0]/50" />
        </div>

        <span className="font-dm text-[10px] tracking-[0.3em] text-[#D4C5A0] font-bold block mb-4 uppercase">
          OUR STORY
        </span>

        <h2 className="font-cormorant text-[36px] sm:text-[52px] lg:text-[64px] text-white font-light leading-[1.1] mb-4">
          Four Generations of<br />
          <span className="italic text-[#D4C5A0]">Horological Excellence.</span>
        </h2>

        <div className="w-16 h-[1px] bg-[#D4C5A0] mx-auto mt-6 mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-left max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-dm text-[14px] text-white/70 leading-[1.9]"
          >
            Rooted in a legacy that dates back to the mid-1940s, our watch enterprise began as a small repair studio dedicated to fine Swiss mechanisms. Over the next eighty years, that passion for precision evolved into an integrated manufacturing and design house spanning four generations of the Nagpal family.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-dm text-[14px] text-white/70 leading-[1.9]"
          >
            Today, we combine advanced digital tooling with the timeless art of hand-assembly. We continue to design, construct, and calibrate watches for collectors and elite private labels globally, ensuring that every dial bearing our marks represents a master class in horology.
          </motion.p>
        </div>

        {/* CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-3 font-dm text-[11px] tracking-[0.2em] uppercase text-[#D4C5A0] border-b border-[#D4C5A0]/40 pb-1 hover:border-[#D4C5A0] hover:text-white transition-all duration-500"
          >
            Read Our Full Heritage
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
