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
    image2: "/images/about us journey/1940.png",
    extra: "The first workshop occupied a small corner of the Amritsar bazaar, yet every component was handled with the precision of a master craftsman. Long before watches became fashion, Nagpals understood the soul of a timepiece.",
  },
  {
    year: "1960s",
    title: "The 2nd Generation of Nagpal Watch.CO",
    text: "This was when the 2nd generation of Nagpal's family entered the business, deepening roots in horology and building relationships with component suppliers across Northern India.",
    image1: "/images/about us journey/1960- The 2nd Generation/WhatsApp Image 2026-04-27 at 10.50.37 AM.jpeg",
    image2: "/images/about us journey/1960.png",
    extra: "International partnerships formed the backbone of a growing enterprise. By the mid-60s, Nagpals had become a trusted name in the Northern India trade circuit for precision components and watch batteries.",
  },
  {
    year: "1976",
    title: "Nagpal's Bombay was formed",
    text: "In 1976 the family established their new company here under the name 'NAGPALS BOMBAY'. With extensive efforts, support & dedication the network expanded all around India. This was the time when they travelled to international markets to import parts & components for direct distribution.",
    image1: "/about-us-coded/assets/x118.png",
    image2: "/images/about us journey/1976.png",
    extra: "During 1980s various BUTTON CELL brands tied up with NAGPALS BOMBAY for battery distribution all over India. Brands from Japan like MAXELL & Swiss like RENATA became a major area of company's focus for growth.",
  },
  {
    year: "1991",
    title: "A Brand is Born",
    text: "D'SIGNER was introduced, a step into creating watches defined by design, quality, and individuality. One of the early Indian brands to design and manufacture to international horological standards.",
    image1: "/images/about us journey/1991 — A Brand is Born/Backup_of_dq designer old logo-13.png",
    image2: "/images/about us journey/1991.png",
    extra: "D'Signer was not simply a product launch but a philosophical statement. At a time when Indian watchmaking was dominated by mass-market models, D'Signer chose craftsmanship over compromise and design over convention.",
    isLogo: true,
  },
  {
    year: "1995",
    title: "Style for All",
    text: "ESCORT was launched to make timeless design more accessible, bringing style to a wider audience with robust everyday timepieces at honest prices.",
    image1: "/images/about us journey/1995 — Style for All/Escort Logo 1995.png",
    image2: "/images/about us journey/1995.png",
    extra: "Escort answered a simple question: why shouldn't every Indian have access to a reliable, beautifully finished timepiece? The market responded with extraordinary enthusiasm.",
    isLogo: true,
  },
  {
    year: "1998",
    title: "Introduction of Tissot in India",
    text: "We were the ones to launch TISSOT watches in India as national distributors. We initiated the distribution for Tissot, Givenchy Paris, Christian Bernard Paris, and Rotary in India.",
    image1: "/images/about us journey/1998.png",
    image2: "/images/about us journey/1998 - Introduction of Tissot to india/Nagpal’s Bombay got distribution of Renata And Maxell Batteries (1).png",
    extra: "Introducing Swiss and French heritage horological names to India transformed our distribution footprint into a premier national network for luxury and fashion timepieces.",
  },
  {
    year: "2004",
    title: "D'signer Effects",
    text: "We started a division purely in the corporate gifts & promotion business under the name D'SIGNER EFFECTS. Here the idea was to connect with all small and large organizations, offering all sorts of promotion gifts for schemes and marketing plans.",
    image1: "/images/about us journey/2000.png",
    image2: "/images/new-content/pillars/Corporate B2B/34.jpg",
    extra: "Connecting brand messaging with high-quality custom corporate gifts allowed businesses across India to elevate their marketing initiatives and employee reward programs.",
  },
  {
    year: "2010",
    title: "B2B & Corporate Gifting",
    text: "B2B & Corporate Gifting became a very important focus for the company as wristwatches became a strong category for business promotion and marketing plans for major corporates. Launched clocks & bags category under D'SIGNER for B2B requirements.",
    image1: "/images/about us journey/2010.png",
    image2: "/images/about us journey/2010 - Corporate Gifting/Nagpal’s Bombay got distribution of Renata And Maxell Batteries (2).png",
    extra: "DESIGNER WATCHES scaled production skills and managed largest volume B2B orders of watches in lakhs. Executed major corporate projects for esteemed groups like TATA INDICOM, REEBOK, NIKON, and PHARMA COMPANIES.",
  },
  {
    year: "2013",
    title: "Daniel Klein in India",
    text: "Got exclusive distribution of Daniel Klein, a leading Turkish brand of watches and fashion accessories, in India.",
    image1: "/images/about us journey/2007 - Daniel Klein/daniel klein exclusive-13.png",
    image2: "/images/about us journey/2007.png",
    extra: "Bringing modern Turkish styling and accessible luxury to Indian retail counters opened new fashion-forward demographics across all major tier-1 and tier-2 cities.",
    isLogo: true,
  },
  {
    year: "2015",
    title: "Beyond Our Own Brand",
    text: "Expanding into OEM manufacturing, we began designing and producing watches for global and national brands, marking a major milestone in manufacturing capability.",
    image1: "/images/about us journey/2015.png",
    image2: "/images/about us journey/2015 — Beyond Our Own Brand/WhatsApp Image 2026-04-04 at 4.14.22 PM (1).jpeg",
    extra: "Over 500 private labels would trust our manufacturing expertise to engineer precision timepieces adhering to international quality standards.",
  },
  {
    year: "2017",
    title: "Adding More Brands",
    text: "The house introduced a few more international fashion brands in its distribution channel: MATHEY TISSOT and D1 MILANO. Same year Designer World stepped into international exports, in London, Singapore, and in Middle Eastern countries like Bahrain and Oman.",
    image1: "/images/about us journey/2017.png",
    image2: "/images/about us journey/2017 - Getting Sole Distribution of Mathey Tissot and D1 Milano/Nagpal’s Bombay got distribution of Renata And Maxell Batteries (3).png",
    extra: "Expanding our footprint globally while enriching our domestic portfolio cemented our reputation as a versatile international horology group.",
  },
  {
    year: "2020",
    title: "The Digital Shift",
    text: "With the rise of e-commerce, we adapted quickly, designing for online-first brands and expanding our reach across digital platforms.",
    image1: "/images/about us journey/2020.png",
    image2: "/images/about us journey/2020 — The Digital Shift/Nagpal’s Bombay got distribution of Renata And Maxell Batteries (4).png",
    extra: "Embracing omni-channel retail allowed us to connect directly with digital-native consumers and deliver timepieces with unmatched speed and agility.",
  },
  {
    year: "2022",
    title: "Designer World Brands",
    text: "Started a new division solely managing foreign brand distribution under the name DESIGNER WORLD BRANDS & added more labels like INGERSOLL, INVICTA, and SANTA BARBARA POLO CLUB.",
    image1: "/images/about us journey/2022 - Designer world Brands/DW-BRANDS-LOGO-B.png",
    image2: "/images/about us journey/2022.png",
    extra: "Dedicated brand management infrastructure empowered global fashion icons to flourish in the Indian marketplace.",
    isLogo: true,
  },
  {
    year: "2024",
    title: "D'signer Diamond Watches",
    text: "Launched Lab Grown Diamond Studded Watches as a new step to reach a more luxury audience, featuring models ranging up to Rs. 1,50,000/-.",
    image1: "/images/about us journey/2024 - Designer Lab Grown Diamond studded watches/DIAMOND SHOOT 16-09-2025/824 RGFS.5G.jpg",
    image2: "/images/about us journey/2024.png",
    extra: "Integrating ethical lab-grown diamonds into high-horology designs created an accessible luxury statement for discerning connoisseurs.",
  },
  {
    year: "2025",
    title: "Time Corridor",
    text: "A latest feather in Designer World story. At Designer World it's not about just the product we make but the aura we pass to our user with the time we design. This retail Time Boutique is initiated to promote our home brands, D'SIGNER & ESCORT watches at a point which is a unique experience store showcasing our prime models, new launches, top sellers & special editions with an appealing display & aura.",
    image1: "/images/about us journey/2025 - Time Corridor/1A1A8511.JPG",
    image2: "/images/about us journey/2025 - Time Corridor/DSIGNER TIME CORRIDOR LOGO final.png",
    extra: "This Time Corridor boutique is a gesture to connect & add some value to our happy watch buyers.",
  },
  {
    year: "Today",
    title: "Affordable Luxury",
    text: "Blending decades of legacy with modern design, Designer World continues to create watches that balance style, quality, and accessibility.",
    image1: "/images/about us journey/1992 - Voltage Batteries/IMG_0205.jpeg",
    extra: "Blending decades of legacy with modern design, Designer World continues to create watches that balance style, quality, and accessibility.",
  },
];

