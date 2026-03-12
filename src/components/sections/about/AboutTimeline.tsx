"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AboutTimeline() {
    const [activeIndex, setActiveIndex] = useState(0);

    const timelineData = [
        {
            year: "1940s —",
            title: "The Beginning (Amritsar)",
            desc: "Shree Virbhan Nagpal starts a small horology setup in Amritsar, laying the foundation for what eventually becomes a national trading, manufacturing, and brand business in the watch industry.",
            align: "right",
            image: "/images/hover-1.png"
        },
        {
            year: "2nd Generation —",
            title: "Strengthening Trust",
            desc: "Shree Virbhan Nagpal starts a small horology setup in Amritsar, laying the foundation for what eventually becomes a national trading, manufacturing, and brand business in the watch industry.",
            align: "left",
            image: "/images/hover-2.png"
        },
        {
            year: "1976 —",
            title: "Expansion to Mumbai",
            desc: "The 3rd generation—Mr. Narinder Nagpal & Mr. Jatinder Nagpal—moves to Mumbai and establishes Nagpal's Bombay, gaining international access and scaling spare parts distribution. Today it's ranked among India's largest sources for wristwatch spare parts.",
            align: "right",
            image: "/images/hover-3.png"
        },
        {
            year: "1981 — Pan-India",
            title: "Watch Battery Distribution",
            desc: "Nagpal's Bombay secures pan-India distribution for watch batteries from global brands like Renata, Maxell, Sony & Seizaiken (Seiko Group)—a major credibility milestone.",
            align: "left",
            image: "/images/hover-1.png"
        },
        {
            year: "1991 —",
            title: "Launch of D'SIGNER",
            desc: "The group launches its first watch brand D'SIGNER under Designer Watches Pvt. Ltd., targeting the premium segment and becoming one of the early Indian brands to design and manufacture to international standards. D'SIGNER expands to 100+ MBOs + online marketplaces.",
            align: "right",
            image: "/images/hover-2.png"
        },
        {
            year: "1995 —",
            title: "Launch of ESCORT",
            desc: "After establishing D'SIGNER, the group enters the mass market with ESCORT, focused on quality watches at affordable pricing.",
            align: "left",
            image: "/images/hover-3.png"
        },
        {
            year: "2013 —",
            title: "Daniel Klein (Sole Distributor in India)",
            desc: "Turkish brand Daniel Klein appoints Nagpal Group as sole distributors for India, helping it become a top-performing brand on e-commerce platforms with 1000+ models per year.",
            align: "right",
            image: "/images/hover-1.png"
        },
        {
            year: "2013-2020 —",
            title: "Digital Boom & New-Age Growth",
            desc: "With e-commerce reshaping the watch market, the Nagpal Group scaled strongly into digital distribution. In 2013, they became the sole India distributors for Daniel Klein, building major momentum across online platforms. This era also expanded into B2T smart wearables and Ghadiwaalaa.com (2020), a curated watches & wearables marketplace.",
            align: "left",
            image: "/images/hover-2.png"
        },
        {
            year: "2022 —",
            title: "New Exclusive International Brands",
            desc: "Nagpal Group adds CIGA Design (award-winning skeleton watches) and Santa Barbara Polo & Racquet Club exclusively for India.",
            align: "right",
            image: "/images/hover-3.png"
        },
        {
            year: "Today —",
            title: "Scale & Credibility",
            desc: "Now standing on 4 generations of expertise, the group has 20+ international brands, unmatched after-sales service, and 500+ private labels manufactured.",
            align: "left",
            image: "/images/hover-1.png"
        }
    ];

    return (
        <section className="relative py-20 md:py-32 bg-white overflow-hidden">

            {/* Background Watch Watermark - Minimal static version to maintain theme if desired, 
                but user wants contextual hover, so we empty this or keep a very faint static logo */}
            <div className="absolute inset-0 flex justify-center items-center opacity-[0.02] pointer-events-none z-0">
                <div className="relative w-[800px] h-[1200px] md:w-[1200px] md:h-[1800px]">
                    <Image
                        src="/images/img01.png"
                        alt=""
                        fill
                        className="object-contain grayscale"
                    />
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">

                {/* Heading */}
                <div className="flex flex-col items-center text-center gap-6 mb-24 max-w-3xl mx-auto">
                    <span className="text-gold font-body text-[11px] tracking-[0.4em] uppercase">OUR JOURNEY</span>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-light text-[#1A1918] leading-[1.05] tracking-tight whitespace-pre-line">
                        Built Across Generations.<br />
                        <span className="font-semibold text-[#003926]">Strengthened by Time.</span>
                    </h2>
                    <p className="font-body font-light text-[15px] md:text-lg text-secondaryText leading-relaxed max-w-2xl px-4">
                        From a modest horology setup in the 1940s to a multi-brand watch ecosystem today, every generation has expanded our expertise, deepened our credibility, and elevated our standards.
                    </p>
                </div>

                {/* Vertical Timeline */}
                <div className="relative w-full max-w-5xl mx-auto flex flex-col">

                    {/* Center Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[1px] bg-[#e2e8f0]" />

                    {/* Timeline Items */}
                    <div className="flex flex-col gap-16 md:gap-24 w-full">
                        {timelineData.map((item, index) => {
                            const isRight = item.align === "right";

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
                                                    <span className="font-heading text-gold text-lg md:text-xl font-light italic">{item.year}</span>
                                                    <h3 className="font-heading text-[#1A1918] font-semibold text-[16px] md:text-[20px] tracking-tight">{item.title}</h3>
                                                </div>
                                                <p className="font-body text-secondaryText text-[12px] md:text-[14px] leading-relaxed mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                                    {item.desc}
                                                </p>
                                                
                                                {/* Mobile Image Preview (shown below step) */}
                                                <div className="lg:hidden w-full overflow-hidden rounded-xl mt-4">
                                                    <AnimatePresence>
                                                        {activeIndex === index && (
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
                                                                    className="object-cover rounded-xl shadow-lg"
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Desktop Preview beside right-aligned content */
                                            <div className="hidden lg:block w-full h-[240px] relative">
                                                <AnimatePresence>
                                                    {activeIndex === index && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 1 }}
                                                            animate={{ opacity: 1, scale: 1.04 }}
                                                            exit={{ opacity: 0, scale: 1 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="absolute right-0 top-1/2 -translate-y-1/2 w-[320px] h-[220px]"
                                                        >
                                                            <Image
                                                                src={item.image}
                                                                alt=""
                                                                fill
                                                                className="object-cover rounded-2xl shadow-xl border border-black/5"
                                                            />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )}
                                    </div>

                                    {/* Center Dot */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#1A1918] z-10 shadow-[0_0_0_8px_rgba(255,255,255,1)] flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                                    </div>

                                    {/* Right Content Area */}
                                    <div className="w-[45%] flex flex-col items-start text-left pl-8 md:pl-16 relative">
                                        {isRight ? (
                                            <div className="flex flex-col gap-2 max-w-[340px] transition-all duration-300">
                                                <div className="flex flex-col">
                                                    <span className="font-heading text-gold text-lg md:text-xl font-light italic">{item.year}</span>
                                                    <h3 className="font-heading text-[#1A1918] font-semibold text-[16px] md:text-[20px] tracking-tight">{item.title}</h3>
                                                </div>
                                                <p className="font-body text-secondaryText text-[12px] md:text-[14px] leading-relaxed mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                                    {item.desc}
                                                </p>

                                                {/* Mobile Image Preview (shown below step) */}
                                                <div className="lg:hidden w-full overflow-hidden rounded-xl mt-4">
                                                    <AnimatePresence>
                                                        {activeIndex === index && (
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
                                                                    className="object-cover rounded-xl shadow-lg"
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Desktop Preview beside left-aligned content */
                                            <div className="hidden lg:block w-full h-[240px] relative">
                                                <AnimatePresence>
                                                    {activeIndex === index && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 1 }}
                                                            animate={{ opacity: 1, scale: 1.04 }}
                                                            exit={{ opacity: 0, scale: 1 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[320px] h-[220px]"
                                                        >
                                                            <Image
                                                                src={item.image}
                                                                alt=""
                                                                fill
                                                                className="object-cover rounded-2xl shadow-xl border border-black/5"
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
