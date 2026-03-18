"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, ChevronRight, Shield, Droplets, Diamond, Watch, Star, ArrowLeft } from "lucide-react";
import SmoothScrolling from "@/components/SmoothScrolling";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { WishlistToggleButton } from "@/components/ui/WishlistToggleButton";
import { ProductReviewForm } from "@/components/ui/ProductReviewForm";
import { getProductBySlug, getRelatedProducts, type Product } from "@/data/productData";

/* ─── Spec icon helper ─── */
const specIcons: Record<string, React.ReactNode> = {
  movement: <Watch size={20} />,
  strap: <Diamond size={20} />,
  waterResistance: <Droplets size={20} />,
  caseMaterial: <Shield size={20} />,
  glass: <Star size={20} />,
  warranty: <Shield size={20} />,
};
const specLabels: Record<string, string> = {
  movement: "Movement",
  strap: "Strap",
  waterResistance: "Water Resistance",
  caseMaterial: "Case Material",
  glass: "Glass",
  warranty: "Warranty",
};

/* ─── Feature highlights ─── */
const features = [
  { icon: <Diamond size={28} />, title: "Premium Finish", desc: "Hand-polished stainless steel case with refined detailing" },
  { icon: <Watch size={28} />, title: "Precision Movement", desc: "Japanese quartz movement engineered for accuracy" },
  { icon: <Star size={28} />, title: "Sapphire Clarity", desc: "Scratch-resistant glass for lasting brilliance" },
  { icon: <Droplets size={28} />, title: "Water Resistant", desc: "Designed to withstand everyday water exposure" },
];

/* ═══════════════════════════════════════
   PRODUCT DETAILS PAGE
   ═══════════════════════════════════════ */
export default function ProductPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <>
        <SmoothScrolling>
          <main className="min-h-screen bg-[#FAF8F4] flex items-center justify-center">
            <div className="text-center px-6">
              <h1 className="font-cormorant text-5xl text-[#1A1918] mb-4">Product Not Found</h1>
              <p className="font-dm text-[#6B6560] mb-8">The timepiece you're looking for doesn't exist.</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#003926] text-white px-8 py-3 rounded-full font-dm text-sm tracking-wider hover:bg-[#002A1B] transition-colors"
              >
                <ArrowLeft size={16} /> Return Home
              </Link>
            </div>
          </main>
        </SmoothScrolling>
      </>
    );
  }

  return (
    <>
      <SmoothScrolling>
        <main className="bg-[#FAF8F4] min-h-screen">
          <ProductHero product={product} />
          <SpecsSection product={product} />
          <FeaturesSection />
          <ReviewsSection product={product} />
          <RelatedSection product={product} />
        </main>
      </SmoothScrolling>
    </>
  );
}

