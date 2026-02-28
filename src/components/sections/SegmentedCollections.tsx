"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  brand: string;
  tags: string[];
}

interface SegmentedCollectionsProps {
  brand: "dsigner" | "escort";
  products: Product[];
}

export default function SegmentedCollections({
  brand,
  products,
}: SegmentedCollectionsProps) {
  const [activeTab, setActiveTab] = useState("best-selling");

  const dsignerTabs = [
    { id: "best-selling", label: "🔥 Best Selling" },
    { id: "new-arrivals", label: "✨ New Arrivals" },
    { id: "premium", label: "💎 Premium" },
    { id: "classic", label: "⌚ Classic" },
    { id: "limited", label: "🏆 Limited" },
  ];

  const escortTabs = [
    { id: "best-selling", label: "🔥 Best Selling" },
    { id: "new-arrivals", label: "✨ New Arrivals" },
    { id: "best-value", label: "💰 Best Value" },
    { id: "sport", label: "🏃 Sport" },
    { id: "everyday", label: "⌚ Everyday" },
  ];

  const tabs = brand === "dsigner" ? dsignerTabs : escortTabs;

  const filteredProducts = products.filter(
    (p) => activeTab === "all" || p.tags?.includes(activeTab)
  );

  return (
    <div className="bg-[#FAF8F4] py-20 md:py-28 lg:py-32 w-full">
      {/* Sticky Tab Navigation */}
      <div className="sticky top-20 z-40 bg-rgba(250,248,244,0.95) backdrop-blur-md border-b border-[#EDE8DF]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 md:gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm md:text-base font-dm whitespace-nowrap transition-all duration-300 border-b-2 ${
                  activeTab === tab.id
                    ? "text-[#B8935A] border-b-[#B8935A] font-medium"
                    : "text-[#6B6560] border-b-transparent hover:text-[#1A1918] hover:bg-[rgba(184,147,90,0.05)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 py-2 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#B8935A]/20 to-transparent" />
        <span className="text-[#B8935A] text-[10px]">✦</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#B8935A]/20 to-transparent" />
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="relative"
                >
                  {/* Rank watermark */}
                  <div className="absolute top-4 left-4 text-6xl font-bebas text-[rgba(184,147,90,0.07)] pointer-events-none z-0">
                    #{index + 1}
                  </div>

                  {/* Card placeholder - would use actual ProductCard component */}
                  <div className="relative z-10 bg-white border border-[#EDE8DF] rounded-3xl overflow-hidden cursor-pointer group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.1)] hover:border-[rgba(184,147,90,0.45)]">
                    {/* Image Area */}
                    <div className="h-[300px] bg-[#F7F4EF] flex items-center justify-center p-6 overflow-hidden relative">
                      <div className="relative w-full h-full">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-600"
                        />

                        {/* Blur Glass Overlay on Hover */}
                        <div className="absolute inset-0 bg-[rgba(250,248,244,0.6)] backdrop-blur-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-3 pointer-events-none">
                          <button className="bg-[#1A1918] text-white px-6 py-3 rounded-full text-xs font-dm tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-50">
                            Add to Cart
                          </button>
                          <button className="bg-white/80 text-[#1A1918] border border-[#E0D8CE] px-6 py-3 rounded-full text-xs font-dm tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-100">
                            Quick View
                          </button>
                        </div>

                        {/* Shimmer Sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6">
                      <p className="text-[#B8935A] text-[9px] font-dm tracking-[0.25em] uppercase mb-2">
                        {brand === "dsigner" ? "D'SIGNER" : "ESCORT"}
                      </p>
                      <h3 className="font-dm font-500 text-[16px] text-[#1A1918] mb-2 truncate hover:text-[#B8935A] transition-colors duration-300">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${
                              i < 4 ? "text-[#B8935A]" : "text-[#E0D8CE]"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="text-[10px] text-[#9C9690] ml-2">(24)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-3">
                        <span className="font-cormorant italic text-2xl text-[#B8935A]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <span className="font-dm text-xs text-[#9C9690] line-through">
                          ₹{Math.round(product.price * 1.25).toLocaleString("en-IN")}
                        </span>
                        <span className="ml-auto bg-[#FFF3E8] text-[#B8935A] text-[10px] font-dm px-2 py-1 rounded">
                          20% OFF
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-[#6B6560] font-dm">
                  No products found in this category
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
