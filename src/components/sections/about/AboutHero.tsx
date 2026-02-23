"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutHero() {
    return (
        <section className="relative w-full min-h-[90vh] bg-[#0B0B0B] text-white overflow-hidden flex flex-col pt-20">
            {/* The pt-20 added to clear any fixed floating header space without jumping. Desktop height is roughly 90vh */}
            <div className="container mx-auto px-6 md:px-12 xl:px-24 flex-1 flex flex-col justify-center h-full pb-16">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">

                    {/* Image Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-[400px] md:h-[600px] lg:h-[700px] relative order-2 md:order-1"
                    >
                        {/* Assuming aboutBanner.png or img05.png is the watch image for the layout */}
                        <Image
                            src="/images/aboutBanner.png"
                            alt="35 Years of Legacy Watch"
                            fill
                            className="object-contain object-center md:object-left"
                            priority
                        />
                    </motion.div>

                    {/* Content Right */}
                    <div className="w-full flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col gap-2"
                        >
                            <h1 className="flex flex-col gap-1 md:gap-2">
                                <span className="text-6xl md:text-8xl lg:text-[7rem] font-serif font-bold leading-none tracking-tight">
                                    35 Years
                                </span>
                                <span className="text-3xl md:text-5xl lg:text-6xl font-serif font-light leading-tight opacity-90">
                                    of Legacy.
                                </span>
                            </h1>

                            <div className="mt-8 md:mt-12">
                                <h2 className="text-3xl md:text-5xl lg:text-[4rem] font-sans font-light leading-[1.1] tracking-tight whitespace-pre-line text-white/80">
                                    Still<br />Defining<br />Time.
                                </h2>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
