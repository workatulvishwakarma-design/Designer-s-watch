"use client";

import Header from "@/components/sections/Header";
import EscortHero from "@/components/sections/escort/EscortHero";
import EscortGrid from "@/components/sections/escort/EscortGrid";
import Footer from "@/components/sections/Footer";
import NewsletterStrip from "@/components/ui/NewsletterStrip";
import SectionDivider from "@/components/ui/SectionDivider";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CartDrawer from "@/components/ui/CartDrawer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EscortPage() {
    return (
        <main className="min-h-screen bg-[#FAF8F4] relative">
            <Header />
            <CartDrawer />

            <EscortHero />

            <SectionDivider />
            <EscortGrid />

            <SectionDivider />

            {/* Comparison Callout */}
            <section className="bg-[#F7F3EE] py-24 px-6 relative overflow-hidden">
                <GrainOverlay />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-heading text-4xl md:text-5xl text-[#003926] mb-6"
                    >
                        D&apos;SIGNER vs ESCORT
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-body text-[#1A1918]/70 text-lg mb-16"
                    >
                        Find the perfect watch for your lifestyle.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
                        {/* D'SIGNER side */}
                        <div className="bg-white border border-[#003926]/20 rounded-2xl p-10 flex flex-col items-center shadow-sm">
                            <span className="text-gold font-body text-[10px] tracking-[0.3em] uppercase mb-4">D&apos;SIGNER</span>
                            <ul className="text-[#1A1918] font-body text-sm space-y-4 mb-10 text-center">
                                <li className="opacity-80">Premium Materials</li>
                                <li className="opacity-80">₹1,299 – ₹4,999</li>
                                <li className="opacity-80">Dress & Special Occasion</li>
                            </ul>
                            <Link
                                href="/collections/dsigner"
                                className="px-8 py-3 bg-gold text-white font-body text-[11px] tracking-widest uppercase rounded-xl hover:bg-bg-dark transition-all duration-300"
                            >
                                Shop D&apos;Signer
                            </Link>
                        </div>

                        {/* ESCORT side */}
                        <div className="bg-white border border-[#003926]/20 rounded-2xl p-10 flex flex-col items-center shadow-sm">
                            <span className="text-[#003926] font-body text-[10px] tracking-[0.3em] uppercase mb-4">ESCORT</span>
                            <ul className="text-[#1A1918] font-body text-sm space-y-4 mb-10 text-center">
                                <li className="opacity-80">Everyday Durability</li>
                                <li className="opacity-80">₹799 – ₹2,499</li>
                                <li className="opacity-80">Daily Wear & Performance</li>
                            </ul>
                            <Link
                                href="/collections/escort"
                                className="px-8 py-3 bg-[#003926] text-white font-body text-[11px] tracking-widest uppercase rounded-xl hover:bg-gold transition-all duration-300"
                            >
                                Shop Escort
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <NewsletterStrip />
            <Footer />
        </main>
    );
}
