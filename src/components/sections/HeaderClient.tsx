"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, ArrowUpRight, Compass, Feather, Zap, Diamond, ChevronRight, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/store/cart";
import dynamic from "next/dynamic";

const SearchOverlay = dynamic(() => import("@/components/ui/SearchOverlay"), { ssr: false });
import { STATIC_PAGES } from "@/lib/searchIndex";
import { collections } from "@/data/collections";
import { allModelFamilies } from "@/data/productData";

export type CollectionPayload = {
    id: string; name: string; slug: string; tagline: string | null;
    philosophy: string | null; gender: string | null; heroImage: string | null;
    lifestyleImage: string | null;
    featuredProduct: { id: string; name: string; slug: string; price: number; image: string | null; } | null;
    productCount: number; collectionType: "CORE" | "SIGNATURE";
};

export type MegaMenuPayload = {
    coreCollections: CollectionPayload[];
    signatureCollections: CollectionPayload[];
};

interface HeaderClientProps {
    hasAnnouncement?: boolean;
    megaMenuPayload: MegaMenuPayload;
}

const iconMap: Record<string, React.ReactNode> = {
    mens: <Compass size={20} strokeWidth={1.5} />,
    womens: <Feather size={20} strokeWidth={1.5} />,
    escort: <Zap size={20} strokeWidth={1.5} />,
    default: <Diamond size={20} strokeWidth={1.5} />,
};
const getIcon = (slug: string) => {
    if (slug.includes("mens")) return iconMap.mens;
    if (slug.includes("womens")) return iconMap.womens;
    if (slug.includes("escort")) return iconMap.escort;
    return iconMap.default;
};

