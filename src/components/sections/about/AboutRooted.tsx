"use client";

import { motion } from "framer-motion";

export default function AboutRooted() {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="max-w-6xl mx-auto px-6 md:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-white rounded-2xl shadow-sm p-10 md:p-16 w-full"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                        {/* Left Column: Heading & Intro */}
                        <div className="flex flex-col gap-6 md:justify-between">
                            <h2 className="text-4xl md:text-5xl font-sans font-medium text-[#2d3748] leading-[1.1] tracking-tight">
                                Rooted in the 1940s.<br />Designed for Today.
                            </h2>
                            <p className="font-sans text-[11px] md:text-[13px] text-[#4a5568] leading-relaxed max-w-sm mt-auto">
                                Just before INDIA GOT ITS FREEDOM, in 1940's a Gentleman by the name of Shree Virbhan Nagpal seeded a small set up in Amritsar which today fruits to a national setup of trading, manufacturing & brand business. This became the beginning of a business era for the Nagpal family in the Horological Industry.
                            </p>
                        </div>

                        {/* Right Column: Long Paragraphs */}
                        <div className="flex flex-col gap-5 text-[#4a5568] leading-relaxed text-[13px] md:text-[14px]">
                            <p className="font-sans">
                                Soon Second generation lead by Mr. Tarlok Nagpal continued the legacy in Amritsar to build a strong good will, acquiring a larger geographic reach in the Indian Watch Industry. Continuing the journey for many years, in 1976 brought in the 3rd generation with Bigger Vision and ideas, Mr. Narinder Nagpal & Mr. Jatinder Nagpal, moved out of their home town of Amritsar and opened their next set up in the Financial Hub of India, Mumbai, by the name of Nagpal's Bombay.
                            </p>
                            <p className="font-sans">
                                This opened access to the International markets and they acquired multiple distributions of International brands in Spare parts. Today, it's ranked as one of India's largest sources for wrist watch spare parts.
                            </p>
                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}
