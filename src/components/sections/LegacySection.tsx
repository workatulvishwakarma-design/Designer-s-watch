"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function LegacySection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="py-24 md:py-36 bg-white text-[#1A1918] relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 xl:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col gap-6"
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif max-w-lg leading-tight">
                            Rooted in the 1940s.<br /> Designed for Today.
                        </h2>
                        <p className="text-base md:text-lg font-sans font-light opacity-80 max-w-md leading-relaxed">
                            Founded in the 1940s, Designer World represents four generations of continuous horological growth. We bridge the gap between traditional craftsmanship and rigorous modern manufacturing standards to deliver unparalleled quality.
                        </p>

                        <div className="pt-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="pb-1 border-b-[1px] border-[#1A1918]/20 hover:border-[#1A1918] transition-colors font-sans tracking-widest uppercase text-sm"
                            >
                                Discover Our Story
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Parallax Image / Mask Reveal */}
                    <motion.div
                        style={{ y, opacity }}
                        className="relative h-[60vh] w-full rounded-sm overflow-hidden group"
                    >
                        <motion.div
                            className="absolute inset-0 bg-[#003926]/10 z-10 origin-left"
                            initial={{ scaleX: 1 }}
                            whileInView={{ scaleX: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        />
                        <Image
                            src="/images/legacy-craftsmanship.png"
                            alt="Legacy craftsmanship"
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
