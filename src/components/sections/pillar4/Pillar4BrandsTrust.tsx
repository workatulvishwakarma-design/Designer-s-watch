"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Pillar4BrandsTrust() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 lg:py-24 bg-[#FAFAF8] relative overflow-hidden"
    >
      {/* Image Container */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,57,38,0.12)] border border-[#EDE8DF] transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,57,38,0.18)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/new-img/brands-new.jpeg"
            alt="Brands That Trust Nagpal Group"
            className="w-full h-auto object-contain block"
          />
        </motion.div>
      </div>
    </section>
  );
}
