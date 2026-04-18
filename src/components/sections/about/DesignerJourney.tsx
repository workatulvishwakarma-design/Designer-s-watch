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
};

const MILESTONES: Milestone[] = [
  {
    year: "1940s",
    title: "The Nagpal Watch Company — Amritsar",
    desc: "Our great-grandfather established a modest watch parts trading business across Punjab, founding The Nagpal Watch Company in Amritsar. With all blessings, this original shop remains active to this day — a living testament to where it all began.",
    type: "text-only",
  },
  {
    year: "1960s",
    title: "Second Generation — Expanding the Network",
    desc: "His sons joined the family enterprise, deepening the watch parts distribution network within Punjab and across neighbouring states. Integrity became the family's finest mechanism — transforming customers into lifelong patrons and building a reputation that would define generations.",
    type: "text-image",
    image: "/images/2gen.png",
  },
  {
    year: "1976",
    title: "Nagpals Bombay — The Mumbai Chapter",
    desc: "Mr. Narinder Nagpal and Mr. Jatinder Nagpal fulfilled the family's dream of establishing a presence in India's commercial capital. Nagpals Bombay was born — and with relentless effort, the network expanded nationwide. International markets were explored for the first time, enabling direct import and distribution of parts and components across India.",
    type: "text-only",
  },
  {
    year: "1980s",
    title: "Pan-India Battery Distribution",
    desc: "Major button cell brands partnered with Nagpals Bombay for all-India distribution — Maxell and Seizaiken from Japan, Renata from Switzerland, and Sony Japan. Battery distribution became a cornerstone of the company's growth, cementing the group's reputation as India's most trusted name in watch components.",
    type: "text-image",
    image: "/images/distr_.png",
  },
  {
    year: "1991",
    title: "Birth of D'SIGNER",
    desc: "As the era shifted from mechanical to quartz — driven by HMT and Titan — our father recognised the moment was right to launch a company-owned brand. Designer Watches Pvt. Ltd. introduced D'SIGNER, conceived with a singular vision: exceptional materials, unique designs, and price points that the market had not yet seen. The brand earned strong national acceptance at reputed watch retailers across the country.",
    type: "text-only",
  },
  {
    year: "1995",
    title: "ESCORT — Crafted for the Masses",
    desc: "Building on D'SIGNER's success, the group launched ESCORT watches — a sub-brand focused on classic, brass-developed models at accessible pricing. The intent was clear: bring horological integrity and good quality to the larger Indian audience without compromise.",
    type: "text-image",
    image: "/images/escort.png",
  },
  {
    year: "1997",
    title: "Corporate & Institutional Business",
    desc: "The company forged partnerships with leading industrial groups for bulk customised watch projects, marking a strategic diversification into institutional B2B business. Simultaneously, the group entered watch distribution, bringing international brands like Christian Bernard and Givenchy to the Indian market.",
    type: "text-only",
  },
  {
    year: "2000s",
    title: "TISSOT India Launch & Brand Distribution",
    desc: "When India's market opened to international brands, Nagpal Group was among the first movers — launching TISSOT watches as national distributors. Though the influx of foreign brands posed challenges for Indian labels, D'SIGNER continued to build sales through its niche network of exclusive retail partners.",
    type: "text-image",
    image: "/images/nagpal3.png",
  },
  {
    year: "2002",
    title: "HOURGLASS — First Retail Outlet",
    desc: "HOURGLASS became Designer Watches' first self-owned retail store — a small but significant step towards building brand awareness through direct consumer engagement alongside traditional distribution channels.",
    type: "text-only",
  },
  {
    year: "2004",
    title: "D'SIGNER EFFECTS — Corporate Gifts Division",
    desc: "A dedicated division was launched under D'SIGNER EFFECTS, focused exclusively on corporate gifts and promotional business. The mission: connect with organisations of every scale and offer a comprehensive range of promotional products for their marketing and incentive programmes.",
    type: "text-image",
    image: "/images/today02.png",
  },
  {
    year: "2005",
    title: "First Swiss-Made D'SIGNER Watch",
    desc: "A landmark achievement in the brand's evolution — D'SIGNER launched its first 100% Swiss-made wristwatch, competing directly with established global heritage names and elevating the brand's positioning in the luxury segment.",
    type: "text-only",
  },
  {
    year: "2007",
    title: "B2B & Corporate — A Strategic Focus",
    desc: "Wristwatches became a powerful category for corporate marketing and brand promotion. The company expanded into clocks and bags under D'SIGNER to serve growing B2B requirements, establishing the corporate channel as a key revenue pillar.",
    type: "text-image",
    image: "/images/today1.png",
  },
  {
    year: "2010",
    title: "Scaling Production — Landmark Volume Orders",
    desc: "Designer Watches scaled its production capabilities to fulfil institutional orders running into lakhs of units. Milestone projects for esteemed groups including TATA Indicom, Reebok, Nikon, and leading pharmaceutical companies validated the company's manufacturing excellence at scale.",
    type: "text-only",
  },
  {
    year: "2015",
    title: "OEM & White Label Expansion",
    desc: "With deep expertise in product development, the group intensified its focus on designing and developing watches for prominent domestic and international brands — including U.S. Polo, Giordano, and Daniel Klein. The OEM division became a trusted partner for seamless design-to-delivery pipelines.",
    type: "text-image",
    image: "/images/legacy-craftsmanship.png",
  },
  {
    year: "2017",
    title: "SEDEX Audited Facility",
    desc: "The company achieved full SEDEX compliance — a rigorous international audit affirming ethical supply chain practices and world-class manufacturing standards. A mark of integrity in every timepiece produced.",
    type: "text-only",
  },
  {
    year: "2018",
    title: "Myntra, Flipkart & Amazon Partnerships",
    desc: "Major e-commerce platforms including Myntra, Flipkart, and Amazon partnered with the group for designing and manufacturing their private label and licensed watch brands — establishing Designer Watches as a manufacturing backbone for India's digital retail revolution.",
    type: "text-image",
    image: "/images/mumbai.png",
  },
  {
    year: "2020",
    title: "Digital Acceleration",
    desc: "The pandemic shifted the company's entire focus towards aggressive product development for online brands, alongside expanded partnerships with national and international fashion labels. What began as adaptation became a catalyst for exponential digital growth.",
    type: "text-only",
  },
  {
    year: "2021–22",
    title: "Designer World Brands — New Division",
    desc: "The group introduced new international fashion brands into its distribution channel — Mathey-Tissot, D1 Milano, Ingersoll, Invicta, and Santa Barbara Polo & Racquet Club. A dedicated division, Designer World Brands, was established solely to manage and scale foreign brand distribution across India.",
    type: "text-image",
    image: "/images/sons.png",
  },
  {
    year: "2023",
    title: "D'SIGNER — Back with a Bang",
    desc: "Fuelled by India's premiumisation wave and a renewed focus on uniquely designed models with special features, D'SIGNER earned strong acceptance in offline retail formats — confidently retailing models up to ₹23,000. Today, we proudly stand as India's Affordable Luxury Watch Brand.",
    type: "text-only",
  },
  {
    year: "2024",
    title: "Lab-Grown Diamond Integration",
    desc: "Pushing the boundaries of accessible luxury, D'SIGNER launched lab-grown diamond-studded timepieces — a bold new step to reach the discerning luxury audience, with collections ranging up to ₹1,50,000.",
    type: "text-image",
    image: "/images/aboutImg2.png",
  },
  {
    year: "2025",
    title: "The Next Chapter",
    desc: "The mission ahead: launch company-owned retail outlets showcasing our proprietary and distribution brands together, and expand our reach through a robust e-commerce ecosystem. The next era of Designer World begins now.",
    type: "text-only",
  },
];

