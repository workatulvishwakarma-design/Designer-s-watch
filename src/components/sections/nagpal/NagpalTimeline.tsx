"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Truck,
  Lock,
  Shield,
  Wrench,
  MessageCircle,
  Globe,
  Store,
  Watch,
  Users,
  Briefcase,
  Rocket,
  Star,
  Award,
} from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

/* ───────────────────────── DATA ───────────────────────── */

const timelineData = [
  {
    year: "1940",
    color: "#E8720C",
    content:
      "Virbhan Nagpal, along with his 3 sons started a small setup in Amritsar — 1st & 2nd Gen",
    icon: Star,
  },
  {
    year: "1976",
    color: "#D94F2B",
    content:
      "3rd Generation walks in — Narinder & Jatinder | Launches Nagpals Bombay",
    icon: Users,
  },
  {
    year: "1981",
    color: "#C62828",
    content:
      "Nagpal Bombay acquires Pan India Distribution of Batteries (Renata, Seiko, Maxell)",
    icon: Globe,
  },
  {
    year: "1991",
    color: "#8E1C1C",
    content: "Launch of first home brand — D'SIGNER",
    icon: Watch,
  },
  {
    year: "1995",
    color: "#7B1FA2",
    content: "Launch of 2nd in-house brand — Escort",
    icon: Award,
  },
  {
    year: "1997",
    color: "#283593",
    content:
      "Initiated distribution arm for International Swiss & fashion brands (Tissot, Givenchy, Christian Bernard, Rotary)",
    icon: Briefcase,
  },
  {
    year: "2005",
    color: "#1565C0",
    content:
      "4th Gen, Neeraj & Nischay step in, to open OEM/ODM vertical and expand the Brand business.",
    icon: Rocket,
  },
  {
    year: "2007",
    color: "#0288D1",
    content:
      "Exclusive Distribution of a Turkish Brand Daniel Klein Watches and Accessories Launched",
    icon: Store,
  },
  {
    year: "2017",
    color: "#00897B",
    content:
      "Exclusively Launched — Mathey Tissot Swiss Made Watches",
    icon: Watch,
  },
  {
    year: "2018",
    color: "#2E7D32",
    content:
      "Myank (the youngest of the 4th Generation) came on board and took over a huge strategic partnership with Inter Luxury Group including SUPERDRY, FRENCH CONNECTION, TIMBERLAND, REACTION BY KENNETH COLE, CERUTTI.",
    icon: Briefcase,
  },
  {
    year: "2020",
    color: "#558B2F",
    content:
      "Went live with own E-Store Ghadiwaala.com",
    icon: Globe,
  },
  {
    year: "2022",
    color: "#9E9D24",
    content:
      "Introduced BFit Smart Watches & Exclusive Distribution of D1 Milano Italian watches. Added brands Ciga Design & SBPRC in India as sole distributors.",
    icon: Watch,
  },
  {
    year: "AT PRESENT",
    color: "#F9A825",
    content:
      "4 Generations, 20+ International brands handled exclusively, more than 500 Private labels manufactured and many more stories to unveil.",
    icon: Star,
  },
];

/* ───────────────────────── MOBILE CARD ───────────────────────── */

const MobileTimelineItem = ({
  item,
  index,
}: {
  item: (typeof timelineData)[0];
  index: number;
}) => {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex gap-4 items-start"
    >
      {/* Vertical color bar + dot */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
          style={{ backgroundColor: item.color }}
        >
          <Icon size={18} className="text-white" strokeWidth={1.8} />
        </div>
        {index < timelineData.length - 1 && (
          <div className="w-[2px] flex-1 min-h-[40px] mt-2 rounded-full opacity-30" style={{ backgroundColor: item.color }} />
        )}
      </div>

      {/* Card */}
      <div className="pb-8 flex-1">
        <span
          className="inline-block text-xs font-bold tracking-wider mb-1 px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: item.color }}
        >
          {item.year}
        </span>
        <p className="text-[13px] leading-relaxed text-[#1A1918]/80 font-light mt-1">
          {item.content}
        </p>
      </div>
    </motion.div>
  );
};

/* ───────────────────────── DESKTOP MILESTONE ───────────────────────── */

