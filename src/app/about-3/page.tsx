"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./about3.module.css";

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

/* ═══════════════════════════════════════════════════════════════
   Timeline Data — 16 Complete Milestones across 8 Spreads
   ═══════════════════════════════════════════════════════════════ */

type TimelineEra = {
  yearTop: string;
  yearBottom: string;
  yearSuffix?: string;
  tagline: string;
  description: string[];
};

type SpreadData = {
  centerImg: string;
  centerAlt: string;
  era1: TimelineEra;
  era2?: TimelineEra;
  spreadIndex: number;
};

const spreads: SpreadData[] = [
  {
    centerImg: "/images/about us journey/bg1.png",
    centerAlt: "1940s The Beginning & 1960s The 2nd Generation of Nagpal Watch.CO",
    spreadIndex: 0,
    era1: {
      yearTop: "19",
      yearBottom: "40",
      yearSuffix: "s",
      tagline: "The Beginning",
      description: [
        "A small watch parts shop in Amritsar marked the start of a journey rooted in craftsmanship and trust. Shree Virbhan Nagpal laid the foundation for what would become a national watch business spanning generations.",
        "The first workshop occupied a small corner of the Amritsar bazaar, yet every component was handled with the precision of a master craftsman. Long before watches became fashion, Nagpals understood the soul of a timepiece.",
      ],
    },
    era2: {
      yearTop: "19",
      yearBottom: "60",
      yearSuffix: "s",
      tagline: "The 2nd Generation of Nagpal Watch.CO",
      description: [
        "This was when the 2nd generation of Nagpal's family entered the business, deepening roots in horology and building relationships with component suppliers across Northern India.",
        "International partnerships formed the backbone of a growing enterprise. By the mid-60s, Nagpals had become a trusted name in the Northern India trade circuit for precision components and watch batteries.",
      ],
    },
  },
  {
    centerImg: "/images/about us journey/bg2.png",
    centerAlt: "1976 Nagpal's Bombay was formed & 1991 A Brand is Born",
    spreadIndex: 1,
    era1: {
      yearTop: "19",
      yearBottom: "76",
      tagline: "Nagpal's Bombay was formed",
      description: [
        "In 1976 the family established their new company here under the name 'NAGPALS BOMBAY'. With extensive efforts, support & dedication the network expanded all around India.",
        "This was the time when they travelled to international markets to import parts & components for direct distribution and during 1980s various BUTTON CELL brands tied up with NAGPALS BOMBAY for battery distribution all over India. Brands from Japan like MAXELL & Swiss like RENATA became a major area of company's focus for growth.",
      ],
    },
    era2: {
      yearTop: "19",
      yearBottom: "91",
      tagline: "A Brand is Born",
      description: [
        "D'SIGNER was introduced, a step into creating watches defined by design, quality, and individuality. One of the early Indian brands to design and manufacture to international horological standards.",
        "D'Signer was not simply a product launch but a philosophical statement. At a time when Indian watchmaking was dominated by mass-market models, D'Signer chose craftsmanship over compromise and design over convention.",
      ],
    },
  },
  {
    centerImg: "/images/about us journey/bg3.png",
    centerAlt: "1995 Style for All & 1998 Introduction of Tissot in India",
    spreadIndex: 2,
    era1: {
      yearTop: "19",
      yearBottom: "95",
      tagline: "Style for All",
      description: [
        "ESCORT was launched to make timeless design more accessible, bringing style to a wider audience with robust everyday timepieces at honest prices.",
        "Escort answered a simple question: why shouldn't every Indian have access to a reliable, beautifully finished timepiece? The market responded with extraordinary enthusiasm.",
      ],
    },
    era2: {
      yearTop: "19",
      yearBottom: "98",
      tagline: "Introduction of Tissot in India",
      description: [
        "We were the ones to launch TISSOT watches in India as national distributors. We initiated the distribution for Tissot, Givenchy Paris, Christian Bernard Paris, and Rotary in India.",
        "Bringing prestige Swiss and French horological brands to Indian retail counters established the Nagpal Group as an esteemed national distributor.",
      ],
    },
  },
  {
    centerImg: "/images/about us journey/bglast6.png",
    centerAlt: "2004 D'signer Effects & 2010 B2B & Corporate Gifting",
    spreadIndex: 3,
    era1: {
      yearTop: "20",
      yearBottom: "04",
      tagline: "D'signer Effects",
      description: [
        "We started a division purely in the corporate gifts & promotion business under the name D'SIGNER EFFECTS. Here the idea was to connect with all small and large organizations, offering all sorts of promotion gifts for schemes and marketing plans.",
        "Connecting brand messaging with high-quality custom corporate gifts allowed businesses across India to elevate their marketing initiatives and employee reward programs.",
      ],
    },
    era2: {
      yearTop: "20",
      yearBottom: "10",
      tagline: "B2B & Corporate Gifting",
      description: [
        "B2B & Corporate Gifting became a very important focus as wristwatches became a strong category for business promotion and marketing plans for major corporates. Launched clocks & bags category under D'SIGNER for B2B requirements.",
        "DESIGNER WATCHES scaled production skills and managed largest volume B2B orders of watches in lakhs, delivering projects for esteemed groups like TATA INDICOM, REEBOK, NIKON, and PHARMA COMPANIES.",
      ],
    },
  },
  {
    centerImg: "/images/about us journey/bglast7.png",
    centerAlt: "2013 Daniel Klein in India & 2015 Beyond Our Own Brand",
    spreadIndex: 4,
    era1: {
      yearTop: "20",
      yearBottom: "13",
      tagline: "Daniel Klein in India",
      description: [
        "Got exclusive distribution of Daniel Klein, a leading Turkish brand of watches and fashion accessories, in India.",
        "Bringing dynamic international styling and accessible luxury to retail counters opened new fashion-forward demographics across all major tier-1 and tier-2 cities.",
      ],
    },
    era2: {
      yearTop: "20",
      yearBottom: "15",
      tagline: "Beyond Our Own Brand",
      description: [
        "Expanding into OEM manufacturing, we began designing and producing watches for global and national brands, marking a significant leap in manufacturing capability.",
        "Over 500 private labels would trust our manufacturing expertise to engineer precision timepieces adhering to international quality benchmarks.",
      ],
    },
  },
  {
    centerImg: "/images/about us journey/bglast8.png",
    centerAlt: "2017 Adding More Brands & 2020 The Digital Shift",
    spreadIndex: 5,
    era1: {
      yearTop: "20",
      yearBottom: "17",
      tagline: "Adding More Brands",
      description: [
        "The house introduced few more international fashion brands in its distribution channel: MATHEY TISSOT and D1 MILANO.",
        "Same year Designer World stepped into international exports, in London, Singapore, and in Middle Eastern countries like Bahrain and Oman.",
      ],
    },
    era2: {
      yearTop: "20",
      yearBottom: "20",
      tagline: "The Digital Shift",
      description: [
        "With the rise of e-commerce, we adapted quickly, designing for online-first brands and expanding our reach across digital platforms.",
        "Direct-to-consumer acceleration and modern logistics allowed us to deliver timepieces with agility to watch lovers across India.",
      ],
    },
  },
  {
    centerImg: "/images/about us journey/bglast9.png",
    centerAlt: "2022 Designer World Brands & 2024 D'signer Diamond Watches",
    spreadIndex: 6,
    era1: {
      yearTop: "20",
      yearBottom: "22",
      tagline: "Designer World Brands",
      description: [
        "Started a new division solely managing foreign brand distribution under the name DESIGNER WORLD BRANDS & added more labels like INGERSOLL, INVICTA, and SANTA BARBARA POLO CLUB.",
        "Dedicated brand management infrastructure empowered global fashion icons to flourish in the Indian marketplace.",
      ],
    },
    era2: {
      yearTop: "20",
      yearBottom: "24",
      tagline: "D'signer Diamond Watches",
      description: [
        "Launched Lab Grown Diamond Studded Watches as a new step to reach a more luxury audience, featuring models ranging up to Rs. 1,50,000/-.",
        "Combining modern ethical lab-grown diamonds with Swiss-inspired horology to deliver sophisticated luxury for discerning collectors.",
      ],
    },
  },
  {
    centerImg: "/images/about us journey/bglast10.png",
    centerAlt: "2025 Time Corridor & Today Affordable Luxury",
    spreadIndex: 7,
    era1: {
      yearTop: "20",
      yearBottom: "25",
      tagline: "Time Corridor",
      description: [
        "A latest feather in Designer World story. At Designer World it's not about just the product we make but the aura we pass to our user with the time we design.",
        "This retail Time Boutique is initiated to promote our home brands, D'SIGNER & ESCORT watches at a unique experience store showcasing our prime models, new launches, top sellers & special editions with an appealing display and aura. A gesture to connect & add some value to our happy watch buyers.",
      ],
    },
    era2: {
      yearTop: "TO",
      yearBottom: "DAY",
      tagline: "Affordable Luxury",
      description: [
        "Blending decades of legacy with modern design, Designer World continues to create watches that balance style, quality, and accessibility.",
      ],
    },
  },
];

