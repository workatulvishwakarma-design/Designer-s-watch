"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Truck, Lock, Shield, Wrench, MessageCircle } from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────
   JOIN THE WORLD — PROMPT 1.7
   Consolidates OemCta + TrustGrid + FeatureStrip into
   a single unified section with 3 zones:
   1. Trust badges strip (horizontal)
   2. Brand story + B2B CTA (center)
   3. Newsletter signup (bottom)
   ───────────────────────────────────────────────────── */

/* ── Trust Items ── */
const trustItems = [
  { icon: Truck, title: "Fast Shipping", desc: "5–7 business days pan-India" },
  { icon: Lock, title: "Secure Checkout", desc: "256-bit SSL encrypted" },
  { icon: MessageCircle, title: "Expert Support", desc: "Dedicated care team" },
  { icon: Shield, title: "Warranty", desc: "12-month protection included" },
  { icon: Wrench, title: "Service Centres", desc: "Authorised nationwide" },
];

/* ── Marquee Items ── */
const marqueeItems = [
  "Since 1940s",
  "4 Generations",
  "OEM Partner",
  "20+ Brands",
  "500+ Private Labels",
  "Premium Craftsmanship",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
};

export default function JoinTheWorld() {
  return (
    <>
      {/* ═══════ ZONE 1: MARQUEE STRIP ═══════ */}
      <section
        className="py-[14px] overflow-hidden border-y border-[#B8935A]/20"
        style={{ backgroundColor: "#B8935A" }}
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
            (item, i) => (
              <span
                key={i}
                className="font-body text-[12px] font-bold tracking-[0.2em] uppercase mx-8 flex items-center gap-8"
                style={{ color: "#1A1918" }}
              >
                {item}
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ backgroundColor: "#1A1918" }}
                />
              </span>
            )
          )}
        </div>
      </section>

      {/* ═══════ ZONE 2: TRUST + B2B CTA (UNIFIED) ═══════ */}
      <section className="relative w-full overflow-hidden bg-[#003926]">
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Radial gold glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(184,147,90,0.07) 0%, transparent 55%)",
          }}
        />

        {/* Edge highlights */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8935A]/25 to-transparent" />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12">
          {/* ─── B2B CTA Block ─── */}
          <div className="py-20 lg:py-24 text-center">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-dm text-[11px] tracking-[0.35em] uppercase text-[#B8935A] font-medium mb-5"
            >
              FOR BUSINESSES & PARTNERS
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, letterSpacing: "0.15em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.02em" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-cormorant text-[36px] md:text-[48px] lg:text-[56px] leading-[1.1] text-white mb-6"
            >
              <span className="block font-light italic text-[#E8DFD0]">
                Your Vision.
              </span>
              <span className="block font-semibold">
                Nagpal Group&apos;s Watchmaking.
              </span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-[50px] h-[1px] mx-auto mb-6 origin-center bg-[#B8935A]/60"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-dm font-light text-[15px] md:text-[17px] leading-[1.9] max-w-[520px] mx-auto mb-10 text-white/50"
            >
              End-to-end OEM &amp; private label watch manufacturing backed
              by decades of expertise, global sourcing, and rigorous quality
              control.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/nagpal-group#partner"
                className="px-10 py-4 font-dm text-[12px] tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_20px_40px_rgba(184,147,90,0.2)] hover:-translate-y-1 rounded-full border border-[#B8935A]/40 bg-[#B8935A]/10 text-[#B8935A] hover:bg-[#B8935A] hover:text-white hover:border-[#B8935A] backdrop-blur-sm"
              >
                Enquire Now
              </Link>
              <p className="text-[10px] tracking-widest text-[#B8935A]/40 uppercase font-dm italic">
                Response within 24 hours
              </p>
            </motion.div>
          </div>

          {/* ─── Divider ─── */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#B8935A]/20 to-transparent" />

          {/* ─── Trust Grid ─── */}
          <div className="py-16 lg:py-20">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center text-[11px] tracking-[0.3em] uppercase text-[#B8935A] font-dm font-medium mb-12"
            >
              BUILT ON TRUST
            </motion.p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6"
            >
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="relative flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#B8935A]/10 border border-[#B8935A]/25 mb-4 transition-all duration-400 group-hover:bg-[#B8935A]/20 group-hover:border-[#B8935A]/40">
                      <Icon
                        size={22}
                        className="text-[#B8935A]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h4 className="font-dm text-[12px] font-medium text-white/80 mb-1 transition-colors duration-300 group-hover:text-[#B8935A]">
                      {item.title}
                    </h4>
                    <p className="font-dm text-[11px] text-white/35 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8935A]/25 to-transparent" />
      </section>
    </>
  );
}
