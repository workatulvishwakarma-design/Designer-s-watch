"use client";

import { useRef, useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════
   DESIGNER WORLD JOURNEY
   Editorial poster-style — matching South Seas structure:
   - 25% left sidebar with floating images + watermark text
   - 75% right content with vertical timeline
   - Floating "shape" images scattered throughout
   - Text-only panels alternating with text+image panels
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
    title: "The Genesis — Amritsar",
    desc: "Shree Virbhan Nagpal establishes a modest horology atelier in the golden lanes of pre-independence Amritsar, planting the seed for what will become one of India's most enduring watch dynasties.",
    type: "text-only",
  },
  {
    year: "1960s",
    title: "Strengthening Trust",
    desc: "The second generation inherits a philosophy — that integrity is the finest mechanism. They deepen trade relationships, expand the parts network, and earn trust that transforms customers into lifelong patrons.",
    type: "text-image",
    image: "/images/2gen.png",
  },
  {
    year: "1976",
    title: "Expansion to Mumbai",
    desc: "The third generation — Mr. Narinder Nagpal and Mr. Jatinder Nagpal — make a bold leap to Mumbai, establishing Nagpal's Bombay. International access transforms spare parts distribution into a continental operation.",
    type: "text-only",
  },
  {
    year: "1981",
    title: "Pan-India Battery Distribution",
    desc: "Nagpal's Bombay secures pan-India distribution for watch batteries from Renata, Maxell, Sony, and Seizaiken — a major credibility milestone cementing the group's reputation as India's watchmaking backbone.",
    type: "text-image",
    image: "/images/distr_.png",
  },
  {
    year: "1991",
    title: "Birth of D'SIGNER",
    desc: "Designer Watches Pvt. Ltd. launches D'SIGNER — one of India's first premium watch brands designed and manufactured to international standards. A creator is born from within the distributor, expanding to 100+ retail touchpoints.",
    type: "text-only",
  },
  {
    year: "1995",
    title: "ESCORT Enters the Market",
    desc: "After establishing D'SIGNER, the group enters the mass market with ESCORT — focused on delivering reliable quality at accessible pricing, bringing horological integrity to every Indian household.",
    type: "text-image",
    image: "/images/escort.png",
  },
  {
    year: "2013",
    title: "Daniel Klein — Sole Distributors",
    desc: "Turkish brand Daniel Klein appoints Nagpal Group as sole distributors for India. With 1,000+ models per year and dominance across e-commerce platforms, this partnership catalyses a digital commerce revolution.",
    type: "text-only",
  },
  {
    year: "2020",
    title: "Digital Boom & New-Age Growth",
    desc: "With e-commerce reshaping the watch market, the group scales into B2T smart wearables and launches Ghadiwaalaa.com — a curated watches and wearables marketplace for the modern Indian collector.",
    type: "text-image",
    image: "/images/today1.png",
  },
  {
    year: "2022",
    title: "New International Brands",
    desc: "Nagpal Group adds CIGA Design — award-winning skeleton watches — and Santa Barbara Polo & Racquet Club exclusively for India, broadening the portfolio with bold international design language.",
    type: "text-only",
  },
  {
    year: "Today",
    title: "Scale & Credibility",
    desc: "Standing on four generations of expertise, the group now commands 20+ international brands, unmatched after-sales service, and 500+ private labels manufactured — a legacy measured not in years but in the millions of wrists graced.",
    type: "text-image",
    image: "/images/today02.png",
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
  // Right side shapes scattered vertically
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

/* ── IO hook ── */
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

/* ── CSS ── */
const CSS = `
@keyframes jFade { from { opacity:0; transform:translateY(36px) } to { opacity:1; transform:translateY(0) } }
@keyframes jImgIn { from { opacity:0; transform:translateY(40px) scale(1.03) } to { opacity:1; transform:translateY(0) scale(1) } }
@keyframes jSlide { from { opacity:0; transform:translateX(-24px) } to { opacity:1; transform:translateX(0) } }

.jf { opacity:0 } .jf.v { animation: jFade .85s cubic-bezier(.22,1,.36,1) forwards }
.ji { opacity:0 } .ji.v { animation: jImgIn 1.1s cubic-bezier(.22,1,.36,1) forwards }
.js { opacity:0 } .js.v { animation: jSlide .9s cubic-bezier(.22,1,.36,1) forwards }

.j-hov { transition: transform .7s cubic-bezier(.22,1,.36,1); will-change:transform }
.j-hov:hover { transform: scale(1.03) translateY(-3px) }

.j-timeline-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(184,147,90,0.18);
}

.j-dot {
  position: absolute;
  left: -5px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #1A1918;
  border: 2px solid #B8935A;
  z-index: 10;
}

.j-panel-white {
  background: rgba(255,255,255,0.55);
  border-left: 3px solid rgba(184,147,90,0.2);
  padding: 32px 36px;
}

.j-panel-clear {
  padding: 32px 0;
}
`;

/* ── Timeline Event ── */
function TimelineEvent({ m, index }: { m: Milestone; index: number }) {
  const { ref, vis } = useReveal(0.08);
  const v = vis ? "v" : "";
  const isWhitePanel = m.type === "text-only";

  return (
    <div ref={ref} className="relative" style={{ paddingLeft: "32px", marginBottom: "0" }}>
      {/* Dot on the timeline line */}
      <div className="j-dot" style={{ top: "38px" }} />

      {isWhitePanel ? (
        /* TEXT-ONLY PANEL (white bg, like reference timeline-text-content-white) */
        <div className="j-panel-white" style={{ maxWidth: "560px" }}>
          <h3
            className={`js ${v} font-cormorant text-[36px] sm:text-[42px] lg:text-[52px] leading-none font-light`}
            style={{ color: "#1A1918", animationDelay: "0s" }}
          >
            {m.year}
          </h3>
          <h4
            className={`jf ${v} font-cormorant text-[17px] sm:text-[19px] font-medium mt-3 mb-3 leading-snug`}
            style={{ color: "#1A1918", animationDelay: "0.1s" }}
          >
            {m.title}
          </h4>
          <p
            className={`jf ${v} font-dm text-[13px] sm:text-[14px] leading-[1.85]`}
            style={{ color: "#5C5752", animationDelay: "0.18s" }}
          >
            {m.desc}
          </p>
        </div>
      ) : (
        /* TEXT + IMAGE PANEL (like reference text + timeline-img side by side) */
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-8" style={{ maxWidth: "720px" }}>
          {/* Text */}
          <div className="j-panel-clear flex-1" style={{ minWidth: 0 }}>
            <h3
              className={`js ${v} font-cormorant text-[36px] sm:text-[42px] lg:text-[52px] leading-none font-light`}
              style={{ color: "#1A1918", animationDelay: "0s" }}
            >
              {m.year}
            </h3>
            <h4
              className={`jf ${v} font-cormorant text-[17px] sm:text-[19px] font-medium mt-3 mb-3 leading-snug`}
              style={{ color: "#1A1918", animationDelay: "0.1s" }}
            >
              {m.title}
            </h4>
            <p
              className={`jf ${v} font-dm text-[13px] sm:text-[14px] leading-[1.85]`}
              style={{ color: "#5C5752", animationDelay: "0.18s" }}
            >
              {m.desc}
            </p>
          </div>
          {/* Image */}
          {m.image && (
            <div
              className={`ji ${v} flex-shrink-0`}
              style={{ width: "clamp(160px, 30%, 260px)", animationDelay: "0.25s" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.image}
                alt={m.title}
                className="j-hov w-full object-cover"
                style={{
                  borderRadius: "10%",
                  aspectRatio: "3/4",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
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
            From a modest horology atelier in the 1940s to a multi-brand watch ecosystem today — every generation expanded our expertise and elevated our standards.
          </p>

          {/* First year intro block (like reference 1885 block) */}
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
            <div className="flex-1 relative" style={{ minWidth: 0 }}>

              {/* Vertical timeline line */}
              <div className="j-timeline-line" />

              {/* Timeline events */}
              <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20 pb-20 lg:pb-32">
                {MILESTONES.map((m, i) => (
                  <TimelineEvent key={i} m={m} index={i} />
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
            &ldquo;Every watch we craft carries eighty years of purpose — the quiet conviction that what we build today will still be ticking long after we are gone.&rdquo;
          </p>
          <span className="block font-dm text-[10px] tracking-[0.25em] uppercase mt-4" style={{ color: "#B8935A" }}>
            — THE NAGPAL FAMILY
          </span>
        </div>
      </section>
    </>
  );
}
