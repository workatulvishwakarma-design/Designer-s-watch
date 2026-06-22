"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Building2, Factory, ShieldCheck, TrendingUp, CheckCircle, Award } from "lucide-react";

export default function OurExpertise() {
    return (
        <section className="bg-white py-24 md:py-36 relative overflow-hidden" id="expertise">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="font-dm uppercase text-[11px] tracking-[0.3em] text-[#B8935A] mb-4 block"
                    >
                        Our Expertise
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-[#1A1918] max-w-2xl mx-auto"
                    >
                        Manufacturing Excellence at Global Scale
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-16 h-[1px] bg-[#B8935A] mx-auto mt-6"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24 items-center">
                    {/* Corporate Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#FAF8F4] flex items-center justify-center border border-[#EDE8DF]">
                                <Building2 size={20} className="text-[#B8935A]" />
                            </div>
                            <h3 className="font-cormorant text-3xl text-[#1A1918]">Corporate & Institutional</h3>
                        </div>
                        <p className="font-dm text-sm md:text-base text-[#6B6560] leading-relaxed mb-6">
                            What began with trusted corporate gifting partnerships with labels like Donear and Siyaram has scaled into a multi-decade legacy in institutional B2B manufacturing. Nagpal Group is the silent engine behind some of the largest corporate timepiece orders in the country.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle size={16} className="text-[#B8935A] mt-1 shrink-0" />
                                <span className="font-dm text-sm text-[#4E4944]"><strong>TATA Indicom:</strong> Over 50,000 units delivered with seamless precision.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={16} className="text-[#B8935A] mt-1 shrink-0" />
                                <span className="font-dm text-sm text-[#4E4944]"><strong>Reebok India:</strong> Mammoth scale execution of over 1 Million units.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={16} className="text-[#B8935A] mt-1 shrink-0" />
                                <span className="font-dm text-sm text-[#4E4944]"><strong>ICICI Bank & Nikon:</strong> 100K+ and 300K+ units respectively, showcasing the group's adaptability.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={16} className="text-[#B8935A] mt-1 shrink-0" />
                                <span className="font-dm text-sm text-[#4E4944]"><strong>Amway, Top Pharma Brands:</strong> Consistent supply of 100K–200K high-quality units.</span>
                            </li>
                        </ul>
                        <div className="mt-8">
                            <Link
                                href="/nagpal-group"
                                className="group relative inline-flex items-center gap-3 font-dm text-[12px] tracking-[0.2em] uppercase text-[#B8935A]"
                            >
                                <span className="relative">
                                    Learn More
                                    <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out bg-[#B8935A]" />
                                </span>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="group-hover:translate-x-1 transition-transform duration-500"
                                >
                                    <path
                                        d="M4 10h12M12 6l4 4-4 4"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="/images/legacy-craftsmanship.png"
                            alt="Corporate Manufacturing"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1"
                    >
                        <Image
                            src="/images/mumbai.png"
                            alt="OEM Facility"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* OEM Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-1 lg:order-2"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#FAF8F4] flex items-center justify-center border border-[#EDE8DF]">
                                <Factory size={20} className="text-[#B8935A]" />
                            </div>
                            <h3 className="font-cormorant text-3xl text-[#1A1918]">OEM & Private Label</h3>
                        </div>
                        <p className="font-dm text-sm md:text-base text-[#6B6560] leading-relaxed mb-6">
                            The Nagpal Group provides end-to-end private label manufacturing for prominent domestic lifestyle brands and major e-commerce platforms. From design conceptualization and global sourcing to assembly and rigorous QC, the group delivers a turnkey solution.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                            <div className="bg-[#FAF8F4] p-5 rounded-xl border border-[#EDE8DF]">
                                <ShieldCheck size={20} className="text-[#003926] mb-3" />
                                <h4 className="font-dm font-medium text-sm text-[#1A1918] mb-1">SEDEX Audited</h4>
                                <p className="font-dm text-xs text-[#6B6560]">Stringent ethical compliance and world-class facility standards.</p>
                            </div>
                            <div className="bg-[#FAF8F4] p-5 rounded-xl border border-[#EDE8DF]">
                                <TrendingUp size={20} className="text-[#003926] mb-3" />
                                <h4 className="font-dm font-medium text-sm text-[#1A1918] mb-1">Volume Capability</h4>
                                <p className="font-dm text-xs text-[#6B6560]">Flawless execution from 5K pilot batches to multi-million unit pipelines.</p>
                            </div>
                            <div className="bg-[#FAF8F4] p-5 rounded-xl border border-[#EDE8DF] sm:col-span-2">
                                <Award size={20} className="text-[#003926] mb-3" />
                                <h4 className="font-dm font-medium text-sm text-[#1A1918] mb-1">Unmatched After-Sales</h4>
                                <p className="font-dm text-xs text-[#6B6560]">Nagpal Group's roots in spare parts distribution ensure lifelong serviceability, minimizing return rates and protecting brand reputation.</p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Link
                                href="/nagpal-group"
                                className="group relative inline-flex items-center gap-3 font-dm text-[12px] tracking-[0.2em] uppercase text-[#B8935A]"
                            >
                                <span className="relative">
                                    Learn More
                                    <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out bg-[#B8935A]" />
                                </span>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="group-hover:translate-x-1 transition-transform duration-500"
                                >
                                    <path
                                        d="M4 10h12M12 6l4 4-4 4"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
