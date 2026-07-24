"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SlideToSwitch() {
  const [position, setPosition] = useState(50); // percentage 0-100
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    const observer = new ResizeObserver(updateWidth);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", updateWidth);
      observer.disconnect();
    };
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    updatePosition(e.clientX);
    // Capture pointer so drag events continue smoothly even if cursor moves outside canvas
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if already released
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#FAF8F4] py-12 md:py-20 overflow-hidden select-none border-b border-[#E5E0D8]"
    >
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 md:px-12">
        
        {/* Section Title Header */}
        <div className="mb-6 flex justify-between items-center px-2">
          <span className="font-montserrat text-[12px] md:text-[13px] tracking-[0.2em] text-[#1A1918] font-medium uppercase">
            SLIDE TO SWITCH
          </span>
          <span className="font-montserrat text-[11px] md:text-[12px] text-[#5C5750] tracking-[0.08em] uppercase font-normal">
            DRAG DIVIDER TO VIEW DIAL COLORS
          </span>
        </div>

        {/* Full-Width Slider Canvas Box (Height Increased with Padding for Breathing Room) */}
        <div
          ref={containerRef}
          className="relative w-full h-[80vh] min-h-[580px] max-h-[900px] overflow-hidden bg-[#EAE8E4] border border-[#E0D8CE] shadow-sm cursor-ew-resize rounded-sm touch-none select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Base Layer: White Dial Watch (Right Side, Fixed Center) */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center py-10 md:py-14 px-4 pointer-events-none">
            <div className="relative w-full h-full max-w-2xl lg:max-w-3xl mx-auto">
              <Image
                src="/images/new-content/new-1/escort womens/E-7931/E-7931.RGM_White.png"
                alt="Alabaster White Dial Variant"
                fill
                draggable={false}
                className="object-contain scale-110 md:scale-125 select-none pointer-events-none"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Overlay Layer: Blue Dial Watch (Clipped via position percentage) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden z-10 pointer-events-none"
            style={{ width: `${position}%` }}
          >
            {/* The inner div matches containerWidth exactly so images overlay dead-center */}
            <div
              className="absolute inset-y-0 left-0 h-full flex items-center justify-center py-10 md:py-14 px-4 pointer-events-none"
              style={{ width: containerWidth ? `${containerWidth}px` : "100vw" }}
            >
              <div className="relative w-full h-full max-w-2xl lg:max-w-3xl mx-auto">
                <Image
                  src="/images/new-content/new-1/escort womens/E-7931/E-7931.RGM_Blue.png"
                  alt="Ocean Blue Dial Variant"
                  fill
                  draggable={false}
                  className="object-contain scale-110 md:scale-125 select-none pointer-events-none"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Vertical Slider Divider Line & Drag Handle */}
          <div
            className="absolute inset-y-0 z-20 w-[2px] bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
            style={{ left: `${position}%` }}
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-xl border border-neutral-300 flex items-center justify-center text-[#1A1918] pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M8 19l-7-7 7-7M16 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Bottom Left Label: Ocean Blue Dial */}
          <div className="absolute bottom-6 left-6 md:left-8 z-30 text-left bg-white/70 backdrop-blur-md px-4 py-2.5 rounded-sm border border-black/5 pointer-events-auto">
            <span className="font-montserrat text-[14px] font-medium text-[#1A1918] block mb-1">
              Ocean Blue Dial
            </span>
            <Link
              href="/product/escort-7931"
              className="font-montserrat text-[11px] tracking-[0.15em] text-[#003926] uppercase font-medium hover:underline"
            >
              Shop Now
            </Link>
          </div>

          {/* Bottom Right Label: Alabaster White Dial */}
          <div className="absolute bottom-6 right-6 md:right-8 z-30 text-right bg-white/70 backdrop-blur-md px-4 py-2.5 rounded-sm border border-black/5 pointer-events-auto">
            <span className="font-montserrat text-[14px] font-medium text-[#1A1918] block mb-1">
              Alabaster White Dial
            </span>
            <Link
              href="/product/escort-7931"
              className="font-montserrat text-[11px] tracking-[0.15em] text-[#003926] uppercase font-medium hover:underline"
            >
              Shop Now
            </Link>
          </div>

        </div>

      </div>
    </motion.section>
  );
}
