"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface ProductProps {
    id: number;
    name: string;
    price: number;
    category: string;
    badge?: string | null;
    image: string;
    brand: string;
    rating?: number;
    mrp?: number;
    discount?: number;
    tags?: string[];
}

interface ProductCardProps {
    product: ProductProps;
    variant?: "premium" | "everyday";
    index?: number;
}

const getBadgeStyle = (badge?: string | null) => {
    switch (badge) {
        case "BEST SELLER":
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
    const { addToCart } = useCart();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [hoveredOverlay, setHoveredOverlay] = useState(false);

    const discountPercent = product.discount || (product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.065, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            onHoverStart={() => setHoveredOverlay(true)}
            onHoverEnd={() => setHoveredOverlay(false)}
            className="group bg-white border border-[#EDE8DF] rounded-2xl overflow-hidden cursor-pointer relative transition-all duration-500 hover:-translate-y-2.5 hover:border-[#B8935A]/45 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
        >
            {/* Image Area */}
            <div className="relative h-[300px] bg-[#F7F4EF] flex items-center justify-center p-7 overflow-hidden">
                {/* Badge */}
                {product.badge && (
                    <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-[9px] font-dm tracking-[0.15em] uppercase z-10 ${getBadgeStyle(product.badge)}`}>
                        {product.badge}
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white z-10"
                >
                    <Heart size={16} className={isWishlisted ? "fill-[#D4455A] text-[#D4455A]" : "text-[#1A1918]"} />
                </button>

                {/* Image */}
                <motion.div
                    className="relative w-full h-full flex items-center justify-center"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />

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

                {/* Blur Glass Overlay */}
                <motion.div
                    animate={{ opacity: hoveredOverlay ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 bg-[#FAF8F4]/60 backdrop-blur-[14px] flex flex-col items-center justify-center gap-2.5 z-20"
                >
                    {/* Add to Cart Button */}
                    <motion.button
                        initial={{ y: 16, opacity: 0 }}
                        animate={hoveredOverlay ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
                        transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
                        onClick={() => addToCart(product, product.brand)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#1A1918] text-white rounded-full font-dm text-[12px] font-medium letter-spacing tracking-widest uppercase hover:bg-[#B8935A] transition-all duration-300"
                    >
                        <ShoppingBag size={14} />
                        Add to Cart
                    </motion.button>

                    {/* Quick View Button */}
                    <motion.button
                        initial={{ y: 16, opacity: 0 }}
                        animate={hoveredOverlay ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
                        transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
                        className="flex items-center gap-2 px-6 py-3 bg-white/80 text-[#1A1918] border border-[#E0D8CE] rounded-full font-dm text-[12px] font-medium tracking-widest uppercase hover:bg-white transition-all duration-300"
                    >
                        <Eye size={14} />
                        Quick View
                    </motion.button>
                </motion.div>
            </div>

            {/* Content Area */}
            <div className="p-6 relative z-10">
                {/* Brand */}
                <p className="text-[#B8935A] text-[9px] font-dm tracking-[0.25em] uppercase mb-1">
                    {product.brand}
                </p>

                {/* Product Name */}
                <h3 className="font-dm font-medium text-[16px] text-[#1A1918] mb-2 line-clamp-2 hover:text-[#B8935A] transition-colors duration-300">
                    {product.name}
                </h3>

                {/* Rating */}
                {product.rating && (
                    <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(product.rating || 0) ? "text-[#B8935A]" : "text-[#E0D8CE]"}>
                                ★
                            </span>
                        ))}
                        <span className="text-[11px] text-[#9C9690] ml-1.5">({product.rating})</span>
                    </div>
                )}

                {/* Price Row */}
                <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="font-cormorant italic text-[24px] text-[#B8935A]">₹{product.price.toLocaleString()}</span>
                    {product.mrp && (
                        <span className="font-dm text-[13px] line-through text-[#9C9690]">₹{product.mrp.toLocaleString()}</span>
                    )}
                    {discountPercent > 0 && (
                        <span className="ml-auto bg-[#FFF3E8] text-[#B8935A] text-[11px] font-dm px-2 py-0.5 rounded">
                            {discountPercent}% OFF
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
