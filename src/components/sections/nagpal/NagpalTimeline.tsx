"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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

/* ───────────────────────── STRUCTURED DATA ───────────────────────── */

const journeyData = [
  {
    era: "FOUNDATION YEARS",
    events: [
      {
        year: "1940",
        color: "#E8720C",
        title: "The Beginning in Amritsar",
        content:
          "Virbhan Nagpal, along with his 3 sons started a small setup in Amritsar — establishing the 1st & 2nd Generation legacy.",
        icon: Star,
      },
    ],
  },
  {
    era: "EXPANSION PHASE",
    events: [
      {
        year: "1976",
        color: "#D94F2B",
        title: "3rd Generation Enters",
        content:
          "Narinder & Jatinder walk in, officially launching Nagpals Bombay and setting the stage for national operations.",
        icon: Users,
      },
      {
        year: "1981",
        color: "#C62828",
        title: "National Distribution Base",
        content:
          "Nagpal Bombay acquires Pan-India distribution rights for premium batteries including Renata, Seiko, and Maxell.",
        icon: Globe,
      },
    ],
  },
  {
    era: "BRAND BUILDING",
    events: [
      {
        year: "1991",
        color: "#8E1C1C",
        title: "The First Home Brand",
        content:
          "Official launch of the first home brand — D'SIGNER, cementing the transition from distribution to manufacturing.",
        icon: Watch,
      },
      {
        year: "1995",
        color: "#7B1FA2",
        title: "Second In-House Brand",
        content:
          "Launch of the 2nd in-house brand — Escort, diversifying the product portfolio.",
        icon: Award,
      },
      {
        year: "1997",
        color: "#283593",
        title: "International Distribution Arm",
        content:
          "Initiated the distribution arm for International Swiss & fashion brands including Tissot, Givenchy, Christian Bernard, and Rotary.",
        icon: Briefcase,
      },
    ],
  },
  {
    era: "GLOBAL DISTRIBUTION GROWTH",
    events: [
      {
        year: "2005",
        color: "#1565C0",
        title: "The 4th Generation",
        content:
          "Neeraj & Nischay step in to open the OEM/ODM vertical and aggressively expand the brand business footprint.",
        icon: Rocket,
      },
      {
        year: "2007",
        color: "#0288D1",
        title: "Daniel Klein Distribution",
        content:
          "Exclusive Distribution of Turkish Brand 'Daniel Klein' Watches and Accessories is officially launched.",
        icon: Store,
      },
      {
        year: "2017",
        color: "#00897B",
        title: "Swiss Precision",
        content:
          "Exclusively launched Mathey Tissot Swiss Made Watches across the Indian market.",
        icon: Watch,
      },
    ],
  },
  {
    era: "PRESENT & FUTURE",
    events: [
      {
        year: "2018",
        color: "#2E7D32",
        title: "Inter Luxury Group Partnership",
        content:
          "Myank (the youngest of the 4th Generation) comes on board, taking over a massive strategic partnership with Inter Luxury Group including Superdry, French Connection, Timberland, Kenneth Cole, and Cerutti.",
        icon: Briefcase,
      },
      {
        year: "2020",
        color: "#558B2F",
        title: "Digital Expansion",
        content: "Went live with own direct-to-consumer E-Store: Ghadiwaala.com.",
        icon: Globe,
      },
      {
        year: "2022",
        color: "#9E9D24",
        title: "Smartwatches & Italian Brands",
        content:
          "Introduced BFit Smart Watches & secured exclusive distribution of D1 Milano Italian watches. Added Ciga Design & SBPRC as sole distributors in India.",
        icon: Watch,
      },
      {
        year: "AT PRESENT",
        color: "#B8935A", // Changed to brand luxury gold
        title: "A Timeless Legacy",
        content:
          "4 Generations, 20+ International brands handled exclusively, more than 500 Private labels manufactured, and many more stories yet to be unveiled.",
        icon: Star,
      },
    ],
  },
];

const flatTimeline = journeyData.flatMap((eraGrp) =>
  eraGrp.events.map((evt) => ({ ...evt, era: eraGrp.era }))
);

/* ───────────────────────── COMPONENTS ───────────────────────── */

