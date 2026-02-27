"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterBarProps {
    totalItems: number;
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    onSortChange: (sort: string) => void;
}

export default function FilterBar({
    totalItems,
    categories,
    activeCategory,
    onCategoryChange,
    onSortChange
}: FilterBarProps) {
    const [sortOpen, setSortOpen] = useState(false);
    const [activeSort, setActiveSort] = useState("Featured");

    const handleSort = (option: string) => {
        setActiveSort(option);
        onSortChange(option);
        setSortOpen(false);
    };

    return (
        <div className="sticky top-[72px] z-40 bg-[#FAF8F4]/90 backdrop-blur-xl border-b border-border py-4">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Count */}
                <div className="hidden lg:block w-40">
                    <span className="text-[12px] font-body text-secondaryText tracking-widest uppercase">
                        {totalItems} Collections
                    </span>
                </div>

                {/* Categories */}
                <div className="flex items-center gap-2 md:gap-3 overflow-x-auto hide-scrollbar pb-1 md:pb-0">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={`relative px-6 py-2.5 rounded-full text-[10px] font-body tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap overflow-hidden ${activeCategory === cat
                                    ? "bg-gold text-white shadow-lg shadow-gold/20"
                                    : "bg-white border border-border text-primaryText hover:bg-gold/5 hover:border-gold/30"
                                }`}
                        >
                            <span className="relative z-10">{cat}</span>
                            {activeCategory === cat && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-gold z-0"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Sort Dropdown */}
                <div className="relative w-40 flex justify-end">
                    <button
                        onClick={() => setSortOpen(!sortOpen)}
                        className="flex items-center gap-3 text-[11px] font-body tracking-widest uppercase text-primaryText hover:text-gold transition-colors font-medium"
                    >
                        Sort: <span className="text-secondaryText font-normal">{activeSort}</span>
                        <ChevronDown size={14} className={`transition-transform duration-500 ${sortOpen ? "rotate-180 text-gold" : ""}`} />
                    </button>

                    <AnimatePresence>
                        {sortOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-[calc(100%+12px)] right-0 w-52 bg-white border border-border rounded-xl shadow-[0_12px_48px_rgba(0,0,0,0.12)] py-3 z-50 overflow-hidden"
                            >
                                {["Featured", "Price: Low to High", "Price: High to Low", "Newest Arrivals"].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleSort(option)}
                                        className={`w-full px-5 py-3 text-left text-[12px] font-body flex items-center justify-between transition-colors ${activeSort === option ? "text-gold bg-gold/5" : "text-primaryText hover:bg-background"
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
    );
}
