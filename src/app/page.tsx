"use client";

import SmoothScrolling from '@/components/SmoothScrolling';
import CustomCursor from '@/components/ui/CustomCursor';
import Header from '@/components/sections/Header';
import HeroBanner from '@/components/sections/HeroBanner';
import LegacySection from '@/components/sections/LegacySection';
import HomeProducts from '@/components/sections/HomeProducts';
import FeatureScroller from '@/components/sections/FeatureScroller';
import HomeBrands from '@/components/sections/HomeBrands';
import StatsCounter from '@/components/sections/StatsCounter';
import OemCta from '@/components/sections/OemCta';
import ProductSection from '@/components/sections/ProductSection';
import CollectionCarousel from '@/components/sections/CollectionCarousel';
import QualityFeatures from '@/components/sections/QualityFeatures';
import TrustGrid from '@/components/sections/TrustGrid';
import FeatureStrip from '@/components/sections/FeatureStrip';
import CraftSection from '@/components/sections/CraftSection';
import Footer from '@/components/sections/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const designerProducts = [
    { id: "d1", name: "Classic Chrono", price: "₹2,499", image: "/images/29474d931b23fdfefff0d1ba9a3b6dfc.jpg" },
    { id: "d2", name: "Midnight Onyx", price: "₹3,200", image: "/images/47e37e63651dbce120cea792a46ca0d4.jpg" },
    { id: "d3", name: "Gold Standard", price: "₹4,999", image: "/images/67350e2417b468f72ecfcdaae5511a03.jpg" },
    { id: "d4", name: "Silver Elegance", price: "₹2,999", image: "/images/d2c54c36fcfb42a430df6da5c8cd5e01.jpg" },
    { id: "d5", name: "Rose Gold Limit", price: "₹4,499", image: "/images/d2307c58d34384ccea6aa02743ec9210.jpg" },
    { id: "d6", name: "Platinum Series", price: "3,800", image: "/images/f37bee070a190b1975d9e0916f6bc1f4.jpg" },
  ];

  const escortProducts = [
    { id: "e1", name: "Escort Diver", price: "₹1,800", image: "/images/img1.png" },
    { id: "e2", name: "Escort Minimal", price: "₹1,200", image: "/images/img2.png" },
    { id: "e3", name: "Escort Pilot", price: "₹2,200", image: "/images/img3.png" },
    { id: "e4", name: "Escort Classic", price: "₹999", image: "/images/img01.png" },
    { id: "e5", name: "Escort Sport", price: "₹1,499", image: "/images/img03.png" },
  ];

  return (
    <>
      <CustomCursor />
      <SmoothScrolling>
        <Header />
        <main>
          <HeroBanner />
          <HomeProducts />
          <LegacySection />
          <CraftSection />
          <FeatureScroller />
          <HomeBrands />
          <StatsCounter />
          <OemCta />
          <ProductSection />
          <div id="collections">
            <CollectionCarousel
              title="D'SIGNER COLLECTION"
              products={designerProducts}
              brand="D'SIGNER"
              backgroundColor="#FAF8F4"
            />
            <CollectionCarousel
              title="ESCORT COLLECTION"
              products={escortProducts}
              brand="ESCORT"
              backgroundColor="#F2EDE6"
            />
          </div>
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
