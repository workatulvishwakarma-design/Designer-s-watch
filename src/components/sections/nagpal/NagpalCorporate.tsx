"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CLIENTS = [
  { name: "Tata Indicom", cat: "Telecom" },
  { name: "Reebok", cat: "Sportswear" },
  { name: "Nikon", cat: "Electronics" },
  { name: "ICICI", cat: "Banking" },
  { name: "Siyaram", cat: "Textiles" },
  { name: "Donear", cat: "Fashion" },
  { name: "Amway", cat: "FMCG" },
  { name: "Pharma Partners", cat: "Healthcare" },
];

const CAPS = [
  { n: "01", t: "Corporate Gifting", d: "Large-volume production for corporate campaigns. Bespoke branding, custom dials, and promotional packaging — delivering lakhs of units with consistent quality." },
  { n: "02", t: "OEM Manufacturing", d: "End-to-end watch manufacturing for global brands. From design consultation to final QC — leveraging four generations of craft expertise at industrial scale." },
  { n: "03", t: "Brand Distribution", d: "National distribution network built over 80+ years. From Tissot and Daniel Klein to Mathey Tissot and D1 Milano — a trusted channel for international brands." },
  { n: "04", t: "Global Exports", d: "International reach spanning London, Singapore, Bahrain, and Oman. Designing and producing for online-first brands and international retail partners." },
];

function CapCard({ c, i }: { c: typeof CAPS[0]; i: number }) {
  const [h, setH] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
      className="relative p-7 lg:p-9 rounded-2xl overflow-hidden"
      style={{
        background: h ? "linear-gradient(180deg, rgba(0,57,38,0.08), rgba(184,147,90,0.04))" : "#FAFAF8",
        border: `1px solid ${h ? "rgba(0,57,38,0.15)" : "#EDE8DF"}`,
        transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
        transform: h ? "translateY(-4px)" : "translateY(0)",
        boxShadow: h ? "0 20px 50px rgba(0,0,0,0.06), 0 0 30px rgba(0,57,38,0.04)" : "0 2px 8px rgba(0,0,0,0.02)",
      }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    >
      <span className="absolute top-4 right-6 font-cormorant italic text-[64px] leading-none select-none pointer-events-none"
        style={{ color: h ? "rgba(0,57,38,0.06)" : "rgba(184,147,90,0.06)", transition: "color 0.5s ease" }}>{c.n}</span>
      <h4 className="font-cormorant text-[26px] lg:text-[30px] text-[#1A1918] leading-[1.15] mb-4 relative z-10">
        {c.t}<span className="text-[#B8935A]">.</span>
      </h4>
      <div className="h-px mb-4" style={{ background: "linear-gradient(90deg, #B8935A, transparent)", width: h ? 60 : 40, transition: "width 0.5s ease" }} />
      <p className="font-dm text-[14px] text-[#5C5752] leading-[1.85] relative z-10">{c.d}</p>
    </motion.div>
  );
}

export default function NagpalCorporate() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative bg-[#FAF8F4] py-20 lg:py-28 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] pointer-events-none opacity-8 blur-[120px] -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(0,57,38,0.15), transparent)" }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="font-dm uppercase text-[10px] tracking-[0.4em] text-[#B8935A] mb-4">BEYOND OUR OWN BRANDS</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-cormorant text-[38px] sm:text-[48px] lg:text-[58px] text-[#1A1918] leading-[1.08]">
            Corporate & <span className="italic font-light">Manufacturing</span><span className="text-[#003926]">.</span>
          </motion.h2>
          <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
            className="w-14 h-px mx-auto mt-6 origin-center" style={{ background: "linear-gradient(90deg, transparent, #003926, #B8935A, #003926, transparent)" }} />
          <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}
            className="font-dm text-[14px] text-[#9C9690] mt-5 max-w-xl mx-auto leading-[1.85]">
            From corporate gifting at scale to OEM manufacturing for global brands — our capabilities extend far beyond retail.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {CAPS.map((c, i) => <CapCard key={c.n} c={c} i={i} />)}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center">
          <p className="font-dm uppercase text-[10px] tracking-[0.3em] text-[#B8935A] mb-6">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex flex-wrap justify-center gap-4">
            {CLIENTS.map((cl) => (
              <span key={cl.name} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-dm text-[12px] text-[#5C5752] bg-white border border-[#EDE8DF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#003926]" />{cl.name}<span className="text-[10px] text-[#9C9690]">· {cl.cat}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
