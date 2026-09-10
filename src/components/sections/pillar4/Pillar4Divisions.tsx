"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/* ─────────────────────────────────────────────────────
   NAGPAL DIVISIONS — DATA
   ───────────────────────────────────────────────────── */
type Division = {
  index: string;
  eyebrow: string;
  title: string;
  headline: string;
  body: string;
  highlights: string[];
  modalContent: string[];
  image: string;
  bg: string;
  textColor: string;
  accentColor: string;
  imageContain?: boolean;
};

const NAGPAL_DIVISIONS: Division[] = [
  {
    index: "01",
    eyebrow: "FOUNDATION",
    title: "Nagpals Bombay",
    headline: "The beginning of our journey — Mumbai, 1976.",
    body: "In an era defined by mechanical watchmaking, Nagpals Bombay established itself as India's definitive destination for watch components.",
    highlights: ["Components & Parts", "Sole Distribution", "1976–2026"],
    modalContent: [
      "The beginning of our journey in Mumbai with the distribution of selected watch components. It was an era of mechanical watches, and parts related to them formed the focus of the business.",
      "Since then, Nagpals Bombay has remained a one-stop solution for watch parts and components — from hands by leading makers like Pioneer Group (sole distribution across India), to crowns, straps, metal bands, and tools required by watch shops across the country.",
      "Deeply connected with the smallest watch repair shops to the biggest brands and watch stores in India that need parts for service.",
      "A name and goodwill running strong for 50 years now. 1976–2026."
    ],
    image: "/images/new-content/pillars/Nagpal_s Bombay/ng-bombay.jpg",
    bg: "#003926",
    textColor: "#FAFAF8",
    accentColor: "#B8935A",
    imageContain: false,
  },
  {
    index: "02",
    eyebrow: "B2B PARTNERSHIPS",
    title: "Corporate & Institutional",
    headline: "Trusted by India's largest conglomerates and institutions.",
    body: "Delivering high-volume, premium corporate gifting solutions and institutional timepieces for the most respected names in global business.",
    highlights: ["Corporate Gifting", "High-Volume Production", "Legacy Partners"],
    modalContent: [
      "For decades, Designer World has been the horological partner of choice for major corporate and institutional requirements. We understand that a corporate timepiece is not merely a gift—it is a lasting representation of the brand that presents it.",
      "Our capability to deliver uncompromised quality at massive scale has earned the trust of industry leaders across sectors. We have successfully executed large-scale requirements for esteemed organizations including the Tata Group (Tata Indicom), ICICI Bank, Reebok, Nikon, and Amway.",
      "In the textile and fashion sectors, our legacy of precision is relied upon by giants such as Donear and Siyaram, alongside numerous leading pharmaceutical brands and institutional bodies.",
      "From bespoke dial customization to specialized packaging and nationwide delivery logistics, our corporate division operates with the exacting standards and reliability demanded by India's most respected conglomerates."
    ],
    image: "/images/new-content/pillars/Corporate B2B/2a.jpg",
    bg: "#FFFFFF",
    textColor: "#003926",
    accentColor: "#B8935A",
    imageContain: false,
  },
  {
    index: "03",
    eyebrow: "MANUFACTURING",
    title: "OEM / Private Label",
    headline: "End-to-end watchmaking solutions for global brands.",
    body: "Comprehensive design, engineering, and manufacturing services enabling brands to launch premium watch collections with total confidence.",
    highlights: ["Design to Delivery", "Quality Assured", "Global Standards"],
    modalContent: [
      "Our OEM and Private Label division represents the pinnacle of our integrated manufacturing capability. We offer complete, end-to-end horological solutions for brands looking to enter or expand within the watch category.",
      "From initial conceptualization and 3D modeling to prototyping, movement sourcing, and final assembly, every step is managed within our rigorous quality control ecosystem.",
      "We partner with fashion labels, lifestyle brands, and specialized retailers, translating their brand DNA into compelling timepieces. Our partners benefit from our vast component network, deep technical expertise, and economies of scale.",
      "By maintaining strict confidentiality and uncompromising production standards, we serve as the silent engine behind many successful watch brands operating in the market today."
    ],
    image: "/images/new-content/pillars/OEM- ODM/WhatsApp Image 2026-04-04 at 4.14.22 PM (1).jpeg",
    bg: "#003926",
    textColor: "#FAFAF8",
    accentColor: "#B8935A",
    imageContain: false,
  },
  {
    index: "04",
    eyebrow: "BRAND PORTFOLIO",
    title: "D'SIGNER • ESCORT: The Architecture of Time",
    headline: "Proprietary watchmaking embodying eight decades of heritage.",
    body: "In-house designed and manufactured watch brands offering premium timepieces that combine decades of horological expertise with contemporary design.",
    highlights: ["In-House Design", "Heritage Backed", "Premium Segment"],
    modalContent: [
      "D'SIGNER and ESCORT represent the Nagpal Group's most personal expression of watchmaking philosophy—proprietary brands conceived, designed, engineered, and brought to market entirely within our ecosystem.",
      "D'SIGNER positions itself in the premium segment, offering bold design language, superior materials, and exceptional finishing. Every D'SIGNER timepiece is a statement of our manufacturing capability and design vision.",
      "ESCORT serves the value-conscious consumer who refuses to compromise on reliability. With robust movements, durable construction, and timeless design, ESCORT watches are engineered for everyday excellence.",
      "Together, these house brands represent the full spectrum of our capability—from design studio creativity to manufacturing floor precision and lifelong after-sales commitment."
    ],
    image: "/images/new-img/pillars/8.jpg",
    bg: "#FFFFFF",
    textColor: "#003926",
    accentColor: "#B8935A",
    imageContain: false,
  },
  {
    index: "05",
    eyebrow: "GLOBAL REACH",
    title: "Exports & Global Trade",
    headline: "Carrying Indian horological excellence to international shores.",
    body: "Global supply capabilities delivering watches and components to international markets with dependable quality standards.",
    highlights: ["Global Markets", "Quality Assured", "International Delivery"],
    modalContent: [
      "The Exports division extends the Nagpal Group's reach beyond India's borders, serving international markets with both finished timepieces and precision components. Our export operations are built on the same quality standards that have earned domestic trust.",
      "We maintain compliance with international trade regulations, customs documentation protocols, and destination-market quality certifications. Each export shipment undergoes enhanced quality inspection.",
      "Our export relationships span established markets in the Middle East, Southeast Asia, and Africa, with a growing presence in European and North American distribution networks.",
      "This division also serves as a window into global trends and competitive benchmarks, bringing back insights that inform product development across the group."
    ],
    image: "/images/new-content/pillars/Exports/WhatsApp Image 2026-04-15 at 11.30.22 AM.jpeg",
    bg: "#003926",
    textColor: "#FAFAF8",
    accentColor: "#B8935A",
    imageContain: false,
  },
  {
    index: "06",
    eyebrow: "RETAIL BOUTIQUE",
    title: "Time Corridor",
    headline: "Not just the product we create, but the aura we pass on.",
    body: "A signature retail boutique conceived to showcase our home brands, D'SIGNER and ESCORT, in an immersive experience store.",
    highlights: ["Retail Boutique", "D'SIGNER & ESCORT", "Experience Store"],
    modalContent: [
      "The latest chapter in the Designer World story. At Designer World, it is not only about the product we create — it is about the aura we pass on through every timepiece we design.",
      "Time Corridor is our signature retail boutique, initiated to promote our home brands, D'SIGNER and ESCORT, through an immersive experience.",
      "The store showcases our prime models, new launches, top sellers, and special editions in an atmosphere crafted to inspire with an appealing display and aura.",
      "This boutique is a gesture to connect with watch enthusiasts and add enduring value to our happy watch buyers. First location: Agra."
    ],
    image: "/images/new-content/pillars/Time Corridor/time corriddor/1A1A8499.JPG",
    bg: "#FFFFFF",
    textColor: "#003926",
    accentColor: "#B8935A",
    imageContain: false,
  },
  {
    index: "07",
    eyebrow: "DISTRIBUTION",
    title: "Batteries & Components",
    headline: "The most trusted name in the watch industry by buyers across all levels.",
    body: "Sole distributors across India since the 1980s for the world's most reputed watch button cell brands — Renata, Maxell, Seizaiken, and Sony.",
    highlights: ["Sole Distribution", "Renata · Maxell · Sony", "Since 1980s"],
    modalContent: [
      "With sole distribution across India since the 1980s for some of the world's most reputed watch button cell brands — Renata (Switzerland), Maxell (Japan), Seizaiken (Japan), and Sony (Japan) — we remain deeply connected with the Indian market at every level.",
      "In an industry crowded with imitation products and unreliable sellers, Nagpal Group has earned enduring trust as one of the most dependable names in the watch business.",
      "We supply genuine button cells to independent retailers, authorised service centres, and major watch networks, ensuring the reliable performance of timepieces nationwide."
    ],
    image: "/images/new-content/pillars/Batteries/batteries-banner.webp",
    bg: "#003926",
    textColor: "#FAFAF8",
    accentColor: "#B8935A",
    imageContain: false,
  }
];

