"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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

export default function HeaderClient({ hasAnnouncement = false, megaMenuPayload }: HeaderClientProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();
    const { items, setIsOpen } = useCartStore();
    const [mounted, setMounted] = useState(false);
    
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
                <div className="max-w-[1800px] mx-auto px-8 xl:px-16 flex items-center justify-between h-[80px] relative">
                    {/* Logo */}
                    <Link href="/" className="relative h-[36px] w-[180px] hover:opacity-60 transition-opacity duration-500 z-50">
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
                        initial={{ opacity: 0, y: -8, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.99 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed left-1/2 -translate-x-1/2 z-[99] w-[95vw] max-w-[1240px]"
                        style={{ top: 92 }}
                        onMouseEnter={openMega}
                        onMouseLeave={scheduleMegaClose}
                    >
                        <div
                            className="rounded-[20px] overflow-hidden bg-[#FEFCF9] border border-[#003926]/8 shadow-[0_32px_64px_-16px_rgba(0,31,20,0.12)] p-8 h-[480px]"
                        >
                            <div className="grid grid-cols-12 gap-0 h-full">
                                {/* ── LEFT COLUMN: Brand Index (25%, col-span-3) ── */}
                                <div className="col-span-3 border-r border-[#003926]/6 pr-6 flex flex-col justify-between h-full">
                                    <div>
                                        <p className="text-[9.5px] uppercase tracking-[0.25em] text-[#B8935A] font-body font-bold mb-5 pl-1">
                                            The Houses
                                        </p>
                                        
                                        <div className="flex flex-col gap-6">
                                            {/* D'SIGNER */}
                                            <div>
                                                <span className="text-[11.5px] font-heading font-semibold uppercase tracking-[0.1em] text-[#003926] block mb-2 pl-1">D&apos;Signer</span>
                                                <div className="flex flex-col gap-1.5">
                                                    {[
                                                        { id: "mens-prestige", title: "Men's Prestige", href: "/collections/mens-designer", key: "mens-designer" },
                                                        { id: "womens-grace", title: "Women's Grace", href: "/collections/womens-designer", key: "womens-designer" },
                                                        { id: "duetto-couple", title: "Duetto Couple", href: "/collections/duetto", key: "designer-couple" }
                                                    ].map((item) => {
                                                        const isHovered = activePreview.slug === item.key || (item.key === "designer-couple" && activePreview.slug === "duetto");
                                                        return (
                                                            <Link
                                                                key={item.id}
                                                                href={item.href}
                                                                onMouseEnter={() => {
                                                                    const p = brandPreviews[item.key as keyof typeof brandPreviews];
                                                                    if (p) setActivePreview(p);
                                                                }}
                                                                onClick={() => setShowMegaMenu(false)}
                                                                className="group flex items-center gap-2 py-1 px-1.5 -mx-1.5 rounded-md transition-all duration-300 hover:bg-[#B8935A]/[0.05]"
                                                            >
                                                                <span className="w-[1.5px] h-3 bg-[#B8935A] opacity-0 group-hover:opacity-100 transition-opacity rounded-full shrink-0" />
                                                                <span className="text-[11.5px] font-body text-[#003926]/75 group-hover:text-[#B8935A] group-hover:translate-x-0.5 transition-all">
                                                                    {item.title}
                                                                </span>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* ESCORT */}
                                            <div>
                                                <span className="text-[11.5px] font-heading font-semibold uppercase tracking-[0.1em] text-[#003926] block mb-2 pl-1">Escort</span>
                                                <div className="flex flex-col gap-1.5">
                                                    {[
                                                        { id: "mens-classic", title: "Men's Classic", href: "/collections/mens-escort", key: "mens-escort" },
                                                        { id: "womens-classic", title: "Women's Classic", href: "/collections/womens-escort", key: "womens-escort" },
                                                        { id: "everyday-series", title: "Everyday Series", href: "/collections/escort", key: "escort-everyday" }
                                                    ].map((item) => {
                                                        const isHovered = activePreview.slug === item.key || (item.key === "escort-everyday" && activePreview.slug === "escort");
                                                        return (
                                                            <Link
                                                                key={item.id}
                                                                href={item.href}
                                                                onMouseEnter={() => {
                                                                    const p = brandPreviews[item.key as keyof typeof brandPreviews];
                                                                    if (p) setActivePreview(p);
                                                                }}
                                                                onClick={() => setShowMegaMenu(false)}
                                                                className="group flex items-center gap-2 py-1 px-1.5 -mx-1.5 rounded-md transition-all duration-300 hover:bg-[#B8935A]/[0.05]"
                                                            >
                                                                <span className="w-[1.5px] h-3 bg-[#B8935A] opacity-0 group-hover:opacity-100 transition-opacity rounded-full shrink-0" />
                                                                <span className="text-[11.5px] font-body text-[#003926]/75 group-hover:text-[#B8935A] group-hover:translate-x-0.5 transition-all">
                                                                    {item.title}
                                                                </span>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Symmetrical footer signature */}
                                    <div className="border-t border-[#003926]/5 pt-4 pl-1">
                                        <span className="text-[8px] uppercase tracking-[0.2em] text-[#003926]/30 font-body font-semibold">Designer World • Since 1948</span>
                                    </div>
                                </div>

                                {/* ── CENTER COLUMN: Collection Explorer (50%, col-span-6) ── */}
                                <div className="col-span-6 border-r border-[#003926]/6 px-6 flex flex-col justify-between h-full">
                                    <div>
                                        <p className="text-[9.5px] uppercase tracking-[0.25em] text-[#B8935A] font-body font-bold mb-5 pl-1">
                                            Collection Explorer
                                        </p>
                                        
                                        <div className="grid grid-cols-2 gap-x-6 gap-y-3.5">
                                            {[
                                                { title: "Grandeur Collection", desc: "Commanding luxury presence", href: "/collections/grandeur", img: "/images/new-img/model-2/950/950/950GNFS.16G.png", slug: "grandeur" },
                                                { title: "Eternal Collection", desc: "Timeless heritage & styling", href: "/collections/eternal", img: "/images/new-img/model-2/901/901/901GM_Green.png", slug: "eternal" },
                                                { title: "Hallmark Collection", desc: "Master horology legacy", href: "/collections/hallmark", img: "/images/doublewatch-nobg.png", slug: "hallmark" },
                                                { title: "Serene Collection", desc: "Delicate and modern profiles", href: "/collections/serene", img: "/images/threeimg2-nobg.png", slug: "serene" },
                                                { title: "Glimmer Collection", desc: "Radiant dial craftsmanship", href: "/collections/glimmer", img: "/images/threeimg3-nobg.png", slug: "glimmer" },
                                                { title: "Pinnacle Collection", desc: "Flagship luxury design", href: "/collections/pinnacle", img: "/images/threeimg1-nobg.png", slug: "pinnacle" }
                                            ].map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    onClick={() => setShowMegaMenu(false)}
                                                    onMouseEnter={() => setActivePreview({
                                                        slug: item.slug,
                                                        title: item.title,
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
                                                    className="group flex items-center gap-3.5 p-2 rounded-xl transition-all duration-300 hover:bg-[#B8935A]/[0.05]"
                                                >
                                                    <div className="w-11 h-11 rounded-lg bg-[#003926]/[0.02] border border-[#003926]/[0.03] flex items-center justify-center overflow-hidden shrink-0 transition-all duration-300 group-hover:bg-[#B8935A]/10 group-hover:border-transparent">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={item.img}
                                                            alt={item.title}
                                                            className="w-8 h-8 object-contain transition-transform duration-500 group-hover:scale-110"
                                                            onError={(e) => { (e.target as HTMLImageElement).src = "/images/new-img/model-2/950/950/950GNFS.16G.png"; }}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-[12.5px] font-heading font-medium text-[#003926] tracking-[0.01em] transition-colors duration-300 group-hover:text-[#B8935A]">
                                                            {item.title}
                                                        </span>
                                                        <span className="text-[9.5px] text-[#003926]/40 font-body tracking-[0.01em] truncate mt-0.5 group-hover:text-[#003926]/55 transition-colors">
                                                            {item.desc}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Middle footer signature */}
                                    <div className="border-t border-[#003926]/5 pt-4 pl-1 flex items-center justify-between">
                                        <span className="text-[8px] uppercase tracking-[0.2em] text-[#003926]/30 font-body font-semibold">{collections.length} Curated Series Available</span>
                                        <Link href="/collections/dsigner" onClick={() => setShowMegaMenu(false)} 
                                            className="group text-[8px] tracking-[0.2em] uppercase text-[#B8935A] hover:text-[#003926] font-body font-bold transition-all duration-300 flex items-center gap-1">
                                            <span>Full Index</span>
                                            <ArrowUpRight size={8} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={3} />
                                        </Link>
                                    </div>
                                </div>

                                {/* ── RIGHT COLUMN: Featured Spotlight (25%, col-span-3) ── */}
                                <div className="col-span-3 pl-6 flex flex-col justify-between h-full">
                                    <div className="flex flex-col justify-between h-full bg-[#003926]/[0.01] border border-[#003926]/5 rounded-xl p-4.5">
                                        <div>
                                            <p className="text-[8px] uppercase tracking-[0.25em] text-[#B8935A] font-body font-bold mb-3 flex items-center gap-1.5 pl-0.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#B8935A] animate-pulse" />
                                                <span>Featured Highlight</span>
                                            </p>
                                            
                                            {/* Watch Image — restrained footprint */}
                                            <div className="relative h-[125px] flex items-center justify-center mb-3">
                                                {/* Pedestal Shadow */}
                                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[60%] h-[8px] rounded-full" style={{
                                                    background: "radial-gradient(ellipse, rgba(0,57,38,0.08) 0%, transparent 70%)",
                                                    filter: "blur(2px)"
                                                }} />
                                                
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={`featured-img-${activePreview.slug}`}
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        transition={{ duration: 0.25 }}
                                                        className="relative flex items-center justify-center w-full h-full"
                                                    >
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={activePreview.heroImage || "/images/new-img/model-2/950/950/950GNFS.16G.png"}
                                                            alt={activePreview.title}
                                                            className="max-h-[105px] object-contain"
                                                            style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.12))" }}
                                                            onError={(e) => { (e.target as HTMLImageElement).src = "/images/new-img/model-2/950/950/950GNFS.16G.png"; }}
                                                        />
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>

                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={`featured-text-${activePreview.slug}`}
                                                    initial={{ opacity: 0, y: 4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -4 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="text-center flex flex-col gap-1.5"
                                                >
                                                    <h4 className="text-[13px] font-heading font-medium text-[#003926] uppercase tracking-[0.02em]">
                                                        {activePreview.title}
                                                    </h4>
                                                    <p className="text-[9.5px] text-[#003926]/45 leading-normal font-body line-clamp-2 px-1">
                                                        {activePreview.description}
                                                    </p>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>

                                        {/* Restrained elegant CTA Pill */}
                                        <Link href={`/collections/${activePreview.slug}`}
                                            onClick={() => setShowMegaMenu(false)}
                                            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-full border border-[#003926]/20 bg-[#003926] hover:bg-[#B8935A] transition-all duration-300 text-white shadow-sm mt-3"
                                        >
                                            <span className="text-[8.5px] uppercase tracking-[0.2em] font-body font-bold">Discover Series</span>
                                            <ArrowUpRight size={10} className="text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
                                        </Link>
                                    </div>
                                </div>
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
