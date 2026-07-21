"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LifestyleGallery() {
  return (
    <section className="bg-[#FAF8F4] py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-dm text-[11px] tracking-[0.25em] text-[#003926] font-bold block mb-4 uppercase">
            LIFESTYLE IN FOCUS
          </span>
          <h2 className="font-cormorant text-[38px] sm:text-[54px] text-[#1A1918] font-light leading-[1.15]">
            Curated Elegance
          </h2>
          <div className="w-12 h-[2px] bg-[#003926] mx-auto mt-6" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT LARGE ITEM (7 cols) */}
          <div className="md:col-span-7 relative group rounded-2xl overflow-hidden shadow-lg aspect-[4/5] bg-neutral-900">
            <Image
              src="/images/new-content/home2-lifestyle-1.png"
              alt="Luxury Watch in Boardroom"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-w-1024px) 100vw, 60vw"
            />
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            
            {/* Info overlay */}
            <div className="absolute bottom-8 left-8 z-20 text-white">
              <span className="font-dm text-[9px] tracking-[0.2em] text-[#D4C5A0] font-bold block mb-2">
                EXECUTIVE LINE
              </span>
              <h4 className="font-cormorant text-[24px] font-medium leading-none">
                The Boardroom Silhouette
              </h4>
            </div>
          </div>

          {/* RIGHT COLUMN (5 cols) - Splits vertically */}
          <div className="md:col-span-5 flex flex-col justify-between gap-8">
            
            {/* TOP IMAGE CARD */}
            <div className="relative group rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-neutral-900 flex-grow">
              <Image
                src="/images/new-content/home2-lifestyle-2.png"
                alt="Luxury Watch Yacht Sailing"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-w-1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              
              <div className="absolute bottom-6 left-6 z-20 text-white">
                <span className="font-dm text-[9px] tracking-[0.2em] text-[#D4C5A0] font-bold block mb-2">
                  SPORTS & LEISURE
                </span>
                <h4 className="font-cormorant text-[20px] font-medium leading-none">
                  The Riviera Regatta
                </h4>
              </div>
            </div>

            {/* BOTTOM TEXT CARD */}
            <div className="bg-[#003926] p-8 rounded-2xl border border-[#D4C5A0]/15 flex flex-col justify-center text-white min-h-[200px]">
              <span className="font-dm text-[9px] tracking-[0.2em] text-[#D4C5A0] font-bold block mb-3 uppercase">
                BRAND PHILOSOPHY
              </span>
              <h4 className="font-cormorant text-[24px] font-light leading-tight mb-3">
                More Than Telling Time
              </h4>
              <p className="font-dm text-[12px] text-white/60 leading-relaxed">
                We believe a watch is the ultimate signature of personal values. Our designs represent an uncompromising standard of detail and horological lineage.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
