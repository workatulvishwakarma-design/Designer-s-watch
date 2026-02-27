"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GrainOverlay from "./GrainOverlay";

interface PageHeroProps {
    brand: string;
    breadcrumb: string;
    eyebrow: string;
    titleFirst: string;
    titleSecond: string;
    titleSecondColor?: string;
    subtext: string;
    stats: { label: string; value: string }[];
    image: string;
    pills?: string[];
}

export default function PageHero({
    brand,
    breadcrumb,
    eyebrow,
    titleFirst,
    titleSecond,
    titleSecondColor = "#B8935A",
    subtext,
    stats,
    image,
    pills
}: PageHeroProps) {
    return (
        <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#FAF8F4]">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none z-0" style={{
                background: `
                    radial-gradient(ellipse at 70% 50%, #F0EBE0 0%, #FAF8F4 60%),
                    radial-gradient(ellipse at 0% 0%, rgba(212,170,114,0.12) 0%, transparent 55%)
                `
            }} />

            <GrainOverlay />

            {/* Decorative Large Watermark */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 select-none pointer-events-none z-0 opacity-10 leading-none">
                <span className="font-display text-[180px] lg:text-[300px] text-transparent tracking-tighter" style={{ WebkitTextStroke: '1px #B8935A' }}>
                    {brand}
                </span>
            </div>

            {/* Floating Gold Orbs */}
            <motion.div
                className="absolute w-[400px] h-[400px] top-[-100px] right-[100px] rounded-full blur-[60px] pointer-events-none z-0"
                style={{ background: 'radial-gradient(circle, rgba(184,147,90,0.08) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute w-[200px] h-[200px] bottom-[-50px] left-[50px] rounded-full blur-[40px] pointer-events-none z-0"
                style={{ background: 'radial-gradient(circle, rgba(0,57,38,0.05) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Corner Ornaments */}
            <CornerOrnament className="top-12 right-12 opacity-20" />
            <CornerOrnament className="bottom-12 left-12 opacity-20 rotate-180" />

            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left Content */}
                <div className="flex flex-col items-start text-left">
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-[10px] font-body tracking-[0.2em] font-medium mb-10 text-gold"
                    >
                        {breadcrumb}
                    </motion.p>

                    <motion.span
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-[11px] font-body tracking-[0.3em] uppercase mb-4 text-[#003926]"
                    >
                        {eyebrow}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-[52px] md:text-[72px] leading-[1.05] mb-8 text-primaryText"
                    >
                        <span className="font-heading font-light italic">
                            {titleFirst}
                        </span>
                        <br />
                        <span className="font-heading font-semibold" style={{ color: titleSecondColor }}>
                            {titleSecond}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="font-body font-light text-[16px] leading-relaxed max-w-[480px] mb-12 text-secondaryText"
                    >
                        {subtext}
                    </motion.p>

                    {/* Filter Pills */}
                    {pills && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap gap-2 mb-12"
                        >
                            {pills.map((pill, idx) => (
                                <span
                                    key={idx}
                                    className="px-5 py-2.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-[10px] font-body tracking-widest uppercase hover:bg-gold/10 transition-colors"
                                >
                                    {pill}
                                </span>
                            ))}
                        </motion.div>
                    )}

                    {/* Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex items-center gap-12 bg-white/40 backdrop-blur-sm p-8 border-l border-gold rounded-r-2xl"
                    >
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col relative">
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold" />
                                <span className="font-display text-2xl tracking-wide mb-1 text-gold">
                                    {stat.value}
                                </span>
                                <span className="text-[10px] font-body tracking-tighter uppercase text-secondaryText">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Image with Halo Effect */}
                <div className="relative flex justify-center lg:justify-end">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10"
                    >
                        {/* Halo Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-gold/15 pointer-events-none"
                            style={{ boxShadow: 'inset 0 0 60px rgba(184,147,90,0.05)' }}
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full border border-gold/10 pointer-events-none"
                        />

                        {/* Watch Image */}
                        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                            <div className="relative w-[340px] h-[500px] md:w-[440px] md:h-[600px]">
                                <Image
                                    src={image}
                                    alt={brand}
                                    fill
                                    className="object-contain"
                                    style={{ filter: "drop-shadow(0 40px 80px rgba(184,147,90,0.25))" }}
                                    priority
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}

function CornerOrnament({ className }: { className: string }) {
    return (
        <svg width="60" height="60" className={`absolute pointer-events-none z-10 text-[#B8935A] ${className}`} fill="none" stroke="currentColor">
            <path d="M60 0 L60 60" strokeWidth="0.5" />
            <path d="M0 0 L60 0" strokeWidth="0.5" />
            <path d="M60 0 L40 0 L40 20" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}
