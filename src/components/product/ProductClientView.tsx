"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, Shield, Droplets, Diamond, Watch, Star, ArrowLeft,
  MapPin, Truck, Package, ShieldCheck, CreditCard, Eye, Flame, Check,
  Clock, RefreshCw, Award, Heart
} from "lucide-react";
import SmoothScrolling from "@/components/SmoothScrolling";
import { useCartStore } from "@/lib/store/cart";
import { toast } from "sonner";

/* ─── Spec icon helper ─── */
const specIcons: Record<string, React.ReactNode> = {
  movement: <Watch size={20} />,
  strap: <Diamond size={20} />,
  waterResistance: <Droplets size={20} />,
  caseMaterial: <Shield size={20} />,
  caseSize: <Watch size={20} />,
  glass: <Star size={20} />,
  warranty: <ShieldCheck size={20} />,
};

const specLabels: Record<string, string> = {
  movement: "Movement",
  strap: "Strap",
  waterResistance: "Water Resistance",
  caseMaterial: "Case Material",
  caseSize: "Case Size",
  glass: "Glass",
  warranty: "Warranty",
};

const features = [
  { icon: <Diamond size={28} />, title: "Premium Finish", desc: "Hand-polished stainless steel case with refined detailing" },
  { icon: <Watch size={28} />, title: "Precision Movement", desc: "Japanese quartz movement engineered for accuracy" },
  { icon: <Star size={28} />, title: "Sapphire Clarity", desc: "Scratch-resistant glass for lasting brilliance" },
  { icon: <Droplets size={28} />, title: "Water Resistant", desc: "Designed to withstand everyday water exposure" },
];

