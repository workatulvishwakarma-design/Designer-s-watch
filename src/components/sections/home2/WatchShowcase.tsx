"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/store/cart";
import { allModelFamilies } from "@/data/productData";

export default function WatchShowcase() {
  const { addItem, setIsOpen } = useCartStore();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  // Take top 8 featured watch families
  const featuredProducts = allModelFamilies.slice(0, 8);

  const handleQuickAdd = (product: typeof featuredProducts[0]) => {
    const mainImage = product.variants[0]?.gallery?.primary || "/images/new-content/home2-showcase.png";
    const price = product.priceRange?.min || 14999;

    addItem({
      productId: product.slug,
      name: product.name,
      price: price,
      quantity: 1,
      image: mainImage,
      slug: product.slug,
    });

    setAddedSlug(product.slug);
    setIsOpen(true);

    setTimeout(() => {
      setAddedSlug(null);
    }, 1800);
  };

  return (
    <section id="featured-products" className="w-full py-16 md:py-24 bg-[#FAF8F4] select-none">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header - Miraggio H2 Spec: Desktop 40px, Mobile 26px, Line Height 120%, Letter Spacing -0.01em, Weight 500 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#003926]/10 pb-6">
          <div>
            <span className="font-montserrat text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-[#003926] font-semibold block mb-2">
              CURATED TIMEPIECES
            </span>
            <h2 className="font-montserrat text-[26px] md:text-[40px] font-medium leading-[1.2] tracking-[-0.01em] text-[#1A1918]">
              Flagship Collection
            </h2>
          </div>
          <Link
            href="/collections/dsigner"
            className="font-montserrat text-[13px] md:text-[14px] font-medium tracking-[0.04em] uppercase text-[#003926] hover:text-[#B8935A] transition-colors mt-4 md:mt-0 inline-flex items-center gap-2"
          >
            <span>View All Models</span>
            <span>→</span>
          </Link>
        </div>

        {/* Product Grid - 4 Columns Desktop, 2 Columns Mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map((product, idx) => {
            const imageSrc = product.variants[0]?.gallery?.primary || "/images/new-content/home2-showcase.png";
            const formattedPrice = `₹${(product.priceRange?.min || 14999).toLocaleString("en-IN")}`;
            const isAdded = addedSlug === product.slug;

            return (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative flex flex-col justify-between bg-white border border-[#E0D8CE]/60 hover:border-[#003926]/40 rounded-sm p-4 md:p-6 transition-all duration-300 hover:shadow-xl"
              >
                {/* Image Container - Pure Clean White Photo */}
                <div className="relative w-full aspect-square bg-white flex items-center justify-center overflow-hidden mb-5">
                  <Link href={`/product/${product.slug}`} className="relative w-full h-full block">
                    <Image
                      src={imageSrc}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* + Quick Add To Cart Button */}
                  <button
                    onClick={() => handleQuickAdd(product)}
                    aria-label={`Add ${product.name} to cart`}
                    className={`absolute bottom-3 right-3 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                      isAdded
                        ? "bg-[#003926] text-white"
                        : "bg-white text-[#003926] border border-[#003926]/20 hover:bg-[#003926] hover:text-white hover:border-[#003926]"
                    }`}
                  >
                    {isAdded ? (
                      <Check size={18} strokeWidth={2.5} />
                    ) : (
                      <Plus size={20} strokeWidth={2} />
                    )}
                  </button>
                </div>

                {/* Product Info - Miraggio Specs: Title Desktop 18px / Mobile 16px, Price 20px / 18px */}
                <div>
                  <span className="font-montserrat text-[10px] md:text-[11px] uppercase tracking-[0.12em] text-[#5C5750] block mb-1">
                    {product.brand || "D'Signer"}
                  </span>
                  <Link href={`/product/${product.slug}`} className="block">
                    <h3 className="font-montserrat text-[16px] md:text-[18px] font-medium leading-[1.3] text-[#1A1918] group-hover:text-[#003926] transition-colors line-clamp-1 mb-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-montserrat text-[18px] md:text-[20px] font-medium text-[#003926]">
                    {formattedPrice}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
