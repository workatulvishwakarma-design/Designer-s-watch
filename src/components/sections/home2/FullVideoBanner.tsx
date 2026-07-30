"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FullVideoBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Autoplay Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover scale-102 pointer-events-none"
      >
        <source src="/images/new-img/video/D_SIGNER shot video 01.mp4" type="video/mp4" />
      </video>

      {/* Subtle Edge Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.4)"
        }}
      />
    </motion.section>
  );
}
