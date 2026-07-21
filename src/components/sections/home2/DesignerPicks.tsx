"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DesignerPicks() {
  return (
    <section className="bg-[#003926] py-24 md:py-32 relative overflow-hidden">
      {/* Background ambient gold glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.06] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,197,160,0.6), transparent)" }}
      />
      <div className="absolute bottom-0 left-[5%] w-[450px] h-[450px] opacity-[0.04] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent)" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Narrative & Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start relative z-10 text-white">
            <span className="font-dm text-[11px] tracking-[0.25em] text-[#D4C5A0] font-bold block mb-4">
              EDITORIAL CHOICE
            </span>
            <h2 className="font-cormorant text-[36px] sm:text-[50px] leading-[1.15] font-light max-w-lg mb-6">
              The Designer Picks
            </h2>
            <div className="w-12 h-[1px] bg-[#D4C5A0] mb-8" />
            
            <p className="font-dm text-[14px] text-white/70 leading-relaxed mb-6">
              A curated select list of horological statements that represents the peak of contemporary elegance and mechanical integrity. Hand-selected by our lead designer for their distinctive silhouettes and bold character.
            </p>
            <p className="font-dm text-[13px] text-white/50 leading-relaxed italic mb-8">
              "We sought to balance the visual weight of structural steel cases with the organic warmth of solid-color dials. The resulting pieces offer a rare, tactile relationship between time and skin."
            </p>

            <div className="flex flex-col gap-5 w-full">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full border border-[#D4C5A0]/30 flex items-center justify-center text-[#D4C5A0] font-dm text-[12px] font-bold shrink-0">
                  01
                </div>
                <div>
                  <h4 className="font-cormorant text-[18px] text-white font-medium">Grand-Horizon Tourbillon</h4>
                  <p className="font-dm text-[12px] text-white/40 mt-1">Exposed balance wheel offset at 6 o'clock.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full border border-[#D4C5A0]/30 flex items-center justify-center text-[#D4C5A0] font-dm text-[12px] font-bold shrink-0">
                  02
                </div>
                <div>
                  <h4 className="font-cormorant text-[18px] text-white font-medium">Bespoke Emerald Guilloché</h4>
                  <p className="font-dm text-[12px] text-white/40 mt-1">Radial textures engraving catching sunlight at angles.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Asymmetric Large Image (7 cols) */}
          <div className="lg:col-span-7 relative w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-[#0F3227]"
            >
              <Image
                src="/images/new-content/home2-designer.png"
                alt="Designer Pick Arrangement"
                fill
                className="object-cover object-center p-4 lg:p-6 transition-transform duration-700 ease-out hover:scale-103"
                sizes="(max-w-1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 border border-[#D4C5A0]/15 rounded-2xl pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
