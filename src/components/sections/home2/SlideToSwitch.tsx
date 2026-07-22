"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SlideToSwitch() {
  const [position, setPosition] = useState(50); // percentage 0-100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <section className="bg-[#FAF8F4] py-16 md:py-24 overflow-hidden select-none border-b border-[#E5E0D8]">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10">
        
        {/* Section Title */}
        <div className="mb-6 flex justify-between items-center">
          <span className="font-dm text-[11px] tracking-[0.25em] text-[#1A1918] font-bold uppercase">
            Slide to Switch
          </span>
          <span className="font-dm text-[10px] text-[#9C9690] tracking-wider uppercase">
            Drag divider to view dial colors
          </span>
        </div>

        {/* Slider Canvas Container */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-md overflow-hidden bg-[#EAE8E4] border border-[#E0D8CE] shadow-sm cursor-ew-resize"
          onMouseDown={(e) => {
            isDragging.current = true;
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            isDragging.current = true;
            if (e.touches[0]) handleMove(e.touches[0].clientX);
          }}
        >
          {/* Base Layer: White Dial Watch (Right Side) */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center p-3 sm:p-5 md:p-6">
            <div className="relative w-full h-full">
              <Image
                src="/images/new-content/new-1/escort womens/E-7931/E-7931.RGM_White.png"
                alt="White Dial Variant"
                fill
                className="object-contain scale-[1.28] origin-center"
                sizes="(max-width: 1300px) 100vw, 1200px"
                priority
              />
            </div>
          </div>

          {/* Overlay Layer: Blue Dial Watch (Left Side, Clipped) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            {/* The inner container must retain the full width of the parent so the image does not stretch */}
            <div
              className="absolute inset-y-0 left-0 p-3 sm:p-5 md:p-6 flex items-center justify-center"
              style={{ width: containerRef.current?.getBoundingClientRect().width || "100%" }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/new-content/new-1/escort womens/E-7931/E-7931.RGM_Blue.png"
                  alt="Blue Dial Variant"
                  fill
                  className="object-contain scale-[1.28] origin-center"
                  sizes="(max-width: 1300px) 100vw, 1200px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Vertical Slider Line & Circular Handle */}
          <div
            className="absolute inset-y-0 z-20 w-[2px] bg-white cursor-ew-resize flex items-center justify-center"
            style={{ left: `${position}%` }}
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-md border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black transition-colors pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M8 19l-7-7 7-7M16 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Bottom Left Label: Blue Dial */}
          <div className="absolute bottom-6 left-6 z-30 text-left">
            <span className="font-dm text-[14px] font-medium text-[#1A1918] block mb-1">
              Ocean Blue Dial
            </span>
            <Link
              href="/product/escort-7931"
              className="font-dm text-[9px] tracking-[0.2em] text-[#003926] uppercase font-bold hover:underline"
            >
              Shop Now
            </Link>
          </div>

          {/* Bottom Right Label: White Dial */}
          <div className="absolute bottom-6 right-6 z-30 text-right">
            <span className="font-dm text-[14px] font-medium text-[#1A1918] block mb-1">
              Alabaster White Dial
            </span>
            <Link
              href="/product/escort-7931"
              className="font-dm text-[9px] tracking-[0.2em] text-[#003926] uppercase font-bold hover:underline"
            >
              Shop Now
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
