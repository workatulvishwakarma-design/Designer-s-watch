"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { X } from "lucide-react";

/* ════════════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════════════ */
interface Milestone {
  year: string;
  title: string;
  text: string;
  image1: string;
  image2: string;
}

const milestones: Milestone[] = [
  {
    year: "1940s",
    title: "The Beginning",
    text: "A small watch parts shop in Amritsar marked the start of a journey rooted in craftsmanship and trust. Shree Virbhan Nagpal laid the foundation for what would become a national watch business spanning generations.",
    image1: "/images/about us journey/1940s — The Beginning/about-img1_1.webp",
    image2: "/images/about us journey/1960- The 2nd Generation/WhatsApp Image 2026-04-27 at 10.50.37 AM (1).jpeg",
  },
  {
    year: "1960s",
    title: "2nd Generation",
    text: "The 2nd generation of the Nagpal family enters the business, deepening roots in horology and building relationships with international component suppliers across northern India.",
    image1: "/images/about us journey/1960- The 2nd Generation/WhatsApp Image 2026-04-27 at 10.50.37 AM.jpeg",
    image2: "/images/about us journey/1960- The 2nd Generation/WhatsApp Image 2026-04-13 at 8.14.16 AM (1).jpeg",
  },
  {
    year: "1976",
    title: "Nagpal's Bombay",
    text: "The 3rd generation moves to Mumbai and establishes 'NAGPALS BOMBAY'. The network expands all around India, with international travel for parts & battery distribution. MAXELL and RENATA become major focus areas.",
    image1: "/images/about us journey/1976 - Nagpal Bombay/IMG_0216.jpeg",
    image2: "/images/new-content/pillars/Corporate B2B/34.jpg",
  },
  {
    year: "1991",
    title: "A Brand is Born",
    text: "D'SIGNER is introduced — a step into creating watches defined by design, quality, and individuality. One of the early Indian brands to design and manufacture to international standards.",
    image1: "/images/about us journey/1991 — A Brand is Born/Backup_of_dq designer old logo-13.png",
    image2: "/images/about us journey/1991 — A Brand is Born/1 (7).jpg",
  },
  {
    year: "1992",
    title: "Voltage Batteries",
    text: "An ambitious attempt to produce watch button cells with a small manufacturing unit in Nashik — a pioneering step into domestic production of watch components.",
    image1: "/images/about us journey/1992 - Voltage Batteries/IMG_0205.jpeg",
    image2: "/images/new-content/pillars/Corporate B2B/4.jpg",
  },
  {
    year: "1995",
    title: "Style for All",
    text: "ESCORT is launched to make timeless design more accessible, bringing reliable quality watches to a wider Indian audience at affordable prices.",
    image1: "/images/about us journey/1995 — Style for All/Escort Logo 1995.png",
    image2: "/images/about us journey/1995 — Style for All/IMG_7789.jpeg",
  },
  {
    year: "1998",
    title: "Tissot in India",
    text: "Nagpal Group becomes among the first national distributors for TISSOT, Givenchy Paris, Christian Bernard Paris, and Rotary in India — a major credibility milestone.",
    image1: "/images/watches/ESCORT POSTER-20260312T064608Z-1-001/ESCORT POSTER/Escort -1.jpg",
    image2: "/images/watches/ESCORT POSTER-20260312T064608Z-1-001/ESCORT POSTER/Escort.jpg",
  },
  {
    year: "2004",
    title: "D'signer Effects",
    text: "A corporate gifts & promotion division launched under D'SIGNER EFFECTS to connect with organisations, offering promotional gifts for schemes and marketing plans.",
    image1: "/images/about us journey/1991 — A Brand is Born/2 (6).jpg",
    image2: "/images/new-img/pillars/4.jpg",
  },
  {
    year: "2007",
    title: "Daniel Klein",
    text: "Exclusive distribution rights for Turkish brand Daniel Klein in India. Grows into a top performer on e-commerce platforms with 1000+ models per year.",
    image1: "/images/about us journey/2007 - Daniel Klein/daniel klein exclusive-13.png",
    image2: "/images/about us journey/1991 — A Brand is Born/3 (3).jpg",
  },
  {
    year: "2010",
    title: "B2B & Corporate",
    text: "Corporate gifting becomes a strategic pillar. Largest volume B2B watch orders for TATA INDICOM, REEBOK, NIKON, and leading pharma companies. Clocks & bags added under D'SIGNER.",
    image1: "/images/watches/ESCORT POSTER-20260312T064608Z-1-001/ESCORT POSTER/Escort-2.jpg",
    image2: "/images/new-content/home2-club-escort-hand.png",
  },
  {
    year: "2015",
    title: "Beyond the Brand",
    text: "Expanding into OEM manufacturing — designing and producing watches for global and national brands, a significant leap in manufacturing capability.",
    image1: "/images/about us journey/2015 — Beyond Our Own Brand/WhatsApp Image 2026-04-04 at 4.14.22 PM (1).jpeg",
    image2: "/images/watches/ESCORT POSTER-20260312T064608Z-1-001/ESCORT POSTER/1 (4).jpg",
  },
  {
    year: "2017",
    title: "Adding More Brands",
    text: "MATHEY TISSOT and D1 MILANO join the portfolio. Designer World steps into international exports — London, Singapore, Bahrain, and Oman.",
    image1: "/images/watches/ESCORT POSTER-20260312T064608Z-1-001/ESCORT POSTER/824RGFS.16G.jpg",
    image2: "/images/threeimg1-nobg.png",
  },
  {
    year: "2020",
    title: "The Digital Shift",
    text: "Nagpal Group adapts quickly to the e-commerce boom, designing for online-first brands and expanding reach across all major digital channels in India.",
    image1: "/images/about us journey/1991 — A Brand is Born/5 (2).jpg",
    image2: "/images/threeimg2-nobg.png",
  },
  {
    year: "2022",
    title: "Designer World Brands",
    text: "A new division managing foreign brand distribution — DESIGNER WORLD BRANDS — adds INGERSOL, INVICTA, and SANTA BARBARA POLO CLUB to the portfolio.",
    image1: "/images/about us journey/2022 - Designer world Brands/DW-BRANDS-LOGO-B.png",
    image2: "/images/about us journey/2022 - Designer world Brands/DW-BRANDS-LOGO-White (1).png",
  },
  {
    year: "2024",
    title: "Diamond Watches",
    text: "Lab Grown Diamond Studded Watches launched, targeting a luxury audience with models up to ₹1,50,000. A new chapter in premium horology.",
    image1: "/images/about us journey/2024 - Designer Lab Grown Diamond studded watches/DIAMOND SHOOT 16-09-2025/746GM.2L.jpg",
    image2: "/images/about us journey/2024 - Designer Lab Grown Diamond studded watches/DIAMOND SHOOT 16-09-2025/810GM.2L.jpg",
  },
  {
    year: "2025",
    title: "Time Corridor",
    text: "A retail Time Boutique showcasing D'SIGNER & ESCORT — prime models, new launches, top sellers and special editions in a unique experience store.",
    image1: "/images/about us journey/2025 - Time Corridor/1A1A8511.JPG",
    image2: "/images/about us journey/2025 - Time Corridor/DSIGNER TIME CORRIDOR LOGO final.png",
  },
  {
    year: "Today",
    title: "Affordable Luxury",
    text: "4 generations of expertise. 20+ international brands. 500+ private labels manufactured. Blending legacy with modern design to create watches that balance style, quality, and accessibility.",
    image1: "/images/today1.png",
    image2: "/images/about us journey/2024 - Designer Lab Grown Diamond studded watches/DIAMOND SHOOT 16-09-2025/834GM.16L.jpg",
  },
];

