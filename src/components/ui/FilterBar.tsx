"use client";

import { useState } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterBarProps {
    totalItems: number;
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    onSortChange: (sort: string) => void;
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
}

export default function FilterBar({
    totalItems,
    categories,
    activeCategory,
    onCategoryChange,
    onSortChange,
    searchQuery = "",
    onSearchChange,
}: FilterBarProps) {
    const [sortOpen, setSortOpen] = useState(false);
    const [activeSort, setActiveSort] = useState("Featured");
    const [searchOpen, setSearchOpen] = useState(false);

    const handleSort = (option: string) => {
        setActiveSort(option);
        onSortChange(option);
        setSortOpen(false);
    };

    return (
        <div className="sticky top-[72px] z-40 bg-[#FAF8F4]/90 backdrop-blur-xl border-b border-[#E0D8CE] py-4">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
                {/* Count + Search */}
                <div className="hidden lg:flex items-center gap-4 w-48">
                    <span className="text-[12px] font-dm text-[#9C9690] tracking-widest uppercase whitespace-nowrap">
                        {totalItems} {totalItems === 1 ? "Product" : "Products"}
                    </span>
                </div>

                {/* Categories */}
                <div className="flex items-center gap-2 md:gap-3 overflow-x-auto hide-scrollbar pb-1 md:pb-0 flex-1 justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={`relative px-6 py-2.5 rounded-full text-[10px] font-dm tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap overflow-hidden ${activeCategory === cat
                                    ? "bg-[#003926] text-white shadow-lg shadow-[#003926]/20"
                                    : "bg-white border border-[#E0D8CE] text-[#1A1918] hover:bg-[#003926]/5 hover:border-[#003926]/30"
                                }`}
                        >
                            <span className="relative z-10">{cat}</span>
                        </button>
                    ))}
                </div>

                {/* Search + Sort */}
                <div className="flex items-center gap-4 w-auto">
                    {/* Search toggle */}
                    {onSearchChange && (
                        <div className="relative">
                            <AnimatePresence>
                                {searchOpen ? (
                                    <motion.div
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: 200, opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex items-center overflow-hidden"
                                    >
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => onSearchChange(e.target.value)}
                                            placeholder="Search..."
                                            className="w-full px-3 py-2 text-[12px] font-dm text-[#1A1918] bg-white border border-[#E0D8CE] rounded-full focus:outline-none focus:border-[#B8935A] transition-colors"
                                            autoFocus
                                        />
                                        <button
                                            onClick={() => { setSearchOpen(false); onSearchChange(""); }}
                                            className="ml-1 text-[#9C9690] hover:text-[#1A1918] transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <button
                                        onClick={() => setSearchOpen(true)}
                                        className="flex items-center gap-1 text-[#9C9690] hover:text-[#B8935A] transition-colors"
                                    >
                                        <Search size={16} />
                                    </button>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Sort Dropdown */}
                    <div className="relative flex justify-end">
                        <button
                            onClick={() => setSortOpen(!sortOpen)}
                            className="flex items-center gap-3 text-[11px] font-dm tracking-widest uppercase text-[#1A1918] hover:text-[#B8935A] transition-colors font-medium whitespace-nowrap"
                        >
                            Sort: <span className="text-[#9C9690] font-normal">{activeSort}</span>
                            <ChevronDown size={14} className={`transition-transform duration-500 ${sortOpen ? "rotate-180 text-[#B8935A]" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {sortOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-[calc(100%+12px)] right-0 w-52 bg-white border border-[#E0D8CE] rounded-xl shadow-[0_12px_48px_rgba(0,0,0,0.12)] py-3 z-50 overflow-hidden"
                                >
                                    {["Featured", "Price: Low to High", "Price: High to Low", "Newest Arrivals", "Best Selling"].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => handleSort(option)}
                                            className={`w-full px-5 py-3 text-left text-[12px] font-dm flex items-center justify-between transition-colors ${activeSort === option ? "text-[#B8935A] bg-[#B8935A]/5" : "text-[#1A1918] hover:bg-[#FAF8F4]"
                                                }`}
                                        >
                                            {option}
                                            {activeSort === option && <Check size={14} />}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
