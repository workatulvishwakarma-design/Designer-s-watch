"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Truck, Lock, Shield, Wrench, MessageCircle } from "lucide-react";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"], variable: "--font-playfair" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-poppins" });

const trustItems = [
    {
        icon: Truck,
        title: "Fast & Reliable Shipping",
        desc: "Pan-India delivery within 5–7 business days",
        position: { top: "12%", left: "8%" },
        delay: 0.15,
        rotation: -2
    },
    {
        icon: Lock,
        title: "Secure Checkout",
        desc: "256-bit SSL encrypted payments",
        position: { top: "28%", left: "72%" },
        delay: 0.35,
        rotation: 3
    },
    {
        icon: Shield,
        title: "Warranty Protection",
        desc: "12-month manufacturer warranty included",
        position: { top: "62%", left: "10%" },
        delay: 0.55,
        rotation: 1
    },
    {
        icon: Wrench,
        title: "Service Assistance",
        desc: "Authorised service centres nationwide",
        position: { top: "75%", left: "68%" },
        delay: 0.8,
        rotation: -3
    },
    {
        icon: MessageCircle,
        title: "Expert Support",
        desc: "Dedicated care team ready to help",
        position: { top: "48%", left: "42%" },
        delay: 0.45,
        rotation: 0
    },
];

const Word = ({ children, delay }: { children: string; delay: number }) => (
    <motion.span
        initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block mr-[0.3em]"
    >
        {children}
    </motion.span>
);

const FloatingPanel = ({ item, index }: { item: typeof trustItems[0], index: number }) => {
    const Icon = item.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9, rotate: item.rotation }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: item.rotation }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, delay: item.delay, ease: [0.22, 1, 0.36, 1] }}
            style={{
                top: item.position.top,
                left: item.position.left,
            }}
            className="absolute hidden lg:flex flex-col items-center text-center p-10 w-[240px] rounded-3xl bg-white/30 backdrop-blur-2xl border border-white/40 shadow-[0_30px_60px_rgba(0,0,0,0.03)] transition-all duration-1000 group cursor-default hover:bg-white/50 hover:border-[#003926]/10 hover:shadow-[0_45px_100px_rgba(0,0,0,0.06)]"
        >
            {/* Architectural Flow Animation */}
            <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: index * 0.7 }}
                className="w-full flex flex-col items-center"
            >
                <div className="mb-8 p-5 rounded-full bg-[#003926]/5 transition-all duration-700 group-hover:bg-[#003926]/10 text-[#003926]">
                    <Icon size={36} strokeWidth={1} className="transition-all duration-700 group-hover:scale-110" />
                </div>
                <h4 className="font-sans font-semibold text-[16px] mb-4 text-[#1A1918] tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.title}
                </h4>
                <p className="font-sans font-light text-[14px] leading-relaxed text-[#9C9690] px-2">
                    {item.desc}
                </p>
            </motion.div>
        </motion.div>
    );
};

export default function TrustGrid() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section
            ref={containerRef}
            className={`relative min-h-screen py-20 md:py-32 w-full flex flex-col items-center justify-center overflow-hidden bg-transparent ${playfair.variable} ${poppins.variable} font-sans`}
        >
            {/* Luxury Showroom Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] opacity-20 pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(255,255,255,1) 0%, transparent 80%)", filter: "blur(120px)" }}
                />
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <filter id="noiseFilterTrustRefined">
                            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseFilterTrustRefined)" />
                    </svg>
                </div>
            </div>

            {/* STICKY-LIKE CONTENT AREA */}
            <div className="relative z-10 w-full max-w-screen-2xl px-6 flex flex-col items-center justify-center min-h-[800px]">

                {/* REFINED HEADLINE */}
                <div className="relative mb-24 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[12px] tracking-[0.6em] uppercase text-[#003926] font-semibold mb-10 opacity-60"
                    >
                        Foundation of Excellence
                    </motion.p>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#1A1918] mb-12 tracking-tight">
                        {"Built on Trust.".split(" ").map((word, i) => (
                            <Word key={i} delay={0.2 + i * 0.15}>{word}</Word>
                        ))}
                    </h2>

                    {/* Architectural Accent Line */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="h-[1px] w-[200px] bg-gradient-to-r from-transparent via-[#003926]/40 to-transparent mx-auto"
                    />
                </div>

                {/* CONTROLLED IMBALANCE PANELS - DESKTOP */}
                <div className="absolute inset-0 pointer-events-none hidden lg:block">
                    <div className="relative w-full h-full pointer-events-auto">
                        {trustItems.map((item, i) => (
                            <FloatingPanel key={i} item={item} index={i} />
                        ))}
                    </div>
                </div>

                {/* MOBILE LIST LAYOUT - MORE GENEROUS SPACING */}
                <div className="lg:hidden w-full max-w-lg mx-auto flex flex-col gap-12 relative z-20 pb-20">
                    {trustItems.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col items-center text-center p-12 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/50 shadow-sm"
                            >
                                <div className="mb-6 text-[#003926] opacity-80">
                                    <Icon size={32} strokeWidth={1} />
                                </div>
                                <h4 className="text-xl font-serif font-medium text-[#1A1918] mb-4 tracking-widest uppercase">{item.title}</h4>
                                <p className="text-base text-[#9C9690] font-light leading-relaxed">{item.desc}</p>
                            </motion.div>
                        );
                    })}
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
