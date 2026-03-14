"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";

/* ───────────────────────── FAQ DATA ───────────────────────── */
const faqs = [
  {
    question: "What materials are used in your watches?",
    answer:
      "Our timepieces are crafted from premium materials including 316L surgical-grade stainless steel, scratch-resistant sapphire crystal, and genuine top-grain leather or durable silicone for straps, ensuring both luxury and longevity.",
  },
  {
    question: "Do you offer warranty on your products?",
    answer:
      "Yes, all our watches come with a comprehensive 2-year international warranty covering any manufacturing defects. Please register your watch on our portal after purchase.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "We offer free express shipping globally. Domestic orders are typically delivered within 2-4 business days, while international shipments may take 5-10 business days depending on customs clearance.",
  },
  {
    question: "Can I explore multiple collections online?",
    answer:
      "Absolutely. Our entire catalog, including exclusive D'SIGNER and Escort collections, is available to browse and purchase directly through our official E-Store with secure checkout.",
  },
  {
    question: "Do you support bulk or business orders?",
    answer:
      "Yes. We have a dedicated B2B division that handles bulk corporate gifting, retail distribution, and comprehensive OEM/Private Label manufacturing services. Please reach out via our Partner portal.",
  },
];

/* ───────────────────────── FAQ COMPONENT ───────────────────────── */
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  return (
    <section className="relative w-full bg-white py-20 lg:py-32 overflow-hidden">
      
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,57,38,0.02)_0%,transparent_70%)] pointer-events-none rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 z-0" />

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
            Find answers to the most common queries about our watches, collections, shipping, and support policies. Everything you need, clearly defined in one place.
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
              If you need additional help, our dedicated concierge team is perfectly positioned to guide you with product details, direct orders, and detailed support queries.
            </p>
            
            <button
              onClick={() => window.location.href = "mailto:support@nagpalgroup.com"}
              className="relative w-full overflow-hidden flex items-center justify-between px-8 py-4 bg-[#1A1918] text-white rounded-full group/btn transition-all duration-500 hover:shadow-[0_12px_30px_rgba(0,57,38,0.25)] hover:-translate-y-1"
            >
              <div className="absolute inset-0 w-full h-full bg-[#003926] scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:scale-x-100" />
              <span className="relative z-10 font-dm text-[12px] font-medium tracking-[0.15em] uppercase">
                Contact Us
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
  );
}
