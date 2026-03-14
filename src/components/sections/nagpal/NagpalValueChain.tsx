"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const chainNodes = [
  "Sourcing",
  "Distribution",
  "OEM Mfg",
  "Brand Dev",
];

const miniStats = ["4 Decades", "Vertically Integrated", "Pan-India Presence"];

export default function NagpalValueChain() {
  return (
    <section
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#F7F3EE" }}
    >
      {/* ── Subtle Background Texture ── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0" aria-hidden>
        <filter id="nagpal-value-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#nagpal-value-grain)" />
      </svg>
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(184,147,90,0.06)_0%,transparent_60%)] pointer-events-none rounded-full z-0" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* ── 3-COLUMN EDITORIAL GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          
          {/* 1. LEFT SIDE: Refined Heading Block */}
          <div className="flex flex-col relative order-1 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-dm text-[10px] tracking-[0.3em] font-medium mb-6 uppercase"
              style={{ color: "#B8935A" }}
            >
              ECOSYSTEM
            </motion.p>
            
            <div className="relative">
              {/* Refined subtle background watermark */}
              <div
                className="font-cormorant absolute -top-8 -left-4 leading-none pointer-events-none select-none opacity-40 z-0"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(184,147,90,0.15)",
                  fontSize: "clamp(80px, 10vw, 140px)",
                }}
              >
                1940
              </div>
              
              <div className="relative z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="font-cormorant text-[40px] md:text-[46px] lg:text-[54px] font-medium leading-[1.1] text-[#1A1918]"
                >
                  Operating <br/>
                  Across the <br/>
                  <span className="italic text-[#003926]">Watch</span> <br/>
                  Value Chain
                </motion.h2>
              </div>
            </div>
          </div>

          {/* 2. CENTER: Premium Image Anchor (threeimg3) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
            className="relative w-full aspect-[4/5] max-w-[400px] mx-auto flex items-center justify-center order-first md:order-last lg:order-2"
          >
            <div className="absolute inset-0 bg-[#FAF8F4]/60 backdrop-blur-md rounded-2xl border border-[#1A1918]/[0.05] shadow-[0_20px_50px_rgb(0,0,0,0.06)]" />
            <div className="absolute inset-3 border border-[#B8935A]/[0.15] rounded-[14px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[radial-gradient(circle,rgba(184,147,90,0.15)_0%,transparent_60%)] rounded-full z-0" />
            
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-[90%] h-[90%] z-10 lg:w-[100%] lg:-ml-4 drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)] mix-blend-multiply"
            >
              <Image
                src="/images/threeimg3-nobg.png" // Used the processed transparent version
                alt="Nagpal Group Eco-System Watch"
                fill
                className="object-contain" // Replaced standard nagpal2.png image with the premium cutout requested
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </motion.div>
          </motion.div>

          {/* 3. RIGHT SIDE: Refined Paragraph & Info */}
          <div className="flex flex-col justify-center order-last lg:order-3 pt-6 lg:pt-0">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-dm font-light text-[15px] lg:text-[16px] text-[#1A1918]/80 leading-relaxed mb-10 max-w-[420px]"
            >
              Nagpal Group functions as a vertically integrated watch business — seamlessly combining global sourcing, vast component distribution, OEM manufacturing, and highly successful in-house brand development under one structured ecosystem.
            </motion.p>

            {/* Visual chain nodes */}
            <div className="flex flex-col gap-3 mb-10">
              {chainNodes.map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-2 h-2 rounded-full bg-[#B8935A]/40 group-hover:bg-[#B8935A] transition-colors" />
                  <span className="font-dm text-[14px] text-[#1A1918]/90 tracking-wide font-medium">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Refined Mini Stats line */}
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.7 }}
               className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-6 border-t border-[#1A1918]/10"
            >
              {miniStats.map((stat, i) => (
                <div key={stat} className="flex items-center gap-3">
                  <span className="font-dm text-[11px] uppercase tracking-[0.1em] font-medium text-[#1A1918]/50 hover:text-[#B8935A] transition-colors cursor-default">
                    {stat}
                  </span>
                  {i < miniStats.length - 1 && (
                     <div className="w-[1px] h-3 bg-[#1A1918]/15" />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
