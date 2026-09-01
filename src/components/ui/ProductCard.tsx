"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye, Flame } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/store/cart";
import { toast } from "sonner";
import LuxuryPlaceholder from "@/components/ui/LuxuryPlaceholder";
import QuickViewModal, { QuickViewProduct } from "@/components/ui/QuickViewModal";

export interface ProductProps {
    id: number | string;
    name: string;
    price: number;
    category: string;
    badge?: string | null;
    image: string;
    hoverImage?: string;
    brand: string;
    slug?: string;
    rating?: number;
    mrp?: number;
    discount?: number;
    tags?: string[];
    stock?: number;
    lowStockThreshold?: number;
    description?: string;
    specs?: {
        movement?: string;
        strap?: string;
        waterResistance?: string;
        caseMaterial?: string;
        caseSize?: string;
        dialSize?: string;
        glass?: string;
        warranty?: string;
        functionality?: string;
        bandSize?: string;
        thickness?: string;
        weight?: string;
        strapClosure?: string;
    };
    dialColor?: string;
    strapColor?: string;
    ean?: string;
}

interface ProductCardProps {
    product: ProductProps;
    variant?: "premium" | "everyday";
    index?: number;
}

const getBadgeStyle = (badge?: string | null) => {
    switch (badge?.toUpperCase()) {
        case "BEST SELLER":
        case "BESTSELLER":
            return "bg-[#1A1918] text-white";
        case "NEW":
            return "bg-[#003926] text-white";
        case "LIMITED":
            return "bg-[#B8935A] text-white";
        case "SALE":
            return "bg-[#D4455A] text-white";
        case "VALUE PICK":
            return "bg-[#F0F7F4] text-[#003926] border border-[#003926]/30";
        default:
            return "bg-[#1A1918] text-white";
    }
};

