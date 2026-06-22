"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * LoadingScreen — Branded splash screen for Designer World
 * Shows once per browser session. Fades out after ~2.2s.
 * Uses sessionStorage to prevent repeat displays.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("dw-splash-seen");
      if (!seen) {
        setVisible(true);
        sessionStorage.setItem("dw-splash-seen", "1");
        const timer = setTimeout(() => setVisible(false), 2400);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#001F14" }}
        >
          {/* Ambient emerald glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] blur-[120px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(0,57,38,0.5), transparent)",
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-[220px] h-[55px] sm:w-[280px] sm:h-[70px] mb-6"
          >
            <Image
              src="/images/designer world logo_B.png"
              alt="Designer World"
              fill
              className="object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
              priority
            />
          </motion.div>

          {/* Gold accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-16 h-[1px] mb-5 origin-center"
            style={{
              background:
                "linear-gradient(90deg, transparent, #B8935A, transparent)",
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-dm uppercase text-center"
            style={{
              fontSize: "10px",
              letterSpacing: "0.35em",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Nagpal Group · Since 1948
          </motion.p>

          {/* Subtle loading indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="absolute bottom-12"
          >
            <motion.div
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
              className="w-12 h-[1px] origin-left"
              style={{ backgroundColor: "rgba(184,147,90,0.3)" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
