"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

const baseImages = [
  "/images/threeimg1-nobg.png",
  "/images/threeimg2-nobg.png",
  "/images/threeimg3-nobg.png",
];
const showcaseImages = [...baseImages, ...baseImages, ...baseImages, ...baseImages]; 

export default function NagpalShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [gap, setGap] = useState(260); 
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      const tablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);
      
      // Tighter gaps to create the curated overlap effect requested
      const currentGap = mobile ? 120 : (tablet ? 180 : 260);
      setGap(currentGap);
      setTrackWidth(currentGap * (showcaseImages.length - 1));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70, 
    damping: 25,
    mass: 1
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const newIdx = Math.round(latest * (showcaseImages.length - 1));
    if (newIdx !== activeIndex) {
      setActiveIndex(newIdx);
    }
  });

  const xOffset = useTransform(smoothProgress, (latest) => latest * -trackWidth);

  return (
    <section className="relative w-full bg-[#FAF8F4] flex flex-col items-center">
      
      {/* Soft, rich radial gradient for central focus - anchored to background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-[radial-gradient(circle,rgba(212,170,114,0.08)_0%,transparent_60%)] pointer-events-none rounded-full opacity-80 z-0" />

      {/* --- ZONE 1: STATIC HEADING BLOCK --- */}
      <div className="relative z-30 w-full shrink-0 text-center pt-[100px] md:pt-[120px] px-4 pb-[20px] md:pb-[40px] bg-transparent">
        <p className="font-dm uppercase text-[10px] sm:text-[11px] tracking-[0.3em] text-[#B8935A] mb-2 md:mb-3 font-medium">
          MASTERY IN MOTION
        </p>
        <h2 className="font-cormorant text-[#1A1918] text-[clamp(32px,4vw,56px)] leading-none mb-4 md:mb-6">
          A Legacy of Precision
        </h2>
        <div className="w-12 h-[1px] bg-[#B8935A]/50 mx-auto opacity-70" />
      </div>

      {/* --- ZONE 2: DEDICATED STICKY IMAGE SHOWCASE LANE --- */}
      {/* The 200vh height drives the ~2 scrolls animation span gracefully */}
      <div ref={containerRef} className="relative z-10 w-full h-[200vh]">
        
        {/* Strictly confined sticky moving lane */}
        <div className="sticky top-[15vh] md:top-[20vh] w-full h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden max-w-[100vw]">
          
          <motion.div 
            style={{ x: xOffset, willChange: "transform" }}
            className="absolute left-1/2 flex items-center w-full"
          >
            {showcaseImages.map((src, idx) => {
              const offset = idx - activeIndex;
              const isActive = offset === 0;

              // Ultra premium scale & opacity mapping 
              const scale = isActive ? 1.25 : Math.max(0.75, 1 - Math.abs(offset) * 0.15);
              const zIndex = 20 - Math.abs(offset);
              // Side watches remain clear and visible 
              const opacity = isActive ? 1 : Math.max(0.45, 0.9 - Math.abs(offset) * 0.2);
              // Lighter, elegant depth of field blurring
              const blurAmount = isActive ? 0 : Math.min(Math.abs(offset) * 2.5, 5);
              
              const leftPos = idx * gap;
              
              return (
                <motion.div
                  key={`${idx}`}
                  animate={{ opacity, scale, zIndex, filter: `blur(${blurAmount}px)` }}
                  // Extremely smooth transition interpolations without jitter
                  transition={{ type: "spring", stiffness: 70, damping: 25, mass: 1 }}
                  className="absolute top-1/2 -translate-y-1/2 w-[160px] md:w-[220px] lg:w-[280px] aspect-[4/5] flex justify-center items-center select-none"
                  style={{ 
                    left: leftPos, 
                    x: "-50%",
                    willChange: "transform, opacity, filter"
                  }}
                >
                   {isActive && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] bg-[rgba(212,170,114,0.18)] rounded-full blur-[35px] pointer-events-none transition-opacity duration-1000" />
                   )}
                   
                   <motion.div
                     animate={{ y: [-4, 4, -4] }}
                     transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: (idx % 3) * 1.5 }}
                     className="relative w-full h-full group drop-shadow-2xl"
                   >
                     <Image 
                       src={src} 
                       alt={`Watch showcase model ${idx + 1}`}
                       fill
                       className="object-contain pointer-events-none"
                       quality={90}
                       priority={idx < 4}
                     />
                   </motion.div>

                   {/* Luxurious dynamic stage reflection / shadow */}
                   <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-[12px] bg-black/25 blur-[10px] rounded-[100%] pointer-events-none transition-all duration-700 ease-out ${isActive ? 'scale-125 opacity-100' : 'scale-75 opacity-20'}`} />
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
      
      {/* --- ZONE 3: STATIC PARAGRAPH BLOCK --- */}
      {/* Sits purely under the scroll mechanics and will never overlap the contained slider lane */}
      <div className="relative z-30 shrink-0 text-center w-full max-w-[700px] mx-auto px-4 pb-[80px] md:pb-[120px] pt-[40px] md:pt-[60px] bg-transparent mt-10">
        <p className="font-dm text-[#1A1918]/70 text-[11px] sm:text-[13px] leading-[1.8] sm:leading-[1.9] tracking-widest font-light">
          Every timepiece in our collection reflects a balance of craftsmanship, elegance, and modern precision.<br className="hidden md:block"/>
          Designed for individuals who value both style and substance, these watches are made to stand out effortlessly.<br className="hidden md:block"/>
          From refined everyday classics to bold statement pieces, each design carries its own identity.<br className="hidden md:block"/>
          Premium materials, thoughtful detailing, and timeless aesthetics define the essence of our collection.<br className="hidden md:block"/>
          This is not just about telling time — it is about wearing confidence, legacy, and design on your wrist.
        </p>
      </div>

    </section>
  );
}
