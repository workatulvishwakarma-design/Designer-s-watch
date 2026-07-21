"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const headings = [
  "Earning Trust, One Watch at a Time",
  "Four Generations of Expertise",
  "From Heritage to Innovation",
  "Crafting Excellence Since 1948"
];

export default function AboutHero() {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % headings.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const headingTransition = shouldReduceMotion 
    ? { duration: 0.2 } 
    : { duration: 0.6, ease: "easeOut" as const };

  const headingInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 };
  const headingAnimate = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 };
  const headingExit = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 };

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-[95vh] flex items-center pt-28 pb-20 overflow-hidden bg-gradient-to-br from-[#003926] via-[#002e1f] to-[#011a12]">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <div className="w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] bg-[radial-gradient(circle,rgba(184,147,90,0.03)_0%,transparent_70%)] rounded-full" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-10 md:px-16 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT CONTENT AREA */}
          <div className="flex flex-col items-start text-left max-w-xl py-4 lg:py-8">
            <span className="font-dm text-[12px] font-medium uppercase tracking-[2px] text-[#B8935A] mb-5 block">
              ESTABLISHED 1948 • FOUR GENERATIONS
            </span>

            {/* Carousel heading container with fixed min-height to prevent layout shifts */}
            <div className="min-h-[85px] sm:min-h-[110px] md:min-h-[130px] flex items-center justify-start w-full">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={index}
                  initial={headingInitial}
                  animate={headingAnimate}
                  exit={headingExit}
                  transition={headingTransition}
                  className="font-cormorant text-[32px] md:text-[52px] font-medium text-[#FAF8F4] leading-[1.2] max-w-[450px]"
                >
                  {headings[index]}
                </motion.h1>
              </AnimatePresence>
            </div>

            <p className="font-dm text-[16px] leading-[1.6] text-[#FAF8F4]/70 max-w-[420px] mt-6 mb-8">
              From a modest horology setup in Amritsar to a multi-brand global watch enterprise. Four generations of uncompromised expertise, integrity, and innovation in every timepiece.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-6 w-full mb-8">
              <motion.a
                href="#story"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="inline-block bg-[#B8935A] hover:bg-[#A37E49] text-white px-8 py-3.5 rounded-[4px] font-dm text-[14px] font-bold tracking-wider shadow-lg hover:shadow-[0_8px_25px_rgba(184,147,90,0.3)] transition-all duration-300 cursor-pointer text-center"
                aria-label="Discover Our Story"
              >
                Discover Our Story
              </motion.a>
            </div>

            {/* Premium Stat Badges */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-[#FAF8F4]/10 w-full">
              <span className="px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-dm text-[#FAF8F4]/70 border border-[#FAF8F4]/10 backdrop-blur-sm bg-white/5">
                20+ International Brands
              </span>
              <span className="px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-dm text-[#FAF8F4]/70 border border-[#FAF8F4]/10 backdrop-blur-sm bg-white/5">
                500+ Private Labels
              </span>
              <span className="px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-dm text-[#FAF8F4]/70 border border-[#FAF8F4]/10 backdrop-blur-sm bg-white/5">
                100+ MBOs
              </span>
            </div>
          </div>

          {/* RIGHT IMAGE AREA */}
          <div className="w-full flex justify-center lg:justify-end">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-[15px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] max-w-[600px] lg:ml-auto"
            >
              <Image
                src="/img/banner1.jpeg"
                alt="Heritage Emerald Collection"
                fill
                className="object-cover"
                sizes="(max-w-1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#FAF8F4]/40 to-transparent"
        />
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#FAF8F4]/40">Scroll</span>
      </motion.div>
    </section>
  );
}
