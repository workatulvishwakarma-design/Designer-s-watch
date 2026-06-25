"use client";

import { useRef, useState, useMemo } from "react";
import dynamic from 'next/dynamic';

// Above the fold
import HomeBrands from '@/components/sections/HomeBrands';
import CraftSection from '@/components/sections/CraftSection';
import LoadingScreen from '@/components/LoadingScreen';
import HomeVideoBanner from '@/components/sections/HomeVideoBanner';

// Below the fold - Lazy Loaded
const PartnerLogos = dynamic(() => import('@/components/sections/PartnerLogos'), { ssr: true });
const JoinTheWorld = dynamic(() => import('@/components/sections/JoinTheWorld'), { ssr: true });
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), { ssr: true });
// const BrandPillars = dynamic(() => import('@/components/sections/BrandPillars'), { ssr: true });
const WatchDetails = dynamic(() => import('@/components/sections/WatchDetails'), { ssr: true });
const HeritageIntro = dynamic(() => import('@/components/sections/HeritageIntro'), { ssr: true });
// const CollectionStorySection = dynamic(() => import('@/components/sections/CollectionStorySection'), { ssr: true });
const WhyDesignerWorld = dynamic(() => import('@/components/sections/WhyDesignerWorld'), { ssr: true });
const CoreValues = dynamic(() => import('@/components/sections/about/CoreValues'), { ssr: true });
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, Package, Shield, Truck } from 'lucide-react';
import type { ModelFamilyGroup } from '@/types/product';
import LuxuryPlaceholder from '@/components/ui/LuxuryPlaceholder';
import { getAllPrimaryImageCandidates } from '@/lib/imageResolver';

/* ─────────── Reusable Arrow Button ─────────── */
function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isLeft = direction === "left";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      suppressHydrationWarning
      className="absolute top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center rounded-full cursor-pointer"
      style={{
        width: 44,
        height: 44,
        [isLeft ? "left" : "right"]: -16,
        background: hovered ? "#003926" : "white",
        border: `1px solid ${hovered ? "#003926" : "#EDE8DF"}`,
        boxShadow: hovered
          ? "0 8px 28px rgba(0,57,38,0.3)"
          : "0 4px 20px rgba(0,0,0,0.10)",
        transition: "all 0.3s ease",
      }}
    >
      {isLeft ? (
        <ChevronLeft size={18} color={hovered ? "white" : "#1A1918"} />
      ) : (
        <ChevronRight size={18} color={hovered ? "white" : "#1A1918"} />
      )}
    </button>
  );
}

