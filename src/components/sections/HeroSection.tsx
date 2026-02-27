"use client";

import { useRef, Component, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import HeroScene from "../canvas/HeroScene";

/* Error Boundary for WebGL Canvas */
class CanvasErrorBoundary extends Component<
    { children: ReactNode; fallback: ReactNode },
    { hasError: boolean }
> {
    constructor(props: { children: ReactNode; fallback: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}

const marqueeItems = [
    "Stainless Steel Construction",
    "5–10 ATM Water Resistance",
    "Sapphire Coated Glass",
    "OEM & ODM Watch Solutions",
    "Trusted by Global Brands",
    "Durability Meets Design",
    "Since 1940s",
    "4 Generations of Excellence",
];

const wordVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            delay: i * 0.12,
        } as any,
    }),
};

export default function HeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();
    const heroProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    return (
        <>
            <section
                ref={sectionRef}
                className="relative w-full min-h-screen overflow-hidden"
                style={{ backgroundColor: "#FAF8F4" }}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center min-h-screen relative z-10">
                    {/* LEFT SIDE — Text Content (45%) */}
                    <div className="w-full lg:w-[45%] flex flex-col justify-center py-32 lg:py-0 relative z-20">
                        {/* Top Label */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-body text-[11px] tracking-[0.25em] uppercase mb-8"
                            style={{ color: "#003926" }}
                        >
                            Designer World × Nagpal Group
                        </motion.p>

                        {/* Main Headline */}
                        <div className="mb-7">
                            <motion.h1
                                className="font-heading text-[48px] md:text-[64px] lg:text-[72px] leading-[1.05]"
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.span
                                    custom={0}
                                    variants={wordVariants}
                                    className="block font-light italic"
                                    style={{ color: "#1A1918" }}
                                >
                                    Your Vision.
                                </motion.span>
                                <motion.span
                                    custom={1}
                                    variants={wordVariants}
                                    className="block font-light italic"
                                    style={{ color: "#1A1918" }}
                                >
                                    Our
                                </motion.span>
                                <motion.span
                                    custom={2}
                                    variants={wordVariants}
                                    className="block font-semibold"
                                    style={{ color: "#003926" }}
                                >
                                    Watchmaking.
                                </motion.span>
                            </motion.h1>
                        </div>

                        {/* Gold Divider */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="w-[50px] h-[1px] origin-left mb-7"
                            style={{ backgroundColor: "#003926" }}
                        />

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="font-body font-light text-[16px] leading-[1.8] max-w-[380px] mb-7"
                            style={{ color: "#5C5750" }}
                        >
                            Premium timepieces crafted with international standards and
                            four generations of horological expertise.
                        </motion.p>

                        {/* Since Badge */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            className="inline-block w-fit font-body text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 mb-8 border"
                            style={{ color: "#003926", borderColor: "#003926" }}
                        >
                            Since 1940s
                        </motion.span>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <button
                                className="px-8 py-3.5 font-body text-[12px] tracking-[0.1em] uppercase text-white transition-all duration-300 hover:bg-gold hover:border-gold border"
                                style={{
                                    backgroundColor: "#1A1918",
                                    borderColor: "#1A1918",
                                }}
                            >
                                Explore Collection
                            </button>
                            <button
                                className="px-8 py-3.5 font-body text-[12px] tracking-[0.1em] uppercase bg-transparent transition-all duration-300 border hover:bg-gold-muted"
                                style={{
                                    color: "#1A1918",
                                    borderColor: "#003926",
                                }}
                            >
                                Our Legacy
                            </button>
                        </motion.div>

                        {/* Scroll Indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4 }}
                            className="hidden lg:flex flex-col items-center gap-3 mt-16"
                            style={{ alignSelf: "flex-start" }}
                        >
                            <div
                                className="w-[1px] h-[40px] animate-pulse"
                                style={{ backgroundColor: "#E8D9C0" }}
                            />
                            <span
                                className="font-body text-[9px] tracking-[0.3em] uppercase"
                                style={{
                                    color: "#9C9690",
                                    writingMode: "vertical-rl",
                                }}
                            >
                                Scroll
                            </span>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE — Watch Product Image (55%) */}
                    <div className="hidden sm:flex w-full lg:w-[55%] h-[60vh] lg:h-screen relative items-center justify-center">
                        <motion.div
                            animate={{ y: [-8, 8, -8] }}
                            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                            className="relative w-[320px] h-[450px] lg:w-[420px] lg:h-[580px]"
                        >
                            <Image
                                src="/images/img01.png"
                                alt="Designer World Watch"
                                fill
                                className="object-contain"
                                priority
                                style={{ filter: "drop-shadow(0 30px 60px rgba(0,57,38,0.3))" }}
                            />
                        </motion.div>
                        {/* Radial gradient fade */}
                        <div
                            className="absolute inset-0 pointer-events-none z-10"
                            style={{
                                background:
                                    "radial-gradient(ellipse at center, transparent 50%, #FAF8F4 100%)",
                            }}
                        />
                    </div>

                    {/* Mobile watch image */}
                    <div className="sm:hidden w-full flex justify-center py-8">
                        <motion.div
                            animate={{ y: [-6, 6, -6] }}
                            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                            className="relative w-[260px] h-[360px]"
                        >
                            <Image
                                src="/images/img01.png"
                                alt="Designer World Watch"
                                fill
                                className="object-contain"
                                priority
                                style={{ filter: "drop-shadow(0 20px 40px rgba(0,57,38,0.25))" }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Badge Strip */}
            <div
                className="w-full overflow-hidden py-3.5"
                style={{ backgroundColor: "#1A1918" }}
            >
                <div className="animate-marquee flex whitespace-nowrap">
                    {[...marqueeItems, ...marqueeItems].map((item, i) => (
                        <span
                            key={i}
                            className="flex items-center gap-6 mx-3 font-display text-[14px] tracking-[0.15em] uppercase"
                            style={{ color: "#003926" }}
                        >
                            {item}
                            <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: "#003926" }}
                            />
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}
