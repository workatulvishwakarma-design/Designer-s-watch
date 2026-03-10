"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const features = [
    {
        id: "01",
        title: "316L Surgical Steel",
        desc: "Surgical grade stainless steel construction for high corrosion resistance and a lasting premium mirror finish.",
        bg: "bg-white",
        wrapperClasses: "lg:-rotate-2 lg:-translate-x-4 lg:translate-y-0 z-10",
    },
    {
        id: "02",
        title: "5–10 ATM Resistance",
        desc: "Certified water resistance engineering that ensures reliability from daily splashes to deep immersion.",
        bg: "bg-[#FAF8F4]",
        wrapperClasses: "lg:rotate-3 lg:translate-x-8 lg:-translate-y-8 z-20",
    },
    {
        id: "03",
        title: "Sapphire-Coated Glass",
        desc: "Superior scratch-resistant crystalline finish with anti-reflective coating for perpetual dial clarity.",
        bg: "bg-[#F2EDE6]",
        wrapperClasses: "lg:-rotate-1 lg:-translate-x-2 lg:-translate-y-12 z-30",
    },
    {
        id: "04",
        title: "Japanese Precision",
        desc: "Hyper-accurate quartz movements delivering chronometric precision within seconds per month.",
        bg: "bg-white",
        wrapperClasses: "lg:rotate-2 lg:translate-x-6 lg:-translate-y-20 z-40",
    },
    {
        id: "05",
        title: "PVD Ionic Plating",
        desc: "Advanced physical vapor deposition for deep color bonding that never chips or fades over decades.",
        bg: "bg-[#FAF8F4]",
        wrapperClasses: "lg:-rotate-3 lg:-translate-x-6 lg:-translate-y-28 z-50",
    },
];

export default function QualityFeatures() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-transparent py-24 md:py-32"
        >
            <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 xl:px-24">

                {/* SECTION HEADER */}
                <div className="mb-20 md:mb-28 text-center lg:text-left">
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-[12px] tracking-[0.5em] uppercase text-[#003926] font-semibold mb-6 flex items-center justify-center lg:justify-start gap-4 font-dm"
                    >
                        <span className="hidden md:block w-8 h-px bg-[#003926]" />
                        THE STANDARD OF EXCELLENCE
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                        className="text-4xl md:text-6xl lg:text-7xl font-cormorant text-[#1A1918] max-w-3xl tracking-tight leading-[1.1]"
                    >
                        Quality You Can Feel.
                    </motion.h2>
                </div>

                {/* TWO COLUMN PINNED LAYOUT */}
                <div className="flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-20 items-start">

                    {/* LEFT: MACRO MATERIAL IMAGE (STICKY) */}
                    <div className="relative w-full lg:w-5/12 h-[260px] sm:h-[300px] md:h-[400px] lg:h-[80vh] lg:sticky lg:top-32 rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl border border-black/5 z-10 flex-shrink-0">
                        <motion.div
                            style={{ y: imageY, scale: imageScale }}
                            className="absolute inset-0 w-full h-full transform-gpu"
                        >
                            <Image
                                src="/images/img03.png"
                                alt="Material Quality Detail"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#003926]/10 via-transparent to-white/10 mix-blend-soft-light" />
                        </motion.div>
                        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.05)] pointer-events-none" />
                    </div>

                    {/* RIGHT: PINNED CARDS */}
                    <div className="w-full lg:w-7/12 relative flex flex-col gap-8 sm:grid sm:grid-cols-2 lg:flex lg:flex-col lg:items-center lg:-mb-24 pt-4">

                        {/* Dotted Connection Line - only visible on desktop */}
                        <div className="hidden lg:block absolute left-1/2 top-10 bottom-32 w-0 border-l-[2px] border-dashed border-[#003926]/20 -translate-x-1/2 z-0" />

                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                                className={`relative w-full sm:w-auto lg:w-[75%] max-w-md mx-auto transform-gpu ${feature.wrapperClasses}`}
                            >
                                <motion.div
                                    whileHover={{
                                        y: -10,
                                        scale: 1.02,
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className={`relative p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#1A1918]/5 ${feature.bg} h-full group`}
                                >
                                    {/* Pin Element */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-br from-[#003926] to-[#002619] shadow-md shadow-black/20 flex items-center justify-center border-2 border-white/60 z-20 group-hover:scale-110 transition-transform duration-300">
                                        <div className="w-2 h-2 rounded-full bg-[#B8935A] opacity-90 shadow-inner" />
                                    </div>

                                    {/* Card Content */}
                                    <div className="space-y-4 pt-2">
                                        <div className="font-dm text-[#B8935A] font-bold text-sm tracking-[0.2em]">
                                            {feature.id}
                                        </div>
                                        <h4 className="text-2xl md:text-3xl font-cormorant text-[#1A1918] font-semibold leading-tight">
                                            {feature.title}
                                        </h4>
                                        <p className="text-[#6B6560] font-dm text-[15px] md:text-base leading-[1.8] font-light">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
