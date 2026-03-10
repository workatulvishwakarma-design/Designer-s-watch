"use client";

import React from "react";
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
        delay: 0.1,
        rotation: -1,
        yOffset: 20
    },
    {
        icon: Lock,
        title: "Secure Checkout",
        desc: "256-bit SSL encrypted payments",
        delay: 0.2,
        rotation: 2,
        yOffset: 0
    },
    {
        icon: MessageCircle,
        title: "Expert Support",
        desc: "Dedicated care team ready to help",
        delay: 0.3,
        rotation: 0,
        yOffset: -20
    },
    {
        icon: Shield,
        title: "Warranty Protection",
        desc: "12-month manufacturer warranty included",
        delay: 0.4,
        rotation: 1,
        yOffset: 40
    },
    {
        icon: Wrench,
        title: "Service Assistance",
        desc: "Authorised service centres nationwide",
        delay: 0.5,
        rotation: -2,
        yOffset: 10
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
};

const FeatureCard = ({
    item,
    index,
}: {
    item: typeof trustItems[0],
    index: number,
}) => {
    const Icon = item.icon;

    return (
        <motion.div
            variants={cardVariants as any}
            className="w-full flex justify-center"
        >
            <motion.div
                animate={{
                    y: [item.yOffset, item.yOffset - 10, item.yOffset],
                    rotate: [item.rotation, item.rotation + 0.5, item.rotation]
                }}
                transition={{
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse"
                }}
                whileHover={{
                    y: item.yOffset - 15,
                    scale: 1.03,
                    rotate: 0,
                    transition: { type: "spring", stiffness: 400, damping: 25, duration: 0.3 }
                }}
                className="group relative w-full h-full max-w-[360px] flex flex-col p-8 md:p-10 bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,57,38,0.08)] hover:border-white transition-all overflow-hidden"
            >
                {/* Subtle Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-[#FAF8F4] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                <div className="relative z-10 flex flex-col items-start h-full">
                    {/* Icon Container with elegant glow */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-[#003926] blur-xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-full scale-150" />
                        <div className="relative p-4 rounded-2xl bg-gradient-to-br from-[#FAF8F4] to-white border border-[#1A1918]/5 group-hover:bg-gradient-to-br group-hover:from-[#003926] group-hover:to-[#002619] group-hover:shadow-lg shadow-[#003926]/20 transition-all duration-500">
                            <Icon size={28} className="text-[#003926] group-hover:text-[#B8935A] transition-colors duration-500" strokeWidth={1.5} />
                        </div>
                    </div>

                    <h4 className="font-cormorant font-semibold text-2xl md:text-[28px] text-[#1A1918] mb-3 group-hover:text-[#003926] transition-colors duration-300 leading-tight">
                        {item.title}
                    </h4>

                    <p className="font-dm font-light text-[15px] leading-[1.7] text-[#6B6560] mt-auto">
                        {item.desc}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function TrustGrid() {
    return (
        <section className={`relative w-full py-24 md:py-40 overflow-hidden bg-[#FAF8F4] ${playfair.variable} ${poppins.variable} font-sans`}>

            {/* LUXURY BACKGROUND DESIGN */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Center Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[600px] bg-gradient-to-b from-[#003926]/5 to-transparent blur-3xl opacity-70" />

                {/* Corner Accents */}
                <div className="absolute top-20 -left-20 w-96 h-96 bg-[#D4AA72]/10 blur-[100px] rounded-full mix-blend-multiply" />
                <div className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-[#003926]/5 blur-[120px] rounded-full mix-blend-multiply" />

                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.015] mix-blend-multiply" style={{ backgroundImage: "url('/images/noise.png')", backgroundSize: "100px 100px" }} />
            </div>

            <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12">

                {/* HEADINGS */}
                <div className="flex flex-col items-center text-center mb-24 md:mb-32 relative">
                    {/* Decorative accent behind text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-[#B8935A]/5 blur-2xl rounded-[100%]" />

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#B8935A] to-transparent mb-8"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="text-[11px] tracking-[0.4em] uppercase text-[#B8935A] font-dm font-semibold mb-6"
                    >
                        FOUNDATION OF EXCELLENCE
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="text-5xl md:text-7xl lg:text-[88px] font-cormorant text-[#1A1918] tracking-tight leading-[0.9] relative"
                    >
                        Built on Trust.
                    </motion.h2>
                </div>

                {/* ANIMATED GRID LAYOUT */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-center justify-center 2xl:px-12"
                >

                    {/* Left Column (2 Cards) */}
                    <div className="flex flex-col gap-8 md:gap-16 lg:mt-20">
                        <FeatureCard item={trustItems[0]} index={0} />
                        <FeatureCard item={trustItems[1]} index={1} />
                    </div>

                    {/* Center Column (1 Card - Highlights the main focus) */}
                    <div className="flex flex-col justify-center items-center lg:-mt-24">
                        <FeatureCard item={trustItems[2]} index={2} />
                    </div>

                    {/* Right Column (2 Cards) */}
                    <div className="flex flex-col gap-8 md:gap-16 lg:mt-40">
                        <FeatureCard item={trustItems[3]} index={3} />
                        <FeatureCard item={trustItems[4]} index={4} />
                    </div>

                </motion.div>
            </div>

            <style jsx global>{`
                .font-serif {
                    font-family: var(--font-playfair), serif;
                }
            `}</style>
        </section>
    );
}
