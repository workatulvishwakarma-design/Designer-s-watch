"use client";

import { Instagram, Linkedin, Facebook, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Footer() {
    const pathname = usePathname();
    const isEscort = pathname.includes("/collections/escort");

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any } }
    };

    const isHome = pathname === "/";

    return (
        <footer className="relative bg-[#FAF8F4] text-[#001F14] overflow-hidden pt-12 pb-12">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-[1800px] mx-auto px-4 xl:px-12"
            >
                {/* TOP AREA: Massive Cinematic Newsletter Block (Only on Home Page) */}
                {isHome && (
                    <motion.div variants={itemVariants} className="w-full mb-20">
                        <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#003926] via-[#001F14] to-[#000A06] px-8 py-24 md:py-36 flex flex-col items-center text-center shadow-[0_40px_80px_rgba(0,57,38,0.12)] group/newsletter">
                            {/* Immersive background lighting */}
                            <div className="absolute top-0 right-0 w-[80vw] h-[80vw] pointer-events-none opacity-[0.08] bg-[radial-gradient(circle_at_top_right,_#FAF8F4_0%,_transparent_60%)] rounded-full transition-transform duration-[3s] group-hover/newsletter:scale-110" />
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                            
                            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-[#FAF8F4]/60 font-semibold font-body mb-8 block flex items-center gap-6">
                                    <span className="w-12 h-px bg-[#FAF8F4]/20" />
                                    The Inner Circle
                                    <span className="w-12 h-px bg-[#FAF8F4]/20" />
                                </span>
                                
                                <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-display text-white mb-10 tracking-widest leading-[1.1] uppercase opacity-95">
                                    Join the World
                                </h2>
                                
                                <p className="text-[14px] md:text-[16px] text-white/50 font-body tracking-[0.1em] max-w-2xl mb-16 leading-relaxed">
                                    An exclusive invitation to discover new masterpieces, horological stories, and our relentless pursuit of perfection.
                                </p>
                                
                                <form className="relative w-full max-w-2xl group mx-auto" onSubmit={(e) => e.preventDefault()}>
                                    <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-[#FAF8F4]/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                    
                                    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full p-2 focus-within:border-white/30 focus-within:bg-white/10 transition-all duration-700 backdrop-blur-md">
                                        <input 
                                            type="email" 
                                            placeholder="ENTER YOUR EMAIL" 
                                            className="bg-transparent border-none text-[13px] text-white placeholder-white/30 px-10 py-5 w-full focus:outline-none focus:ring-0 font-body tracking-[0.2em] uppercase"
                                            required
                                            suppressHydrationWarning
                                        />
                                        <button 
                                            type="button" 
                                            className="h-[52px] px-10 rounded-full bg-[#FAF8F4] text-[#001F14] font-semibold text-[11px] tracking-[0.2em] uppercase flex items-center gap-4 hover:bg-white transition-all duration-700 hover:shadow-[0_10px_30px_rgba(250,248,244,0.3)] group/btn shrink-0"
                                            suppressHydrationWarning
                                        >
                                            <span className="relative z-10">Subscribe</span>
                                            <ArrowRight size={16} className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-500" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* MIDDLE AREA: Asymmetrical Premium Link Layout */}
                <div className="flex flex-col lg:flex-row justify-between gap-24 lg:gap-12 mb-32 px-4 md:px-12">
                    
                    {/* Brand Anchor (Left) */}
                    <motion.div variants={itemVariants} className="lg:w-[35%] flex flex-col justify-start">
                        <Link href="/" className="block transition-opacity duration-700 hover:opacity-60 w-fit mb-12">
                            <Image
                                src={isEscort ? "/images/escort_b.png" : "/images/designer world logo_B.png"}
                                alt="Designer World Logo"
                                width={220}
                                height={55}
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-[15px] text-[#003926]/60 leading-loose font-body tracking-wide max-w-sm">
                            Four generations of integrated watchmaking excellence. We don't just tell time; we craft the instruments that define it.
                        </p>
                    </motion.div>

                    {/* Editorial Link Masonry (Right) */}
                    <div className="lg:w-[65%] flex flex-wrap md:flex-nowrap justify-between gap-16 lg:gap-8">
                        {/* Collections */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-10">
                            <h6 className="text-[#001F14] text-[10px] tracking-[0.3em] uppercase font-bold font-body">Collections</h6>
                            <nav className="flex flex-col gap-5 text-[13px] font-body tracking-[0.1em] text-[#003926]/70 uppercase font-medium">
                                <Link href="/collections/dsigner" className="hover:text-[#001F14] transition-colors duration-500 w-fit relative group/link">D'Signer Core<span className="absolute -bottom-1 left-0 w-0 h-px bg-[#003926] group-hover/link:w-full transition-all duration-500" /></Link>
                                <Link href="/collections/escort" className="hover:text-[#001F14] transition-colors duration-500 w-fit relative group/link">Escort Series<span className="absolute -bottom-1 left-0 w-0 h-px bg-[#003926] group-hover/link:w-full transition-all duration-500" /></Link>
                                <Link href="/collections/men" className="hover:text-[#001F14] transition-colors duration-500 w-fit relative group/link">Men's Timepieces<span className="absolute -bottom-1 left-0 w-0 h-px bg-[#003926] group-hover/link:w-full transition-all duration-500" /></Link>
                                <Link href="/collections/women" className="hover:text-[#001F14] transition-colors duration-500 w-fit relative group/link">Women's Timepieces<span className="absolute -bottom-1 left-0 w-0 h-px bg-[#003926] group-hover/link:w-full transition-all duration-500" /></Link>
                            </nav>
                        </motion.div>

                        {/* The Maison */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-10">
                            <h6 className="text-[#001F14] text-[10px] tracking-[0.3em] uppercase font-bold font-body">The Maison</h6>
                            <nav className="flex flex-col gap-6 text-[13px] font-body tracking-[0.1em] text-[#003926]/70 uppercase font-medium">
                                <Link href="/about" className="hover:text-[#001F14] transition-colors duration-500 w-fit">Our Heritage</Link>
                                <Link href="/nagpal-group" className="hover:text-[#001F14] transition-colors duration-500 w-fit">Pillars</Link>
                                <Link href="/about#expertise" className="hover:text-[#001F14] transition-colors duration-500 w-fit">Craftsmanship</Link>
                            </nav>
                        </motion.div>

                        {/* Client Services */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-10">
                            <h6 className="text-[#001F14] text-[10px] tracking-[0.3em] uppercase font-bold font-body">Client Services</h6>
                            <nav className="flex flex-col gap-6 text-[13px] font-body tracking-[0.1em] text-[#003926]/70 uppercase font-medium">
                                <Link href="/contact" className="hover:text-[#001F14] transition-colors duration-500 w-fit">Contact Us</Link>
                                <Link href="/faq" className="hover:text-[#001F14] transition-colors duration-500 w-fit">FAQ</Link>
                                <Link href="/service" className="hover:text-[#001F14] transition-colors duration-500 w-fit">Watch Service</Link>
                                <a href="https://nagpalgroup.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#001F14] transition-colors duration-500 w-fit">Corporate Portal</a>
                            </nav>
                        </motion.div>

                        {/* Legal */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-10">
                            <h6 className="text-[#001F14] text-[10px] tracking-[0.3em] uppercase font-bold font-body">Legal</h6>
                            <nav className="flex flex-col gap-6 text-[13px] font-body tracking-[0.1em] text-[#003926]/70 uppercase font-medium">
                                <Link href="/privacy-policy" className="hover:text-[#001F14] transition-colors duration-500 w-fit">Privacy</Link>
                                <Link href="/terms-and-conditions" className="hover:text-[#001F14] transition-colors duration-500 w-fit">Terms</Link>
                                <Link href="/return-cancellation-policy" className="hover:text-[#001F14] transition-colors duration-500 w-fit">Returns</Link>
                                <Link href="/shipping-policy" className="hover:text-[#001F14] transition-colors duration-500 w-fit">Shipping</Link>
                                <Link href="/cookie-policy" className="hover:text-[#001F14] transition-colors duration-500 w-fit">Cookies</Link>
                            </nav>
                        </motion.div>
                    </div>
                </div>

                {/* BOTTOM AREA: Socials & Architectural Final Strip */}
                <motion.div variants={itemVariants} className="relative pt-12 flex flex-col md:flex-row justify-between items-center gap-10 px-4 md:px-12 border-t border-[#003926]/5">
                    
                    {/* Copyright & Statement */}
                    <div className="flex flex-col items-start gap-4 text-[10px] font-body tracking-[0.2em] text-[#003926]/40 uppercase">
                        <div className="flex items-center gap-4">
                            <span>Crafted in India</span>
                            <span className="w-1 h-1 rounded-full bg-[#001F14]/30" />
                            <span>Designed for the World</span>
                        </div>
                        <p>&copy; {new Date().getFullYear()} Designer World. All rights reserved.</p>
                    </div>

                    {/* Premium Social Glass Circles */}
                    <div className="flex gap-6">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white shadow-[0_6px_16px_rgba(0,31,20,0.03)] border border-[#003926]/5 flex items-center justify-center text-[#003926]/50 hover:text-white hover:bg-[#003926] hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(0,57,38,0.15)] transition-all duration-500">
                            <Instagram size={18} strokeWidth={1.5} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white shadow-[0_6px_16px_rgba(0,31,20,0.03)] border border-[#003926]/5 flex items-center justify-center text-[#003926]/50 hover:text-white hover:bg-[#003926] hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(0,57,38,0.15)] transition-all duration-500">
                            <Linkedin size={18} strokeWidth={1.5} />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white shadow-[0_6px_16px_rgba(0,31,20,0.03)] border border-[#003926]/5 flex items-center justify-center text-[#003926]/50 hover:text-white hover:bg-[#003926] hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(0,57,38,0.15)] transition-all duration-500">
                            <Facebook size={18} strokeWidth={1.5} />
                        </a>
                    </div>

                </motion.div>
            </motion.div>
        </footer>
    );
}
