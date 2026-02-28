"use client";

import { motion } from "framer-motion";

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
      className="relative py-10 md:py-14 lg:py-20 overflow-hidden"
      style={{ backgroundColor: "#F7F3EE" }}
    >
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0" aria-hidden>
        <filter id="nagpal-value-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#nagpal-value-grain)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-12 lg:gap-16 items-start">
          {/* Left: Title block - sticky on desktop */}
          <div className="relative lg:sticky lg:top-32">
            <p
              className="font-body text-[11px] tracking-[0.3em] mb-6"
              style={{ color: "#B8935A" }}
            >
              ECOSYSTEM
            </p>
            <div className="relative">
              <div
                className="font-display absolute bottom-[-20px] left-0 leading-none pointer-events-none select-none"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(184,147,90,0.07)",
                  fontSize: "clamp(100px, 15vw, 200px)",
                }}
              >
                1940
              </div>
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0 }}
                  className="font-heading text-[48px] md:text-[60px] lg:text-[72px] font-light leading-none"
                  style={{ color: "#1A1918" }}
                >
                  Operating
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="font-heading text-[48px] md:text-[60px] lg:text-[72px] font-light leading-none"
                  style={{ color: "#1A1918" }}
                >
                  Across the
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="font-heading text-[48px] md:text-[60px] lg:text-[72px] font-bold italic leading-none"
                  style={{ color: "#003926" }}
                >
                  Watch
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="font-heading text-[48px] md:text-[60px] lg:text-[72px] font-light leading-none"
                  style={{ color: "#1A1918" }}
                >
                  Value Chain
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right: Description + chain */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading italic text-[20px] md:text-[24px] mb-8 md:mb-12"
              style={{ color: "#1A1918", lineHeight: 1.8 }}
            >
              Nagpal Group functions as a vertically integrated watch business — combining sourcing,
              component distribution, OEM manufacturing, and in-house brand development under one
              structured ecosystem.
            </motion.p>

            {/* Visual chain - flex wrap, dot connectors */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              {chainNodes.map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-center gap-1"
                >
                  {i > 0 && (
                    <span className="text-[#B8935A] opacity-40 text-xs self-center mx-1">
                      • • •
                    </span>
                  )}
                  <span
                    className="inline-flex items-center px-6 py-3 rounded-full bg-white border-[1.5px] font-body text-[13px] transition-colors duration-300 hover:border-[#B8935A] hover:text-[#B8935A]"
                    style={{ borderColor: "#E0D8CE", color: "#1A1918" }}
                  >
                    {label}
                  </span>
                  {i < chainNodes.length - 1 && (
                    <span className="text-[#B8935A] opacity-40 text-xs self-center mx-1">
                      • • •
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mini stats - stack on mobile, row on desktop */}
            <div className="flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4">
              {miniStats.map((stat) => (
                <span
                  key={stat}
                  className="font-body text-[12px] tracking-[0.1em]"
                  style={{ color: "#6B6560" }}
                >
                  {stat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
