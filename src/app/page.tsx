"use client";

import { useRef, useState } from "react";
import SmoothScrolling from '@/components/SmoothScrolling';
import CustomCursor from '@/components/ui/CustomCursor';
import Header from '@/components/sections/Header';
import HeroBanner from '@/components/sections/HeroBanner';
import LegacySection from '@/components/sections/LegacySection';
import FeatureScroller from '@/components/sections/FeatureScroller';
import HomeBrands from '@/components/sections/HomeBrands';
import StatsCounter from '@/components/sections/StatsCounter';
import OemCta from '@/components/sections/OemCta';
import QualityFeatures from '@/components/sections/QualityFeatures';
import TrustGrid from '@/components/sections/TrustGrid';
import FeatureStrip from '@/components/sections/FeatureStrip';
import CraftSection from '@/components/sections/CraftSection';
import Footer from '@/components/sections/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ─────────── Product Card Types ─────────── */
interface SimpleProduct {
  id: string;
  name: string;
  price: string;
  image: string;
  brand?: string;
  badge?: string;
}

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
      className="absolute top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center rounded-full cursor-pointer"
      style={{
        width: 44,
        height: 44,
        [isLeft ? "left" : "right"]: -16,
        background: hovered ? "#B8935A" : "white",
        border: `1px solid ${hovered ? "#B8935A" : "#EDE8DF"}`,
        boxShadow: hovered
          ? "0 8px 28px rgba(184,147,90,0.35)"
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

/* ─────────── Product Card Component ─────────── */
function InlineProductCard({
  product,
  variant = "light",
}: {
  product: SimpleProduct;
  variant?: "light" | "dark" | "escort";
}) {
  const [hovered, setHovered] = useState(false);

  const cardBg = variant === "dark" ? "#1A1918" : "white";
  const cardBorder =
    variant === "dark" ? "rgba(184,147,90,0.12)" : "#EDE8DF";
  const imageBg = variant === "dark" ? "#222220" : "#F5F2ED";
  const nameColor = variant === "dark" ? "white" : "#1A1918";
  const brandColor = "#B8935A";
  const priceColor = "#B8935A";
  const addBg =
    variant === "dark"
      ? "#B8935A"
      : variant === "escort"
      ? "#003926"
      : "#1A1918";
  const addText = variant === "dark" ? "#111110" : "white";

  /* Badge colour */
  let badgeBg = "#1A1918";
  let badgeText = "white";
  if (product.badge === "NEW") {
    badgeBg = "#003926";
  } else if (product.badge === "LIMITED") {
    badgeBg = "#B8935A";
    badgeText = "#1A1918";
  }

  return (
    <div
      className="flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer relative"
      style={{
        width: 300,
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 24px 60px rgba(0,0,0,0.10)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        borderColor: hovered ? "rgba(184,147,90,0.4)" : cardBorder,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* IMAGE CONTAINER — 4:3 ratio */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4/3", background: imageBg }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{
            transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        />

        {/* Badge */}
        {product.badge && (
          <span
            className="absolute top-3 left-3 rounded-full font-dm px-3 py-1.5 z-10"
            style={{
              fontSize: "9px",
              letterSpacing: "0.1em",
              background: badgeBg,
              color: badgeText,
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Blur overlay on hover */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10"
          style={{
            background: "rgba(250,248,244,0.70)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          <button
            className="rounded-full font-dm"
            style={{
              background: addBg,
              color: addText,
              fontSize: "12px",
              padding: "10px 20px",
              transition: "all 0.3s ease, transform 0.4s ease",
              transform: hovered ? "translateY(0)" : "translateY(16px)",
            }}
          >
            Add to Cart
          </button>
          <button
            className="rounded-full font-dm"
            style={{
              background: "transparent",
              border: "1px solid #E0D8CE",
              color: "#1A1918",
              fontSize: "12px",
              padding: "10px 20px",
              transition: "all 0.3s ease, transform 0.4s ease 0.07s",
              transform: hovered ? "translateY(0)" : "translateY(16px)",
            }}
          >
            View Details
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <p
          className="font-dm uppercase"
          style={{
            fontSize: "9px",
            color: brandColor,
            letterSpacing: "0.2em",
          }}
        >
          {product.brand || "D'SIGNER"}
        </p>
        <p
          className="font-dm font-medium mt-1"
          style={{ fontSize: "14px", color: nameColor }}
        >
          {product.name}
        </p>
        <p
          className="font-cormorant italic mt-2"
          style={{ fontSize: "20px", color: priceColor }}
        >
          {product.price}
        </p>
      </div>
    </div>
  );
}

/* ─────────── Scrollbar Styles ─────────── */
const scrollbarCSS = `
  .carousel-track::-webkit-scrollbar { height: 3px; }
  .carousel-track::-webkit-scrollbar-track {
    background: #EDE8DF; border-radius: 100px;
  }
  .carousel-track::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg,#B8935A,#D4AA72);
    border-radius: 100px;
  }
  .carousel-track { scrollbar-width: thin; scrollbar-color: #B8935A #EDE8DF; }

  .carousel-track-dark::-webkit-scrollbar { height: 3px; }
  .carousel-track-dark::-webkit-scrollbar-track {
    background: rgba(184,147,90,0.15); border-radius: 100px;
  }
  .carousel-track-dark::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg,#B8935A,#D4AA72);
    border-radius: 100px;
  }
  .carousel-track-dark { scrollbar-width: thin; scrollbar-color: #B8935A rgba(184,147,90,0.15); }
`;

/* ─────────── Scroll helper ─────────── */
function scrollTrack(ref: React.RefObject<HTMLDivElement | null>, dir: "left" | "right") {
  const el = ref.current;
  if (!el) return;
  const amount = 316; // card width + gap
  el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
}

/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  const bestRef = useRef<HTMLDivElement>(null);
  const dsignerRef = useRef<HTMLDivElement>(null);
  const escortRef = useRef<HTMLDivElement>(null);

  const designerProducts: SimpleProduct[] = [
    { id: "d1", name: "Classic Chrono", price: "₹2,499", image: "/images/29474d931b23fdfefff0d1ba9a3b6dfc.jpg", brand: "D'SIGNER" },
    { id: "d2", name: "Midnight Onyx", price: "₹3,200", image: "/images/47e37e63651dbce120cea792a46ca0d4.jpg", brand: "D'SIGNER" },
    { id: "d3", name: "Gold Standard", price: "₹4,999", image: "/images/67350e2417b468f72ecfcdaae5511a03.jpg", brand: "D'SIGNER" },
    { id: "d4", name: "Silver Elegance", price: "₹2,999", image: "/images/d2c54c36fcfb42a430df6da5c8cd5e01.jpg", brand: "D'SIGNER" },
    { id: "d5", name: "Rose Gold Limit", price: "₹4,499", image: "/images/d2307c58d34384ccea6aa02743ec9210.jpg", brand: "D'SIGNER" },
    { id: "d6", name: "Platinum Series", price: "₹3,800", image: "/images/f37bee070a190b1975d9e0916f6bc1f4.jpg", brand: "D'SIGNER" },
  ];

  const escortProducts: SimpleProduct[] = [
    { id: "e1", name: "Escort Diver", price: "₹1,800", image: "/images/img1.png", brand: "ESCORT" },
    { id: "e2", name: "Escort Minimal", price: "₹1,200", image: "/images/img2.png", brand: "ESCORT" },
    { id: "e3", name: "Escort Pilot", price: "₹2,200", image: "/images/img3.png", brand: "ESCORT" },
    { id: "e4", name: "Escort Classic", price: "₹999", image: "/images/img01.png", brand: "ESCORT" },
    { id: "e5", name: "Escort Sport", price: "₹1,499", image: "/images/img03.png", brand: "ESCORT" },
  ];

  /* Best sellers = top 3 designer + top 3 escort */
  const bestSellers: SimpleProduct[] = [
    ...designerProducts.slice(0, 3).map((p) => ({ ...p, badge: "BEST SELLER" })),
    ...escortProducts.slice(0, 3).map((p) => ({ ...p, badge: "BEST SELLER" })),
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarCSS }} />
      <CustomCursor />
      <SmoothScrolling>
        <Header />
        <main>
          <HeroBanner />
          <HomeBrands />

          {/* ===== PRODUCTS SECTION ===== */}
          <section className="bg-[#FAF8F4] py-16">
            <div className="text-center mb-12">
              <p
                className="font-dm uppercase mb-3"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  color: "#B8935A",
                }}
              >
                CURATED FOR YOU
              </p>
              <h2 className="font-cormorant text-5xl text-[#1A1918]">
                Timepieces Worth Wearing.
              </h2>
              <div className="w-12 h-0.5 bg-[#B8935A] mx-auto mt-4" />
            </div>

            {/* ── COLLECTION 1: BEST SELLERS ── */}
            <div className="mb-12">
              <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <span className="inline-block bg-[#FFF3E8] text-[#B8935A] border border-[rgba(184,147,90,0.2)] px-4 py-1.5 rounded-full font-dm text-[11px]">
                    🔥 TRENDING NOW
                  </span>
                  <h3 className="font-bebas text-[36px] text-[#1A1918] mt-2">
                    Best Sellers
                  </h3>
                  <div className="w-10 h-0.5 bg-[#B8935A] mt-1" />
                </div>
                <a
                  href="#"
                  className="font-dm text-[12px] text-[#B8935A] tracking-widest hover:underline underline-offset-2 mt-3 md:mt-0"
                >
                  View All →
                </a>
              </div>
              {/* Carousel container — relative for arrows */}
              <div className="relative max-w-7xl mx-auto px-6">
                <CarouselArrow direction="left" onClick={() => scrollTrack(bestRef, "left")} />
                <CarouselArrow direction="right" onClick={() => scrollTrack(bestRef, "right")} />
                <div className="overflow-hidden">
                  <div
                    ref={bestRef}
                    className="carousel-track flex gap-4 overflow-x-auto py-2 px-1"
                    style={{ scrollSnapType: "x mandatory" }}
                  >
                    {bestSellers.map((p) => (
                      <div key={p.id} style={{ scrollSnapAlign: "start" }}>
                        <InlineProductCard product={p} variant="light" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── COLLECTION 2: D'SIGNER (dark) ── */}
            <div className="bg-[#111110] py-12 mb-12">
              <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <span className="inline-block bg-[#003926] text-white border border-[#003926]/30 px-4 py-1.5 rounded-full font-dm text-[11px]">
                    💎 PREMIUM
                  </span>
                  <h3 className="font-bebas text-[36px] text-white mt-2">
                    D&apos;SIGNER
                  </h3>
                  <div className="w-10 h-0.5 bg-[#B8935A] mt-1" />
                </div>
                <a
                  href="#"
                  className="font-dm text-[12px] text-[#B8935A] tracking-widest hover:underline underline-offset-2 mt-3 md:mt-0"
                >
                  View All →
                </a>
              </div>
              <div className="relative max-w-7xl mx-auto px-6">
                <CarouselArrow direction="left" onClick={() => scrollTrack(dsignerRef, "left")} />
                <CarouselArrow direction="right" onClick={() => scrollTrack(dsignerRef, "right")} />
                <div className="overflow-hidden">
                  <div
                    ref={dsignerRef}
                    className="carousel-track-dark flex gap-4 overflow-x-auto py-2 px-1"
                    style={{ scrollSnapType: "x mandatory" }}
                  >
                    {designerProducts.map((p) => (
                      <div key={p.id} style={{ scrollSnapAlign: "start" }}>
                        <InlineProductCard product={p} variant="dark" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── COLLECTION 3: ESCORT ── */}
            <div className="bg-[#F2EDE6] py-12">
              <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <span className="inline-block bg-[#F0F7F4] text-[#003926] border border-[#003926]/20 px-4 py-1.5 rounded-full font-dm text-[11px]">
                    ⌚ EVERYDAY
                  </span>
                  <h3 className="font-bebas text-[36px] text-[#1A1918] mt-2">
                    ESCORT
                  </h3>
                  <div className="w-10 h-0.5 bg-[#B8935A] mt-1" />
                </div>
                <a
                  href="#"
                  className="font-dm text-[12px] text-[#B8935A] tracking-widest hover:underline underline-offset-2 mt-3 md:mt-0"
                >
                  View All →
                </a>
              </div>
              <div className="relative max-w-7xl mx-auto px-6">
                <CarouselArrow direction="left" onClick={() => scrollTrack(escortRef, "left")} />
                <CarouselArrow direction="right" onClick={() => scrollTrack(escortRef, "right")} />
                <div className="overflow-hidden">
                  <div
                    ref={escortRef}
                    className="carousel-track flex gap-4 overflow-x-auto py-2 px-1"
                    style={{ scrollSnapType: "x mandatory" }}
                  >
                    {escortProducts.map((p) => (
                      <div key={p.id} style={{ scrollSnapAlign: "start" }}>
                        <InlineProductCard product={p} variant="escort" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <LegacySection />
          <CraftSection />
          <FeatureScroller />
          <StatsCounter />
          <OemCta />
          {/* SHARED WATERMARK SECTION - QUALITY & TRUST */}
          <div className="relative overflow-hidden bg-[#F5F2ED]">
            {/* Centered Blueprint Watermark */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[90vh] pointer-events-none opacity-[0.13] mix-blend-multiply z-0"
            >
              <Image
                src="/images/aboutImg2.png"
                alt="Architectural Blueprint Watermark"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            <div className="relative z-10 bg-transparent">
              <QualityFeatures />
            </div>
            <div className="relative z-10 bg-transparent">
              <TrustGrid />
            </div>
          </div>
          <FeatureStrip />

        </main>
        <Footer />
      </SmoothScrolling>
    </>
  );
}
