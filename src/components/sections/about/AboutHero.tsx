"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import GrainOverlay from "@/components/ui/GrainOverlay";

export default function AboutHero() {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section className="relative w-full min-h-[95vh] bg-[#FAF8F4] overflow-hidden flex items-center pt-24 pb-16">
            {/* Background Decorative Art */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(circle at 70% 30%, rgba(184, 147, 90, 0.05) 0%, transparent 70%)"
                    }}
                />

                {/* Large Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.03] z-0">
                    <span className="text-[20vw] font-display uppercase tracking-[-0.05em] text-[#1A1918]">
                        Legacy
                    </span>
                </div>

                {/* Floating Orbs */}
                <motion.div
                    animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-[80px]"
                    style={{ backgroundColor: "#B8935A" }}
                />
                <motion.div
                    animate={{ y: [0, 40, 0], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px]"
                    style={{ backgroundColor: "#003926" }}
                />
            </div>

            <GrainOverlay />

            <div className="container mx-auto px-6 md:px-12 xl:px-24 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                    {/* Left Side: Product Focus with Halo */}
                    <motion.div
                        style={{ y: y1, opacity }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-6 relative flex justify-center order-2 lg:order-1"
                    >
                        {/* Halo Rings */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border border-gold/10"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-8 rounded-full border border-gold/5"
                            />
                        </div>

                        <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px]">
                            <Image
                                src="/images/aboutBanner.png"
                                alt="35 Years of Legacy"
                                fill
                                className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)]"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Right Side: Typography Emphasis */}
                    <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <span className="inline-block px-4 py-1.5 border border-gold/30 text-gold text-[10px] tracking-[0.4em] uppercase font-body rounded-full">
                                Established 1991
                            </span>

                            <h1 className="flex flex-col gap-2">
                                <motion.span
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="text-7xl md:text-9xl font-heading font-light italic text-[#1A1918]"
                                >
                                    35 Years
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                    className="text-4xl md:text-6xl font-heading font-semibold text-[#003926] tracking-tight"
                                >
                                    of Unrivaled Legacy.
                                </motion.span>
                            </h1>

                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="w-24 h-px bg-gold origin-left mx-auto lg:mx-0"
                            />

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.8 }}
                                className="text-3xl md:text-5xl lg:text-6xl font-heading font-light leading-[1.1] text-[#1A1918]/70"
                            >
                                Still Defining <span className="italic">Every Second.</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 1 }}
                                className="text-lg text-secondaryText font-body font-light max-w-lg leading-relaxed pt-4"
                            >
                                Experience the four generations of horological expertise that bridge traditional craftsmanship with modern luxury.
                            </motion.p>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-px h-12 bg-gold/30 animate-pulse" />
                <span className="text-[9px] tracking-[0.3em] uppercase text-gold/60">Scroll</span>
            </motion.div>
        </section>
    );
}
