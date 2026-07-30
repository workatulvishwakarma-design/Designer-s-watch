"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────
   PILLARS-2 PAGE
   Design: D'Signer History-style horizontal card carousel
   Content: "Our Core Divisions" from NagpalDivisions
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
      "A name and goodwill running strong for 50 years now. 1976–2026.",
    ],
    image: "/images/new-content/pillars/Nagpal_s Bombay/ng-bombay.jpg",
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
      "Our capability to deliver uncompromised quality at massive scale has earned the trust of industry leaders across sectors. We have successfully executed large-scale requirements for esteemed organizations including the Tata Group, ICICI Bank, Reebok, Nikon, and Amway.",
      "In the textile and fashion sectors, our legacy of precision is relied upon by giants such as Donear and Siyaram, alongside numerous leading pharmaceutical brands and institutional bodies.",
      "From bespoke dial customization to specialized packaging and nationwide delivery logistics, our corporate division operates with the exacting standards and reliability demanded by India's most respected conglomerates.",
    ],
    image: "/images/new-content/pillars/Corporate B2B/2a.jpg",
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
      "We partner with fashion labels, lifestyle brands, and specialized retailers, translating their brand DNA into compelling timepieces.",
      "By maintaining strict confidentiality and uncompromising production standards, we serve as the silent engine behind many successful watch brands operating in the market today.",
    ],
    image: "/images/new-content/pillars/OEM- ODM/WhatsApp Image 2026-04-04 at 4.14.22 PM (1).jpeg",
  },
  {
    index: "04",
    eyebrow: "BRAND PORTFOLIO",
    title: "D'SIGNER • ESCORT",
    headline: "Proprietary watchmaking embodying eight decades of heritage.",
    body: "In-house designed and manufactured watch brands offering premium timepieces that combine decades of horological expertise with contemporary design.",
    highlights: ["In-House Design", "Heritage Backed", "Premium Segment"],
    modalContent: [
      "D'SIGNER and ESCORT represent the Nagpal Group's most personal expression of watchmaking philosophy—proprietary brands conceived, designed, engineered, and brought to market entirely within our ecosystem.",
      "D'SIGNER positions itself in the premium segment, offering bold design language, superior materials, and exceptional finishing.",
      "ESCORT serves the value-conscious consumer who refuses to compromise on reliability. With robust movements, durable construction, and timeless design, ESCORT watches are engineered for everyday excellence.",
      "Together, these house brands represent the full spectrum of our capability—from design studio creativity to manufacturing floor precision and lifelong after-sales commitment.",
    ],
    image: "/images/new-img/pillars/8.jpg",
  },
  {
    index: "05",
    eyebrow: "GLOBAL REACH",
    title: "Exports & Global Trade",
    headline: "Carrying Indian horological excellence to international shores.",
    body: "Global supply capabilities delivering watches and components to international markets with dependable quality standards.",
    highlights: ["Global Markets", "Quality Assured", "International Delivery"],
    modalContent: [
      "The Exports division extends the Nagpal Group's reach beyond India's borders, serving international markets with both finished timepieces and precision components.",
      "We maintain compliance with international trade regulations, customs documentation protocols, and destination-market quality certifications.",
      "Our export relationships span established markets in the Middle East, Southeast Asia, and Africa, with a growing presence in European and North American distribution networks.",
      "This division also serves as a window into global trends and competitive benchmarks, bringing back insights that inform product development across the group.",
    ],
    image: "/images/new-content/pillars/Exports/WhatsApp Image 2026-04-15 at 11.30.22 AM.jpeg",
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
      "The store showcases our prime models, new launches, top sellers, and special editions in an atmosphere crafted to inspire.",
      "This boutique is a gesture to connect with watch enthusiasts and add enduring value to our happy watch buyers. First location: Agra.",
    ],
    image: "/images/new-content/pillars/Time Corridor/time corriddor/1A1A8499.JPG",
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
      "We supply genuine button cells to independent retailers, authorised service centres, and major watch networks, ensuring the reliable performance of timepieces nationwide.",
    ],
    image: "/images/new-content/pillars/Batteries/batteries-banner.webp",
  },
];

