"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const STATS = [
  { value: "127", label: "Quality Checkpoints" },
  { value: "4", label: "Generations" },
  { value: "75+", label: "Years of Horology" },
];

export default function HeritageSection() {
  return (
    <section id="story" className="relative overflow-hidden" style={{ background: "#FAF8F4" }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Craftsmanship Macro Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-neutral-900 order-2 lg:order-1"
          >
            <Image
              src="/images/new-content/home2-craftsmanship.png"
              alt="Watchmaking Assembly"
              fill
              className="object-cover transition-transform duration-700 ease-out hover:scale-103"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gold border accent */}
            <div className="absolute inset-0 border border-[#D4C5A0]/10 rounded-2xl pointer-events-none" />
          </motion.div>

          {/* RIGHT: Story and Heritage Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start order-1 lg:order-2"
          >
            <span className="font-dm text-[10px] tracking-[0.3em] text-[#003926] font-bold block mb-4 uppercase">
              ✦ CRAFTED BY HAND ✦
            </span>
            <h2 className="font-cormorant text-[36px] sm:text-[50px] text-[#1A1918] font-light leading-[1.15] mb-6">
              Horological Heritage &<br />
              <span className="italic font-normal text-[#B8935A]">Master Craftsmanship</span>
            </h2>
            <div className="w-20 h-[1px] mb-8" style={{ background: "linear-gradient(90deg, #003926, rgba(0,57,38,0.15))" }} />

            <p className="font-dm text-[14px] text-[#5C5750] leading-[1.85] mb-5">
              Every single timepiece is assembled piece by piece in our clean-room facilities. From setting the rubies on the balance bridge to placing the delicate index pointers, the process requires absolute calm, steady hands, and generations of expert knowledge.
            </p>
            <p className="font-dm text-[14px] text-[#5C5750] leading-[1.85] mb-10">
              We apply an intense testing regiment where each finished unit undergoes 127 individual quality checks over a 14-day cycle to ensure timekeeping accuracy and structural durability.
            </p>

            {/* Stat Counters with gold accents */}
            <div className="grid grid-cols-3 gap-6 w-full pt-8 border-t border-[#E0D8CE]">
              {STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                >
                  <span className="font-cormorant text-[34px] md:text-[44px] leading-none block font-semibold"
                    style={{ color: "#003926" }}
                  >
                    {stat.value}
                  </span>
                  <span className="font-dm text-[9px] text-[#9C9690] uppercase tracking-[0.15em] block mt-2">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
