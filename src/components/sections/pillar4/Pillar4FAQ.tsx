"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";

/* ───────────────────────── FAQ DATA FOR NAGPAL ───────────────────────── */
const faqs = [
  {
    question: "What does Nagpal Group specialize in?",
    answer: "With decades of legacy, Nagpal Group specializes in comprehensive watch manufacturing, private label development, and nationwide distribution. The group acts as a vertically integrated partner handling everything from design to retail delivery."
  },
  {
    question: "Does Nagpal Group support OEM / private label manufacturing?",
    answer: "Yes, the OEM division provides end-to-end solutions for brands looking to launch or scale their watch collections. Nagpal Group manages sourcing, assembly, quality control, and testing to international standards."
  },
  {
    question: "Which brands and distribution categories does Nagpal Group handle?",
    answer: "Nagpal Group manages a diverse portfolio of in-house and partnered brands across premium, lifestyle, and everyday categories. The flagship brand D'SIGNER leads the luxury segment, while Escort caters to the lifestyle market."
  },
  {
    question: "Does Nagpal Group work with retailers and business partners?",
    answer: "Absolutely. Nagpal Group maintains a vast pan-India distribution network and actively collaborates with regional distributors, large-format retail chains, and independent watch boutiques."
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

export default function Pillar4FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
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
            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-[#003926]/20 bg-[#F0F7F4] text-[10px] md:text-[11px] font-montserrat tracking-[0.2em] font-bold text-[#003926] uppercase">
              FAQ / Support
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.06em] leading-[1.15] text-[#1A1918] mb-6"
          >
            Frequently Asked <br className="hidden sm:block" />
            <span className="text-[#003926] font-light">Questions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-montserrat text-[#1A1918]/70 text-[13px] sm:text-[14px] font-normal leading-relaxed max-w-[460px] mb-12"
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
            <h3 className="font-montserrat font-bold text-[20px] md:text-[24px] uppercase tracking-[0.04em] text-[#1A1918] mb-3 transition-colors duration-300 group-hover:text-[#003926]">
              Still Have Questions?
            </h3>
            <p className="font-montserrat text-[13px] text-[#1A1918]/60 font-normal leading-relaxed mb-8">
              If you need additional information about business partnerships, bulk orders, or OEM opportunities, our dedicated business team is here to guide you.
            </p>
            
            <button
              onClick={() => window.location.href = "mailto:info@nagpalgroup.com"}
              className="relative w-full overflow-hidden flex items-center justify-between px-8 py-4 bg-[#1A1918] text-white rounded-full group/btn transition-all duration-500 hover:shadow-[0_12px_30px_rgba(0,57,38,0.25)] hover:-translate-y-1 cursor-pointer"
            >
              <div className="absolute inset-0 w-full h-full bg-[#003926] scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:scale-x-100" />
              <span className="relative z-10 font-montserrat text-[11px] font-bold tracking-[0.18em] uppercase">
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
                  className="relative z-10 w-full flex items-center justify-between p-6 md:p-8 text-left outline-none cursor-pointer"
                >
                  <span 
                    className={`font-montserrat text-[14px] sm:text-[15px] md:text-[16px] font-semibold tracking-wide pr-8 transition-colors duration-300 ${
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
                        <p className="font-montserrat text-[13px] sm:text-[14px] font-normal leading-relaxed text-[#1A1918]/70 m-0">
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
  );
}
