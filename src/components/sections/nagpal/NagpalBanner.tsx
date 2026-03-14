"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const carouselImages = Array.from({ length: 10 }).map((_, i) => `/images/circle-${i + 1}.png`);

export default function NagpalBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered.current) {
        setActiveIndex((prev) => (prev + 1) % carouselImages.length);
      }
    }, 2000); // auto scroll every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Handler for manual click selection
  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="relative w-full bg-[#FAF8F4] overflow-hidden pt-24 lg:pt-32 pb-16 lg:pb-24">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(212,170,114,0.05)_0%,transparent_70%)] pointer-events-none rounded-full -translate-y-1/2" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col h-full">
        
        {/* --- SPLIT BANNER HERO --- */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mb-20 lg:mb-32">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
          >
            <p className="font-dm uppercase text-[10px] sm:text-[11px] tracking-[0.3em] text-[#B8935A] mb-4">
              DESIGNER WORLD / NAGPAL GROUP
            </p>
            
            <h1 className="font-cormorant text-[#1A1918] text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-tight mb-6">
              The Engine<br />
              <span className="italic font-light">Behind the Industry</span>
            </h1>
            
            <div className="w-16 h-[1px] bg-[#B8935A]/50 mb-6" />
            
            <p className="font-dm font-light text-[15px] lg:text-[17px] leading-[1.8] text-[#6B6560] max-w-[480px] mb-10">
              An integrated watch enterprise operating across manufacturing, distribution, components, and brand development for over four decades. Experience premium horological craftsmanship.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="#collection" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#0D3329] px-8 py-3.5 sm:px-10 sm:py-4 font-dm text-[12px] sm:text-[13px] font-medium tracking-widest text-white transition-all hover:bg-[#B8935A] hover:shadow-[0_8px_30px_rgba(184,147,90,0.3)] min-w-[200px]">
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">EXPLORE BRANDS</span>
                <span className="relative z-10 ml-2 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
              </a>
              <a href="#partner" className="inline-flex items-center justify-center rounded-full border border-[#DCD3C6] bg-transparent px-8 py-3.5 sm:px-10 sm:py-4 font-dm text-[12px] sm:text-[13px] font-medium tracking-widest text-[#1A1918] transition-all hover:border-[#B8935A] hover:text-[#B8935A] min-w-[200px]">
                PARTNER WITH US
              </a>
            </div>
          </motion.div>

          {/* Right Side: Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-full lg:w-[50%] flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-full max-w-[500px] lg:max-w-[650px] aspect-[4/3] lg:aspect-square flex items-center justify-center mix-blend-multiply drop-shadow-2xl">
              <Image 
                src="/images/nagpalbanner.png" 
                alt="Nagpal Group Hero Watch" 
                fill 
                className="object-contain" // ensure it scales cleanly
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* --- CIRCULAR CAROUSEL --- */}
        <div className="w-full flex flex-col items-center">
          <p className="font-dm uppercase text-[10px] tracking-[0.2em] text-[#B8935A]/80 mb-8 border-b border-[#B8935A]/20 pb-2">
            Signature Design Variations
          </p>
          
          <div 
            className="relative w-full max-w-[1200px] overflow-hidden py-8"
            onMouseEnter={() => (isHovered.current = true)}
            onMouseLeave={() => (isHovered.current = false)}
            onTouchStart={() => (isHovered.current = true)}
            onTouchEnd={() => (isHovered.current = false)}
          >
            {/* Carousel Container */}
            <div 
              ref={containerRef}
              className="flex items-center justify-center min-h-[160px] md:min-h-[200px]"
            >
              <div className="flex items-center justify-center relative w-full h-[180px] md:h-[240px]">
                <AnimatePresence initial={false}>
                  {carouselImages.map((src, idx) => {
                    // Calculate visual offset from active item
                    let offset = idx - activeIndex;
                    // Handle wrap-around loop mathematically for infinite feel
                    if (offset > carouselImages.length / 2) offset -= carouselImages.length;
                    if (offset < -carouselImages.length / 2) offset += carouselImages.length;
                    
                    // Display properties based on offset distance
                    const isActive = offset === 0;
                    const isVisible = Math.abs(offset) <= 3; // Show up to 3 on each side
                    
                    if (!isVisible) return null;

                    // Calculate translation and scaling
                    const scale = isActive ? 1.25 : Math.max(0.6, 1 - Math.abs(offset) * 0.15);
                    const zIndex = 50 - Math.abs(offset);
                    const opacity = isActive ? 1 : Math.max(0.3, 1 - Math.abs(offset) * 0.25);
                    
                    // Horizontal positioning base on offset
                    const translateX = offset * 110; // Mobile spacing default
                    const translateXMD = offset * 140; // Desktop spacing
                    
                    return (
                      <motion.div
                        key={`${src}-${idx}`}
                        layout
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ 
                          opacity, 
                          scale,
                          x: typeof window !== 'undefined' && window.innerWidth >= 768 ? translateXMD : translateX,
                          zIndex
                        }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                          mass: 1 
                        }}
                        className={`absolute top-1/2 -mt-[60px] md:-mt-[80px] w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full flex items-center justify-center cursor-pointer transition-shadow duration-500 bg-white
                          ${isActive ? "shadow-[0_12px_40px_rgba(184,147,90,0.2)] border border-[#B8935A]" : "shadow-sm border border-[#EDE8DF]"}`}
                        onClick={() => handleItemClick(idx)}
                      >
                         <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden mix-blend-multiply">
                           <Image 
                             src={src} 
                             alt={`Carousel Watch ${idx + 1}`}
                             fill
                             className="object-cover object-center"
                           />
                         </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
