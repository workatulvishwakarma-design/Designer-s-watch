"use client";

import { motion } from "framer-motion";

export default function AboutRooted() {
    return (
        <section className="py-16 md:py-32 bg-[#FAF8F4] overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-24">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-[#E8E0D5] p-10 md:p-20 w-full relative overflow-hidden"
                >
                    {/* Decorative Dot Flourish */}
                    <div className="absolute top-8 left-8 flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                        <div className="w-1.5 h-1.5 rounded-full bg-gold/30" />
                        <div className="w-1.5 h-1.5 rounded-full bg-gold/10" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start relative z-10">

                        {/* Left Column: Heading & Intro */}
                        <div className="flex flex-col gap-8">
                            <h2 className="text-4xl md:text-5xl lg:text-5.5xl font-heading font-light text-[#1A1918] leading-[1.05] tracking-tight">
                                Rooted in the 1940s.<br />
                                <span className="font-semibold text-[#003926]">Designed for Today.</span>
                            </h2>
                            <p className="font-body text-sm md:text-base text-secondaryText leading-relaxed italic border-l-2 border-gold pl-6">
                                &quot;Just before INDIA GOT ITS FREEDOM, in 1940&apos;s a Gentleman by the name of Shree Virbhan Nagpal seeded a small set up in Amritsar which today fruits to a national setup.&quot;
                            </p>
                        </div>

                        {/* Right Column: Long Paragraphs */}
                        <div className="flex flex-col gap-5 text-[#4a5568] leading-relaxed text-[13px] md:text-[14px]">
                            <p className="font-sans">
                                Soon Second generation lead by Mr. Tarlok Nagpal continued the legacy in Amritsar to build a strong good will, acquiring a larger geographic reach in the Indian Watch Industry. Continuing the journey for many years, in 1976 brought in the 3rd generation with Bigger Vision and ideas, Mr. Narinder Nagpal & Mr. Jatinder Nagpal, moved out of their home town of Amritsar and opened their next set up in the Financial Hub of India, Mumbai, by the name of Nagpal&apos;s Bombay.
                            </p>
                            <p className="font-sans">
                                This opened access to the International markets and they acquired multiple distributions of International brands in Spare parts. Today, it&apos;s ranked as one of India&apos;s largest sources for wrist watch spare parts.
                            </p>
                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}
