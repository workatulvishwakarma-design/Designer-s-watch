"use client";

import { motion } from "framer-motion";

export default function AboutStats() {
    const stats = [
        { value: "4", label: "Generations of Expertise" },
        { value: "20+", label: "International Brands" },
        { value: "500+", label: "Private Labels Manufactured" },
        { value: "100+", label: "Multi-brand Outlets" },
    ];

    return (
        <section className="py-16 md:py-24 bg-white text-[#2d3748]">
            <div className="max-w-7xl mx-auto px-6 md:px-8">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="flex flex-col items-center text-center gap-2"
                        >
                            <span className="text-5xl md:text-6xl lg:text-[4.5rem] font-serif font-light text-[#0E3D2B]">
                                {stat.value}
                            </span>
                            <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-[#4a5568]/80 max-w-[150px] leading-relaxed">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
