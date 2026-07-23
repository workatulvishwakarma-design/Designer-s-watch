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
          className={`relative block overflow-hidden cursor-pointer w-full h-full
            transition-[flex-grow,transform] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[flex-grow,transform]
            ${
              hoveredCard === "men"
                ? "md:flex-[1.65] lg:flex-[1.7]"
                : hoveredCard === "women"
                ? "md:flex-[0.85] lg:flex-[0.8]"
                : "md:flex-1"
            }
          `}
        >
          {/* Image Container */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/img/home3.PNG"
              alt="Men's Timepieces"
              fill
              className={`object-cover object-center w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform ${
                hoveredCard === "men"
                  ? "scale-[1.07] -translate-x-[15px]"
                  : "scale-[1.02] translate-x-0"
              }`}
              sizes="(max-width: 768px) 100vw, 65vw"
              priority
            />
          </div>

          {/* Dark Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15 z-10 transition-opacity duration-700 ease-out ${
              hoveredCard === "men" ? "opacity-60" : "opacity-80"
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
              className={`font-montserrat font-bold uppercase leading-none mb-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                hoveredCard === "men"
                  ? "text-[42px] sm:text-[56px] lg:text-[68px] scale-[1.05] tracking-[0.14em]"
                  : "text-[38px] sm:text-[48px] lg:text-[60px] scale-100 tracking-[0.1em]"
              }`}
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
            >
              Men
            </h2>

            {/* "Explore" CTA button with upwards motion & fade */}
            <div
              className={`flex items-center gap-2 transition-all duration-500 ease-out ${
                hoveredCard === "men"
                  ? "opacity-100 translate-y-0"
                  : "opacity-75 translate-y-2 sm:translate-y-3"
              }`}
            >
              <span className="font-montserrat text-[11px] sm:text-[12px] tracking-[0.45em] uppercase text-white/90 font-semibold pl-[0.45em]">
                Explore Collection
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                className={`transition-transform duration-500 ${
                  hoveredCard === "men" ? "translate-x-1" : "translate-x-0"
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
          className={`relative block overflow-hidden cursor-pointer w-full h-full
            transition-[flex-grow,transform] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[flex-grow,transform]
            ${
              hoveredCard === "women"
                ? "md:flex-[1.65] lg:flex-[1.7]"
                : hoveredCard === "men"
                ? "md:flex-[0.85] lg:flex-[0.8]"
                : "md:flex-1"
            }
          `}
        >
          {/* Image Container */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/img/home4.PNG"
              alt="Women's Timepieces"
              fill
              className={`object-cover object-center w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform ${
                hoveredCard === "women"
                  ? "scale-[1.07] translate-x-[15px]"
                  : "scale-[1.02] translate-x-0"
              }`}
              sizes="(max-width: 768px) 100vw, 65vw"
              priority
            />
          </div>

          {/* Dark Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15 z-10 transition-opacity duration-700 ease-out ${
              hoveredCard === "women" ? "opacity-60" : "opacity-80"
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
              className={`font-montserrat font-bold uppercase leading-none mb-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                hoveredCard === "women"
                  ? "text-[42px] sm:text-[56px] lg:text-[68px] scale-[1.05] tracking-[0.14em]"
                  : "text-[38px] sm:text-[48px] lg:text-[60px] scale-100 tracking-[0.1em]"
              }`}
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
            >
              Women
            </h2>

            {/* "Explore" CTA button with upwards motion & fade */}
            <div
              className={`flex items-center gap-2 transition-all duration-500 ease-out ${
                hoveredCard === "women"
                  ? "opacity-100 translate-y-0"
                  : "opacity-75 translate-y-2 sm:translate-y-3"
              }`}
            >
              <span className="font-montserrat text-[11px] sm:text-[12px] tracking-[0.45em] uppercase text-white/90 font-semibold pl-[0.45em]">
                Explore Collection
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                className={`transition-transform duration-500 ${
                  hoveredCard === "women" ? "translate-x-1" : "translate-x-0"
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

