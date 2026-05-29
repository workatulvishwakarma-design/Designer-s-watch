"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function AboutTimeline() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const timelineData = [
        {
            year: "1940s —",
            title: "The Beginning (Amritsar)",
            desc: "Shree Virbhan Nagpal starts a small horology setup in Amritsar, laying the foundation for what eventually becomes a national trading, manufacturing, and brand business in the watch industry.",
            align: "right",
            image: "/images/new-img/pillars/WhatsApp Image 2026-04-04 at 4.14.22 PM.jpeg"
        },
        {
            year: "2nd Generation —",
            title: "Strengthening Trust",
            desc: "The second generation deepens the family's roots in horology, building relationships with international component suppliers and expanding the trading network across northern India.",
            align: "left",
            image: "/images/new-img/pillars/WhatsApp Image 2026-04-04 at 4.14.23 PM.jpeg"
        },
        {
            year: "1976 —",
            title: "Expansion to Mumbai",
            desc: "The 3rd generation—Mr. Narinder Nagpal & Mr. Jatinder Nagpal—moves to Mumbai and establishes Nagpal's Bombay, gaining international access and scaling spare parts distribution. Today it's ranked among India's largest sources for wristwatch spare parts.",
            align: "right",
            image: "/images/new-img/pillars/1.jpeg"
        },
        {
            year: "1981 — Pan-India",
            title: "Watch Battery Distribution",
            desc: "Nagpal's Bombay secures pan-India distribution for watch batteries from global brands like Renata, Maxell, Sony & Seizaiken (Seiko Group)—a major credibility milestone.",
            align: "left",
            image: "/images/new-img/pillars/2.jpg"
        },
        {
            year: "1991 —",
            title: "Launch of D'SIGNER",
            desc: "The group launches its first watch brand D'SIGNER under Designer Watches Pvt. Ltd., targeting the premium segment and becoming one of the early Indian brands to design and manufacture to international standards.",
            align: "right",
            image: "/images/new-img/pillars/GW-Ads-BArtboard 2.jpg"
        },
        {
            year: "1995 —",
            title: "Launch of ESCORT",
            desc: "After establishing D'SIGNER, the group enters the mass market with ESCORT, focused on quality watches at affordable pricing. ESCORT grows into a trusted everyday brand.",
            align: "left",
            image: "/images/new-img/pillars/GW-Ads-BArtboard 3.jpg"
        },
        {
            year: "2013 —",
            title: "Daniel Klein Partnership",
            desc: "Turkish brand Daniel Klein appoints Nagpal Group as sole distributors for India, helping it become a top-performing brand on e-commerce platforms with 1000+ models per year.",
            align: "right",
            image: "/images/new-img/pillars/GW-Ads-BArtboard 5.jpg"
        },
        {
            year: "2013-2020 —",
            title: "Digital Boom & New-Age Growth",
            desc: "With e-commerce reshaping the watch market, the Nagpal Group scaled strongly into digital distribution, building major momentum across online platforms and launching Ghadiwaalaa.com.",
            align: "left",
            image: "/images/new-img/pillars/GW-Ads-BArtboard 6.jpg"
        },
        {
            year: "2022 —",
            title: "New Exclusive International Brands",
            desc: "Nagpal Group adds CIGA Design (award-winning skeleton watches) and Santa Barbara Polo & Racquet Club exclusively for India.",
            align: "right",
            image: "/images/new-img/pillars/GW-Ads-BArtboard 8.jpg"
        },
        {
            year: "Today —",
            title: "Scale & Credibility",
            desc: "Now standing on 4 generations of expertise, the group has 20+ international brands, unmatched after-sales service, and 500+ private labels manufactured.",
            align: "left",
            image: "/images/new-img/pillars/4.jpg"
        }
    ];

    return (
        <section ref={containerRef} className="relative py-20 md:py-32 overflow-hidden" style={{ background: "#FAF8F4" }}>

            {/* Subtle green ambient glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.06] blur-[100px]"
                style={{ background: "radial-gradient(circle, rgba(0,57,38,0.5), transparent)" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">

                {/* Heading */}
                <div className="flex flex-col items-center text-center gap-6 mb-24 max-w-3xl mx-auto">
                    <span className="text-[#003926] font-body text-[11px] tracking-[0.4em] uppercase">OUR JOURNEY</span>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-light text-[#1A1918] leading-[1.05] tracking-tight">
                        Built Across Generations.<br />
                        <span className="font-semibold text-[#003926]">Strengthened by Time.</span>
                    </h2>
                    <div className="w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, #003926, #B8935A, #003926, transparent)" }} />
                    <p className="font-body font-light text-[15px] md:text-lg text-secondaryText leading-relaxed max-w-2xl px-4">
                        From a modest horology setup in the 1940s to a multi-brand watch ecosystem today, every generation has expanded our expertise, deepened our credibility, and elevated our standards.
                    </p>
                </div>

                {/* Vertical Timeline */}
                <div className="relative w-full max-w-5xl mx-auto flex flex-col">

                    {/* Static center line (background track) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[3px] rounded-full"
                        style={{ background: "linear-gradient(180deg, rgba(0,57,38,0.08), rgba(0,57,38,0.15), rgba(0,57,38,0.08))" }}
                    />

                    {/* Animated flowing green line (fills on scroll) */}
                    <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 top-0 w-[3px] rounded-full origin-top"
                        style={{
                            height: lineProgress,
                            background: "linear-gradient(180deg, #003926 0%, #B8935A 50%, #003926 100%)",
                            boxShadow: "0 0 12px rgba(0,57,38,0.3), 0 0 30px rgba(0,57,38,0.15)",
                        }}
                    />

                    {/* Glowing tip at the end of the flowing line */}
                    <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-20 glow-node"
                        style={{
                            top: lineProgress,
                            background: "#003926",
                            marginTop: "-6px",
                            boxShadow: "0 0 16px rgba(0,57,38,0.6), 0 0 40px rgba(0,57,38,0.3)",
                        }}
                    />

                    {/* Timeline Items */}
                    <div className="flex flex-col gap-16 md:gap-24 w-full">
                        {timelineData.map((item, index) => {
                            const isRight = item.align === "right";
                            const isActive = activeIndex === index;

                            return (
                                <motion.div
                                    key={index}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={() => setActiveIndex(index)}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                    className="relative flex items-center justify-between w-full cursor-pointer group"
                                >
                                    {/* Left Content Area */}
                                    <div className="w-[45%] flex flex-col items-end text-right pr-8 md:pr-16 relative">
                                        {!isRight ? (
                                            <div className="flex flex-col gap-2 max-w-[340px] transition-all duration-300">
                                                <div className="flex flex-col">
                                                    <span className="font-heading text-[#003926] text-lg md:text-xl font-light italic">{item.year}</span>
                                                    <h3 className="font-heading text-[#1A1918] font-semibold text-[16px] md:text-[20px] tracking-tight">{item.title}</h3>
                                                </div>
                                                <p className="font-body text-secondaryText text-[12px] md:text-[14px] leading-relaxed mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                                    {item.desc}
                                                </p>
                                                
                                                {/* Mobile Image Preview */}
                                                <div className="lg:hidden w-full overflow-hidden rounded-xl mt-4">
                                                    <AnimatePresence>
                                                        {isActive && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                            >
                                                                <Image 
                                                                    src={item.image} 
                                                                    alt={item.title} 
                                                                    width={400} 
                                                                    height={300} 
                                                                    className="object-cover rounded-xl shadow-lg w-full"
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Desktop Preview */
                                            <div className="hidden lg:block w-full h-[240px] relative">
                                                <AnimatePresence>
                                                    {isActive && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.95 }}
                                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                            className="absolute right-0 top-1/2 -translate-y-1/2 w-[320px] h-[220px]"
                                                        >
                                                            <Image
                                                                src={item.image}
                                                                alt={item.title}
                                                                fill
                                                                className="object-cover rounded-2xl shadow-xl"
                                                                style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.15), 0 0 30px rgba(0,57,38,0.08)" }}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )}
                                    </div>

                                    {/* Center Dot — Glowing luxury pointer */}
                                    <div 
                                        className="absolute left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center transition-all duration-500"
                                        style={{
                                            width: isActive ? 20 : 16,
                                            height: isActive ? 20 : 16,
                                            borderRadius: "50%",
                                            background: isActive ? "#003926" : "#1A1918",
                                            boxShadow: isActive 
                                                ? "0 0 0 6px rgba(0,57,38,0.15), 0 0 20px rgba(0,57,38,0.3), 0 0 40px rgba(0,57,38,0.15)" 
                                                : "0 0 0 6px #FAF8F4",
                                        }}
                                    >
                                        <div 
                                            className="rounded-full transition-all duration-500"
                                            style={{
                                                width: isActive ? 6 : 4,
                                                height: isActive ? 6 : 4,
                                                background: isActive ? "#B8935A" : "#B8935A",
                                                boxShadow: isActive ? "0 0 8px rgba(184,147,90,0.5)" : "none",
                                            }}
                                        />
                                    </div>

                                    {/* Right Content Area */}
                                    <div className="w-[45%] flex flex-col items-start text-left pl-8 md:pl-16 relative">
                                        {isRight ? (
                                            <div className="flex flex-col gap-2 max-w-[340px] transition-all duration-300">
                                                <div className="flex flex-col">
                                                    <span className="font-heading text-[#003926] text-lg md:text-xl font-light italic">{item.year}</span>
                                                    <h3 className="font-heading text-[#1A1918] font-semibold text-[16px] md:text-[20px] tracking-tight">{item.title}</h3>
                                                </div>
                                                <p className="font-body text-secondaryText text-[12px] md:text-[14px] leading-relaxed mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                                    {item.desc}
                                                </p>

                                                {/* Mobile Image Preview */}
                                                <div className="lg:hidden w-full overflow-hidden rounded-xl mt-4">
                                                    <AnimatePresence>
                                                        {isActive && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                            >
                                                                <Image 
                                                                    src={item.image} 
                                                                    alt={item.title} 
                                                                    width={400} 
                                                                    height={300} 
                                                                    className="object-cover rounded-xl shadow-lg w-full"
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Desktop Preview */
                                            <div className="hidden lg:block w-full h-[240px] relative">
                                                <AnimatePresence>
                                                    {isActive && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.95 }}
                                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[320px] h-[220px]"
                                                        >
                                                            <Image
                                                                src={item.image}
                                                                alt={item.title}
                                                                fill
                                                                className="object-cover rounded-2xl shadow-xl"
                                                                style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.15), 0 0 30px rgba(0,57,38,0.08)" }}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
