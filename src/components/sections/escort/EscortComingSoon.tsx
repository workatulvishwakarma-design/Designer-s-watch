"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Bell, Check, Loader2, Sparkles } from "lucide-react";
import GrainOverlay from "@/components/ui/GrainOverlay";

export default function EscortComingSoon() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");
        // Simulate premium signup
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1200);
    };

    return (
        <section
            className="bg-[#FAF8F4] py-24 px-6 relative overflow-hidden"
            style={{
                backgroundImage: `repeating-linear-gradient(
                    -45deg,
                    rgba(184,147,90,0.03) 0px,
                    rgba(184,147,90,0.03) 1px,
                    transparent 1px,
                    transparent 12px
                )`
            }}
        >
            <GrainOverlay />
            
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="bg-white border border-[#003926]/10 rounded-3xl p-8 md:p-16 text-center shadow-xl relative overflow-hidden">
                    {/* Ambient Glow */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#B8935A]/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#003926]/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center"
                    >
                        {/* Premium Tag */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] bg-[#003926]/5 text-[#003926] mb-8 border border-[#003926]/10">
                            <Sparkles size={11} className="text-[#B8935A]" />
                            Coming Autumn 2026
                        </div>
                        
                        <h2 className="font-heading text-4xl md:text-6xl text-[#003926] mb-6 tracking-wide">
                            The Escort Series
                        </h2>
                        
                        <p className="font-cormorant italic text-xl md:text-2xl text-[#B8935A] mb-8">
                            Everyday Horological Excellence
                        </p>
                        
                        <p className="font-body text-[#1A1918]/70 text-base md:text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                            We are preparing a new chapter of everyday value timepieces. Combining robust construction, daily dependability, and clean aesthetics without compromising on our luxury design signature.
                        </p>

                        {/* Sign up form */}
                        <div className="w-full max-w-md mx-auto">
                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-[#003926]/5 border border-[#003926]/20 rounded-2xl p-6 flex flex-col items-center gap-3"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#003926] text-white flex items-center justify-center">
                                        <Check size={18} />
                                    </div>
                                    <span className="font-heading text-lg text-[#003926]">You are on the list</span>
                                    <span className="font-body text-xs text-[#1A1918]/60 text-center">
                                        We will send you private launch updates and exclusive early-access pricing.
                                    </span>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={status === "loading"}
                                        className="flex-1 px-5 py-4 rounded-xl border border-[#003926]/20 bg-white font-body text-sm text-[#1A1918] focus:outline-none focus:ring-1 focus:ring-[#B8935A] focus:border-[#B8935A] placeholder-[#1A1918]/40 transition-all duration-300 disabled:opacity-50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="px-6 py-4 bg-[#003926] hover:bg-[#B8935A] text-white rounded-xl font-body text-[11px] tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px] disabled:opacity-50"
                                    >
                                        {status === "loading" ? (
                                            <Loader2 size={14} className="animate-spin" />
                                        ) : (
                                            <>
                                                <Bell size={13} />
                                                Notify Me
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
