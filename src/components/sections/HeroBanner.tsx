"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function HeroBanner() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    useEffect(() => {
        const vid = videoRef.current;
        if (!vid) return;

        // Ensure video is muted for immediate browser autoplay compatibility
        vid.muted = true;

        // Eagerly trigger video playback as fast as possible
        const playPromise = vid.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                if (vid) {
                    vid.muted = true;
                    vid.play().catch(() => {});
                }
            });
        }
    }, []);

    const toggleMute = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const vid = videoRef.current;
        if (!vid) return;

        const nextMuted = !isMuted;
        vid.muted = nextMuted;
        setIsMuted(nextMuted);

        if (!nextMuted && vid.paused) {
            vid.play().catch(() => {});
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "#0A0A09" }}
        >
            {/* FULL WIDTH VIDEO BACKGROUND (No static images or poster) */}
            <motion.div 
                className="absolute inset-0 z-0 w-full h-full"
                style={{ 
                    y, 
                    scale,
                }}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover cinematic-zoom"
                    style={{ willChange: "transform" }}
                >
                    <source src="/images/new-img/video/D_SIGNER%20shot%20video%2001.mp4" type="video/mp4" />
                    <source src="/images/new-img/video/D_SIGNER shot video 01.mp4" type="video/mp4" />
                    <source src="/img/banner-34.mp4" type="video/mp4" />
                </video>
                
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

            {/* Premium Audio Control Toggle - Bottom Right */}
            <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-30">
                <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    title={isMuted ? "Unmute audio" : "Mute audio"}
                    className="group relative flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full backdrop-blur-md bg-black/45 hover:bg-black/70 border border-white/20 hover:border-[#B8935A]/70 shadow-[0_4px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_0_24px_rgba(184,147,90,0.35)] transition-all duration-300 cursor-pointer select-none"
                >
                    <span className="relative flex items-center justify-center text-white/80 group-hover:text-[#D4AA72] transition-colors duration-300">
                        {isMuted ? (
                            <VolumeX size={17} strokeWidth={1.8} className="transition-transform duration-200 group-hover:scale-110" />
                        ) : (
                            <Volume2 size={17} strokeWidth={1.8} className="transition-transform duration-200 group-hover:scale-110 text-[#D4AA72]" />
                        )}
                    </span>
                    <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium text-white/75 group-hover:text-white transition-colors duration-300">
                        {isMuted ? "Unmute" : "Sound On"}
                    </span>
                    {!isMuted && (
                        <span className="relative flex h-2 w-2 ml-0.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8935A] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AA72]" />
                        </span>
                    )}
                </button>
            </div>
        </section>
    );
}
