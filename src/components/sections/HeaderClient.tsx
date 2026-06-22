"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, ArrowUpRight, Compass, Feather, Zap, Diamond, ChevronRight, ChevronDown, Search, Gem, Shield, Award, Sparkles, Droplets, Circle, Users, Flame, Watch } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/store/cart";
import dynamic from "next/dynamic";

const SearchOverlay = dynamic(() => import("@/components/ui/SearchOverlay"), { ssr: false });
import { collections, Collection } from "@/data/collections";
import { allModelFamilies } from "@/data/productData";

export type MegaMenuPayload = {
    collections: Collection[];
};

interface HeaderClientProps {
    hasAnnouncement?: boolean;
    megaMenuPayload: MegaMenuPayload;
}

const iconMap: Record<string, React.ReactNode> = {
    mens: <Compass size={18} strokeWidth={1.5} />,
    womens: <Feather size={18} strokeWidth={1.5} />,
    escort: <Zap size={18} strokeWidth={1.5} />,
    default: <Diamond size={18} strokeWidth={1.5} />,
};

const getIcon = (slug: string) => {
    if (slug.includes("mens") || slug.includes("men")) return iconMap.mens;
    if (slug.includes("womens") || slug.includes("women")) return iconMap.womens;
    if (slug.includes("escort")) return iconMap.escort;
    return iconMap.default;
};

const getCollectionIcon = (slug: string) => {
    switch (slug) {
        case "grandeur": return <Gem size={13} className="text-[#B8935A]" />;
        case "eternal": return <Shield size={13} className="text-[#B8935A]" />;
        case "serene": return <Feather size={13} className="text-[#B8935A]" />;
        case "bolt": return <Zap size={13} className="text-[#B8935A]" />;
        case "vortex": return <Compass size={13} className="text-[#B8935A]" />;
        case "ignite": return <Flame size={13} className="text-[#B8935A]" />;
        case "hallmark": return <Award size={13} className="text-[#B8935A]" />;
        case "quest": return <Compass size={13} className="text-[#B8935A]" />;
        case "pulse": return <Watch size={13} className="text-[#B8935A]" />;
        case "glimmer": return <Sparkles size={13} className="text-[#B8935A]" />;
        case "tidemark": return <Droplets size={13} className="text-[#B8935A]" />;
        case "echo": return <Circle size={13} className="text-[#B8935A]" />;
        case "duetto": return <Users size={13} className="text-[#B8935A]" />;
        default: return <Diamond size={13} className="text-[#B8935A]" />;
    }
};

