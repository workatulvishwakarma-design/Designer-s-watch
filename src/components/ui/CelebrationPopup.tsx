"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CelebrationPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("celebration-dismissed");
    if (alreadySeen) {
      setDismissed(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => {
      setDismissed(true);
      sessionStorage.setItem("celebration-dismissed", "1");
    }, 400);
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Centered Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[480px] rounded-2xl overflow-hidden shadow-2xl p-[1.5px] z-10"
            style={{
              background: "linear-gradient(135deg, rgba(212,175,106,0.6), rgba(0,57,38,0.8), rgba(184,142,78,0.4))",
            }}
          >
            <div
              className="relative rounded-2xl overflow-hidden px-6 sm:px-10 py-10 sm:py-12 text-center"
              style={{
                background: "linear-gradient(160deg, #091911 0%, #05100B 60%, #0A1C13 100%)",
                boxShadow: "inset 0 0 60px rgba(0,57,38,0.4)",
              }}
            >
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                aria-label="Close"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>

              {/* Decorative sparkle star */}
              <div className="flex justify-center mb-4">
                <svg width="36" height="36" viewBox="0 0 28 28" fill="none" className="animate-pulse">
                  <path
                    d="M14 2L16.9 10.1H25.5L18.8 15.1L21.7 23.2L14 18.2L6.3 23.2L9.2 15.1L2.5 10.1H11.1L14 2Z"
                    fill="url(#starModalGrad)"
                    stroke="#D4AF6A"
                    strokeWidth="0.5"
                  />
                  <defs>
                    <linearGradient id="starModalGrad" x1="2.5" y1="2" x2="25.5" y2="23.2" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFE08A" />
                      <stop offset="0.5" stopColor="#D4AF6A" />
                      <stop offset="1" stopColor="#B88E4E" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Big 35+ typography */}
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span
                  className="font-montserrat font-bold text-[68px] sm:text-[84px] leading-none tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, #FFFFFF 0%, #FFE08A 35%, #D4AF6A 75%, #B88E4E 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  35
                </span>
                <span
                  className="font-montserrat font-bold text-[36px] sm:text-[44px] leading-none"
                  style={{
                    background: "linear-gradient(135deg, #FFE08A, #D4AF6A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  +
                </span>
              </div>

              {/* Label */}
              <p
                className="font-montserrat font-semibold text-[11px] sm:text-[13px] tracking-[0.32em] uppercase mb-4"
                style={{ color: "#D4AF6A" }}
              >
                YEARS OF EXCELLENCE
              </p>

              {/* Divider */}
              <div
                className="mx-auto my-5 h-[1px] w-20"
                style={{ background: "linear-gradient(90deg, transparent, #D4AF6A99, transparent)" }}
              />

              {/* Description */}
              <p
                className="font-montserrat text-[13px] sm:text-[14px] leading-[1.7] text-white/80 max-w-xs mx-auto mb-8 font-light"
              >
                Celebrating the journey of{" "}
                <strong className="font-semibold" style={{ color: "#D4AF6A" }}>
                  D&apos;Signer
                </strong>{" "}
                — since 1990
              </p>

              {/* Bottom badge */}
              <div className="flex justify-center">
                <div
                  className="px-5 py-2 rounded-sm border"
                  style={{
                    borderColor: "rgba(212,175,106,0.35)",
                    background: "rgba(212,175,106,0.06)",
                  }}
                >
                  <span
                    className="font-montserrat text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-medium"
                    style={{ color: "#D4AF6A" }}
                  >
                    NAGPAL GROUP • EST. 1990
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
