"use client";

import { useRef, useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════
   DESIGNER WORLD JOURNEY — Premium Animated Timeline
   ═══════════════════════════════════════════════════════ */

type Milestone = {
  year: string;
  title: string;
  desc: string;
  type: "text-only" | "text-image";
  image?: string;
  imageType?: "photo" | "logo"; // logos use object-contain, photos use object-cover
};

const MILESTONES: Milestone[] = [
  {
    year: "1940s",
    title: "The Beginning",
    desc: "A small watch parts shop in Amritsar marked the start of a journey rooted in craftsmanship and trust.",
    type: "text-image",
    image: "/images/about us journey/1940s — The Beginning/about-img1_1.webp",
    imageType: "photo",
  },
  {
    year: "1960s",
    title: "The 2nd Generation of Nagpal Watch Co.",
    desc: "This was when the 2nd generation of Nagpal's family entering the business.",
    type: "text-image",
    image: "/images/about us journey/1960- The 2nd Generation/WhatsApp Image 2026-04-27 at 10.50.37 AM.jpeg",
    imageType: "photo",
  },
  {
    year: "1976",
    title: "Nagpal's Bombay Was Formed",
    desc: "In 1976 the family established their new company here under the name 'NAGPALS BOMBAY'. With extensive efforts, support & dedication the network expanded all around India. This was the time when they travelled to international markets to import parts & components for direct distribution. During 1980s various BUTTON CELL brands tied up with NAGPALS BOMBAY for battery distribution all over India. Brands from Japan like MAXELL & Swiss like RENATA became a major area of company's focus for growth.",
    type: "text-image",
    image: "/images/about us journey/1976 - Nagpal Bombay/IMG_0216.jpeg",
    imageType: "photo",
  },
  {
    year: "1991",
    title: "A Brand is Born",
    desc: "D'SIGNER was introduced, a step into creating watches defined by design, quality, and individuality.",
    type: "text-image",
    image: "/images/about us journey/1991 — A Brand is Born/Backup_of_dq designer old logo-13.png",
    imageType: "logo",
  },
  {
    year: "1992",
    title: "Voltage Batteries",
    desc: "An attempt to produce watch button cells, with a small manufacturing unit in Nashik.",
    type: "text-image",
    image: "/images/about us journey/1992 - Voltage Batteries/IMG_0205.jpeg",
    imageType: "photo",
  },
  {
    year: "1995",
    title: "Style for All",
    desc: "ESCORT was launched to make timeless design more accessible, bringing style to a wider audience.",
    type: "text-image",
    image: "/images/about us journey/1995 — Style for All/Escort Logo 1995.png",
    imageType: "logo",
  },
  {
    year: "1998",
    title: "Introduction of Tissot in India",
    desc: "We were the ones to launch TISSOT watches in India as national distributors. We initiated the distribution for Tissot, Givenchy Paris, Christian Bernard Paris, Rotary in India.",
    type: "text-only",
  },
  {
    year: "2004",
    title: "D'signer Effects",
    desc: "We started a division purely in the corporate gifts & promotion business under the name D'SIGNER EFFECTS. Here the idea was to connect with all small and large organizations, offering all sorts of promotional gifts for schemes and marketing plans.",
    type: "text-only",
  },
  {
    year: "2007",
    title: "Daniel Klein in India",
    desc: "Got Exclusive Distribution of a Turkish Brand watches and accessories in India.",
    type: "text-image",
    image: "/images/about us journey/2007 - Daniel Klein/daniel klein exclusive-13.png",
    imageType: "logo",
  },
  {
    year: "2010",
    title: "B2B & Corporate Gifting",
    desc: "B2B & Corporate Gifting became a very important focus for the company as wrist watch became a strong category for business promotion and marketing plans for major corporates. Launched clocks & bags category under D'SIGNER for B2B requirements. DESIGNER WATCHES scaled production skills and managed largest volume B2B orders of watches in lakhs. Projects for esteemed groups like TATA INDICOM, REEBOK, NIKON, PHARMA COMPANIES.",
    type: "text-only",
  },
  {
    year: "2015",
    title: "Beyond Our Own Brand",
    desc: "Expanding into OEM manufacturing, we began designing and producing watches for global and national brands.",
    type: "text-image",
    image: "/images/about us journey/2015 — Beyond Our Own Brand/WhatsApp Image 2026-04-04 at 4.14.22 PM (1).jpeg",
    imageType: "photo",
  },
  {
    year: "2017",
    title: "Adding More Brands",
    desc: "The house introduced few more international fashion brands in its distribution channel: MATHEY TISSOT, D1 MILANO. Same year Designer World stepped into international exports, in London, Singapore, and in middle eastern countries like Bahrain and Oman.",
    type: "text-only",
  },
  {
    year: "2020",
    title: "The Digital Shift",
    desc: "With the rise of e-commerce, we adapted quickly — designing for online-first brands and expanding our reach.",
    type: "text-only",
  },
  {
    year: "2022",
    title: "Designer World Brands",
    desc: "Started a new division solely managing foreign brand distribution under the name DESIGNER WORLD BRANDS & added more labels like INGERSOL, INVICTA, SANTA BARBARA POLO CLUB.",
    type: "text-image",
    image: "/images/about us journey/2022 - Designer world Brands/DW-BRANDS-LOGO-B.png",
    imageType: "logo",
  },
  {
    year: "2024",
    title: "D'signer Diamond Watches",
    desc: "Launched Lab Grown Diamond Studded Watches as a new step to reach a more luxury audience where we have models ranging up to Rs. 1,50,000/-.",
    type: "text-image",
    image: "/images/about us journey/2024 - Designer Lab Grown Diamond studded watches/DIAMOND SHOOT 16-09-2025/746GM.2L.jpg",
    imageType: "photo",
  },
  {
    year: "2025",
    title: "Time Corridor",
    desc: "A latest feather in Designer World's story. At Designer World it's not about just the product we make but the aura we pass to our users with the time we design. This retail Time Boutique is initiated to promote our home brands, D'SIGNER & ESCORT Watches — a unique experience store showcasing our prime models, new launches, top sellers & special editions with an appealing display and aura. This Time Corridor Boutique is a gesture to connect & add some value to our happy watch buyers.",
    type: "text-image",
    image: "/images/about us journey/2025 - Time Corridor/1A1A8511.JPG",
    imageType: "photo",
  },
  {
    year: "Today",
    title: "Affordable Luxury",
    desc: "Blending decades of legacy with modern design, Designer World continues to create watches that balance style, quality, and accessibility.",
    type: "text-only",
  },
];

/* Sidebar floating images — all unique photos from journey folders */
const SIDEBAR_ITEMS: { src: string; top: string; style?: React.CSSProperties }[] = [
  { src: "/images/about us journey/1940s — The Beginning/about-img1_1.webp", top: "2%", style: { width: "75%", borderRadius: "10%", opacity: 0.45 } },
  { src: "/images/about us journey/1976 - Nagpal Bombay/IMG_0216.jpeg", top: "24%", style: { width: "60%", marginLeft: "10%", borderRadius: "10%", opacity: 0.4 } },
  { src: "/images/about us journey/1991 — A Brand is Born/1 (7).jpg", top: "48%", style: { width: "65%", borderRadius: "10%", opacity: 0.4 } },
  { src: "/images/about us journey/2015 — Beyond Our Own Brand/WhatsApp Image 2026-04-04 at 4.14.22 PM (1).jpeg", top: "70%", style: { width: "55%", marginLeft: "10%", borderRadius: "10%", opacity: 0.35 } },
  { src: "/images/about us journey/2025 - Time Corridor/1A1A8511.JPG", top: "90%", style: { width: "60%", borderRadius: "10%", opacity: 0.4 } },
];

/* Large floating "shape" images — all unique, no repeats */
const FLOATING_SHAPES: { src: string; style: React.CSSProperties }[] = [
  { src: "/images/about us journey/1960- The 2nd Generation/WhatsApp Image 2026-04-13 at 8.14.16 AM (1).jpeg", style: { position: "absolute", right: "-2%", top: "5%", width: "16%", maxWidth: "220px", borderRadius: "10%", zIndex: 1, opacity: 0.25 } },
  { src: "/images/about us journey/1991 — A Brand is Born/2 (6).jpg", style: { position: "absolute", right: "1%", top: "25%", width: "13%", maxWidth: "180px", borderRadius: "10%", zIndex: 1, opacity: 0.2 } },
  { src: "/images/about us journey/1995 — Style for All/IMG_7789.jpeg", style: { position: "absolute", right: "-1%", top: "45%", width: "15%", maxWidth: "210px", borderRadius: "10%", zIndex: 1, opacity: 0.22 } },
  { src: "/images/about us journey/2024 - Designer Lab Grown Diamond studded watches/DIAMOND SHOOT 16-09-2025/748RGM.2G.jpg", style: { position: "absolute", right: "2%", top: "65%", width: "12%", maxWidth: "170px", borderRadius: "10%", zIndex: 1, opacity: 0.2 } },
  { src: "/images/about us journey/1992 - Voltage Batteries/IMG_0205.jpeg", style: { position: "absolute", right: "-1%", top: "82%", width: "14%", maxWidth: "200px", borderRadius: "10%", zIndex: 1, opacity: 0.25 } },
];

/* Watermark text blocks for sidebar */
const SIDEBAR_TEXT = [
  { top: "15%", text: "THE\nBEGINNING" },
  { top: "42%", text: "THE LEGACY\nLIVES ON" },
  { top: "72%", text: "FOUR\nGENERATIONS" },
];

/* ── IO hook (single reveal, stays visible) ── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let isMounted = true;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && isMounted) {
          setVis(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40% 0px" }
    );
    obs.observe(el);
    return () => {
      isMounted = false;
      obs.disconnect();
    };
  }, [threshold]);
  return { ref, vis };
}

/* ── CSS (all timeline styles) ── */
const CSS = `
@keyframes jFade { from { opacity:0; transform:translateY(36px) } to { opacity:1; transform:translateY(0) } }
@keyframes jImgIn { from { opacity:0; transform:translateY(40px) scale(1.03) } to { opacity:1; transform:translateY(0) scale(1) } }
@keyframes jSlide { from { opacity:0; transform:translateX(-24px) } to { opacity:1; transform:translateX(0) } }

.jf { opacity:0 } .jf.v { animation: jFade .85s cubic-bezier(.22,1,.36,1) forwards }
.ji { opacity:0 } .ji.v { animation: jImgIn 1.1s cubic-bezier(.22,1,.36,1) forwards }
.js { opacity:0 } .js.v { animation: jSlide .9s cubic-bezier(.22,1,.36,1) forwards }

.j-hov { transition: transform .7s cubic-bezier(.22,1,.36,1); will-change:transform }
.j-hov:hover { transform: scale(1.03) translateY(-3px) }

/* ── Premium Flowing Timeline Line ── */
.j-timeline-track {
  position: absolute;
  left: -2px; /* Adjusted to balance the wider track */
  top: 0;
  bottom: 0;
  width: 6px; /* Bolder width */
  z-index: 5;
  border-radius: 6px;
}

.j-timeline-bg {
  position: absolute;
  inset: 0;
  width: 6px;
  background: rgba(184, 147, 90, 0.1); /* Subtle track background */
  border-radius: 6px;
  box-shadow: inset 0 0 4px rgba(0,0,0,0.05); /* Inner shadow for depth */
}

/* More pronounced dashed overlay pattern for the empty track */
.j-timeline-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 6px;
  background: repeating-linear-gradient(
    180deg,
    transparent,
    transparent 8px,
    rgba(184, 147, 90, 0.08) 8px,
    rgba(184, 147, 90, 0.08) 16px
  );
}

.j-timeline-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 0%;
  transition: height 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  border-radius: 6px;
  /* Flowing liquid gradient */
  background: linear-gradient(
    180deg,
    #B8935A 0%,
    #D4AA72 20%,
    #003926 50%,
    #E8C97A 80%,
    #B8935A 100%
  );
  background-size: 100% 200%;
  animation: liquidFlow 4s linear infinite;
  box-shadow: 
    0 0 10px rgba(184, 147, 90, 0.4),
    0 0 20px rgba(0, 57, 38, 0.2);
}

@keyframes liquidFlow {
  0% { background-position: 0% 0%; }
  100% { background-position: 0% -200%; }
}

/* Glowing tip of the flowing liquid */
.j-timeline-fill::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 80px;
  background: radial-gradient(ellipse at bottom, rgba(232, 201, 122, 0.8) 0%, rgba(184, 147, 90, 0.5) 40%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  filter: blur(2px);
  z-index: 6;
}

/* ── Premium Node / Dot ── */
.j-node {
  position: absolute;
  left: -10px; /* Center with the 6px line */
  width: 22px;
  height: 22px;
  border-radius: 50%;
  z-index: 12;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.j-node-ring {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 3px solid rgba(184, 147, 90, 0.25);
  background: #F5F2ED;
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); /* Outer subtle shadow */
}

/* Inner gold dot */
.j-node-ring::after {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: rgba(184, 147, 90, 0.3);
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Active node state */
.j-node.active .j-node-ring {
  border-color: #B8935A;
  background: #1A1918;
  box-shadow:
    0 0 0 5px rgba(184, 147, 90, 0.15),
    0 0 25px rgba(184, 147, 90, 0.4),
    0 0 50px rgba(0, 57, 38, 0.2);
  transform: scale(1.2);
}

.j-node.active .j-node-ring::after {
  background: #D4AA72;
  box-shadow: 0 0 12px rgba(212, 170, 114, 0.8), 0 0 20px rgba(184, 147, 90, 0.6);
}

/* Outer pulse ring for active nodes */
.j-node-pulse {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 2px solid rgba(184, 147, 90, 0);
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}

.j-node.active .j-node-pulse {
  animation: nodePulse 2.5s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}

@keyframes nodePulse {
  0% { transform: scale(1); border-color: rgba(212, 170, 114, 0.6); opacity: 1; }
  70% { transform: scale(2.4); border-color: rgba(184, 147, 90, 0); opacity: 0; }
  100% { transform: scale(2.4); border-color: rgba(184, 147, 90, 0); opacity: 0; }
}

/* ── Sparkle / Star Effect ── */
.j-sparkle-container {
  position: absolute;
  left: -16px;
  width: 34px;
  height: 34px;
  pointer-events: none;
  z-index: 11;
}

@keyframes sparkleRotate {
  0% { transform: rotate(0deg) scale(0); opacity: 0; }
  15% { transform: rotate(30deg) scale(1); opacity: 1; }
  50% { transform: rotate(90deg) scale(0.85); opacity: 0.7; }
  85% { transform: rotate(150deg) scale(1); opacity: 0.9; }
  100% { transform: rotate(180deg) scale(0); opacity: 0; }
}

@keyframes sparkleFade {
  0% { opacity: 0; transform: scale(0.3); }
  40% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.6); }
}

.j-sparkle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #D4AA72;
  border-radius: 50%;
  opacity: 0;
  box-shadow: 0 0 4px #D4AA72, 0 0 8px rgba(184,147,90,0.3);
}

.j-node.active .j-sparkle.s1 {
  top: 0; left: 50%;
  animation: sparkleFade 2s ease-in-out 0.2s infinite;
}
.j-node.active .j-sparkle.s2 {
  top: 50%; right: 0;
  animation: sparkleFade 2s ease-in-out 0.5s infinite;
}
.j-node.active .j-sparkle.s3 {
  bottom: 0; left: 50%;
  animation: sparkleFade 2s ease-in-out 0.8s infinite;
}
.j-node.active .j-sparkle.s4 {
  top: 50%; left: 0;
  animation: sparkleFade 2s ease-in-out 1.1s infinite;
}
.j-node.active .j-sparkle.s5 {
  top: 15%; right: 15%;
  animation: sparkleFade 2.5s ease-in-out 0.3s infinite;
}
.j-node.active .j-sparkle.s6 {
  bottom: 15%; left: 15%;
  animation: sparkleFade 2.5s ease-in-out 0.9s infinite;
}

/* Star-cross burst at the active node */
.j-star-burst {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.j-node.active .j-star-burst { opacity: 1; }

.j-star-burst::before,
.j-star-burst::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(90deg, transparent 0%, rgba(184,147,90,0.5) 40%, rgba(212,170,114,0.8) 50%, rgba(184,147,90,0.5) 60%, transparent 100%);
  border-radius: 2px;
}

.j-star-burst::before {
  width: 28px;
  height: 1px;
  animation: starGlint 3s ease-in-out infinite;
}

.j-star-burst::after {
  width: 1px;
  height: 28px;
  animation: starGlint 3s ease-in-out 0.4s infinite;
}

@keyframes starGlint {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.7); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
}

/* ── Panel Styles ── */
.j-panel-white {
  background: rgba(255,255,255,0.55);
  border-left: 3px solid rgba(184,147,90,0.2);
  padding: 32px 36px;
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.j-panel-white.active-panel {
  background: rgba(255,255,255,0.75);
  border-left-color: #B8935A;
  box-shadow: 0 8px 40px rgba(184,147,90,0.06);
}

.j-panel-clear {
  padding: 32px 0;
}

/* ── Event slide-in animations ── */
@keyframes eventSlideIn {
  from {
    opacity: 0;
    transform: translateX(-20px) translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}

.j-event {
  opacity: 0;
  transform: translateX(-20px) translateY(16px);
}

.j-event.visible {
  animation: eventSlideIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* ── Year number shimmer ── */
@keyframes yearShimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.j-year-shimmer {
  background: linear-gradient(
    90deg,
    #1A1918 0%,
    #1A1918 35%,
    #B8935A 50%,
    #1A1918 65%,
    #1A1918 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.j-event.visible .j-year-shimmer {
  animation: yearShimmer 2.5s ease-in-out 0.5s 1 forwards;
}
`;

/* ── Timeline Event Component ── */
function TimelineEvent({
  m,
  index,
  isActive,
  onVisible,
}: {
  m: Milestone;
  index: number;
  isActive: boolean;
  onVisible: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let isMounted = true;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && isMounted) {
          setVis(true);
          onVisible(index);
          obs.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => {
      isMounted = false;
      obs.disconnect();
    };
  }, [index, onVisible]);

  const isWhitePanel = m.type === "text-only";

  return (
    <div
      ref={ref}
      className={`j-event relative ${vis ? "visible" : ""}`}
      style={{ paddingLeft: "32px", marginBottom: "0", animationDelay: `${index * 0.03}s` }}
    >
      {/* ── Premium Node ── */}
      <div className={`j-node ${isActive ? "active" : ""}`} style={{ top: "38px" }}>
        <div className="j-node-pulse" />
        <div className="j-node-ring" />
        <div className="j-star-burst" />
        {/* Sparkle particles */}
        <div className="j-sparkle-container">
          <div className="j-sparkle s1" />
          <div className="j-sparkle s2" />
          <div className="j-sparkle s3" />
          <div className="j-sparkle s4" />
          <div className="j-sparkle s5" />
          <div className="j-sparkle s6" />
        </div>
      </div>

      {isWhitePanel ? (
        <div className={`j-panel-white ${isActive ? "active-panel" : ""}`} style={{ maxWidth: "560px" }}>
          <h3
            className="j-year-shimmer font-cormorant text-[36px] sm:text-[42px] lg:text-[52px] leading-none font-light"
          >
            {m.year}
          </h3>
          <h4
            className="font-cormorant text-[17px] sm:text-[19px] font-medium mt-3 mb-3 leading-snug"
            style={{ color: "#1A1918" }}
          >
            {m.title}
          </h4>
          <p
            className="font-dm text-[13px] sm:text-[14px] leading-[1.85]"
            style={{ color: "#5C5752" }}
          >
            {m.desc}
          </p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-8" style={{ maxWidth: "720px" }}>
          <div className={`j-panel-clear flex-1`} style={{ minWidth: 0 }}>
            <h3
              className="j-year-shimmer font-cormorant text-[36px] sm:text-[42px] lg:text-[52px] leading-none font-light"
            >
              {m.year}
            </h3>
            <h4
              className="font-cormorant text-[17px] sm:text-[19px] font-medium mt-3 mb-3 leading-snug"
              style={{ color: "#1A1918" }}
            >
              {m.title}
            </h4>
            <p
              className="font-dm text-[13px] sm:text-[14px] leading-[1.85]"
              style={{ color: "#5C5752" }}
            >
              {m.desc}
            </p>
          </div>
          {m.image && (
            <div
              className="flex-shrink-0"
              style={{
                width: m.imageType === "logo" ? "clamp(120px, 25%, 200px)" : "clamp(160px, 35%, 280px)",
                opacity: vis ? 1 : 0,
                transform: vis ? "translateY(0) scale(1)" : "translateY(40px) scale(1.03)",
                transition: "all 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.25s",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.image}
                alt={m.title}
                className={`j-hov w-full ${m.imageType === "logo" ? "object-contain" : "object-cover"}`}
                style={{
                  borderRadius: m.imageType === "logo" ? "8px" : "10px",
                  aspectRatio: m.imageType === "logo" ? "3/2" : "3/4",
                  background: m.imageType === "logo" ? "rgba(245,242,237,0.6)" : "transparent",
                  padding: m.imageType === "logo" ? "12px" : "0",
                  boxShadow: isActive
                    ? "0 16px 48px rgba(184,147,90,0.15), 0 0 0 1px rgba(184,147,90,0.1)"
                    : "0 8px 32px rgba(0,0,0,0.08)",
                  transition: "box-shadow 0.6s ease",
                }}
                onError={(e) => { (e.target as HTMLImageElement).src = "/images/main-img1.png"; }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════ */
export default function DesignerJourney() {
  const { ref: introRef, vis: introVis } = useReveal(0.15);
  const iv = introVis ? "v" : "";

  /* Track which milestones have been revealed */
  const [highestVisible, setHighestVisible] = useState(-1);
  const [activeMilestone, setActiveMilestone] = useState(-1);

  /* Refs for scroll-driven fill */
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const [fillPercent, setFillPercent] = useState(0);

  const handleVisible = useCallback((index: number) => {
    setHighestVisible((prev) => Math.max(prev, index));
    setActiveMilestone(index);
  }, []);

  /* Scroll-driven timeline fill */
  useEffect(() => {
    const container = timelineContainerRef.current;
    if (!container) return;

    let isMounted = true;
    const handleScroll = () => {
      if (!isMounted) return;
      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;

      // How much of the container is above the viewport center
      const containerTop = rect.top;
      const containerH = rect.height;
      const scrolledPast = windowH * 0.45 - containerTop;
      const pct = Math.min(100, Math.max(0, (scrolledPast / containerH) * 100));

      setFillPercent(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial
    return () => {
      isMounted = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* Track which milestone is currently in view for active state */
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLDivElement>(".j-event");
    if (!nodes.length) return;

    let isMounted = true;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isMounted) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            if (!isNaN(idx)) setActiveMilestone(idx);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -40% 0px" }
    );

    nodes.forEach((n, i) => {
      n.setAttribute("data-idx", String(i));
      obs.observe(n);
    });

    return () => {
      isMounted = false;
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="relative w-full overflow-hidden" style={{ background: "#F5F2ED" }}>

        {/* ═══ HERO INTRO ═══ */}
        <div ref={introRef} className="relative text-center pt-24 lg:pt-36 pb-12 lg:pb-20 px-6">
          {/* Faded large year */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-cormorant italic text-[120px] sm:text-[200px] lg:text-[300px] leading-none" style={{ color: "rgba(184,147,90,0.04)" }}>
              1940
            </span>
          </div>

          <span className={`jf ${iv} inline-block font-dm text-[10px] tracking-[0.5em] uppercase mb-5 relative z-10`} style={{ color: "#B8935A", animationDelay: "0s" }}>
            OUR JOURNEY
          </span>
          <h2 className={`jf ${iv} font-cormorant text-[36px] sm:text-[48px] lg:text-[64px] font-light leading-[1.05] max-w-3xl mx-auto relative z-10`} style={{ color: "#1A1918", animationDelay: "0.1s" }}>
            Built Across <span className="italic">Generations</span><span className="text-[#B8935A]">.</span>
            <br />
            <span className="font-normal text-[#003926]">Strengthened by Time.</span>
          </h2>
          <div className={`jf ${iv} w-14 h-px mx-auto mt-7`} style={{ background: "#B8935A", opacity: 0.4, animationDelay: "0.25s" }} />
          <p className={`jf ${iv} font-dm text-[14px] sm:text-[15px] mt-5 max-w-xl mx-auto leading-[1.85] relative z-10`} style={{ color: "#9C9690", animationDelay: "0.35s" }}>
            From a modest watch parts trading business in 1940s Amritsar to a multi-brand watch ecosystem today — every generation expanded our expertise and elevated our standards.
          </p>

          {/* First year intro block */}
          <div className={`jf ${iv} mt-16 max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-12 relative z-10`} style={{ animationDelay: "0.45s" }}>
            <span className="font-cormorant text-[80px] sm:text-[100px] lg:text-[140px] leading-none font-light" style={{ color: "rgba(26,25,24,0.08)" }}>
              1940
            </span>
            <p className="font-dm text-[15px] sm:text-[16px] leading-[1.7] text-left sm:pb-4" style={{ color: "#6B665E" }}>
              The legacy of the Nagpal Group begins<br className="hidden sm:block" />
              with a vision of timeless craftsmanship.
            </p>
          </div>
        </div>

        {/* ═══ MAIN 2-COLUMN LAYOUT ═══ */}
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex relative">

            {/* ── LEFT SIDEBAR (20%) — floating images + watermark text ── */}
            <div className="hidden lg:block relative" style={{ width: "20%", flexShrink: 0, overflow: "hidden" }}>
              <div className="relative w-full h-full">
                {/* Sidebar floating images */}
                {SIDEBAR_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className={`ji v absolute`}
                    style={{ top: item.top, left: 0, right: 0 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt=""
                      className="j-hov object-cover"
                      style={{
                        boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                        ...item.style,
                      }}
                      onError={(e) => { (e.target as HTMLImageElement).src = "/images/main-img1.png"; }}
                    />
                  </div>
                ))}

                {/* Watermark text blocks */}
                {SIDEBAR_TEXT.map((t, i) => (
                  <div
                    key={i}
                    className="absolute pointer-events-none select-none"
                    style={{ top: t.top, left: "5%", right: "5%" }}
                  >
                    <p
                      className="font-cormorant text-[36px] xl:text-[48px] leading-[1.05] font-light whitespace-pre-line"
                      style={{ color: "rgba(184,147,90,0.07)" }}
                    >
                      {t.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT CONTENT (75%) — timeline events ── */}
            <div className="flex-1 relative" style={{ minWidth: 0 }} ref={timelineContainerRef}>

              {/* ── Premium Animated Timeline Track ── */}
              <div className="j-timeline-track">
                <div className="j-timeline-bg" />
                <div
                  className="j-timeline-fill"
                  style={{ height: `${fillPercent}%` }}
                />
              </div>

              {/* Timeline events */}
              <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20 pb-20 lg:pb-32">
                {MILESTONES.map((m, i) => (
                  <TimelineEvent
                    key={i}
                    m={m}
                    index={i}
                    isActive={i === activeMilestone}
                    onVisible={handleVisible}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── FLOATING SHAPE IMAGES (scattered across section) — subtle background decoration ── */}
          <div className="hidden lg:block pointer-events-none" style={{ filter: "blur(0.5px)" }}>
            {FLOATING_SHAPES.map((shape, i) => (
              <div key={i} className="ji v" style={shape.style as React.CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shape.src}
                  alt=""
                  className="w-full object-cover"
                  style={{
                    borderRadius: "10%",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
                  }}
                  onError={(e) => { (e.target as HTMLImageElement).src = "/images/main-img1.png"; }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ═══ CLOSING QUOTE ═══ */}
        <div className="text-center pb-20 lg:pb-28 px-6 relative z-10">
          <div className="w-12 h-px mx-auto mb-6" style={{ background: "#B8935A", opacity: 0.3 }} />
          <p className="font-cormorant italic text-[18px] sm:text-[22px] max-w-lg mx-auto leading-[1.6]" style={{ color: "#9C9690" }}>
            &ldquo;Make good models with great designs at price segments covering the mass &amp; the class.&rdquo;
          </p>
          <span className="block font-dm text-[10px] tracking-[0.25em] uppercase mt-4" style={{ color: "#B8935A" }}>
            — THE NAGPAL FAMILY
          </span>
        </div>
      </section>
    </>
  );
}
