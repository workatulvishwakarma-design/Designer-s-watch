"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HomeBrands() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#FAF8F4] flex flex-col md:h-screen md:max-h-screen"
      style={{ padding: 0 }}
    >
      {/* ── HEADER (compact ~100px) ── */}
      <div className="text-center py-5 md:py-5 shrink-0">
        <p
          className="font-dm uppercase"
          style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#B8935A" }}
        >
          OUR BRANDS
        </p>
        <h2
          className="font-cormorant text-[#1A1918] mt-1"
          style={{ fontSize: "clamp(26px, 3vw, 40px)" }}
        >
          Two Identities. One Foundation.
        </h2>
        <div className="w-10 h-[0.5px] bg-[#B8935A] mx-auto mt-2" />
      </div>

      {/* ── CARDS ROW ── */}
      <div
        className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden mx-auto w-full"
        style={{ maxWidth: 1430, padding: "0 60px 24px" }}
      >
        {/* D'SIGNER Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="relative h-[55vh] md:h-full min-h-0 rounded-[14px] overflow-hidden cursor-pointer group"
          style={{
            transition: "box-shadow 0.5s ease",
          }}
        >
          {/* Gold Corner SVG */}
          <svg
            width="26"
            height="26"
            stroke="#B8935A"
            fill="none"
            className="absolute top-4 left-4 z-10 opacity-50 pointer-events-none"
          >
            <path d="M0 26 L0 0 L26 0" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          {/* IMAGE (78%) */}
          <div className="relative w-full overflow-hidden" style={{ height: "78%" }}>
            <motion.img
              src="/images/main-img2.png"
              alt="D'SIGNER"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              style={{ y }}
            />
            {/* Gradient */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{
                height: "60%",
                background: "linear-gradient(transparent, #111110)",
              }}
            />
          </div>

          {/* TEXT BLOCK (22%) — compact: name + price + CTA */}
          <div
            className="flex flex-col justify-center px-5 py-3"
            style={{ height: "22%", background: "#111110" }}
          >
            <h3
              className="font-bebas text-white leading-none"
              style={{ fontSize: "clamp(26px, 2.5vw, 40px)" }}
            >
              D&apos;SIGNER
            </h3>
            <div className="flex items-center justify-between mt-2">
              <p
                className="font-cormorant italic"
                style={{ fontSize: "15px", color: "#B8935A" }}
              >
                ₹1,299 — ₹4,999
              </p>
              <button
                className="font-dm rounded-full transition-opacity hover:opacity-80"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  padding: "6px 16px",
                  background: "#B8935A",
                  color: "#111110",
                }}
              >
                Shop Now →
              </button>
            </div>
          </div>

          {/* Hover shadow overlay */}
          <div className="absolute inset-0 rounded-[14px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "inset 0 0 0 0 transparent, 0 20px 50px rgba(0,0,0,0.15)" }} />
        </motion.div>

        {/* ESCORT Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative h-[55vh] md:h-full min-h-0 rounded-[14px] overflow-hidden cursor-pointer group"
          style={{
            transition: "box-shadow 0.5s ease",
          }}
        >
          {/* Gold Corner SVG */}
          <svg
            width="26"
            height="26"
            stroke="#B8935A"
            fill="none"
            className="absolute top-4 left-4 z-10 opacity-50 pointer-events-none"
          >
            <path d="M0 26 L0 0 L26 0" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          {/* IMAGE (78%) */}
          <div className="relative w-full overflow-hidden" style={{ height: "78%" }}>
            <motion.img
              src="/images/main-img1.png"
              alt="ESCORT"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              style={{ y }}
            />
            {/* Gradient */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{
                height: "60%",
                background: "linear-gradient(transparent, #F0EBE2)",
              }}
            />
          </div>

          {/* TEXT BLOCK (22%) — compact: name + price + CTA */}
          <div
            className="flex flex-col justify-center px-5 py-3"
            style={{ height: "22%", background: "#F0EBE2" }}
          >
            <h3
              className="font-bebas text-[#1A1918] leading-none"
              style={{ fontSize: "clamp(26px, 2.5vw, 40px)" }}
            >
              ESCORT
            </h3>
            <div className="flex items-center justify-between mt-2">
              <p
                className="font-cormorant italic"
                style={{ fontSize: "15px", color: "#B8935A" }}
              >
                ₹799 — ₹2,499
              </p>
              <button
                className="font-dm rounded-full transition-opacity hover:opacity-80"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  padding: "6px 16px",
                  background: "#1A1918",
                  color: "white",
                }}
              >
                Shop Now →
              </button>
            </div>
          </div>

          {/* Hover shadow overlay */}
          <div className="absolute inset-0 rounded-[14px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "inset 0 0 0 0 transparent, 0 20px 50px rgba(0,0,0,0.15)" }} />
        </motion.div>
      </div>
    </section>
  );
}
