"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
    return (
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-6 my-12">
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex-1 h-px bg-gradient-to-r from-transparent via-[#B8935A]/30 to-transparent"
                />
                <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="text-[#B8935A] text-xs tracking-[0.3em]"
                >
                    ✦
                </motion.span>
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex-1 h-px bg-gradient-to-r from-transparent via-[#B8935A]/30 to-transparent"
                />
            </div>
        </div>
    );
}
