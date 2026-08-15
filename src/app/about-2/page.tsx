"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Milestone = {
  year: string;
  title: string;
  text: string;
  image1: string;
  image2?: string;
  extra: string;
  isLogo?: boolean;
};

const milestones: Milestone[] = [
  {
    year: "1940s",
    title: "The Beginning",
    text: "A small watch parts shop in Amritsar marked the start of a journey rooted in craftsmanship and trust. Shree Virbhan Nagpal laid the foundation for what would become a national watch business spanning generations.",
    image1: "/images/about us journey/1940s — The Beginning/about-img1_1.webp",
    image2: "",
    extra: "The first workshop occupied a small corner of the Amritsar bazaar, yet every component was handled with the precision of a master craftsman. Long before watches became fashion, Nagpals understood the soul of a timepiece.",
  },
  {
    year: "1960s",
    title: "2nd Generation",
    text: "The 2nd generation of the Nagpal family enters the business, deepening roots in horology and building relationships with international component suppliers across northern India.",
    image1: "/images/about us journey/1960- The 2nd Generation/WhatsApp Image 2026-04-27 at 10.50.37 AM.jpeg",
    image2: "/images/about us journey/1960- The 2nd Generation/WhatsApp Image 2026-04-13 at 8.14.16 AM (1).jpeg",
    extra: "International partnerships formed the backbone of a growing enterprise. By the mid-60s, Nagpals had become a trusted name in the Northern India trade circuit for precision components and watch batteries.",
  },
  {
    year: "1976",
    title: "Nagpal Bombay",
    text: "The 3rd generation moves to Mumbai and establishes NAGPALS BOMBAY. The network expands all around India with international travel for parts and battery distribution. MAXELL and RENATA become major focus areas.",
    image1: "/images/about us journey/1976 - Nagpal Bombay/IMG_0216.jpeg",
    image2: "/images/new-content/pillars/Corporate B2B/34.jpg",
    extra: "Mumbai offered scale. The commercial pulse of the city aligned perfectly with an expanding ambition and Nagpal Bombay quickly emerged as a fulcrum of the Indian watch component trade.",
  },
  {
    year: "1991",
    title: "A Brand is Born",
    text: "D'SIGNER is introduced, a step into creating watches defined by design, quality, and individuality. One of the early Indian brands to design and manufacture to international standards.",
    image1: "/images/about us journey/1991 — A Brand is Born/Backup_of_dq designer old logo-13.png",
    image2: "/images/about us journey/1991 — A Brand is Born/1 (7).jpg",
    extra: "D'Signer was not simply a product launch but a philosophical statement. At a time when Indian watchmaking was dominated by mass-market models, D'Signer chose craftsmanship over compromise and design over convention.",
    isLogo: true,
  },
  {
    year: "1992",
    title: "Voltage Batteries",
    text: "Entered button cell batteries under the brand VOLTAGE, creating a strong supply network across India and establishing a cornerstone for the company's component distribution ecosystem.",
    image1: "/images/about us journey/1992 - Voltage Batteries/IMG_0205.jpeg",
    image2: "",
    extra: "Voltage Batteries powered millions of timepieces across the nation, cementing the group's reputation for uncompromising component reliability.",
  },
  {
    year: "1995",
    title: "Escort Launched",
    text: "ESCORT is launched to make stylish, quality watches accessible to a wider audience, democratizing good design with robust everyday timepieces at honest prices.",
    image1: "/images/about us journey/1995 - Escort Launched/escort-logo.png",
    image2: "/images/about us journey/1995 - Escort Launched/1 (3).jpg",
    extra: "Escort answered a simple question: why shouldn't every Indian have access to a reliable, beautifully finished timepiece? The market responded with extraordinary enthusiasm.",
    isLogo: true,
  },
  {
    year: "2000s",
    title: "OEM Manufacturing",
    text: "Expanding into OEM manufacturing, designing and producing watches for global and national brands, a significant leap in manufacturing capability.",
    image1: "/images/about us journey/2000s - OEM Manufacturing/1 (6).jpg",
    image2: "/images/about us journey/2000s - OEM Manufacturing/1 (5).jpg",
    extra: "OEM manufacturing elevated Designer World from a brand house into a complete horological enterprise. Over 500 private labels would trust the group manufacturing muscle for precision watches produced to exacting international benchmarks.",
  },
  {
    year: "2010s",
    title: "Global Brands",
    text: "Partnering with international brands like ESCORT and expanding distribution across modern retail and e-commerce platforms, bringing world-class horology closer to Indian consumers.",
    image1: "/images/about us journey/2010s - Global Brands/1 (1).jpg",
    image2: "/images/about us journey/2010s - Global Brands/1 (2).jpg",
    extra: "As India's retail landscape transformed with modern retail and e-commerce, the group positioned its portfolio at the forefront of the digital revolution.",
  },
  {
    year: "2020s",
    title: "Modern Horology",
    text: "A new era of horological innovation, blending heritage with contemporary watchmaking, smart horology, and state-of-the-art manufacturing facilities.",
    image1: "/images/about us journey/2020s - Modern Horology/IMG_0211.jpeg",
    image2: "/images/about us journey/2020s - Modern Horology/IMG_0209.jpeg",
    extra: "The fourth generation brings digital precision, sustainable manufacturing, and contemporary design language to an enduring family enterprise.",
  },
];

