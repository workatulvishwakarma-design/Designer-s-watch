"use client";

import { useState, useEffect, useMemo } from "react";
import FilterBar from "@/components/ui/FilterBar";
import ProductCard from "@/components/ui/ProductCard";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { getCollectionProducts } from "@/actions/public.actions";
import type { UnifiedProduct } from "@/lib/products";
import { sortProducts, type SortOption } from "@/lib/products";
import { Loader2 } from "lucide-react";

const categories = ["All", "Chronograph", "Classic", "Sport", "Gold", "Silver"];

export default function DsignerGrid() {
    const [products, setProducts] = useState<UnifiedProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeSort, setActiveSort] = useState<SortOption>("Featured");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function load() {
            try {
                const data = await getCollectionProducts("D'SIGNER");
                setProducts(data);
            } catch (err) {
                console.error("Failed to load D'SIGNER products:", err);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, []);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Search filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q)
            );
        }

        // Category filter
        if (activeCategory !== "All") {
            result = result.filter(p => p.category === activeCategory);
        }

        // Sort
        result = sortProducts(result, activeSort);

        return result;
    }, [products, activeCategory, activeSort, searchQuery]);

    const handleSortChange = (sort: string) => {
        setActiveSort(sort as SortOption);
    };

    if (isLoading) {
        return (
            <section className="bg-[#FAF8F4] py-24 relative overflow-hidden">
                <div className="flex flex-col items-center justify-center gap-4">
                    <Loader2 size={24} className="animate-spin text-[#B8935A]" />
                    <span className="font-dm text-sm tracking-widest uppercase text-[#9C9690]">Loading Collection...</span>
                </div>
            </section>
        );
    }

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
                onSortChange={handleSortChange}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <div className="max-w-7xl mx-auto px-6 mt-12">
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="font-cormorant text-2xl text-[#1A1918] mb-3">No products found</p>
                        <p className="font-dm text-sm text-[#9C9690]">Try adjusting your filters or search query.</p>
                        <button
                            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                            className="mt-4 px-6 py-2 bg-[#1A1918] text-white rounded-full font-dm text-xs tracking-widest uppercase hover:bg-[#B8935A] transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product, i) => (
                            <ProductCard
                                key={product.slug}
                                product={{
                                    id: product.slug as any,
                                    name: product.name,
                                    price: product.price,
                                    category: product.category,
                                    badge: product.badge,
                                    image: product.image,
                                    brand: product.brand,
                                    slug: product.slug,
                                    mrp: product.comparePrice || undefined,
                                    tags: product.tags,
                                    stock: product.stock,
                                    lowStockThreshold: product.lowStockThreshold,
                                }}
                                variant="premium"
                                index={i}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
