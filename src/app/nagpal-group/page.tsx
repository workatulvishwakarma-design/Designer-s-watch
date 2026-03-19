"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import SmoothScrolling from "@/components/SmoothScrolling";
import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/sections/Header";
import NagpalBanner from "@/components/sections/nagpal/NagpalBanner";
import NagpalStats from "@/components/sections/nagpal/NagpalStats";
import NagpalStrengths from "@/components/sections/nagpal/NagpalStrengths";
import NagpalValueChain from "@/components/sections/nagpal/NagpalValueChain";
import NagpalBrandStrip from "@/components/sections/nagpal/NagpalBrandStrip";
import NagpalDivisions from "@/components/sections/nagpal/NagpalDivisions";
import NagpalPartner from "@/components/sections/nagpal/NagpalPartner";
import NagpalTimeline from "@/components/sections/nagpal/NagpalTimeline";

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
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <CustomCursor />
      <SmoothScrolling>
        {/* Hardware-accelerated scroll progress indicator */}
        <motion.div
          className="fixed left-0 top-0 bottom-0 w-[3px] z-50 pointer-events-none origin-top"
          style={{
            scaleY,
            backgroundColor: "#B8935A",
          }}
        />

        <Header />
        <main>
          <NagpalBanner />
          <SectionDivider />
          <NagpalTimeline />
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
      </SmoothScrolling>
    </>
  );
}
