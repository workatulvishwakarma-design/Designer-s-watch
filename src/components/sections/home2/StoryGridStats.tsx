"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function StoryGridStats() {
  return (
    <section className="bg-[#FAF8F4] pt-24 pb-0 overflow-hidden relative">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-dm text-[36px] sm:text-[44px] font-bold text-[#1A1918] tracking-[0.1em] uppercase leading-none mb-4"
          >
            Our Story
          </motion.h2>
          
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-dm text-[10px] tracking-[0.25em] text-[#B8935A] font-bold block mb-8 uppercase"
          >
            Crafting timepieces that balance precision, purpose, and individuality.
          </motion.span>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-dm text-[13px] sm:text-[14px] text-[#5C5750] leading-[1.9] max-w-2xl mx-auto"
          >
            Rooted in a legacy of precision, we translate horological vision into a distinct design language—layered with brushed metals, refined dial textures, and thoughtfully curated components. From sketch to final calibration, every detail is carefully considered to create watches that feel elevated, reliable, and uniquely personal, with a sense of effortless harmony.
          </motion.p>
        </div>

        {/* Categories of Work Collage with Left Side Vertical Label */}
        <div className="relative pl-8 sm:pl-12 w-full">
          {/* Vertical Left Label */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-[#003926]/40 font-bold whitespace-nowrap hidden sm:block">
            Categories of Craft
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            {/* Left Column: Large Image (col-span-8) */}
            <div className="md:col-span-8 relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] rounded-sm overflow-hidden shadow-lg bg-neutral-100 group">
              <Image
                src="/images/new-content/home2-story-chrono.png"
                alt="Luxury Chronographs"
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-103"
                sizes="(max-width: 768px) 100vw, 65vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              
              {/* Bottom Label overlay */}
              <div className="absolute bottom-6 left-6 z-20 text-white">
                <span className="font-cormorant italic text-[24px] sm:text-[30px] font-medium leading-none block">
                  Luxury Chronographs
                </span>
              </div>
            </div>

            {/* Right Column: Two Stacked Images (col-span-4) */}
            <div className="md:col-span-4 flex flex-col justify-between gap-4">
              
              {/* Top stack item */}
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-lg bg-neutral-100 group flex-grow">
                <Image
                  src="/images/new-content/home2-story-dress.png"
                  alt="Elegant Dress Series"
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-103"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                
                <div className="absolute bottom-5 left-5 z-20 text-white">
                  <span className="font-cormorant italic text-[20px] sm:text-[24px] font-medium leading-none block">
                    Elegant Dress Series
                  </span>
                </div>
              </div>

              {/* Bottom stack item */}
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-lg bg-neutral-100 group flex-grow">
                <Image
                  src="/images/new-content/home2-showcase.png"
                  alt="Performance Sports Diver"
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-103"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                
                <div className="absolute bottom-5 left-5 z-20 text-white">
                  <span className="font-cormorant italic text-[20px] sm:text-[24px] font-medium leading-none block">
                    Performance Sports Diver
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Stats Counter Row */}
      <div className="bg-[#F5F1EB] py-14 md:py-16 border-t border-b border-[#E0D8CE] mt-20 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 items-center text-center lg:text-left">
            {[
              { value: "4+", label: "Generations of Expertise" },
              { value: "20+", label: "International Brands" },
              { value: "500+", label: "Private Labels Manufactured" },
              { value: "100+", label: "Multi-Brand Outlets" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                className="flex flex-col lg:flex-row items-center lg:items-start gap-4"
              >
                <span className="font-cormorant text-[48px] md:text-[56px] text-[#003926] font-semibold leading-none shrink-0">
                  {stat.value}
                </span>
                <div className="w-[1px] h-10 bg-[#E0D8CE] hidden lg:block self-center shrink-0" />
                <span className="font-dm text-[9px] text-[#9C9690] uppercase tracking-[0.2em] leading-normal mt-1 max-w-[150px] text-center lg:text-left">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
