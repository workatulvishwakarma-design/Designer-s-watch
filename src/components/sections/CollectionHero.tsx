"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface CollectionHeroProps {
  title: string;
  subtitle: string;
  description: string;
  brand: string;
  gender: string;
  heroImage?: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function CollectionHero({
  title,
  subtitle,
  description,
  brand,
  gender,
  heroImage,
  breadcrumbs,
}: CollectionHeroProps) {
  const brandName = brand.toUpperCase() === "ESCORT" ? "Escort Series" : "D'Signer Core";
  const accentGradient =
    brand.toUpperCase() === "ESCORT"
      ? "linear-gradient(90deg, #003926, #B8935A)"
      : "linear-gradient(90deg, #B8935A, #FAF8F4)";

  return (
    <section className="relative bg-[#111110] text-white overflow-hidden py-16 md:py-24 border-b border-[#003926]/10">
      {/* Cinematic Ambient Lighting */}
      <div
        className="absolute top-1/2 left-1/4 w-[450px] h-[450px] pointer-events-none opacity-15 blur-[120px] -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(0,57,38,0.7), transparent)" }}
      />
      <div
        className="absolute right-0 bottom-0 w-[500px] h-[300px] pointer-events-none opacity-10 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(184,147,90,0.5), transparent)" }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/images/noise.png')] mix-blend-overlay" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-15" />

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 mb-10 md:mb-14">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home size={10} /> Home
          </Link>
          {breadcrumbs.slice(1).map((crumb, idx) => (
            <div key={crumb.href} className="flex items-center gap-2">
              <ChevronRight size={10} className="text-white/20" />
              {idx === breadcrumbs.length - 2 ? (
                <span className="text-[#B8935A] font-semibold">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand, Title, Description */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <span className="inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] bg-[#003926]/40 border border-[#003926]/30 text-[#B8935A]">
                {brandName} · {gender.toUpperCase()}
              </span>
              <h1 className="font-cormorant text-[42px] sm:text-[54px] lg:text-[62px] leading-[1.05] tracking-wide text-white">
                {title}
                <span className="text-[#B8935A]">.</span>
              </h1>
              <p className="font-cormorant italic text-[16px] sm:text-[18px] text-white/50 leading-relaxed">
                {subtitle}
              </p>
            </motion.div>

            {/* Gold Divider Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 w-16 origin-left rounded-full"
              style={{ background: accentGradient }}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-dm text-[13px] sm:text-[14px] leading-relaxed text-white/60 max-w-xl"
            >
              {description}
            </motion.p>
          </div>

          {/* Right Column: Hero Image (Pristine transparent watch png or high-quality image) */}
          <div className="lg:col-span-5 flex justify-center relative min-h-[320px] md:min-h-[420px]">
            {heroImage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, cubicBezier: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="w-full max-w-[360px] md:max-w-[420px] flex items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroImage}
                  alt={`${title} Showcase`}
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                />
              </motion.div>
            ) : (
              <div className="w-[300px] h-[300px] bg-white/5 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md">
                <span className="text-[11px] uppercase tracking-[0.25em] text-white/30 font-bold">
                  Haute Horlogerie
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
