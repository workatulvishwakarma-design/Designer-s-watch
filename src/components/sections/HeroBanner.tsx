"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
});

export default function HeroBanner() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Smooth scroll-based transformations
    const watchRotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
    const watchY = useTransform(scrollYProgress, [0, 1], [0, -40]);
    const bgWarmth = useTransform(
        scrollYProgress,
        [0, 1],
        ["#F8F6F2", "#EFEDE8"]
    );

    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const smoothRotate = useSpring(watchRotate, springConfig);
    const smoothY = useSpring(watchY, springConfig);

    return (
        <section
            ref={containerRef}
            className={`relative min-h-screen w-full flex flex-col lg:flex-row items-center overflow-hidden px-8 lg:px-24 py-20 lg:py-0 ${poppins.variable} font-sans`}
            style={{ backgroundColor: "#F8F6F2" }}
        >
            {/* Dynamic Background Tone Shift */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ backgroundColor: bgWarmth }}
            />

            {/* Luxury Gradient Overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background: "linear-gradient(135deg, #F8F6F2 0%, #FFFFFF 50%, #EFEDE8 100%)",
                    opacity: 0.8
                }}
            />

            {/* Sunlight Radial Glow (Top-Left) */}
            <div
                className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] pointer-events-none z-1"
                style={{
                    background: "radial-gradient(circle, rgba(255,253,245,0.8) 0%, transparent 70%)",
                    filter: "blur(80px)"
                }}
            />

            {/* Subtle Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 mix-blend-multiply">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* LEFT CONTENT: Text Block */}
            <div className="relative z-20 w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-1 lg:order-1 mt-12 lg:mt-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-1"
                >
                    <span className="block text-[11px] font-semibold tracking-[0.4em] text-gray-400 uppercase">
                        DESIGNER WORLD
                    </span>
                    <span className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase">
                        Nagpal Group Since 1940
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl md:text-7xl xl:text-8xl font-bold tracking-tight text-[#1A1918] leading-[1.05]"
                >
                    Your Vision. <br />
                    <span className="text-[#003926]">Our Watchmaking.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed font-light"
                >
                    Premium timepieces crafted with international standards and four generations of horological expertise.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-row items-center gap-8 pt-4"
                >
                    {/* Primary CTA: Heritage Green */}
                    <button className="group relative px-10 py-5 bg-[#003926] text-white rounded-full text-[13px] font-medium tracking-widest uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,57,38,0.25)] hover:-translate-y-1 active:scale-95">
                        <span className="relative z-10">Explore Collection</span>
                        <div className="absolute inset-0 bg-[#00281b] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>

                    {/* Secondary CTA: link style */}
                    <button className="group relative py-2 text-[#003926] text-[13px] font-semibold tracking-widest uppercase">
                        Our Legacy
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#003926] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left" />
                    </button>
                </motion.div>
            </div>

            {/* RIGHT CONTENT: Centerpiece Watch */}
            <div className="relative z-20 w-full lg:w-1/2 h-[50vh] lg:h-screen flex items-center justify-center order-2 lg:order-2">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-full flex items-center justify-center group"
                    style={{ rotateZ: smoothRotate, y: smoothY }}
                >
                    {/* Mirror Reflection below watch */}
                    <div
                        className="absolute bottom-[10%] w-[50%] h-[40px] opacity-20 blur-[20px]"
                        style={{
                            background: "radial-gradient(ellipse at center, #000 0%, transparent 70%)",
                            borderRadius: '50%'
                        }}
                    />

                    {/* Floating Watch Module */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-[300px] h-[300px] md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px]"
                    >
                        <Image
                            src="/images/img01.png"
                            alt="D'SIGNER Limited Edition"
                            fill
                            className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                            priority
                            style={{
                                filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.12))"
                            }}
                        />

                        {/* Light Sweep Effect Overlay (Animated Sweep) */}
                        <motion.div
                            initial={{ x: "-150%", opacity: 0 }}
                            animate={{ x: "150%", opacity: [0, 0.4, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatDelay: 3,
                                ease: "linear"
                            }}
                            className="absolute inset-0 z-10 pointer-events-none mix-blend-soft-light"
                            style={{
                                background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)"
                            }}
                        />
                    </motion.div>
                </motion.div>
            </div>

            <style jsx global>{`
        :root {
          --font-poppins: ${poppins.style.fontFamily};
        }
      `}</style>
        </section>
    );
}