const ERA_RANGES = [
  { label: "1940s – 1976", start: 0, end: 2 },
  { label: "1991 – 2010", start: 3, end: 9 },
  { label: "2015 – Today", start: 10, end: 16 },
];

const FALLBACK = "/images/today1.png";

/* ════════════════════════════════════════════════════════════════
   3D CARD STACKING SLIDE COMPONENT WITH PARALLAX SWIPE
════════════════════════════════════════════════════════════════ */
function TimelineCard({
  m,
  i,
  total,
  slideRef,
}: {
  m: Milestone;
  i: number;
  total: number;
  slideRef: (el: HTMLElement | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // 3D Parallax & Card Swipe Transformations
  const yOffset = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const scale = useTransform(scrollYProgress, [0.4, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.35, 0.85, 1]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "sticky",
        top: `calc(120px + ${i * 4}px)`,
        zIndex: i + 1,
      }}
    >
      <motion.section
        ref={slideRef}
        data-slide-idx={i}
        style={{
          y: yOffset,
          scale,
          opacity,
          minHeight: "82vh",
          display: "flex",
          alignItems: "center",
          borderRadius: "1.5rem 1.5rem 0 0",
          borderTop: "1px solid rgba(0,0,0,0.09)",
          borderLeft: "1px solid rgba(0,0,0,0.04)",
          borderRight: "1px solid rgba(0,0,0,0.04)",
          boxShadow: "0 -16px 36px rgba(0,0,0,0.06)",
          background: i % 2 === 0 ? "#ffffff" : "#fbfbfb",
          padding: "0 2.5rem",
          position: "relative",
          transformOrigin: "center top",
          scrollMarginTop: "140px",
        }}
      >
        {/* Cellini 3-column layout */}
        <div style={{
          width: "100%", maxWidth: "1200px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "3rem",
          alignItems: "center",
          padding: "4rem 0",
        }}>

          {/* LEFT: heading + text + small image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <p style={{
              fontSize: "0.6rem", fontWeight: 700, color: "#003926",
              letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "1rem",
            }}>
              {m.title}
            </p>
            <p style={{
              fontSize: "0.88rem", color: "#444", lineHeight: 1.8,
              marginBottom: "2rem", maxWidth: "340px",
            }}>
              {m.text}
            </p>
            {/* Small secondary image */}
            <div style={{
              borderRadius: "0.875rem", overflow: "hidden",
              border: "1px solid #e0e0e0", background: "#f8f8f8",
              maxWidth: "260px",
            }}>
              <img
                src={m.image1}
                alt={`${m.title} — detail`}
                style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
              />
            </div>
          </motion.div>

          {/* CENTER: Giant year watermark + step number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{ textAlign: "center" }}
          >
            <div style={{
              fontSize: "clamp(5rem, 10vw, 8.5rem)",
              fontWeight: 900,
              color: "#f0f0f0",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              userSelect: "none",
              marginBottom: "1.5rem",
              fontVariantNumeric: "tabular-nums",
            }}>
              {m.year}
            </div>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              border: "1.5px solid #e0e0e0",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto",
            }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#999", letterSpacing: "0.06em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.div>

          {/* RIGHT: main feature image + caption */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div style={{
              borderRadius: "1rem", overflow: "hidden",
              border: "1px solid #e0e0e0", background: "#f8f8f8",
              marginBottom: "1.25rem",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}>
              <img
                src={m.image2}
                alt={m.title}
                style={{ width: "100%", height: "280px", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
              />
            </div>
            <p style={{ fontSize: "0.78rem", color: "#888", lineHeight: 1.65, fontStyle: "italic" }}>
              {m.year} · {m.title}
            </p>
          </motion.div>

        </div>

        {/* Milestone index line on far right */}
        <div style={{
          position: "absolute", right: "2.5rem", top: "50%",
          transform: "translateY(-50%)",
          fontSize: "0.6rem", fontWeight: 700, color: "#e0e0e0",
          letterSpacing: "0.1em", writingMode: "vertical-rl",
          userSelect: "none",
        }}>
          {String(i + 1).padStart(2, "0")} / {total}
        </div>
      </motion.section>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE COMPONENT
════════════════════════════════════════════════════════════════ */
export default function AboutPage2() {
  // For section-1 era selectors
  const [eraIdx, setEraIdx] = useState(0);
  // For sticky active year
  const [stickyActive, setStickyActive] = useState(0);
  // For hover state active year
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  // Track scroll position for sticky header style transition
  const [isScrolled, setIsScrolled] = useState(false);

  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const stickyActiveRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── IntersectionObserver for timeline slides ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-slide-idx"));
            if (!isNaN(idx) && stickyActiveRef.current !== idx) {
              stickyActiveRef.current = idx;
              setStickyActive(idx);
              const eraMatch = ERA_RANGES.findIndex((e) => idx >= e.start && idx <= e.end);
              if (eraMatch >= 0) setEraIdx(eraMatch);
            }
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    slideRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToSlide = useCallback((idx: number) => {
    const el = slideRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", background: "#f8f8f8" }}>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 1 — Hero Banner Image (Height increased by 30% to 80vh)
      ════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          height: "80vh",
          minHeight: "560px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src="/images/about-2.png"
          alt="About Nagpal Group History"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            filter: "brightness(0.8)",
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src.includes("/images/about-2.png")) {
              target.src = "/img/about-2.png";
            }
          }}
        />
        {/* Dark Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          }}
        />

        {/* Banner Content Container */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "7rem",
            paddingBottom: "2rem",
            textAlign: "center",
          }}
        >
          {/* Centered History Title */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <h1
              style={{
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "0.05em",
                textTransform: "none",
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                margin: 0,
              }}
            >
              History
            </h1>
          </div>

          {/* Year numbers directly on banner background */}
          <div
            style={{
              width: "100%",
              maxWidth: "1400px",
              padding: "0 1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "nowrap",
                gap: "1.6rem",
                overflowX: "auto",
                scrollbarWidth: "none",
                padding: "0.5rem 0",
              }}
              className="no-scrollbar"
            >
              {milestones.map((m, i) => {
                const isActive = hoveredIdx !== null ? hoveredIdx === i : stickyActive === i;
                return (
                  <button
                    key={i}
                    onClick={() => scrollToSlide(i)}
                    onMouseEnter={() => {
                      setHoveredIdx(i);
                      scrollToSlide(i);
                    }}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
                      letterSpacing: "0.08em",
                      textTransform: "lowercase",
                      background: "none",
                      border: "none",
                      borderBottom: isActive ? "2px solid #ffffff" : "2px solid transparent",
                      paddingBottom: "0.3rem",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      transition: "all 0.2s ease-in-out",
                      outline: "none",
                      textShadow: isActive ? "0 0 12px rgba(255,255,255,0.6)" : "none",
                    }}
                  >
                    {m.year}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Year Navigation Header when scrolling down past banner */}
      {isScrolled && (
        <div
          style={{
            position: "sticky",
            top: "88px",
            zIndex: 50,
            background: "rgba(255, 255, 255, 0.96)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #e8e8e8",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              overflowX: "auto",
              scrollbarWidth: "none",
              gap: 0,
            }}
            className="no-scrollbar"
          >
            {milestones.map((m, i) => {
              const isActive = hoveredIdx !== null ? hoveredIdx === i : stickyActive === i;
              return (
                <button
                  id={`sticky-tab-${i}`}
                  key={i}
                  onClick={() => scrollToSlide(i)}
                  onMouseEnter={() => {
                    setHoveredIdx(i);
                    scrollToSlide(i);
                  }}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    padding: "0.9rem 0",
                    marginRight: "1.6rem",
                    fontSize: "0.75rem",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#003926" : "#777777",
                    letterSpacing: "0.08em",
                    textTransform: "lowercase",
                    background: "none",
                    border: "none",
                    borderBottom: isActive ? "2px solid #003926" : "2px solid transparent",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    outline: "none",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {m.year}
                </button>
              );
            })}
          </div>
          <Link
            href="/about"
            style={{
              padding: "0.5rem",
              color: "#bbb",
              flexShrink: 0,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={15} />
          </Link>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          SECTION 2 — 3D Card Parallax Stacking Timeline
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#f5f5f5", borderTop: "1px solid #e8e8e8", position: "relative" }}>
        {/* 3D PARALLAX SWIPE CARDS */}
        {milestones.map((m, i) => (
          <TimelineCard
            key={i}
            m={m}
            i={i}
            total={milestones.length}
            slideRef={(el) => { slideRefs.current[i] = el; }}
          />
        ))}
      </section>
    </div>
  );
}
