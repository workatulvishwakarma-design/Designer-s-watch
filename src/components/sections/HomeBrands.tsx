"use client";

import { motion } from "framer-motion";

export default function HomeBrands() {
  return (
    <section className="bg-[#FAF8F4] py-20">
      {/* header */}
      <div className="text-center mb-16">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#B8935A] font-dm">
          OUR BRANDS
        </p>
        <h2 className="font-cormorant text-[52px] text-[#1A1918] mt-2">
          Two Identities. One Foundation.
        </h2>
        <div className="w-12 h-[0.5px] bg-[#B8935A] mx-auto mt-4" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* D'SIGNER card */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#111110] rounded-2xl overflow-hidden relative hover:translate-y-[-8px] hover:shadow-[0_24px_64px_rgba(0,0,0,0.12)] hover:border hover:border-[rgba(184,147,90,0.3)] transition-all duration-400"
        >
          <div className="h-[380px] bg-[#1A1918] flex items-center justify-center p-10">
            <img
              src="/images/img01.png"
              alt="D'SIGNER"
              className="object-contain"
              style={{ filter: 'drop-shadow(0 20px 60px rgba(184,147,90,0.2))' }}
            />
          </div>
          <div className="px-9 py-9 border-t border-[rgba(184,147,90,0.15)]">
            <h3 className="font-bebas text-[44px] text-white">D&apos;SIGNER</h3>
            <div className="w-10 h-[0.5px] bg-[#B8935A] mt-2 mb-3" />
            <p className="font-dm text-[13px] text-white/55 mb-4">
              Design-led premium watches built for refined aesthetics and international standards.
            </p>
            <p className="font-cormorant text-[18px] text-[#B8935A]">
              ₹1,299 — ₹4,999
            </p>
            <button className="w-full mt-4 bg-[#B8935A] text-[#111110] py-3 rounded-lg font-dm text-[13px] font-medium">
              Shop D&apos;Signer →
            </button>
          </div>
        </motion.div>

        {/* ESCORT card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-[#F2EDE6] rounded-2xl overflow-hidden relative hover:translate-y-[-8px] hover:shadow-[0_24px_64px_rgba(0,0,0,0.12)] hover:border hover:border-[rgba(184,147,90,0.3)] transition-all duration-400"
        >
          <div className="h-[380px] bg-[#EDE8E0] flex items-center justify-center p-10">
            <img
              src="/images/img02.png"
              alt="ESCORT"
              className="object-contain"
              style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.08))' }}
            />
          </div>
          <div className="px-9 py-9">
            <h3 className="font-bebas text-[44px] text-[#1A1918]">ESCORT</h3>
            <div className="w-10 h-[0.5px] bg-[#B8935A] mt-2 mb-3" />
            <p className="font-dm text-[13px] text-[#6B6560] mb-4">
              Reliable, durable watches offering everyday performance and lasting value.
            </p>
            <p className="font-cormorant text-[18px] text-[#B8935A]">
              ₹799 — ₹2,499
            </p>
            <button className="w-full mt-4 bg-[#1A1918] text-white py-3 rounded-lg font-dm text-[13px] font-medium">
              Shop Escort →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
