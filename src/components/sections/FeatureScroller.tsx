"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    number: '01',
    eyebrow: 'CRAFTSMANSHIP',
    titleLight: 'Every Detail,',
    titleBold: 'Perfected.',
    body: 'Stainless steel construction machined to micron-level precision. Each case polished by hand to achieve mirror-grade finish.',
    badge: '✦ Stainless Steel 316L',
    bg: '#FAF8F4',
    imageIndex: 0
  },
  {
    number: '02',
    eyebrow: 'WATER RESISTANCE',
    titleLight: 'Built for',
    titleBold: 'Every Moment.',
    body: '5 to 10 ATM water resistance. Whether boardroom or beach, Designer World watches perform without compromise.',
    badge: '✦ 5–10 ATM Certified',
    bg: '#F2EDE6',
    imageIndex: 1
  },
  {
    number: '03',
    eyebrow: 'PRECISION MOVEMENT',
    titleLight: 'Accuracy You',
    titleBold: 'Can Trust.',
    body: 'Japanese Quartz movement delivering consistent timekeeping you can rely on every single day.',
    badge: '✦ Quartz Movement',
    bg: '#FAF8F4',
    imageIndex: 2
  },
  {
    number: '04',
    eyebrow: 'SAPPHIRE GLASS',
    titleLight: 'Clarity at',
    titleBold: 'Every Glance.',
    body: 'Sapphire-coated mineral glass, scratch-resistant and anti-reflective for perfect visibility.',
    badge: '✦ Sapphire Coated Glass',
    bg: '#F2EDE6',
    imageIndex: 3,
    showCTA: true
  }
];

const WATCH_IMAGES = ['/images/img01.png','/images/img02.png','/images/img03.png','/images/img04.png'];

export default function FeatureScroller() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="w-full">
      {/* header */}
      <div className="bg-[#FAF8F4] py-20 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#B8935A] font-dm">
          WHAT MAKES US DIFFERENT
        </p>
        <h2 className="font-cormorant text-[56px] text-[#1A1918] leading-[1.1] mt-4">
          Built to Last.<br />Made to Impress.
        </h2>
        <div className="w-12 h-[0.5px] bg-[#B8935A] mx-auto mt-5" />
        <p className="font-dm text-[16px] text-[#6B6560] mt-4 max-w-xl mx-auto">
          Discover the features that set our timepieces apart and elevate every moment.
        </p>
      </div>

      {FEATURES.map((feat, idx) => {
        const isEven = idx % 2 === 1;
        const watchImg = WATCH_IMAGES[feat.imageIndex] || WATCH_IMAGES[0];
        return (
          <div
            key={idx}
            className="h-screen flex flex-col md:flex-row w-full"
            style={{ background: feat.bg }}
          >
            {/* image side */}
            <div
              className={`w-full md:w-1/2 h-[256px] md:h-screen overflow-hidden relative flex items-center justify-center ${
                isEven ? 'order-2 md:order-1' : ''
              }`}
              style={{ background: isEven ? '#e0e0e0' : '#d0d0d0' }}
            >
              <motion.img
                src={watchImg}
                alt=""
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.4 }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to ${isEven ? 'right' : 'left'}, rgba(0,0,0,0), rgba(0,0,0,0.3))`
                }}
              />
            </div>

            {/* text side */}
            <div className="w-full md:w-1/2 h-screen flex flex-col justify-center p-[80px_72px] relative">
              <span
                className="absolute top-10 left-10 font-bebas text-[140px] text-transparent pointer-events-none"
                style={{ WebkitTextStroke: '1px rgba(184,147,90,0.08)' }}
              >
                {feat.number}
              </span>

              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#B8935A]" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8935A] font-dm">
                  {feat.eyebrow}
                </p>
              </div>

              <h3 className="mt-6 font-cormorant text-[64px] leading-[1.0]">
                <span className="font-normal text-[#1A1918] block">{feat.titleLight}</span>
                <span className="font-semibold text-[#003926] block">{feat.titleBold}</span>
              </h3>

              <div className="w-12 h-[0.5px] bg-[#B8935A] my-7" />

              <p className="font-dm text-[17px] font-light text-[#6B6560] leading-[1.9] max-w-[400px]">
                {feat.body}
              </p>

              <span className="mt-8 inline-flex items-center gap-2 border border-[rgba(184,147,90,0.3)] bg-white/50 backdrop-blur-sm px-5 py-2.5 rounded-full text-[12px] text-[#6B6560] font-dm">
                {feat.badge}
              </span>

              {feat.showCTA && (
                <button className="mt-8 bg-[#1A1918] text-white px-8 py-4 rounded-md font-dm text-[13px] tracking-[0.1em] hover:bg-[#B8935A] transition">
                  Explore Collection →
                </button>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}