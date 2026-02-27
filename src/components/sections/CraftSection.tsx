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

const materialPoints = [
    { title: "Sapphire Crystal", desc: "Anti-reflective, scratch-resistant clarity." },
    { title: "316L Stainless Steel", desc: "Surgical grade durability and polish." },
    { title: "Multi-layer Dial Finishing", desc: "Heritage precision in every detail." },
];

export default function CraftSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Parallax and Scale effects
    const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);
    const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

    return (
        <section
            ref={containerRef}
            className={`relative min-h-screen w-full flex flex-col lg:flex-row items-center overflow-hidden bg-white px-8 lg:px-24 py-24 ${poppins.variable} font-sans`}
        >
            {/* Background tone shift: slight warmer tone */}
            <div className="absolute inset-0 bg-[#F2EDE6] opacity-30 z-0" />

            {/* LEFT CONTENT: Macro Image Container */}
            <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-[80vh] overflow-hidden rounded-2xl lg:rounded-3xl z-10">
                <motion.div
                    style={{ scale: imageScale, y: imageY }}
                    className="relative w-full h-full"
                >
                    <Image
                        src="/images/ezgif-4d3e6b6df613bc7d-jpg/ezgif-frame-200.jpg"
                        alt="Macro Watch Detail"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Light Sweep Animation Overlay */}
                    <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: "100%", opacity: [0, 0.2, 0] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)"
                        }}
                    />
                </motion.div>
                {/* Soft Shadow Edges */}
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.05)] pointer-events-none" />
            </div>

            {/* RIGHT CONTENT: Material Story */}
            <motion.div
                style={{ y: textY }}
                className="relative z-20 w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-12 lg:pl-24 mt-16 lg:mt-0"
            >
                <div className="space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-[#1A1918] leading-[1.2]"
                    >
                        Designer's Best Seller. <br />
                        <span className="text-[#003926]">It Is Engineered.</span>
                    </motion.h2>
                    <p className="text-gray-500 font-light text-lg">
                        Where luxury becomes tactile and material worship is our standard.
                    </p>
                </div>

                {/* Material Points */}
                <div className="flex flex-col space-y-10 w-full">
                    {materialPoints.map((point, index) => (
                        <motion.div
                            key={point.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-start justify-center lg:justify-start gap-4"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#003926] mt-2.5 flex-shrink-0" />
                            <div className="space-y-1">
                                <h3 className="text-[15px] font-semibold text-[#1A1918] uppercase tracking-wider italic">
                                    {point.title}
                                </h3>
                                <p className="text-[14px] text-gray-400 font-light tracking-wide">
                                    {point.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