/* ─────────── Model Family Card (Luxury) ─────────── */
function FamilyCard({
  family,
  variant = "light",
}: {
  family: ModelFamilyGroup;
  variant?: "light" | "dark";
}) {
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  const isDark = variant === "dark";
  const cardBg = "#003926"; // Luxury brand green background
  const cardBorder = "rgba(212, 197, 160, 0.18)"; // Soft gold border
  const nameColor = "#FFFFFF"; // Pure white for high contrast
  const brandColor = "#D4C5A0"; // Luxury brand gold
  const priceColor = "#D4C5A0"; // Matching gold price

  const primaryVariant = family.variants[0];
  
  // Build candidate image paths for the primary variant
  const primaryCandidates = useMemo(() => {
    if (!primaryVariant) return [];
    return getAllPrimaryImageCandidates(family.familyId, primaryVariant.sku);
  }, [family.familyId, primaryVariant]);

  const primaryImage = primaryCandidates[imgIdx] || primaryVariant?.gallery?.primary || "";
  const secondVariant = family.variants.length > 1 ? family.variants[1] : null;
  const hoverImage = secondVariant?.gallery?.primary || primaryVariant?.gallery?.hover || primaryImage;

  const formattedPrice = family.priceRange.min === family.priceRange.max
    ? `₹${family.priceRange.min.toLocaleString("en-IN")}`
    : `From ₹${family.priceRange.min.toLocaleString("en-IN")}`;

  // On image error, try next candidate path; if all exhausted, show placeholder
  const handleImageError = () => {
    if (imgIdx < primaryCandidates.length - 1) {
      setImgIdx(prev => prev + 1);
    } else {
      setImgFailed(true);
    }
  };

  const showImages = primaryImage && !imgFailed;

  return (
    <Link href={`/product/${family.slug}`} className="block relative group">
    <div
      className="w-[280px] sm:w-[320px] md:w-[375px] flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer relative luxury-card-hover"
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 24px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,57,38,0.1), 0 0 40px rgba(0,57,38,0.06)`
          : "0 2px 8px rgba(0,0,0,0.04)",
        borderColor: hovered ? "rgba(0,57,38,0.2)" : cardBorder,
        transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4/5", background: "radial-gradient(ellipse at center, #0F3227, #002318)" }}
      >
        {showImages ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={primaryImage}
              alt={family.name}
              className="absolute inset-0 w-full h-full object-contain p-8"
              style={{
                transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
                transform: hovered ? "scale(1.06)" : "scale(1)",
                opacity: hovered && hoverImage !== primaryImage ? 0 : 1,
              }}
              onError={handleImageError}
              loading="lazy"
            />
            {hoverImage !== primaryImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hoverImage}
                alt={`${family.name} variant`}
                className="absolute inset-0 w-full h-full object-contain p-8"
                style={{
                  transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
                  transform: hovered ? "scale(1.06)" : "scale(1.02)",
                  opacity: hovered ? 1 : 0,
                }}
                loading="lazy"
              />
            )}
          </>
        ) : (
          <LuxuryPlaceholder />
        )}

        {/* Inner shadow for depth */}
        <div className="absolute inset-0 pointer-events-none rounded-t-2xl" style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.03)" }} />

        <span
          className="absolute top-3 left-3 rounded-full font-dm px-3 py-1.5 z-10"
          style={{
            fontSize: "9px",
            letterSpacing: "0.1em",
            background: "rgba(0, 57, 38, 0.6)",
            color: "#D4C5A0",
            border: "1px solid rgba(212, 197, 160, 0.35)",
            backdropFilter: "blur(4px)"
          }}
        >
          {family.variantCount} {family.variantCount === 1 ? "Style" : "Styles"}
        </span>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10"
          style={{
            background: "rgba(0, 57, 38, 0.75)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          <button
            className="rounded-full font-dm flex items-center gap-2"
            suppressHydrationWarning
            style={{
              background: "transparent",
              border: "1px solid #D4C5A0",
              color: "white",
              fontSize: "12px",
              padding: "10px 20px",
              transition: "all 0.3s ease, transform 0.4s ease",
              transform: hovered ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <Eye size={14} className="text-[#D4C5A0]" />
            Explore Series
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col">
        <p className="font-dm uppercase font-bold" style={{ fontSize: "9px", color: brandColor, letterSpacing: "0.2em" }}>
          {family.brand}
        </p>
        <p className="font-dm font-semibold mt-1" style={{ fontSize: "14px", color: nameColor }}>
          {family.name}
        </p>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="font-cormorant italic" style={{ fontSize: "20px", color: priceColor }}>
            {formattedPrice}
          </p>
          {family.variantCount > 1 && (
            <p className="font-dm" style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.5)" }}>
              · {family.variantCount} variants
            </p>
          )}
        </div>
      </div>
    </div>
    </Link>
  );
}

function scrollTrack(ref: React.RefObject<HTMLDivElement | null>, dir: "left" | "right") {
  const el = ref.current;
  if (!el) return;
  const firstChild = el.firstElementChild as HTMLElement;
  const amount = firstChild ? firstChild.offsetWidth + 16 : 391;
  el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
}

function TrustStrip() {
  const items = [
    { icon: <Truck size={22} strokeWidth={1.5} />, label: "Free Shipping", text: "On orders above ₹5,000" },
    { icon: <Shield size={22} strokeWidth={1.5} />, label: "100% Genuine", text: "Certified authentic products" },
    { icon: <Package size={22} strokeWidth={1.5} />, label: "Easy Returns", text: "7-day hassle-free returns" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {items.map((item) => (
          <div
            key={item.label}
            className="group flex items-center gap-4 p-5 md:p-6 rounded-2xl transition-all duration-400 cursor-default hover:-translate-y-1"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: "rgba(212,197,160,0.12)", border: "1px solid rgba(212,197,160,0.15)" }}>
              <span className="text-[#D4C5A0]">{item.icon}</span>
            </div>
            <div>
              <p className="font-dm font-bold text-[13px] tracking-[0.06em] uppercase text-white leading-[1.3]">{item.label}</p>
              <p className="font-dm text-[12px] text-white/40 mt-0.5 leading-[1.4]">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FamilyEditorial({
  title,
  subtitle,
  description,
  families,
  href,
  variant = "light",
  badge,
}: {
  title: string;
  subtitle: string;
  description: string;
  families: ModelFamilyGroup[];
  href: string;
  variant?: "light" | "dark";
  badge: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const isDark = variant === "dark";

  /* Luxury color scheme */
  const sectionBg = isDark ? "#1F3B34" : "#FAFAF8";
  const headingColor = isDark ? "#FFFFFF" : "#1A1A1A";
  const subtitleColor = isDark ? "#B8A878" : "#9C9690";
  const descColor = isDark ? "#D1D1D1" : "#9C9690";
  const badgeColor = isDark ? "#D4C5A0" : "#003926";
  const badgeBg = isDark ? "rgba(212,197,160,0.08)" : "#F0F7F4";
  const badgeBorder = isDark ? "rgba(212,197,160,0.2)" : "rgba(0,57,38,0.15)";
  const metaColor = isDark ? "rgba(212,197,160,0.5)" : "#9C9690";
  const linkColor = "#D4C5A0";

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: sectionBg,
        padding: isDark ? "100px 0" : "80px 0",
      }}
    >
      {/* Ambient glow for dark variant */}
      {isDark && (
        <>
          <div className="absolute top-1/2 left-[15%] w-[500px] h-[500px] pointer-events-none opacity-[0.08] blur-[150px] -translate-y-1/2"
            style={{ background: "radial-gradient(circle, rgba(212,197,160,0.5), transparent)" }}
          />
          <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] pointer-events-none opacity-[0.05] blur-[120px]"
            style={{ background: "radial-gradient(circle, rgba(0,120,80,0.5), transparent)" }}
          />
        </>
      )}

      {/* Header row */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <span
            className="inline-block px-5 py-2 rounded-full font-dm text-[11px] mb-5 tracking-[0.12em] uppercase"
            style={{ background: badgeBg, color: badgeColor, border: `1px solid ${badgeBorder}` }}
          >
            {badge}
          </span>

          {/* Title */}
          <h3
            className="font-cormorant text-[36px] sm:text-[42px] md:text-[48px] leading-[1.15] mt-1"
            style={{ color: headingColor, letterSpacing: "-0.01em" }}
          >
            {title}
            <span style={{ color: isDark ? "#D4C5A0" : "#003926" }}>.</span>
          </h3>

          {/* Subtitle */}
          <p className="font-dm italic text-[16px] md:text-[18px] mt-3" style={{ color: subtitleColor }}>
            {subtitle}
          </p>

          {/* Gold divider */}
          <div className="h-[2px] mt-5" style={{ width: 100, background: "linear-gradient(90deg, #D4C5A0, rgba(212,197,160,0.2))" }} />
        </motion.div>

        {/* Models count + View All */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="font-dm text-[12px] tracking-[0.1em] uppercase" style={{ color: metaColor }}>
              {families.length} {families.length === 1 ? "Model" : "Models"}
            </span>
            <Link
              href={href}
              className="group/link font-dm text-[13px] tracking-[0.08em] uppercase transition-all duration-300 relative"
              style={{ color: isDark ? linkColor : "#B8935A" }}
            >
              <span>View All →</span>
              <span className="absolute bottom-0 left-0 w-0 h-px group-hover/link:w-full transition-all duration-300" style={{ background: isDark ? linkColor : "#B8935A" }} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 0.9, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto px-6 lg:px-10 mb-12 font-dm text-[14px] md:text-[15px] max-w-xl leading-[1.8] tracking-[0.01em]"
        style={{ color: descColor }}
      >
        {description}
      </motion.p>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <CarouselArrow direction="left" onClick={() => scrollTrack(trackRef, "left")} />
        <CarouselArrow direction="right" onClick={() => scrollTrack(trackRef, "right")} />
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className={`${isDark ? "carousel-track-dark" : "carousel-track"} flex gap-5 overflow-x-auto py-2 px-1`}
            style={{ scrollSnapType: "x mandatory" }}
          >
            {families.map((f) => (
              <div key={f.slug} style={{ scrollSnapAlign: "start" }}>
                <FamilyCard family={f} variant={isDark ? "dark" : "light"} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explore CTA */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-7xl mx-auto px-6 lg:px-10 mt-12 flex justify-center"
      >
        <Link
          href={href}
          className="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-dm text-[12px] tracking-[0.15em] uppercase transition-all duration-500 hover:-translate-y-1"
          style={{
            background: isDark ? "transparent" : "#1F3B34",
            color: isDark ? "#D4C5A0" : "white",
            border: isDark ? "1px solid rgba(212,197,160,0.3)" : "1px solid #1F3B34",
            boxShadow: isDark ? "0 0 30px rgba(212,197,160,0.05)" : "0 8px 24px rgba(31,59,52,0.2)",
          }}
        >
          <span className="group-hover:tracking-[0.2em] transition-all duration-300">Explore {title}</span>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
            <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}

export default function HomeClient({
  menFamilies,
  womenFamilies
}: {
  menFamilies: ModelFamilyGroup[];
  womenFamilies: ModelFamilyGroup[];
}) {
  return (
    <>
      <LoadingScreen />
      <main>
        <HomeVideoBanner />

        <div className="green-ambient-divider" />

          <HomeBrands />
          <CoreValues />

          <WatchDetails />
          <CraftSection />

          {/* <CollectionStorySection /> */}

          <section className="relative overflow-hidden" style={{ background: "#003926" }}>
            {/* Background texture & ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.06] blur-[150px]" style={{ background: "radial-gradient(circle, rgba(212,197,160,0.8), transparent)" }} />
              <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] opacity-[0.04] blur-[120px]" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5), transparent)" }} />
            </div>

            <div className="relative z-10 text-center px-6 sm:px-10 pt-20 sm:pt-24 md:pt-28 pb-8 md:pb-12">
              {/* Gold accent dot */}
              <div className="w-2 h-2 rounded-full bg-[#D4C5A0] mx-auto mb-6 opacity-60" />

              <p className="font-dm font-bold uppercase mb-5" style={{ fontSize: "13px", letterSpacing: "0.25em", color: "#D4C5A0" }}>
                CURATED FOR YOU
              </p>

              <h2 className="font-cormorant text-[40px] sm:text-[54px] md:text-[68px] text-white font-light leading-[1.05]" style={{ letterSpacing: "-0.02em", maxWidth: "800px", margin: "0 auto" }}>
                Timepieces Worth Wearing.
              </h2>

              <p className="font-dm text-[14px] md:text-[16px] text-white/35 mt-5 max-w-lg mx-auto leading-[1.7]">
                Discover handcrafted luxury watches built on 75+ years of horological excellence.
              </p>

              {/* Gold gradient divider */}
              <div className="mx-auto mt-8 mb-12" style={{ width: 100, height: 2, background: "linear-gradient(90deg, transparent, #D4C5A0, transparent)" }} />
            </div>

            {/* Trust badges inside the green section */}
            <div className="relative z-10 pb-16 md:pb-20">
              <TrustStrip />
            </div>
          </section>

            {menFamilies.length > 0 && (
              <FamilyEditorial
                title="D'Signer Prestige"
                subtitle="Crafted for the Modern Gentleman"
                description="Timepieces engineered with precision and styled for the man who defines his own legacy. From boardroom to beyond."
                families={menFamilies}
                href="/collections/tactix"
                variant="light"
                badge="⌚ SIGNATURE SERIES"
              />
            )}

            <HeritageIntro />

            <div className="green-ambient-divider my-4" />

            {womenFamilies.length > 0 && (
              <FamilyEditorial
                title="D'Signer Grace"
                subtitle="Elegance Redefined"
                description="Where timeless grace meets contemporary design. Each piece tells a story of sophistication and strength."
                families={womenFamilies}
                href="/collections/serene"
                variant="light"
                badge="✨ ELEGANCE COLLECTION"
              />
            )}

          <WhyDesignerWorld />

          {/* <BrandPillars /> */}
          <PartnerLogos />

          {/* PROMPT 1.7: Consolidated OemCta + TrustGrid + FeatureStrip */}
          <JoinTheWorld />

          <FAQSection />

        </main>
    </>
  );
}
