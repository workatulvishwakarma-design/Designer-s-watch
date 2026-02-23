"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function QualityFeatures() {
    const features = [
        "Stainless Steel Construction",
        "5–10 ATM Water Resistance",
        "Quartz Precision Movement",
        "Scratch-Resistant Finish",
        "International Quality Standards"
    ];

    return (
        <section className="py-[100px] bg-white overflow-hidden text-[#2d3748]">
            {/* max-width 1200px, 0 auto margin, left/right padding */}
            <div className="w-full max-w-[1200px] mx-auto px-5">
                {/* Two-column layout (50% / 50%) vertically centered */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

                    {/* Text Column (Left Side) */}
                    <div className="w-full lg:w-1/2 flex justify-start">
                        {/* Grouped tightly, max-width 500px, left aligned */}
                        <div className="w-full max-w-[500px] flex flex-col text-left">

                            {/* 20-24px between heading and paragraph (~gap-6) */}
                            <div className="flex flex-col gap-6 w-full">
                                <h2 className="text-4xl md:text-[3.5rem] font-sans font-medium text-[#2d3748] leading-[1.1] tracking-tight">
                                    Quality You <br /> Can Feel.
                                </h2>
                                <p className="font-sans text-sm md:text-base text-[#4a5568] leading-relaxed">
                                    Solid steel builds, protected glass, accurate quartz movement, and functional dial designs designed for consistent performance.
                                </p>
                            </div>

                            {/* 30-40px between paragraph and list (~mt-10) */}
                            <div className="flex flex-col w-full border-t border-[#e2e8f0] mt-10">
                                {features.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        // 18-22px between each feature line (~py-5)
                                        className="border-b border-[#e2e8f0] py-5 last:border-b-0 w-full"
                                    >
                                        <span className="font-sans text-sm md:text-base font-medium tracking-wide text-[#4a5568]">
                                            {feature}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Image Column (Right Side) */}
                    <motion.div
                        className="w-full lg:w-1/2 flex justify-center items-center relative mt-8 lg:mt-0"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Center vertically & horizontally, subtle shadow, slightly increased size */}
                        <div className="relative w-full aspect-[4/5] max-w-[480px] flex items-center justify-center">
                            <Image
                                src="/images/img01.png"
                                alt="D'SIGNER Premium Chronograph"
                                fill
                                className="object-contain drop-shadow-xl"
                                priority
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
