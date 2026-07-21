"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function WatchShowcase() {
  return (
    <section className="relative overflow-hidden text-white" style={{ background: "#003926" }}>
      {/* Background ambient circular shadows */}
      <div className="absolute top-1/2 left-[10%] w-[600px] h-[600px] pointer-events-none opacity-[0.08] blur-[150px]"
        style={{ background: "radial-gradient(circle, rgba(212,197,160,0.5), transparent)" }}
      />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #D4C5A0 0.3px, transparent 0)", backgroundSize: "35px 35px" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-24 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT: Cinematic Water Splash Ad (7 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-[#082017]"
          >
            <Image
              src="/images/new-content/home2-showcase.png"
              alt="Bespoke Royal Blue Tourbillon"
              fill
              className="object-cover transition-transform duration-700 ease-out hover:scale-103"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 border border-[#D4C5A0]/10 rounded-2xl pointer-events-none" />
            
            {/* Corner badge */}
            <div className="absolute top-5 left-5 z-10">
              <span className="font-dm text-[8px] tracking-[0.2em] uppercase text-[#D4C5A0] bg-[#003926]/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#D4C5A0]/20">
                Limited Edition
              </span>
            </div>
          </motion.div>

          {/* RIGHT: Flagship Spec Sheet & Buy CTA (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col items-start relative z-10"
          >
            <span className="font-dm text-[10px] tracking-[0.3em] text-[#D4C5A0] font-bold block mb-4 uppercase">
              ✦ FLAGSHIP SHOWCASE
            </span>
            <h2 className="font-cormorant text-[36px] sm:text-[50px] leading-[1.15] font-light mb-2">
              The Royal Ocean
            </h2>
            <h3 className="font-cormorant text-[28px] sm:text-[38px] leading-[1.15] font-light italic text-[#D4C5A0] mb-6">
              Diver Special Edition
            </h3>
            <div className="w-16 h-[1px] bg-[#D4C5A0] mb-8" />

            <p className="font-dm text-[14px] text-white/65 leading-[1.85] mb-8">
              Engineered for extreme performance and unmatched aesthetic elegance. Featuring a sunburst royal blue dial, custom machined gold markers, and a reinforced 300m water-resistant stainless steel case.
            </p>

            {/* Spec Sheet Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-full font-dm text-[12px] border-t border-[#D4C5A0]/15 pt-8 mb-10">
              {[
                { label: "MOVEMENT", value: "Japanese Caliber 9015 Automatic" },
                { label: "CASE DIAMETER", value: "41.5 mm Stainless Steel" },
                { label: "GLASS TYPE", value: "Domed Anti-reflective Sapphire" },
                { label: "WATER RESISTANCE", value: "30 ATM (300 meters)" },
              ].map((spec) => (
                <div key={spec.label}>
                  <span className="text-[#D4C5A0] block font-bold tracking-[0.15em] uppercase mb-1.5 text-[9px]">
                    {spec.label}
                  </span>
                  <span className="text-white/70 text-[12px]">{spec.value}</span>
                </div>
              ))}
            </div>

            <Link
              href="/product/royal-ocean"
              className="group inline-flex items-center gap-3 px-10 py-4 rounded-sm font-dm text-[11px] tracking-[0.18em] uppercase bg-[#D4C5A0] text-[#003926] font-bold hover:bg-white shadow-xl transition-all duration-500 hover:-translate-y-0.5"
            >
              <span>Explore Series</span>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
