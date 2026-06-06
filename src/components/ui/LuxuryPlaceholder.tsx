"use client";

import { motion } from "framer-motion";
import { Watch } from "lucide-react";

export default function LuxuryPlaceholder({
  text = "Image Coming Soon",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full h-full min-h-[300px] flex flex-col items-center justify-center overflow-hidden ${className}`}
      style={{ background: "radial-gradient(ellipse at center, #F0EDE8, #F5F1EA)" }}
    >
      {/* Subtle grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Refined Dial Pattern */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 mb-5"
      >
        <div className="w-[100px] h-[100px] rounded-full border border-[#B8935A]/15 flex items-center justify-center">
          <div className="w-[70px] h-[70px] rounded-full border border-[#B8935A]/10 flex items-center justify-center">
            <div className="w-[44px] h-[44px] rounded-full border border-[#B8935A]/20 flex items-center justify-center bg-white/30 backdrop-blur-sm">
              <Watch className="w-5 h-5 text-[#B8935A]/40" strokeWidth={1.2} />
            </div>
          </div>
        </div>
        {/* Hour markers */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <div
            key={deg}
            className="absolute top-1/2 left-1/2 w-[1px] h-[6px] -translate-x-1/2 -translate-y-[50px]"
            style={{
              background: deg % 90 === 0 ? "rgba(184,147,90,0.25)" : "rgba(184,147,90,0.1)",
              transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-44px)`,
              height: deg % 90 === 0 ? "8px" : "4px",
            }}
          />
        ))}
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <p className="font-dm text-[10px] uppercase tracking-[0.25em] text-[#003926]/40 font-medium">
          {text}
        </p>
      </motion.div>
    </div>
  );
}
