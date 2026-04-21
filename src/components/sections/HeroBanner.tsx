"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
});

export default function HeroBanner() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <section
            ref={containerRef}
            className={`relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden ${poppins.variable} font-sans bg-[#1A1918]`}
        >
            {/* FULL WIDTH VIDEO BACKGROUND */}
            <motion.div 
                className="absolute inset-0 z-0 w-full h-full"
                style={{ y, opacity }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/images/new-img/video/D_signer%20Video_HD.mp4"
                />
                
                {/* Elegant Overlay for Text Readability */}
                <div 
                    className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none" 
                />
                
                {/* Subtle Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
            </motion.div>

            {/* CONTENT OVERLAY */}
            <div className="relative z-20 w-full px-4 md:px-8 lg:px-24 flex flex-col items-center text-center space-y-6 md:space-y-8 mt-16 lg:mt-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-2"
                >
                    <span className="block text-[11px] md:text-[13px] font-semibold tracking-[0.4em] text-white/90 uppercase drop-shadow-md">
                        DESIGNER WORLD
                    </span>
                    <span className="block text-[9px] md:text-[11px] tracking-[0.2em] text-white/70 uppercase drop-shadow-md">
                        Nagpal Group Since 1940
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white leading-[1.05] drop-shadow-lg"
                >
                    Built on Legacy. <br />
                    <span className="text-white/90 italic font-light tracking-normal">Designed for Now.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-sm md:text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed font-light drop-shadow-md"
                >
                    Crafted with four generations of horological expertise. Designed for those who don't follow time — they set it.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 pt-4 md:pt-8 w-full"
                >
                    {/* Primary CTA */}
                    <button className="group relative px-8 md:px-12 py-4 md:py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full text-[12px] md:text-[13px] font-medium tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:bg-white hover:text-black hover:border-transparent hover:-translate-y-1 active:scale-95 w-full sm:w-auto shadow-lg">
                        <span className="relative z-10">Explore Collection</span>
                    </button>

                    {/* Secondary CTA */}
                    <button className="group relative py-2 text-white/90 hover:text-white text-[12px] md:text-[13px] font-semibold tracking-[0.2em] uppercase drop-shadow-md transition-colors duration-300">
                        Our Legacy
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left" />
                    </button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
            >
                <span className="text-[10px] text-white/60 tracking-[0.3em] uppercase font-light drop-shadow-md">Scroll</span>
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"
                />
            </motion.div>

            <style jsx global>{`
        :root {
          --font-poppins: ${poppins.style.fontFamily};
        }
      `}</style>
        </section>
    );
}
