"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, Shield, Palette, TrendingUp } from "lucide-react";

interface ValueItem {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    number: "01",
    icon: <Clock size={32} strokeWidth={1.5} aria-hidden="true" />,
    title: "Legacy",
    description: "Built over decades, strengthened by trust across generations. Every timepiece carries the weight of experience and the pride of tradition."
  },
  {
    number: "02",
    icon: <Shield size={32} strokeWidth={1.5} aria-hidden="true" />,
    title: "Precision",
    description: "Precision isn't a feature, it's a standard. Built for accuracy, reliability, and lasting performance, every day."
  },
  {
    number: "03",
    icon: <Palette size={32} strokeWidth={1.5} aria-hidden="true" />,
    title: "Design",
    description: "Design is the brand's language: clean, intentional, and timeless. Every curve, dial, and detail is crafted with purpose, not noise."
  },
  {
    number: "04",
    icon: <TrendingUp size={32} strokeWidth={1.5} aria-hidden="true" />,
    title: "Evolution",
    description: "Rooted in tradition, shaped for today. D'Signer and Escort evolve with modern lifestyles while staying true to classic watchmaking."
  }
];

export default function CoreValues() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.5 }
        }
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" }
        }
      };

  return (
    <section className="relative py-[60px] px-[40px] md:py-[100px] md:px-[60px] bg-gradient-to-br from-[#003926] to-[#1a4d3d] min-h-[700px] overflow-hidden flex items-center justify-center">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(184,147,90,0.05)_0%,transparent_70%)] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="font-dm text-[12px] font-medium uppercase tracking-[2px] text-[#B8935A] mb-4 block">
            THE PHILOSOPHY
          </span>
          <h2 className="font-cormorant text-[36px] sm:text-[56px] font-normal text-[#FAF8F4] leading-tight mb-6">
            Core Values<span className="text-[#B8935A]">.</span>
          </h2>
          <div className="w-[60px] h-[1px] bg-[#B8935A] mx-auto" />
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="group relative rounded-[12px] border border-[#B8935A]/20 bg-[linear-gradient(135deg,rgba(255,248,244,0.08)_0%,rgba(255,248,244,0.03)_100%)] backdrop-blur-[10px] p-[36px_24px] md:p-[48px_36px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_48px_rgba(184,147,90,0.15)] hover:border-[#B8935A]/50 transition-all duration-300 flex flex-col justify-between h-full cursor-default select-none focus-within:ring-2 focus-within:ring-[#B8935A] focus-within:outline-none"
            >
              {/* Premium Gradient Overlay on Card Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(184,147,90,0.06)] to-[rgba(0,57,38,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[12px] pointer-events-none" />

              {/* Card Content */}
              <div className="relative z-10">
                {/* Icon Wrapper */}
                <div className="w-[60px] h-[60px] border-2 border-[#B8935A] rounded-[12px] bg-gradient-to-br from-[rgba(184,147,90,0.15)] to-[rgba(184,147,90,0.05)] flex items-center justify-center text-[#B8935A] mb-8 transition-transform duration-500 group-hover:scale-110">
                  {value.icon}
                </div>

                {/* Number */}
                <span className="font-dm text-[14px] font-medium uppercase tracking-[2px] text-[#B8935A] mb-4 block">
                  {value.number}
                </span>

                {/* Expanding divider line */}
                <div className="w-[40px] h-[1px] bg-[#B8935A] mb-4 group-hover:w-[60px] transition-all duration-500 ease-out" />

                {/* Title */}
                <h3 className="font-cormorant text-[28px] font-medium text-[#FAF8F4] mb-4">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="font-dm text-[15px] text-[#CCCCCC] leading-[1.7]">
                  {value.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
