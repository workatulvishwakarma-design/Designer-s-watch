"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import FilterBar from "@/components/ui/FilterBar";
import ProductCard from "@/components/ui/ProductCard";
import GrainOverlay from "@/components/ui/GrainOverlay";
import LuxuryPagination from "@/components/ui/LuxuryPagination";
import { DSIGNER_WOMENS_UNIFIED_PRODUCTS } from "@/lib/dsignerCatalog";
import type { UnifiedProduct, SortOption } from "@/lib/products";
import { sortProducts } from "@/lib/products";

const categories = ["All", "Gold", "Silver", "Green", "Blue", "Brown", "Rose Gold"];

const ROWS_PER_PAGE = 12;
const COLS_PER_ROW = 3; // 3 columns on desktop grid
const ITEMS_PER_PAGE = ROWS_PER_PAGE * COLS_PER_ROW; // 36 items per page

export default function DsignerWomensGrid() {
    const [products] = useState<UnifiedProduct[]>(DSIGNER_WOMENS_UNIFIED_PRODUCTS);
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeSort, setActiveSort] = useState<SortOption>("Featured");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const gridTopRef = useRef<HTMLDivElement>(null);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // 1. Search filter across complete product data
        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            const qClean = q.replace(/[^a-z0-9]/g, "");
            const tokens = q.split(/\s+/).filter(Boolean);

            result = result.filter(p => {
                const name = (p.name || "").toLowerCase();
                const modelNum = (p.modelNumber || "").toLowerCase();
                const modelFam = (p.modelFamily || "").toLowerCase();
                const slug = (p.slug || "").toLowerCase();
                const brand = (p.brand || "").toLowerCase();
                const category = (p.category || "").toLowerCase();
                const desc = (p.description || "").toLowerCase();
                const ean = (p.ean || "").toLowerCase();
                const tags = (p.tags || []).join(" ").toLowerCase();
                const colors = (p.colors || []).map(c => c.name).join(" ").toLowerCase();
                const specsValues = p.specs ? Object.values(p.specs).filter(v => typeof v === "string").join(" ").toLowerCase() : "";
                const specsKeys = p.specs ? Object.keys(p.specs).join(" ").toLowerCase() : "";

                const combined = `${name} ${modelNum} ${modelFam} ${slug} ${brand} ${category} ${desc} ${ean} ${tags} ${colors} ${specsValues} ${specsKeys}`;
                const combinedClean = combined.replace(/[^a-z0-9]/g, "");

                if (combined.includes(q)) return true;
                if (qClean && combinedClean.includes(qClean)) return true;

                if (tokens.length > 1 && tokens.every(token => {
                    const tokenClean = token.replace(/[^a-z0-9]/g, "");
                    return combined.includes(token) || (tokenClean && combinedClean.includes(tokenClean));
                })) {
                    return true;
                }

                return false;
            });
        }

        // 2. Category / Series / Dial color filter
        if (activeCategory !== "All") {
            const cat = activeCategory.toLowerCase();
            result = result.filter(p => 
                (p.modelFamily && p.modelFamily.toLowerCase() === cat) ||
                p.tags.some(t => t.toLowerCase() === cat) ||
                p.colors.some(c => c.name.toLowerCase() === cat) ||
                p.category.toLowerCase().includes(cat)
            );
        }

        // 3. Deduplicate
        const seenSlugs = new Set<string>();
        result = result.filter(p => {
            if (seenSlugs.has(p.slug)) return false;
            seenSlugs.add(p.slug);
            return true;
        });

        // 4. Sort
        result = sortProducts(result, activeSort);

        return result;
    }, [products, activeCategory, activeSort, searchQuery]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

    // Reset to page 1 when filters or search change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, activeSort, searchQuery]);

    // Ensure valid page if count changes
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [currentPage, totalPages]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        if (gridTopRef.current) {
            gridTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const handleSortChange = (sort: string) => {
        setActiveSort(sort as SortOption);
    };

    return (
        <section
            ref={gridTopRef}
            className="bg-[#FAF8F4] pt-28 md:pt-32 pb-24 relative overflow-hidden"
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

            {/* Category Title & Subtitle */}
            <div className="text-center pb-6 px-6">
                <h1 className="font-cormorant text-3xl md:text-4xl text-[#1A1918] mb-2 tracking-wide font-medium">
                    Women&apos;s D&apos;Signer Collection
                </h1>
                <p className="font-cormorant italic text-lg md:text-xl text-[#003926]">
                    &quot;Sculpted Elegance &amp; Horological Precision&quot;
                </p>
            </div>

            <FilterBar
                totalItems={filteredProducts.length}
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                onSortChange={handleSortChange}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <div className="max-w-7xl mx-auto px-6 pt-16 sm:pt-20 pb-12">
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="font-cormorant text-2xl text-[#1A1918] mb-3">No products found</p>
                        <p className="font-dm text-sm text-[#9C9690]">Try adjusting your filters or search query.</p>
                        <button
                            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                            className="mt-4 px-6 py-2 bg-[#1A1918] text-white rounded-full font-dm text-xs tracking-widest uppercase hover:bg-[#B8935A] transition-colors cursor-pointer"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {paginatedProducts.map((product, i) => (
                                <ProductCard
                                    key={product.slug}
                                    product={{
                                        id: product.slug as any,
                                        name: product.name,
                                        price: product.price,
                                        category: product.category,
                                        badge: product.badge,
                                        image: product.image,
                                        hoverImage: product.hoverImage,
                                        brand: product.brand,
                                        slug: product.slug,
                                        mrp: product.comparePrice || undefined,
                                        tags: product.tags,
                                        stock: product.stock,
                                        lowStockThreshold: product.lowStockThreshold,
                                        description: product.description,
                                        specs: product.specs,
                                        dialColor: product.colors?.[0]?.name,
                                        strapColor: product.colors?.[1]?.name,
                                        ean: product.ean
                                    }}
                                    variant="premium"
                                    index={i}
                                />
                            ))}
                        </div>

                        {/* Pagination Section */}
                        <LuxuryPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            totalItems={filteredProducts.length}
                            itemsPerPage={ITEMS_PER_PAGE}
                        />
                    </>
                )}
            </div>
        </section>
    );
}