const GREEN = "#003926";
const FALLBACK = "/images/new-img/model-1/824/824-RGFS-3-nobg.png";

function FadeIn({ children, delay = 0, className = "", style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function MilestoneSection({ m, index }: { m: Milestone; index: number }) {
  const isEven = index % 2 === 0;
  const sectionBg = isEven ? "#faf9f6" : "#f2ede4";

  return (
    <section style={{ background: sectionBg, borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-16">

        {/* Year + Title Header Row */}
        <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-6 md:gap-12 mb-8 md:mb-12`}>
          <FadeIn delay={0} className="select-none shrink-0">
            <div className="font-montserrat text-[#003926] font-bold leading-[0.85] tracking-[-0.04em] text-[clamp(4rem,10vw,8.5rem)]">
              {m.year}
            </div>
            <div className="w-14 h-1 bg-[#B8935A] mt-2 rounded-sm" />
          </FadeIn>

          <FadeIn delay={0.12} className="max-w-xl pt-2">
            <h2 className="font-montserrat font-bold uppercase tracking-[0.04em] text-[#1A1918] text-[clamp(1.1rem,2vw,1.4rem)] mb-2.5 leading-tight">
              {m.title}
            </h2>
            <div className="w-8 h-[2px] bg-[#003926] mb-3" />
            <p className="font-montserrat text-[14px] leading-[1.85] text-[#5C5750] font-normal text-left">
              {m.text}
            </p>
          </FadeIn>
        </div>

        {/* Photo + Text Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">
          <FadeIn delay={0.08} className={isEven ? "order-1" : "order-1 md:order-2"}>
            <div style={{ position: "relative", borderRadius: "3px", background: sectionBg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "200px", border: "1px solid rgba(0,0,0,0.06)", padding: m.isLogo ? "3rem 2rem 4.5rem" : "0" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
                <p className="font-cormorant italic text-[13px] text-white/90 tracking-[0.08em] m-0">
                  {m.year} — {m.title}
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.18} className={isEven ? "order-2" : "order-2 md:order-1"}>
            <p className="font-montserrat text-[14px] sm:text-[15px] leading-[1.85] text-[#1A1918] font-normal text-left mb-6">
              <span className="float-left font-montserrat font-bold leading-[0.78] mr-2 mt-1 text-[#003926] text-[clamp(2.5rem,4.5vw,3.5rem)]">
                {m.extra.charAt(0)}
              </span>
              {m.extra.slice(1)}
            </p>
            {m.image2 ? (
              <div style={{ borderRadius: "3px", background: sectionBg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "140px", border: "1px solid rgba(0,0,0,0.06)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
    <div className="font-montserrat bg-white text-[#1A1918]">

      {/* ---- MAIN HERO BANNER (full-bleed image at top) ---- */}
      <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: "100vh", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/about us journey/banner-tt.jpg"
          alt="Nagpal Group Heritage"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", filter: "grayscale(100%) brightness(0.78)" }}
          onError={(e) => { const t = e.target as HTMLImageElement; if (t.src.includes("banner-tt.jpg")) t.src = "/images/about-2.png"; }}
        />
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1rem 1.5rem",
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.3) 65%, transparent 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          zIndex: 2,
          pointerEvents: "none"
        }}>
          <p style={{
            fontFamily: "var(--font-montserrat, 'Montserrat', sans-serif)",
            fontWeight: 300,
            fontSize: "clamp(11.5px, 0.9vw, 14.5px)",
            letterSpacing: "0.18em",
            color: "rgba(255, 255, 255, 0.92)",
            textTransform: "uppercase",
            margin: 0
          }}>
            Eight Decades of Horological Mastery &middot; From Amritsar to the World &middot; 1940 &ndash; 2025
          </p>
        </div>
      </section>

      {/* ---- INTRO TEXT SECTION ---- */}
      <section style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "4rem 1.5rem 0" }}>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <div>
                <p className="font-montserrat text-[14px] sm:text-[15px] leading-[1.85] text-[#1A1918] font-normal text-left">
                  <span className="float-left font-montserrat font-bold leading-[0.75] mr-2 mt-1 text-[#003926] text-[clamp(2.8rem,6vw,4.2rem)]">A</span>
                  vast watch empire, born at the heart of an immense nation and a business that has promised so much. The Nagpal Group, 1940 to 2025, explores the origins, growth and legacy of one of the most transformative periods in Indian horology. In this wide-ranging narrative, the Nagpal family discusses how their legacy shapes watches beyond ideology, placing it firmly in the context of commerce, craft, and cultural aspiration.
                </p>
              </div>
              <div>
                <p className="font-montserrat text-[14px] sm:text-[15px] leading-[1.85] text-[#5C5750] font-normal text-left">
                  From the final decades of tradition to the resurgence of D'Signer, the Nagpal story reveals how horological hopes collided with harsh realities, from small Amritsar workshops to global OEM manufacturing, supplying over 500 private labels across the world, and why the legacy continues to shape India's watch industry today. With 20+ international brands, Designer World stands as a chronicle of Indian horology's finest chapter.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-8 sm:gap-20 my-10 pt-10 pb-10 border-t border-black/[0.08] text-center w-full">
              {[["4", "Generations"], ["20+", "Intl Brands"], ["500+", "OEM Labels"]].map(([num, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div className="font-cormorant text-[36px] sm:text-[44px] font-bold text-[#003926] leading-none">{num}</div>
                  <div className="font-dm text-[11px] text-[#9C9690] uppercase tracking-[0.2em] font-bold mt-1.5">{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---- MILESTONES ---- */}
      {milestones.map((m, i) => (
        <MilestoneSection key={m.year + "-" + i} m={m} index={i} />
      ))}

      {/* ---- CHAIRMAN MESSAGE ---- */}
      <section style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", background: "#f6f6f3" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "4.5rem 1.5rem" }}>
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">
              <div>
                <div style={{ position: "relative", overflow: "hidden", borderRadius: "3px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/aboutImg3.png"
                    alt="Jatinder Nagpal Chairman"
                    style={{ width: "100%", objectFit: "cover", height: "clamp(260px, 32vw, 460px)", filter: "grayscale(20%)", display: "block" }}
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
                  />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.45rem 0.9rem", background: "rgba(0,57,38,0.85)" }}>
                    <p className="font-cormorant italic text-[13px] text-white/90 tracking-[0.08em] m-0">
                      Jatinder Nagpal, Chairman, Designer World
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ borderLeft: "4px solid " + GREEN, paddingLeft: "1.4rem", marginBottom: "1.5rem" }}>
                  <h2 className="font-montserrat font-bold uppercase tracking-[0.04em] text-[#1A1918] text-[clamp(1.1rem,2.2vw,1.7rem)] m-0 leading-tight">
                    Chairman Message
                  </h2>
                </div>
                <p className="font-montserrat text-[14px] sm:text-[15px] leading-[1.85] text-[#5C5750] font-normal text-left mb-4">
                  On behalf of our entire team, I extend my heartfelt thanks to all the proud owners and loyal users of our house brands, D'SIGNER and ESCORT. Our parent company, Nagpals, has been a trusted name in watch components for decades.
                </p>
                <p className="font-montserrat text-[14px] sm:text-[15px] leading-[1.85] text-[#5C5750] font-normal text-left mb-4">
                  Building on this rich legacy, we ventured into the world of premium timepieces in 1991, inspired by the elegance of Swiss and European watchmaking traditions. This led to the birth of D'SIGNER which quickly carved out a niche for itself by upholding the highest standards of design and quality. In 1995, we introduced ESCORT, a brand that delivers high-quality watches at affordable prices, making stylish timekeeping accessible to all.
                </p>
                <p className="font-montserrat text-[14px] sm:text-[15px] leading-[1.85] text-[#5C5750] font-normal text-left mb-6">
                  Today, both D'SIGNER and ESCORT enjoy a strong presence across the country through our Multi Brand Stores, with millions of happy customers who continue to place their trust in us. I sincerely thank each one of you for being a part of this journey.
                </p>
                <p className="font-dm text-[11px] text-[#9C9690] uppercase tracking-[0.2em] font-bold">
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
                <p className="font-dm text-[11px] text-[#B8935A] uppercase tracking-[0.25em] font-bold mb-3">TODAY</p>
                <h2 className="font-montserrat font-light text-white tracking-[-0.02em] text-[clamp(2rem,5vw,4rem)] leading-none mb-5">
                  Affordable Luxury.
                </h2>
                <div className="w-10 h-1 bg-[#B8935A] mb-5 rounded-sm" />
                <p className="font-montserrat text-[14px] sm:text-[15px] leading-[1.85] text-white/80 font-normal text-left">
                  Blending decades of legacy with modern design, Designer World continues to create watches that balance style, quality, and accessibility. 4 generations of expertise. 20+ international brands. 500+ private labels manufactured.
                </p>
              </div>
              <div>
                <div style={{ overflow: "hidden", borderRadius: "8px", background: "#ffffff", padding: "0.5rem", boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
