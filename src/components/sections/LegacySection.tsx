"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LegacySection() {
    return (
        <section className="py-16 md:py-20 bg-background overflow-hidden text-primaryText">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Image Column (Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full flex justify-center md:justify-start"
                    >
                        {/* 
                         Matching the reference image: The hand is large but contained cleanly
                         without floating or overlapping strangely.
                        */}
                        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] max-w-lg mx-auto md:mx-0">
                            <Image
                                src="/images/img05.png"
                                alt="Rooted in the 1940s"
                                fill
                                className="object-contain object-bottom drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Content Column (Right) */}
                    <div className="w-full flex flex-col items-start md:pl-8 lg:pl-16">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col text-left max-w-lg w-full"
                        >
                            {/* Heading */}
                            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-sans font-medium leading-[1.1] tracking-tight text-[#2d3748] mb-[24px]">
                                Rooted in the 1940s.<br />Designed for Today.
                            </h2>

                            {/* Paragraphs */}
                            <div className="flex flex-col gap-[16px] md:gap-[20px] mb-[32px] text-[#4a5568] leading-relaxed text-sm md:text-base">
                                <p className="font-sans">
                                    Founded in the 1940s, Designer World represents four generations of continuous growth in the watch industry.
                                </p>
                                <p className="font-sans">
                                    Today, we operate as a fully integrated watch ecosystem from in-house brands to private label manufacturing built on decades of trust and technical expertise.
                                </p>
                            </div>

                            {/* Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-fit px-8 py-3 bg-[#0E3D2B] text-white rounded-md font-sans text-[11px] tracking-widest uppercase transition-all shadow-md hover:shadow-lg"
                            >
                                Know More
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
