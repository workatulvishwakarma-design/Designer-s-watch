"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Header from "../Header";

const slides = [
    {
        title: "Your Vision.\nOur Watchmaking.",
        description: "Premium timepieces crafted with international standards and four generations of horological expertise.",
        cta: "Shop Now",
        image: "/images/img3.png",
        hasTicker: true
    },
    {
        title: "Everyday \nReliability. Elevated.",
        description: "Quality watches built for comfort, durability, and value made to move with real life.",
        cta: "Shop Now",
        image: "/images/img2.png"
    },
    {
        title: "Built Behind \n500+ Private Labels.",
        description: "End-to-end OEM solutions trusted across India and international markets.",
        cta: "Explore More",
        image: "/images/img1.png"
    }
];

const tickerItems = [
    "STAINLESS STEEL CONSTRUCTION",
    "5-10 ATM WATER RESISTANCE",
    "SAPPHIRE COATED GLASS",
    "OEM & ODM WATCH SOLUTIONS",
    "TRUSTED BY GLOBAL BRANDS",
    "DURABILITY MEETS DESIGN"
];

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [isAutoPlaying]);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-[#1a1a1a] flex flex-col justify-center">
            <Header />

            {/* Background Images */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`bg-${currentSlide}`}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity" />
                </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="container mx-auto px-6 md:px-12 xl:px-24 z-10 relative h-full flex flex-col justify-center pt-24">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`content-${currentSlide}`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-5xl flex flex-col gap-8 md:gap-10"
                    >
                        <h1 className="text-3xl md:text-5xl font-serif text-white leading-[1.2] whitespace-pre-line drop-shadow-lg">
                            {slides[currentSlide].title}
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 max-w-md font-sans font-light leading-relaxed">
                            {slides[currentSlide].description}
                        </p>

                        <div className="flex items-center gap-6 mt-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-3 border border-white/30 rounded-full text-white font-sans text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
                            >
                                {slides[currentSlide].cta}
                            </motion.button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Progress Indicators */}
                <div className="absolute bottom-12 right-6 md:right-12 xl:right-24 flex items-center gap-4">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setCurrentSlide(i);
                                setIsAutoPlaying(false);
                            }}
                            className={`h-[2px] w-8 md:w-12 transition-all duration-500 ${currentSlide === i ? "bg-white" : "bg-white/20"
                                }`}
                        />
                    ))}
                </div>
            </div>

        </section>
    );
}
