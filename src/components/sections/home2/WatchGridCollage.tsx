"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const IMAGES = {
  col1: "/images/new-content/home2-grid-1.png",
  col2_top: "/images/new-content/home2-grid-2.png",
  col2_bottom: "/images/new-content/home2-grid-3.png",
  col3_top: "/images/new-content/home2-grid-4.png",
  col3_bottom: "/images/new-content/home2-grid-5.png",
  col4: "/images/new-content/home2-grid-6.png",
};

export default function WatchGridCollage() {
  return (
    <section className="bg-[#FAF8F4] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#003926] font-bold block mb-4">
            ✦ LIFESTYLE IN MOTION ✦
          </span>
          <h2 className="font-cormorant text-[38px] sm:text-[52px] text-[#1A1918] font-light leading-[1.1]">
            Horology on Wrist
          </h2>
          <div className="w-16 h-[1px] bg-[#B8935A] mx-auto mt-6" />
        </div>

        {/* Alternating Grid Collage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-stretch">
          
          {/* COLUMN 1: Tall Portrait Image (Left) */}
          <div className="relative overflow-hidden rounded-md shadow-md aspect-[3/5] bg-neutral-100 group">
            <Image
              src={IMAGES.col1}
              alt="Luxury Watch Wrist Close-up 1"
              fill
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />
          </div>

          {/* COLUMN 2: Two Stacked Images */}
          <div className="flex flex-col gap-3">
            {/* Top */}
            <div className="relative overflow-hidden rounded-md shadow-md aspect-[4/3] bg-neutral-100 group flex-grow">
              <Image
                src={IMAGES.col2_top}
                alt="Luxury Watch Wrist Close-up 2"
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />
            </div>
            {/* Bottom */}
            <div className="relative overflow-hidden rounded-md shadow-md aspect-[4/3] bg-neutral-100 group flex-grow">
              <Image
                src={IMAGES.col2_bottom}
                alt="Luxury Watch Wrist Close-up 3"
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />
            </div>
          </div>

          {/* COLUMN 3: Two Stacked Images */}
          <div className="flex flex-col gap-3">
            {/* Top */}
            <div className="relative overflow-hidden rounded-md shadow-md aspect-[4/3] bg-neutral-100 group flex-grow">
              <Image
                src={IMAGES.col3_top}
                alt="Luxury Watch Wrist Close-up 4"
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />
            </div>
            {/* Bottom */}
            <div className="relative overflow-hidden rounded-md shadow-md aspect-[4/3] bg-neutral-100 group flex-grow">
              <Image
                src={IMAGES.col3_bottom}
                alt="Luxury Watch Wrist Close-up 5"
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />
            </div>
          </div>

          {/* COLUMN 4: Tall Portrait Image (Right) */}
          <div className="relative overflow-hidden rounded-md shadow-md aspect-[3/5] bg-neutral-100 group">
            <Image
              src={IMAGES.col4}
              alt="Luxury Watch Wrist Close-up 6"
              fill
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