/* ═══════════════════════════════════════════════════════════════
   Year + Tagline Component (large bold green year + italic tagline)
   ═══════════════════════════════════════════════════════════════ */

function YearTagline({ era }: { era: TimelineEra }) {
  return (
    <div className={styles.yearTaglineContent}>
      <div className={styles.bigYear}>
        <span>{era.yearTop}</span>
        <div className={styles.bigYearBottom}>
          <span>{era.yearBottom}</span>
          {era.yearSuffix && <span className={styles.yearSuffix}>{era.yearSuffix}</span>}
        </div>
      </div>
      <div className={styles.tagline}>
        {era.tagline === "The 2nd Generation" ? (
          <>The 2<sup>nd</sup> Generation</>
        ) : (
          era.tagline
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Description Component (paragraphs of body text)
   ═══════════════════════════════════════════════════════════════ */

function Description({ era }: { era: TimelineEra }) {
  return (
    <div className={styles.descriptionContent}>
      {era.description.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Spread Component — 2 eras per spread, center green image
   Alternation based on global era index:
     even (0, 2, 4, 6, 8, 10, 12, 14) → Year/Tagline LEFT, Description RIGHT
     odd  (1, 3, 5, 7, 9, 11, 13, 15) → Description LEFT, Year/Tagline RIGHT
   ═══════════════════════════════════════════════════════════════ */

function SpreadSection({ spread }: { spread: SpreadData }) {
  return (
    <section className={styles.spreadWrapper}>
      <div className={styles.spreadGrid}>

        {/* ── ERA 1: YEAR + TAGLINE (Top-Left) ── */}
        <div className={`${styles.gridCell} ${styles.r1Col1} ${styles.mobileOrder1}`}>
          <div className={styles.cellInner}>
            <YearTagline era={spread.era1} />
          </div>
        </div>

        {/* ── ERA 1: DESCRIPTION (Top-Right) ── */}
        <div className={`${styles.gridCell} ${styles.r1Col3} ${styles.mobileOrder2}`}>
          <div className={styles.cellInner}>
            <Description era={spread.era1} />
          </div>
        </div>

        {/* ── CENTER CONTINUOUS IMAGE (spans both rows) ── */}
        <div className={`${styles.centerCol} ${styles.mobileOrder3}`}>
          <div className={styles.centerImgWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={spread.centerImg}
              alt={spread.centerAlt}
              className={styles.centerImg}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes("bg66.png") && target.src.includes("bg6.png")) {
                  target.src = "/images/about us journey/bg66.png";
                }
              }}
            />
          </div>
        </div>

        {/* ── ERA 2: YEAR + TAGLINE (Bottom-Right) ── */}
        {spread.era2 && (
          <div className={`${styles.gridCell} ${styles.r2Col3} ${styles.mobileOrder4}`}>
            <div className={styles.cellInner}>
              <YearTagline era={spread.era2} />
            </div>
          </div>
        )}

        {/* ── ERA 2: DESCRIPTION (Bottom-Left) ── */}
        {spread.era2 && (
          <div className={`${styles.gridCell} ${styles.r2Col1} ${styles.mobileOrder5}`}>
            <div className={styles.cellInner}>
              <Description era={spread.era2} />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function About3Page() {
  return (
    <main className={styles.page}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/about us journey/banner-tt.jpg"
          alt="Nagpal Group Heritage"
          className={styles.heroImg}
          onError={(e) => { const t = e.target as HTMLImageElement; if (t.src.includes("banner-tt.jpg")) t.src = "/images/about-2.png"; }}
        />
        <div className={styles.heroCaption}>
          <p className={styles.heroCaptionText}>
            Eight Decades of Horological Mastery &middot; From Amritsar to the World &middot; 1940 &ndash; 2025
          </p>
        </div>
      </section>

      {/* ---- INTRO TEXT & STATS SECTION ---- */}
      <section className={styles.introSection}>
        <div className={styles.introContainer}>
          <FadeIn delay={0.1}>
            <div className={styles.introGrid}>
              <div>
                <p className={styles.introTextLeft}>
                  <span className={styles.dropCap}>A</span>
                  vast watch empire, born at the heart of an immense nation and a business that has promised so much. The Nagpal Group, 1940 to 2025, explores the origins, growth and legacy of one of the most transformative periods in Indian horology. In this wide-ranging narrative, the Nagpal family discusses how their legacy shapes watches beyond ideology, placing it firmly in the context of commerce, craft, and cultural aspiration.
                </p>
              </div>
              <div>
                <p className={styles.introTextRight}>
                  From the final decades of tradition to the resurgence of D&apos;Signer, the Nagpal story reveals how horological hopes collided with harsh realities, from small Amritsar workshops to global OEM manufacturing, supplying over 500 private labels across the world, and why the legacy continues to shape India&apos;s watch industry today. With 20+ international brands, Designer World stands as a chronicle of Indian horology&apos;s finest chapter.
                </p>
              </div>
            </div>

            <div className={styles.statsDivider} />

            <div className={styles.statsRow}>
              {[
                ["4", "Generations"],
                ["20+", "Intl Brands"],
                ["500+", "OEM Labels"],
              ].map(([num, label]) => (
                <div key={label} className={styles.statItem}>
                  <div className={styles.statNum}>{num}</div>
                  <div className={styles.statLabel}>{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Unified Continuous Timeline Container */}
      <div className={styles.timelineContainer}>
        {spreads.map((s) => (
          <SpreadSection key={s.spreadIndex} spread={s} />
        ))}
      </div>

      {/* ---- CHAIRMAN MESSAGE ---- */}
      <section className={styles.chairmanSection}>
        <div className={styles.chairmanContainer}>
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">
              <div>
                <div className={styles.chairmanImgWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/aboutImg3.png"
                    alt="Jatinder Nagpal Chairman"
                    className={styles.chairmanImg}
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
                  />
                  <div className={styles.chairmanBadge}>
                    <p className="font-cormorant italic text-[13px] text-white/90 tracking-[0.08em] m-0">
                      Jatinder Nagpal, Chairman, Designer World
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.chairmanHeadingWrap}>
                  <h2 className={styles.chairmanHeading}>
                    CHAIRMAN MESSAGE
                  </h2>
                </div>
                <p className={styles.chairmanText}>
                  On behalf of our entire team, I extend my heartfelt thanks to all the proud owners and loyal users of our house brands, D&apos;SIGNER and ESCORT. Our parent company, Nagpals, has been a trusted name in watch components for decades.
                </p>
                <p className={styles.chairmanText}>
                  Building on this rich legacy, we ventured into the world of premium timepieces in 1991, inspired by the elegance of Swiss and European watchmaking traditions. This led to the birth of D&apos;SIGNER which quickly carved out a niche for itself by upholding the highest standards of design and quality. In 1995, we introduced ESCORT, a brand that delivers high-quality watches at affordable prices, making stylish timekeeping accessible to all.
                </p>
                <p className={styles.chairmanText}>
                  Today, both D&apos;SIGNER and ESCORT enjoy a strong presence across the country through our Multi Brand Stores, with millions of happy customers who continue to place their trust in us. I sincerely thank each one of you for being a part of this journey.
                </p>
                <p className={styles.chairmanSign}>
                  Jatinder Nagpal, Chairman
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---- CLOSING / TODAY ---- */}
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
    </main>
  );
}
