"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, ShieldCheck, PenTool, TrendingUp } from "lucide-react";

export default function AboutValues() {
    const values = [
        {
            icon: <Clock size={28} strokeWidth={1.5} />,
            title: "Legacy",
            description: "Built over decades, strengthened by trust across generations. Every timepiece carries the weight of experience and the pride of tradition."
        },
        {
            icon: <ShieldCheck size={28} strokeWidth={1.5} />,
            title: "Precision",
            description: "Precision isn't a feature, it's a standard. Built for accuracy, reliability, and lasting performance, every day."
        },
        {
            icon: <PenTool size={28} strokeWidth={1.5} />,
            title: "Design",
            description: "Design is our language: clean, intentional, and timeless. Every curve, dial, and detail is crafted with purpose, not noise."
        },
        {
            icon: <TrendingUp size={28} strokeWidth={1.5} />,
            title: "Evolution",
            description: "Rooted in tradition, shaped for today. We evolve with modern lifestyles while staying true to classic watchmaking."
        }
    ];

    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-[#FAF8F4]">

            {/* Background Image with Light Luxury Overlay */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Image
                    src="/images/aboutImg3.png"
                    alt="Watchmaking Hands Background"
                    fill
                    className="object-cover object-center grayscale"
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(circle at center, rgba(250, 248, 244, 0.8) 0%, #FAF8F4 100%)"
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-gold font-body text-[11px] tracking-[0.4em] uppercase mb-4 inline-block">OUR PHILOSOPHY</span>
                    <h2 className="text-4xl md:text-6xl font-heading font-light text-[#1A1918] tracking-tight">Core Values</h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="bg-white rounded-xl shadow-lg p-8 md:p-10 flex flex-col items-center text-center gap-6 group hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center text-[#0E3D2B] group-hover:scale-110 transition-transform duration-300">
                                {value.icon}
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 className="font-serif text-xl tracking-wide text-[#2d3748]">{value.title}</h3>
                                <p className="font-sans text-[#4a5568] text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
