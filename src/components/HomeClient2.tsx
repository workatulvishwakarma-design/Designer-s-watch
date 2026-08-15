"use client";

import LoadingScreen from "@/components/LoadingScreen";
import SmoothScrolling from "@/components/SmoothScrolling";
import HeroBanner from "@/components/sections/HeroBanner";
import GenderSelector from "@/components/sections/home2/GenderSelector";
import BrandClubs from "@/components/sections/home2/BrandClubs";
import WatchDetails from "@/components/sections/WatchDetails";
import WatchGridCollage from "@/components/sections/home2/WatchGridCollage";
import SlideToSwitch from "@/components/sections/home2/SlideToSwitch";
import StoreLocator from "@/components/sections/home2/StoreLocator";
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
        {/* === 1. Full-screen luxury video hero banner === */}
        <HeroBanner />

        {/* === 2. Gender split categories (Men / Women) === */}
        <GenderSelector />

        {/* === 3. Wrist watch different angle collage grid (Horology on Wrist) === */}
        <WatchGridCollage />

        {/* === 4. Brand Club Portfolios (D'Signer Club & Escort Club) === */}
        <BrandClubs />

        {/* === 5. Anatomy section === */}
        <WatchDetails videoSrc="/images/new-img/video-transfer.mp4" />

        {/* === 6. Slide to Switch interactive color slider === */}
        <SlideToSwitch />

        {/* === 7. Find Your Nearest Store === */}
        <StoreLocator />
      </main>
    </SmoothScrolling>
  );
}
