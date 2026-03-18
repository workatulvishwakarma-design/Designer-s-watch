"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/store/cart";

export default function Header({ hasAnnouncement = false }: { hasAnnouncement?: boolean }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const pathname = usePathname();
    const { items, setIsOpen } = useCartStore();
    
    // Derived state for hydration consistency
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true) }, []);
    
    const cartCount = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        {
            label: "Collections",
            href: "/collections/dsigner", // Default to dsigner if clicked
            dropdown: [
                { label: "D'Signer — Premium", href: "/collections/dsigner", desc: "Luxury & Refinement" },
                { label: "Escort — Everyday", href: "/collections/escort", desc: "Reliable & Approachable" },
            ]
        },
        { label: "NAGPAL GROUP", href: "/nagpal-group" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ];
 
    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname === href;
    };

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 w-full z-[100] transition-all duration-500"
                style={{
                    backgroundColor: scrolled ? "rgba(250,248,244,0.85)" : "transparent",
                    backdropFilter: scrolled ? "blur(16px)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(184,147,90,0.15)" : "1px solid transparent",
                }}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-[72px]">
                    {/* Logo */}
                    <Link href="/" className="relative h-[54px] w-[260px] transition-opacity hover:opacity-80">
                        {pathname.includes("/collections/escort") ? (
                            <Image
                                src="/images/escort_b.png"
                                alt="Escort Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        ) : (
                            <Image
                                src="/images/designer world logo_B.png"
                                alt="Designer World Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        )}
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex items-center gap-10">
                        {navLinks.map((item) => (
                            <div
                                key={item.label}
                                className="relative group"
                                onMouseEnter={() => item.dropdown && setShowDropdown(true)}
                                onMouseLeave={() => item.dropdown && setShowDropdown(false)}
                            >
                                <Link
                                    href={item.href}
                                    className="relative flex items-center gap-1 text-[12px] font-body tracking-[0.08em] uppercase transition-colors duration-300"
                                    style={{ color: isActive(item.href) ? "#B8935A" : "#1A1918" }}
                                >
                                    {item.label}
                                    {item.dropdown && <ChevronDown size={12} className={`transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`} />}
                                    <span
                                        className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-300 ${isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"}`}
                                        style={{ backgroundColor: "#B8935A" }}
                                    />
                                </Link>

                                {/* Dropdown */}
                                {item.dropdown && (
                                    <AnimatePresence>
                                        {showDropdown && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute top-full -left-6 pt-6 w-[280px]"
                                            >
                                                <div className="bg-white border border-border rounded-2xl shadow-2xl p-4 grid gap-2 overflow-hidden">
                                                    {item.dropdown.map((sub) => (
                                                        <Link
                                                            key={sub.label}
                                                            href={sub.href}
                                                            className="flex flex-col p-3 rounded-xl hover:bg-background transition-colors"
                                                        >
                                                            <span className="text-[12px] font-body font-medium text-primaryText uppercase tracking-wider">{sub.label}</span>
                                                            <span className="text-[10px] text-lightText">{sub.desc}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-5">
                        {/* Removed dead search button */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="relative transition-colors duration-300"
                            style={{ color: "#1A1918" }}
                        >
                            <ShoppingBag size={18} strokeWidth={1.5} />
                            {mounted && cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#B8935A] rounded-full text-[8px] flex items-center justify-center text-white font-body font-medium">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <Link
                            href="/collections/dsigner"
                            className="hidden md:flex items-center px-5 py-2 bg-gold text-white font-body text-[11px] tracking-[0.1em] uppercase rounded-full hover:bg-gold-light transition-colors duration-300"
                        >
                            Shop Now
                        </Link>
                        {/* Mobile hamburger */}
                        <button
                            className="xl:hidden transition-colors duration-300"
                            style={{ color: "#1A1918" }}
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Nav Drawer */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed top-[72px] left-0 w-full z-[99] bg-background/95 backdrop-blur-xl border-b border-border"
                >
                    <nav className="flex flex-col px-6 py-4 divide-y divide-border">
                        {navLinks.map((item) =>
                            item.dropdown ? (
                                <div key={item.label} className="py-1">
                                    <span className="flex items-center min-h-[48px] font-body text-[12px] tracking-[0.12em] uppercase text-[#9C9690]">
                                        {item.label}
                                    </span>
                                    <div className="flex flex-col pl-4 gap-1 pb-2">
                                        {item.dropdown.map((sub) => (
                                            <Link
                                                key={sub.label}
                                                href={sub.href}
                                                onClick={() => setMobileOpen(false)}
                                                className="flex flex-col min-h-[48px] justify-center font-body text-[13px] tracking-[0.08em] uppercase text-primaryText hover:text-gold transition-colors"
                                            >
                                                <span>{sub.label}</span>
                                                <span className="text-[10px] text-lightText normal-case tracking-normal mt-0.5">{sub.desc}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center min-h-[48px] font-body text-[13px] tracking-[0.1em] uppercase text-primaryText hover:text-gold transition-colors"
                                >
                                    {item.label}
                                </Link>
                            )
                        )}
                        <div className="pt-4 pb-2">
                            <Link
                                href="/collections/dsigner"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-center w-full min-h-[48px] px-6 bg-gold text-white font-body text-[12px] tracking-[0.12em] uppercase rounded-full hover:bg-[#1A1918] transition-colors duration-300"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </nav>
                </motion.div>
            )}
        </>
    );
}
