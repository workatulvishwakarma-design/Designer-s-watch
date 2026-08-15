"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

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
    year: "1995",
    title: "Style for All",
    text: "ESCORT is launched to make timeless design more accessible, bringing reliable quality watches to a wider Indian audience at affordable prices.",
    image1: "/images/about us journey/1995 — Style for All/Escort Logo 1995.png",
    image2: "/images/about us journey/1995 — Style for All/IMG_7789.jpeg",
    extra: "If D'Signer spoke to the connoisseur, Escort spoke to everyone else. Millions of Indian wrists would come to carry an Escort, a brand built on the belief that quality should never be a luxury.",
    isLogo: true,
  },
  {
    year: "2007",
    title: "Daniel Klein",
    text: "Exclusive distribution rights for Turkish brand Daniel Klein in India. Grows into a top performer on e-commerce platforms with 1000+ models per year.",
    image1: "/images/about us journey/2007 - Daniel Klein/daniel klein exclusive-13.png",
    image2: "/images/about us journey/1991 — A Brand is Born/3 (3).jpg",
    extra: "Daniel Klein represented Designer World's first global foray, building bridges between Turkish craftsmanship and India's rapidly expanding digital market. The partnership unlocked new frontiers in e-commerce-first brand building.",
    isLogo: true,
  },
  {
    year: "2015",
    title: "Beyond the Brand",
    text: "Expanding into OEM manufacturing, designing and producing watches for global and national brands, a significant leap in manufacturing capability.",
    image1: "/images/about us journey/2015 — Beyond Our Own Brand/WhatsApp Image 2026-04-04 at 4.14.22 PM (1).jpeg",
    image2: "/images/watches/ESCORT POSTER-20260312T064608Z-1-001/ESCORT POSTER/1 (4).jpg",
    extra: "OEM manufacturing elevated Designer World from a brand house into a complete horological enterprise. Over 500 private labels would trust the group manufacturing muscle for precision watches produced to exacting international benchmarks.",
  },
  {
    year: "2022",
    title: "Designer World Brands",
    text: "A new division managing foreign brand distribution adds INGERSOL, INVICTA, and SANTA BARBARA POLO CLUB to the portfolio.",
    image1: "/images/about us journey/2022 - Designer world Brands/DW-BRANDS-LOGO-B.png",
    image2: "/images/about us journey/2022 - Designer world Brands/DW-BRANDS-LOGO-White (1).png",
    extra: "Bringing Invicta and Ingersoll to India was a landmark moment, affirming Designer World Brands as an authoritative voice in luxury watch distribution, extending an ecosystem spanning entry-level to premium segments.",
  },
  {
    year: "2024",
    title: "Diamond Watches",
    text: "Lab Grown Diamond Studded Watches launched, targeting a luxury audience with models up to Rs 1,50,000. A new chapter in premium horology.",
    image1: "/images/about us journey/2024 - Designer Lab Grown Diamond studded watches/DIAMOND SHOOT 16-09-2025/746GM.2L.jpg",
    image2: "/images/about us journey/2024 - Designer Lab Grown Diamond studded watches/DIAMOND SHOOT 16-09-2025/810GM.2L.jpg",
    extra: "Lab-grown diamonds brought ethical luxury within reach. Set in D'Signer's signature stainless steel cases, these timepieces blend sustainable sparkle with four generations of watchmaking heritage.",
  },
  {
    year: "2025",
    title: "Time Corridor",
    text: "A retail Time Boutique showcasing D'SIGNER and ESCORT, prime models, new launches, top sellers and special editions in a unique experience store.",
    image1: "/images/about us journey/2025 - Time Corridor/1A1A8511.JPG",
    image2: "/images/about us journey/2025 - Time Corridor/DSIGNER TIME CORRIDOR LOGO final.png",
    extra: "Time Corridor is more than a store, it is an experience. Customers step into a curated world of D'Signer and Escort, guided by knowledgeable staff, surrounded by decades of design excellence on every shelf.",
  },
];

const FALLBACK = "/images/today1.png";

