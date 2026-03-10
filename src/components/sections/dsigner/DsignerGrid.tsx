"use client";

import { useState, useMemo } from "react";
import FilterBar from "@/components/ui/FilterBar";
import ProductCard from "@/components/ui/ProductCard";
import GrainOverlay from "@/components/ui/GrainOverlay";

const categories = ["All", "Chronograph", "Classic", "Sport", "Gold", "Silver"];

export const dsignerProducts = [
    { id: 1, name: "901", price: 4999, category: "Chronograph", brand: "D'SIGNER", badge: "Bestseller", image: "/images/watches/Designer/901/901/901GM.png", tags: ["best-selling", "premium", "classic"] },
    { id: 2, name: "915", price: 3499, category: "Classic", brand: "D'SIGNER", badge: "New", image: "/images/watches/Designer/915 with video/915/915GFS.3G.png", tags: ["new-arrivals", "classic"] },
    { id: 3, name: "955", price: 2999, category: "Classic", brand: "D'SIGNER", badge: null, image: "/images/watches/Designer/955/955GFS.16L/955GFS (1).jpg", tags: ["classic"] },
    { id: 4, name: "960", price: 4499, category: "Sport", brand: "D'SIGNER", badge: "Limited", image: "/images/watches/Designer/960/960GFS.16G/960GFS (1).jpg", tags: ["limited", "premium", "sport"] },
    { id: 5, name: "925", price: 3999, category: "Gold", brand: "D'SIGNER", badge: null, image: "/images/watches/Designer/to focus on/925/925/925GM.16L.png", tags: ["premium", "classic"] },
    { id: 6, name: "950", price: 1299, category: "Classic", brand: "D'SIGNER", badge: "New", image: "/images/watches/Designer/to focus on/950/950GNFS.16G.png", tags: ["new-arrivals"] },
    { id: 7, name: "863", price: 2799, category: "Silver", brand: "D'SIGNER", badge: null, image: "/images/watches/Designer/to post after holi/863 pair/863GM.16G & 863GM.16L.png", tags: ["classic"] },
    { id: 8, name: "942", price: 3899, category: "Sport", brand: "D'SIGNER", badge: "Bestseller", image: "/images/watches/Designer/to post after holi/942 & 943 pair/942GM.16G & 943GM.16L.png", tags: ["best-selling", "sport"] },
    { id: 9, name: "901GM", price: 4299, category: "Classic", brand: "D'SIGNER", badge: "Limited", image: "/images/watches/Designer/901/901/901GM_Green.png", tags: ["limited", "premium", "classic"] },
    { id: 10, name: "915 GNFS", price: 4999, category: "Gold", brand: "D'SIGNER", badge: "New", image: "/images/watches/Designer/915 with video/915/915GNFS.3G.png", tags: ["new-arrivals", "premium"] },
    { id: 11, name: "955 RGFS", price: 1599, category: "Sport", brand: "D'SIGNER", badge: null, image: "/images/watches/Designer/955/955RGFS.16L/955RGFS (1).jpg", tags: ["sport"] },
    { id: 12, name: "960 SFS", price: 2199, category: "Classic", brand: "D'SIGNER", badge: null, image: "/images/watches/Designer/960/960SFS.16G/960SFS (1).jpg", tags: ["classic"] },
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
