"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Check, Send, Loader2 } from "lucide-react";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Link from "next/link";

export default function ContactSection() {
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("loading");
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setFormStatus("success");
    };

    return (
        <section className="bg-[#FAF8F4] relative overflow-hidden">
            <GrainOverlay />

            {/* Contact Hero */}
            <div className="relative py-24 px-6 text-center overflow-hidden" style={{
                background: `linear-gradient(135deg, #F8F5F0 0%, #EFE9E0 100%)`
            }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] text-gold select-none pointer-events-none z-0">
                    <span className="font-heading text-[200px]">✦</span>
                </div>

                <div className="relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-gold font-body text-[11px] tracking-[0.3em] uppercase mb-4 inline-block"
                    >
                        GET IN TOUCH
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-heading text-5xl md:text-6xl text-primaryText mb-6"
                    >
                        We&apos;d Love to Hear <span className="italic">From You.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-body text-secondaryText text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Whether it&apos;s a query, OEM enquiry, or partnership — our team responds within 24 hours.
                    </motion.p>
                </div>
            </div>

            {/* Contact Body */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* COL 1: Contact Cards */}
                    <div className="lg:col-span-4 space-y-6">
                        <ContactCard
                            icon={MapPin}
                            title="Visit Us"
                            content="Nagpal Group, Designer World Building, Mumbai, India"
                            delay={0.1}
                        />
                        <ContactCard
                            icon={Phone}
                            title="Call Us"
                            content="+91 XXXXX XXXXX"
                            subContent="Mon–Sat, 10AM–6PM"
                            delay={0.2}
                        />
                        <ContactCard
                            icon={Mail}
                            title="Email Us"
                            content="info@designerworld.in"
                            subContent="Response within 24hrs"
                            delay={0.3}
                        />
                    </div>

                    {/* COL 2 & 3: Contact Form */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white border border-border rounded-[20px] p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
                        >
                            {formStatus === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 text-center"
                                >
                                    <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <Check size={40} className="text-gold" />
                                    </div>
                                    <h2 className="font-heading text-4xl text-primaryText mb-4">Message Sent!</h2>
                                    <p className="font-body text-secondaryText mb-10">We&apos;ll get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => setFormStatus("idle")}
                                        className="text-gold font-body text-sm tracking-widest uppercase border-b border-gold"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <h2 className="font-heading text-3xl text-primaryText mb-10">Send Us a Message</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <InputField label="Full Name" placeholder="Atul Vishwakarma" required />
                                            <InputField label="Email Address" type="email" placeholder="atul@example.com" required />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <InputField label="Phone Number" placeholder="+91 00000 00000" />
                                            <InputField label="Subject" placeholder="How can we help?" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-body tracking-widest uppercase text-lightText mb-3">Enquiry Type</label>
                                            <select className="w-full bg-[#FAF8F4] border border-border rounded-xl px-5 py-4 font-body text-sm focus:border-gold focus:ring-1 focus:ring-gold/10 outline-none transition-all appearance-none cursor-pointer">
                                                <option>General Enquiry</option>
                                                <option>OEM / Private Label</option>
                                                <option>Retail Partnership</option>
                                                <option>Warranty / Service</option>
                                                <option>Press / Media</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-body tracking-widest uppercase text-lightText mb-3">Your Message</label>
                                            <textarea
                                                className="w-full bg-[#FAF8F4] border border-border rounded-xl px-5 py-4 font-body text-sm focus:border-gold focus:ring-1 focus:ring-gold/10 outline-none transition-all resize-none"
                                                rows={5}
                                                placeholder="Tell us about your project or query..."
                                                required
                                            ></textarea>
                                        </div>

                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative w-5 h-5 border border-border rounded flex items-center justify-center transition-colors group-hover:border-gold">
                                                <input type="checkbox" className="absolute inset-0 opacity-0 cursor-pointer peer" />
                                                <Check size={14} className="text-gold opacity-0 peer-checked:opacity-100 transition-opacity" />
                                            </div>
                                            <span className="text-[13px] font-body text-secondaryText">I&apos;m interested in OEM manufacturing partnership</span>
                                        </label>

                                        <button
                                            type="submit"
                                            disabled={formStatus === "loading"}
                                            className="w-full h-14 bg-bg-dark text-white rounded-xl font-body text-sm tracking-[0.15em] uppercase hover:bg-gold transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-70"
                                        >
                                            {formStatus === "loading" ? (
                                                <Loader2 size={18} className="animate-spin" />
                                            ) : (
                                                <>
                                                    <Send size={18} />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* OEM CTA Strip */}
            <div className="bg-gold py-16 px-6 text-center relative z-10 shadow-lg">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <h2 className="font-heading text-4xl md:text-5xl text-primaryText mb-4">
                        Interested in OEM or Private Label?
                    </h2>
                    <p className="font-body text-primaryText/70 text-lg mb-10 italic">
                        We manufacture for 500+ brands worldwide.
                    </p>
                    <Link
                        href="/oem"
                        className="px-10 py-4 bg-primaryText text-white font-body text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-gold-light hover:text-primaryText transition-all transform hover:scale-105 shadow-xl"
                    >
                        Start Your Project →
                    </Link>
                </div>
            </div>

            {/* Map / Location Section */}
            <div className="bg-[#F2EDE6] py-24 px-6 relative overflow-hidden">
                <GrainOverlay />
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
                            <MapPin size={32} className="text-gold" />
                        </div>
                        <h3 className="font-heading text-4xl text-primaryText mb-4">Visit Our Main Facility</h3>
                        <p className="font-body text-secondaryText text-lg mb-8 leading-relaxed">
                            Designer World, Nagpal Group HQ. Mumbai, India — The Heart of Indian Horology.
                        </p>
                        <div className="flex gap-12 border-t border-border pt-8">
                            <div>
                                <span className="block text-[10px] uppercase tracking-widest text-lightText mb-1">Latitude</span>
                                <span className="font-display text-xl text-gold">19.0760° N</span>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase tracking-widest text-lightText mb-1">Longitude</span>
                                <span className="font-display text-xl text-gold">72.8777° E</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[450px] bg-white rounded-2xl border border-border shadow-2xl overflow-hidden relative group">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120658.123456789!2d72.8!3d19.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(0.5) contrast(0.9)' }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ContactCard({ icon: Icon, title, content, subContent, delay }: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    title: string;
    content: string;
    subContent?: string;
    delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="group bg-white border border-border rounded-xl p-8 hover:border-gold transition-all duration-300 hover:-translate-y-1 shadow-sm"
        >
            <div className="w-12 h-12 bg-[#FAF8F4] rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                <Icon size={24} className="text-gold" />
            </div>
            <h3 className="font-body font-medium text-[15px] text-primaryText mb-2">{title}</h3>
            <p className="font-body text-sm text-secondaryText leading-relaxed">{content}</p>
            {subContent && (
                <p className="font-body text-[12px] text-lightText mt-2 italic">{subContent}</p>
            )}
        </motion.div>
    );
}

function InputField({ label, placeholder, ...props }: { label: string; placeholder?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div>
            <label className="block text-[11px] font-body tracking-widest uppercase text-lightText mb-3">{label}</label>
            <input
                className="w-full bg-[#FAF8F4] border border-border rounded-xl px-5 py-4 font-body text-sm focus:border-gold focus:ring-1 focus:ring-gold/10 outline-none transition-all"
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
}