/* ─── Mobile Accordion Group ─── */
function MobileAccordionGroup({
    title,
    icon,
    children,
    defaultOpen = false,
}: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="rounded-xl overflow-hidden bg-white border border-[#003926]/5 shadow-[0_4px_16px_rgba(0,31,20,0.03)]">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-4 mobile-accordion-trigger"
            >
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#FAF8F4] flex items-center justify-center text-[#003926]/40 shrink-0">
                        {icon}
                    </div>
                    <span className="text-[12px] font-body font-semibold text-[#001F14] uppercase tracking-[0.15em]">
                        {title}
                    </span>
                </div>
                <ChevronRight
                    size={14}
                    className={`text-[#003926]/25 mobile-accordion-chevron ${open ? "expanded" : ""}`}
                />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 pt-1 border-t border-[#003926]/5">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const dropdownContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const dropdownItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

export default function HeaderClient({ hasAnnouncement = false, megaMenuPayload }: HeaderClientProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();
    const { items, setIsOpen } = useCartStore();
    const [mounted, setMounted] = useState(false);
    
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x: x * 8, y: y * 8 });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 });
    };
    
    // Preview payload state
    const [activePreview, setActivePreview] = useState<{
        slug: string;
        title: string;
        tagline: string;
        description: string;
        heroImage: string;
        ctaLabel: string;
    }>({
        slug: "mens-designer",
        title: "D'Signer Men's",
        tagline: "Precision Meets Commanding Aesthetics",
        description: "Engineered with surgical-grade stainless steel and sapphire glass. Premium luxury timepieces crafted for the modern man.",
        heroImage: "/images/new-img/model-2/950/950/950GNFS.16G.png",
        ctaLabel: "Browse Men's D'Signer"
    });

    useEffect(() => { setMounted(true); }, []);
    const cartCount = mounted ? items.reduce((a, i) => a + i.quantity, 0) : 0;

    // Build search data
    const searchProducts = useMemo(() => allModelFamilies.slice(0, 60).map(f => ({
        name: f.name,
        slug: f.slug,
        brand: f.brand,
        familyId: f.familyId,
        image: f.variants[0]?.gallery?.primary || "",
        price: `From ₹${f.priceRange.min.toLocaleString("en-IN")}`,
    })), []);

    const searchCollections = useMemo(() => collections.map(c => ({
        name: c.title,
        slug: c.slug,
        description: c.tagline,
        gender: c.gender,
    })), []);

    const isHeroPage = pathname === "/" || pathname === "/about" || pathname === "/nagpal-group";

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    // Close mega menu on route change
    useEffect(() => {
        setShowMegaMenu(false);
        setMobileOpen(false);
    }, [pathname]);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Collections", href: "/collections/dsigner", isMega: true },
        { label: "Pillars", href: "/nagpal-group" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ];

    const isActive = (h: string) => h === "/" ? pathname === "/" : pathname === h;

    const openMega = useCallback(() => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        setShowMegaMenu(true);
    }, []);

    const scheduleMegaClose = useCallback(() => {
        closeTimerRef.current = setTimeout(() => {
            setShowMegaMenu(false);
        }, 250);
    }, []);

    // Mega menu categories setup
    const megaMenuCategories = useMemo(() => [
        {
            name: "Signature Collections",
            items: collections.filter(c => c.category === "Signature Collections")
        },
        {
            name: "Performance Collections",
            items: collections.filter(c => c.category === "Performance Collections")
        },
        {
            name: "Minimal Collections",
            items: collections.filter(c => c.category === "Minimal Collections")
        },
        {
            name: "Women's Collections",
            items: collections.filter(c => c.category === "Women's Collections")
        },
        {
            name: "Couple Collections",
            items: collections.filter(c => c.category === "Couple Collections")
        }
    ], []);

    // Category details for Column 1 brand hover previews — using clean product shots
    const brandPreviews = useMemo(() => ({
        "mens-designer": {
            slug: "mens-designer",
            title: "D'Signer Men's",
            tagline: "Precision Meets Commanding Aesthetics",
            description: "Engineered with surgical-grade stainless steel and sapphire glass. Premium luxury timepieces crafted for the modern man.",
            heroImage: "/images/new-img/model-2/950/950/950GNFS.16G.png",
            ctaLabel: "Browse Men's D'Signer"
        },
        "womens-designer": {
            slug: "womens-designer",
            title: "D'Signer Women's",
            tagline: "Elegance Redefined",
            description: "Sophisticated styling, delicate dial details, and radiant finishing designed to make a graceful statement.",
            heroImage: "/images/new-img/model-2/901/901/901GM_Green.png",
            ctaLabel: "Browse Women's D'Signer"
        },
        "designer-couple": {
            slug: "duetto",
            title: "D'Signer Couple",
            tagline: "Perfect Harmony of Shared Elegance",
            description: "Coordinating premium watches crafted in complementary pairs for his-and-hers styles.",
            heroImage: "/images/doublewatch-nobg.png",
            ctaLabel: "Explore Couple Series"
        },
        "mens-escort": {
            slug: "mens-escort",
            title: "Escort Men's",
            tagline: "Everyday Precision & Style",
            description: "Durability meets classic styling. Refined timepieces designed for the modern gentleman's daily journey.",
            heroImage: "/images/threeimg1-nobg.png",
            ctaLabel: "Browse Men's Escort"
        },
        "womens-escort": {
            slug: "womens-escort",
            title: "Escort Women's",
            tagline: "Subtle Daily Elegance",
            description: "Effortless, light, and versatile timepieces tailored to bring timeless styling to everyday attire.",
            heroImage: "/images/threeimg2-nobg.png",
            ctaLabel: "Browse Women's Escort"
        },
        "escort-everyday": {
            slug: "escort",
            title: "Escort Everyday",
            tagline: "Timeless Quality for Every Moment",
            description: "Affordable luxury watches built to accompany you through every day with confidence and durability.",
            heroImage: "/images/threeimg3-nobg.png",
            ctaLabel: "Explore Escort Series"
        }
    }), []);

    // Brand cards mapping configuration for Megamenu Column 1
    const brandCards = useMemo(() => [
        {
            id: "mens-designer",
            title: "D'Signer Men's",
            tagline: "Precision & commanding aesthetics",
            href: "/collections/mens-designer",
            previewKey: "mens-designer"
        },
        {
            id: "womens-designer",
            title: "D'Signer Women's",
            tagline: "Graceful elegance & luxury details",
            href: "/collections/womens-designer",
            previewKey: "womens-designer"
        },
        {
            id: "designer-couple",
            title: "D'Signer Couple",
            tagline: "Harmonious matching watch pairs",
            href: "/collections/duetto",
            previewKey: "designer-couple"
        },
        {
            id: "mens-escort",
            title: "Escort Men's",
            tagline: "Everyday precision & durable style",
            href: "/collections/mens-escort",
            previewKey: "mens-escort"
        },
        {
            id: "womens-escort",
            title: "Escort Women's",
            tagline: "Subtle daily grace & clean profiles",
            href: "/collections/womens-escort",
            previewKey: "womens-escort"
        },
        {
            id: "escort-everyday",
            title: "Escort Everyday",
            tagline: "Timeless quality for every hour",
            href: "/collections/escort",
            previewKey: "escort-everyday"
        }
    ], []);

    const curatedCols = useMemo(() => {
        const order = ["grandeur", "eternal", "hallmark", "serene", "glimmer"];
        return order.map(slug => collections.find(c => c.slug === slug)).filter(Boolean) as Collection[];
    }, []);

    // Dynamic styling
    const transparent = isHeroPage && !scrolled && !showMegaMenu;
    const headerBg = showMegaMenu ? "rgba(250,248,244,0.98)" : (transparent ? "transparent" : "rgba(250,248,244,0.95)");
    const blur = showMegaMenu ? "blur(40px) saturate(180%)" : scrolled ? "blur(30px) saturate(180%)" : "none";
    const txtCol = transparent ? "#FFF" : "#001F14";
    const actCol = transparent ? "#FFF" : "#003926";

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 w-full z-[100]"
                style={{
                    backgroundColor: headerBg,
                    backdropFilter: blur, WebkitBackdropFilter: blur,
                    borderBottom: scrolled || showMegaMenu ? "1px solid rgba(0,57,38,0.06)" : "1px solid transparent",
                    boxShadow: scrolled || showMegaMenu ? "0 8px 32px rgba(0,31,20,0.04)" : "none",
                    transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
                }}
            >
                <div className="max-w-[1800px] mx-auto px-8 xl:px-16 flex items-center justify-between h-[72px] md:h-[80px] xl:h-[88px] relative">
                    {/* Logo */}
                    <Link href="/" className="relative h-[32px] w-[160px] md:h-[40px] md:w-[200px] xl:h-[48px] xl:w-[240px] hover:opacity-60 transition-opacity duration-500 z-50">
                        <Image
                            src={pathname.includes("/collections/escort") ? "/images/escort_b.png" : "/images/designer world logo_B.png"}
                            alt="Designer World" fill className="object-contain"
                            style={{ filter: transparent ? "brightness(0) invert(1)" : "none", transition: "filter 0.6s ease" }}
                            priority
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden xl:flex items-center gap-10 h-full">
                        {navLinks.map(item => {
                            const act = isActive(item.href) || (item.isMega && showMegaMenu);
                            return (
                                <div key={item.label} className="relative h-full flex items-center group/nav"
                                    onMouseEnter={item.isMega ? openMega : undefined}
                                    onMouseLeave={item.isMega ? scheduleMegaClose : undefined}>
                                    <Link href={item.href}
                                        onClick={item.isMega ? (e) => { e.preventDefault(); setShowMegaMenu(!showMegaMenu); } : undefined}
                                        className="text-[11.5px] font-body tracking-[0.2em] uppercase transition-colors duration-500 py-6 font-semibold flex items-center gap-1.5 hover:text-[#B8935A]"
                                        style={{ color: act ? "#B8935A" : txtCol }}>
                                        {item.label}
                                        {item.isMega && (
                                            <ChevronDown size={9} className={`transition-transform duration-400 text-[#B8935A] ${showMegaMenu ? "rotate-180" : ""}`} />
                                        )}
                                    </Link>
                                    
                                    {/* Hover sweep underline */}
                                    <div className="absolute bottom-[20px] left-0 w-full h-[2px] bg-gradient-to-r from-[#003926] to-[#B8935A] scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-500 origin-left" />

                                    {/* Active state line */}
                                    {act && (
                                        <motion.div 
                                            layoutId="nav-active-line" 
                                            className="absolute bottom-[20px] left-0 w-full h-[2px] bg-[#B8935A]" 
                                            transition={{ type: "spring", stiffness: 180, damping: 25 }} 
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Right Icons */}
                    <div className="flex items-center gap-6 z-50">
                        <button onClick={() => setSearchOpen(true)} className="hover:opacity-50 transition-opacity" style={{ color: txtCol }} aria-label="Search">
                            <Search size={19} strokeWidth={1.5} />
                        </button>
                        <button onClick={() => setIsOpen(true)} className="relative hover:opacity-50 transition-opacity" style={{ color: txtCol }}>
                            <ShoppingBag size={20} strokeWidth={1.5} />
                            {mounted && cartCount > 0 && (
                                <span className="absolute -top-1 -right-2 w-[16px] h-[16px] bg-[#003926] rounded-full text-[8px] flex items-center justify-center text-white font-bold shadow-md">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button className="xl:hidden hover:opacity-50 transition-opacity"
                            style={{ color: mobileOpen ? "#001F14" : txtCol }}
                            onClick={() => setMobileOpen(!mobileOpen)}>
                            {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* ═══ MEGA MENU — LUXURY WATCH EXPLORER (25/50/25) ═══ */}
            <AnimatePresence>
                {showMegaMenu && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: -10 }}
                        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                        className="fixed left-1/2 -translate-x-1/2 z-[99] w-[95vw] max-w-[1240px]"
                        style={{ top: 92 }}
                        onMouseEnter={openMega}
                        onMouseLeave={scheduleMegaClose}
                    >
                        <div
                            className="rounded-[28px] bg-[#003926] p-[3px] shadow-[0_8px_16px_rgba(0,57,38,0.08),_0_16px_32px_rgba(0,57,38,0.12),_0_32px_64px_rgba(0,57,38,0.08)] overflow-hidden"
                        >
                            <div
                                className="rounded-[25px] bg-gradient-to-b from-[rgba(255,248,244,0.95)] to-[rgba(250,246,240,0.98)] border border-[rgba(184,147,90,0.3)] p-[50px_60px] h-auto backdrop-blur-[8px] saturate-[1.1] xl:min-w-[1200px]"
                            >
                                <motion.div 
                                    variants={dropdownContainerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-[50px] items-start"
                                >
                                    {/* ── LEFT COLUMN: Brand Index (THE HOUSES) ── */}
                                    <motion.div 
                                        variants={dropdownItemVariants}
                                        className="col-span-1 md:col-span-1 xl:col-span-3 flex flex-col items-start"
                                    >
                                        <p className="font-dm text-[11px] uppercase tracking-[3px] text-[#B8935A] font-bold mb-[28px] opacity-90 pl-1">
                                            THE HOUSES
                                        </p>
                                        
                                        <div className="flex flex-col gap-0 w-full">
                                            {/* D'SIGNER */}
                                            <div className="w-full">
                                                <span className="font-cormorant text-[24px] text-[#111110] font-normal tracking-[1px] leading-[1.1] block mb-[16px] mt-0 pl-1">D&apos;SIGNER</span>
                                                <div className="flex flex-col gap-0">
                                                    {[
                                                        { id: "mens-prestige", title: "Men's Prestige", href: "/collections/mens-designer", key: "mens-designer" },
                                                        { id: "womens-grace", title: "Women's Grace", href: "/collections/womens-designer", key: "womens-designer" },
                                                        { id: "duetto-couple", title: "Duetto Couple", href: "/collections/duetto", key: "designer-couple" }
                                                    ].map((item) => {
                                                        const act = pathname === item.href;
                                                        return (
                                                            <Link
                                                                key={item.id}
                                                                href={item.href}
                                                                onMouseEnter={() => {
                                                                    const p = brandPreviews[item.key as keyof typeof brandPreviews];
                                                                    if (p) setActivePreview(p);
                                                                }}
                                                                onClick={() => setShowMegaMenu(false)}
                                                                className={`font-dm text-[14px] text-[#555555] hover:text-[#003926] hover:pl-[8px] hover:font-medium hover:[text-shadow:0_0_8px_rgba(0,57,38,0.1)] py-[10px] block cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative pl-1 w-full text-left ${act ? "border-b-2 border-b-[#B8935A]" : ""}`}
                                                            >
                                                                {item.title}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* ESCORT */}
                                            <div className="w-full">
                                                <span className="font-cormorant text-[24px] text-[#111110] font-normal tracking-[1px] leading-[1.1] block mb-[16px] mt-[28px] pl-1">ESCORT</span>
                                                <div className="flex flex-col gap-0">
                                                    {[
                                                        { id: "mens-classic", title: "Men's Classic", href: "/collections/mens-escort", key: "mens-escort" },
                                                        { id: "womens-classic", title: "Women's Classic", href: "/collections/womens-escort", key: "womens-escort" },
                                                        { id: "everyday-series", title: "Everyday Series", href: "/collections/escort", key: "escort-everyday" }
                                                    ].map((item) => {
                                                        const act = pathname === item.href;
                                                        return (
                                                            <Link
                                                                key={item.id}
                                                                href={item.href}
                                                                onMouseEnter={() => {
                                                                    const p = brandPreviews[item.key as keyof typeof brandPreviews];
                                                                    if (p) setActivePreview(p);
                                                                }}
                                                                onClick={() => setShowMegaMenu(false)}
                                                                className={`font-dm text-[14px] text-[#555555] hover:text-[#003926] hover:pl-[8px] hover:font-medium hover:[text-shadow:0_0_8px_rgba(0,57,38,0.1)] py-[10px] block cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative pl-1 w-full text-left ${act ? "border-b-2 border-b-[#B8935A]" : ""}`}
                                                            >
                                                                {item.title}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* ── CENTER COLUMN: Collection Explorer ── */}
                                    <motion.div 
                                        variants={dropdownItemVariants}
                                        className="col-span-1 md:col-span-1 xl:col-span-6 flex flex-col items-start"
                                    >
                                        <p className="font-dm text-[11px] uppercase tracking-[3px] text-[#B8935A] font-bold mb-[24px] opacity-90 pl-1">
                                            COLLECTION EXPLORER
                                        </p>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                                            {[
                                                { title: "Grandeur", desc: "Commanding luxury presence", href: "/collections/grandeur", img: "/images/new-img/model-2/950/950/950GNFS.16G.png", slug: "grandeur" },
                                                { title: "Eternal", desc: "Timeless heritage & styling", href: "/collections/eternal", img: "/images/new-img/model-2/901/901/901GM_Green.png", slug: "eternal" },
                                                { title: "Hallmark", desc: "Master horology legacy", href: "/collections/hallmark", img: "/images/doublewatch-nobg.png", slug: "hallmark" },
                                                { title: "Serene", desc: "Delicate and modern profiles", href: "/collections/serene", img: "/images/threeimg2-nobg.png", slug: "serene" },
                                                { title: "Glimmer", desc: "Radiant dial craftsmanship", href: "/collections/glimmer", img: "/images/threeimg3-nobg.png", slug: "glimmer" },
                                                { title: "Pinnacle", desc: "Flagship luxury design", href: "/collections/pinnacle", img: "/images/threeimg1-nobg.png", slug: "pinnacle" }
                                            ].map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    onClick={() => setShowMegaMenu(false)}
                                                    onMouseEnter={() => setActivePreview({
                                                        slug: item.slug,
                                                        title: item.title + " Collection",
                                                        tagline: item.desc,
                                                        description: item.slug === "grandeur" ? "Splendor and elevated presence engineered for commanding leadership and refined style." :
                                                                     item.slug === "eternal" ? "Coordinating classic elements crafted to withstand generations of shifting trends." :
                                                                     item.slug === "hallmark" ? "Celebrating over 75 years of master horology and classic craftsmanship in modern profiles." :
                                                                     item.slug === "serene" ? "Graceful and sleek profiles engineered with delicate modern dial refinements." :
                                                                     item.slug === "glimmer" ? "Radiant gemstone aesthetics, precise movements, and masterfully polished indices." :
                                                                     item.slug === "pinnacle" ? "The apex of D'SIGNER craftsmanship, featuring premium materials and meticulous finishing." :
                                                                     "Coordinating pairs crafted in complementary styles for commanding statements.",
                                                        heroImage: item.img,
                                                        ctaLabel: "Explore Collection"
                                                    })}
                                                    className="group flex flex-col items-start rounded-[16px] border-2 border-transparent p-[20px_18px] backdrop-blur-[4px] cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.08] hover:-translate-y-2 hover:rotate-[0.5deg] hover:border-[#B8935A] hover:shadow-[0_12px_32px_rgba(0,57,38,0.15),_0_0_32px_rgba(184,147,90,0.2)] text-left relative overflow-hidden"
                                                    style={{ background: "linear-gradient(135deg, rgba(255, 248, 244, 0.6) 0%, rgba(0, 57, 38, 0.03) 100%), #FFFFFF" }}
                                                >
                                                    {/* Custom Radial Glow on hover */}
                                                    <div 
                                                        className="absolute -top-6 -right-6 w-[100px] h-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-[20px] z-[1]"
                                                        style={{ background: "radial-gradient(circle, rgba(184, 147, 90, 0.08) 0%, transparent 70%)" }}
                                                    />

                                                    {/* Card Content (z-index 2) */}
                                                    <div className="relative z-10 w-full flex flex-col items-start">
                                                        <div className="w-[48px] h-[48px] border-2 border-[#B8935A] rounded-[12px] bg-gradient-to-br from-[rgba(184,147,90,0.12)] to-[rgba(184,147,90,0.02)] flex items-center justify-center text-[#B8935A] mb-[14px] transition-transform duration-500 group-hover:scale-110 shrink-0">
                                                            <div className="text-[#B8935A] transition-transform duration-500 cubic-bezier(0.34,1.56,0.64,1) group-hover:rotate-[15deg] group-hover:scale-[1.15] group-hover:brightness-[1.3] group-hover:hue-rotate-[5deg]">
                                                                {React.cloneElement(getCollectionIcon(item.slug) as React.ReactElement, { size: 28, strokeWidth: 2, className: "text-[#B8935A]" })}
                                                            </div>
                                                        </div>
                                                        <span className="font-cormorant text-[17px] font-medium text-[#111110] mb-[6px] leading-[1.2] transition-colors duration-400 group-hover:text-[#003926]">
                                                            {item.title}
                                                        </span>
                                                        <p className="font-dm text-[12px] text-[#888888] leading-[1.5] opacity-85 group-hover:opacity-100 group-hover:text-[#666666] transition-colors duration-400 m-0">
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* ── RIGHT COLUMN: Featured Spotlight ── */}
                                    <motion.div 
                                        variants={dropdownItemVariants}
                                        className="col-span-1 md:col-span-2 xl:col-span-3 flex flex-col items-start w-full"
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <p className="font-dm text-[11px] uppercase tracking-[3px] text-[#B8935A] font-bold mb-[24px] opacity-90 pl-1">
                                            FEATURED HIGHLIGHT
                                        </p>
                                        
                                        <div className="w-full flex flex-col justify-between h-full bg-[#003926]/[0.01] border border-[#003926]/5 rounded-xl p-[20px] relative overflow-hidden group">
                                            <div className="w-full">
                                                {/* Product Image Container */}
                                                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] xl:aspect-[4/3] rounded-[16px] overflow-hidden mb-[20px] bg-white/40 flex items-center justify-center">
                                                    
                                                    {/* Radial glow overlay on hover */}
                                                    <div 
                                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none z-[2]" 
                                                        style={{ background: "radial-gradient(circle, rgba(184, 147, 90, 0.15) 0%, transparent 70%)" }}
                                                    />

                                                    {/* Pedestal Shadow */}
                                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[70%] h-[8px] rounded-full" style={{
                                                        background: "radial-gradient(ellipse, rgba(0,57,38,0.1) 0%, transparent 70%)",
                                                        filter: "blur(2px)"
                                                    }} />
                                                    
                                                    <AnimatePresence mode="wait">
                                                        <motion.div
                                                            key={`featured-img-${activePreview.slug}`}
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.95 }}
                                                            transition={{ duration: 0.25 }}
                                                            className="relative flex items-center justify-center w-full h-full p-2 z-[3]"
                                                        >
                                                            {/* Parallax animated image wrapper */}
                                                            <motion.div
                                                                style={{ x: mousePos.x, y: mousePos.y }}
                                                                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                                                                className="relative flex items-center justify-center w-full h-full"
                                                            >
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                <img
                                                                    src={activePreview.heroImage || "/images/new-img/model-2/950/950/950GNFS.16G.png"}
                                                                    alt={activePreview.title}
                                                                    className="max-h-[100px] object-contain transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-108 group-hover:brightness-[1.1] group-hover:contrast-[1.1] group-hover:saturate-[1.15] group-hover:drop-shadow-[0_0_40px_rgba(184,147,90,0.25)]"
                                                                    onError={(e) => { (e.target as HTMLImageElement).src = "/images/new-img/model-2/950/950/950GNFS.16G.png"; }}
                                                                />
                                                            </motion.div>
                                                        </motion.div>
                                                    </AnimatePresence>
                                                </div>

                                                <h4 className="font-cormorant text-[18px] text-[#111110] font-medium mb-[10px] leading-[1.3] text-left transition-colors duration-400 group-hover:text-[#003926] w-full">
                                                    {activePreview.title}
                                                </h4>
                                                <p className="font-dm text-[13px] text-[#777777] leading-[1.6] mb-[20px] text-left w-full line-clamp-2 px-1 transition-colors duration-400">
                                                    {activePreview.description}
                                                </p>
                                            </div>

                                            <Link href={`/collections/${activePreview.slug}`}
                                                onClick={() => setShowMegaMenu(false)}
                                                className="group/btn w-full inline-flex items-center justify-center gap-1.5 py-[14px] px-[28px] rounded-[24px] bg-[#003926] hover:bg-gradient-to-br hover:from-[#003926] hover:to-[#1a4d3d] transition-all duration-500 text-white font-dm text-[13px] font-bold shadow-[0_8px_24px_rgba(0,57,38,0.2)] hover:shadow-[0_12px_32px_rgba(0,57,38,0.3),_0_0_24px_rgba(184,147,90,0.15)] hover:-translate-y-[2px] cursor-pointer"
                                            >
                                                <span>DISCOVER SERIES</span>
                                                <span className="transition-transform duration-300 group-hover/btn:translate-x-[4px]">→</span>
                                            </Link>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* ── FOOTER ── */}
                            <div className="border-t border-[rgba(184,147,90,0.15)] pt-[18px] mt-[28px] w-full flex items-center justify-between font-dm text-[12px] text-[#AAAAAA] tracking-[0.5px]">
                                <span>DESIGNER WORLD • SINCE 1948</span>
                                <span>{collections.length.toString()} CURATED SERIES AVAILABLE</span>
                                <Link href="/collections/dsigner" onClick={() => setShowMegaMenu(false)}
                                    className="text-[#B8935A] hover:text-[#003926] hover:[text-shadow:0_0_12px_rgba(184,147,90,0.2)] font-semibold transition-all duration-300 flex items-center gap-1">
                                    <span>FULL INDEX</span>
                                    <span>→</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══ MOBILE NAV — REBUILT ACCORDION STYLE ═══ */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[90] bg-[#FAF8F4] overflow-y-auto pt-24 px-6 pb-20">

                        {/* Quick links */}
                        <div className="flex flex-col gap-2 mb-6">
                            {navLinks.filter(n => !n.isMega).map((item, i) => (
                                <motion.div key={item.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.04 }}>
                                    <Link href={item.href} onClick={() => setMobileOpen(false)}
                                        className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#003926]/5 shadow-[0_2px_8px_rgba(0,31,20,0.02)]">
                                        <span className="text-[13px] font-body font-semibold text-[#001F14] uppercase tracking-wide">{item.label}</span>
                                        <ChevronRight size={14} className="text-[#003926]/20" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full mb-6" style={{ background: "linear-gradient(90deg, transparent, rgba(0,57,38,0.1), transparent)" }} />

                        <p className="text-[9px] uppercase tracking-[0.4em] text-[#003926]/30 font-bold font-body mb-4 text-center">Shop Collections & Brands</p>

                        {/* Accordion Groups */}
                        <div className="flex flex-col gap-3">
                            
                            {/* Shop By Brand */}
                            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
                                <MobileAccordionGroup title="Shop By Brand" icon={<Compass size={16} />} defaultOpen>
                                    <div className="space-y-4 mt-2">
                                        <div>
                                            <h5 className="text-[10px] font-body font-bold text-[#B8935A] uppercase tracking-[0.1em] mb-1">D'Signer</h5>
                                            <div className="grid grid-cols-3 gap-2 pl-2">
                                                <Link href="/collections/mens-designer" onClick={() => setMobileOpen(false)} className="text-[11px] font-body text-[#003926]/75 uppercase py-1">Men's</Link>
                                                <Link href="/collections/womens-designer" onClick={() => setMobileOpen(false)} className="text-[11px] font-body text-[#003926]/75 uppercase py-1">Women's</Link>
                                                <Link href="/collections/duetto" onClick={() => setMobileOpen(false)} className="text-[11px] font-body text-[#003926]/75 uppercase py-1">Couple</Link>
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="text-[10px] font-body font-bold text-[#B8935A] uppercase tracking-[0.1em] mb-1">Escort</h5>
                                            <div className="grid grid-cols-3 gap-2 pl-2">
                                                <Link href="/collections/mens-escort" onClick={() => setMobileOpen(false)} className="text-[11px] font-body text-[#003926]/75 uppercase py-1">Men's</Link>
                                                <Link href="/collections/womens-escort" onClick={() => setMobileOpen(false)} className="text-[11px] font-body text-[#003926]/75 uppercase py-1">Women's</Link>
                                                <Link href="/collections/escort" onClick={() => setMobileOpen(false)} className="text-[11px] font-body text-[#003926]/75 uppercase py-1">Everyday</Link>
                                            </div>
                                        </div>
                                    </div>
                                </MobileAccordionGroup>
                            </motion.div>

                            {/* Collections by Category */}
                            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                                <MobileAccordionGroup title="Collections By Category" icon={<Diamond size={16} />}>
                                    <div className="space-y-4 mt-2">
                                        {megaMenuCategories.map(cat => (
                                            <div key={cat.name}>
                                                <h5 className="text-[10px] font-body font-bold text-[#B8935A] uppercase tracking-[0.1em] mb-1">{cat.name}</h5>
                                                <div className="grid grid-cols-2 gap-1.5 pl-2">
                                                    {cat.items.map(col => (
                                                        <Link key={col.slug} href={`/collections/${col.slug}`} onClick={() => setMobileOpen(false)}
                                                            className="flex items-center gap-1.5 py-1 text-[11px] font-body text-[#003926]/60 uppercase tracking-wide truncate">
                                                            <Diamond size={6} className="text-[#003926]/20 shrink-0" />
                                                            {col.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </MobileAccordionGroup>
                            </motion.div>

                            {/* Browse All CTA */}
                            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
                                className="mt-4 text-center">
                                <Link href="/collections/dsigner" onClick={() => setMobileOpen(false)}
                                    className="luxury-cta-primary w-full justify-center">
                                    Browse All Collections
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            {mounted && (
                <SearchOverlay
                    isOpen={searchOpen}
                    onClose={() => setSearchOpen(false)}
                    products={searchProducts}
                    collections={searchCollections}
                />
            )}
        </>
    );
}