/* ─────────────────────────────────────────────────────
   CUSTOM HOOK: INTERSECTION OBSERVER
   ───────────────────────────────────────────────────── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let isMounted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isMounted) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isVisible };
}

/* ─────────────────────────────────────────────────────
   CSS KEYFRAMES
   ───────────────────────────────────────────────────── */
const PILLAR_CSS = `
@keyframes pillarFadeUp {
  from { opacity: 0; transform: translateY(50px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pillarImgReveal {
  from { opacity: 0; transform: scale(1.08) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes pillarLineGrow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes pillarHighlightPop {
  from { opacity: 0; transform: translateY(12px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes modalTextReveal {
  from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
  to   { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes modalHeadingReveal {
  0%   { opacity: 0; transform: translateY(30px); letter-spacing: 0.15em; }
  60%  { opacity: 1; letter-spacing: 0.08em; }
  100% { opacity: 1; transform: translateY(0); letter-spacing: 0.05em; }
}
@keyframes shimmerLine {
  from { background-position: -200% 0; }
  to   { background-position: 200% 0; }
}

.pillar-reveal { opacity: 0; }
.pillar-reveal.visible { animation: pillarFadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

.pillar-img-wrap { opacity: 0; }
.pillar-img-wrap.visible { animation: pillarImgReveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

.pillar-img-inner {
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}
.pillar-img-wrap:hover .pillar-img-inner {
  transform: scale(1.04) translateY(-4px);
}

.pillar-line { transform: scaleX(0); transform-origin: left; }
.pillar-line.visible { animation: pillarLineGrow 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

.pillar-highlight { opacity: 0; }
.pillar-highlight.visible { animation: pillarHighlightPop 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

.modal-heading { animation: modalHeadingReveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
.modal-text-reveal { opacity: 0; animation: modalTextReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

.shimmer-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #B8935A, transparent);
  background-size: 200% 100%;
  animation: shimmerLine 3s ease infinite;
}
`;

