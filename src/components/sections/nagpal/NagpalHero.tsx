"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const grainSvg = (
  <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none z-0" aria-hidden>
    <filter id="nagpal-hero-grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#nagpal-hero-grain)" />
  </svg>
);

const featureCards = [
  {
    title: "Multi-channel Distribution Network",
    desc: "Reaching customers through retail, e-commerce, and institutional channels with a unified supply chain and brand presence.",
  },
  {
    title: "Long-standing Retail & Service Partnerships",
    desc: "Decades of trusted relationships with retailers and service centers ensure consistent availability and after-sales support.",
  },
  {
    title: "Strong Supply Chain & Component Sourcing",
    desc: "Vertically integrated sourcing and logistics enable reliable quality and timely delivery across the value chain.",
  },
];

function useCountUp(end: number, duration: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return count;
}

export default function NagpalHero() {
  const [imgError, setImgError] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setStatsInView(e.isIntersecting), { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const count1 = useCountUp(20, 2, statsInView);
  const count2 = useCountUp(500, 2, statsInView);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#0D3329" }}
    >
      {grainSvg}

      {/* Corner ornament - gold */}
      <div className="absolute top-8 left-6 md:left-12 z-10 pointer-events-none opacity-30">
        <svg width="60" height="60" stroke="#D4AA72" fill="none" viewBox="0 0 60 60">
          <path d="M0 60 L0 0 L60 0" strokeWidth="0.8" />
          <path d="M0 0 L20 0 M0 0 L0 20" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center flex-1 min-h-screen py-10 md:py-24 lg:py-16">
        {/* Left - headline & copy */}
        <div className="order-last md:order-first md:w-[55%] px-6 md:px-0 md:pl-16 flex flex-col justify-center text-center md:text-left">
          <p
            className="font-body text-[10px] tracking-[0.25em] mb-6"
            style={{ color: "rgba(212,170,114,0.95)" }}
          >
            DESIGNER WORLD / NAGPAL GROUP
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-8"
          >
            <span
              className="inline-block font-body text-[11px] px-4 py-1.5 rounded-full border"
              style={{ borderColor: "#D4AA72", color: "#D4AA72" }}
            >
              SINCE 1940s
            </span>
          </motion.div>

          <div className="font-heading mb-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="text-[40px] sm:text-[56px] md:text-[56px] lg:text-[88px] font-light italic leading-none text-white"
            >
              The Engine
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              className="text-[40px] sm:text-[56px] md:text-[56px] lg:text-[72px] font-light leading-none text-white mt-1"
            >
              Behind the Industry
            </motion.div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-16 h-px my-8 origin-left mx-auto md:mx-0"
            style={{ backgroundColor: "#D4AA72" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-body font-light text-[15px] md:text-[17px] max-w-[460px] leading-[1.9] mb-0 mx-auto md:mx-0 text-white/90"
          >
            An integrated watch enterprise operating across manufacturing, distribution, components,
            and brand development for over four decades.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75, duration: 0.4 }}
            className="flex flex-col sm:flex-row flex-wrap gap-5 mt-10 justify-center md:justify-start"
          >
            <Link
              href="#divisions"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-md font-body text-[13px] tracking-[0.1em] text-[#0D3329] transition-all duration-[350ms] ease-out hover:shadow-[0_8px_32px_rgba(212,170,114,0.4)]"
              style={{ backgroundColor: "#D4AA72" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#D4AA72";
              }}
            >
              Our Divisions
            </Link>
            <Link
              href="#partner"
              className="font-body text-[13px] tracking-[0.08em] text-white/90 hover:text-white transition-colors duration-300 border border-white/50 hover:border-white px-6 py-3 rounded-md text-center sm:text-left w-full sm:w-auto"
            >
              Partner With Us →
            </Link>
          </motion.div>
        </div>

        {/* Right - watch image + stats */}
        <div ref={statsRef} className="order-first md:order-last md:w-[45%] relative flex flex-col justify-center items-center w-full mb-10 md:mb-0 md:pr-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-full max-w-[320px] h-[260px] md:max-w-[480px] md:h-[380px] flex items-center justify-center"
          >
            {!imgError ? (
              <Image
                src="/images/nagpal1.png"
                alt="Watch movement"
                width={480}
                height={380}
                className="w-full h-full object-contain nagpal-hero-float"
                onError={() => setImgError(true)}
              />
            ) : (
              <div
                className="w-full h-full rounded-lg flex items-center justify-center opacity-50"
                style={{ background: "rgba(212,170,114,0.15)" }}
              />
            )}
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-center mt-6 md:mt-8">
            <div className="text-center">
              <span className="font-display text-[56px] md:text-[72px] lg:text-[96px] leading-none text-white block">
                {count1}+
              </span>
              <span className="font-body font-light text-[13px] md:text-[14px] tracking-[0.12em] text-white/85 block mt-1">
                International Brand
              </span>
              <span className="font-body font-light text-[13px] md:text-[14px] tracking-[0.12em] text-white/85">
                Associations
              </span>
            </div>
            <div className="text-center">
              <span className="font-display text-[56px] md:text-[72px] lg:text-[96px] leading-none text-white block">
                {count2}+
              </span>
              <span className="font-body font-light text-[13px] md:text-[14px] tracking-[0.12em] text-white/85 block mt-1">
                Private Labels
              </span>
              <span className="font-body font-light text-[13px] md:text-[14px] tracking-[0.12em] text-white/85">
                Manufactured
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom blur grid - glassmorphism cards */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pb-8 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {featureCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-6 md:p-8 text-center md:text-left cursor-default backdrop-blur-xl"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(212, 170, 114, 0.25)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
              }}
            >
              {/* Hover glow - brand gold */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl md:rounded-3xl pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(212, 170, 114, 0.4), 0 20px 48px rgba(184, 147, 90, 0.15)",
                }}
              />
              {/* Subtle gradient accent on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl md:rounded-b-3xl"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(212, 170, 114, 0.6), transparent)",
                }}
              />
              <div className="relative z-10">
                <h3 className="font-body font-semibold text-[16px] md:text-[18px] mb-3 text-white group-hover:text-[#D4AA72] transition-colors duration-300">
                  {card.title}
                </h3>
                <p
                  className="font-body font-light text-[13px] md:text-[14px] leading-relaxed transition-colors duration-300"
                  style={{ color: "rgba(255, 255, 255, 0.78)" }}
                >
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes nagpalFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .nagpal-hero-float {
          animation: nagpalFloat 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
