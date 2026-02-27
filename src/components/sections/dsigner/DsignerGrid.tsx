"use client";

import { useState, useMemo } from "react";
import FilterBar from "@/components/ui/FilterBar";
import ProductCard from "@/components/ui/ProductCard";
import GrainOverlay from "@/components/ui/GrainOverlay";

const categories = ["All", "Chronograph", "Classic", "Sport", "Gold", "Silver"];

const dsignerProducts = [
    { id: 1, name: "D'Signer Chronos", price: 4999, category: "Chronograph", brand: "D'SIGNER", badge: "Bestseller", image: "/images/img01.png" },
    { id: 2, name: "D'Signer Heritage", price: 3499, category: "Classic", brand: "D'SIGNER", badge: "New", image: "/images/img02.png" },
    { id: 3, name: "D'Signer Prestige", price: 2999, category: "Classic", brand: "D'SIGNER", badge: null, image: "/images/img04.png" },
    { id: 4, name: "D'Signer Apex", price: 4499, category: "Sport", brand: "D'SIGNER", badge: "Limited", image: "/images/img05.png" },
    { id: 5, name: "D'Signer Lumière", price: 3999, category: "Gold", brand: "D'SIGNER", badge: null, image: "/images/img1.png" },
    { id: 6, name: "D'Signer Noir", price: 1299, category: "Classic", brand: "D'SIGNER", badge: "New", image: "/images/img2.png" },
    { id: 7, name: "D'Signer Silver Edge", price: 2799, category: "Silver", brand: "D'SIGNER", badge: null, image: "/images/img3.png" },
    { id: 8, name: "D'Signer Sport Pro", price: 3899, category: "Sport", brand: "D'SIGNER", badge: "Bestseller", image: "/images/img01.png" },
    { id: 9, name: "D'Signer Executive", price: 4299, category: "Classic", brand: "D'SIGNER", badge: "Limited", image: "/images/img02.png" },
    { id: 10, name: "D'Signer Gold Edition", price: 4999, category: "Gold", brand: "D'SIGNER", badge: "New", image: "/images/img04.png" },
    { id: 11, name: "D'Signer Vitesse", price: 1599, category: "Sport", brand: "D'SIGNER", badge: null, image: "/images/img05.png" },
    { id: 12, name: "D'Signer Minimal", price: 2199, category: "Classic", brand: "D'SIGNER", badge: null, image: "/images/img1.png" },
];

export default function DsignerGrid() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeSort, setActiveSort] = useState("Featured");

    const filteredProducts = useMemo(() => {
        let products = [...dsignerProducts];

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            variant="premium"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
