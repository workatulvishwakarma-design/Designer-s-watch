"use client";

import { Instagram, Linkedin, Facebook } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    const isEscort = pathname.includes("/collections/escort");

    return (
        <footer className="bg-bg-dark text-white/40 font-body font-light pt-24 pb-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">

                    {/* Column 1: Brand */}
                    <div className="flex flex-col gap-6 lg:col-span-1">
                        <Link href="/" className="relative h-[65px] w-[260px] block transition-opacity hover:opacity-80">
                            <Image
                                src="/images/designer world logo_w.png"
                                alt="Designer World Logo"
                                fill
                                className="object-contain object-left"
                                onError={(e) => { (e.target as HTMLImageElement).src = '/images/designer world logo_B.png'; }}
                            />
                        </Link>
                        <p className="text-[14px] leading-relaxed max-w-[240px]">
                            Built on Legacy. Designed for Now. Four generations of integrated watchmaking excellence.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8935A] transition-colors duration-300"><Instagram size={18} /></a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8935A] transition-colors duration-300"><Linkedin size={18} /></a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8935A] transition-colors duration-300"><Facebook size={18} /></a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h6 className="text-white text-[12px] tracking-[0.1em] uppercase">Quick Links</h6>
                        <nav className="flex flex-col gap-3 text-[14px]">
                            <Link href="/" className="hover:text-gold transition-colors duration-300 w-fit">Home</Link>
                            <Link href="/collections/men" className="hover:text-gold transition-colors duration-300 w-fit">Men&apos;s Collection</Link>
                            <Link href="/collections/women" className="hover:text-gold transition-colors duration-300 w-fit">Women&apos;s Collection</Link>
                            <Link href="/collections/dsigner" className="hover:text-gold transition-colors duration-300 w-fit">All Watches</Link>
                        </nav>
                    </div>

                    {/* Column 3: Important Links */}
                    <div className="flex flex-col gap-6">
                        <h6 className="text-white text-[12px] tracking-[0.1em] uppercase">Important Links</h6>
                        <nav className="flex flex-col gap-3 text-[14px]">
                            <Link href="/about" className="hover:text-gold transition-colors duration-300 w-fit">About Us</Link>
                            <Link href="/about#story" className="hover:text-gold transition-colors duration-300 w-fit">History</Link>
                            <Link href="/about#expertise" className="hover:text-gold transition-colors duration-300 w-fit">Our Expertise</Link>
                            <Link href="/about#leadership" className="hover:text-gold transition-colors duration-300 w-fit">Founder&apos;s Perspective</Link>
                        </nav>
                    </div>
 
                    {/* Column 4: Brands */}
                    <div className="flex flex-col gap-6">
                        <h6 className="text-white text-[12px] tracking-[0.1em] uppercase">Our Brands</h6>
                        <nav className="flex flex-col gap-3 text-[14px]">
                            <Link href="/collections/dsigner" className="hover:text-gold transition-colors duration-300 w-fit">D&apos;Signer</Link>
                            <Link href="/collections/escort" className="hover:text-gold transition-colors duration-300 w-fit">Escort</Link>
                            <a href="https://nagpalgroup.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors duration-300 w-fit">Nagpal Group</a>
                            <Link href="/about#expertise" className="hover:text-gold transition-colors duration-300 w-fit">Corporate / OEM</Link>
                        </nav>
                    </div>

                    {/* Column 5: Legal & Contact */}
                    <div className="flex flex-col gap-6">
                        <h6 className="text-white text-[12px] tracking-[0.1em] uppercase">Connect & Legal</h6>
                        <div className="flex flex-col gap-4 text-[14px]">
                            <p>Contact details are managed <br/> via the Admin Dashboard.</p>
                            <p className="mt-2 text-[#9C9690] text-xs">For B2B orders or support,<br/> please reach out to us directly.</p>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[12px] tracking-[0.02em]">
                        &copy; {new Date().getFullYear()} Designer World. Nagpal Group Since 1940. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-[12px] tracking-[0.02em]">
                        <Link href="/" className="hover:text-[#B8935A] transition-colors">Privacy Policy</Link>
                        <Link href="/" className="hover:text-[#B8935A] transition-colors">Terms of Service</Link>
                        <Link href="/" className="hover:text-[#B8935A] transition-colors">Shipping Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
