"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const stages = [
  {
    left: {
      title: "Sapphire Glass",
      description: "Thick scratch-proof sapphire glass with double layer inside anti-reflective coating, for maximal depth and protection."
    },
    right: {
      title: "Indexes & Hands",
      description: "D'Signer employs a diamond cut technique for a crisp finish. The hands glow beautifully in the dark for clear visibility."
    }
  },
  {
    left: {
      title: "Dial",
      description: "Each dial is made of fine materials and features distinct, richly detailed sunray finishes for an elegant gleam."
    },
    right: {
      title: "Movement",
      description: "Powered by highly reliable movements, engineered with precision to keep the watch ticking perfectly for years."
    }
  },
  {
    left: {
      title: "Case & Caseback",
      description: "Crafted exclusively from surgical 316L stainless steel. The caseback is safely secured and features a sapphire exhibition back."
    },
    right: {
      title: "Italian Leather",
      description: "Sourced from the finest full-grain leather tanneries in Tuscany, Italy. Handmade with meticulous attention to detail."
    }
  }
];

const tabNames = [
  "Glass & Hands",
  "Dial & Movement",
  "Case & Leather"
];

export default function WatchDetails() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white relative py-16 lg:py-24 overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(184,147,90,0.04)_0%,transparent_70%)] pointer-events-none rounded-full" />

      <div className="max-w-[1400px] w-full mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center pt-4 mb-8 lg:mb-12">
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

        {/* Tab Buttons (Premium Segment Control) */}
        <div className="flex justify-center items-center gap-2 sm:gap-6 md:gap-8 mb-8 lg:mb-12 border-b border-gray-100 pb-2 w-full max-w-lg">
          {tabNames.map((name, index) => (
            <button
              key={name}
              onClick={() => setActiveIndex(index)}
              className="relative py-2 px-3 sm:px-4 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-dm transition-colors duration-300 focus:outline-none"
              style={{ color: activeIndex === index ? "#B8935A" : "#8A8987" }}
            >
              {name}
              {activeIndex === index && (
                <motion.div
                  layoutId="activeWatchDetailTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8935A]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* 3-Column Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-12 pb-4">
          
          {/* Left Column - Feature */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center items-center lg:items-end order-2 lg:order-1 min-h-[140px] lg:min-h-0 py-4 lg:py-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-${activeIndex}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
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

          {/* Center Column - Main Video */}
          <div className="w-full lg:w-1/3 flex justify-center items-center order-1 lg:order-2 relative shrink-0 py-2 lg:py-0">
            <div 
              className="relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[380px] aspect-[4/5] overflow-hidden"
            >
              <video
                src="/images/new-img/vid-1.mp4"
                autoPlay
                muted
                loop
                playsInline
                poster="/images/image-strap.png"
                className="absolute inset-0 w-full h-full object-contain mix-blend-multiply"
              />
            </div>
          </div>

          {/* Right Column - Feature */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center items-center lg:items-start order-3 min-h-[140px] lg:min-h-0 py-4 lg:py-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-${activeIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
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
    </section>
  );
}

