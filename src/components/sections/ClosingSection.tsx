"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
});

export default function ClosingSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

    return (
        <section
            ref={containerRef}
            className={`relative min-h-[80vh] w-full flex flex-col items-center justify-center bg-white overflow-hidden px-8 lg:px-24 py-32 ${poppins.variable} font-sans`}
        >
            {/* Dynamic Background Rhythm: Light Ivory Again */}
            <div className="absolute inset-0 bg-[#FAF8F4] opacity-40 z-0" />

            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 flex flex-col items-center text-center space-y-12 max-w-4xl"
            >
                {/* BRAND SEAL / LOGO */}
                <div className="w-24 h-24 relative mb-4">
                    {/* Using a placeholder circle for the logo seal if specific asset isn't clear */}
                    <div className="absolute inset-0 rounded-full border-2 border-[#003926]/20 animate-spin-slow transition-transform" />
                    <div className="absolute inset-2 rounded-full border border-[#003926]/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[28px] font-bold text-[#003926] italic">D</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-[#1A1918] leading-[1.3]"
                    >
                        Crafted For Time. <br />
                        <span className="text-[#003926]">Designed For Life.</span>
                    </motion.h2>

                    <p className="text-gray-400 font-light text-[14px] tracking-[0.2em] uppercase">
                        Designer World — Nagpal Group
                    </p>
                </div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="pt-6"
                >
                    <button className="px-12 py-5 bg-[#003926] text-white rounded-full text-[13px] font-medium tracking-[0.15em] uppercase shadow-lg hover:shadow-2xl hover:bg-[#002f1f] transition-all duration-500 hover:-translate-y-1">
                        Explore Collection
                    </button>
                </motion.div>

                {/* Breathing Space Footer Minimal */}
                <div className="pt-24 opacity-30">
                    <span className="block w-[1px] h-16 bg-[#003926] mx-auto" />
                </div>
            </motion.div>

            <style jsx>{`
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </section>
    );
}