/* Sidebar floating images at different vertical positions */
const SIDEBAR_ITEMS: { src: string; top: string; style?: React.CSSProperties }[] = [
  { src: "/images/gen 1.png", top: "2%", style: { width: "85%", borderRadius: "10%", opacity: 0.9 } },
  { src: "/images/mumbai.png", top: "22%", style: { width: "70%", marginLeft: "15%", borderRadius: "10%" } },
  { src: "/images/nagpal1.png", top: "46%", style: { width: "80%", borderRadius: "10%" } },
  { src: "/images/hover-2.png", top: "68%", style: { width: "65%", marginLeft: "20%", borderRadius: "10%" } },
  { src: "/images/nagpal3.png", top: "88%", style: { width: "75%", borderRadius: "10%" } },
];

/* Large floating "shape" images positioned absolutely across the section */
const FLOATING_SHAPES: { src: string; style: React.CSSProperties }[] = [
  { src: "/images/legacy-craftsmanship.png", style: { position: "absolute", right: 0, top: "5%", width: "28%", maxWidth: "400px", borderRadius: "10%", zIndex: 3, opacity: 0.9 } },
  { src: "/images/hover-1.png", style: { position: "absolute", right: "5%", top: "18%", width: "22%", maxWidth: "300px", borderRadius: "10%", zIndex: 4 } },
  { src: "/images/deigner.png", style: { position: "absolute", right: 0, top: "35%", width: "26%", maxWidth: "380px", borderRadius: "10%", zIndex: 3, opacity: 0.85 } },
  { src: "/images/sons.png", style: { position: "absolute", right: "3%", top: "52%", width: "20%", maxWidth: "280px", borderRadius: "10%", zIndex: 4 } },
  { src: "/images/hover-3.png", style: { position: "absolute", right: 0, top: "66%", width: "25%", maxWidth: "350px", borderRadius: "10%", zIndex: 3, opacity: 0.9 } },
  { src: "/images/nagpal2.png", style: { position: "absolute", right: "4%", top: "82%", width: "22%", maxWidth: "300px", borderRadius: "10%", zIndex: 4 } },
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
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
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
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          onVisible(index);
          obs.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
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
                width: "clamp(160px, 30%, 260px)",
                opacity: vis ? 1 : 0,
                transform: vis ? "translateY(0) scale(1)" : "translateY(40px) scale(1.03)",
                transition: "all 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.25s",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.image}
                alt={m.title}
                className="j-hov w-full object-cover"
                style={{
                  borderRadius: "10%",
                  aspectRatio: "3/4",
                  boxShadow: isActive
                    ? "0 16px 48px rgba(184,147,90,0.15), 0 0 0 1px rgba(184,147,90,0.1)"
                    : "0 16px 48px rgba(0,0,0,0.1)",
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

    const handleScroll = () => {
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Track which milestone is currently in view for active state */
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLDivElement>(".j-event");
    if (!nodes.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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

    return () => obs.disconnect();
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

            {/* ── LEFT SIDEBAR (25%) — floating images + watermark text ── */}
            <div className="hidden lg:block relative" style={{ width: "25%", flexShrink: 0 }}>
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

          {/* ── FLOATING SHAPE IMAGES (scattered across section) ── */}
          <div className="hidden lg:block">
            {FLOATING_SHAPES.map((shape, i) => (
              <div key={i} className="ji v" style={shape.style as React.CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shape.src}
                  alt=""
                  className="j-hov w-full object-cover"
                  style={{
                    borderRadius: "10%",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
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
