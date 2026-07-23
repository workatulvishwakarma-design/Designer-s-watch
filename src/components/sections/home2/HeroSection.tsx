"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-[#040806] select-none">
      {/* 1. Full Page Background Image (Shifted Right and Scaled Down 25%) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/home1.PNG"
          alt="Luxury D'Signer Timepiece"
          fill
          priority
          className="object-cover object-[82%_center] md:object-[90%_center] scale-[0.82] filter brightness-[0.85] contrast-[1.08]"
        />
        {/* Soft Left Side Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040806] via-[#040806]/60 to-transparent z-10" />
      </div>

      {/* 2. Left-Aligned Minimal Content (Matches Reference Screenshot Exactly) */}
      <div className="relative z-30 w-full max-w-[1800px] mx-auto px-8 md:px-20 lg:px-28 flex flex-col items-start justify-center">
        <div className="max-w-md text-left flex flex-col items-start">
          
          {/* Text: FOUR GENERATIONS OF PRECISION */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="font-montserrat text-[11px] md:text-[13px] tracking-[0.25em] uppercase text-white/90 font-medium">
              FOUR GENERATIONS OF PRECISION
            </span>
          </motion.div>

          {/* Button: DISCOVER THE COLLECTION */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="#featured-products"
              className="inline-flex items-center justify-center px-7 py-3.5 font-montserrat text-[12px] md:text-[13px] tracking-[0.18em] uppercase text-white font-medium bg-transparent border border-white/80 hover:bg-[#003926] hover:border-[#003926] transition-all duration-300 shadow-xl"
            >
              DISCOVER THE COLLECTION
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

