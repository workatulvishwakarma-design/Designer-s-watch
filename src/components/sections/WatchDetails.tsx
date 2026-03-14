"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const stages = [
  {
    left: {
      title: "Sapphire Glass",
      description: "Thick scratch-proof sapphire glass with double layer inside anti-reflective coating, for maximal depth and protection."
    },
    right: {
      title: "Indexes & Hands",
      description: "We use a diamond cut technique for a crisp finish. The hands glow beautifully in the dark for clear visibility."
    }
  },
  {
    left: {
      title: "Dial",
      description: "Our dials are made of fine materials and feature distinct, richly detailed sunray finishes for an elegant gleam."
    },
    right: {
      title: "Movement",
      description: "Powered by highly reliable movements, engineered with precision to keep the watch ticking perfectly for years."
    }
  },
  {
    left: {
      title: "Case & Caseback",
      description: "We solely use surgical 316L stainless steel. The caseback is safely secured and features a sapphire exhibition back."
    },
    right: {
      title: "Italian Leather",
      description: "We source the finest full-grain leather from Tuscany, Italy. Handmade with meticulous attention to detail."
    }
  }
];

export default function WatchDetails() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      if (activeIndex !== 0) setActiveIndex(0);
    } else if (latest < 0.66) {
      if (activeIndex !== 1) setActiveIndex(1);
    } else {
      if (activeIndex !== 2) setActiveIndex(2);
    }
  });

  return (
    <section ref={containerRef} className="bg-white relative h-[300vh]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-[100dvh] overflow-hidden flex flex-col justify-center py-6 lg:py-0">
        {/* Background soft glow or texture (optional, subtle radial gradient) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(184,147,90,0.04)_0%,transparent_70%)] pointer-events-none rounded-full" />

        <div className="max-w-[1400px] w-full mx-auto px-6 relative z-10 flex flex-col h-full">
          {/* Section Heading */}
          <div className="text-center shrink-0 pt-4 lg:pt-16 mb-2 lg:mb-8">
            <p
              className="font-dm uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#B8935A" }}
            >
              THE ANATOMY
            </p>
            <h2
              className="font-cormorant text-[#1A1918] mt-2 lg:mt-4 tracking-[0.15em] uppercase"
              style={{ fontSize: "clamp(26px, 4vw, 44px)" }}
            >
              DETAILS
            </h2>
            <div 
              className="w-16 h-[1px] bg-[#B8935A] mx-auto mt-4 lg:mt-6" 
            />
          </div>

          {/* 3-Column Layout inside Sticky Container */}
          <div className="flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full h-full pb-4 lg:pb-12 min-h-0">
            
            {/* Left Column - Fixed Area for Features */}
            <div className="w-full lg:w-1/3 flex flex-col justify-center items-center lg:items-end order-2 lg:order-1 h-[150px] lg:h-full shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`left-${activeIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center lg:items-end text-center lg:text-right w-full"
                >
                  <h4 className="font-dm uppercase text-[12px] sm:text-[13px] tracking-[0.2em] text-[#1A1918] font-medium mb-2 lg:mb-3">
                    {stages[activeIndex].left.title}
                  </h4>
                  <div className="w-12 h-[1px] bg-[#B8935A] mb-3 lg:mb-4 lg:ml-auto lg:mr-0 mx-auto" />
                  <p className="font-cormorant text-[16px] sm:text-[18px] lg:text-[19px] leading-[1.5] lg:leading-[1.6] text-[#4A4947] max-w-[280px] sm:max-w-[320px]">
                    {stages[activeIndex].left.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Center Column - Main Image */}
            <div className="w-full lg:w-1/3 flex justify-center items-center order-1 lg:order-2 relative shrink-0 z-10 flex-[0.8] lg:flex-1 py-2 lg:py-0 min-h-0">
              <div 
                className="relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[420px] aspect-[4/5] mix-blend-multiply"
              >
                <Image
                  src="/images/image-strap.png"
                  alt="Watch Exploded View"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right Column - Fixed Area for Features */}
            <div className="w-full lg:w-1/3 flex flex-col justify-center items-center lg:items-start order-3 h-[150px] lg:h-full shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`right-${activeIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left w-full"
                >
                  <h4 className="font-dm uppercase text-[12px] sm:text-[13px] tracking-[0.2em] text-[#1A1918] font-medium mb-2 lg:mb-3">
                    {stages[activeIndex].right.title}
                  </h4>
                  <div className="w-12 h-[1px] bg-[#B8935A] mb-3 lg:mb-4 lg:mr-auto lg:ml-0 mx-auto" />
                  <p className="font-cormorant text-[16px] sm:text-[18px] lg:text-[19px] leading-[1.5] lg:leading-[1.6] text-[#4A4947] max-w-[280px] sm:max-w-[320px]">
                    {stages[activeIndex].right.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

