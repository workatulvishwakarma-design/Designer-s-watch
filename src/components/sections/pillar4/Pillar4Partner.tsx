"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";

export default function Pillar4Partner() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="partner"
      className="relative overflow-hidden bg-white"
    >
      {/* ── Premium Split-Layout Hero ── */}
      <div className="relative w-full min-h-[85vh] flex items-center pt-28 pb-20 justify-center px-6 lg:px-12 xl:px-20 z-10">

        {/* Ambient radial glow for depth */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(0,57,38,0.03)_0%,transparent_70%)] pointer-events-none rounded-full transform translate-x-1/4 -translate-y-1/4" />

        <div className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── LEFT SIDE: Text, Highlights & CTA ── */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-[1px] bg-[#B8935A]/50" />
              <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#B8935A] font-bold font-montserrat">
                BUSINESS PARTNERSHIPS
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.06em] leading-[1.15] mb-6 text-[#1A1918]"
            >
              Collaborate With a <br className="hidden sm:block" />
              <span className="text-[#003926] font-light">Legacy Brand</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-montserrat text-[13px] sm:text-[14px] leading-[1.85] text-[#1A1918]/70 font-normal max-w-[540px] mb-10"
            >
              Whether you are a brand, retailer, distributor, or manufacturing partner, Nagpal Group offers decades of market expertise, trusted networks, and scalable collaboration opportunities across watches, accessories, distribution, and private labeling.
            </motion.p>

            {/* Trust Highlights Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-12 w-full"
            >
              {[
                "Private Label & OEM Support",
                "Nationwide Distribution",
                "Global Brand Partnerships",
                "Retail & Export Operations",
              ].map((highlight, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white border border-[#B8935A]/40 flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="w-3 h-3 text-[#B8935A]" strokeWidth={2.5} />
                  </div>
                  <span className="font-montserrat text-[12px] sm:text-[13px] text-[#1A1918]/85 font-medium tracking-wide">
                    {highlight}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => {
                  window.location.href = "mailto:info@nagpalgroup.com";
                }}
                className="group relative px-8 py-4 bg-[#003926] text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_12px_30px_rgba(0,57,38,0.25)] hover:-translate-y-1 cursor-pointer"
              >
                <span className="relative z-10 font-montserrat text-[11px] font-bold tracking-[0.18em] uppercase">
                  Contact Our Team
                </span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-[#1A1918]/20" />
              </button>
            </motion.div>
          </div>

          {/* ── RIGHT SIDE: Luxury Framed Visual ── */}
          <div className="relative w-full h-[550px] md:h-[650px] lg:h-[750px] flex items-center justify-center lg:justify-end perspective-[1200px]">
            <motion.div
              initial={{ opacity: 0, x: 40, rotateY: 8 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.25 }}
              className="relative w-full h-full max-h-[750px] max-w-[480px] lg:max-w-[520px] bg-white rounded-[2.5rem] border border-[#EDE8DF] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.06)] p-6 sm:p-10 flex flex-col items-center justify-center group overflow-hidden"
            >
              {/* Inner frame line for luxury art-gallery feel */}
              <div className="absolute inset-4 border border-[#1A1918]/[0.04] rounded-[2rem] pointer-events-none z-20 transition-colors duration-700 group-hover:border-[#B8935A]/20" />

              {/* Deep immersive radial glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(184,147,90,0.12)_0%,transparent_70%)] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110 z-0" />

              {!imgError ? (
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-[90%] h-[90%] z-10 flex items-center justify-center"
                >
                  <Image
                    src="/images/threeimg3-nobg.png"
                    alt="Nagpal Group Partnership"
                    fill
                    className="object-contain opacity-95 transition-transform duration-1000 group-hover:scale-[1.05]"
                    style={{
                      filter: "drop-shadow(0px 25px 35px rgba(0,0,0,0.10)) drop-shadow(0px 10px 15px rgba(184,147,90,0.10))"
                    }}
                    onError={() => setImgError(true)}
                    priority
                  />
                </motion.div>
              ) : (
                <div className="w-full h-40 rounded-lg flex items-center justify-center bg-[#B8935A]/5 z-10" />
              )}

              {/* Minimal floating accent badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-10 left-10 z-30 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-[0_10px_30px_rgba(184,147,90,0.15)] border border-[#EDE8DF]"
              >
                <p className="font-montserrat text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1918]">
                  Global Reach
                </p>
              </motion.div>
            </motion.div>

            {/* Subtle decorative floating elements */}
            <motion.div
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[15%] right-[5%] w-4 h-4 rounded-full bg-gradient-to-tr from-[#B8935A] to-[#D4AA72] blur-[2px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
