"use client";

import { Search, User, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-0 left-0 w-full z-50 py-4 md:py-8"
        >
            <div className="container mx-auto px-6 md:px-12 xl:px-24 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex flex-col group">
                    <span className="text-xl md:text-2xl font-serif text-white tracking-[0.1em] leading-tight">
                        DESIGNER WORLD
                    </span>
                    <span className="text-[10px] text-white/60 tracking-[0.2em] font-sans">
                        NAGPAL GROUP SINCE 1940
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden xl:flex items-center gap-10">
                    {["HOME", "ABOUT US", "OUR STRENGTHS", "DESIGNER", "ESCORT", "CONTACT US"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(" ", "-")}`}
                            className="text-[10px] font-sans text-white/80 tracking-[0.2em] hover:text-white transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Icons */}
                <div className="flex items-center gap-6 text-white/90">
                    <button className="hover:text-white transition-colors">
                        <User size={20} strokeWidth={1.5} />
                    </button>
                    <button className="hover:text-white transition-colors">
                        <Search size={20} strokeWidth={1.5} />
                    </button>
                    <button className="hover:text-white transition-colors">
                        <Heart size={20} strokeWidth={1.5} />
                    </button>
                    <button className="hover:text-white transition-colors relative">
                        <ShoppingBag size={20} strokeWidth={1.5} />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-[8px] flex items-center justify-center text-primaryText font-bold">
                            0
                        </span>
                    </button>
                </div>
            </div>
        </motion.header>
    );
}
