"use client";

import { useState, useMemo } from "react";
import FilterBar from "@/components/ui/FilterBar";
import ProductCard from "@/components/ui/ProductCard";
import GrainOverlay from "@/components/ui/GrainOverlay";

const categories = ["All", "Sport", "Classic", "Minimal"];

export const escortProducts = [
    { id: 1, name: "Escort Diver Pro", price: 800, category: "Sport", brand: "ESCORT", badge: "Value Pick", image: "/images/img01.png", tags: ["best-value", "sport"] },
    { id: 2, name: "Escort Minimalist", price: 1200, category: "Minimal", brand: "ESCORT", badge: null, image: "/images/img02.png", tags: ["everyday"] },
    { id: 3, name: "Escort Pilot X", price: 2200, category: "Sport", brand: "ESCORT", badge: "Bestseller", image: "/images/img04.png", tags: ["best-selling", "sport"] },
    { id: 4, name: "Escort Heritage", price: 999, category: "Classic", brand: "ESCORT", badge: null, image: "/images/img05.png", tags: ["everyday"] },
    { id: 5, name: "Escort Active", price: 1499, category: "Sport", brand: "ESCORT", badge: "New", image: "/images/img1.png", tags: ["new-arrivals", "sport"] },
    { id: 6, name: "Escort Urban", price: 1100, category: "Minimal", brand: "ESCORT", badge: null, image: "/images/img2.png", tags: ["everyday", "best-value"] },
    { id: 7, name: "Escort Classic Silver", price: 1599, category: "Classic", brand: "ESCORT", badge: "New", image: "/images/img3.png", tags: ["new-arrivals", "everyday"] },
    { id: 8, name: "Escort Field Watch", price: 1800, category: "Sport", brand: "ESCORT", badge: null, image: "/images/img01.png", tags: ["sport"] },
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