export default function ProductCard({ product, variant = "premium", index = 0 }: ProductCardProps) {
    const { addItem } = useCartStore();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [hoveredOverlay, setHoveredOverlay] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const discountPercent = product.discount || (product.mrp && product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0);
    
    // Use product.slug directly if available, otherwise generate from brand+name
    const productSlug = product.slug || `${product.brand}-${product.name}`
        .toLowerCase()
        .replace(/[']/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const isLowStock = product.stock !== undefined && product.stock > 0 && product.stock <= (product.lowStockThreshold || 5);

    const handleAddToCart = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        addItem({
            productId: productSlug,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
            slug: productSlug
        });
        toast.success(`${product.name} added to cart`);
    };

    const handleOpenQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsQuickViewOpen(true);
    };

    const quickViewData: QuickViewProduct = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        mrp: product.mrp,
        image: product.image,
        hoverImage: product.hoverImage,
        category: product.category,
        badge: product.badge,
        slug: productSlug,
        description: product.description,
        specs: product.specs,
        dialColor: product.dialColor,
        strapColor: product.strapColor,
        ean: product.ean
    };

    return (
        <>
        <Link href={`/product/${productSlug}`} className="block">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.065, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            onHoverStart={() => { setHoveredOverlay(true); setIsHovered(true); }}
            onHoverEnd={() => { setHoveredOverlay(false); setIsHovered(false); }}
            className="group bg-white border border-[#EDE8DF] rounded-2xl overflow-hidden cursor-pointer relative transition-all duration-500 hover:-translate-y-2.5 hover:border-[rgba(0,57,38,0.25)] hover:shadow-[0_20px_60px_rgba(0,57,38,0.08)]"
        >
            {/* Image Area */}
            <div className="relative aspect-[4/5] bg-[#F7F4EF] flex items-center justify-center p-7 overflow-hidden">
                {/* Badge */}
                {product.badge && (
                    <div className={`absolute top-6 left-6 px-3 py-1.5 rounded-full text-[9px] font-dm tracking-[0.15em] uppercase z-10 ${getBadgeStyle(product.badge)}`}>
                        {product.badge}
                    </div>
                )}

                {/* Sale badge */}
                {discountPercent > 0 && (
                    <div className="absolute top-6 right-16 px-2.5 py-1 rounded-full text-[9px] font-dm bg-[#D4455A] text-white z-10 font-semibold shadow-sm">
                        {discountPercent}% OFF
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsWishlisted(!isWishlisted); }}
                    className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white shadow-sm z-10 cursor-pointer"
                >
                    <Heart size={16} className={isWishlisted ? "fill-[#D4455A] text-[#D4455A]" : "text-[#1A1918]"} />
                </button>

                {/* Image */}
                <motion.div
                    className="relative w-full h-full flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], scale: { type: 'spring', stiffness: 200, damping: 20 } }}
                >
                    {product.image && !imageError ? (
                      <>
                        {/* Primary image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={product.image}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-contain p-8 sm:p-10 transition-opacity duration-500"
                            style={{ opacity: isHovered && product.hoverImage ? 0 : 1 }}
                            onError={() => setImageError(true)}
                            loading="lazy"
                        />
                        {/* Hover image (crossfade) */}
                        {product.hoverImage && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                              src={product.hoverImage}
                              alt={`${product.name} - alternate view`}
                              className="absolute inset-0 w-full h-full object-contain p-8 sm:p-10 transition-opacity duration-500"
                              style={{ opacity: isHovered ? 1 : 0 }}
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                              loading="lazy"
                          />
                        )}
                      </>
                    ) : (
                      <div className="absolute inset-0">
                        <LuxuryPlaceholder />
                      </div>
                    )}

                    {/* Shimmer sweep */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={hoveredOverlay ? { x: "100%" } : { x: "-100%" }}
                        transition={{ duration: 0.7, ease: "linear" }}
                        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
                        style={{
                            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.65) 50%, transparent 60%)",
                        }}
                    />
                </motion.div>

                {/* Blur Glass Overlay on Hover */}
                <motion.div
                    animate={{ opacity: hoveredOverlay ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 bg-[#FAF8F4]/60 backdrop-blur-[14px] flex flex-col items-center justify-center gap-3 z-20 pointer-events-none group-hover:pointer-events-auto"
                >
                    {/* Add to Cart Button */}
                    <motion.button
                        initial={{ y: 16, opacity: 0 }}
                        animate={hoveredOverlay ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
                        transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
                        onClick={handleAddToCart}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-dm text-[12px] font-bold tracking-widest uppercase transition-all duration-300 relative overflow-hidden group/btn cursor-pointer shadow-md hover:shadow-[0_8px_20px_rgba(0,57,38,0.3)] hover:-translate-y-0.5"
                        style={{ background: '#003926', color: '#FFFFFF' }}
                    >
                        <ShoppingBag size={14} />
                        Add to Cart
                    </motion.button>

                    {/* Quick View Button */}
                    <motion.button
                        initial={{ y: 16, opacity: 0 }}
                        animate={hoveredOverlay ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
                        transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
                        onClick={handleOpenQuickView}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-[#1A1918] border border-[#E0D8CE] rounded-full font-dm text-[12px] font-bold tracking-widest uppercase hover:bg-[#1A1918] hover:text-white hover:border-[#1A1918] transition-all duration-300 cursor-pointer shadow-sm"
                    >
                        <Eye size={14} />
                        Quick View
                    </motion.button>
                </motion.div>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-7 relative z-10">
                {/* Brand */}
                <p className="text-[#B8935A] text-[9px] font-dm tracking-[0.25em] uppercase mb-1">
                    {product.brand}
                </p>

                {/* Product Name */}
                <h3 className="font-dm font-medium text-[15px] sm:text-[16px] text-[#1A1918] mb-3 line-clamp-2 group-hover:text-[#003926] transition-colors duration-300 min-h-[44px] flex items-center">
                    {product.name}
                </h3>

                {/* Price Row with ADD TO CART Button */}
                <div className="flex items-center justify-between gap-3 pt-1 border-t border-[#EDE8DF]/60">
                    <div className="flex items-baseline gap-2">
                        <span className="font-cormorant italic text-[22px] sm:text-[24px] text-[#B8935A] font-bold">
                            ₹{product.price.toLocaleString()}
                        </span>
                        {product.mrp && product.mrp > product.price && (
                            <span className="font-dm text-[12px] sm:text-[13px] line-through text-[#9C9690]">
                                ₹{product.mrp.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Direct ADD TO CART button beside price */}
                    <button
                        onClick={handleAddToCart}
                        className="shrink-0 px-4 py-2 bg-[#003926] text-white rounded-full font-dm text-[11px] font-bold tracking-[0.14em] uppercase hover:bg-[#002b1d] hover:shadow-[0_4px_14px_rgba(0,57,38,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-1.5 cursor-pointer z-10"
                        title="Add to Cart"
                    >
                        <ShoppingBag size={13} />
                        <span>Add</span>
                    </button>
                </div>

                {/* Stock status */}
                {isLowStock && (
                    <div className="flex items-center gap-1.5 mt-2.5">
                        <Flame size={12} className="text-[#D4455A]" />
                        <span className="font-dm text-[11px] text-[#D4455A]">Only {product.stock} left</span>
                    </div>
                )}
            </div>
        </motion.div>
        </Link>

        {/* Quick View Modal */}
        <QuickViewModal
            product={quickViewData}
            isOpen={isQuickViewOpen}
            onClose={() => setIsQuickViewOpen(false)}
        />
        </>
    );
}