/* ─────────────────────────────────────────────────────
   DETAIL MODAL
   ───────────────────────────────────────────────────── */
function DivisionModal({
  division,
  onClose,
}: {
  division: Division | null;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = division ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [division]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
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
          <motion.div
            className="fixed inset-0 z-[200]"
            style={{ background: "rgba(10,10,9,0.55)", backdropFilter: "blur(10px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[210] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-2xl max-h-[88vh] rounded-2xl overflow-hidden bg-white"
              style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,57,38,0.05)" }}
              initial={{ scale: 0.94, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-8 sm:px-10 pt-10 pb-7 border-b border-gray-100">
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="#1A1918" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                  <div style={{ width:28, height:1, background:"#003926" }} />
                  <span style={{ fontFamily:"var(--font-montserrat),sans-serif", fontSize:9, letterSpacing:"0.35em", textTransform:"uppercase", color:"#003926", fontWeight:500 }}>
                    {division.eyebrow} — DIVISION {division.index}
                  </span>
                </div>
                <h3 style={{ fontFamily:"var(--font-montserrat),sans-serif", fontSize:30, fontWeight:500, color:"#1A1918", lineHeight:1.1, marginBottom:8 }}>
                  {division.title}
                </h3>
                <div style={{ width:40, height:1, background:"#003926", opacity:0.35, marginTop:16 }} />
              </div>
              <div className="overflow-y-auto" style={{ maxHeight:"calc(88vh - 200px)", padding:"28px 40px 36px" }}>
                <p style={{ fontFamily:"var(--font-montserrat),sans-serif", fontSize:16, color:"#1A1918", lineHeight:1.6, marginBottom:24, paddingLeft:20, borderLeft:"2px solid #003926", fontWeight:500 }}>
                  &ldquo;{division.headline}&rdquo;
                </p>
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  {division.modalContent.map((p, i) => (
                    <p key={i} style={{ fontFamily:"var(--font-montserrat),sans-serif", fontSize:14, color:"#5C5752", lineHeight:2.0 }}>{p}</p>
                  ))}
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:24 }}>
                  {division.highlights.map((h) => (
                    <span key={h} style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"4px 14px", borderRadius:100, fontSize:11, color:"#003926", border:"1px solid rgba(0,57,38,0.18)", background:"rgba(0,57,38,0.04)" }}>
                      <span style={{ width:5, height:5, borderRadius:"50%", background:"#003926" }} />
                      {h}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop:28, paddingTop:20, borderTop:"1px solid #F0F0F0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase", color:"#AAA" }}>Designer World — Nagpal Group Since 1940s</span>
                  <button onClick={onClose} style={{ fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase", color:"#003926", background:"none", border:"none", cursor:"pointer" }}>Close</button>
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
   PAGE
   ───────────────────────────────────────────────────── */
export default function Pillars2Page() {
  const [activeDivision, setActiveDivision] = useState<Division | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragStartX = useRef(0);
  const CARD_WIDTH = 321;
  const total = NAGPAL_DIVISIONS.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = (idx: number) => setActiveIndex(Math.max(0, Math.min(idx, total - 1)));

  const onMouseDown = (e: React.MouseEvent) => { setIsDragging(true); dragStartX.current = e.clientX; };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && activeIndex < total - 1) goTo(activeIndex + 1);
      else if (diff < 0 && activeIndex > 0) goTo(activeIndex - 1);
    }
    setIsDragging(false);
  };
  const onTouchStart = (e: React.TouchEvent) => { dragStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = dragStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && activeIndex < total - 1) goTo(activeIndex + 1);
      else if (diff < 0 && activeIndex > 0) goTo(activeIndex - 1);
    }
  };

  return (
    <>
      <style>{`
        html,body { margin:0; padding:0; overflow-x:hidden; }
        *,*::before,*::after { box-sizing:border-box; }

        /* DESKTOP LAYOUT — sits below fixed global header (80px tall) */
        .p2-page { display:flex; height:calc(100vh - 180px); overflow:hidden; background:#FAFAFA; margin-bottom: 40px; }

        /* SIDEBAR */
        .p2-sidebar { width:250px; min-width:250px; flex-shrink:0; border-right:1px solid #E8E8E8; background:#fff; display:flex; flex-direction:column; justify-content:space-between; padding:32px 26px 26px; overflow-y:auto; }
        .p2-sb-label { display:flex; align-items:center; gap:9px; margin-bottom:14px; font-family:var(--font-montserrat),sans-serif; font-size:8.5px; letter-spacing:0.38em; text-transform:uppercase; color:#003926; font-weight:500; }
        .p2-sb-label::before { content:''; display:block; width:16px; height:1px; background:#003926; flex-shrink:0; }
        .p2-sb-heading { font-family:var(--font-montserrat),sans-serif; font-size:30px; font-weight:500; line-height:1.08; color:#1A1918; margin:0 0 22px; }
        .p2-sb-heading em { font-style:italic; color:#003926; }
        .p2-sb-nav { list-style:none; margin:0 0 22px; padding:0; }
        .p2-sb-nav li { margin-bottom:9px; }
        .p2-sb-nav button { background:none; border:none; cursor:pointer; padding:0; font-family:var(--font-montserrat),sans-serif; font-size:11.5px; color:#AAA; text-align:left; transition:color 0.2s; }
        .p2-sb-nav button:hover,.p2-sb-nav button.sb-on { color:#1A1918; }
        .p2-sb-nav button.sb-on { font-weight:500; }
        .p2-dots { display:flex; flex-direction:column; gap:8px; }
        .p2-dot-row { display:flex; align-items:center; gap:9px; cursor:pointer; padding:2px 0; }
        .p2-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; border:1.5px solid #CCC; background:transparent; transition:all 0.25s; }
        .p2-dot.dot-on { border-color:#003926; background:#003926; width:9px; height:9px; }
        .p2-dot-lbl { font-family:var(--font-montserrat),sans-serif; font-size:9px; color:#BBB; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; transition:color 0.2s; }
        .p2-dot-row:hover .p2-dot-lbl,.p2-dot-row.dot-on .p2-dot-lbl { color:#333; }

        /* CAROUSEL COLUMN */
        .p2-carousel-col { flex:1; min-width:0; display:flex; flex-direction:column; overflow:hidden; }
        .p2-rail-wrap { flex:1; overflow:hidden; cursor:grab; min-height:0; }
        .p2-rail-wrap:active { cursor:grabbing; }
        .p2-rail { display:flex; height:100%; transition:transform 0.55s cubic-bezier(0.22,1,0.36,1); }

        /* CARD */
        .p2-card {
          width:320px; min-width:320px; height:100%; flex-shrink:0;
          border-right:1px solid #E8E8E8; background:#fff;
          display:flex; flex-direction:column;
          transition: background 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
        }
        .p2-card:hover {
          background: #003926 !important;
          box-shadow: 0 14px 32px rgba(0,57,38,0.25);
          z-index: 5;
        }
        .p2-card:hover .p2-card-word,
        .p2-card:hover .p2-card-name {
          color: #ffffff !important;
        }
        .p2-card:hover .p2-card-idx {
          color: rgba(255,255,255,0.5) !important;
        }
        .p2-card:hover .p2-eline {
          background: #ffffff !important;
        }
        .p2-card:hover .p2-eyebrow {
          color: rgba(255,255,255,0.9) !important;
        }
        .p2-card:hover .p2-card-desc {
          color: rgba(255,255,255,0.85) !important;
        }
        .p2-card:hover .p2-chip {
          color: #ffffff !important;
          border-color: rgba(255,255,255,0.25) !important;
          background: rgba(255,255,255,0.12) !important;
        }
        .p2-card:hover .p2-readmore {
          color: #ffffff !important;
        }
        .p2-card:hover .p2-readmore svg path {
          stroke: #ffffff !important;
        }
        .p2-card:hover .p2-card-img {
          border-color: rgba(255,255,255,0.25) !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .p2-card-hdr { padding:22px 22px 14px; border-bottom:1px solid #F0F0F0; flex-shrink:0; transition:border-color 0.35s ease; }
        .p2-card:hover .p2-card-hdr { border-bottom-color: rgba(255,255,255,0.15) !important; }
        .p2-card-meta { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:9px; }
        .p2-card-word { font-family:var(--font-montserrat),sans-serif; font-size:24px; font-weight:500; color:#1A1918; line-height:1; transition:color 0.35s ease; }
        .p2-card-word.word-on { color:#003926; }
        .p2-card-idx { font-family:var(--font-montserrat),sans-serif; font-size:12px; color:#CECCCA; font-weight:500; transition:color 0.35s ease; }
        .p2-eline { width:20px; height:1.5px; background:#003926; margin-bottom:5px; transition:background 0.35s ease; }
        .p2-eyebrow { font-family:var(--font-montserrat),sans-serif; font-size:8px; letter-spacing:0.3em; text-transform:uppercase; color:#003926; font-weight:500; transition:color 0.35s ease; }
        .p2-card-body { padding:14px 22px 0; flex:1; display:flex; flex-direction:column; min-height:0; overflow:hidden; }
        .p2-card-name { font-family:var(--font-montserrat),sans-serif; font-size:11px; font-weight:500; color:#1A1918; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:8px; transition:color 0.35s ease; }
        .p2-card-desc { font-family:var(--font-montserrat),sans-serif; font-size:11.5px; color:#888; line-height:1.75; flex:1; transition:color 0.35s ease; }
        .p2-card-chips { display:flex; flex-wrap:wrap; gap:4px; margin-top:10px; }
        .p2-chip { font-family:var(--font-montserrat),sans-serif; font-size:8.5px; letter-spacing:0.05em; color:#003926; border:1px solid rgba(0,57,38,0.18); border-radius:100px; padding:2px 9px; background:rgba(0,57,38,0.04); transition:all 0.35s ease; }
        .p2-readmore { display:inline-flex; align-items:center; gap:5px; margin-top:12px; margin-bottom:2px; font-family:var(--font-montserrat),sans-serif; font-size:9px; letter-spacing:0.18em; text-transform:uppercase; color:#003926; background:none; border:none; cursor:pointer; padding:0; flex-shrink:0; transition:color 0.35s ease, opacity 0.2s; }
        .p2-readmore:hover { opacity:0.85; }
        .p2-readmore:hover svg { transform:translateX(3px); }
        .p2-readmore svg { transition:transform 0.2s; }
        .p2-readmore svg path { transition:stroke 0.35s ease; }
        .p2-card-img { margin:12px 16px 14px; border-radius:5px; overflow:hidden; border:1px solid #EBEBEB; flex-shrink:0; background:#F2F2F2; position:relative; aspect-ratio:16/10; transition:border-color 0.35s ease, box-shadow 0.35s ease; }
        .p2-card-img img { width:100%; height:100%; object-fit:cover; display:block; }
        .p2-imgph { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-family:var(--font-montserrat),sans-serif; font-size:9px; letter-spacing:0.15em; text-transform:uppercase; color:#C8C8C8; background:#F4F4F4; }

        /* TIMELINE BAR */
        .p2-bar { flex-shrink:0; border-top:1px solid #E8E8E8; display:flex; align-items:center; background:#fff; padding:0 14px; height:48px; overflow-x:auto; overflow-y:hidden; scrollbar-width:none; }
        .p2-bar::-webkit-scrollbar { display:none; }
        .p2-tick { display:flex; flex-direction:column; align-items:center; gap:4px; cursor:pointer; padding:0 11px; flex-shrink:0; transition:opacity 0.2s; }
        .p2-tick:hover { opacity:0.7; }
        .p2-tick-line { width:1px; height:8px; background:#CCC; transition:all 0.2s; }
        .p2-tick.tick-on .p2-tick-line { background:#003926; height:12px; }
        .p2-tick-lbl { font-family:var(--font-montserrat),sans-serif; font-size:8.5px; color:#BBBBBB; white-space:nowrap; letter-spacing:0.04em; transition:color 0.2s; }
        .p2-tick.tick-on .p2-tick-lbl { color:#003926; font-weight:500; }
        .p2-arrows { display:flex; align-items:center; gap:6px; margin-left:auto; padding-left:12px; flex-shrink:0; }
        .p2-arr { width:30px; height:30px; border-radius:50%; border:1px solid #E0E0E0; display:flex; align-items:center; justify-content:center; cursor:pointer; background:#fff; transition:all 0.2s; flex-shrink:0; }
        .p2-arr:hover:not(:disabled) { border-color:#003926; background:#003926; }
        .p2-arr:hover:not(:disabled) path { stroke:#fff; }
        .p2-arr:disabled { opacity:0.25; cursor:not-allowed; }

        /* TABLET */
        @media (min-width:768px) and (max-width:1023px) {
          .p2-sidebar { width:200px; min-width:200px; padding:22px 18px 18px; }
          .p2-sb-heading { font-size:26px; }
          .p2-card { width:280px; min-width:280px; }
        }

        /* Mobile-only elements: hidden on desktop, shown via @media below */
        .p2-mob-hdr { display:none; }
        .p2-mob-tabs { display:none; }
        .p2-mob-dots { display:none; }

        /* MOBILE */
        @media (max-width:767px) {
          .p2-page { flex-direction:column; height:auto; overflow:visible; }
          .p2-sidebar { display:none; }
          .p2-mob-hdr { display:block; background:#fff; border-bottom:1px solid #E8E8E8; padding:24px 20px 18px; }
          .p2-mob-label { display:flex; align-items:center; gap:8px; margin-bottom:10px; font-family:var(--font-montserrat),sans-serif; font-size:8px; letter-spacing:0.38em; text-transform:uppercase; color:#003926; font-weight:500; }
          .p2-mob-label::before { content:''; display:block; width:14px; height:1px; background:#003926; flex-shrink:0; }
          .p2-mob-hdr h1 { font-family:var(--font-montserrat),sans-serif; font-size:34px; font-weight:500; line-height:1.08; color:#1A1918; margin:0; }
          .p2-mob-hdr h1 em { font-style:italic; color:#003926; }
          .p2-mob-tabs { display:flex; overflow-x:auto; scrollbar-width:none; background:#fff; border-bottom:1px solid #E8E8E8; }
          .p2-mob-tabs::-webkit-scrollbar { display:none; }
          .p2-mob-tab { flex-shrink:0; padding:11px 14px; font-family:var(--font-montserrat),sans-serif; font-size:9px; letter-spacing:0.08em; text-transform:uppercase; color:#AAA; background:none; border:none; border-bottom:2px solid transparent; cursor:pointer; white-space:nowrap; transition:all 0.2s; }
          .p2-mob-tab.tab-on { color:#003926; border-bottom-color:#003926; }
          .p2-carousel-col { height:auto; overflow:visible; }
          .p2-rail-wrap { height:auto; overflow:hidden; cursor:default; flex:none; }
          .p2-rail { height:auto; }
          .p2-card { width:100vw; min-width:100vw; height:auto; border-right:none; border-bottom:1px solid #E8E8E8; }
          .p2-card-hdr { padding:20px 20px 12px; }
          .p2-card-word { font-size:30px; font-weight:500; }
          .p2-card-body { padding:12px 20px 0; overflow:visible; }
          .p2-card-desc { flex:none; }
          .p2-card-img { aspect-ratio:4/3; }
          .p2-mob-dots { display:flex; justify-content:center; gap:7px; padding:14px 0 4px; background:#fff; }
          .p2-mob-dot { width:6px; height:6px; border-radius:50%; background:#DDD; transition:all 0.25s; cursor:pointer; border:none; padding:0; }
          .p2-mob-dot.mdot-on { background:#003926; width:18px; border-radius:3px; }
          .p2-bar { height:42px; padding:0 10px; }
          .p2-tick { padding:0 8px; }
          .p2-tick-lbl { font-size:7.5px; }
        }
      `}</style>

      <div 
        className="pt-[72px] md:pt-[80px] xl:pt-[88px]" 
        style={{ fontFamily:"var(--font-montserrat),sans-serif", background:"#FAFAFA" }}
      >


        {/* Mobile header (hidden on desktop via CSS) */}
        <div className="p2-mob-hdr">
          <div className="p2-mob-label">Verticals</div>
          <h1>OUR CORE<br /><em>DIVISIONS.</em></h1>
        </div>

        {/* Mobile scrollable tab bar */}
        <div className="p2-mob-tabs">
          {NAGPAL_DIVISIONS.map((d, i) => (
            <button key={d.index} className={`p2-mob-tab ${activeIndex === i ? "tab-on" : ""}`} onClick={() => goTo(i)}>
              {d.eyebrow}
            </button>
          ))}
        </div>

        {/* MAIN */}
        <div className="p2-page">

          {/* SIDEBAR (desktop/tablet only) */}
          <aside className="p2-sidebar">
            <div>
              <div className="p2-sb-label">Verticals</div>
              <h2 className="p2-sb-heading">OUR<br />CORE<br /><em>DIVISIONS.</em></h2>
              <ul className="p2-sb-nav">
                {NAGPAL_DIVISIONS.map((d, i) => (
                  <li key={d.index}>
                    <button className={activeIndex === i ? "sb-on" : ""} onClick={() => goTo(i)}>{d.title}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p2-dots">
              {NAGPAL_DIVISIONS.map((d, i) => (
                <div key={d.index} className={`p2-dot-row ${activeIndex === i ? "dot-on" : ""}`} onClick={() => goTo(i)}>
                  <div className={`p2-dot ${activeIndex === i ? "dot-on" : ""}`} />
                  <span className="p2-dot-lbl">{d.title}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* CAROUSEL */}
          <div className="p2-carousel-col">
            <div className="p2-rail-wrap"
              onMouseDown={onMouseDown} onMouseUp={onMouseUp}
              onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
              style={{ userSelect: isDragging ? "none" : "auto" }}>
              <div className="p2-rail"
                style={{ transform: isMobile ? `translateX(calc(-${activeIndex} * 100vw))` : `translateX(calc(-${activeIndex} * ${CARD_WIDTH + 1}px))` }}>
                {NAGPAL_DIVISIONS.map((div, idx) => {
                  const active = activeIndex === idx;
                  return (
                    <div key={div.index} className={`p2-card ${active ? "card-on" : ""}`}>
                      <div className="p2-card-hdr">
                        <div className="p2-card-meta">
                          <span className={`p2-card-word ${active ? "word-on" : ""}`}>{div.title.split(" ")[0]}</span>
                          <span className="p2-card-idx">{div.index}</span>
                        </div>
                        <div className="p2-eline" />
                        <div className="p2-eyebrow">{div.eyebrow}</div>
                      </div>
                      <div className="p2-card-body">
                        <div className="p2-card-name">{div.title}</div>
                        <p className="p2-card-desc">{div.body}</p>
                        <div className="p2-card-chips">
                          {div.highlights.map((h) => <span key={h} className="p2-chip">{h}</span>)}
                        </div>
                        <button className="p2-readmore" onClick={() => setActiveDivision(div)}>
                          Read More
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2.5 7h9M8 4l3 3-3 3" stroke="#003926" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                      <div className="p2-card-img">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={div.image} alt={div.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                            const ph = ((e.target as HTMLImageElement).nextElementSibling) as HTMLElement;
                            if (ph) ph.style.display = "flex";
                          }}/>
                        <div className="p2-imgph" style={{ display:"none" }}>Image Box</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile progress dots */}
            <div className="p2-mob-dots">
              {NAGPAL_DIVISIONS.map((d, i) => (
                <button key={d.index} className={`p2-mob-dot ${activeIndex === i ? "mdot-on" : ""}`} onClick={() => goTo(i)} aria-label={d.title} />
              ))}
            </div>

            {/* Timeline bar */}
            <div className="p2-bar">
              {NAGPAL_DIVISIONS.map((div, i) => (
                <div key={div.index} className={`p2-tick ${activeIndex === i ? "tick-on" : ""}`} onClick={() => goTo(i)}>
                  <div className="p2-tick-line" />
                  <div className="p2-tick-lbl">{div.eyebrow}</div>
                </div>
              ))}
              <div className="p2-arrows">
                <button className="p2-arr" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Prev">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="#1A1918" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="p2-arr" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === total - 1} aria-label="Next">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="#1A1918" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DivisionModal division={activeDivision} onClose={() => setActiveDivision(null)} />
    </>
  );
}

