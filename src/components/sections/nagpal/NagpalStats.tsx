"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(end: number, duration: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return count;
}

export default function NagpalStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count1 = useCountUp(20, 2, inView);
  const count2 = useCountUp(500, 2, inView);

  return (
    <section
      className="relative overflow-hidden py-20"
      style={{ backgroundColor: "#F2EDE6" }}
    >
      {/* Top gold line */}
      <div
        className="absolute top-0 left-0 w-full h-px pointer-events-none z-0"
        style={{ backgroundColor: "rgba(184,147,90,0.3)" }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Desktop: 3 columns — stat | divider | text | divider | stat */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-0 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <div
              className="w-2 h-2 rounded-full mb-4"
              style={{ backgroundColor: "#B8935A", width: 8, height: 8 }}
            />
            <span
              className="font-display text-[72px] lg:text-[96px] leading-none"
              style={{ color: "#B8935A" }}
            >
              {count1}+
            </span>
            <span
              className="font-body font-light text-[14px] tracking-[0.12em] mt-2 block"
              style={{ color: "#6B6560" }}
            >
              International Brand
            </span>
            <span
              className="font-body font-light text-[14px] tracking-[0.12em]"
              style={{ color: "#6B6560" }}
            >
              Associations
            </span>
          </motion.div>

          <div
            className="w-px h-[80px] self-center opacity-25"
            style={{ backgroundColor: "#B8935A" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center pl-6 border-l-[3px] py-4"
            style={{ borderColor: "#B8935A" }}
          >
            <p
              className="font-heading italic text-[18px] lg:text-[22px]"
              style={{ color: "#1A1918", lineHeight: 1.8 }}
            >
              An integrated watch enterprise operating across manufacturing, distribution, components,
              and brand development for over four decades.
            </p>
          </motion.div>

          <div
            className="w-px h-[80px] self-center opacity-25"
            style={{ backgroundColor: "#B8935A" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <div
              className="w-2 h-2 rounded-full mb-4"
              style={{ backgroundColor: "#B8935A", width: 8, height: 8 }}
            />
            <span
              className="font-display text-[72px] lg:text-[96px] leading-none"
              style={{ color: "#B8935A" }}
            >
              {count2}+
            </span>
            <span
              className="font-body font-light text-[14px] tracking-[0.12em] mt-2 block"
              style={{ color: "#6B6560" }}
            >
              Private Labels
            </span>
            <span
              className="font-body font-light text-[14px] tracking-[0.12em]"
              style={{ color: "#6B6560" }}
            >
              Manufactured
            </span>
          </motion.div>
        </div>

        {/* Mobile: stack stat1 → horizontal divider → text → divider → stat2 */}
        <div className="md:hidden flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col items-center text-center"
          >
            <div
              className="w-2 h-2 rounded-full mb-4"
              style={{ backgroundColor: "#B8935A", width: 8, height: 8 }}
            />
            <span
              className="font-display text-[56px] leading-none"
              style={{ color: "#B8935A" }}
            >
              {count1}+
            </span>
            <span className="font-body font-light text-[14px] tracking-[0.12em] mt-2" style={{ color: "#6B6560" }}>
              International Brand Associations
            </span>
          </motion.div>

          <div
            className="w-[60px] h-px my-6"
            style={{ backgroundColor: "#B8935A" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading italic text-[18px] text-center py-4 border-t border-b"
            style={{ color: "#1A1918", lineHeight: 1.8, borderColor: "#B8935A" }}
          >
            An integrated watch enterprise operating across manufacturing, distribution, components,
            and brand development for over four decades.
          </motion.div>

          <div
            className="w-[60px] h-px my-6"
            style={{ backgroundColor: "#B8935A" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <div
              className="w-2 h-2 rounded-full mb-4"
              style={{ backgroundColor: "#B8935A", width: 8, height: 8 }}
            />
            <span
              className="font-display text-[56px] leading-none"
              style={{ color: "#B8935A" }}
            >
              {count2}+
            </span>
            <span className="font-body font-light text-[14px] tracking-[0.12em] mt-2" style={{ color: "#6B6560" }}>
              Private Labels Manufactured
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
