"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
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
    originalPrice?: number;
}

interface ProductCardProps {
    product: ProductProps;
    variant: "premium" | "everyday";
}

export default function ProductCard({ product, variant }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`group bg-white border border-[#E8E0D5] rounded-2xl overflow-hidden cursor-pointer relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(0,0,0,0.1)] animate-shimmer ${variant === "premium" ? "hover:border-gold" : "hover:border-[#003926]"
                }`}
        >
            {/* Shimmer sweep effect is handled by animate-shimmer class in globals.css */}

            {/* Image Area */}
            <div className="h-[320px] bg-[#F9F7F5] flex items-center justify-center p-8 overflow-hidden relative">
                <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                    />
                </motion.div>

                {/* Badge */}
                {product.badge && (
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded text-[9px] font-body tracking-[0.15em] uppercase text-white shadow-sm ${product.badge === "Limited" ? "bg-gold" : product.badge === "Value Pick" ? "bg-[#003926]" : "bg-primaryText"
                        }`}>
                        {product.badge}
                    </div>
                )}

                {/* Wishlist */}
                <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-primaryText hover:bg-white hover:text-red-500 transition-all duration-300 shadow-sm">
                    <Heart size={18} />
                </button>

                {/* Quick View Overlay */}
                <div className="absolute bottom-0 left-0 w-full h-[52px] bg-primaryText/90 backdrop-blur-sm flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-white text-[11px] font-body tracking-[0.2em] uppercase font-medium">Quick View</span>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 relative z-10 bg-white">
                <p className={`text-[9px] font-body tracking-[0.25em] uppercase mb-1.5 ${variant === "premium" ? "text-gold" : "text-[#003926]"
                    }`}>
                    {product.brand}
                </p>
                <h3 className="font-body font-medium text-[17px] text-primaryText mb-2.5 truncate">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < 4 ? "fill-gold text-gold" : "fill-border text-border"} />
                    ))}
                    <span className="text-[11px] text-lightText ml-1.5">(24)</span>
                </div>

                <div className="flex items-end justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <span className="font-heading text-2xl text-gold italic">
                            ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                            <span className="font-body text-xs text-lightText line-through">
                                ₹{product.originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>
                    {variant === "everyday" && product.price < 1500 && (
                        <span className="text-[10px] text-[#003926] font-body italic underline decoration-gold/30 underline-offset-4">Value Choice</span>
                    )}
                </div>

                {/* Add to Cart */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, product.brand);
                    }}
                    className={`w-full h-[46px] rounded-xl flex items-center justify-center gap-2 text-white font-body text-[13px] tracking-widest uppercase transition-all duration-300 overflow-hidden relative group/btn ${variant === "premium" ? "bg-primaryText hover:bg-gold" : "bg-[#003926] hover:bg-gold"
                        }`}
                >
                    <ShoppingBag size={16} />
                    Add to Cart
                </button>
            </div>
        </motion.div>
    );
}
