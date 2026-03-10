"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FEATURES = [
  {
    titleLight: 'Craftsmanship',
    titleBold: 'Perfected',
    body: 'Every detail hand-crafted with precision. Stainless steel cases polished to mirror finish, embodying the artisan spirit of luxury watchmaking.',
    imageIndex: 0,
    bg: '#FAF8F4'
  },
  {
    titleLight: 'Premium',
    titleBold: 'Materials',
    body: 'Exceptional materials sourced globally. Sapphire crystal, ceramic bezels, and premium leather straps that combine durability with elegance.',
    imageIndex: 1,
    bg: '#F2EDE6'
  },
  {
    titleLight: 'Precision',
    titleBold: 'Engineering',
    body: 'Swiss-inspired movement accuracy. Quartz chronographs delivering consistent timekeeping you can rely on in every moment.',
    imageIndex: 2,
    bg: '#FAF8F4'
  },
  {
    titleLight: 'Luxury',
    titleBold: 'Heritage',
    body: 'A legacy of excellence spanning generations. Each piece tells a story of timeless design and uncompromising quality standards.',
    imageIndex: 3,
    bg: '#F2EDE6'
  }
];

const WATCH_IMAGES = [
  '/images/img01.png',
  '/images/img02.png',
  '/images/img03.png',
  '/images/img04.png'
];

