"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Truck, Lock, Shield, Wrench, MessageCircle } from "lucide-react";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"], variable: "--font-playfair" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-poppins" });

const trustItems = [
    {
        id: "shipping",
        icon: Truck,
        title: "Fast & Reliable Shipping",
        desc: "Pan-India delivery within 5–7 business days",
    },
    {
        id: "checkout",
        icon: Lock,
        title: "Secure Checkout",
        desc: "256-bit SSL encrypted payments",
    },
    {
        id: "support",
        icon: MessageCircle,
        title: "Expert Support",
        desc: "Dedicated care team ready to help",
    },
    {
        id: "warranty",
        icon: Shield,
        title: "Warranty Protection",
        desc: "12-month manufacturer warranty included",
    },
    {
        id: "service",
        icon: Wrench,
        title: "Service Assistance",
        desc: "Authorised service centres nationwide",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.15,
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 70, damping: 18 }
    }
};

const FeatureItem = ({
    item,
    index,
}: {
    item: typeof trustItems[0],
    index: number,
}) => {
    const Icon = item.icon;

    return (
        <motion.div
            variants={itemVariants}
            className="w-full md:w-[calc(50%-3rem)] lg:w-[calc(33.333%-3rem)] flex flex-col items-center text-center group"
        >
            {/* Floating Icon Circle */}
            <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{
                    duration: 3.5 + index * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                whileHover={{
                    y: -8,
                    scale: 1.08,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="relative flex items-center justify-center w-[72px] h-[72px] rounded-full bg-[#003926] shadow-lg mb-6 cursor-pointer"
            >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 rounded-full bg-[#003926] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 scale-150" />
                <Icon size={28} className="relative z-10 text-white" strokeWidth={1.5} />
            </motion.div>

            {/* Title */}
            <h4 className="font-cormorant font-semibold text-xl md:text-2xl text-[#1A1918] leading-tight mb-2 group-hover:text-[#003926] transition-colors duration-300">
                {item.title}
            </h4>

            {/* Description */}
            <p className="font-dm font-light text-[14px] leading-relaxed text-[#1A1918]/60 max-w-[260px]">
                {item.desc}
            </p>
        </motion.div>
    );
};

export default function TrustGrid() {
    return (
        <section className={`relative w-full py-28 md:py-36 overflow-hidden bg-[#EAE2D5] ${playfair.variable} ${poppins.variable} font-sans`}>

            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-center">

                {/* HEADINGS */}
                <div className="flex flex-col items-center text-center mb-20 md:mb-24">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-[11px] tracking-[0.35em] uppercase text-[#1A1918]/50 font-dm font-medium mb-5"
                    >
                        FOUNDATION OF EXCELLENCE
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="text-4xl md:text-5xl lg:text-6xl font-cormorant text-[#1A1918] tracking-tight"
                    >
                        Built on Trust.
                    </motion.h2>
                </div>

                {/* TRUST FEATURES — 3-2 LAYOUT */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="flex flex-wrap justify-center gap-y-16 gap-x-12 xl:gap-x-16 w-full"
                >
                    {trustItems.map((item, index) => (
                        <FeatureItem key={item.id} item={item} index={index} />
                    ))}
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
