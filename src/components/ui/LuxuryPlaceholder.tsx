"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function LuxuryPlaceholder({
  text = "Image Coming Soon",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-[#F5F1EA] overflow-hidden ${className}`}
    >
      {/* Subtle grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      {/* Watch Silhouette Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mb-4"
      >
        <div className="w-16 h-16 rounded-full border-[1.5px] border-[#B8935A]/40 flex items-center justify-center bg-white/50 backdrop-blur-sm shadow-sm">
          <Clock className="w-8 h-8 text-[#B8935A]/60" strokeWidth={1} />
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <p className="font-dm text-[11px] uppercase tracking-[0.25em] text-[#003926]/60 font-medium">
          {text}
        </p>
      </motion.div>
    </div>
  );
}
