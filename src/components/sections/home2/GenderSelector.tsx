"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function GenderSelector() {
  const [hoveredCard, setHoveredCard] = useState<"men" | "women" | null>(null);

  return (
    <section className="w-full bg-[#FAF8F4] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row w-full h-[650px] sm:h-[750px] md:h-[82vh] lg:h-[88vh] min-h-[550px] md:min-h-[700px]"
      >
        {/* Left Card: MEN */}
        <Link
          href="/collections/men"
          onMouseEnter={() => setHoveredCard("men")}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative block overflow-hidden cursor-pointer w-full md:flex-1 h-full bg-[#040806]"
        >
          {/* Oversized Image Container (Extends 20% past edges so right-sliding reveals image, not white space) */}
          <div className="absolute -inset-x-[20%] inset-y-0 z-0 overflow-hidden">
            <div
              className={`relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform ${
                hoveredCard === "men" ? "translate-x-[10%]" : "-translate-x-[5%]"
              }`}
            >
              <Image
                src="/img/home3.PNG"
                alt="Men's Timepieces"
                fill
                className="object-cover object-center w-full h-full"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </div>
          </div>

          {/* Dark Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15 z-10 transition-opacity duration-700 ease-out ${
              hoveredCard === "men" ? "opacity-60" : "opacity-75"
            }`}
          />

          {/* Centered Overlay Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-14 sm:pb-20 md:pb-24 px-6 text-center text-white pointer-events-none"
          >
            <h2
              className="font-montserrat font-bold uppercase text-[38px] sm:text-[48px] lg:text-[60px] tracking-[0.12em] leading-none mb-4"
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
            >
              Men
            </h2>

            {/* "Explore" CTA button with upwards motion & fade */}
            <div
              className={`flex items-center gap-2 transition-all duration-500 ease-out ${
                hoveredCard === "men"
                  ? "opacity-100 translate-y-0 text-white"
                  : "opacity-75 translate-y-2 sm:translate-y-3 text-white/80"
              }`}
            >
              <span className="font-montserrat text-[11px] sm:text-[12px] tracking-[0.45em] uppercase font-semibold pl-[0.45em]">
                Explore Collection
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                className={`transition-transform duration-500 ${
                  hoveredCard === "men" ? "translate-x-1.5" : "translate-x-0"
                }`}
              >
                <path
                  d="M4 10h12M12 6l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        </Link>

        {/* Right Card: WOMEN */}
        <Link
          href="/collections/women"
          onMouseEnter={() => setHoveredCard("women")}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative block overflow-hidden cursor-pointer w-full md:flex-1 h-full bg-[#040806]"
        >
          {/* Oversized Image Container (Extends 20% past edges so left-sliding reveals image, not white space) */}
          <div className="absolute -inset-x-[20%] inset-y-0 z-0 overflow-hidden">
            <div
              className={`relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform ${
                hoveredCard === "women" ? "-translate-x-[10%]" : "translate-x-[5%]"
              }`}
            >
              <Image
                src="/img/home4.PNG"
                alt="Women's Timepieces"
                fill
                className="object-cover object-center w-full h-full"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </div>
          </div>

          {/* Dark Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15 z-10 transition-opacity duration-700 ease-out ${
              hoveredCard === "women" ? "opacity-60" : "opacity-75"
            }`}
          />

          {/* Centered Overlay Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-14 sm:pb-20 md:pb-24 px-6 text-center text-white pointer-events-none"
          >
            <h2
              className="font-montserrat font-bold uppercase text-[38px] sm:text-[48px] lg:text-[60px] tracking-[0.12em] leading-none mb-4"
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
            >
              Women
            </h2>

            {/* "Explore" CTA button with upwards motion & fade */}
            <div
              className={`flex items-center gap-2 transition-all duration-500 ease-out ${
                hoveredCard === "women"
                  ? "opacity-100 translate-y-0 text-white"
                  : "opacity-75 translate-y-2 sm:translate-y-3 text-white/80"
              }`}
            >
              <span className="font-montserrat text-[11px] sm:text-[12px] tracking-[0.45em] uppercase font-semibold pl-[0.45em]">
                Explore Collection
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                className={`transition-transform duration-500 ${
                  hoveredCard === "women" ? "translate-x-1.5" : "translate-x-0"
                }`}
              >
                <path
                  d="M4 10h12M12 6l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        </Link>

      </motion.div>
    </section>
  );
}

