"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/**
 * AboutCTA — Premium heritage CTA section placed at the end of the homepage
 * Links users to /about and /nagpal-group with compelling brand storytelling
 */
export default function AboutCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#0B0B0A" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Heritage Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] max-w-[480px] mx-auto lg:mx-0 rounded-[24px] overflow-hidden"
          >
            {/* Image frame with inner border */}
            <div className="absolute inset-0 rounded-[24px] overflow-hidden">
              <Image
                src="/images/new-content/pillars/Time Corridor/time corriddor/1A1A8499.JPG"
                alt="Nagpal Group Heritage — 4 Generations of Excellence"
                fill
                className="object-cover"
                style={{ opacity: 0.7 }}
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,11,10,0.3) 0%, rgba(11,11,10,0.1) 40%, rgba(11,11,10,0.7) 100%)",
              }}
            />

            {/* Inner frame */}
            <div className="absolute inset-4 border border-white/[0.06] rounded-[18px] pointer-events-none" />

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-6 left-6 z-10 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10"
            >
              <span className="font-dm text-[9px] tracking-[0.2em] uppercase text-white/80 font-medium">
                Since 1948 · 4 Generations
              </span>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#B8935A]/50" />
              <span className="font-dm text-[10px] tracking-[0.35em] uppercase text-[#B8935A] font-medium">
                OUR HERITAGE
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-cormorant text-[36px] sm:text-[44px] lg:text-[52px] text-white leading-[1.08] mb-6">
              A Legacy Built on{" "}
              <span className="italic font-light text-white/60">
                Precision
              </span>
              <span className="text-[#B8935A]">.</span>
            </h2>

            {/* Subtitle line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-14 h-px mb-6 origin-left"
              style={{
                background:
                  "linear-gradient(90deg, #B8935A, transparent)",
              }}
            />

            {/* Description */}
            <p className="font-dm text-[15px] text-white/40 leading-[1.8] mb-8 max-w-[480px]">
              From a small watchmaking setup in Amritsar in 1948 to a
              pan-India horological powerhouse — Nagpal Group has been
              crafting time for over seven decades. Discover the journey
              behind D&apos;Signer and Escort, two iconic brands united by
              four generations of excellence.
            </p>

            {/* Stat mini-row */}
            <div className="flex items-center gap-8 mb-10">
              {[
                { value: "75+", label: "Years" },
                { value: "20+", label: "Brands" },
                { value: "500+", label: "Private Labels" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-start">
                  <span className="font-cormorant text-[28px] lg:text-[32px] text-[#B8935A] leading-none">
                    {stat.value}
                  </span>
                  <span className="font-dm text-[10px] text-white/30 tracking-[0.1em] uppercase mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#003926] px-8 py-3.5 sm:px-10 sm:py-4 font-dm text-[12px] font-medium tracking-[0.15em] uppercase text-white transition-all hover:bg-[#B8935A] hover:shadow-[0_8px_30px_rgba(184,147,90,0.3)]"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">
                  Discover Our Story
                </span>
                <span className="relative z-10 ml-2 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  →
                </span>
              </Link>
              <Link
                href="/nagpal-group"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-transparent px-8 py-3.5 sm:px-10 sm:py-4 font-dm text-[12px] font-medium tracking-[0.15em] uppercase text-white/60 transition-all hover:border-[#B8935A] hover:text-[#B8935A]"
              >
                The Nagpal Group
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[200px] pointer-events-none blur-[100px]"
        style={{
          background: "radial-gradient(ellipse, rgba(0,57,38,0.3), transparent)",
          opacity: 0.15,
        }}
      />
    </section>
  );
}
