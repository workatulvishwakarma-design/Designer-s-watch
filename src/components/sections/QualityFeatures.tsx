"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"], variable: "--font-playfair" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-poppins" });

const features = [
    {
        id: "01",
        title: "316L Surgical Steel",
        desc: "Surgical grade stainless steel construction for high corrosion resistance and a lasting premium mirror finish.",
    },
    {
        id: "02",
        title: "5–10 ATM Resistance",
        desc: "Certified water resistance engineering that ensures reliability from daily splashes to deep immersion.",
    },
    {
        id: "03",
        title: "Sapphire-Coated Glass",
        desc: "Superior scratch-resistant crystalline finish with anti-reflective coating for perpetual dial clarity.",
    },
    {
        id: "04",
        title: "Japanese Precision",
        desc: "Hyper-accurate quartz movements delivering chronometric precision within seconds per month.",
    },
    {
        id: "05",
        title: "PVD Ionic Plating",
        desc: "Advanced physical vapor deposition for deep color bonding that never chips or fades over decades.",
    },
];

const FeatureItem = ({ feature }: { feature: typeof features[0]; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="group relative h-[50vh] flex flex-col justify-center"
        >
            <div className="flex items-start gap-8">
                <span className="text-xl font-sans font-semibold text-[#003926]/30 transition-colors duration-500 group-hover:text-[#003926]">
                    {feature.id}
                </span>
                <div className="space-y-4 flex-1">
                    <h4 className="text-xl md:text-2xl lg:text-3xl font-serif text-[#1A1918] tracking-tight transition-all duration-700 group-hover:translate-x-1 group-hover:text-[#003926]">
                        {feature.title}
                    </h4>
                    <p className="text-gray-500 font-light text-base md:text-lg max-w-sm leading-relaxed opacity-80">
                        {feature.desc}
                    </p>

                    {/* Animated Underline / Progress Line */}
                    <div className="relative h-[2px] w-full bg-[#1A1918]/5 mt-10">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute top-0 left-0 h-full w-full bg-[#003926]/20 origin-left"
                        />
                        <div className="absolute top-0 left-0 h-full w-0 group-hover:w-full bg-[#003926] transition-all duration-700 origin-left" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function QualityFeatures() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]); // Parallax max 20px
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

    return (
        <section
            ref={containerRef}
            className={`relative w-full bg-transparent py-24 md:py-32 ${playfair.variable} ${poppins.variable} font-sans`}
        >
            <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 xl:px-24">

                {/* SECTION HEADER - STICKY-ISH FEEL */}
                <div className="mb-24 md:mb-32">
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[12px] tracking-[0.5em] uppercase text-[#003926] font-semibold mb-8"
                    >
                        THE STANDARD OF EXCELLENCE
                    </motion.p>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#1A1918] max-w-4xl tracking-tighter leading-[0.9] overflow-hidden">
                        {["Quality", "You", "Can", "Feel."].map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                className="inline-block mr-[0.3em] py-2"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h2>
                </div>

                {/* STORYTELLING SPLIT LAYOUT */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                    {/* LEFT: MACRO MATERIAL IMAGE (STICKY) */}
                    <div className="lg:sticky lg:top-32 w-full lg:w-5/12 h-[50vh] lg:h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-black/5">
                        <motion.div
                            style={{ y: imageY, scale: imageScale }}
                            className="absolute inset-0"
                        >
                            <Image
                                src="/images/img03.png"
                                alt="Material Macro Detail"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-[1.02] filter brightness-[1.02]"
                            />
                            {/* Texture Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#003926]/5 via-transparent to-white/10 mix-blend-soft-light" />
                        </motion.div>

                        {/* Subtle Edge Glow instead of heavy shadow */}
                        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.05)] pointer-events-none" />
                    </div>

                    {/* RIGHT: STORYTELLING POINTS */}
                    <div className="w-full lg:w-7/12 flex flex-col">
                        {features.map((feature, i) => (
                            <FeatureItem key={i} feature={feature} index={i} />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .font-serif {
                    font-family: var(--font-playfair), serif;
                }
            `}</style>
        </section>
    );
}
