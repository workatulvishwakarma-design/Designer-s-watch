"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Droplets, Zap, Clock } from "lucide-react";
import GrainOverlay from "@/components/ui/GrainOverlay";

const features = [
    {
        icon: ShieldCheck,
        title: "Sapphire Glass",
        desc: "Ultra-hard sapphire coating for ultimate scratch resistance and clarity."
    },
    {
        icon: Droplets,
        title: "10 ATM Water Resistant",
        desc: "Certified for water resistance up to 100 meters, perfect for every lifestyle."
    },
    {
        icon: Zap,
        title: "Swiss-Inspired Movement",
        desc: "Engineered for precision and reliability, inspired by Swiss horology."
    },
    {
        icon: Clock,
        title: "2 Year Warranty",
        desc: "Comprehensive peace of mind with our extended international warranty."
    }
];

export default function DsignerFeatures() {
    return (
        <section className="bg-[#F2EDE6] py-24 relative overflow-hidden">
            <GrainOverlay />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-heading text-4xl md:text-5xl text-center text-primaryText mb-16"
                >
                    Why <span className="italic">D&apos;SIGNER</span>?
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -6, borderColor: "#B8935A" }}
                            className="bg-white border border-[#E8E0D5] rounded-2xl p-8 transition-all duration-300 shadow-sm relative group"
                        >
                            <div className="flex flex-col items-center text-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold mb-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <feature.icon size={28} className="text-gold mb-6" />
                                <h3 className="font-body font-medium text-[16px] text-primaryText mb-3">
                                    {feature.title}
                                </h3>
                                <p className="font-body text-[13px] text-secondaryText leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
