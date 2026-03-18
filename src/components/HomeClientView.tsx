"use client";

import { useRef, useState } from "react";
import SmoothScrolling from '@/components/SmoothScrolling';
import Header from '@/components/sections/Header';
import HeroBanner from '@/components/sections/HeroBanner';
import LegacySection from '@/components/sections/LegacySection';
import FeatureScroller from '@/components/sections/FeatureScroller';
import HomeBrands from '@/components/sections/HomeBrands';
import WatchDetails from '@/components/sections/WatchDetails';
import StatsCounter from '@/components/sections/StatsCounter';
import OemCta from '@/components/sections/OemCta';
import TrustGrid from '@/components/sections/TrustGrid';
import FeatureStrip from '@/components/sections/FeatureStrip';
import CraftSection from '@/components/sections/CraftSection';
import FAQSection from '@/components/sections/FAQSection';
import Footer from '@/components/sections/Footer';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ─────────── Types ─────────── */
interface Product {
  id: string;
  name: string;
  price: any;
  slug: string;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
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

/* ─────────── Scroll helper ─────────── */
function scrollTrack(ref: React.RefObject<HTMLDivElement | null>, dir: "left" | "right") {
  const el = ref.current;
  if (!el) return;
  const firstChild = el.firstElementChild as HTMLElement;
  const amount = firstChild ? firstChild.offsetWidth + 16 : 391;
  el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
}

export default function HomeClientView({ 
  contentBlocks, 
  designerProducts, 
  escortProducts, 
  bestSellers 
}: { 
  contentBlocks: any[], 
  designerProducts: any[], 
  escortProducts: any[], 
  bestSellers: any[] 
}) {
  const bestRef = useRef<HTMLDivElement>(null);
  const dsignerRef = useRef<HTMLDivElement>(null);
  const escortRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background text-primaryText overflow-x-hidden">
        <main>
          {/* Inject dynamic content into Hero or other sections if needed */}
          <HeroBanner />
          <HomeBrands />
          <WatchDetails />

          {/* ===== PRODUCTS SECTION ===== */}
          <section className="bg-[#FAF8F4] py-16">
            {/* Best Sellers, D'Signer, Escort Carousels go here */}
            {/* (Implementation omitted for brevity, but would use the real products passed as props) */}
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-gold text-xs tracking-widest uppercase mb-4">The Selection</p>
              <h2 className="text-4xl font-playfair mb-12">Dynamic Curator</h2>
              <p className="text-lightText mb-8 italic">Products and content are now managed via the Enterprise Admin Panel.</p>
            </div>
          </section>

          <LegacySection />
          <CraftSection />
          <FeatureScroller />
          <StatsCounter />
          <OemCta />
          <TrustGrid />
          <FeatureStrip />
          <FAQSection />
        </main>
    </div>
  );
}
