"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutChairman() {
    return (
        <section className="py-16 md:py-32 bg-[#FAF8F4] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-24">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">

                    {/* Left Side: Portrait Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-5 relative h-[500px] md:h-[700px] w-full rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] z-10"
                    >
                        <Image
                            src="/images/aboutImg2.png"
                            alt="Chairman Portrait"
                            fill
                            className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                    </motion.div>

                    {/* Right Side: Message Card */}
                    <div className="lg:col-span-7 flex flex-col relative z-20 lg:-ml-12 lg:mt-24">

                        {/* Premium Header Strip */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-[#B8935A] text-white px-10 py-6 md:px-16 md:py-8 rounded-t-[20px] lg:rounded-tr-[20px] lg:rounded-tl-[32px] shadow-2xl w-fit"
                        >
                            <h3 className="font-heading font-light text-2xl md:text-3xl tracking-wide">Chairman&apos;s Message</h3>
                        </motion.div>

                        {/* White Message Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white p-8 md:p-12 rounded-b-xl rounded-tr-xl lg:rounded-tl-none shadow-xl flex flex-col gap-5"
                        >
                            <p className="font-sans text-[#4a5568] leading-relaxed text-[12px] md:text-[14px]">
                                Dear Visitor,
                            </p>
                            <p className="font-sans text-[#4a5568] leading-relaxed text-[12px] md:text-[14px]">
                                On behalf of our entire team, I extend my heartfelt thanks to all the proud owners and loyal users of our house brands - DSIGNER and ESCORT.<br />
                                Our parent company, Nagpals, has been a trusted name in watch components for decades. Building on this rich legacy, we ventured into the world of premium timepieces in 1991, inspired by the elegance of Swiss and other European watchmaking traditions. This led to the birth of our premium fashion watch brand, DSIGNER, which quickly carved out a niche for itself in the segment by upholding the highest standards of design and quality.
                            </p>
                            <p className="font-sans text-[#4a5568] leading-relaxed text-[12px] md:text-[14px]">
                                In 1995, we introduced ESCORT a brand that delivers high-quality watches at affordable prices, making stylish timekeeping accessible to all.<br />
                                Today, both DSIGNER and ESCORT enjoy a strong presence across the country through our Multi brand stores, with millions of happy customers who continue to place their trust in us.<br />
                                I sincerely thank each one of you for being a part of our journey. Here&apos;s wishing you happiness, success, and timeless moments ahead.
                            </p>
                            <div className="font-sans text-[#4a5568] leading-snug text-[12px] md:text-[14px] mt-2">
                                <p>Warm regards,</p>
                                <p>Jatinder Nagpal</p>
                                <p>Chairman</p>
                            </div>
                        </motion.div>

                    </div>

                </div>

            </div>
        </section>
    );
}
