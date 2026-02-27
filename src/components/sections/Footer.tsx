"use client";

import { Instagram, Linkedin, Facebook } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-bg-dark text-white/40 font-body font-light pt-24 pb-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

                    {/* Column 1: Brand */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <h5 className="font-heading italic text-white text-[24px] tracking-[0.02em] leading-tight mb-1">
                                Designer World
                            </h5>
                            <p className="font-body text-gold text-[10px] tracking-[0.2em] uppercase">
                                by Nagpal Group
                            </p>
                        </div>
                        <p className="text-[14px] leading-relaxed max-w-[240px]">
                            Four generations of integrated watchmaking excellence. From bespoke OEM solutions to premium timepieces.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="hover:text-gold transition-colors duration-300"><Instagram size={18} /></a>
                            <a href="#" className="hover:text-gold transition-colors duration-300"><Linkedin size={18} /></a>
                            <a href="#" className="hover:text-gold transition-colors duration-300"><Facebook size={18} /></a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h6 className="text-white text-[12px] tracking-[0.1em] uppercase">Quick Links</h6>
                        <nav className="flex flex-col gap-3 text-[14px]">
                            <Link href="/" className="hover:text-gold transition-colors duration-300 w-fit">Home</Link>
                            <Link href="#collections" className="hover:text-gold transition-colors duration-300 w-fit">Collections</Link>
                            <Link href="/about" className="hover:text-gold transition-colors duration-300 w-fit">About</Link>
                            <Link href="#oem" className="hover:text-gold transition-colors duration-300 w-fit">OEM</Link>
                            <Link href="#contact" className="hover:text-gold transition-colors duration-300 w-fit">Contact</Link>
                        </nav>
                    </div>

                    {/* Column 3: Brands */}
                    <div className="flex flex-col gap-6">
                        <h6 className="text-white text-[12px] tracking-[0.1em] uppercase">Our Brands</h6>
                        <nav className="flex flex-col gap-3 text-[14px]">
                            <a href="#" className="hover:text-gold transition-colors duration-300 w-fit">D&apos;Signer</a>
                            <a href="#" className="hover:text-gold transition-colors duration-300 w-fit">Escort</a>
                            <a href="#" className="hover:text-gold transition-colors duration-300 w-fit">International Brands</a>
                        </nav>
                    </div>

                    {/* Column 4: Contact */}
                    <div className="flex flex-col gap-6">
                        <h6 className="text-white text-[12px] tracking-[0.1em] uppercase">Connect</h6>
                        <div className="flex flex-col gap-4 text-[14px]">
                            <p>Plot No. 123, Watch Industrial Area,<br />Delhi, India - 110001</p>
                            <p>+91 (11) 2345 6789</p>
                            <p>contact@designerworld.com</p>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[12px] tracking-[0.02em]">
                        &copy; {new Date().getFullYear()} Designer World. Nagpal Group. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-[12px] tracking-[0.02em]">
                        <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gold transition-colors">Terms</a>
                        <a href="#" className="hover:text-gold transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
