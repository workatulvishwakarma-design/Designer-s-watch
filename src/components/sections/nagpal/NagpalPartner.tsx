"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, Plus, Minus, ArrowRight } from "lucide-react";

/* ───────────────────────── FAQ DATA FOR NAGPAL ───────────────────────── */
const faqs = [
  {
    question: "What does Nagpal Group specialize in?",
    answer: "With decades of legacy, Nagpal Group specializes in comprehensive watch manufacturing, private label development, and nationwide distribution. We act as a vertically integrated partner handling everything from design to retail delivery."
  },
  {
    question: "Does Nagpal Group support OEM / private label manufacturing?",
    answer: "Yes, our OEM division provides end-to-end solutions for brands looking to launch or scale their watch collections. We manage sourcing, assembly, quality control, and testing to international standards."
  },
  {
    question: "Which brands and distribution categories does Nagpal Group handle?",
    answer: "We manage a diverse portfolio of in-house and partnered brands across premium, lifestyle, and everyday categories. Our flagship brand D'SIGNER leads our luxury segment, while Escort caters to the lifestyle market."
  },
  {
    question: "Does Nagpal Group work with retailers and business partners?",
    answer: "Absolutely. We maintain a vast pan-India distribution network and actively collaborate with regional distributors, large-format retail chains, and independent watch boutiques."
  },
  {
    question: "Can businesses contact Nagpal Group for collaboration or sourcing?",
    answer: "Yes, our B2B team is perfectly positioned to assist with corporate gifting, bulk sourcing, wholesale distribution, and specialized brand collaborations."
  },
  {
    question: "What is the legacy and market presence of Nagpal Group?",
    answer: "Established with over four decades of expertise, Nagpal Group has evolved from a respected watchmaker into a leading horological powerhouse with a pan-India presence and global sourcing capabilities."
  }
];