const EraMarker = ({ era }: { era: string }) => {
  return (
    <div className="relative z-20 flex items-center justify-center w-full my-12 md:my-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="px-6 py-2 bg-[#FAF8F4] border border-[#B8935A]/30 rounded-full shadow-sm relative z-20"
      >
        <span className="text-[10px] md:text-xs font-dm uppercase tracking-[0.2em] text-[#B8935A] font-medium">
          {era}
        </span>
      </motion.div>
    </div>
  );
};

const MilestoneCard = ({
  item,
  index,
}: {
  item: (typeof flatTimeline)[0];
  index: number;
}) => {
  const Icon = item.icon;
  // Alternating layout for desktop: even = left side, odd = right side
  const isEven = index % 2 === 0;

  return (
    <div className="relative w-full flex flex-col md:flex-row items-center justify-center mb-12 md:mb-16 md:even:flex-row-reverse group">
      
      {/* ─── DESKTOP LEFT / RIGHT CONTENT (Alternating) ─── */}
      <div className={`hidden md:flex flex-1 ${isEven ? 'justify-end pr-12 lg:pr-20' : 'justify-start pl-12 lg:pl-20'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, type: "spring", stiffness: 60, damping: 20 }}
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
          className="relative w-full max-w-[460px] bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#1A1918]/5 group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
        >
          {/* Subtle Year Watermark inside card */}
          <div className="absolute top-2 right-4 text-[#1A1918]/[0.03] text-7xl font-cormorant font-bold select-none pointer-events-none">
            {item.year !== "AT PRESENT" ? item.year : ""}
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="inline-block text-[11px] font-bold tracking-wider px-3 py-1 rounded-full text-white shadow-sm"
                style={{ backgroundColor: item.color }}
              >
                {item.year}
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#1A1918]/10 to-transparent" />
            </div>
            
            <h3 className="font-cormorant text-2xl lg:text-3xl font-semibold text-[#1A1918] mb-3">
              {item.title}
            </h3>
            
            <p className="font-dm text-[#1A1918]/70 text-[13px] lg:text-[14px] leading-relaxed font-light">
              {item.content}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ─── CENTER NODE / ICON ─── */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <div 
            className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg border-[3px] border-[#FAF8F4] z-10 transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundColor: item.color }}
          >
            <Icon size={isEven ? 20 : 22} className="text-white drop-shadow-sm" strokeWidth={1.5} />
          </div>
          {/* Outer glow ring on hover */}
          <div 
            className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"
            style={{ backgroundColor: item.color }}
          />
        </motion.div>
      </div>

      {/* ─── MOBILE CONTENT (Stacking) ─── */}
      <div className="flex w-full md:hidden pl-20 pr-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative w-full bg-white/80 rounded-2xl p-6 shadow-sm border border-[#1A1918]/5"
        >
          <div className="flex flex-col mb-3">
            <span
              className="inline-block self-start text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full text-white shadow-sm mb-2"
              style={{ backgroundColor: item.color }}
            >
              {item.year}
            </span>
            <h3 className="font-cormorant text-xl font-semibold text-[#1A1918]">
              {item.title}
            </h3>
          </div>
          <p className="font-dm text-[#1A1918]/70 text-[12px] leading-relaxed font-light">
            {item.content}
          </p>
        </motion.div>
      </div>

    </div>
  );
};

/* ───────────────────────── MAIN COMPONENT ───────────────────────── */

export default function NagpalTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  // Calculate full height fill for the center spine
  const scaleY = smoothProgress;

  return (
    <section
      ref={sectionRef}
      className={`relative w-full py-24 md:py-32 overflow-hidden bg-[#FAF8F4] ${poppins.variable} font-sans`}
    >
      {/* ─── SUBTLE BACKGROUND TEXTURE & GLOW ─── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: "url('/images/noise.png')",
          backgroundSize: "120px 120px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(184,147,90,0.06)_0%,transparent_70%)] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* ─── INTRO HEADER ─── */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-[#B8935A]/50" />
            <p className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-[#B8935A] font-medium">
              OUR LEGACY
            </p>
            <div className="w-8 h-[1px] bg-[#B8935A]/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[64px] font-cormorant font-semibold text-[#1A1918] tracking-tight mb-6 leading-tight"
          >
            Nagpal Group Journey
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[14px] md:text-[16px] text-[#1A1918]/60 font-light max-w-xl font-dm tracking-wide leading-relaxed"
          >
            From a small setup in Amritsar to a global watch distribution powerhouse. 
            A legacy built on precision, partnership, and timeless vision.
          </motion.p>
        </div>

        {/* ─── VERTICAL STORYTELLING TIMELINE ─── */}
        <div className="relative w-full pb-20">
          
          {/* THE SPINE (Background Track) */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 -translate-x-1/2 w-[2px] bg-[#1A1918]/[0.05] rounded-full" />
          
          {/* THE SPINE (Animated Fill) */}
          <motion.div 
            className="absolute top-0 left-6 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#B8935A] via-[#E8720C] to-[#1565C0] rounded-full origin-top z-10"
            style={{ scaleY, height: "100%" }}
          >
            {/* Glowing dot leading the animated spine */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(184,147,90,0.8)] border-2 border-[#B8935A]" />
          </motion.div>

          {/* THE MILESTONES & ERAS */}
          <div className="relative z-20 flex flex-col pt-10">
            {flatTimeline.map((item, i) => {
              const isFirstInEra = i === 0 || item.era !== flatTimeline[i - 1].era;
              
              return (
                <React.Fragment key={`${item.year}-${i}`}>
                  {isFirstInEra && <EraMarker era={item.era} />}
                  <MilestoneCard item={item} index={i} />
                </React.Fragment>
              );
            })}
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
