"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

function CountUpStat({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds duration
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Smooth easeOutCubic curve
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutProgress * target);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, target]);

  return (
    <span
      ref={ref}
      className="font-cormorant text-[48px] md:text-[56px] text-[#003926] font-semibold leading-none shrink-0 tabular-nums"
    >
      {count}
      {suffix}
    </span>
  );
}

export default function StoryGridStats() {
  const images = {
    hero: "/images/about us journey/1976 - Nagpal Bombay/IMG_0216.jpeg",
    topRight: "/images/about us journey/1995 — Style for All/IMG_7789.jpeg",
    bottomRight: "/images/about us journey/2025 - Time Corridor/1A1A8511.JPG",
  };

  return (
    <section className="bg-[#FAF8F4] py-16 md:py-24 overflow-hidden relative border-t border-[#003926]/5 select-none">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        
        {/* Section Header - Perfectly Centered */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          {/* Main Title: OUR STORY */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-montserrat text-[32px] sm:text-[44px] md:text-[52px] font-extrabold text-[#1A1918] tracking-[0.14em] uppercase leading-none mb-3"
          >
            OUR STORY
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-montserrat text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.25em] text-[#B8935A] uppercase font-bold mb-6"
          >
            CRAFTING TIMEPIECES THAT BALANCE PRECISION, PURPOSE, AND INDIVIDUALITY.
          </motion.p>

          {/* 4-5 Lines Paragraph Content from About Us Page */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-montserrat text-[13px] sm:text-[14px] md:text-[15px] text-[#5C5750] leading-[1.85] font-normal max-w-2xl mx-auto"
          >
            Rooted in a legacy of precision, we translate horological vision into a distinct design language—layered with brushed metals, refined dial textures, and thoughtfully curated components. From sketch to final calibration, every detail is carefully considered to create watches that feel elevated, reliable, and uniquely personal, with a sense of effortless harmony.
          </motion.p>
        </div>

        {/* Asymmetric Grid Layout - Dead Center Aligned */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 w-full items-stretch">
          
          {/* Left Main Hero Image (Col-Span 7: 1976 Nagpal Bombay) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 relative min-h-[380px] sm:min-h-[480px] md:min-h-[540px] overflow-hidden rounded-xs shadow-lg group bg-[#EAE6DE]"
          >
            <Image
              src={images.hero}
              alt="Nagpal Bombay Establishment 1976"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
              <span className="font-cormorant italic text-[22px] sm:text-[26px] text-white font-medium drop-shadow-md">
                1976 — Nagpal Bombay Foundation
              </span>
            </div>
          </motion.div>

          {/* Right Stacked Column (Col-Span 5) */}
          <div className="md:col-span-5 flex flex-col gap-6 md:gap-8 justify-between">
            
            {/* Top Stacked Card: 1995 Style For All Real Historical Journey Photo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative flex-1 min-h-[220px] sm:min-h-[250px] overflow-hidden rounded-xs shadow-lg group bg-[#EAE6DE]"
            >
              <Image
                src={images.topRight}
                alt="1995 Style For All Historical Journey"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 z-20 pointer-events-none">
                <span className="font-cormorant italic text-[20px] sm:text-[22px] text-white font-medium drop-shadow-md">
                  1995 — Style For All
                </span>
              </div>
            </motion.div>

            {/* Bottom Stacked Card: 2025 Time Corridor */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex-1 min-h-[220px] sm:min-h-[250px] overflow-hidden rounded-xs shadow-lg group bg-[#EAE6DE]"
            >
              <Image
                src={images.bottomRight}
                alt="2025 Time Corridor Vision"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 z-20 pointer-events-none">
                <span className="font-cormorant italic text-[20px] sm:text-[22px] text-white font-medium drop-shadow-md">
                  2025 — Time Corridor Vision
                </span>
              </div>
            </motion.div>

          </div>

        </div>

      </div>

      {/* Animated Stats Counter Row */}
      <div className="bg-[#F5F1EB] py-12 md:py-16 border-t border-b border-[#E0D8CE] mt-16 md:mt-24 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 items-center text-center lg:text-left">
            {[
              { target: 4, suffix: "+", label: "Generations of Expertise" },
              { target: 20, suffix: "+", label: "International Brands" },
              { target: 500, suffix: "+", label: "Private Labels Manufactured" },
              { target: 100, suffix: "+", label: "Multi-Brand Outlets" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                className="flex flex-col lg:flex-row items-center lg:items-start gap-4"
              >
                <CountUpStat target={stat.target} suffix={stat.suffix} />
                <div className="w-[1px] h-10 bg-[#E0D8CE] hidden lg:block self-center shrink-0" />
                <span className="font-montserrat font-semibold text-[9px] text-[#9C9690] uppercase tracking-[0.2em] leading-normal mt-1 max-w-[150px] text-center lg:text-left">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
