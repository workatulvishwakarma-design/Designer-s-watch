"use client";

import { motion } from "framer-motion";
import { Clock, ShieldCheck, PenTool, TrendingUp } from "lucide-react";

export default function AboutValues() {
    const values = [
        {
            number: "01",
            icon: <Clock size={24} strokeWidth={1.2} />,
            title: "Legacy",
            description: "Built over decades, strengthened by trust across generations. Every timepiece carries the weight of experience and the pride of tradition."
        },
        {
            number: "02",
            icon: <ShieldCheck size={24} strokeWidth={1.2} />,
            title: "Precision",
            description: "Precision isn't a feature, it's a standard. Built for accuracy, reliability, and lasting performance, every day."
        },
        {
            number: "03",
            icon: <PenTool size={24} strokeWidth={1.2} />,
            title: "Design",
            description: "Design is our language: clean, intentional, and timeless. Every curve, dial, and detail is crafted with purpose, not noise."
        },
        {
            number: "04",
            icon: <TrendingUp size={24} strokeWidth={1.2} />,
            title: "Evolution",
            description: "Rooted in tradition, shaped for today. We evolve with modern lifestyles while staying true to classic watchmaking."
        }
    ];

    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-[#F5F1EA]">
            {/* Subtle background surface texture effect */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            
            {/* Soft spotlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(200,169,126,0.08)_0%,transparent_70%)] rounded-full pointer-events-none -translate-y-1/2"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24 md:mb-32"
                >
                    <span className="text-[#C8A97E] font-body text-[11px] tracking-[0.5em] uppercase mb-4 inline-block font-medium">OUR PHILOSOPHY</span>
                    <h2 className="text-5xl md:text-7xl font-heading font-light text-[#1B1B1B] tracking-tight">Core Values</h2>
                    <div className="w-12 h-[1px] bg-[#C8A97E] mx-auto mt-8 opacity-60"></div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="relative flex flex-col items-start gap-8 group"
                        >
                            {/* Card Content with floating number */}
                            <div className="relative w-full">
                                {/* Numbering */}
                                <span className="absolute -top-10 left-0 font-heading text-8xl text-[#1B1B1B] opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700">
                                    {value.number}
                                </span>

                                {/* Badge */}
                                <div className="w-16 h-16 rounded-full border border-[#C8A97E]/30 flex items-center justify-center text-[#B8935A] mb-10 relative group-hover:border-[#C8A97E] shadow-sm transition-all duration-500 bg-white/50 backdrop-blur-sm">
                                    {value.icon}
                                    <div className="absolute inset-0 rounded-full bg-[#C8A97E]/5 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <h3 className="font-heading text-2xl tracking-normal text-[#1B1B1B] font-light italic">
                                        {value.title}
                                    </h3>
                                    <div className="w-8 h-[1px] bg-[#C8A97E]/20 group-hover:w-16 transition-all duration-700"></div>
                                    <p className="font-body text-[#6E6A64] text-[15px] leading-relaxed max-w-[260px]">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