const GREEN = "#003926";
const GOLD = "#D4C5A0";
const FALLBACK = "/images/new-img/model-1/824/824-RGFS-3-nobg.png";

function FadeIn({ children, delay = 0, className = "", style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function MilestoneSection({ m, index }: { m: Milestone; index: number }) {
  const isEven = index % 2 === 0;
  const sectionBg = isEven ? "#ffffff" : "#fbfbfa";

  return (
    <section style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", background: sectionBg }}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-16">

        {/* Year + Title Header Row */}
        <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-6 md:gap-12 mb-8 md:mb-12`}>
          <FadeIn delay={0} className="select-none shrink-0">
            <div style={{ fontSize: "clamp(4.5rem, 12vw, 9.5rem)", color: GREEN, fontFamily: "'Inter', sans-serif", lineHeight: 0.85, fontWeight: 900, letterSpacing: "-0.04em" }}>
              {m.year}
            </div>
            <div style={{ width: "3.5rem", height: "4px", background: GOLD, marginTop: "0.5rem" }} />
          </FadeIn>

          <FadeIn delay={0.12} className="max-w-md pt-2">
            <h2 style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "#111", letterSpacing: "0.04em", fontFamily: "'Inter', sans-serif", fontWeight: 900, textTransform: "uppercase", marginBottom: "0.6rem", lineHeight: 1.2 }}>
              {m.title}
            </h2>
            <div style={{ width: "2rem", height: "2px", background: GREEN, marginBottom: "0.7rem" }} />
            <p style={{ fontSize: "0.85rem", lineHeight: 1.75, color: "#555", fontFamily: "Georgia, serif" }}>
              {m.text}
            </p>
          </FadeIn>
        </div>

        {/* Photo + Text Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">
          <FadeIn delay={0.08} className={isEven ? "order-1" : "order-1 md:order-2"}>
            <div style={{ position: "relative", borderRadius: "3px", background: sectionBg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "200px", border: "1px solid rgba(0,0,0,0.06)", padding: m.isLogo ? "3rem 2rem 4.5rem" : "0" }}>
              <img
                src={m.image1}
                alt={m.title}
                style={{
                  width: m.isLogo ? "auto" : "100%",
                  maxWidth: m.isLogo ? "75%" : "100%",
                  height: "auto",
                  maxHeight: m.isLogo ? "220px" : "420px",
                  objectFit: "contain",
                  filter: "grayscale(10%)",
                  display: "block"
                }}
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
              />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.4rem 0.9rem", background: "rgba(0,57,38,0.75)" }}>
                <p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.9)", letterSpacing: "0.1em", fontFamily: "Georgia, serif", fontStyle: "italic", margin: 0 }}>
                  {m.year} — {m.title}
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.18} className={isEven ? "order-2" : "order-2 md:order-1"}>
            <p style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.97rem)", lineHeight: 1.9, color: "#1a1a1a", fontFamily: "Georgia, serif", marginBottom: m.image2 ? "1.5rem" : 0, textAlign: "justify" }}>
              <span style={{ float: "left", fontSize: "clamp(2.5rem, 4.5vw, 3.5rem)", fontWeight: 900, lineHeight: 0.78, marginRight: "0.12em", marginTop: "0.06em", color: GREEN, fontFamily: "Georgia, serif" }}>
                {m.extra.charAt(0)}
              </span>
              {m.extra.slice(1)}
            </p>
            {m.image2 ? (
              <div style={{ borderRadius: "3px", background: sectionBg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "140px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <img
                  src={m.image2}
                  alt={m.title + " secondary"}
                  style={{ width: "100%", height: "auto", maxHeight: "320px", objectFit: "contain", filter: "grayscale(10%)", display: "block" }}
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
                />
              </div>
            ) : null}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage2() {
  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", background: "#ffffff" }}>

      {/* ---- MAIN HERO BANNER (full-bleed image at top) ---- */}
      <section style={{ position: "relative", width: "100%", height: "clamp(504px, 72vh, 864px)", overflow: "hidden" }}>
        <img
          src="/images/about-2.png"
          alt="Nagpal Group Heritage"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", filter: "brightness(0.78)" }}
          onError={(e) => { const t = e.target as HTMLImageElement; if (t.src.includes("/images/about-2.png")) t.src = "/img/about-2.png"; }}
        />
      </section>

      {/* ---- INTRO TEXT SECTION ---- */}
      <section style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "4rem 1.5rem 0" }}>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <div>
                <p style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.88, color: "#1a1a1a", fontFamily: "Georgia, serif", textAlign: "justify" }}>
                  <span style={{ float: "left", fontSize: "clamp(2.8rem, 6vw, 4.2rem)", fontWeight: 900, lineHeight: 0.75, marginRight: "0.12em", marginTop: "0.08em", color: GREEN, fontFamily: "Georgia, serif" }}>A</span>
                  vast watch empire, born at the heart of an immense nation and a business that has promised so much. The Nagpal Group, 1948 to 2025, explores the origins, growth and legacy of one of the most transformative periods in Indian horology. In this wide-ranging narrative, the Nagpal family discusses how their legacy shapes watches beyond ideology, placing it firmly in the context of commerce, craft, and cultural aspiration.
                </p>
              </div>
              <div>
                <p style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)", lineHeight: 1.88, color: "#444", fontFamily: "Georgia, serif", textAlign: "justify" }}>
                  From the final decades of tradition to the resurgence of D'Signer, the Nagpal story reveals how horological hopes collided with harsh realities, from small Amritsar workshops to global OEM manufacturing, supplying over 500 private labels across the world, and why the legacy continues to shape India's watch industry today. With 20+ international brands, Designer World stands as a chronicle of Indian horology's finest chapter.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-8 sm:gap-20 my-10 pt-10 pb-10 border-t border-black/[0.08] text-center w-full">
              {[["4", "Generations"], ["20+", "Intl Brands"], ["500+", "OEM Labels"]].map(([num, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.76rem", fontWeight: 900, color: GREEN, fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: "0.66rem", color: "#888", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "4px" }}>{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---- MILESTONES ---- */}
      {milestones.map((m, i) => (
        <MilestoneSection key={m.year} m={m} index={i} />
      ))}

      {/* ---- CHAIRMAN MESSAGE ---- */}
      <section style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", background: "#f6f6f3" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "4.5rem 1.5rem" }}>
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">
              <div>
                <div style={{ position: "relative", overflow: "hidden", borderRadius: "3px" }}>
                  <img
                    src="/images/aboutImg3.png"
                    alt="Jatinder Nagpal Chairman"
                    style={{ width: "100%", objectFit: "cover", height: "clamp(260px, 32vw, 460px)", filter: "grayscale(20%)", display: "block" }}
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
                  />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.45rem 0.9rem", background: "rgba(0,57,38,0.8)" }}>
                    <p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.9)", letterSpacing: "0.1em", fontFamily: "Georgia, serif", fontStyle: "italic", margin: 0 }}>
                      Jatinder Nagpal, Chairman, Designer World
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ borderLeft: "4px solid " + GREEN, paddingLeft: "1.4rem", marginBottom: "1.5rem" }}>
                  <h2 style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)", color: "#111", letterSpacing: "0.04em", lineHeight: 1.2, fontFamily: "'Inter', sans-serif", fontWeight: 900, textTransform: "uppercase", margin: 0 }}>
                    Chairman Message
                  </h2>
                </div>
                <p style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.96rem)", lineHeight: 1.95, color: "#333", fontFamily: "Georgia, serif", marginBottom: "1.1rem", textAlign: "justify" }}>
                  On behalf of our entire team, I extend my heartfelt thanks to all the proud owners and loyal users of our house brands, D'SIGNER and ESCORT. Our parent company, Nagpals, has been a trusted name in watch components for decades.
                </p>
                <p style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.96rem)", lineHeight: 1.95, color: "#333", fontFamily: "Georgia, serif", marginBottom: "1.1rem", textAlign: "justify" }}>
                  Building on this rich legacy, we ventured into the world of premium timepieces in 1991, inspired by the elegance of Swiss and European watchmaking traditions. This led to the birth of D'SIGNER which quickly carved out a niche for itself by upholding the highest standards of design and quality. In 1995, we introduced ESCORT, a brand that delivers high-quality watches at affordable prices, making stylish timekeeping accessible to all.
                </p>
                <p style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.96rem)", lineHeight: 1.95, color: "#333", fontFamily: "Georgia, serif", marginBottom: "1.5rem", textAlign: "justify" }}>
                  Today, both D'SIGNER and ESCORT enjoy a strong presence across the country through our Multi Brand Stores, with millions of happy customers who continue to place their trust in us. I sincerely thank each one of you for being a part of this journey.
                </p>
                <p style={{ fontSize: "0.72rem", color: "#888", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>
                  Jatinder Nagpal, Chairman
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---- CLOSING ---- */}
      <section style={{ background: GREEN }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "5.5rem 1.5rem" }}>
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
              <div>
                <p style={{ fontSize: "0.62rem", color: GOLD, letterSpacing: "0.28em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: "0.9rem" }}>TODAY</p>
                <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#ffffff", fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em", fontWeight: 300, lineHeight: 1.1, marginBottom: "1.25rem" }}>
                  Affordable Luxury.
                </h2>
                <div style={{ width: "2.5rem", height: "3px", background: GOLD, marginBottom: "1.4rem" }} />
                <p style={{ fontSize: "clamp(0.88rem, 1.2vw, 1rem)", lineHeight: 1.88, color: "rgba(255,255,255,0.78)", fontFamily: "Georgia, serif", textAlign: "justify" }}>
                  4 generations of expertise. 20+ international brands. 500+ private labels manufactured. Blending legacy with modern design to create watches that balance style, quality, and accessibility, the Nagpal Group stands as a living chronicle of India's horological ambition.
                </p>
              </div>
              <div>
                <div style={{ overflow: "hidden", borderRadius: "8px", background: "#ffffff", padding: "0.5rem", boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}>
                  <img
                    src="/images/about us journey/1992 - Voltage Batteries/IMG_0205.jpeg"
                    alt="Nagpal Group Heritage"
                    style={{ width: "100%", objectFit: "cover", height: "clamp(220px, 32vw, 420px)", display: "block" }}
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