/* ═══════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════ */
function ProductHero({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);

  const mainImage = product.colors[selectedColor]?.image || product.images[selectedImage] || product.images[0];

  const discount = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <section className="relative pt-36 lg:pt-40 pb-16 lg:pb-24">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(184,147,90,0.06)_0%,transparent_70%)] rounded-full pointer-events-none -translate-y-1/3 translate-x-1/4" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] font-dm text-[#9C9690] mb-8">
          <Link href="/" className="hover:text-[#B8935A] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href={`/collections/${product.brand === "D'SIGNER" ? "dsigner" : "escort"}`} className="hover:text-[#B8935A] transition-colors">
            {product.brand}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#1A1918]">{product.name}</span>
        </nav>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* ── LEFT: Product Info ── */}
          <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Brand label */}
              <span className="inline-block bg-[#003926]/10 text-[#003926] px-4 py-1.5 rounded-full font-dm text-[10px] tracking-[0.2em] uppercase mb-4">
                {product.brand} • {product.category}
              </span>

              {/* Title */}
              <h1 className="font-cormorant text-4xl md:text-5xl lg:text-[56px] text-[#1A1918] font-light leading-[1.05] mb-3">
                {product.brand}{" "}
                <span className="font-semibold">{product.name}</span>
              </h1>

              {/* Badge */}
              {product.badge && (
                <span className="inline-block bg-[#1A1918] text-white px-3 py-1 rounded-full font-dm text-[9px] tracking-[0.15em] uppercase mb-4">
                  {product.badge}
                </span>
              )}

              {/* Description */}
              <p className="font-dm text-[14px] md:text-[15px] text-[#6B6560] leading-relaxed mb-6 max-w-[400px]">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-cormorant italic text-[36px] text-[#B8935A]">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.mrp && (
                  <>
                    <span className="font-dm text-[15px] line-through text-[#9C9690]">
                      ₹{product.mrp.toLocaleString()}
                    </span>
                    <span className="bg-[#FFF3E8] text-[#B8935A] text-[11px] font-dm px-2.5 py-1 rounded-full">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Size Selector */}
              {product.sizes.length > 0 && (
                <div className="mb-6">
                  <p className="font-dm text-[11px] tracking-[0.15em] uppercase text-[#9C9690] mb-3">Case Size</p>
                  <div className="flex gap-2.5">
                    {product.sizes.map((size, i) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(i)}
                        className="font-dm text-[13px] px-4 py-2.5 rounded-full border transition-all duration-300"
                        style={{
                          background: selectedSize === i ? "#003926" : "white",
                          color: selectedSize === i ? "white" : "#1A1918",
                          borderColor: selectedSize === i ? "#003926" : "#EDE8DF",
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                 <AddToCartButton 
                    product={{ id: String(product.id), name: product.name, price: Number(product.price), image: product.images[0], slug: String(product.slug || product.id) }}
                    selectedVariant={{
                      color: product.colors[selectedColor]?.name,
                      size: product.sizes[selectedSize]
                    }}
                    variant="primary"
                    className="flex-1 py-4 rounded-full font-dm text-[13px] tracking-[0.1em] transition-all duration-400"
                 />
                 <div className="flex justify-center items-center w-[60px] h-[55px] border border-[#EDE8DF] rounded-full">
                    <WishlistToggleButton 
                       product={{ id: String(product.id), name: product.name, price: Number(product.price), image: product.images[0], slug: String(product.slug || product.id) }}
                       className="w-full h-full flex items-center justify-center p-0 hover:bg-transparent"
                    />
                 </div>
              </div>
            </motion.div>
          </div>

          {/* ── CENTER: Main Image ── */}
          <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[560px] aspect-[4/5] lg:aspect-square overflow-hidden rounded-[32px]"
            >
              {/* Stage background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#F7F4EF] to-[#EDE8DF] shadow-[0_30px_80px_rgba(0,0,0,0.08)]" />

              {/* Main Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={mainImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center p-10 md:p-12"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={mainImage}
                      alt={product.name}
                      fill
                      className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                      sizes="(max-width: 768px) 90vw, 560px"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Subtle reflection */}
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-[60px] rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse, rgba(0,0,0,0.06) 0%, transparent 70%)",
                }}
              />
            </motion.div>
          </div>

          {/* ── RIGHT: Options ── */}
          <div className="lg:col-span-3 flex flex-col justify-center order-3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Color Selector */}
              {product.colors.length > 1 && (
                <div>
                  <p className="font-dm text-[11px] tracking-[0.15em] uppercase text-[#9C9690] mb-3">
                    Color{selectedColor >= 0 && product.colors[selectedColor] ? <> — <span className="text-[#1A1918] font-medium">{product.colors[selectedColor].name}</span></> : null}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color, i) => (
                      <button
                        key={color.name}
                        onClick={() => { setSelectedColor(i); setSelectedImage(0); }}
                        className="relative w-10 h-10 rounded-full transition-all duration-300"
                        style={{
                          background: color.hex,
                          boxShadow: selectedColor === i
                            ? `0 0 0 3px #FAF8F4, 0 0 0 5px ${color.hex}`
                            : "0 2px 8px rgba(0,0,0,0.1)",
                          transform: selectedColor === i ? "scale(1.15)" : "scale(1)",
                        }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Thumbnail Gallery */}
              <div>
                <p className="font-dm text-[11px] tracking-[0.15em] uppercase text-[#9C9690] mb-3">Product Views</p>
                <div className="grid grid-cols-4 gap-2.5">
                  {product.images.slice(0, 4).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedImage(i); setSelectedColor(-1); }}
                      className="relative aspect-square rounded-xl overflow-hidden transition-all duration-300"
                      style={{
                        border: selectedImage === i && selectedColor === -1 ? "2px solid #003926" : "2px solid #EDE8DF",
                        background: "#F7F4EF",
                      }}
                    >
                      <Image
                        src={img}
                        alt={`View ${i + 1}`}
                        fill
                        className="object-contain p-1.5"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Specs Preview */}
              <div className="bg-white rounded-2xl border border-[#EDE8DF] p-5">
                <p className="font-dm text-[11px] tracking-[0.15em] uppercase text-[#9C9690] mb-3">Quick Specs</p>
                <div className="space-y-2.5">
                  {(["movement", "strap", "glass"] as const).map((key) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="font-dm text-[12px] text-[#9C9690]">{specLabels[key]}</span>
                      <span className="font-dm text-[12px] text-[#1A1918] font-medium">{product.specs[key]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SPECS SECTION
   ═══════════════════════════════════════ */
function SpecsSection({ product }: { product: Product }) {
  const specsEntries = Object.entries(product.specs) as [keyof typeof specLabels, string][];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#B8935A] mb-2">SPECIFICATIONS</p>
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#1A1918] font-light">
            Technical Details
          </h2>
          <div className="w-10 h-[0.5px] bg-[#B8935A] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {specsEntries.map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#FAF8F4] rounded-2xl p-6 text-center border border-[#EDE8DF] hover:border-[#B8935A]/30 transition-colors duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#003926]/5 text-[#003926] mb-3 group-hover:bg-[#003926]/10 transition-colors">
                {specIcons[key]}
              </div>
              <p className="font-dm text-[10px] tracking-[0.15em] uppercase text-[#9C9690] mb-1">{specLabels[key]}</p>
              <p className="font-dm text-[15px] text-[#1A1918] font-medium">{value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   FEATURES SECTION
   ═══════════════════════════════════════ */
function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#FAF8F4]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#B8935A] mb-2">CRAFTSMANSHIP</p>
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#1A1918] font-light">
            Why Choose This Timepiece
          </h2>
          <div className="w-10 h-[0.5px] bg-[#B8935A] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white border border-[#EDE8DF] hover:border-[#B8935A]/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-400 group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#003926]/5 text-[#003926] mb-4 group-hover:bg-[#003926] group-hover:text-white transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="font-dm text-[14px] font-medium text-[#1A1918] mb-2">{f.title}</h3>
              <p className="font-dm text-[12px] text-[#9C9690] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   RELATED PRODUCTS
   ═══════════════════════════════════════ */
function RelatedSection({ product }: { product: Product }) {
  const related = useMemo(() => getRelatedProducts(product, 4), [product]);

  if (related.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#B8935A] mb-2">YOU MAY ALSO LIKE</p>
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#1A1918] font-light">
            Related Timepieces
          </h2>
          <div className="w-10 h-[0.5px] bg-[#B8935A] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((p, i) => (
            <Link key={p.slug} href={`/product/${p.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-[#FAF8F4] rounded-2xl overflow-hidden border border-[#EDE8DF] hover:border-[#B8935A]/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-square bg-[#F7F4EF] flex items-center justify-center p-6 overflow-hidden">
                  <div className="relative w-full h-full group-hover:scale-[1.06] transition-transform duration-600">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 280px"
                    />
                  </div>
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-[#1A1918] text-white px-2.5 py-1 rounded-full text-[9px] font-dm tracking-[0.1em] uppercase">
                      {p.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="font-dm text-[9px] tracking-[0.2em] uppercase text-[#B8935A] mb-1">{p.brand}</p>
                  <p className="font-dm text-[14px] font-medium text-[#1A1918] mb-2 group-hover:text-[#B8935A] transition-colors">{p.name}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-cormorant italic text-[20px] text-[#B8935A]">₹{p.price.toLocaleString()}</span>
                    {p.mrp && (
                      <span className="font-dm text-[12px] line-through text-[#9C9690]">₹{p.mrp.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   REVIEWS SECTION
   ═══════════════════════════════════════ */
function ReviewsSection({ product }: { product: Product }) {
  return (
    <section className="py-16 lg:py-24 bg-[#FAF8F4] border-t border-[#EDE8DF]">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#B8935A] mb-2">CUSTOMER REVIEWS</p>
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#1A1918] font-light">
            Share Your Experience
          </h2>
          <div className="w-10 h-[0.5px] bg-[#B8935A] mx-auto mt-4" />
        </div>
        <ProductReviewForm productId={String(product.id)} />
      </div>
    </section>
  );
}
