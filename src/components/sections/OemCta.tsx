"use client";

import { motion } from "framer-motion";

export default function OemCta() {
    return (
        <section
            className="relative py-[140px] overflow-hidden"
            style={{ backgroundColor: "#1A1A1A" }}
        >
            {/* Radial gold glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(0,57,38,0.12) 0%, transparent 60%)",
                }}
            />

            <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="font-body text-[11px] tracking-[0.3em] uppercase mb-6"
                    style={{ color: "#003926" }}
                >
                    For Businesses
                </motion.p>

                {/* Title with letter-spacing animation */}
                <motion.h2
                    initial={{ opacity: 0, letterSpacing: "0.3em" }}
                    whileInView={{ opacity: 1, letterSpacing: "0.05em" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="font-heading text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] text-white mb-8"
                >
                    <span className="block font-light italic">Your Vision.</span>
                    <span className="block font-semibold">Our Watchmaking.</span>
                </motion.h2>

                {/* Gold underline */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-[60px] h-[1px] mx-auto mb-8 origin-center"
                    style={{ backgroundColor: "#003926" }}
                />

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="font-body font-light text-[16px] md:text-[18px] leading-[1.9] max-w-[560px] mx-auto mb-12"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                >
                    End-to-end OEM &amp; private label watch manufacturing backed by decades
                    of expertise, global sourcing, and rigorous quality control.
                </motion.p>

                {/* CTA Button with pulse glow on hover */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <button
                        className="px-10 py-4 font-body text-[12px] tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,57,38,0.4)] hover:brightness-110"
                        style={{
                            backgroundColor: "#003926",
                            color: "#FFFFFF",
                        }}
                    >
                        Enquire Now
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