export default function NagpalPartner() {
  const [imgError, setImgError] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <section
        id="partner"
        className="relative overflow-hidden"
        style={{ backgroundColor: "#F2EDE6" }}
      >
        {/* ── Premium Split-Layout Hero ── */}
        <div className="relative w-full min-h-[85vh] flex items-center pt-32 pb-20 justify-center px-6 lg:px-12 xl:px-20 z-10">
          
          {/* Subtle background noise texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
            style={{
              backgroundImage: "url('/images/noise.png')",
              backgroundSize: "120px 120px",
            }}
          />

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
                <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#B8935A] font-medium font-dm">
                  BUSINESS PARTNERSHIPS
                </p>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-cormorant text-4xl md:text-5xl lg:text-[52px] font-semibold leading-[1.1] mb-6 tracking-tight text-[#1A1918]"
              >
                Collaborate With a <br className="hidden sm:block" />
                <span className="text-[#003926]">Legacy Brand</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-dm text-[15px] md:text-[16px] leading-relaxed text-[#1A1918]/70 font-light max-w-[540px] mb-10"
              >
                Whether you are a brand, retailer, distributor, or manufacturing partner, Nagpal Group offers decades of market expertise, trusted networks, and scalable collaboration opportunities across watches, accessories, distribution, and private labeling.
              </motion.p>

              {/* Trust Highlights Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-12"
              >
                {[
                  "Private Label & OEM Support",
                  "Nationwide Distribution",
                  "Global Brand Partnerships",
                  "Retail & Export Operations",
                ].map((highlight, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FAF8F4] border border-[#B8935A]/30 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#B8935A]" strokeWidth={2.5} />
                    </div>
                    <span className="font-dm text-[13px] text-[#1A1918]/80 font-medium tracking-wide">
                      {highlight}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <button
                  onClick={() => {
                    document.getElementById("partner-faq-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative px-8 py-4 bg-[#003926] text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_12px_30px_rgba(0,57,38,0.25)] hover:-translate-y-1"
                >
                  <span className="relative z-10 font-dm text-[12px] font-medium tracking-[0.15em] uppercase">
                    Start a Partnership
                  </span>
                  <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-[#1A1918]/20" />
                </button>
                
                <button
                  onClick={() => {
                    window.location.href = "mailto:info@nagpalgroup.com";
                  }}
                  className="group relative px-8 py-4 bg-transparent border border-[#1A1918]/15 text-[#1A1918] rounded-full overflow-hidden transition-all duration-500 hover:border-[#1A1918]/30 hover:bg-[#FAF8F4]"
                >
                  <span className="relative z-10 font-dm text-[12px] font-medium tracking-[0.15em] uppercase transition-colors group-hover:text-[#003926]">
                    Contact Our Team
                  </span>
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
                className="relative w-full h-full max-h-[750px] max-w-[480px] lg:max-w-[520px] bg-[#FAF8F4]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] p-6 sm:p-10 flex flex-col items-center justify-center group overflow-hidden"
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
                      className="object-contain mix-blend-multiply opacity-95 transition-transform duration-1000 group-hover:scale-[1.05]"
                      style={{
                        filter: "drop-shadow(0px 25px 35px rgba(0,0,0,0.12)) drop-shadow(0px 10px 15px rgba(184,147,90,0.12))"
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
                  className="absolute bottom-10 left-10 z-30 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-[0_10px_30px_rgba(184,147,90,0.15)] border border-white"
                >
                  <p className="font-dm text-[9px] uppercase tracking-[0.2em] font-semibold text-[#1A1918]">
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

      {/* ── Partner FAQ Section ── */}
      <section id="partner-faq-section" className="relative w-full bg-white py-20 lg:py-32 overflow-hidden">
        
        {/* Subtle ambient background glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,57,38,0.02)_0%,transparent_70%)] pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3 z-0" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* ── LEFT SIDE: Intro & Support Card ── */}
          <div className="flex flex-col lg:sticky lg:top-32">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-[#003926]/20 bg-[#F0F7F4] text-[10px] md:text-[11px] font-dm tracking-[0.2em] font-medium text-[#003926] uppercase">
                FAQ / Support
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-cormorant text-[40px] md:text-[52px] lg:text-[64px] font-medium leading-[1.1] text-[#1A1918] mb-6 tracking-tight"
            >
              Frequently Asked <br className="hidden sm:block" />
              <span className="italic text-[#003926] font-semibold pr-2">Questions</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-dm text-[#1A1918]/70 text-[15px] lg:text-[17px] font-light leading-relaxed max-w-[460px] mb-12"
            >
              Learn more about Nagpal Group&apos;s manufacturing capabilities, robust distribution networks, and strategic partnership opportunities.
            </motion.p>

            {/* Support CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full max-w-[460px] bg-[#FAF8F4] border border-[#1A1918]/[0.06] rounded-[24px] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,57,38,0.05)] hover:border-[#003926]/10 group"
            >
              <h3 className="font-cormorant text-[26px] md:text-[30px] font-medium text-[#1A1918] mb-3 transition-colors duration-300 group-hover:text-[#003926]">
                Still Have Questions?
              </h3>
              <p className="font-dm text-[14px] text-[#1A1918]/60 font-light leading-relaxed mb-8">
                If you need additional information about business partnerships, bulk orders, or OEM opportunities, our dedicated business team is here to guide you.
              </p>
              
              <button
                onClick={() => window.location.href = "mailto:info@nagpalgroup.com"}
                className="relative w-full overflow-hidden flex items-center justify-between px-8 py-4 bg-[#1A1918] text-white rounded-full group/btn transition-all duration-500 hover:shadow-[0_12px_30px_rgba(0,57,38,0.25)] hover:-translate-y-1"
              >
                <div className="absolute inset-0 w-full h-full bg-[#003926] scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:scale-x-100" />
                <span className="relative z-10 font-dm text-[12px] font-medium tracking-[0.15em] uppercase">
                  Contact Our Team
                </span>
                <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 group-hover/btn:translate-x-1">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </button>
            </motion.div>
          </div>

          {/* ── RIGHT SIDE: Accordion Stack ── */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative bg-white border rounded-[20px] overflow-hidden transition-all duration-300 group ${
                    isOpen 
                      ? "border-[#003926]/30 shadow-[0_20px_50px_rgba(0,57,38,0.08)]" 
                      : "border-[#1A1918]/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#003926]/20 hover:shadow-[0_10px_30px_rgba(0,57,38,0.05)] hover:-translate-y-[2px]"
                  }`}
                >
                  {/* Subtle active state background tint */}
                  <div 
                    className={`absolute inset-0 bg-[#F0F7F4]/30 pointer-events-none transition-opacity duration-300 ${
                      isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                    }`} 
                  />

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="relative z-10 w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
                  >
                    <span 
                      className={`font-dm text-[16px] md:text-[18px] font-medium tracking-tight pr-8 transition-colors duration-300 ${
                        isOpen ? "text-[#003926]" : "text-[#1A1918] group-hover:text-[#003926]"
                      }`}
                    >
                      {faq.question}
                    </span>
                    
                    <div 
                      className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen 
                          ? "bg-[#003926] border-[#003926]" 
                          : "bg-transparent border-[#1A1918]/20 group-hover:border-[#003926] group-hover:bg-[#F0F7F4]"
                      }`}
                    >
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {isOpen ? (
                          <Minus className="w-5 h-5 text-white" strokeWidth={2} />
                        ) : (
                          <Plus className={`w-5 h-5 transition-colors duration-300 ${
                            isOpen ? "text-white" : "text-[#1A1918]/60 group-hover:text-[#003926]"
                          }`} strokeWidth={2} />
                        )}
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10"
                      >
                        <div className="px-6 pb-8 md:px-8 md:pb-10 pt-0">
                          <div className="w-full h-[1px] bg-[#1A1918]/[0.06] mb-6" />
                          <p className="font-dm text-[15px] font-light leading-relaxed text-[#1A1918]/70 m-0">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
