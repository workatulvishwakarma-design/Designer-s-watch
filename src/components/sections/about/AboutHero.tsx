"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function AboutHero() {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    return (
        <section className="relative w-full min-h-[95vh] overflow-hidden flex items-center pt-24 pb-16"
          style={{ background: "#0A0A09" }}>
            
            {/* Cinematic background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/new-img/pillars/6.JPG"
                    alt="Designer World Heritage"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 30%" }}
                    priority
                />
                {/* Multi-layer cinematic overlay */}
                <div className="absolute inset-0" style={{
                    background: "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.50) 70%, rgba(0,0,0,0.80) 100%)"
                }} />
                <div className="absolute inset-0" style={{
                    background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)"
                }} />
                {/* Subtle green ambient */}
                <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] pointer-events-none opacity-15 blur-[100px]"
                    style={{ background: "radial-gradient(ellipse, rgba(0,57,38,0.5), transparent)" }}
                />
            </div>

            <div className="container mx-auto px-6 md:px-12 xl:px-24 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Left Side: Typography Emphasis */}
                    <motion.div 
                        style={{ opacity }}
                        className="lg:col-span-12 flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="space-y-6"
                        >
                            <span className="inline-block px-4 py-1.5 border border-white/20 text-[#B8935A] text-[10px] tracking-[0.4em] uppercase font-body rounded-full backdrop-blur-sm">
                                Established 1940 · Four Generations
                            </span>

                            <h1 className="flex flex-col gap-3">
                                <motion.span
                                    initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    transition={{ duration: 1.2, delay: 0.5 }}
                                    className="text-6xl md:text-8xl lg:text-9xl font-heading font-light italic text-white leading-[0.95]"
                                >
                                    Earning Trust
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    transition={{ duration: 1.2, delay: 0.7 }}
                                    className="text-3xl md:text-5xl lg:text-6xl font-heading font-semibold text-white/90 tracking-tight"
                                >
                                    One Watch at a Time<span className="text-[#003926]">.</span>
                                </motion.span>
                            </h1>

                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.9 }}
                                className="w-24 h-px origin-left mx-auto lg:mx-0"
                                style={{ background: "linear-gradient(90deg, #003926, #B8935A, transparent)" }}
                            />

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 1.1 }}
                                className="text-lg text-white/60 font-body font-light max-w-lg leading-relaxed pt-2"
                            >
                                From a modest horology setup in Amritsar to a multi-brand global watch enterprise. Four generations of uncompromised expertise, integrity, and innovation.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 1.3 }}
                                className="flex flex-wrap gap-3 pt-4"
                            >
                                <span className="px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-dm text-white/70 border border-white/10 backdrop-blur-sm">
                                    20+ International Brands
                                </span>
                                <span className="px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-dm text-white/70 border border-white/10 backdrop-blur-sm">
                                    500+ Private Labels
                                </span>
                                <span className="px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-dm text-white/70 border border-white/10 backdrop-blur-sm">
                                    100+ MBOs
                                </span>
                            </motion.div>
                        </motion.div>
                    </motion.div>


                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            >
                <motion.div 
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
                />
                <span className="text-[9px] tracking-[0.3em] uppercase text-white/40">Scroll</span>
            </motion.div>
        </section>
    );
}
