"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Building2, Factory, ShieldCheck, TrendingUp, CheckCircle, Award } from "lucide-react";

export default function OurExpertise() {
  return (
    <>
      {/* SECTION 1: Corporate & Institutional (Light Background) */}
      <section className="bg-white py-20 md:py-28 relative overflow-hidden" id="expertise">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Heading */}
          <div className="text-center mb-16 md:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-dm uppercase text-[11px] tracking-[0.3em] text-[#B8935A] mb-4 block"
            >
              Our Expertise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-[#1A1918] max-w-2xl mx-auto"
            >
              Manufacturing Excellence at Global Scale
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-[1px] bg-[#B8935A] mx-auto mt-6"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Corporate Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F4] flex items-center justify-center border border-[#EDE8DF]">
                  <Building2 size={20} className="text-[#B8935A]" />
                </div>
                <h3 className="font-cormorant text-3xl text-[#1A1918]">Corporate & Institutional</h3>
              </div>
              <p className="font-dm text-sm md:text-base text-[#6B6560] leading-relaxed mb-6">
                What began with trusted corporate gifting partnerships with labels like Donear and Siyaram has scaled into a multi-decade legacy in institutional B2B manufacturing. Nagpal Group is the silent engine behind some of the largest corporate timepiece orders in the country.
              </p>
              
              {/* Enhanced Interactive List Rows */}
              <div className="space-y-3.5">
                {[
                  { name: "TATA Indicom", text: "Over 50,000 units delivered with seamless precision." },
                  { name: "Reebok India", text: "Mammoth scale execution of over 1 Million units." },
                  { name: "ICICI Bank & Nikon", text: "100K+ and 300K+ units respectively, showcasing adaptability." },
                  { name: "Amway & Pharma Brands", text: "Consistent supply of 100K–200K high-quality units." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl border border-[#EDE8DF]/40 bg-[#FAF8F4]/30 hover:bg-[#FAF8F4] hover:border-[#D4C5A0]/30 transition-all duration-300">
                    <CheckCircle size={16} className="text-[#B8935A] mt-0.5 shrink-0" />
                    <p className="font-dm text-xs md:text-sm text-[#4E4944] leading-relaxed">
                      <strong className="text-[#1A1918] font-semibold">{item.name}:</strong> {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/nagpal-group"
                  className="group relative inline-flex items-center gap-3 font-dm text-[12px] tracking-[0.2em] uppercase text-[#B8935A]"
                >
                  <span className="relative">
                    Learn More
                    <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out bg-[#B8935A]" />
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="group-hover:translate-x-1 transition-transform duration-500"
                  >
                    <path
                      d="M4 10h12M12 6l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Corporate Image (Partner Logo Grid) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative h-[320px] md:h-[400px] rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-[#EDE8DF] bg-white group flex items-center justify-center p-6 md:p-10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/new-content/partner-2.png"
                alt="Corporate Clients"
                className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OEM & Private Label (Brand Green Background) */}
      <section className="bg-[#003926] text-white py-24 md:py-32 relative overflow-hidden">
        {/* Ambient glows for deep luxury background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,197,160,0.06)_0%,transparent_70%)] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Image (Left on Desktop, with modern shadow/frame) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative h-[450px] rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.35)] border border-white/10 group order-2 lg:order-1"
            >
              <Image
                src="/images/mumbai.png"
                alt="OEM Facility"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* OEM Side (Right on Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Factory size={20} className="text-[#D4C5A0]" />
                </div>
                <span className="font-dm uppercase text-[10px] tracking-[0.25em] text-[#D4C5A0]">B2B Division</span>
              </div>
              
              <h3 className="font-cormorant text-4xl sm:text-5xl text-white mb-6 leading-tight">
                OEM & Private Label
              </h3>
              
              <p className="font-dm text-sm md:text-base text-[#EDE8DF]/80 leading-relaxed mb-8">
                The Nagpal Group provides end-to-end private label manufacturing for prominent domestic lifestyle brands and major e-commerce platforms. From design conceptualization and global sourcing to assembly and rigorous QC, the group delivers a turnkey solution.
              </p>
              
              {/* USP Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Card 1 */}
                <div className="bg-[#002F1F]/60 p-6 rounded-xl border border-white/5 hover:border-[#D4C5A0]/20 transition-all duration-300">
                  <ShieldCheck size={22} className="text-[#D4C5A0] mb-3" />
                  <h4 className="font-dm font-bold tracking-wide text-xs text-white uppercase mb-2">SEDEX Audited</h4>
                  <p className="font-dm text-[11px] leading-relaxed text-[#EDE8DF]/75">Stringent ethical compliance and world-class facility standards.</p>
                </div>

                {/* Card 2 */}
                <div className="bg-[#002F1F]/60 p-6 rounded-xl border border-white/5 hover:border-[#D4C5A0]/20 transition-all duration-300">
                  <TrendingUp size={22} className="text-[#D4C5A0] mb-3" />
                  <h4 className="font-dm font-bold tracking-wide text-xs text-white uppercase mb-2">Volume Capability</h4>
                  <p className="font-dm text-[11px] leading-relaxed text-[#EDE8DF]/75">Flawless execution from 5K pilot batches to multi-million unit pipelines.</p>
                </div>

                {/* Card 3 */}
                <div className="bg-[#002F1F]/60 p-6 rounded-xl border border-white/5 hover:border-[#D4C5A0]/20 transition-all duration-300 sm:col-span-2">
                  <Award size={22} className="text-[#D4C5A0] mb-3" />
                  <h4 className="font-dm font-bold tracking-wide text-xs text-white uppercase mb-2">Unmatched After-Sales</h4>
                  <p className="font-dm text-[11px] leading-relaxed text-[#EDE8DF]/75">Nagpal Group's roots in spare parts distribution ensure lifelong serviceability, minimizing return rates and protecting brand reputation.</p>
                </div>

              </div>

              {/* CTA Link */}
              <div className="mt-10">
                <Link
                  href="/nagpal-group"
                  className="group relative inline-flex items-center gap-3 font-dm text-[12px] tracking-[0.2em] uppercase text-[#D4C5A0]"
                >
                  <span className="relative">
                    Learn More
                    <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out bg-[#D4C5A0]" />
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="group-hover:translate-x-1 transition-transform duration-500 text-[#D4C5A0]"
                  >
                    <path
                      d="M4 10h12M12 6l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>

            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
