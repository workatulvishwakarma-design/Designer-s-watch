"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Compass, ShieldCheck, Globe } from "lucide-react";

export default function WhyDesignerWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  const usps = [
    {
      icon: <Award className="w-6 h-6 text-[#B8935A]" />,
      title: "75+ Years Legacy",
      description: "Established in 1948 by Virbhan Nagpal, pioneering four generations of horological mastery."
    },
    {
      icon: <Compass className="w-6 h-6 text-[#B8935A]" />,
      title: "Precision Engineering",
      description: "Highly reliable movements housed in surgical-grade 316L stainless steel casings."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#B8935A]" />,
      title: "Tuscan Craftsmanship",
      description: "Exquisite straps sourced from historic tanneries in Tuscany, Italy, and hand-stitched."
    },
    {
      icon: <Globe className="w-6 h-6 text-[#B8935A]" />,
      title: "Global Scale",
      description: "Trusted partner producing over 500+ private labels and premium B2B watch solutions."
    }
  ];

  return (
    <section ref={containerRef} className="bg-[#00140D] text-white py-16 lg:py-24 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(184,147,90,0.05)_0%,transparent_70%)] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,57,38,0.15)_0%,transparent_70%)] pointer-events-none rounded-full" />

      <div className="max-w-[1400px] w-full mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p
            className="font-dm uppercase text-[10px] tracking-[0.3em] text-[#B8935A]"
          >
            OUR DISTINCTION
          </p>
          <h2
            className="font-cormorant text-3xl sm:text-4xl lg:text-5xl mt-3 tracking-[0.1em] uppercase"
          >
            Why Designer World
          </h2>
          <div className="w-12 h-[1px] bg-[#B8935A] mx-auto mt-4 lg:mt-6" />
        </div>

        {/* 4 USP Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {usps.map((usp, index) => (
            <motion.div
              key={usp.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="bg-[#001F15]/50 border border-white/5 hover:border-[#B8935A]/30 p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] group relative"
            >
              {/* Corner decorative lines */}
              <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/10 group-hover:border-[#B8935A]/40 transition-colors duration-300" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/10 group-hover:border-[#B8935A]/40 transition-colors duration-300" />

              {/* Icon Container */}
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#B8935A]/10 transition-all duration-300">
                {usp.icon}
              </div>

              {/* Title */}
              <h3 className="font-dm text-sm uppercase tracking-[0.15em] text-white/90 mb-3 group-hover:text-white transition-colors duration-300">
                {usp.title}
              </h3>

              {/* Description */}
              <p className="font-cormorant text-[16px] leading-relaxed text-white/60 group-hover:text-white/80 transition-colors duration-300">
                {usp.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
