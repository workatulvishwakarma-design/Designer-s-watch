"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
    const { 
        items, 
        removeItem, 
        updateQuantity, 
        isOpen, 
        setIsOpen, 
        getSubtotal 
    } = useCartStore();

    const subtotal = getSubtotal();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white z-[160] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-[#E8E0D5] flex items-center justify-between">
                            <h2 className="font-display text-2xl text-[#1A1918]">Your Cart</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-[#FAF8F4] rounded-full transition-colors"
                            >
                                <X size={20} className="text-[#1A1918]" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <ShoppingBag size={48} className="text-[#B8935A] stroke-[1px] opacity-30" />
                                    <p className="font-body text-[#9C9690]">Your cart is empty.</p>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-[#B8935A] text-xs tracking-widest uppercase border-b border-[#B8935A] pb-0.5 font-body"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.productId} className="flex gap-4">
                                        <div className="relative w-24 h-24 bg-[#F5F2ED] rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image || "https://picsum.photos/200"}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-2 mix-blend-multiply"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <div>
                                                    <h3 className="font-body font-medium text-[#1A1918] text-sm truncate leading-snug pr-4">
                                                        {item.name}
                                                    </h3>
                                                    {item.variant && (
                                                        <p className="text-[10px] text-[#9C9690] mt-0.5 uppercase tracking-wider">
                                                            {item.variant.color && <span>{item.variant.color}</span>}
                                                            {item.variant.color && item.variant.size && <span> • </span>}
                                                            {item.variant.size && <span>{item.variant.size}</span>}
                                                        </p>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-[#9C9690] hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-1 border border-[#E8E0D5] rounded-full p-1 bg-[#FAF8F4]">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 px-2 hover:text-[#B8935A] transition-colors"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="w-6 text-center text-xs font-dm font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 px-2 hover:text-[#B8935A] transition-colors"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <span className="font-display text-lg text-[#B8935A]">
                                                    ₹{item.price.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-8 border-t border-[#E8E0D5] bg-[#FAF8F4]/50 space-y-6">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between font-body text-sm">
                                        <span className="text-[#9C9690]">Subtotal</span>
                                        <span className="text-[#1A1918]">₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-display text-lg text-[#1A1918]">Total Estimate</span>
                                        <span className="font-display text-xl text-[#B8935A]">
                                            ₹{subtotal.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Link 
                                        href="/cart"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full flex items-center justify-center p-4 border border-[#E8E0D5] text-[#1A1918] rounded-full font-body text-xs tracking-widest uppercase hover:bg-white transition-all duration-300"
                                    >
                                        View Full Cart
                                    </Link>
                                    <Link 
                                        href="/checkout"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full h-14 bg-[#1A1918] text-white rounded-full font-body text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#B8935A] transition-all duration-500 shadow-lg shadow-black/5 group"
                                    >
                                        Checkout Now
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                                <p className="text-[10px] text-[#9C9690] text-center uppercase tracking-widest font-body">
                                    Complimentary shipping above ₹5,000
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
