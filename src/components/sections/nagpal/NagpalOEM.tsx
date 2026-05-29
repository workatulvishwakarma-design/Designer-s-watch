"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const OEM_POINTS = [
  { title: "Design Consultation", desc: "From sketch to production-ready CAD — our design team works alongside global brands to translate concepts into manufacturable timepieces." },
  { title: "Component Sourcing", desc: "Decades of relationships with Swiss, Japanese, and Chinese component suppliers. Movements, crystals, crowns, and cases sourced to exact specification." },
  { title: "Assembly & QC", desc: "Each watch passes through 12+ quality checkpoints. From movement installation to final water-resistance testing — precision at every stage." },
  { title: "Custom Branding", desc: "Full customisation: dial printing, case engraving, strap embossing, packaging design. Your brand, built to your exact standards." },
];

export default function NagpalOEM() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#111110" }}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] pointer-events-none opacity-10 blur-[120px] -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(0,57,38,0.5), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#B8935A]" />
              <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#B8935A]">OEM MANUFACTURING</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
              className="font-cormorant text-[38px] sm:text-[48px] lg:text-[58px] text-white leading-[1.08]">
              Your Vision<span className="text-[#B8935A]">,</span><br />
              <span className="italic font-light text-white/80">Our Craft</span><span className="text-[#003926]">.</span>
            </motion.h2>
            <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
              className="w-14 h-px mt-6 origin-left" style={{ background: "linear-gradient(90deg, #B8935A, transparent)" }} />
          </div>
          <div className="flex items-end">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}
              className="font-dm text-[15px] text-white/45 leading-[2.0] max-w-lg">
              Since 2015, Designer World has manufactured watches for global and national brands. Our integrated facility handles everything from concept to shipping — at volumes ranging from 500 to 500,000+ units.
            </motion.p>
          </div>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {OEM_POINTS.map((point, i) => (
            <motion.div key={point.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative p-7 rounded-2xl overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(184,147,90,0.08)",
                transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {/* Number */}
              <span className="absolute top-4 right-6 font-cormorant italic text-[48px] leading-none select-none pointer-events-none text-white/[0.04]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="font-cormorant text-[24px] text-white leading-[1.15] mb-3 relative z-10">
                {point.title}<span className="text-[#B8935A]">.</span>
              </h4>
              <div className="w-8 h-px mb-3" style={{ background: "rgba(184,147,90,0.3)" }} />
              <p className="font-dm text-[13px] text-white/40 leading-[1.85] relative z-10">{point.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }} className="text-center mt-14">
          <a href="/contact" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-dm text-[12px] tracking-[0.15em] uppercase border border-[rgba(184,147,90,0.3)] text-[#B8935A] hover:bg-[#B8935A] hover:text-[#111110] transition-all duration-500">
            <span>Enquire About OEM</span>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
              <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
