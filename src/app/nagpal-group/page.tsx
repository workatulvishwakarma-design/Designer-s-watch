"use client";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import NagpalHero from "@/components/sections/nagpal/NagpalHero";
import NagpalStats from "@/components/sections/nagpal/NagpalStats";
import NagpalStrengths from "@/components/sections/nagpal/NagpalStrengths";
import NagpalValueChain from "@/components/sections/nagpal/NagpalValueChain";
import NagpalBrandStrip from "@/components/sections/nagpal/NagpalBrandStrip";
import NagpalDivisions from "@/components/sections/nagpal/NagpalDivisions";
import NagpalPartner from "@/components/sections/nagpal/NagpalPartner";
import { useEffect, useState } from "react";

function SectionDivider() {
  return (
    <div className="flex items-center gap-4 py-2 max-w-7xl mx-auto px-6 lg:px-12">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#B8935A]/25 to-transparent" />
      <span className="text-[#B8935A] text-xs shrink-0">✦</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#B8935A]/25 to-transparent" />
    </div>
  );
}

export default function NagpalGroupPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(height > 0 ? (winScroll / height) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress indicator */}
      <div
        className="fixed left-0 top-0 w-[3px] z-50 pointer-events-none transition-all duration-150"
        style={{
          height: `${scrollProgress}%`,
          backgroundColor: "#B8935A",
        }}
      />

      <Header />
      <main>
        <NagpalHero />
        <SectionDivider />
        <NagpalStats />
        <SectionDivider />
        <NagpalStrengths />
        <SectionDivider />
        <NagpalValueChain />
        <SectionDivider />
        <NagpalBrandStrip />
        <NagpalDivisions />
        <SectionDivider />
        <NagpalPartner />
      </main>
      <Footer />
    </>
  );
}
