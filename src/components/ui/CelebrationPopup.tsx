"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Centered Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[420px] sm:max-w-[480px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-[2px] z-10"
            style={{
              background: "linear-gradient(135deg, #D4AF6A 0%, #FFE08A 45%, #B88E4E 100%)",
            }}
          >
            <div className="relative w-full aspect-square rounded-[14px] overflow-hidden bg-[#FAF9F6]">
              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 hover:bg-white text-neutral-800 hover:text-black shadow-[0_2px_12px_rgba(0,0,0,0.22)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer border border-black/10"
                aria-label="Close"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              {/* 35 Years of Crafting Time Gold Artwork */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/new-img/35-years-celebration-popup.png"
                  alt="35 Years of Crafting Time"
                  fill
                  sizes="(max-width: 640px) 90vw, 480px"
                  priority
                  className="object-cover object-center w-full h-full select-none pointer-events-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