/* ─────────────────────────────────────────────────────
   DIVISION BLOCK COMPONENT
   ───────────────────────────────────────────────────── */
function DivisionBlock({
  division,
  reversed,
  onOpenModal,
}: {
  division: Division;
  reversed: boolean;
  onOpenModal: () => void;
}) {
  const { ref, isVisible } = useScrollReveal(0.12);
  const isDark = division.bg === "#003926";
  const vis = isVisible ? "visible" : "";

  return (
    <div
      ref={ref}
      className="w-full relative overflow-hidden transition-colors duration-500"
      style={{ background: division.bg }}
    >
      {/* Subtle brand dots pattern overlay matching home-2 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(circle at 1px 1px, #D4C5A0 0.5px, transparent 0)"
            : "radial-gradient(circle at 1px 1px, rgba(0,57,38,0.06) 0.5px, transparent 0)",
          backgroundSize: "30px 30px",
          opacity: isDark ? 0.025 : 0.04,
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 right-0 w-[400px] h-[400px] pointer-events-none blur-[130px] -translate-y-1/2"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(184,147,90,0.25), transparent)"
            : "radial-gradient(circle, rgba(184,147,90,0.16), transparent)",
          opacity: isDark ? 0.12 : 0.08,
        }}
      />
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] lg:min-h-[65vh] py-8 lg:py-12 relative z-[2]">
        {/* IMAGE */}
        <div
          className={`flex items-center justify-center p-6 sm:p-8 lg:p-10 ${
            reversed ? "lg:order-2" : "lg:order-1"
          } order-1`}
        >
          <div
            className={`pillar-img-wrap ${vis} relative w-full max-w-[420px] overflow-hidden mx-auto rounded-2xl`}
            style={{
              animationDelay: "0.1s",
              boxShadow: isDark
                ? "0 25px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)"
                : "0 25px 70px rgba(0,57,38,0.1), 0 0 0 1px rgba(0,57,38,0.08)",
            }}
          >
            <div 
              className="pillar-img-inner relative w-full rounded-2xl overflow-hidden" 
              style={{ 
                aspectRatio: "3/4", 
                background: "#092218"
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={division.image}
                alt={division.title}
                className={`absolute inset-0 w-full h-full grayscale contrast-[1.1] ${division.imageContain ? "object-contain p-6 sm:p-8" : "object-cover"}`}
                style={{ objectPosition: "center" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/main-img1.png";
                }}
              />

              {/* Subtle bottom shadow overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, transparent 70%, rgba(0,27,18,0.4) 100%)",
                }}
              />

              {/* Pillar index */}
              <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 z-10 pointer-events-none">
                <span
                  className="font-montserrat font-bold text-[42px] lg:text-[56px] leading-none select-none tracking-tight"
                  style={{
                    color: "rgba(255,255,255,0.22)",
                    textShadow: "0 2px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  {division.index}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TEXT */}
        <div
          className={`flex flex-col justify-center px-8 py-14 sm:px-12 lg:px-20 lg:py-20 ${
            reversed ? "lg:order-1" : "lg:order-2"
          } order-2`}
        >
          {/* Eyebrow */}
          <div
            className={`pillar-reveal ${vis} flex items-center gap-3 mb-5`}
            style={{ animationDelay: "0.15s" }}
          >
            <div
              className={`pillar-line ${vis} h-px`}
              style={{
                background: division.accentColor,
                width: 36,
                animationDelay: "0.1s",
              }}
            />
            <span
              className="font-montserrat font-bold text-[10px] tracking-[0.3em] uppercase"
              style={{ color: division.accentColor }}
            >
              {division.eyebrow}
            </span>
          </div>

          {/* Title */}
          <div
            className={`pillar-reveal ${vis} mb-2`}
            style={{ animationDelay: "0.25s" }}
          >
            <span
              className="font-montserrat font-semibold text-[11px] lg:text-[13px] tracking-[0.2em] uppercase block mb-2"
              style={{ color: division.accentColor }}
            >
              Division {division.index}
            </span>
            <h3
              className="font-montserrat font-bold text-[32px] sm:text-[40px] lg:text-[48px] uppercase tracking-[0.06em] leading-[1.12]"
              style={{
                color: isDark ? "#FAFAF8" : "#003926",
                textShadow: isDark ? "0 2px 16px rgba(0,0,0,0.4)" : "none",
              }}
            >
              {division.title.includes(":") ? (
                <>
                  <span className="block mb-2">{division.title.split(":")[0]}</span>
                  <span className="block text-[16px] sm:text-[19px] lg:text-[22px] font-medium tracking-[0.08em] opacity-90" style={{ color: division.accentColor }}>
                    {division.title.split(":")[1].trim()}
                  </span>
                </>
              ) : (
                <>
                  {division.title}
                  <span style={{ color: division.accentColor }}>.</span>
                </>
              )}
            </h3>
          </div>

          {/* Divider */}
          <div
            className={`pillar-line ${vis} h-px my-7 lg:my-8`}
            style={{
              background: division.accentColor,
              width: 44,
              opacity: isDark ? 0.45 : 0.6,
              animationDelay: "0.4s",
            }}
          />

          {/* Headline */}
          <p
            className={`pillar-reveal ${vis} font-montserrat font-medium text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.5] mb-5 max-w-[480px]`}
            style={{
              color: isDark ? "#FAFAF8" : "#1A1918",
              opacity: isDark ? 0.85 : 0.95,
              animationDelay: "0.45s",
              textShadow: isDark ? "0 1px 8px rgba(0,0,0,0.3)" : "none",
            }}
          >
            &ldquo;{division.headline}&rdquo;
          </p>

          {/* Body */}
          <p
            className={`pillar-reveal ${vis} font-montserrat text-[13px] sm:text-[14px] leading-[1.85] font-normal max-w-[460px] mb-8`}
            style={{
              color: isDark ? "#FAFAF8" : "#4A4742",
              opacity: isDark ? 0.65 : 0.88,
              animationDelay: "0.55s",
            }}
          >
            {division.body}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {division.highlights.map((h, i) => (
              <span
                key={h}
                className={`pillar-highlight ${vis} inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-montserrat text-[10px] tracking-[0.15em] uppercase font-semibold`}
                style={{
                  color: isDark ? "rgba(255,255,255,0.75)" : "#003926",
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,57,38,0.06)",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,57,38,0.15)",
                  animationDelay: `${0.65 + i * 0.1}s`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: division.accentColor }}
                />
                {h}
              </span>
            ))}
          </div>

          {/* Explore Button */}
          <div
            className={`pillar-reveal ${vis}`}
            style={{ animationDelay: "0.95s" }}
          >
            <button
              onClick={onOpenModal}
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-montserrat font-bold text-[11px] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer overflow-hidden"
              style={{
                color: isDark ? "#FAFAF8" : "#003926",
                border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,57,38,0.25)",
                background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,57,38,0.03)",
              }}
            >
              <span className="relative z-10">Explore Division</span>
              <span
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: division.accentColor }}
              >
                →
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: isDark
                    ? "linear-gradient(90deg, rgba(184,147,90,0.15), rgba(184,147,90,0.05))"
                    : "linear-gradient(90deg, rgba(0,57,38,0.09), rgba(0,57,38,0.02))",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   MODAL COMPONENT
   ───────────────────────────────────────────────────── */
function DivisionModal({
  division,
  onClose,
}: {
  division: Division | null;
  onClose: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (division) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [division, handleKeyDown]);

  return (
    <AnimatePresence>
      {division && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 lg:p-10 pointer-events-none"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[88vh] bg-[#FAF8F4] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.35)] overflow-hidden pointer-events-auto border border-[#EDE8DF]"
              style={{
                boxShadow:
                  "0 25px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(184,147,90,0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-[#EDE8DF] flex items-center justify-center text-[#1A1918] hover:text-[#003926] hover:bg-white hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="p-8 sm:p-10 pb-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-px bg-[#B8935A]" />
                  <span className="font-montserrat font-bold text-[10px] tracking-[0.3em] uppercase text-[#B8935A]">
                    {division.eyebrow} — DIVISION {division.index}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="modal-heading font-montserrat font-bold text-[24px] sm:text-[32px] uppercase tracking-[0.06em] text-[#1A1918] leading-[1.15] mb-4"
                  style={{
                    textShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  {division.title.includes(":") ? (
                    <>
                      <span className="block mb-1.5">{division.title.split(":")[0]}</span>
                      <span className="block text-[14px] sm:text-[17px] font-semibold tracking-[0.08em] text-[#B8935A]">
                        {division.title.split(":")[1].trim()}
                      </span>
                    </>
                  ) : (
                    <>
                      {division.title}
                      <span className="text-[#B8935A]">.</span>
                    </>
                  )}
                </h3>

                {/* Shimmer divider */}
                <div className="shimmer-divider w-16 mt-2" />
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto max-h-[calc(88vh-220px)] px-8 sm:px-10 pb-10">
                {/* Headline quote */}
                <p
                  className="modal-text-reveal font-montserrat font-medium text-[16px] sm:text-[18px] text-[#1A1918] leading-[1.5] mb-8 border-l-2 border-[#B8935A] pl-6 mt-4"
                  style={{
                    animationDelay: "0.4s",
                    textShadow: "0 1px 6px rgba(0,0,0,0.04)",
                  }}
                >
                  &ldquo;{division.headline}&rdquo;
                </p>

                {/* Body paragraphs with staggered reveal */}
                <div className="space-y-5">
                  {division.modalContent.map((paragraph, i) => (
                    <p
                      key={i}
                      className="modal-text-reveal font-montserrat text-[13px] sm:text-[14px] text-[#5C5752] leading-[1.9] font-normal"
                      style={{ animationDelay: `${0.5 + i * 0.15}s` }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Highlights chips */}
                <div
                  className="modal-text-reveal flex flex-wrap gap-2 mt-8 mb-6"
                  style={{ animationDelay: `${0.5 + division.modalContent.length * 0.15}s` }}
                >
                  {division.highlights.map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-montserrat text-[10px] tracking-[0.1em] uppercase font-semibold text-[#003926] bg-[rgba(0,57,38,0.05)] border border-[rgba(0,57,38,0.1)]"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#003926]" />
                      {h}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div
                  className="modal-text-reveal mt-8 pt-6 border-t border-[#EDE8DF] flex items-center justify-between"
                  style={{ animationDelay: `${0.7 + division.modalContent.length * 0.15}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-px bg-[#B8935A]" />
                    <span className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-[#9C9690] font-semibold">
                      Designer World — Nagpal Group Since 1940s
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="font-montserrat text-[10px] tracking-[0.15em] uppercase font-bold text-[#B8935A] hover:text-[#1A1918] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────
   MAIN SECTION EXPORT
   ───────────────────────────────────────────────────── */
export default function Pillar4Divisions() {
  const [activeDivision, setActiveDivision] = useState<Division | null>(null);
  const { ref: introRef, isVisible: introVisible } = useScrollReveal(0.25);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PILLAR_CSS }} />

      <section id="divisions" className="w-full relative z-10">
        {/* ── SECTION INTRO ── */}
        <div
          ref={introRef}
          className="bg-white py-20 lg:py-28 text-center px-6 relative overflow-hidden border-b border-[#003926]/5"
        >
          {/* Subtle brand dots pattern overlay matching home-2 */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(0,57,38,0.12) 0.5px, transparent 0)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* Gold ambient glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-[0.08] blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(184,147,90,0.35), transparent)" }}
          />
          {/* Decorative background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span
              className="font-montserrat font-extrabold text-[160px] lg:text-[240px] leading-none"
              style={{ color: "rgba(0,57,38,0.03)" }}
            >
              V
            </span>
          </div>

          <p
            className={`pillar-reveal ${introVisible ? "visible" : ""} font-montserrat font-bold text-[10px] tracking-[0.4em] uppercase text-[#B8935A] mb-4 relative z-10`}
            style={{ animationDelay: "0s" }}
          >
            VERTICALS
          </p>

          <h2
            className={`pillar-reveal ${introVisible ? "visible" : ""} font-montserrat font-bold text-[34px] sm:text-[44px] lg:text-[54px] uppercase tracking-[0.08em] text-[#003926] leading-[1.1] max-w-3xl mx-auto relative z-10`}
            style={{
              animationDelay: "0.15s",
            }}
          >
            Our Core{" "}
            <span className="font-light">Divisions</span>
            <span className="text-[#B8935A]">.</span>
          </h2>

          <div
            className={`pillar-line ${introVisible ? "visible" : ""} w-14 h-px bg-[#B8935A] mx-auto mt-7`}
            style={{ animationDelay: "0.35s" }}
          />

          <p
            className={`pillar-reveal ${introVisible ? "visible" : ""} font-montserrat text-[13px] sm:text-[14px] text-[#003926]/75 mt-5 max-w-lg mx-auto leading-[1.85] font-normal relative z-10`}
            style={{ animationDelay: "0.45s" }}
          >
            Specialised business verticals that operate across manufacturing, distribution,
            components, and global supply.
          </p>
        </div>

        {/* ── DIVISION BLOCKS ── */}
        {NAGPAL_DIVISIONS.map((div, idx) => (
          <DivisionBlock
            key={div.index}
            division={div}
            reversed={idx % 2 !== 0}
            onOpenModal={() => setActiveDivision(div)}
          />
        ))}
      </section>

      {/* ── MODAL ── */}
      <DivisionModal
        division={activeDivision}
        onClose={() => setActiveDivision(null)}
      />
    </>
  );
}
