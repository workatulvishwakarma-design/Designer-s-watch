"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, Droplets, Gem } from "lucide-react";

const features = [
  {
    id: "f1",
    title: "Water Resistance",
    description: "5 ATM – Built for everyday elegance",
    align: "left",
    icon: Droplets
  },
  {
    id: "f2",
    title: "Premium Movement",
    description: "Reliable power and precision performance",
    align: "left",
    icon: Sparkles
  },
  {
    id: "f3",
    title: "Sapphire Glass",
    description: "Scratch-resistant clarity with refined finish",
    align: "right",
    icon: Gem
  },
  {
    id: "f4",
    title: "Premium Craftsmanship",
    description: "Designed for comfort, luxury, and durability",
    align: "right",
    icon: Shield
  }
];

export default function CraftSection() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  // Reusable feature block components to ensure consistent aesthetic
  const FeaturePointer = ({ feature, index }: { feature: typeof features[0], index: number }) => {
    const isLeft = feature.align === "left";
    const Icon = feature.icon;
    const isHovered = hoveredFeature === feature.id;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.3 + (index * 0.1), ease: "easeOut" }}
        onMouseEnter={() => setHoveredFeature(feature.id)}
        onMouseLeave={() => setHoveredFeature(null)}
        className={`flex flex-col ${isLeft ? "lg:items-end lg:text-right" : "lg:items-start lg:text-left"} items-center text-center group cursor-default`}
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          {/* Option: small icon and title layout */}
          {isLeft && (
            <h4 className="font-dm uppercase text-[12px] sm:text-[13px] tracking-[0.2em] text-[#1A1918] font-medium transition-colors duration-300 group-hover:text-[#B8935A] hidden lg:block">
              {feature.title}
            </h4>
          )}
          
          <div className="w-8 h-8 rounded-full border border-[#EDE8DF] flex items-center justify-center bg-white transition-all duration-300 group-hover:border-[#B8935A] group-hover:shadow-[0_4px_12px_rgba(184,147,90,0.15)] relative">
            <Icon size={14} className="text-[#B8935A]" strokeWidth={1.5} />
            {/* Subtle ping animation on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.5 }}
                  exit={{ opacity: 0, scale: 1.8 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 rounded-full border border-[#B8935A] pointer-events-none"
                />
              )}
            </AnimatePresence>
          </div>

          {(isLeft === false || true) && (
            <h4 className={`font-dm uppercase text-[12px] sm:text-[13px] tracking-[0.2em] text-[#1A1918] font-medium transition-colors duration-300 group-hover:text-[#B8935A] ${isLeft ? "lg:hidden" : ""}`}>
              {feature.title}
            </h4>
          )}
        </div>
        
        <div className={`w-10 h-[1px] bg-[#B8935A]/40 mb-3 mx-auto ${isLeft ? "lg:ml-auto lg:mr-0" : "lg:mr-auto lg:ml-0"} transition-all duration-300 group-hover:w-16 group-hover:bg-[#B8935A]`} />
        
        <p className="font-cormorant text-[16px] xl:text-[18px] leading-[1.6] text-[#6B6560] max-w-[240px] transition-colors duration-300 group-hover:text-[#1A1918]">
          {feature.description}
        </p>
      </motion.div>
    );
  };

  return (
    <section className="bg-[#FAF8F4] relative py-20 lg:py-32 overflow-hidden flex flex-col items-center justify-center">
      
      {/* --- Subtle Background Elements --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        {/* Soft radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[1000px] lg:h-[1000px] bg-[radial-gradient(circle,rgba(184,147,90,0.03)_0%,transparent_70%)] rounded-full" />
        {/* Very thin, large decorative circle */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] border border-[#E8E1D3] rounded-full opacity-60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
        />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* --- Top Header Area --- */}
        <div className="text-center mb-16 lg:mb-20 space-y-4 max-w-3xl flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <p className="font-dm uppercase text-[10px] sm:text-[11px] tracking-[0.3em] text-[#B8935A] mb-3 md:mb-4">
              CRAFTED FOR TIMELESS STYLE
            </p>
            <h2 className="font-cormorant text-[#1A1918] text-[clamp(32px,5vw,56px)] leading-[1.1] mb-5 lg:mb-6">
              Luxury That Never Goes Out of Style
            </h2>
            <div className="w-16 h-[1px] bg-[#B8935A]/50 mb-6" />
            <p className="font-dm font-light text-[14px] md:text-[16px] text-[#6B6560] leading-[1.8] max-w-xl mx-auto">
              Precision-engineered from surgical stainless steel and protected by scratch-resistant sapphire glass. Every detail meticulously considered for enduring elegance.
            </p>
          </motion.div>
        </div>

        {/* --- Center Composition: Image + Features --- */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-8 xl:gap-0 mt-4 md:mt-8">
          
          {/* Left Features (Desktop) / Top Features (Mobile) */}
          <div className="w-full lg:w-1/4 flex flex-col gap-12 lg:gap-24 order-2 lg:order-1 items-center lg:items-end">
            <FeaturePointer feature={features[0]} index={0} />
            <FeaturePointer feature={features[1]} index={1} />
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-2/4 flex justify-center items-center relative order-1 lg:order-2 z-20 py-8 lg:py-0"
          >
            <motion.div 
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="relative w-[280px] sm:w-[360px] md:w-[480px] lg:w-[600px] aspect-[4/5] drop-shadow-2xl"
            >
              <Image
                src="/images/doublewatch-nobg.png"
                alt="Luxury Timepiece Collection"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Right Features (Desktop) / Bottom Features (Mobile) */}
          <div className="w-full lg:w-1/4 flex flex-col gap-12 lg:gap-24 order-3 items-center lg:items-start">
            <FeaturePointer feature={features[2]} index={2} />
            <FeaturePointer feature={features[3]} index={3} />
          </div>

        </div>

        {/* --- Bottom CTA Area --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-20 lg:mt-28 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full order-4 z-20"
        >
          <a href="#collection" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#1A1918] px-8 py-3.5 sm:px-10 sm:py-4 font-dm text-[12px] sm:text-[13px] font-medium tracking-widest text-white transition-all hover:bg-[#B8935A] hover:shadow-[0_8px_30px_rgba(184,147,90,0.3)] w-full sm:w-auto text-center">
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">EXPLORE COLLECTION</span>
            <span className="relative z-10 ml-2 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
          </a>
          
          <a href="#details" className="group inline-flex items-center justify-center rounded-full border border-[#DCD3C6] bg-transparent px-8 py-3.5 sm:px-10 sm:py-4 font-dm text-[12px] sm:text-[13px] font-medium tracking-widest text-[#1A1918] transition-all hover:border-[#B8935A] hover:text-[#B8935A] w-full sm:w-auto text-center">
            VIEW DETAILS
          </a>
        </motion.div>

      </div>
    </section>
  );
}
