"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function GenderSelector() {
  const [hoveredCard, setHoveredCard] = useState<"men" | "women" | null>(null);

  const menWidth =
    hoveredCard === "women" ? "40%" : hoveredCard === "men" ? "60%" : "50%";
  const womenWidth =
    hoveredCard === "men" ? "40%" : hoveredCard === "women" ? "60%" : "50%";

  const panelTransition = "width 0.7s cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <section className="w-full bg-[#040806] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex w-full h-[650px] sm:h-[750px] md:h-[82vh] lg:h-[88vh] min-h-[550px] md:min-h-[700px]"
      >
        {/* ── Left Panel: MEN ── */}
        <div
          onMouseEnter={() => setHoveredCard("men")}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative overflow-hidden cursor-pointer h-full flex-shrink-0 bg-[#040806]"
          style={{ width: menWidth, transition: panelTransition }}
        >
          {/*
            Image wrapper is FIXED at 75vw wide, anchored to left: 0.
            It NEVER changes size — no zoom, ever.
            The panel's overflow: hidden clips how much is visible.
            As panel grows 50%→75%, more of the fixed image is revealed (slide).
          */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "-15vw",
              width: "75vw",
              pointerEvents: "none",
            }}
          >
            <Image
              src="/img/home3.PNG"
              alt="Men's Timepieces"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="75vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          {/* Heading */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-16 md:pb-20 pointer-events-none">
            <h2
              className="font-montserrat font-medium text-[48px] sm:text-[60px] md:text-[72px] uppercase tracking-[0.1em] text-white leading-none"
              style={{
                opacity: hoveredCard === "women" ? 0.35 : 1,
                transition: "opacity 0.5s ease",
              }}
            >
              MEN
            </h2>
          </div>

          {/* Buttons */}
          <div className="absolute bottom-5 inset-x-0 z-20 flex flex-row items-center justify-center gap-4 pointer-events-none">
            <Link
              href="/collections/mens-designer"
              className="pointer-events-auto font-montserrat text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-semibold text-white border border-white/50 px-5 py-2.5 backdrop-blur-sm bg-white/5 hover:bg-white hover:text-[#003926] hover:border-white transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              D&apos;SIGNER&apos;S
            </Link>
            <Link
              href="/collections/mens-escort"
              className="pointer-events-auto font-montserrat text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-semibold text-white border border-white/50 px-5 py-2.5 backdrop-blur-sm bg-white/5 hover:bg-white hover:text-[#003926] hover:border-white transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              ESCORT
            </Link>
          </div>
        </div>

        {/* Thin Vertical Divider */}
        <div className="w-[1px] bg-white/10 shrink-0 z-20 relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
        </div>

        {/* ── Right Panel: WOMEN ── */}
        <div
          onMouseEnter={() => setHoveredCard("women")}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative overflow-hidden cursor-pointer h-full flex-shrink-0 bg-[#040806]"
          style={{ width: womenWidth, transition: panelTransition }}
        >
          {/*
            Image wrapper is FIXED at 75vw wide, anchored to right: 0.
            As panel grows 50%→75%, more of the left side is revealed (slide).
            Zero zoom — same fixed size always.
          */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: "75vw",
              pointerEvents: "none",
            }}
          >
            <Image
              src="/img/home4.PNG"
              alt="Women's Timepieces"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="75vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          {/* Heading */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-16 md:pb-20 pointer-events-none">
            <h2
              className="font-montserrat font-medium text-[48px] sm:text-[60px] md:text-[72px] uppercase tracking-[0.1em] text-white leading-none"
              style={{
                opacity: hoveredCard === "men" ? 0.35 : 1,
                transition: "opacity 0.5s ease",
              }}
            >
              WOMEN
            </h2>
          </div>

          {/* Buttons */}
          <div className="absolute bottom-5 inset-x-0 z-20 flex flex-row items-center justify-center gap-4 pointer-events-none">
            <Link
              href="/collections/womens-designer"
              className="pointer-events-auto font-montserrat text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-semibold text-white border border-white/50 px-5 py-2.5 backdrop-blur-sm bg-white/5 hover:bg-white hover:text-[#003926] hover:border-white transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              D&apos;SIGNER&apos;S
            </Link>
            <Link
              href="/collections/womens-escort"
              className="pointer-events-auto font-montserrat text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-semibold text-white border border-white/50 px-5 py-2.5 backdrop-blur-sm bg-white/5 hover:bg-white hover:text-[#003926] hover:border-white transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              ESCORT
            </Link>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
