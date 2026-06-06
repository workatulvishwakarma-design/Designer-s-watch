"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroBanner() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "#0A0A09" }}
        >
            {/* FULL WIDTH VIDEO BACKGROUND */}
            <motion.div 
                className="absolute inset-0 z-0 w-full h-full"
                style={{ y, scale }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover cinematic-zoom"
                    style={{ willChange: "transform" }}
                    src="/images/new-img/video/D_SIGNER shot video 01.mp4"
                />
                
                {/* Multi-layer dark emerald overlay gradient */}
                <div 
                    className="absolute inset-0 pointer-events-none" 
                    style={{
                        background: "linear-gradient(180deg, rgba(0,20,12,0.65) 0%, rgba(0,57,38,0.20) 25%, rgba(0,0,0,0.10) 45%, rgba(0,57,38,0.15) 65%, rgba(0,20,12,0.55) 85%, rgba(0,10,6,0.80) 100%)"
                    }}
                />
                
                {/* Cinematic vignette */}
                <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,10,6,0.60) 100%)"
                    }}
                />

                {/* Emerald ambient glow — center */}
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none opacity-15 blur-[120px]"
                    style={{ background: "radial-gradient(ellipse, rgba(0,57,38,0.6), transparent)" }}
                />

                {/* Emerald blur glow — bottom */}
                <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] pointer-events-none opacity-20 blur-[100px]"
                    style={{ background: "radial-gradient(ellipse, rgba(0,80,50,0.5), transparent)" }}
                />

                {/* Glass overlay shimmer */}
                <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 30%, rgba(255,255,255,0.015) 50%, transparent 70%, rgba(255,255,255,0.01) 100%)"
                    }}
                />

                {/* Edge blur effect */}
                <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        boxShadow: "inset 0 0 200px 40px rgba(0,10,6,0.5)"
                    }}
                />
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
            >
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"
                />
            </motion.div>
        </section>
    );
}
