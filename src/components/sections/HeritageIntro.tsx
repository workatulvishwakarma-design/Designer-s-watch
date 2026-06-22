"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────
   HERITAGE INTRO — PROMPT 3.1
   "75+ Years of Precision" animated counter section
   placed before WatchDetails to introduce the brand's
   legacy before diving into product specs.
   ───────────────────────────────────────────────────── */

function useCountUp(target: number, duration: number, shouldStart: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease-out quad
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, shouldStart]);
  return count;
}

export default function HeritageIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const years = useCountUp(75, 2.5, isInView);

  return (
    <section
      ref={ref}
      className="relative w-full py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#001F14" }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(184,147,90,0.08)_0%,transparent_60%)] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-dm text-[10px] tracking-[0.4em] uppercase text-[#B8935A] mb-6"
        >
          NAGPAL GROUP · SINCE 1940s
        </motion.p>

        {/* Animated Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-baseline justify-center gap-2 mb-4"
        >
          <span
            className="font-cormorant text-[80px] sm:text-[100px] lg:text-[140px] leading-none font-light tabular-nums"
            style={{
              background:
                "linear-gradient(180deg, #B8935A 0%, #E8DFD0 40%, #B8935A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {years}+
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-cormorant text-[28px] sm:text-[36px] lg:text-[44px] text-white/90 leading-[1.2] mb-5"
        >
          Years of <span className="italic text-[#E8DFD0]">Precision</span> &{" "}
          <span className="italic text-[#B8935A]">Trust</span>
        </motion.h2>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-[50px] h-[1px] mx-auto mb-6 origin-center bg-[#B8935A]/50"
        />

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-dm text-[14px] sm:text-[16px] text-white/40 leading-[1.8] max-w-[520px] mx-auto"
        >
          From a watch parts shop in Amritsar to a vertically integrated watch
          ecosystem — four generations of relentless craftsmanship.
        </motion.p>

        {/* Mini stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex items-center justify-center gap-8 sm:gap-14 mt-10"
        >
          {[
            { value: "4", label: "Generations" },
            { value: "20+", label: "Brands" },
            { value: "500+", label: "Private Labels" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-cormorant text-[24px] sm:text-[30px] text-[#B8935A] font-light">
                {stat.value}
              </span>
              <span className="font-dm text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/30">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
