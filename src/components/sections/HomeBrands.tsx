"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";

interface BrandCardProps {
  title: string;
  subtitle: string;
  priceRange: string;
  image: string;
  href: string;
  ctaLabel: string;
  variant: "dark" | "light";
  delay?: number;
  logo?: string;
}

function BrandCard({ title, subtitle, priceRange, image, href, ctaLabel, variant, delay = 0, logo }: BrandCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const isDark = variant === "dark";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden cursor-pointer group"
      style={{ borderRadius: "20px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={href} className="block relative" style={{ aspectRatio: "3/4" }}>
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: "20px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out"
            style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
          />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            borderRadius: "20px",
            background: isDark
              ? "linear-gradient(180deg, rgba(0,10,6,0.3) 0%, rgba(0,0,0,0.15) 30%, rgba(0,10,6,0.5) 65%, rgba(0,10,6,0.90) 100%)"
              : "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        {/* Glass hover overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            borderRadius: "20px",
            background: isDark
              ? "linear-gradient(180deg, rgba(0,57,38,0.15) 0%, rgba(0,57,38,0.25) 100%)"
              : "linear-gradient(180deg, rgba(184,147,90,0.08) 0%, rgba(184,147,90,0.15) 100%)",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Emerald hover glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] blur-[80px] pointer-events-none transition-opacity duration-700"
          style={{
            background: "radial-gradient(ellipse, rgba(0,57,38,0.4), transparent)",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Gold top edge shimmer */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-500"
          style={{
            borderRadius: "20px 20px 0 0",
            background: "linear-gradient(90deg, transparent, rgba(184,147,90,0.5), transparent)",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 lg:p-12 z-10" style={{ borderRadius: "20px" }}>
          {/* Brand Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 self-start transition-all duration-500"
            style={{
              background: hovered ? "rgba(184,147,90,0.2)" : "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${hovered ? "rgba(184,147,90,0.3)" : "rgba(255,255,255,0.1)"}`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8935A]" />
            <span className="font-dm text-[10px] tracking-[0.2em] uppercase text-white/80">{subtitle}</span>
          </div>

          {/* Title */}
          <h3
            className="font-bebas text-[36px] sm:text-[44px] lg:text-[56px] text-white leading-[0.95] mb-3 transition-all duration-500"
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.4)",
              letterSpacing: hovered ? "0.04em" : "0.01em",
            }}
          >
            {title}
          </h3>

          {/* Price Range */}
          <div className="mb-6 flex flex-col items-start gap-0.5">
            <span className="text-[9px] font-dm tracking-[0.25em] uppercase text-white/40">Price Range</span>
            <span 
              className="font-cormorant text-[18px] sm:text-[22px] font-medium tracking-[0.03em] transition-colors duration-500"
              style={{ color: hovered ? "#B8935A" : "#FFFFFF" }}
            >
              {priceRange}
            </span>
          </div>

          {/* Divider */}
          <div
            className="w-full h-px mb-6 transition-all duration-500"
            style={{
              background: hovered
                ? "linear-gradient(90deg, transparent, rgba(184,147,90,0.5), transparent)"
                : "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            }}
          />

          {/* CTA */}
          <div className="flex items-center justify-between">
            <span
              className="font-dm text-[11px] tracking-[0.2em] uppercase transition-all duration-500"
              style={{ color: hovered ? "#B8935A" : "rgba(255,255,255,0.5)" }}
            >
              {ctaLabel}
            </span>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500"
              style={{
                background: hovered ? "rgba(184,147,90,0.2)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${hovered ? "rgba(184,147,90,0.4)" : "rgba(255,255,255,0.1)"}`,
                transform: hovered ? "translateX(4px)" : "translateX(0)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M12 6l4 4-4 4" stroke={hovered ? "#B8935A" : "rgba(255,255,255,0.4)"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.4s ease" }} />
              </svg>
            </div>
          </div>
        </div>

        {/* Corner accent */}
        <svg
          width="28"
          height="28"
          stroke="#B8935A"
          fill="none"
          className="absolute top-6 left-6 z-10 pointer-events-none transition-opacity duration-500"
          style={{ opacity: hovered ? 0.6 : 0.25 }}
        >
          <path d="M0 28 L0 0 L28 0" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Brand Logo */}
        {logo && (
          <div
            className="absolute top-6 right-6 z-10 pointer-events-none transition-opacity duration-500"
            style={{ opacity: hovered ? 0.95 : 0.7 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo}
              alt={`${title} logo`}
              className="h-[28px] sm:h-[32px] lg:h-[36px] w-auto object-contain"
              style={{ filter: "brightness(0) invert(1)", transition: "opacity 0.5s ease" }}
            />
          </div>
        )}
      </Link>
    </motion.div>
  );
}

export default function HomeBrands() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} className="bg-[#FAF8F4] py-16 lg:py-24 relative overflow-hidden">
      {/* Ambient emerald glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.04] blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(0,57,38,0.5), transparent)" }} />

      {/* Section Header */}
      <div className="text-center mb-12 lg:mb-16 px-6 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-dm uppercase text-[10px] tracking-[0.4em] text-[#B8935A] mb-3"
        >
          OUR BRANDS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cormorant text-[32px] sm:text-[40px] lg:text-[52px] text-[#1A1918] leading-[1.1]"
        >
          Two Identities<span className="text-[#003926]">.</span>{" "}
          <span className="italic font-light text-[#1A1918]/70">One Foundation</span>
          <span className="text-[#B8935A]">.</span>
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-12 h-px mx-auto mt-5 origin-center"
          style={{ background: "linear-gradient(90deg, transparent, #B8935A, transparent)" }}
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-dm text-[14px] text-[#9C9690] mt-4 max-w-lg mx-auto leading-relaxed"
        >
          Four generations of horological mastery, expressed through two iconic brands — each with its own character, united by a legacy of excellence.
        </motion.p>
      </div>

      {/* Editorial Split Layout */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7 mx-auto w-full relative z-10"
        style={{ maxWidth: 1300, padding: "0 24px" }}
      >
        {/* D'SIGNER Card */}
        <BrandCard
          title="D'SIGNER"
          subtitle="Premium Luxury"
          priceRange="₹4,000 — ₹50,000"
          image="/images/new-content/new-1/d_signer mens/april_post05.png"
          href="/collections/dsigner"
          ctaLabel="Explore D'Signer"
          variant="dark"
          delay={0}
          logo="/images/deigner.png"
        />

        {/* ESCORT Card */}
        <BrandCard
          title="ESCORT"
          subtitle="Everyday Elegance"
          priceRange="₹1,500 — ₹6,000"
          image="/images/new-content/new-1/escort womens/3.jpg"
          href="/collections/escort"
          ctaLabel="Explore Escort"
          variant="light"
          delay={0.15}
          logo="/images/escort_b.png"
        />
      </div>

      {/* PROMPT 2.8: 4-Category Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mx-auto w-full mt-6 relative z-10"
        style={{ maxWidth: 1300, padding: "0 24px" }}
      >
        {[
          { label: "D'Signer Men's", href: "/collections/mens-designer", accent: "#003926" },
          { label: "D'Signer Women's", href: "/collections/womens-designer", accent: "#B8935A" },
          { label: "Escort Men's", href: "/collections/mens-escort", accent: "#003926" },
          { label: "Escort Women's", href: "/collections/womens-escort", accent: "#B8935A" },
        ].map((cat, i) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="group flex items-center justify-center gap-2.5 px-5 py-4 rounded-2xl border border-[#EDE8DF] bg-white/70 backdrop-blur-sm transition-all duration-500 hover:border-[#B8935A]/30 hover:shadow-[0_8px_24px_rgba(184,147,90,0.08)] hover:-translate-y-0.5"
          >
            <span
              className="w-1.5 h-1.5 rounded-full transition-all duration-500 group-hover:scale-125"
              style={{ backgroundColor: cat.accent }}
            />
            <span className="font-dm text-[11px] sm:text-[12px] tracking-[0.12em] uppercase text-[#1A1918]/70 transition-colors duration-300 group-hover:text-[#1A1918]">
              {cat.label}
            </span>
            <svg
              width="14" height="14" viewBox="0 0 20 20" fill="none"
              className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5"
            >
              <path d="M4 10h12M12 6l4 4-4 4" stroke="#B8935A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
