"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function OemCta() {
    return (
        <section className="relative py-24 md:py-32 bg-[#2D2D2D] text-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 xl:px-24">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Side: Content */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-10">
                        <div className="flex flex-col gap-8">
                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif leading-[1.05] tracking-tight whitespace-pre-line">
                                Your Vision.<br />Our Watchmaking.
                            </h2>
                            <p className="font-sans text-base md:text-lg text-white/70 max-w-lg leading-relaxed font-light">
                                We offer end-to-end OEM and private label watch manufacturing backed by decades of expertise, global sourcing, and rigorous quality control helping brands bring their vision to life with confidence.
                            </p>
                        </div>

                        <div>
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.98 }}
                                className="px-10 py-3 border border-white/30 rounded-md font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300"
                            >
                                Enquire Now
                            </motion.button>
                        </div>
                    </div>

                    {/* Right Side: Blueprint Image */}
                    <motion.div
                        className="w-full lg:w-1/2 relative aspect-[4/3] flex items-center justify-center"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="relative w-full h-full lg:scale-125">
                            <Image
                                src="/images/img02.png"
                                alt="Watch Manufacturing Blueprints"
                                fill
                                className="object-contain invert brightness-[0.6] contrast-[4] grayscale mix-blend-screen"
                                priority
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