const DesktopMilestone = ({
  item,
  index,
  total,
}: {
  item: (typeof timelineData)[0];
  index: number;
  total: number;
}) => {
  const Icon = item.icon;
  const isAbove = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: isAbove ? 20 : -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 70,
        damping: 18,
      }}
      className="relative flex flex-col items-center group"
      style={{ flex: "1 1 0" }}
    >
      {/* Card — alternates above/below */}
      <div
        className={`absolute w-[180px] xl:w-[200px] ${
          isAbove ? "bottom-full mb-5" : "top-full mt-5"
        }`}
      >
        {/* Dotted connector line */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-px border-l border-dashed border-[#1A1918]/20 ${
            isAbove ? "bottom-0 -mb-5 h-5" : "top-0 -mt-5 h-5"
          }`}
        />

        <motion.div
          whileHover={{
            y: -4,
            boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
            transition: { duration: 0.25 },
          }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-[#1A1918]/5 transition-all duration-300"
        >
          <p className="text-[11px] leading-relaxed text-[#1A1918]/70 font-light">
            {item.content}
          </p>
        </motion.div>
      </div>

      {/* Year segment block */}
      <motion.div
        whileHover={{
          scale: 1.12,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
        className="relative z-10 flex flex-col items-center cursor-pointer"
      >
        <div
          className="w-12 h-12 xl:w-14 xl:h-14 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
          style={{ backgroundColor: item.color }}
        >
          <Icon
            size={20}
            className="text-white group-hover:scale-110 transition-transform duration-300"
            strokeWidth={1.8}
          />
        </div>
        <span
          className="mt-2 text-[10px] xl:text-[11px] font-bold tracking-wider text-center whitespace-nowrap group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: item.color }}
        >
          {item.year}
        </span>
      </motion.div>

      {/* Segment connector bar (except for last item) */}
      {index < total - 1 && (
        <div
          className="absolute top-1/2 left-[calc(50%+28px)] xl:left-[calc(50%+32px)] right-0 h-[3px] rounded-full -translate-y-1/2 opacity-40"
          style={{
            background: `linear-gradient(to right, ${item.color}, ${
              timelineData[index + 1].color
            })`,
          }}
        />
      )}
    </motion.div>
  );
};

/* ───────────────────────── MAIN COMPONENT ───────────────────────── */

export default function NagpalTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const pathWidth = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full py-20 md:py-28 overflow-hidden bg-[#FAF8F4] ${poppins.variable} font-sans`}
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-multiply"
        style={{
          backgroundImage: "url('/images/noise.png')",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">
        {/* ─── HEADER ─── */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.35em] uppercase text-[#B8935A] font-medium mb-4"
          >
            OUR LEGACY
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-semibold text-[#1A1918] tracking-tight mb-4"
          >
            Nagpal Group Journey
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[14px] md:text-[15px] text-[#1A1918]/60 font-light max-w-xl"
          >
            From a small setup in Amritsar to a global watch distribution
            powerhouse.
          </motion.p>
        </div>

        {/* ─── DESKTOP TIMELINE (hidden on mobile) ─── */}
        <div className="hidden lg:block relative">
          {/* Animated base path */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[3px] bg-[#1A1918]/5 rounded-full">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#E8720C] via-[#7B1FA2] via-[#1565C0] via-[#00897B] to-[#F9A825]"
              style={{ width: pathWidth }}
            />
            {/* Animated dot traveling along path */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#B8935A] shadow-lg shadow-[#B8935A]/40"
              style={{ left: pathWidth }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Milestone nodes */}
          <div className="relative flex items-center justify-between pt-32 pb-32">
            {timelineData.map((item, i) => (
              <DesktopMilestone
                key={item.year}
                item={item}
                index={i}
                total={timelineData.length}
              />
            ))}
          </div>
        </div>

        {/* ─── TABLET TIMELINE (md only) ─── */}
        <div className="hidden md:block lg:hidden relative">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {timelineData.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-3 items-start pb-6 group"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shadow-md shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon size={18} className="text-white" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span
                      className="inline-block text-[10px] font-bold tracking-wider mb-1 px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.year}
                    </span>
                    <p className="text-[12px] leading-relaxed text-[#1A1918]/75 font-light">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── MOBILE TIMELINE (sm only) ─── */}
        <div className="block md:hidden">
          <div className="flex flex-col">
            {timelineData.map((item, i) => (
              <MobileTimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .font-serif {
          font-family: var(--font-playfair), serif;
        }
      `}</style>
    </section>
  );
}
