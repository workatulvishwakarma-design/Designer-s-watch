"use client";

import { useRef, useState, useMemo } from "react";
import dynamic from 'next/dynamic';

// Above the fold
import HeroBanner from '@/components/sections/HeroBanner';
import HomeBrands from '@/components/sections/HomeBrands';
import CraftSection from '@/components/sections/CraftSection';

// Below the fold - Lazy Loaded
const StatsCounter = dynamic(() => import('@/components/sections/StatsCounter'), { ssr: true });
const OemCta = dynamic(() => import('@/components/sections/OemCta'), { ssr: true });
const TrustGrid = dynamic(() => import('@/components/sections/TrustGrid'), { ssr: true });
const FeatureStrip = dynamic(() => import('@/components/sections/FeatureStrip'), { ssr: true });
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), { ssr: true });
const BrandPillars = dynamic(() => import('@/components/sections/BrandPillars'), { ssr: true });
const WatchDetails = dynamic(() => import('@/components/sections/WatchDetails'), { ssr: true });
const InstagramReels = dynamic(() => import('@/components/sections/InstagramReels'), { ssr: true });
const CollectionStorySection = dynamic(() => import('@/components/sections/CollectionStorySection'), { ssr: true });
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
  const cardBg = isDark ? "#1A1918" : "white";
  const cardBorder = isDark ? "rgba(0,57,38,0.12)" : "#EDE8DF";
  const imageBg = isDark ? "#222220" : "#F5F2ED";
  const nameColor = isDark ? "white" : "#1A1918";
  const brandColor = isDark ? "#B8935A" : "#003926";
  const priceColor = "#003926";

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
        style={{ aspectRatio: "4/5", background: isDark ? "radial-gradient(ellipse at center, #2A2927, #222220)" : "radial-gradient(ellipse at center, #F0EDE8, #F5F2ED)" }}
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
          style={{ fontSize: "9px", letterSpacing: "0.1em", background: "#1A1918", color: "white" }}
        >
          {family.variantCount} {family.variantCount === 1 ? "Style" : "Styles"}
        </span>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10"
          style={{
            background: isDark ? "rgba(26,25,24,0.75)" : "rgba(250,248,244,0.70)",
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
              border: `1px solid ${isDark ? "rgba(255,255,255,0.2)" : "#E0D8CE"}`,
              color: isDark ? "white" : "#1A1918",
              fontSize: "12px",
              padding: "10px 20px",
              transition: "all 0.3s ease, transform 0.4s ease",
              transform: hovered ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <Eye size={14} />
            Explore Series
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col">
        <p className="font-dm uppercase" style={{ fontSize: "9px", color: brandColor, letterSpacing: "0.2em" }}>
          {family.brand}
        </p>
        <p className="font-dm font-medium mt-1" style={{ fontSize: "14px", color: nameColor }}>
          {family.name}
        </p>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="font-cormorant italic" style={{ fontSize: "20px", color: priceColor }}>
            {formattedPrice}
          </p>
          {family.variantCount > 1 && (
            <p className="font-dm" style={{ fontSize: "11px", color: isDark ? "rgba(255,255,255,0.4)" : "#9C9690" }}>
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
    { icon: <Truck size={18} />, text: "Free Shipping Above ₹5,000" },
    { icon: <Shield size={18} />, text: "100% Genuine Products" },
    { icon: <Package size={18} />, text: "Easy 7-Day Returns" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 mt-8 mb-4">
      <div className="flex flex-wrap justify-center gap-6 md:gap-12">
        {items.map((item) => (
          <div key={item.text} className="flex items-center gap-2 text-[#9C9690]">
            <span className="text-[#003926]">{item.icon}</span>
            <span className="font-dm text-[11px] tracking-wider uppercase">{item.text}</span>
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

  return (
    <div
      ref={sectionRef}
      className={isDark ? "bg-[#111110] py-16 relative overflow-hidden" : "py-16 relative overflow-hidden"}
      style={{ background: isDark ? "#111110" : undefined }}
    >
      {isDark && (
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] pointer-events-none opacity-10 blur-[120px] -translate-y-1/2"
          style={{ background: "radial-gradient(circle, rgba(0,57,38,0.6), transparent)" }}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full font-dm text-[11px] mb-3"
            style={{
              background: isDark ? "rgba(0,57,38,0.2)" : "#F0F7F4",
              color: isDark ? "#B8935A" : "#003926",
              border: `1px solid ${isDark ? "rgba(0,57,38,0.2)" : "rgba(0,57,38,0.15)"}`,
            }}
          >
            {badge}
          </span>
          <h3
            className="font-cormorant text-[36px] sm:text-[42px] leading-[1.1] mt-1"
            style={{ color: isDark ? "white" : "#1A1918" }}
          >
            {title}
            <span className="text-[#003926]">.</span>
          </h3>
          <p className="font-cormorant italic text-[16px] mt-1" style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#9C9690" }}>
            {subtitle}
          </p>
          <div className="w-10 h-0.5 mt-3" style={{ background: "linear-gradient(90deg, #003926, #B8935A)" }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mt-3 md:mt-0">
            <span className="font-dm text-[11px] tracking-[0.1em] uppercase" style={{ color: isDark ? "rgba(255,255,255,0.3)" : "#9C9690" }}>
              {families.length} {families.length === 1 ? "Model" : "Models"}
            </span>
            <Link
              href={href}
              className="font-dm text-[12px] tracking-widest hover:underline underline-offset-2 transition-colors duration-300"
              style={{ color: "#B8935A" }}
            >
              View All →
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto px-6 mb-8 font-dm text-[14px] max-w-lg leading-relaxed"
        style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#9C9690" }}
      >
        {description}
      </motion.p>

      <div className="relative max-w-7xl mx-auto px-6">
        <CarouselArrow direction="left" onClick={() => scrollTrack(trackRef, "left")} />
        <CarouselArrow direction="right" onClick={() => scrollTrack(trackRef, "right")} />
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className={`${isDark ? "carousel-track-dark" : "carousel-track"} flex gap-4 overflow-x-auto py-2 px-1`}
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

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-7xl mx-auto px-6 mt-10 flex justify-center"
      >
        <Link
          href={href}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-dm text-[12px] tracking-[0.15em] uppercase transition-all duration-500 hover:-translate-y-1"
          style={{
            background: isDark ? "transparent" : "#1A1918",
            color: isDark ? "#B8935A" : "white",
            border: isDark ? "1px solid rgba(184,147,90,0.3)" : "1px solid #1A1918",
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
      <main>
        <HeroBanner />

        <div className="green-ambient-divider" />

          <HomeBrands />
          <WatchDetails />
          <CraftSection />

          <CollectionStorySection />

          <section className="bg-[#FAF8F4] py-16">
            <div className="text-center mb-12">
              <p className="font-dm uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#003926" }}>
                CURATED FOR YOU
              </p>
              <h2 className="font-cormorant text-5xl text-[#1A1918]">
                Timepieces Worth Wearing.
              </h2>
              <div className="w-12 h-0.5 mx-auto mt-4" style={{ background: "linear-gradient(90deg, #003926, #B8935A)" }} />
            </div>

            <TrustStrip />

            {menFamilies.length > 0 && (
              <FamilyEditorial
                title="Men's Collection"
                subtitle="Crafted for the Modern Gentleman"
                description="Timepieces engineered with precision and styled for the man who defines his own legacy. From boardroom to beyond."
                families={menFamilies}
                href="/collections/tactix"
                variant="dark"
                badge="⌚ FOR HIM"
              />
            )}

            <div className="green-ambient-divider my-4" />

            {womenFamilies.length > 0 && (
              <FamilyEditorial
                title="Women's Collection"
                subtitle="Elegance Redefined"
                description="Where timeless grace meets contemporary design. Each piece tells a story of sophistication and strength."
                families={womenFamilies}
                href="/collections/serene"
                variant="light"
                badge="✨ FOR HER"
              />
            )}
          </section>

          <InstagramReels />

          <div className="green-ambient-divider" />

          <BrandPillars />
          <StatsCounter />
          <OemCta />
          <TrustGrid />
          <FeatureStrip />
          <FAQSection />

        </main>
    </>
  );
}
