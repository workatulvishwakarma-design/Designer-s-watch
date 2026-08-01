"use client";

import LoadingScreen from "@/components/LoadingScreen";
import SmoothScrolling from "@/components/SmoothScrolling";
import HeroSection from "@/components/sections/home2/HeroSection";
import GenderSelector from "@/components/sections/home2/GenderSelector";
import BrandClubs from "@/components/sections/home2/BrandClubs";
import WatchDetails from "@/components/sections/WatchDetails";
import WatchGridCollage from "@/components/sections/home2/WatchGridCollage";
import FullVideoBanner from "@/components/sections/home2/FullVideoBanner";
import SlideToSwitch from "@/components/sections/home2/SlideToSwitch";
import type { ModelFamilyGroup } from "@/types/product";

interface HomeClient2Props {
  menFamilies: ModelFamilyGroup[];
  womenFamilies: ModelFamilyGroup[];
}

export default function HomeClient2({ menFamilies, womenFamilies }: HomeClient2Props) {
  return (
    <SmoothScrolling>
      <LoadingScreen />
      <main className="min-h-screen bg-[#FAF8F4] overflow-hidden">
        {/* === 1. Full-screen luxury hero banner === */}
        <HeroSection />

        {/* === 2. Gender split categories (Men / Women) === */}
        <GenderSelector />

        {/* === 3. Wrist watch different angle collage grid (Horology on Wrist) === */}
        <WatchGridCollage />

        {/* === 4. Brand Club Portfolios (D'Signer Club & Escort Club) === */}
        <BrandClubs />

        {/* === Anatomy section === */}
        <WatchDetails />

        {/* === 5. Full-width autoplay video banner === */}
        <FullVideoBanner />

        {/* === 6. Slide to Switch interactive color slider === */}
        <SlideToSwitch />
      </main>
    </SmoothScrolling>
  );
}
