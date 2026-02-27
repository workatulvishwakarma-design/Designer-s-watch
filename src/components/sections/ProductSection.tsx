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

const productFeatures = [
    "Precision Chronograph",
    "Heritage Case Design",
    "Sun-ray Dial Finish",
];

export default function ProductSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Scroll Animations
    const watchRotate = useTransform(scrollYProgress, [0, 1], [0, 2]);
    const lightMoveX = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]);
    const shadowOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0.2]);

    const springConfig = { stiffness: 100, damping: 30 };
    const smoothRotate = useSpring(watchRotate, springConfig);

    return (
        <section
            ref={containerRef}
            className={`relative h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden px-8 lg:px-24 py-24 ${poppins.variable} font-sans`}
        >
            {/* PURE WHITE SHOWROOM WITH SOFT RADIAL LIGHT */}
            <div className="absolute inset-0 bg-white z-0" />
            <div
                className="absolute inset-0 pointer-events-none z-1"
                style={{
                    background: "radial-gradient(circle at center, rgba(184, 147, 90, 0.08) 0%, transparent 70%)"
                }}
            />

            {/* Decorative Art — Floating Orbs */}
            <motion.div
                animate={{ y: [0, -20, 0], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-[60px]"
                style={{ backgroundColor: "#B8935A" }}
            />
            <motion.div
                animate={{ y: [0, 25, 0], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-[80px]"
                style={{ backgroundColor: "#D4AA72" }}
            />

            <div className="relative z-10 w-full flex flex-col items-center text-center space-y-12">
                {/* Headline above */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl md:text-5xl lg:text-6xl font-heading font-light tracking-tight text-[#1A1918]"
                >
                    The Heritage Series
                </motion.h2>

                {/* CENTERED PRODUCT */}
                <motion.div
                    className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px]"
                    style={{ rotateZ: smoothRotate }}
                >
                    {/* Halo Ring behind */}
                    <div className="absolute inset-0 rounded-full border border-gold/10 scale-110" />
                    <div className="absolute inset-4 rounded-full border border-gold/5 scale-125" />
                    {/* Reflective Dial Light Sweep Overlay */}
                    <motion.div
                        className="absolute inset-0 z-10 pointer-events-none mix-blend-soft-light"
                        style={{
                            x: lightMoveX,
                            opacity: 0.3, // Simplified for valid JSX style object, animation handled via motion if needed or just static
                            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)"
                        }}
                    />

                    <Image
                        src="/images/img05.png"
                        alt="Product Focus"
                        fill
                        className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                        priority
                    />

                    {/* Shadow deepening on scroll */}
                    <motion.div
                        style={{ opacity: shadowOpacity }}
                        className="absolute -bottom-[20px] left-[15%] w-[70%] h-[30px] blur-[15px] bg-black rounded-[50%] z-0"
                    />
                </motion.div>

                {/* Refined Feature Highlights inline */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8">
                    {productFeatures.map((feature, index) => (
                        <motion.div
                            key={feature}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col items-center"
                        >
                            <span className="text-[12px] font-semibold tracking-widest text-[#003926] uppercase">
                                {feature}
                            </span>
                            <div className="w-8 h-[1px] bg-gray-200 mt-2" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
