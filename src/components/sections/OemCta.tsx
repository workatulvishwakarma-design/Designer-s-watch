"use client";

import { motion } from "framer-motion";

export default function OemCta() {
    return (
        <section
            className="relative py-[140px] overflow-hidden"
            style={{ backgroundColor: "#003926" }}
        >
            {/* Subtle grain texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

            {/* Radial gold glow from center */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(184,147,90,0.08) 0%, transparent 55%)",
                }}
            />

            {/* Top edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8935A]/30 to-transparent" />
            {/* Bottom edge highlight */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8935A]/30 to-transparent" />

            <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="font-body text-[11px] tracking-[0.4em] uppercase mb-6 font-medium text-[#B8935A]"
                >
                    FOR BUSINESSES & PARTNERS
                </motion.p>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                    whileInView={{ opacity: 1, letterSpacing: "0.02em" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="font-heading text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] text-white mb-8"
                >
                    <span className="block font-light italic text-[#E8DFD0]">Your Vision.</span>
                    <span className="block font-semibold">Our Watchmaking.</span>
                </motion.h2>

                {/* Accent underline */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-[60px] h-[1px] mx-auto mb-8 origin-center bg-[#B8935A]/60"
                />

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="font-body font-light text-[16px] md:text-[18px] leading-[1.9] max-w-[560px] mx-auto mb-12 text-white/60"
                >
                    End-to-end OEM &amp; private label watch manufacturing backed by decades
                    of expertise, global sourcing, and rigorous quality control.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <button
                        className="px-12 py-5 font-body text-[12px] tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_20px_40px_rgba(184,147,90,0.2)] hover:-translate-y-1 rounded-full border border-[#B8935A]/40 bg-[#B8935A]/10 text-[#B8935A] hover:bg-[#B8935A] hover:text-white hover:border-[#B8935A] backdrop-blur-sm"
                        suppressHydrationWarning
                    >
                        Enquire Now
                    </button>
                    <p className="mt-6 text-[11px] tracking-widest text-[#B8935A]/40 uppercase font-body italic">
                        Response within 24 hours
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
