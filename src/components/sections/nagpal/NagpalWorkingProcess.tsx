"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// Reorganize to 4 distinct steps as requested
const steps = [
    {
        num: "01",
        title: "Inspection",
        image: "/images/nagpal/img/DSC00001.JPG",
    },
    {
        num: "02",
        title: "Disassembly",
        image: "/images/nagpal/img/DSC00002.JPG",
    },
    {
        num: "03",
        title: "Repair",
        image: "/images/nagpal/img/DSC00003.JPG",
    },
    {
        num: "04",
        title: "Final Check",
        image: "/images/nagpal/img/DSC00004.JPG",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.21, 0.47, 0.32, 0.98] as const,
        },
    },
};

export default function NagpalWorkingProcess() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Parallax effects to give depth
    const leftColY = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const rightColY = useTransform(scrollYProgress, [0, 1], [0, -30]);

    return (
        <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden bg-[#F8F8F8]">
            {/* Subtle paper noise texture */}
            <div
                className="absolute inset-0 opacity-[0.35] pointer-events-none mix-blend-multiply"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%221%22/%3E%3C/svg%3E")' }}
            />

            {/* Grid line overlay to feel like a drafted diagram */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">

                {/* Section Title Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-24 md:mb-32"
                >
                    <span className="text-neutral-500 text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
                        Working Process
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 mb-6">
                        Our Proven Workflow
                    </h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        Discover the meticulous methodology and structured phases that guide Nagpal Group in executing exceptional projects step by step.
                    </p>
                </motion.div>

                {/* Layout Structure: Map Diagram */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start w-full relative">

                    {/* Connectors that span the whole diagram (desktop only) */}
                    <div className="absolute inset-0 pointer-events-none hidden lg:block z-0">
                        {/* Step 01 -> Step 02 Connector */}
                        <svg className="absolute top-[15%] left-[25%] w-[40%] h-[20%] overflow-visible drop-shadow-sm">
                            <motion.path
                                d="M 0,0 C 80,0 80,100 100,100"
                                vectorEffect="non-scaling-stroke"
                                className="stroke-neutral-300 transition-colors duration-500"
                                strokeWidth="2.5" strokeDasharray="6 8" strokeLinecap="round" fill="none"
                                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }} viewport={{ once: true }}
                            />
                        </svg>
                        {/* Step 02 -> Step 03 Connector */}
                        <svg className="absolute top-[40%] right-[10%] w-[35%] h-[25%] overflow-visible drop-shadow-sm" style={{ transform: "scaleX(-1)" }}>
                            <motion.path
                                d="M 0,0 C 60,0 60,100 100,100"
                                vectorEffect="non-scaling-stroke"
                                className="stroke-neutral-300 transition-colors duration-500"
                                strokeWidth="2.5" strokeDasharray="6 8" strokeLinecap="round" fill="none"
                                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }} viewport={{ once: true }}
                            />
                        </svg>
                        {/* Step 03 -> Step 04 Connector */}
                        <svg className="absolute top-[70%] left-[25%] w-[30%] h-[20%] overflow-visible drop-shadow-sm">
                            <motion.path
                                d="M 0,0 C 80,0 80,100 100,100"
                                vectorEffect="non-scaling-stroke"
                                className="stroke-neutral-300 transition-colors duration-500"
                                strokeWidth="2.5" strokeDasharray="6 8" strokeLinecap="round" fill="none"
                                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 1.3 }} viewport={{ once: true }}
                            />
                        </svg>
                    </div>

                    {/* Left Column: STEP 01 (Tablet) & STEP 03 (Image) */}
                    <motion.div
                        style={{ y: leftColY }}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full lg:w-5/12 flex flex-col items-center gap-24 lg:gap-40 relative z-10"
                    >
                        {/* Step 01 */}
                        <motion.div variants={cardVariants} className="relative w-full max-w-[320px] lg:max-w-[340px] group">
                            <div className="absolute -top-6 -left-6 w-14 h-14 bg-white rounded-full flex items-center justify-center text-neutral-800 border-2 border-neutral-100 shadow-md font-serif font-bold text-xl z-20 transition-colors duration-300 group-hover:text-[#B8935A] group-hover:border-[#B8935A]/20">
                                {steps[0].num}
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.3 } }}
                                className="relative aspect-[3/4] rounded-[24px] bg-neutral-900 p-2 lg:p-3 shadow-2xl border border-neutral-800 transform rotate-[-1deg]"
                            >
                                <div className="relative w-full h-full rounded-[16px] overflow-hidden bg-white">
                                    <Image src={steps[0].image} alt={steps[0].title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 40vw" quality={70} />
                                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                                    <h3 className="absolute bottom-4 left-4 right-4 text-white font-serif text-2xl drop-shadow-md">{steps[0].title}</h3>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Step 03 */}
                        <motion.div variants={cardVariants} className="relative w-full max-w-[300px] lg:max-w-[320px] group mt-12 lg:mt-32">
                            <div className="absolute -top-6 -left-6 w-14 h-14 bg-white rounded-full flex items-center justify-center text-neutral-800 border-2 border-neutral-100 shadow-md font-serif font-bold text-xl z-20 transition-colors duration-300 group-hover:text-[#B8935A] group-hover:border-[#B8935A]/20">
                                {steps[2].num}
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.3 } }}
                                className="relative p-2.5 bg-white backdrop-blur-sm rounded-xl border border-neutral-200 shadow-md hover:shadow-xl transition-shadow transform rotate-[1.5deg]"
                            >
                                <div className="relative aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-black/5">
                                    <Image src={steps[2].image} alt={steps[2].title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 40vw" quality={70} />
                                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                                    <h3 className="absolute bottom-4 left-4 right-4 text-white font-serif text-2xl drop-shadow-md">{steps[2].title}</h3>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: STEP 02 & STEP 04 */}
                    <motion.div
                        style={{ y: rightColY }}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full lg:w-7/12 flex flex-col items-center gap-24 lg:gap-40 pt-16 lg:pt-32 relative z-10"
                    >
                        {/* Step 02 */}
                        <motion.div variants={cardVariants} className="relative w-full max-w-[300px] lg:max-w-[320px] group ml-auto lg:mr-16">
                            <div className="absolute -top-6 -left-6 w-14 h-14 bg-white rounded-full flex items-center justify-center text-neutral-800 border-2 border-neutral-100 shadow-md font-serif font-bold text-xl z-20 transition-colors duration-300 group-hover:text-[#B8935A] group-hover:border-[#B8935A]/20">
                                {steps[1].num}
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.3 } }}
                                className="relative p-2.5 bg-white backdrop-blur-sm rounded-xl border border-neutral-200 shadow-md hover:shadow-xl transition-shadow transform rotate-[2deg]"
                            >
                                <div className="relative aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-black/5">
                                    <Image src={steps[1].image} alt={steps[1].title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 40vw" quality={70} />
                                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                                    <h3 className="absolute bottom-4 left-4 right-4 text-white font-serif text-2xl drop-shadow-md">{steps[1].title}</h3>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Step 04 */}
                        <motion.div variants={cardVariants} className="relative w-full max-w-[340px] lg:max-w-[400px] group ml-auto lg:mr-8 mt-12 lg:mt-32">
                            <div className="absolute -top-6 -left-6 w-14 h-14 bg-white rounded-full flex items-center justify-center text-neutral-800 border-2 border-neutral-100 shadow-md font-serif font-bold text-xl z-20 transition-colors duration-300 group-hover:text-[#B8935A] group-hover:border-[#B8935A]/20">
                                {steps[3].num}
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.3 } }}
                                className="relative p-2.5 bg-white backdrop-blur-sm rounded-xl border border-neutral-200 shadow-md hover:shadow-xl transition-shadow transform rotate-[-1.5deg]"
                            >
                                <div className="relative aspect-[16/10] rounded-lg overflow-hidden ring-1 ring-black/5">
                                    <Image src={steps[3].image} alt={steps[3].title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
                                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                                    <h3 className="absolute bottom-4 left-4 right-4 text-white font-serif text-2xl drop-shadow-md">{steps[3].title}</h3>
                                </div>
                            </motion.div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