/* Brand palette */
const GREEN = "#003926";
const GREEN_LIGHT = "#005a3c";
const GOLD = "#B8935A";

function FadeIn({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function MilestoneSection({ m, index }: { m: Milestone; index: number }) {
  const isEven = index % 2 === 0;
  const sectionBg = index % 3 === 1 ? "#f9f9f7" : "#ffffff";
  const isMobile = useIsMobile();
  return (
    <section style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", background: sectionBg }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: isMobile ? "2.5rem 1rem 3rem" : "4rem 1.5rem 5rem" }}>

        {/* Year + Title Header Row */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : (isEven ? "row" : "row-reverse"), alignItems: "flex-start", gap: isMobile ? "1.5rem" : "3rem", marginBottom: isMobile ? "2rem" : "3rem", flexWrap: "wrap" }}>
          <FadeIn delay={0} className="select-none">
            <div style={{ fontSize: "clamp(5rem, 13vw, 10rem)", color: GREEN, fontFamily: "'Inter', sans-serif", lineHeight: 0.85, fontWeight: 900, letterSpacing: "-0.04em" }}>
              {m.year}
            </div>
            <div style={{ width: "3.5rem", height: "4px", background: GOLD, marginTop: "0.5rem" }} />
          </FadeIn>

          <FadeIn delay={0.12} className="max-w-sm" style={{ paddingTop: "0.5rem" }}>
            <h2 style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", color: "#111", letterSpacing: "0.04em", fontFamily: "'Inter', sans-serif", fontWeight: 900, textTransform: "uppercase", marginBottom: "0.6rem", lineHeight: 1.2 }}>
              {m.title}
            </h2>
            <div style={{ width: "2rem", height: "2px", background: GREEN, marginBottom: "0.7rem" }} />
            <p style={{ fontSize: "0.83rem", lineHeight: 1.75, color: "#555", fontFamily: "Georgia, serif" }}>
              {m.text}
            </p>
          </FadeIn>
        </div>

        {/* Photo + Text Grid */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: isMobile ? "1.5rem" : "3rem", alignItems: "start" }}>
          <FadeIn delay={0.08} style={{ order: isEven ? 1 : 2 }}>
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

          <FadeIn delay={0.18} style={{ order: isEven ? 2 : 1 }}>
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
  const isMobile2 = useIsMobile();
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
          <FadeIn>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", marginBottom: "2.5rem", maxWidth: "680px" }}>
              <div style={{ flexShrink: 0, overflow: "hidden", borderRadius: "50%", width: 52, height: 52, border: "2px solid " + GOLD }}>
                <img
                  src="/images/aboutImg3.png"
                  alt="Chairman"
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(30%)" }}
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
                />
              </div>
              <p style={{ fontSize: "0.84rem", lineHeight: 1.65, color: "#444", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                Jatinder Nagpal discusses the Nagpal Group legacy, a multi-brand watch enterprise built on trust, craftsmanship, and four generations of uncompromised expertise in horology.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile2 ? "1fr" : "1fr 1fr", gap: isMobile2 ? "2rem" : "4rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
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

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: isMobile2 ? "2rem" : "5rem", marginTop: "2.5rem", paddingTop: "2.5rem", paddingBottom: "2.5rem", borderTop: "1px solid rgba(0,0,0,0.08)", textAlign: "center", width: "100%" }}>
              {[["4", "Generations"], ["20+", "Intl Brands"], ["500+", "OEM Labels"]].map(([num, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.76rem", fontWeight: 900, color: GREEN, fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: "0.66rem", color: "#888", letterSpacing: "0.14em", textTransform: "uppercase" as const, marginTop: "4px" }}>{label}</div>
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
            <div style={{ display: "grid", gridTemplateColumns: isMobile2 ? "1fr" : "1fr 2fr", gap: isMobile2 ? "2rem" : "4rem", alignItems: "start" }}>
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
            <div style={{ display: "grid", gridTemplateColumns: isMobile2 ? "1fr" : "1fr 1fr", gap: isMobile2 ? "2.5rem" : "5rem", alignItems: "center" }}>
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
