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
        className="flex flex-col md:flex-row w-full h-auto md:h-[82vh] lg:h-[88vh] md:min-h-[700px]"
      >
        {/* ── Left Panel: MEN ── */}
        <div
          onMouseEnter={() => setHoveredCard("men")}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative overflow-hidden cursor-pointer w-full md:w-[var(--men-panel-width)] h-[380px] sm:h-[480px] md:h-full flex-shrink-0 bg-[#040806]"
          style={
            {
              "--men-panel-width": menWidth,
              transition: panelTransition,
            } as React.CSSProperties
          }
        >
          {/* Inner image container fixed to viewport half so image doesn't scale on slide */}
          <div
            className="absolute inset-0 md:w-[50vw] pointer-events-none"
          >
            <Image
              src="/images/new-img/mens-d.png"
              alt="Men's Timepieces"
              fill
              style={{ objectFit: "cover", objectPosition: "center 25%" }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          </div>

          {/* Heading & Buttons */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center translate-y-[12%] sm:translate-y-[18%] md:translate-y-[20%] gap-3 sm:gap-5 pointer-events-none px-4 text-center">
            <h2
              className="font-montserrat font-medium text-[36px] sm:text-[52px] md:text-[72px] uppercase tracking-[0.1em] text-white leading-none"
              style={{
                opacity: hoveredCard === "women" ? 0.35 : 1,
                transition: "opacity 0.5s ease",
              }}
            >
              MEN
            </h2>
            <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 pointer-events-auto flex-wrap sm:flex-nowrap">
              <Link
                href="/collections/mens-designer"
                className="pointer-events-auto font-montserrat text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] uppercase font-semibold text-white border border-white/50 px-4 sm:px-5 py-2 sm:py-2.5 backdrop-blur-sm bg-white/5 hover:bg-white hover:text-[#003926] hover:border-white transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                D&apos;SIGNER
              </Link>
              <Link
                href="/collections/mens-escort"
                className="pointer-events-auto font-montserrat text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] uppercase font-semibold text-white border border-white/50 px-4 sm:px-5 py-2 sm:py-2.5 backdrop-blur-sm bg-white/5 hover:bg-white hover:text-[#003926] hover:border-white transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                ESCORT
              </Link>
            </div>
          </div>
        </div>

        {/* Thin Divider */}
        <div className="w-full h-[1px] md:w-[1px] md:h-full bg-white/10 shrink-0 z-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r md:bg-gradient-to-b from-transparent via-white/15 to-transparent" />
        </div>

        {/* ── Right Panel: WOMEN ── */}
        <div
          onMouseEnter={() => setHoveredCard("women")}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative overflow-hidden cursor-pointer w-full md:w-[var(--women-panel-width)] h-[380px] sm:h-[480px] md:h-full flex-shrink-0 bg-[#040806]"
          style={
            {
              "--women-panel-width": womenWidth,
              transition: panelTransition,
            } as React.CSSProperties
          }
        >
          {/* Inner image container anchored right and fixed to viewport half so image doesn't scale on slide */}
          <div
            className="absolute inset-0 md:left-auto md:right-0 md:w-[50vw] pointer-events-none"
          >
            <Image
              src="/images/new-img/womens.png"
              alt="Women's Timepieces"
              fill
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          </div>

          {/* Heading & Buttons */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center translate-y-[12%] sm:translate-y-[18%] md:translate-y-[20%] gap-3 sm:gap-5 pointer-events-none px-4 text-center">
            <h2
              className="font-montserrat font-medium text-[36px] sm:text-[52px] md:text-[72px] uppercase tracking-[0.1em] text-white leading-none"
              style={{
                opacity: hoveredCard === "men" ? 0.35 : 1,
                transition: "opacity 0.5s ease",
              }}
            >
              WOMEN
            </h2>
            <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 pointer-events-auto flex-wrap sm:flex-nowrap">
              <Link
                href="/collections/womens-designer"
                className="pointer-events-auto font-montserrat text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] uppercase font-semibold text-white border border-white/50 px-4 sm:px-5 py-2 sm:py-2.5 backdrop-blur-sm bg-white/5 hover:bg-white hover:text-[#003926] hover:border-white transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                D&apos;SIGNER
              </Link>
              <Link
                href="/collections/womens-escort"
                className="pointer-events-auto font-montserrat text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] uppercase font-semibold text-white border border-white/50 px-4 sm:px-5 py-2 sm:py-2.5 backdrop-blur-sm bg-white/5 hover:bg-white hover:text-[#003926] hover:border-white transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                ESCORT
              </Link>
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
