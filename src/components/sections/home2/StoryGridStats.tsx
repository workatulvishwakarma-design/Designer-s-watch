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
  const teamImages = [
    { src: "/images/new-content/home2-story-chrono.png", alt: "Nagpal Group Team Legacy 1" },
    { src: "/images/new-content/home2-story-dress.png", alt: "Nagpal Group Team Legacy 2" },
    { src: "/images/new-content/home2-showcase.png", alt: "Nagpal Group Team Legacy 3" },
  ];

  return (
    <section className="bg-[#FAF8F4] py-10 md:py-14 overflow-hidden relative border-t border-[#003926]/5">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
        
        {/* Section Header - Miraggio Spec: Montserrat H2 40px/26px */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-montserrat text-[26px] md:text-[40px] font-medium text-[#1A1918] tracking-[-0.01em] uppercase leading-[1.2]"
          >
            OUR HERITAGE
          </motion.h2>
        </div>

        {/* Clean Team & Legacy Image Gallery Grid (No Heavy Paragraph Text) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
          {teamImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-200 shadow-md group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Stats Counter Row */}
      <div className="bg-[#F5F1EB] py-14 md:py-16 border-t border-b border-[#E0D8CE] mt-20 relative z-10">
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