export default function ProductClientView({ product, relatedProducts }: { product: any, relatedProducts: any[] }) {
  if (!product) {
    return (
      <SmoothScrolling>
        <main className="min-h-screen bg-[#FAF8F4] flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="font-cormorant text-5xl text-[#1A1918] mb-4">Product Not Found</h1>
            <p className="font-dm text-[#6B6560] mb-8">The timepiece you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#003926] text-white px-8 py-3 rounded-full font-dm text-sm tracking-wider hover:bg-[#002A1B] transition-colors"
            >
              <ArrowLeft size={16} /> Return Home
            </Link>
          </div>
        </main>
      </SmoothScrolling>
    );
  }

  return (
    <SmoothScrolling>
      <main className="bg-[#FAF8F4] min-h-screen">
        <ProductHero product={product} />
        <TrustBanner />
        <DeliverySection product={product} />
        <SpecsSection product={product} />
        <FeaturesSection />
        <ReviewsSection product={product} />
        <RelatedSection product={product} related={relatedProducts} />
      </main>
    </SmoothScrolling>
  );
}

/* ═══════════════════════════════════════════
   PRODUCT HERO — Main product view
   ═══════════════════════════════════════════ */
function ProductHero({ product }: { product: any }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const colors = product.colors || [];
  const images = product.images || ["/images/main-img1.png"];
  const sizes = product.sizes || [];
  const mainImage = colors[selectedColor]?.image || images[selectedImage] || images[0];
  const discount = product.mrp && product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;
  const isLowStock = product.stock > 0 && product.stock <= (product.lowStockThreshold || 5);
  const isInStock = product.stock > 0;

  // Simulated social proof
  const viewerCount = useMemo(() => Math.floor(Math.random() * 30) + 12, []);

  return (
    <section className="relative pt-36 lg:pt-40 pb-16 lg:pb-24">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(184,147,90,0.06)_0%,transparent_70%)] rounded-full pointer-events-none -translate-y-1/3 translate-x-1/4" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] font-dm text-[#9C9690] mb-8">
          <Link href="/" className="hover:text-[#B8935A] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href={`/collections/${product.brand === "ESCORT" ? "escort" : "dsigner"}`} className="hover:text-[#B8935A] transition-colors">
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
                {product.brand || "D'SIGNER"} • {product.category || "Watches"}
              </span>

              {/* Title */}
              <h1 className="font-cormorant text-4xl md:text-5xl lg:text-[56px] text-[#1A1918] font-light leading-[1.05] mb-3">
                <span className="font-semibold">{product.name}</span>
              </h1>

              {/* Badge */}
              {product.badge && (
                <span className="inline-block bg-[#1A1918] text-white px-3 py-1 rounded-full font-dm text-[9px] tracking-[0.15em] uppercase mb-4">
                  {product.badge}
                </span>
              )}

              {/* Social proof */}
              <div className="flex items-center gap-2 mb-4">
                <Eye size={14} className="text-[#B8935A]" />
                <span className="font-dm text-[12px] text-[#9C9690]">
                  {viewerCount} people viewing this right now
                </span>
              </div>

              {/* Description */}
              <div
                className="font-dm text-[14px] md:text-[15px] text-[#6B6560] leading-relaxed mb-6 max-w-[400px]"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-cormorant italic text-[36px] text-[#B8935A]">
                  ₹{Number(product.price).toLocaleString()}
                </span>
                {product.mrp && (
                  <>
                    <span className="font-dm text-[15px] line-through text-[#9C9690]">
                      ₹{Number(product.mrp).toLocaleString()}
                    </span>
                    <span className="bg-[#FFF3E8] text-[#B8935A] text-[11px] font-dm px-2.5 py-1 rounded-full">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Stock status */}
              <div className="mb-6">
                {isInStock ? (
                  <div className="flex items-center gap-2">
                    {isLowStock ? (
                      <>
                        <Flame size={14} className="text-[#D4455A]" />
                        <span className="font-dm text-[12px] text-[#D4455A] font-medium">
                          Only {product.stock} left — selling fast!
                        </span>
                      </>
                    ) : (
                      <>
                        <Check size={14} className="text-[#003926]" />
                        <span className="font-dm text-[12px] text-[#003926]">In Stock</span>
                      </>
                    )}
                  </div>
                ) : (
                  <span className="font-dm text-[12px] text-[#D4455A]">Out of Stock</span>
                )}
              </div>

              {/* Size Selector */}
              {sizes.length > 0 && (
                <div className="mb-6">
                  <p className="font-dm text-[11px] tracking-[0.15em] uppercase text-[#9C9690] mb-3">Case Size</p>
                  <div className="flex gap-2.5">
                    {sizes.map((size: string, i: number) => (
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

              {/* Quantity + Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                {/* Quantity selector */}
                <div className="flex items-center border border-[#EDE8DF] rounded-full overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-[#F5F2ED] transition-colors font-dm text-sm"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-dm text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-[#F5F2ED] transition-colors font-dm text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add to cart */}
                <button
                  disabled={!isInStock}
                  onClick={() => {
                    addItem({
                      productId: product.slug,
                      name: product.name,
                      price: Number(product.price),
                      quantity,
                      image: images[0],
                      slug: product.slug,
                      variant: {
                        color: colors[selectedColor]?.name,
                        size: sizes[selectedSize],
                      },
                    });
                    toast.success(`${product.name} added to cart`);
                  }}
                  className="flex-1 py-4 rounded-full font-dm text-[13px] tracking-[0.1em] transition-all duration-400 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: isInStock ? "#1A1918" : "#9C9690",
                    color: "white",
                  }}
                >
                  <Package size={16} />
                  {isInStock ? "ADD TO CART" : "OUT OF STOCK"}
                </button>

                {/* Wishlist button */}
                <button
                  className="flex justify-center items-center w-[55px] h-[55px] border border-[#EDE8DF] rounded-full hover:border-[#B8935A] transition-colors"
                >
                  <Heart size={18} className="text-[#9C9690]" />
                </button>
              </div>

              {/* Quick trust badges */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: <Truck size={14} />, text: "Free Delivery" },
                  { icon: <RefreshCw size={14} />, text: "7-Day Returns" },
                  { icon: <ShieldCheck size={14} />, text: "100% Genuine" },
                  { icon: <CreditCard size={14} />, text: "COD Available" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 bg-[#F7F4EF] rounded-lg px-3 py-2">
                    <span className="text-[#B8935A]">{item.icon}</span>
                    <span className="font-dm text-[10px] text-[#6B6560] tracking-wide">{item.text}</span>
                  </div>
                ))}
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
              <div className="absolute inset-0 bg-gradient-to-b from-[#F7F4EF] to-[#EDE8DF] shadow-[0_30px_80px_rgba(0,0,0,0.08)]" />

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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mainImage}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/images/main-img1.png'; }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

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
              {colors.length > 1 && (
                <div>
                  <p className="font-dm text-[11px] tracking-[0.15em] uppercase text-[#9C9690] mb-3">
                    Color{selectedColor >= 0 && colors[selectedColor] ? <> — <span className="text-[#1A1918] font-medium">{colors[selectedColor].name}</span></> : null}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color: any, i: number) => (
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
              {images.length > 1 && (
              <div>
                <p className="font-dm text-[11px] tracking-[0.15em] uppercase text-[#9C9690] mb-3">Product Views</p>
                <div className="grid grid-cols-4 gap-2.5">
                  {images.slice(0, 4).map((img: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedImage(i); setSelectedColor(-1); }}
                      className="relative aspect-square rounded-xl overflow-hidden transition-all duration-300"
                      style={{
                        border: selectedImage === i && selectedColor === -1 ? "2px solid #003926" : "2px solid #EDE8DF",
                        background: "#F7F4EF",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`View ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-contain p-1.5"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/main-img1.png'; }}
                      />
                    </button>
                  ))}
                </div>
              </div>
              )}

              {/* Quick Specs Preview */}
              <div className="bg-white rounded-2xl border border-[#EDE8DF] p-5">
                <p className="font-dm text-[11px] tracking-[0.15em] uppercase text-[#9C9690] mb-3">Quick Specs</p>
                <div className="space-y-2.5">
                  {(["movement", "strap", "glass", "warranty"] as const).map((key) => (
                    product.specs?.[key] && (
                    <div key={key} className="flex justify-between items-center">
                      <span className="font-dm text-[12px] text-[#9C9690]">{specLabels[key] || key}</span>
                      <span className="font-dm text-[12px] text-[#1A1918] font-medium">{product.specs?.[key]}</span>
                    </div>
                    )
                  ))}
                  {Object.keys(product.specs || {}).length === 0 && (
                    <p className="font-dm text-[12px] text-[#9C9690]">Premium quality materials</p>
                  )}
                </div>
              </div>

              {/* Heritage text */}
              {product.heritageText && (
                <div className="bg-[#F7F4EF] rounded-2xl border border-[#EDE8DF] p-5">
                  <p className="font-dm text-[11px] tracking-[0.15em] uppercase text-[#B8935A] mb-2">Heritage</p>
                  <p className="font-dm text-[13px] text-[#6B6560] leading-relaxed italic">{product.heritageText}</p>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TRUST BANNER
   ═══════════════════════════════════════════ */
function TrustBanner() {
  const items = [
    { icon: <Award size={20} />, title: "Genuine Products", desc: "100% authentic timepieces" },
    { icon: <Truck size={20} />, title: "Free Shipping", desc: "On orders above ₹5,000" },
    { icon: <RefreshCw size={20} />, title: "Easy Returns", desc: "7-day hassle-free returns" },
    { icon: <ShieldCheck size={20} />, title: "Secure Checkout", desc: "SSL encrypted payments" },
  ];

  return (
    <section className="bg-white border-y border-[#EDE8DF] py-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#003926]/5 flex items-center justify-center text-[#003926]">
                {item.icon}
              </div>
              <div>
                <p className="font-dm text-[13px] text-[#1A1918] font-medium">{item.title}</p>
                <p className="font-dm text-[11px] text-[#9C9690]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   DELIVERY SECTION — Pincode checker + delivery info
   ═══════════════════════════════════════════ */
function DeliverySection({ product }: { product: any }) {
  const [pincode, setPincode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState<{available: boolean; days: number; message: string} | null>(null);
  const [checking, setChecking] = useState(false);

  const checkDelivery = () => {
    if (pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }
    setChecking(true);
    // Simulate delivery check
    setTimeout(() => {
      const days = Math.floor(Math.random() * 4) + 3;
      setDeliveryResult({
        available: true,
        days,
        message: `Delivery available! Estimated ${days}-${days + 2} business days.`,
      });
      setChecking(false);
    }, 800);
  };

  return (
    <section className="py-12 bg-[#FAF8F4]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pincode Checker */}
          <div className="bg-white rounded-2xl border border-[#EDE8DF] p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={18} className="text-[#B8935A]" />
              <p className="font-dm text-[14px] font-medium text-[#1A1918]">Check Delivery Availability</p>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={pincode}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setPincode(val);
                  setDeliveryResult(null);
                }}
                placeholder="Enter pincode"
                className="flex-1 px-4 py-3 border border-[#EDE8DF] rounded-xl font-dm text-sm text-[#1A1918] bg-[#FAF8F4] focus:outline-none focus:border-[#B8935A] transition-colors"
              />
              <button
                onClick={checkDelivery}
                disabled={checking}
                className="px-6 py-3 bg-[#1A1918] text-white rounded-xl font-dm text-[12px] tracking-widest uppercase hover:bg-[#B8935A] transition-colors disabled:opacity-50"
              >
                {checking ? "..." : "Check"}
              </button>
            </div>
            {deliveryResult && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-3 flex items-center gap-2 font-dm text-[13px] ${deliveryResult.available ? "text-[#003926]" : "text-[#D4455A]"}`}
              >
                {deliveryResult.available ? <Check size={14} /> : null}
                {deliveryResult.message}
              </motion.div>
            )}
          </div>

          {/* Shipping Info */}
          <div className="bg-white rounded-2xl border border-[#EDE8DF] p-6 space-y-4">
            <p className="font-dm text-[14px] font-medium text-[#1A1918] flex items-center gap-2">
              <Truck size={18} className="text-[#B8935A]" />
              Shipping Information
            </p>
            <div className="space-y-3">
              {[
                { label: "Standard Delivery", value: "5-7 business days", sub: "Free above ₹5,000" },
                { label: "Express Delivery", value: "2-3 business days", sub: "₹149 additional" },
                { label: "Payment Options", value: "UPI, Cards, Net Banking, COD", sub: null },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-start border-b border-[#F5F2ED] pb-2.5 last:border-0">
                  <div>
                    <p className="font-dm text-[12px] text-[#6B6560]">{item.label}</p>
                    {item.sub && <p className="font-dm text-[10px] text-[#B8935A] mt-0.5">{item.sub}</p>}
                  </div>
                  <p className="font-dm text-[12px] text-[#1A1918] font-medium text-right">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SPECS SECTION
   ═══════════════════════════════════════════ */
function SpecsSection({ product }: { product: any }) {
  const specs = product.specs || {};
  const specsEntries = Object.entries(specs).filter(([k, v]) =>
    ["movement", "strap", "waterResistance", "caseMaterial", "caseSize", "glass", "warranty"].includes(k) && v
  );

  if (specsEntries.length === 0) return null;

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
                {specIcons[key] || <Shield size={20} />}
              </div>
              <p className="font-dm text-[10px] tracking-[0.15em] uppercase text-[#9C9690] mb-1">{specLabels[key] || key}</p>
              <p className="font-dm text-[15px] text-[#1A1918] font-medium">{value as string}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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

function RelatedSection({ product, related }: { product: any, related: any[] }) {
  if (!related || related.length === 0) return null;
  const { addItem } = useCartStore();

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
                <div className="relative aspect-square bg-[#F7F4EF] flex items-center justify-center p-6 overflow-hidden">
                  <div className="relative w-full h-full group-hover:scale-[1.06] transition-transform duration-600">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.images?.[0] || "/images/main-img1.png"}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/images/main-img1.png'; }}
                    />
                  </div>
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-[#1A1918] text-white px-2.5 py-1 rounded-full text-[9px] font-dm tracking-[0.1em] uppercase">
                      {p.badge}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <p className="font-dm text-[9px] tracking-[0.2em] uppercase text-[#B8935A] mb-1">{p.brand || "D'SIGNER"}</p>
                  <p className="font-dm text-[14px] font-medium text-[#1A1918] mb-2 group-hover:text-[#B8935A] transition-colors">{p.name}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-cormorant italic text-[20px] text-[#B8935A]">₹{Number(p.price).toLocaleString()}</span>
                    {p.mrp && (
                      <span className="font-dm text-[12px] line-through text-[#9C9690]">₹{Number(p.mrp).toLocaleString()}</span>
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

function ReviewsSection({ product }: { product: any }) {
  const reviews = product.reviews || [];

  return (
    <section className="py-16 lg:py-24 bg-[#FAF8F4] border-t border-[#EDE8DF]">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#B8935A] mb-2">CUSTOMER REVIEWS</p>
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#1A1918] font-light">
            What Our Customers Say
          </h2>
          <div className="w-10 h-[0.5px] bg-[#B8935A] mx-auto mt-4" />
        </div>

        {/* Existing reviews */}
        {reviews.length > 0 && (
          <div className="space-y-4 mb-12">
            {reviews.map((review: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl border border-[#EDE8DF] p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} size={14} className={si < review.rating ? "text-[#B8935A] fill-[#B8935A]" : "text-[#EDE8DF]"} />
                    ))}
                  </div>
                  <span className="font-dm text-[12px] text-[#9C9690]">{review.user?.name || "Customer"}</span>
                </div>
                {review.comment && (
                  <p className="font-dm text-[14px] text-[#6B6560] leading-relaxed">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {reviews.length === 0 && (
          <div className="text-center bg-white rounded-2xl border border-[#EDE8DF] p-8 mb-8">
            <Star size={32} className="text-[#EDE8DF] mx-auto mb-3" />
            <p className="font-dm text-[14px] text-[#9C9690]">Be the first to review this timepiece</p>
          </div>
        )}
      </div>
    </section>
  );
}
