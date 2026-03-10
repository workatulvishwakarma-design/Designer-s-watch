"use client";

import { useState, useMemo } from "react";
import FilterBar from "@/components/ui/FilterBar";
import ProductCard from "@/components/ui/ProductCard";
import GrainOverlay from "@/components/ui/GrainOverlay";

const categories = ["All", "Sport", "Classic", "Minimal"];

export const escortProducts = [
    { id: 1, name: "7779", price: 800, category: "Sport", brand: "ESCORT", badge: "Value Pick", image: "/images/watches/Escort/7779/E-2250-7779.GM.2L.png", tags: ["best-value", "sport"] },
    { id: 2, name: "7806", price: 1200, category: "Minimal", brand: "ESCORT", badge: null, image: "/images/watches/Escort/7806/E-2200-7806.GM.5L.jpg", tags: ["everyday"] },
    { id: 3, name: "A-1589", price: 2200, category: "Sport", brand: "ESCORT", badge: "Bestseller", image: "/images/watches/Escort/A-1589/A-1589.SM_Black.png", tags: ["best-selling", "sport"] },
    { id: 4, name: "E-7751", price: 999, category: "Classic", brand: "ESCORT", badge: null, image: "/images/watches/Escort/E-7751/E-7751.BM_Black.png", tags: ["everyday"] },
    { id: 5, name: "E-7908", price: 1499, category: "Sport", brand: "ESCORT", badge: "New", image: "/images/watches/Escort/E-7908/E-2200-7908.GM_White.png", tags: ["new-arrivals", "sport"] },
    { id: 6, name: "E-7914", price: 1100, category: "Minimal", brand: "ESCORT", badge: null, image: "/images/watches/Escort/E-7914/E-7914.BM_Blue.png", tags: ["everyday", "best-value"] },
    { id: 7, name: "7779 (RGM)", price: 1599, category: "Classic", brand: "ESCORT", badge: "New", image: "/images/watches/Escort/7779/E-2300-7779.RGM.16L.png", tags: ["new-arrivals", "everyday"] },
    { id: 8, name: "7806 (RTM)", price: 1800, category: "Sport", brand: "ESCORT", badge: null, image: "/images/watches/Escort/7806/E-2200-7806.RTM.16L.jpg", tags: ["sport"] },
];

export default function EscortGrid() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeSort, setActiveSort] = useState("Featured");

    const filteredProducts = useMemo(() => {
        let products = [...escortProducts];

        if (activeCategory !== "All") {
            products = products.filter(p => p.category === activeCategory);
        }

        if (activeSort === "Price: Low to High") {
            products.sort((a, b) => a.price - b.price);
        } else if (activeSort === "Price: High to Low") {
            products.sort((a, b) => b.price - a.price);
        } else if (activeSort === "Newest Arrivals") {
            products.sort((a, b) => b.id - a.id);
        }

        return products;
    }, [activeCategory, activeSort]);

    return (
        <section
            className="bg-[#FAF8F4] pt-12 pb-24 relative overflow-hidden"
            style={{
                backgroundImage: `repeating-linear-gradient(
                    -45deg,
                    rgba(184,147,90,0.03) 0px,
                    rgba(184,147,90,0.03) 1px,
                    transparent 1px,
                    transparent 12px
                )`
            }}
        >
            <GrainOverlay />
            <FilterBar
                totalItems={filteredProducts.length}
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                onSortChange={setActiveSort}
            />

            <div className="max-w-7xl mx-auto px-6 mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            variant="everyday"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