export default function HeaderClient({ hasAnnouncement = false, megaMenuPayload }: HeaderClientProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [activeColId, setActiveColId] = useState<string | null>(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();
    const { items, setIsOpen } = useCartStore();
    const [mounted, setMounted] = useState(false);
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
        name: c.name,
        slug: c.slug,
        description: c.meaning,
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

    // Consolidated hover handlers for the entire mega menu zone
    const openMega = useCallback(() => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        setShowMegaMenu(true);
        if (!activeColId && megaMenuPayload.coreCollections.length > 0)
            setActiveColId(megaMenuPayload.coreCollections[0].id);
    }, [activeColId, megaMenuPayload.coreCollections]);

    const scheduleMegaClose = useCallback(() => {
        closeTimerRef.current = setTimeout(() => {
            setShowMegaMenu(false);
        }, 250);
    }, []);

    const activeCol = megaMenuPayload.coreCollections.find(c => c.id === activeColId)
        || megaMenuPayload.signatureCollections.find(c => c.id === activeColId)
        || megaMenuPayload.coreCollections[0];

    const allCols = [...megaMenuPayload.coreCollections, ...megaMenuPayload.signatureCollections];

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
                                <div key={item.label} className="relative h-full flex items-center"
                                    onMouseEnter={item.isMega ? openMega : undefined}
                                    onMouseLeave={item.isMega ? scheduleMegaClose : undefined}>
                                    <Link href={item.href}
                                        onClick={item.isMega ? (e) => { e.preventDefault(); setShowMegaMenu(!showMegaMenu); } : undefined}
                                        className="text-[11px] font-body tracking-[0.18em] uppercase transition-colors duration-500 py-6 font-medium flex items-center gap-1.5"
                                        style={{ color: act ? actCol : txtCol }}>
                                        {item.label}
                                        {item.isMega && (
                                            <ChevronRight size={10} className={`transition-transform duration-300 ${showMegaMenu ? "rotate-90" : ""}`} />
                                        )}
                                    </Link>
                                    {act && !item.isMega && <motion.div layoutId="nav-dot" className="absolute bottom-[24px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: actCol }} transition={{ type: "spring", stiffness: 200, damping: 30 }} />}
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

            {/* ═══ MEGA MENU — COMPACT PREMIUM GLASS PANEL ═══ */}
            <AnimatePresence>
                {showMegaMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed left-1/2 -translate-x-1/2 z-[99] w-[92vw] max-w-[1320px]"
                        style={{ top: 88 }}
                        onMouseEnter={openMega}
                        onMouseLeave={scheduleMegaClose}
                    >
                        <div
                            className="rounded-[1.5rem] overflow-hidden flex"
                            style={{
                                background: "rgba(250,248,244,0.97)",
                                backdropFilter: "blur(60px) saturate(200%)",
                                boxShadow: "0 30px 60px rgba(0,31,20,0.10), 0 0 0 1px rgba(0,57,38,0.06), inset 0 1px 0 rgba(255,255,255,0.5), 0 0 80px rgba(0,57,38,0.03)",
                            }}
                        >
                            {/* LEFT: Core Cards (30%) */}
                            <div className="w-[30%] p-8 bg-white/50 border-r border-[#003926]/5">
                                <p className="text-[9px] uppercase tracking-[0.3em] text-[#003926]/35 font-bold font-body mb-6 flex items-center gap-3">
                                    <span className="w-5 h-px bg-[#003926]/15" />Core Horology
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {megaMenuPayload.coreCollections.map((col, i) => {
                                        const isAct = activeColId === col.id;
                                        return (
                                            <motion.div key={col.id}
                                                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.35, delay: i * 0.04 }}
                                            >
                                                <Link
                                                    href={`/collections/${col.slug}`}
                                                    onClick={() => setShowMegaMenu(false)}
                                                    onMouseEnter={() => setActiveColId(col.id)}
                                                    className={`block text-left p-4 rounded-xl flex flex-col gap-3 group transition-all duration-300 ${isAct
                                                        ? "bg-[#FAF8F4] shadow-[0_6px_20px_rgba(0,57,38,0.08),_inset_0_0_0_1px_rgba(0,57,38,0.1)] scale-[1.02] -translate-y-0.5"
                                                        : "bg-transparent hover:bg-[#FAF8F4]/60 border border-transparent hover:border-[#003926]/5"}`}
                                                >
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isAct
                                                        ? "bg-gradient-to-br from-[#003926] to-[#00664A] text-white shadow-[0_4px_12px_rgba(0,57,38,0.2)]"
                                                        : "bg-[#FAF8F4] text-[#003926]/35 group-hover:text-[#003926]/60 group-hover:shadow-[0_2px_8px_rgba(0,57,38,0.04)]"}`}>
                                                        {getIcon(col.slug)}
                                                    </div>
                                                    <div>
                                                        <h4 className={`text-[12px] font-body font-semibold tracking-wide uppercase mb-0.5 transition-colors ${isAct ? "text-[#001F14]" : "text-[#003926]/45 group-hover:text-[#001F14]"}`}>
                                                            {col.name}
                                                        </h4>
                                                        <p className={`text-[10px] font-body line-clamp-1 transition-colors ${isAct ? "text-[#003926]/45" : "text-[#003926]/20"}`}>
                                                            {col.philosophy || "Discover"}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* CENTER: Signature Grid (40%) */}
                            <div className="w-[40%] p-8 border-r border-[#003926]/5 flex flex-col">
                                <p className="text-[9px] uppercase tracking-[0.3em] text-[#003926]/35 font-bold font-body mb-5 flex items-center gap-3">
                                    <span className="w-5 h-px bg-[#003926]/15" />Named Collections
                                </p>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 overflow-y-auto max-h-[380px] hide-scrollbar pr-1">
                                    {megaMenuPayload.signatureCollections.map((col, i) => {
                                        const isAct = activeColId === col.id;
                                        return (
                                            <motion.div key={col.id}
                                                initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: 0.08 + i * 0.02 }}
                                            >
                                                <Link
                                                    href={`/collections/${col.slug}`}
                                                    onClick={() => setShowMegaMenu(false)}
                                                    onMouseEnter={() => setActiveColId(col.id)}
                                                    className={`block text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between group transition-all duration-250 ${isAct ? "bg-white shadow-[0_3px_10px_rgba(0,31,20,0.04)] border border-[#003926]/6" : "hover:bg-white/40 border border-transparent"}`}
                                                >
                                                    <div className="flex items-center gap-2.5 min-w-0">
                                                        <Diamond size={10} className={`shrink-0 transition-colors ${isAct ? "text-[#003926]" : "text-[#003926]/18 group-hover:text-[#003926]/35"}`} />
                                                        <span className={`text-[11px] font-body font-medium tracking-[0.03em] uppercase truncate transition-colors ${isAct ? "text-[#001F14]" : "text-[#003926]/55 group-hover:text-[#001F14]"}`}>
                                                            {col.name}
                                                        </span>
                                                    </div>
                                                    <ChevronRight size={12} className={`shrink-0 transition-all duration-250 ${isAct ? "text-[#003926] opacity-100" : "opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0"}`} />
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Champagne accent divider */}
                                <div className="mt-auto pt-5">
                                    <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(184,147,90,0.2), transparent)" }} />
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="font-dm text-[9px] tracking-[0.15em] uppercase text-[#9C9690]">24 Collections</span>
                                        <Link href="/collections/dsigner" onClick={() => setShowMegaMenu(false)} className="font-dm text-[9px] tracking-[0.15em] uppercase text-[#B8935A] hover:text-[#003926] transition-colors">
                                            View All →
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: Featured Banner (30%) */}
                            <div className="w-[30%] relative overflow-hidden min-h-[460px]">
                                <AnimatePresence mode="wait">
                                    {activeCol && (
                                        <motion.div key={`b-${activeCol.id}`}
                                            initial={{ opacity: 0, scale: 1.02 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute inset-0 flex flex-col justify-end p-8 group/ban"
                                        >
                                            <div className="absolute inset-0 rounded-r-[1.5rem] overflow-hidden">
                                                <Image
                                                    src={activeCol.heroImage || activeCol.featuredProduct?.image || "/images/new-img/model-2/950/950/950GNFS.16G.png"}
                                                    alt={activeCol.name} fill
                                                    className="object-cover group-hover/ban:scale-105 transition-transform duration-[2s]"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#001F14]/85 via-[#003926]/30 to-transparent" />
                                                {/* Glass reflection */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />
                                                {/* Emerald ambient glow */}
                                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] blur-[60px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,57,38,0.3), transparent)" }} />
                                            </div>
                                            <div className="relative z-10">
                                                <div className="w-8 h-[2px] bg-[#C4A470] mb-4 rounded-full" />
                                                <h2 className="text-2xl font-display text-white mb-1.5 tracking-wide uppercase leading-tight">
                                                    {activeCol.name}
                                                </h2>
                                                <p className="text-[11px] text-white/65 font-body leading-relaxed max-w-[260px] mb-5 line-clamp-2">
                                                    {activeCol.philosophy || "Experience the pinnacle of horological craftsmanship."}
                                                </p>
                                                <Link href={`/collections/${activeCol.slug}`}
                                                    onClick={() => setShowMegaMenu(false)}
                                                    className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2.5 rounded-full text-white hover:bg-white hover:text-[#001F14] transition-all duration-500 text-[9px] uppercase tracking-[0.2em] font-semibold">
                                                    Discover <ArrowUpRight size={12} />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[90] bg-[#FAF8F4] overflow-y-auto pt-24 px-6 pb-20">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-[#003926]/40 font-bold font-body mb-6 text-center">Collections</p>
                        <div className="flex flex-col gap-3">
                            {allCols.map((col, i) => (
                                <motion.div key={col.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.04 }}
                                    className="rounded-xl overflow-hidden bg-white border border-[#003926]/5 shadow-[0_4px_16px_rgba(0,31,20,0.03)]">
                                    <Link href={`/collections/${col.slug}`} onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-4 p-4">
                                        <div className="w-10 h-10 rounded-lg bg-[#FAF8F4] flex items-center justify-center text-[#003926]/40 shrink-0">
                                            {getIcon(col.slug)}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-[13px] font-body font-semibold text-[#001F14] uppercase tracking-wide">{col.name}</h3>
                                            <p className="text-[10px] text-[#003926]/35 font-body truncate">{col.tagline || col.philosophy || "Explore"}</p>
                                        </div>
                                        <ChevronRight size={16} className="text-[#003926]/18 shrink-0" />
                                    </Link>
                                </motion.div>
                            ))}
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
