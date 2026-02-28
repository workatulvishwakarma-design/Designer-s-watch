"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"], variable: "--font-playfair" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-poppins" });

const Word = ({ children, delay }: { children: string; delay: number }) => (
    <motion.span
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block mr-[0.3em]"
    >
        {children}
    </motion.span>
);

export default function HomeBrands() {
    const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const headline = "Two Identities. One Foundation.";
    const words = headline.split(" ");

    return (
        <section
            ref={containerRef}
            className={`relative h-screen min-h-[700px] w-full overflow-hidden flex flex-col md:flex-row bg-[#FAF8F4] ${playfair.variable} ${poppins.variable} font-sans`}
        >
            {/* SECTION HEADLINE - OVERLAY TOP */}
            <div className="absolute top-12 md:top-20 left-0 w-full z-40 flex justify-center px-6 pointer-events-none">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#1A1918] text-center drop-shadow-sm">
                    {words.map((word, i) => (
                        <Word key={i} delay={0.2 + i * 0.1}>{word}</Word>
                    ))}
                </h2>
            </div>

            {/* CENTER DIVIDER LINE */}
            <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute left-1/2 top-0 w-[1px] h-full bg-[#1A1918]/10 z-30 hidden md:block origin-top transition-colors duration-500 ${hoveredSide ? 'bg-[#003926]/30 shadow-[0_0_15px_rgba(0,57,38,0.2)]' : ''}`}
            />

            {/* LEFT PANEL - D'SIGNER */}
            <motion.div
                onMouseEnter={() => setHoveredSide("left")}
                onMouseLeave={() => setHoveredSide(null)}
                animate={{
                    width: hoveredSide === "left" ? "60%" : hoveredSide === "right" ? "40%" : "50%"
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-1/2 md:h-full overflow-hidden group border-b md:border-b-0 md:border-r border-[#1A1918]/5"
            >
                {/* Background Image with Parallax & Depth */}
                <motion.div
                    animate={{ scale: hoveredSide === "left" ? 1.05 : 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="/images/img03.png"
                        alt="D'SIGNER Luxury"
                        fill
                        className="object-cover brightness-[0.85] contrast-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-700" />
                </motion.div>

                {/* Spotlight Glow */}
                <div className={`absolute inset-0 z-1 pointer-events-none transition-opacity duration-1000 ${hoveredSide === "left" ? "opacity-40" : "opacity-0"}`}
                    style={{ background: "radial-gradient(circle at center, rgba(0,57,38,0.5) 0%, transparent 70%)" }}
                />

                {/* Content */}
                <div className="relative z-10 h-full w-full flex flex-col justify-end p-8 md:p-16 lg:p-24 space-y-4 md:space-y-6">
                    <motion.h3
                        animate={{
                            opacity: hoveredSide === "right" ? 0.4 : 0.8,
                            letterSpacing: hoveredSide === "left" ? "0.15em" : "0.05em",
                            scale: hoveredSide === "left" ? 1.05 : 1
                        }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-widest uppercase transition-all duration-700 pointer-events-none"
                        style={{ textShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                    >
                        D&apos;SIGNER
                    </motion.h3>

                    <AnimatePresence>
                        {hoveredSide === "left" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="space-y-6"
                            >
                                <p className="text-white/80 text-base md:text-lg font-light max-w-md leading-relaxed">
                                    Design-led premium watches built for refined aesthetics and international standards.
                                </p>
                                <button className="px-10 py-4 bg-white text-black rounded-full text-[12px] font-semibold tracking-widest uppercase hover:bg-[#003926] hover:text-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                                    Explore Collection
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Light Sweep Effect */}
                <motion.div
                    animate={hoveredSide === "left" ? { x: ["-100%", "200%"] } : { x: "-100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                />
            </motion.div>

            {/* RIGHT PANEL - ESCORT */}
            <motion.div
                onMouseEnter={() => setHoveredSide("right")}
                onMouseLeave={() => setHoveredSide(null)}
                animate={{
                    width: hoveredSide === "right" ? "60%" : hoveredSide === "left" ? "40%" : "50%"
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-1/2 md:h-full overflow-hidden group"
            >
                {/* Background Image with Parallax & Depth */}
                <motion.div
                    animate={{ scale: hoveredSide === "right" ? 1.05 : 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="/images/img04.png"
                        alt="ESCORT Heritage"
                        fill
                        className="object-cover brightness-[0.9] contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-700" />
                </motion.div>

                {/* Spotlight Glow */}
                <div className={`absolute inset-0 z-1 pointer-events-none transition-opacity duration-1000 ${hoveredSide === "right" ? "opacity-30" : "opacity-0"}`}
                    style={{ background: "radial-gradient(circle at center, rgba(235,230,225,0.6) 0%, transparent 70%)" }}
                />

                {/* Content */}
                <div className="relative z-10 h-full w-full flex flex-col justify-end p-8 md:p-16 lg:p-24 space-y-4 md:space-y-6">
                    <motion.h3
                        animate={{
                            opacity: hoveredSide === "left" ? 0.4 : 0.8,
                            letterSpacing: hoveredSide === "right" ? "0.15em" : "0.05em",
                            scale: hoveredSide === "right" ? 1.05 : 1
                        }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-widest uppercase transition-all duration-700 pointer-events-none"
                        style={{ textShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                    >
                        ESCORT
                    </motion.h3>

                    <AnimatePresence>
                        {hoveredSide === "right" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="space-y-6"
                            >
                                <p className="text-white/80 text-base md:text-lg font-light max-w-md leading-relaxed">
                                    Reliable, durable watches offering everyday performance and lasting value.
                                </p>
                                <button className="px-10 py-4 bg-black text-white rounded-full text-[12px] font-semibold tracking-widest uppercase hover:bg-[#003926] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                                    Explore Collection
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Light Sweep Effect */}
                <motion.div
                    animate={hoveredSide === "right" ? { x: ["-100%", "200%"] } : { x: "-100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                />
            </motion.div>

            {/* Grain Overlay */}
            <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-multiply">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilterSubtle">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilterSubtle)" />
                </svg>
            </div>

            <style jsx global>{`
        .font-serif {
          font-family: var(--font-playfair), serif;
        }
      `}</style>
        </section>
    );
}
