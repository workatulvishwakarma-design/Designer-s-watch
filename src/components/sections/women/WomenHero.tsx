"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GrainOverlay from "@/components/ui/GrainOverlay";

export default function WomenHero() {
    return (
        <section className="relative bg-[#F8F6F2] text-[#1A1918] overflow-hidden pt-32 pb-24 md:pt-40 md:pb-0 h-auto md:h-[80vh] flex items-center">
            <GrainOverlay opacity={0.03} />

            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(184,147,90,0.15)_0%,transparent_70%)] pointer-events-none translate-x-1/3 -translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col md:flex-row items-center h-full">
                {/* Left Content */}
                <div className="w-full md:w-1/2 flex flex-col items-start text-left md:pr-12 lg:pr-24 z-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-dm text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-[#B8935A] mb-6"
                    >
                        Crafted to Be Noticed. Worn to Be Remembered.
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="font-cormorant text-5xl md:text-6xl lg:text-8xl leading-[1.05]"
                    >
                        Women&apos;s <br /> Collection
                    </motion.h1>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="w-16 h-[1px] bg-[#B8935A] mt-8 mb-8 origin-left"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="font-dm text-[14px] md:text-[15px] text-[#5C5752] max-w-sm font-light leading-[1.8]"
                    >
                        Graceful proportions meet resolute quality. Explore our selection of women&apos;s timepieces, crafted to elevate every gesture with timeless sophistication.
                    </motion.p>
                </div>

                {/* Right Image */}
                <div className="w-full md:w-1/2 relative h-[400px] md:h-full mt-12 md:mt-0 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full h-[120%] md:h-[150%] max-w-[500px]"
                    >
                        <Image
                            src="/images/new-img/model-2/J905/J905/J905GM.16L.png"
                            alt="Women's Collection Featured Watch"
                            fill
                            className="object-contain object-center drop-shadow-2xl translate-y-8"
                            priority
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