export default function FeatureScroller() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section className="w-full relative z-10 bg-[#FAF8F4]">
      {/* Header section */}
      <div className="py-20 text-center px-4 relative z-20 bg-[#FAF8F4]">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[11px] tracking-[0.3em] uppercase text-[#B8935A] font-dm"
        >
          WHAT MAKES US DIFFERENT
        </motion.p>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-cormorant text-[40px] md:text-[56px] text-[#1A1918] leading-[1.1] mt-4"
        >
          Built to Last.<br />Made to Impress.
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="w-12 h-[0.5px] bg-[#B8935A] mx-auto mt-5"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="font-dm text-[16px] text-[#6B6560] mt-4 max-w-xl mx-auto"
        >
          Discover the features that set our timepieces apart and elevate every moment.
        </motion.p>
      </div>

      {/* Desktop Sticky Scroll Section */}
      <div className="hidden md:block">
        <div
          ref={containerRef}
          className="relative w-full"
          style={{ height: `${FEATURES.length * 100}vh` }}
        >
          <div className="sticky top-0 h-screen w-full overflow-hidden flex">

            {/* Animated Backgrounds */}
            {FEATURES.map((feat, idx) => {
              const step = 1 / FEATURES.length;
              const start = idx * step;
              const end = start + step;

              const opacity = useTransform(
                scrollYProgress,
                [start - 0.1, start, end - 0.1, end],
                [0, 1, 1, 0]
              );

              // First bg should be visible from the start
              const actualOpacity = idx === 0
                ? useTransform(scrollYProgress, [0, step - 0.1, step], [1, 1, 0])
                : opacity;

              return (
                <motion.div
                  key={`bg-${idx}`}
                  className="absolute inset-0 z-0"
                  style={{ backgroundColor: feat.bg, opacity: actualOpacity }}
                />
              );
            })}

            {/* Left side (Images) */}
            <div className="w-1/2 h-full relative z-10 flex items-center justify-center">
              {FEATURES.map((feat, idx) => {
                const step = 1 / FEATURES.length;
                const start = idx * step;
                const end = start + step;
                const mid = start + (step / 2);

                const opacity = useTransform(
                  scrollYProgress,
                  [start - 0.1, start + 0.1, end - 0.1, end],
                  [0, 1, 1, 0]
                );

                const actualOpacity = idx === 0
                  ? useTransform(scrollYProgress, [0, step - 0.1, step], [1, 1, 0])
                  : opacity;

                const scale = useTransform(
                  scrollYProgress,
                  [start, mid, end],
                  [1.05, 1, 0.95]
                );

                const imgY = useTransform(
                  scrollYProgress,
                  [start, mid, end],
                  [40, 0, -40]
                );

                const blurValue = useTransform(
                  scrollYProgress,
                  [start - 0.1, start + 0.05, end - 0.05, end + 0.1],
                  [8, 0, 0, 8]
                );

                const filter = useTransform(blurValue, (v) => `blur(${Math.max(0, v)}px)`);

                return (
                  <motion.div
                    key={`img-${idx}`}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ opacity: actualOpacity, filter, y: imgY }}
                  >
                    <motion.img
                      src={WATCH_IMAGES[feat.imageIndex] || WATCH_IMAGES[0]}
                      alt=""
                      style={{ scale }}
                      className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-2xl"
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Right side (Text) */}
            <div className="w-1/2 h-full relative z-10">
              {FEATURES.map((feat, idx) => {
                const step = 1 / FEATURES.length;
                const start = idx * step;
                const end = start + step;
                const mid = start + (step / 2);

                const opacity = useTransform(
                  scrollYProgress,
                  [start - 0.05, start + 0.1, end - 0.1, end + 0.05],
                  [0, 1, 1, 0]
                );

                const actualOpacity = idx === 0
                  ? useTransform(scrollYProgress, [0, step - 0.1, step], [1, 1, 0])
                  : opacity;

                const textY = useTransform(
                  scrollYProgress,
                  [start, mid, end],
                  [60, 0, -60]
                );

                return (
                  <motion.div
                    key={`text-${idx}`}
                    className="absolute inset-0 flex flex-col justify-center px-12 lg:px-24"
                    style={{ opacity: actualOpacity, y: textY, pointerEvents: 'none' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-px bg-[#B8935A]" />
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8935A] font-dm">
                        FEATURE {idx + 1}
                      </p>
                    </div>

                    <h3 className="mt-6 font-cormorant text-[48px] lg:text-[64px] leading-[1.0]">
                      <span className="font-normal text-[#1A1918] block">{feat.titleLight}</span>
                      <span className="font-semibold text-[#003926] block">{feat.titleBold}</span>
                    </h3>

                    <div className="w-12 h-[0.5px] bg-[#B8935A] my-7" />

                    <p className="font-dm text-[17px] font-light text-[#6B6560] leading-[1.9] max-w-[400px]">
                      {feat.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Section — mirrors desktop split layout */}
      <div className="md:hidden flex flex-col w-full">
        {FEATURES.map((feat, idx) => {
          const watchImg = WATCH_IMAGES[feat.imageIndex] || WATCH_IMAGES[0];
          const isEven = idx % 2 === 0;

          return (
            <div
              key={`mob-${idx}`}
              className="w-full py-12 sm:py-16"
              style={{ background: feat.bg }}
            >
              <div className={`max-w-lg mx-auto px-5 sm:px-8 grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] gap-5 sm:gap-8 items-center ${!isEven ? 'direction-rtl' : ''}`}
                style={!isEven ? { direction: 'rtl' } : {}}
              >
                {/* Circular watch image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative flex justify-center"
                  style={{ direction: 'ltr' }}
                >
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full border border-[#B8935A]/20" />
                    <div className="absolute -inset-4 rounded-full border border-[#B8935A]/8" />
                    <img
                      src={watchImg}
                      alt={`${feat.titleLight} ${feat.titleBold}`}
                      className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] object-cover rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.15)] ring-2 ring-white/40"
                    />
                  </div>
                </motion.div>

                {/* Text content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  style={{ direction: 'ltr' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-px bg-[#B8935A]" />
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#B8935A] font-dm">
                      FEATURE {idx + 1}
                    </p>
                  </div>

                  <h3 className="font-cormorant text-[28px] sm:text-[34px] leading-[1.05] mb-3">
                    <span className="font-normal text-[#1A1918] block">{feat.titleLight}</span>
                    <span className="font-semibold text-[#003926] block">{feat.titleBold}</span>
                  </h3>

                  <div className="w-8 h-[0.5px] bg-[#B8935A] mb-3" />

                  <p className="font-dm text-[13px] sm:text-[14px] font-light text-[#6B6560] leading-[1.7]">
                    {feat.body}
                  </p>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}