"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { toast } from "sonner";

export interface QuickViewProduct {
  id: string | number;
  name: string;
  brand: string;
  price: number;
  mrp?: number;
  image: string;
  hoverImage?: string;
  category?: string;
  badge?: string | null;
  slug: string;
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

interface QuickViewModalProps {
  product: QuickViewProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem } = useCartStore();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!product) return null;

  const discountPercent = product.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.slug,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      slug: product.slug,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A1918]/70 backdrop-blur-md z-[99999]"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl max-h-[85vh] sm:max-h-[88vh] bg-white rounded-3xl border border-[#EDE8DF] shadow-[0_30px_90px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col z-[100000] my-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-[#EDE8DF] text-[#1A1918] flex items-center justify-center hover:bg-[#1A1918] hover:text-white hover:border-[#1A1918] transition-colors duration-200 z-30 shadow-md cursor-pointer"
              aria-label="Close Quick View"
            >
              <X size={18} />
            </button>

            {/* Scrollable Content Container */}
            <div className="overflow-y-auto max-h-[85vh] sm:max-h-[88vh] p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-10 items-center">
                
                {/* ── LEFT: Large Watch Visual ── */}
                <div className="md:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative w-full aspect-[4/5] max-h-[380px] md:max-h-none bg-[#F7F4EF] rounded-2xl border border-[#EDE8DF] flex items-center justify-center p-6 overflow-hidden group">
                    {/* Badge if available */}
                    {product.badge && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-[#1A1918] text-white rounded-full text-[9px] font-dm tracking-[0.15em] uppercase z-10">
                        {product.badge}
                      </div>
                    )}
                    {discountPercent > 0 && (
                      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[9px] font-dm bg-[#D4455A] text-white z-10 font-semibold shadow-sm">
                        {discountPercent}% OFF
                      </div>
                    )}

                    {/* Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        if (product.hoverImage && (e.target as HTMLImageElement).src !== product.hoverImage) {
                          (e.target as HTMLImageElement).src = product.hoverImage;
                        }
                      }}
                    />
                  </div>
                </div>

                {/* ── RIGHT: Product Details & Actions ── */}
                <div className="md:col-span-7 flex flex-col text-left">
                  {/* Brand & Category */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#B8935A] text-[10px] md:text-[11px] font-dm tracking-[0.25em] uppercase font-bold">
                      {product.brand}
                    </span>
                    {product.category && (
                      <>
                        <span className="text-[#EDE8DF]">•</span>
                        <span className="text-[#9C9690] text-[10px] md:text-[11px] font-dm tracking-[0.15em] uppercase">
                          {product.category}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Model Name */}
                  <h2 className="font-dm font-semibold text-xl sm:text-2xl md:text-3xl text-[#1A1918] mb-2 sm:mb-3 tracking-tight">
                    {product.name}
                  </h2>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-3 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-[#EDE8DF]">
                    <span className="font-cormorant italic text-2xl sm:text-3xl md:text-4xl text-[#B8935A] font-bold">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.mrp && product.mrp > product.price && (
                      <span className="font-dm text-sm sm:text-base line-through text-[#9C9690]">
                        ₹{product.mrp.toLocaleString()}
                      </span>
                    )}
                    {discountPercent > 0 && (
                      <span className="bg-[#003926]/10 text-[#003926] text-[11px] font-dm font-semibold px-2.5 py-0.5 rounded-full">
                        Save {discountPercent}%
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {product.description && (
                    <p className="font-dm text-[13px] sm:text-[14px] leading-relaxed text-[#1A1918]/70 mb-4 sm:mb-5 line-clamp-3">
                      {product.description}
                    </p>
                  )}

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-4 sm:mb-5 bg-[#FAF8F4] p-3.5 sm:p-4 rounded-xl border border-[#EDE8DF]">
                    {product.specs?.movement && (
                      <div>
                        <span className="text-[10px] font-dm text-[#9C9690] uppercase tracking-wider block">Movement</span>
                        <span className="text-[12px] font-dm font-medium text-[#1A1918]">{product.specs.movement}</span>
                      </div>
                    )}
                    {product.specs?.caseMaterial && (
                      <div>
                        <span className="text-[10px] font-dm text-[#9C9690] uppercase tracking-wider block">Case Material</span>
                        <span className="text-[12px] font-dm font-medium text-[#1A1918]">{product.specs.caseMaterial}</span>
                      </div>
                    )}
                    {product.specs?.waterResistance && (
                      <div>
                        <span className="text-[10px] font-dm text-[#9C9690] uppercase tracking-wider block">Water Resistance</span>
                        <span className="text-[12px] font-dm font-medium text-[#1A1918]">{product.specs.waterResistance}</span>
                      </div>
                    )}
                    {product.specs?.glass && (
                      <div>
                        <span className="text-[10px] font-dm text-[#9C9690] uppercase tracking-wider block">Glass Material</span>
                        <span className="text-[12px] font-dm font-medium text-[#1A1918]">{product.specs.glass}</span>
                      </div>
                    )}
                    {product.dialColor && (
                      <div>
                        <span className="text-[10px] font-dm text-[#9C9690] uppercase tracking-wider block">Dial Color</span>
                        <span className="text-[12px] font-dm font-medium text-[#1A1918]">{product.dialColor}</span>
                      </div>
                    )}
                    {product.strapColor && (
                      <div>
                        <span className="text-[10px] font-dm text-[#9C9690] uppercase tracking-wider block">Strap Color</span>
                        <span className="text-[12px] font-dm font-medium text-[#1A1918]">{product.strapColor}</span>
                      </div>
                    )}
                  </div>

                  {/* Trust Badges */}
                  <div className="flex items-center gap-4 text-[11px] font-dm text-[#1A1918]/70 mb-5">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-[#003926]" />
                      <span>100% Original</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-[#003926]" />
                      <span>{product.specs?.warranty || "2 Years Warranty"}</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-dm text-[12px] font-bold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-[0_8px_20px_rgba(0,57,38,0.25)] hover:-translate-y-0.5 cursor-pointer"
                      style={{ background: "#003926", color: "#FFFFFF" }}
                    >
                      <ShoppingBag size={15} />
                      Add to Cart
                    </button>

                    <Link
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-[#1A1918]/20 text-[#1A1918] rounded-full font-dm text-[12px] font-bold tracking-widest uppercase hover:border-[#003926] hover:bg-[#003926]/5 transition-all duration-300 cursor-pointer text-center"
                    >
                      View Full Details
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
