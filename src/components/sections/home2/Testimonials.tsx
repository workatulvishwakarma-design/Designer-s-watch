"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Vikram Malhotra",
    title: "Senior Watch Collector, Mumbai",
    review: "The craftsmanship on the Chrono-Heritage variant is outstanding. The beveling on the lugs and the sweep of the second hand rival my Swiss dress pieces. Exceptional value and structural solidity.",
    rating: 5,
  },
  {
    name: "Ananya Sen",
    title: "Design Director, Kolkata",
    review: "As a designer, I am extremely particular about dial symmetry and color matching. The emerald guilloché face is flawless. It captures light in a very sophisticated, subtle manner.",
    rating: 5,
  },
  {
    name: "Kabir Mehta",
    title: "Founder, Horology Group",
    review: "The skeleton automatic movement runs within COSC tolerances. The level of gear finish visible through the front sapphire crystal is a testament to their four generations of manufacturing skill.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  const next = () => setIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));

  return (
    <section className="relative overflow-hidden" style={{ background: "#FAF8F4" }}>
      {/* Decorative ambient circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #003926, transparent 70%)" }}
      />

      <div className="max-w-[900px] mx-auto px-6 py-24 md:py-28 text-center relative z-10">
        {/* Large decorative quotation mark */}
        <div className="font-cormorant text-[120px] sm:text-[160px] leading-none text-[#003926]/[0.06] select-none mb-[-40px] sm:mb-[-60px]">
          "
        </div>

        <span className="font-dm text-[10px] tracking-[0.3em] text-[#003926] font-bold block mb-3 uppercase">
          COLLECTOR REVIEWS
        </span>
        <h2 className="font-cormorant text-[32px] sm:text-[44px] text-[#1A1918] font-light mb-10">
          Verified Testimonials
        </h2>

        {/* Carousel */}
        <div className="relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-6">
                {Array.from({ length: REVIEWS[index].rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#B8935A" stroke="none" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-cormorant italic text-[20px] sm:text-[26px] text-[#1A1918] leading-[1.6] max-w-2xl mx-auto">
                &ldquo;{REVIEWS[index].review}&rdquo;
              </p>

              {/* Divider */}
              <div className="w-10 h-[1px] bg-[#B8935A] mt-8 mb-6 mx-auto" />

              {/* Author */}
              <h4 className="font-dm font-bold text-[12px] tracking-[0.15em] text-[#003926] uppercase">
                {REVIEWS[index].name}
              </h4>
              <p className="font-dm text-[11px] text-[#9C9690] mt-1">
                {REVIEWS[index].title}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav */}
        <div className="flex justify-center items-center gap-5 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-[#E0D8CE] bg-white text-[#1A1918] flex items-center justify-center cursor-pointer hover:bg-[#003926] hover:text-white hover:border-[#003926] transition-all duration-300"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-dm text-[11px] text-[#9C9690] tabular-nums min-w-[30px]">
            {index + 1} / {REVIEWS.length}
          </span>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-[#E0D8CE] bg-white text-[#1A1918] flex items-center justify-center cursor-pointer hover:bg-[#003926] hover:text-white hover:border-[#003926] transition-all duration-300"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
