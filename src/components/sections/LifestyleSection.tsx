"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
});

export default function LifestyleSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Scale down effect (1.05 -> 1.0)
    const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.05, 1]);
    const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

    return (
        <section
            ref={containerRef}
            className={`relative h-screen w-full flex items-center justify-center overflow-hidden bg-white ${poppins.variable} font-sans`}
        >
            {/* Dynamic Background Rhythm: Natural Light Beige */}
            <div className="absolute inset-0 bg-[#F2EDE6] opacity-40 z-0" />

            {/* FULL-WIDTH LIFESTYLE IMAGE */}
            <motion.div
                style={{ scale: imageScale }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/images/aboutImg3.png" // Using an environmental/lifestyle image from the available assets
                    alt="Lifestyle Experience"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Soft overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F4]/20 via-transparent to-[#FAF8F4]/20" />
            </motion.div>

            {/* CENTERED TEXT BLOCK */}
            <motion.div
                style={{ y: textY }}
                className="relative z-10 flex flex-col items-center text-center space-y-6 px-12"
            >
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-[#1A1918] leading-[1.1]"
                >
                    Designed For Those <br />
                    <span className="text-[#003926]">Who Lead Quietly.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg md:text-xl text-gray-500 font-light max-w-lg tracking-wide"
                >
                    Positioned in contemporary India, our timepieces are built for authority without unnecessary noise.
                </motion.p>
            </motion.div>
        </section>
    );
}
