"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/* ─────────────────────────────────────────────────────
   6 CORE DIVISIONS — DATA
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
};

const DIVISIONS: Division[] = [
  {
    index: "01",
    eyebrow: "GLOBAL REACH",
    title: "International Brands",
    headline: "Bridging the world's finest watchmakers with India's discerning collectors.",
    body: "Distribution and retail of international watch brands across India, combining global partnerships with local market expertise for both retail and digital channels.",
    highlights: ["Global Distribution", "Retail & Digital", "20+ Brands"],
    modalContent: [
      "Designer World's International Brands division serves as the critical bridge between the world's most respected watchmakers and India's rapidly evolving luxury market. With strategic partnerships spanning over twenty global brands, we bring world-class horological craftsmanship to Indian wrists through an omnichannel approach.",
      "Our retail footprint extends across major metropolitan centres, supported by a robust digital commerce platform that ensures accessibility beyond geographical boundaries. Each partnership is built on mutual respect — we don't merely distribute; we curate, contextualise, and champion each brand's identity within the Indian market.",
      "From Swiss precision to Japanese innovation, from heritage houses to contemporary disruptors, our portfolio reflects the full spectrum of international watchmaking. Every brand in our stable has been vetted not just for quality, but for its ability to resonate with the values and aspirations of the Indian consumer.",
      "The result is a distribution network that thinks globally but operates locally — understanding regional preferences, seasonal demand patterns, and the cultural significance that timepieces hold in different parts of the country."
    ],
    image: "/images/nagpal1.png",
    bg: "#0D0D0C",
    textColor: "#FAFAF8",
    accentColor: "#B8935A",
  },
  {
    index: "02",
    eyebrow: "MANUFACTURING",
    title: "OEM / ODM Manufacturing",
    headline: "From concept to wrist — engineering private label excellence at scale.",
    body: "End-to-end private label manufacturing for brands and retailers, from design and prototyping to production and quality assurance, with over 500 labels delivered.",
    highlights: ["Private Label", "End-to-End", "500+ Labels"],
    modalContent: [
      "Our OEM/ODM manufacturing division represents the industrial backbone of the Nagpal Group's horological ecosystem. With decades of accumulated expertise, we transform a client's vision into a tangible, market-ready timepiece — handling every stage from initial concept sketches through to final quality certification.",
      "The journey begins in our design studio, where clients collaborate directly with our technical team to define specifications, materials, and aesthetic direction. Advanced CAD modelling and rapid prototyping allow iterative refinement before any production commitment, ensuring the final product precisely matches the client's vision.",
      "Our production facilities maintain rigorous quality control protocols at every station. Each component — case, dial, movement, strap, clasp — undergoes individual inspection before assembly. Post-assembly, every watch completes a comprehensive testing cycle including water resistance, timekeeping accuracy, and wearability assessment.",
      "With over five hundred private labels successfully delivered to Indian and international brands, our manufacturing division has earned a reputation for reliability, flexibility, and the ability to execute at scale without compromising the attention to detail that smaller runs demand."
    ],
    image: "/images/hover-1.png",
    bg: "#FAF8F4",
    textColor: "#1A1918",
    accentColor: "#003926",
  },
  {
    index: "03",
    eyebrow: "ENTERPRISE",
    title: "B2B / Institutional Supply",
    headline: "Dependable partnerships powering corporate and institutional timekeeping.",
    body: "Corporate and institutional supply of watches and related products, with reliable inventory and bulk order capabilities for businesses and organisations.",
    highlights: ["Corporate", "Bulk Orders", "Reliable Inventory"],
    modalContent: [
      "The institutional supply division caters to a distinct but significant segment of the watch market — organisations that require reliable, high-quality timepieces at volume. From corporate gifting programmes to employee milestone awards, from government tenders to hospitality chains, this division delivers consistency at scale.",
      "Our institutional clients benefit from dedicated account management, customised branding options including dial printing and caseback engraving, and flexible inventory management that accommodates both planned procurement cycles and urgent requirements.",
      "We maintain strategic stock reserves across popular models and price points, enabling rapid fulfilment even for large orders. Our logistics infrastructure supports nationwide delivery with full tracking and documentation, essential for institutional procurement compliance.",
      "Beyond simple supply, we offer consultation on product selection — helping organisations choose timepieces that align with their brand positioning, budget parameters, and the intended recipient profile. This advisory approach has made us the preferred watch procurement partner for over a hundred corporations and institutions across India."
    ],
    image: "/images/nagpal2.png",
    bg: "#111110",
    textColor: "#FAFAF8",
    accentColor: "#B8935A",
  },
  {
    index: "04",
    eyebrow: "COMPONENTS",
    title: "Parts — Nagpal Bombay",
    headline: "The unseen infrastructure that keeps millions of watches alive.",
    body: "Spare parts distribution and technical support for watches, serving authorised service centers and repair networks across the country with genuine components.",
    highlights: ["Spare Parts", "Service Centers", "Technical Support"],
    modalContent: [
      "Nagpal Bombay's parts division is the quiet engine that sustains India's watch repair and service ecosystem. Operating from our dedicated facility, this division maintains one of the country's most comprehensive inventories of genuine watch components — from movements and crystals to crowns, stems, and gaskets.",
      "Our catalogue spans thousands of SKUs covering major international and domestic watch brands, ensuring that authorised service centres and qualified watchmakers have access to the exact component they need, when they need it. This reduces repair turnaround times and eliminates the quality risks associated with aftermarket substitutes.",
      "Beyond parts supply, we provide technical documentation, service bulletins, and training support to our network of certified repair partners. This knowledge-sharing infrastructure elevates the overall standard of watch servicing across the country.",
      "The parts division also serves as a critical feedback loop for our manufacturing operations — field data on component longevity and failure patterns directly informs our material selection and quality control processes, creating a virtuous cycle of continuous improvement."
    ],
    image: "/images/nagpal3.png",
    bg: "#F2EDE6",
    textColor: "#1A1918",
    accentColor: "#003926",
  },
  {
    index: "05",
    eyebrow: "GLOBAL TRADE",
    title: "Exports",
    headline: "Carrying Indian horological excellence to international shores.",
    body: "Global supply capabilities delivering watches and components to international markets with dependable quality standards.",
    highlights: ["Global Markets", "Quality Assured", "International Delivery"],
    modalContent: [
      "The Exports division extends the Nagpal Group's reach beyond India's borders, serving international markets with both finished timepieces and precision components. Our export operations are built on the same quality standards that have earned domestic trust, applied with the additional rigour that global trade demands.",
      "We maintain compliance with international trade regulations, customs documentation protocols, and destination-market quality certifications. Each export shipment undergoes enhanced quality inspection to ensure that products arriving at international destinations reflect the full standard of our manufacturing capability.",
      "Our export relationships span established markets in the Middle East, Southeast Asia, and Africa, with growing presence in European and North American distribution networks. These relationships are built through trade exhibitions, direct partnerships, and the organic reputation that consistent quality generates over time.",
      "The export division also serves as a window into global trends and competitive benchmarks, bringing back insights that inform product development, pricing strategy, and quality positioning across all other divisions of the group."
    ],
    image: "/images/mumbai.png",
    bg: "#0D0D0C",
    textColor: "#FAFAF8",
    accentColor: "#B8935A",
  },
  {
    index: "06",
    eyebrow: "BRAND PORTFOLIO",
    title: "D'signer & Escort — House Brands",
    headline: "Proprietary watchmaking that embodies eight decades of Nagpal heritage.",
    body: "In-house designed and manufactured watch brands offering premium timepieces that combine decades of horological expertise with contemporary design for the modern Indian consumer.",
    highlights: ["In-House Design", "Heritage Backed", "Premium Segment"],
    modalContent: [
      "D'signer and Escort represent the Nagpal Group's most personal expression of watchmaking philosophy — proprietary brands conceived, designed, engineered, and brought to market entirely within our ecosystem. These are not licensed names or marketing exercises; they are the culmination of eighty years of accumulated craft.",
      "D'signer positions itself in the premium segment, offering bold design language, superior materials, and the kind of finishing that challenges imports at significantly higher price points. Every D'signer timepiece is a statement of Indian manufacturing capability — proof that world-class watchmaking is not confined to any single geography.",
      "Escort serves the value-conscious consumer who refuses to compromise on reliability. With robust movements, durable construction, and timeless design, Escort watches are engineered for everyday excellence — the kind of dependable companionship that builds brand loyalty across generations.",
      "Together, these house brands represent the full spectrum of the Nagpal Group's capability — from design studio creativity to manufacturing floor precision to after-sales commitment. They are, in every sense, watches made by people who have spent a lifetime understanding what a good watch truly means."
    ],
    image: "/images/legacy-craftsmanship.png",
    bg: "#FAF8F4",
    textColor: "#1A1918",
    accentColor: "#003926",
  },
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ─────────────────────────────────────────────────────
   CSS KEYFRAMES (injected once)
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
  60%  { opacity: 1; letter-spacing: 0.05em; }
  100% { opacity: 1; transform: translateY(0); letter-spacing: 0em; }
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
  const isDark = division.bg === "#0D0D0C" || division.bg === "#111110";
  const vis = isVisible ? "visible" : "";

  return (
    <div
      ref={ref}
      className="w-full relative overflow-hidden"
      style={{ background: division.bg }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] lg:min-h-[85vh] relative z-[2]">
        {/* IMAGE */}
        <div
          className={`flex items-center justify-center p-6 sm:p-8 lg:p-12 ${
            reversed ? "lg:order-2" : "lg:order-1"
          } order-1`}
        >
          <div
            className={`pillar-img-wrap ${vis} relative w-full overflow-hidden`}
            style={{
              borderRadius: "20%",
              animationDelay: "0.1s",
              boxShadow: isDark
                ? "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(184,147,90,0.08)"
                : "0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
            }}
          >
            <div className="pillar-img-inner relative w-full" style={{ aspectRatio: "4/5" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={division.image}
                alt={division.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center 30%", borderRadius: "20%" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/main-img1.png";
                }}
              />

              {/* Subtle gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  borderRadius: "20%",
                  background: isDark
                    ? "linear-gradient(180deg, transparent 40%, rgba(13,13,12,0.5) 100%)"
                    : "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.06) 100%)",
                }}
              />

              {/* Pillar index */}
              <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 z-10">
                <span
                  className="font-cormorant italic text-[56px] lg:text-[80px] leading-none select-none"
                  style={{
                    color: "rgba(255,255,255,0.12)",
                    textShadow: "0 2px 20px rgba(0,0,0,0.25)",
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
              className="font-dm text-[10px] tracking-[0.3em] uppercase"
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
              className="font-cormorant italic text-[13px] lg:text-[15px] block mb-1"
              style={{ color: division.accentColor }}
            >
              Division {division.index}
            </span>
            <h3
              className="font-cormorant text-[42px] sm:text-[50px] lg:text-[64px] leading-[0.95] font-light"
              style={{
                color: division.textColor,
                textShadow: isDark ? "0 2px 16px rgba(0,0,0,0.4)" : "none",
              }}
            >
              {division.title}
              <span style={{ color: division.accentColor }}>.</span>
            </h3>
          </div>

          {/* Divider */}
          <div
            className={`pillar-line ${vis} h-px my-7 lg:my-9`}
            style={{
              background: division.accentColor,
              width: 44,
              opacity: 0.45,
              animationDelay: "0.4s",
            }}
          />

          {/* Headline */}
          <p
            className={`pillar-reveal ${vis} font-cormorant italic text-[19px] sm:text-[21px] lg:text-[24px] leading-[1.4] mb-5 max-w-[480px]`}
            style={{
              color: division.textColor,
              opacity: 0.8,
              animationDelay: "0.45s",
              textShadow: isDark ? "0 1px 8px rgba(0,0,0,0.3)" : "none",
            }}
          >
            &ldquo;{division.headline}&rdquo;
          </p>

          {/* Body */}
          <p
            className={`pillar-reveal ${vis} font-dm text-[14px] sm:text-[15px] leading-[1.85] max-w-[460px] mb-8`}
            style={{
              color: division.textColor,
              opacity: 0.6,
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
                className={`pillar-highlight ${vis} inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-dm text-[11px] tracking-[0.05em]`}
                style={{
                  background: isDark ? "rgba(184,147,90,0.1)" : "rgba(0,57,38,0.06)",
                  color: division.accentColor,
                  border: `1px solid ${isDark ? "rgba(184,147,90,0.15)" : "rgba(0,57,38,0.12)"}`,
                  animationDelay: `${0.6 + i * 0.1}s`,
                }}
              >
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: division.accentColor }}
                />
                {h}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div
            className={`pillar-reveal ${vis}`}
            style={{ animationDelay: "0.75s" }}
          >
            <button
              onClick={onOpenModal}
              className="group relative inline-flex items-center gap-3 font-dm text-[11px] tracking-[0.2em] uppercase cursor-pointer"
              style={{ color: division.accentColor }}
            >
              <span className="relative">
                Learn More
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
                  style={{ background: division.accentColor }}
                />
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="group-hover:translate-x-1 transition-transform duration-500"
              >
                <path
                  d="M4 10h12M12 6l4 4-4 4"
                  stroke={division.accentColor}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   DETAIL MODAL — TEXT-ONLY, CINEMATIC REVEAL
   ───────────────────────────────────────────────────── */
function DivisionModal({
  division,
  onClose,
}: {
  division: Division | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (division) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [division]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {division && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200]"
            style={{ background: "rgba(10,10,9,0.7)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[210] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-2xl max-h-[88vh] rounded-2xl overflow-hidden"
              style={{
                background: "#FAFAF8",
                boxShadow: "0 40px 100px rgba(0,0,0,0.35), 0 0 0 1px rgba(184,147,90,0.08)",
              }}
              initial={{ scale: 0.93, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header — text only, no image */}
              <div
                className="relative px-8 sm:px-10 pt-10 pb-8"
                style={{
                  background: "linear-gradient(180deg, #F2EDE6 0%, #FAFAF8 100%)",
                }}
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer z-10"
                  style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <X size={16} className="text-[#1A1918]" />
                </button>

                {/* Eyebrow */}
                <div
                  className="modal-text-reveal flex items-center gap-3 mb-5"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="w-8 h-px bg-[#B8935A]" />
                  <span className="font-dm text-[9px] tracking-[0.35em] uppercase text-[#B8935A]">
                    {division.eyebrow} — DIVISION {division.index}
                  </span>
                </div>

                {/* Title with text shadow depth */}
                <h3
                  className="modal-heading font-cormorant text-[36px] sm:text-[48px] text-[#1A1918] font-light leading-[1.0] mb-4"
                  style={{
                    textShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  {division.title}
                  <span className="text-[#B8935A]">.</span>
                </h3>

                {/* Shimmer divider */}
                <div className="shimmer-divider w-16 mt-2" />
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto max-h-[calc(88vh-220px)] px-8 sm:px-10 pb-10">
                {/* Headline quote */}
                <p
                  className="modal-text-reveal font-cormorant italic text-[19px] sm:text-[22px] text-[#1A1918] leading-[1.5] mb-8 border-l-2 border-[#B8935A] pl-6"
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
                      className="modal-text-reveal font-dm text-[14px] sm:text-[15px] text-[#5C5752] leading-[2.0]"
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
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-dm text-[11px] tracking-[0.04em] text-[#003926] bg-[rgba(0,57,38,0.05)] border border-[rgba(0,57,38,0.1)]"
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
                    <span className="font-dm text-[9px] tracking-[0.2em] uppercase text-[#9C9690]">
                      Designer World — Nagpal Group Since 1940s
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="font-dm text-[10px] tracking-[0.15em] uppercase text-[#B8935A] hover:text-[#1A1918] transition-colors cursor-pointer"
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
export default function BrandPillars() {
  const [activeDivision, setActiveDivision] = useState<Division | null>(null);
  const { ref: introRef, isVisible: introVisible } = useScrollReveal(0.25);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PILLAR_CSS }} />

      <section className="w-full relative z-10">
        {/* ── SECTION INTRO ── */}
        <div
          ref={introRef}
          className="bg-[#FAF8F4] py-20 lg:py-28 text-center px-6 relative overflow-hidden"
        >
          {/* Decorative background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span
              className="font-cormorant italic text-[180px] lg:text-[260px] leading-none"
              style={{ color: "rgba(184,147,90,0.035)" }}
            >
              VI
            </span>
          </div>

          <p
            className={`pillar-reveal ${introVisible ? "visible" : ""} font-dm text-[10px] tracking-[0.4em] uppercase text-[#B8935A] mb-4 relative z-10`}
            style={{ animationDelay: "0s" }}
          >
            CORE DIVISIONS
          </p>

          <h2
            className={`pillar-reveal ${introVisible ? "visible" : ""} font-cormorant text-[38px] sm:text-[48px] lg:text-[60px] text-[#1A1918] leading-[1.08] max-w-3xl mx-auto relative z-10`}
            style={{
              animationDelay: "0.15s",
              textShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            Our Core{" "}
            <span className="italic font-light">Divisions</span>
            <span className="text-[#B8935A]">.</span>
          </h2>

          <div
            className={`pillar-line ${introVisible ? "visible" : ""} w-14 h-px bg-[#B8935A] mx-auto mt-7`}
            style={{ animationDelay: "0.35s" }}
          />

          <p
            className={`pillar-reveal ${introVisible ? "visible" : ""} font-dm text-[14px] sm:text-[15px] text-[#9C9690] mt-5 max-w-lg mx-auto leading-[1.8] relative z-10`}
            style={{ animationDelay: "0.45s" }}
          >
            Specialised business verticals that operate across manufacturing, distribution,
            components, and global supply.
          </p>
        </div>

        {/* ── 6 DIVISION BLOCKS ── */}
        {DIVISIONS.map((div, idx) => (
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
