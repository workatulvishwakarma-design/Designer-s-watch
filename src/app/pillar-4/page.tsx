"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import SmoothScrolling from "@/components/SmoothScrolling";
import CustomCursor from "@/components/ui/CustomCursor";
import Pillar4Divisions from "@/components/sections/pillar4/Pillar4Divisions";
import Pillar4Partner from "@/components/sections/pillar4/Pillar4Partner";
import Pillar4BrandsTrust from "@/components/sections/pillar4/Pillar4BrandsTrust";
import Pillar4FAQ from "@/components/sections/pillar4/Pillar4FAQ";

export default function Pillar4Page() {
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

        <main>
          {/* 1. Business Divisions (01 - 07 with Modals) */}
          <Pillar4Divisions />

          {/* 2. Business Partnerships / Collaborate with a Legacy Brand */}
          <Pillar4Partner />

          {/* 3. Brands That Trust Nagpal Group (Positioned Above FAQ) */}
          <Pillar4BrandsTrust />

          {/* 4. FAQ / Support Section */}
          <Pillar4FAQ />
        </main>
      </SmoothScrolling>
    </>
  );
}
