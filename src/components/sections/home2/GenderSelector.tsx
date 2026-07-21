"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function GenderSelector() {
  return (
    <section className="w-full bg-[#FAF8F4] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
        
        {/* Left Column: MEN */}
        <Link href="/collections/men" className="relative group block aspect-[4/5] sm:aspect-[1/1] md:aspect-[4/3] lg:aspect-[1/1] xl:aspect-[4/3] overflow-hidden cursor-pointer">
          <div className="absolute inset-0 z-0">
            <Image
              src="/img/home3.PNG"
              alt="Men's Timepieces"
              fill
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {/* Subtle dark gradient at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-80 group-hover:from-black/70 transition-all duration-500" />
          
          {/* Overlay Text */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-12 sm:pb-16 text-center text-white">
            <motion.h2 
              className="font-dm font-bold text-[36px] sm:text-[48px] tracking-[0.1em] uppercase leading-none mb-3"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
            >
              Men
            </motion.h2>
            <span className="font-dm text-[11px] sm:text-[12px] tracking-[0.4em] uppercase text-white/80 border-b border-white/0 pb-1 group-hover:border-white/40 transition-all duration-500 pl-[0.4em]">
              Explore
            </span>
          </div>
        </Link>

        {/* Right Column: WOMEN */}
        <Link href="/collections/women" className="relative group block aspect-[4/5] sm:aspect-[1/1] md:aspect-[4/3] lg:aspect-[1/1] xl:aspect-[4/3] overflow-hidden cursor-pointer">
          <div className="absolute inset-0 z-0">
            <Image
              src="/img/home4.PNG"
              alt="Women's Timepieces"
              fill
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {/* Subtle dark gradient at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-80 group-hover:from-black/70 transition-all duration-500" />
          
          {/* Overlay Text */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-12 sm:pb-16 text-center text-white">
            <motion.h2 
              className="font-dm font-bold text-[36px] sm:text-[48px] tracking-[0.1em] uppercase leading-none mb-3"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
            >
              Women
            </motion.h2>
            <span className="font-dm text-[11px] sm:text-[12px] tracking-[0.4em] uppercase text-white/80 border-b border-white/0 pb-1 group-hover:border-white/40 transition-all duration-500 pl-[0.4em]">
              Explore
            </span>
          </div>
        </Link>

      </div>
    </section>
  );
}
