"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, Shield, Droplets, Diamond, Watch, Star, ArrowLeft,
  MapPin, Truck, Package, ShieldCheck, CreditCard, Eye, Flame, Check,
  Clock, RefreshCw, Award, Heart, ChevronDown, ChevronUp, Info, CheckCircle2, Settings2, Loader2
} from "lucide-react";
import SmoothScrolling from "@/components/SmoothScrolling";
import { useCartStore } from "@/lib/store/cart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { type ModelFamilyGroup, type Variant } from "@/types/product";
import LuxuryPlaceholder from "@/components/ui/LuxuryPlaceholder";

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

export default function ProductClientView({ family, relatedFamilies }: { family: ModelFamilyGroup, relatedFamilies: ModelFamilyGroup[] }) {
  if (!family) {
    return (
      <SmoothScrolling>
        <main className="min-h-screen bg-[#FAF8F4] flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="font-cormorant text-5xl text-[#1A1918] mb-4">Family Not Found</h1>
            <p className="font-dm text-[#6B6560] mb-8">The timepiece series you&apos;re looking for doesn&apos;t exist.</p>
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
        <ProductHero family={family} />
        <TrustBanner />
        <SpecificationsAccordion family={family} />
        <DeliverySection />
        <FeaturesSection />
        <HeritageStorySection />
        <ReviewsSection />
        <RelatedSection related={relatedFamilies} />
      </main>
    </SmoothScrolling>
  );
}

/* ═══════════════════════════════════════════
   PRODUCT HERO — Main product view
   ═══════════════════════════════════════════ */
function ProductHero({ family }: { family: ModelFamilyGroup }) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("desc");
  const { addItem } = useCartStore();
  const router = useRouter();

  const variant = family.variants?.[selectedVariantIndex] || family.variants?.[0] || ({} as Variant);
  // Limit gallery to max 4 images: primary, hover, and up to 2 details
  const rawGalleryImages = [
    variant?.gallery?.primary,
    variant?.gallery?.hover,
    ...(variant?.gallery?.detail || [])
  ].filter(Boolean);
  const allGalleryImages = Array.from(new Set(rawGalleryImages)).slice(0, 4);
  const mainImage = allGalleryImages[selectedImageIndex] || allGalleryImages[0] || "";
  
  const discount = (variant?.mrp && variant?.price && variant.mrp > variant.price)
    ? Math.round(((variant.mrp - variant.price) / variant.mrp) * 100)
    : 0;

  const [imgFailed, setImgFailed] = useState(false);
  
  useEffect(() => {
    setImgFailed(false);
  }, [mainImage]);

  // Placeholder logic for stock
  const isInStock = true;

  // Simulated social proof (client-only to avoid hydration mismatch)
  const [viewerCount, setViewerCount] = useState(24);
  useEffect(() => {
    setViewerCount(Math.floor(Math.random() * 30) + 12);
  }, []);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": family.name,
    "image": variant?.gallery?.primary || "",
    "description": variant?.description || "",
    "brand": {
      "@type": "Brand",
      "name": family.brand
    },
    "offers": {
      "@type": "Offer",
      "price": variant?.price || 0,
      "priceCurrency": "INR",
      "availability": isInStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <section className="relative pt-36 lg:pt-40 pb-16 lg:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] font-dm text-[#9C9690] mb-8">
          <Link href="/" className="hover:text-[#B8935A] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href={`/collections/${family.collectionSlug}`} className="hover:text-[#B8935A] transition-colors uppercase">
            {family.collectionSlug}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#1A1918]">{family.name}</span>
        </nav>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* ── LEFT: Thumbnail Strip + Main Image ── */}
          <div className="flex flex-col-reverse md:flex-row items-start gap-4">
            
            {/* Vertical Thumbnail Strip — max 4 */}
            {allGalleryImages.length > 1 && (
              <div className="flex md:flex-col gap-3 w-full md:w-[72px] shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {allGalleryImages.map((img: string, i: number) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImageIndex(i)}
                    className="relative w-16 h-16 md:w-full md:h-[80px] shrink-0 rounded-xl overflow-hidden transition-all duration-300"
                    style={{
                      border: selectedImageIndex === i ? '2px solid #003926' : '1.5px solid #EDE8DF',
                      background: '#F7F4EF',
                      boxShadow: selectedImageIndex === i ? '0 4px 12px rgba(0,57,38,0.1)' : 'none',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`View ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-contain p-1.5"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-b from-[#F7F4EF] to-[#EDE8DF] cursor-zoom-in"
              onClick={() => setIsLightboxOpen(true)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mainImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center p-10 md:p-12"
                >
                  {mainImage && !imgFailed ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={mainImage}
                      alt={family.name}
                      className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                      onLoad={() => setImgFailed(false)}
                      onError={() => setImgFailed(true)}
                    />
                  ) : (
                    <LuxuryPlaceholder text="Image Coming Soon" />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Discount Badge */}
              {discount > 0 && (
                <span
                  className="absolute top-4 left-4 z-10 font-montserrat font-bold text-white px-3 py-1.5"
                  style={{ fontSize: "11px", background: "#C8102E" }}
                >
                  {discount}% OFF
                </span>
              )}
            </motion.div>

            {/* Lightbox Modal */}
            <AnimatePresence>
              {isLightboxOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsLightboxOpen(false)}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
                >
                  <div className="relative w-full max-w-4xl max-h-[90vh] aspect-square lg:aspect-auto h-[80vh]">
                    {mainImage && !imgFailed ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={mainImage}
                        alt={family.name}
                        className="w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
                      />
                    ) : (
                      <LuxuryPlaceholder text="Image Coming Soon" />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Product Info ── */}
          <div className="flex flex-col justify-start lg:sticky lg:top-32 self-start">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Brand label */}
              <span className="inline-block bg-[#003926]/10 text-[#003926] px-4 py-1.5 rounded-full font-dm text-[10px] tracking-[0.2em] uppercase mb-4">
                {family.brand} • {family.category}
              </span>

              {/* Title */}
              <h1 className="font-cormorant text-4xl md:text-5xl text-[#1A1918] font-light leading-[1.05] mb-3">
                <span className="font-semibold">{family.name}</span>
              </h1>
              
              <p className="font-dm text-sm text-[#9C9690] mb-4">Model No: {variant.sku}</p>

              {/* Social proof */}
              <div className="flex items-center gap-2 mb-4">
                <Eye size={14} className="text-[#B8935A]" />
                <span className="font-dm text-[12px] text-[#9C9690]">
                  {viewerCount} people viewing this right now
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-cormorant italic text-[38px] leading-none text-[#003926] font-semibold">
                  ₹{Number(variant.price).toLocaleString()}
                </span>
                {variant.mrp && variant.mrp > variant.price && (
                  <>
                    <span className="font-dm text-[15px] line-through text-[#9C9690]">
                      ₹{Number(variant.mrp).toLocaleString()}
                    </span>
                    <span className="bg-[#C8102E]/10 text-[#C8102E] text-[10px] font-dm font-medium px-2.5 py-1 rounded-full">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="font-dm text-[11px] text-[#9C9690] mb-6">Inclusive of all taxes</p>

              {/* Size chart link */}
              <div className="flex items-center gap-2 mb-6">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#003926" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
                <span className="font-dm text-[13px] text-[#003926] font-medium cursor-pointer hover:underline">Size chart</span>
              </div>

              {/* Quantity + CTA */}
              <div className="flex flex-col gap-4 mb-6">
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center rounded-full overflow-hidden border border-[#EDE8DF]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-11 h-11 flex items-center justify-center font-dm text-[16px] text-[#003926] hover:bg-[#F5F2ED] transition-colors"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-dm text-[14px] font-medium text-[#1A1918] border-x border-[#EDE8DF]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-11 h-11 flex items-center justify-center font-dm text-[16px] text-[#003926] hover:bg-[#F5F2ED] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0,80,50,0.22)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      addItem({
                        productId: variant.sku,
                        name: `${family.name} - ${variant.sku}`,
                        price: Number(variant.price),
                        quantity,
                        image: variant.gallery.primary || "",
                        slug: family.slug,
                        variant: {
                          color: variant.dialColor.name,
                          size: variant.specs.caseSize || "Standard",
                        },
                      });
                      toast.success(`${family.name} added to cart`);
                    }}
                    className="flex-1 py-4 rounded-full font-dm text-[11px] font-medium tracking-[0.2em] uppercase flex items-center justify-center gap-2 cursor-pointer border-[1.5px] border-[#1A1918] text-[#1A1918] hover:bg-[#1A1918] hover:text-white transition-all duration-300"
                  >
                    Add to cart
                  </motion.button>
                </div>
              </div>

              {/* Accordions */}
              <div className="mt-4 pt-6 border-t border-[#EDE8DF] space-y-3">
                {/* Description Accordion */}
                <div className="border border-[#EDE8DF] rounded-xl overflow-hidden bg-white">
                  <button 
                    onClick={() => setOpenAccordion(openAccordion === 'desc' ? null : 'desc')}
                    className="w-full flex items-center justify-between p-4 bg-[#FAF8F4] hover:bg-[#F0EBE2] transition-colors"
                  >
                    <span className="font-dm font-medium text-[13px] tracking-wide uppercase text-[#1A1918] flex items-center gap-2">
                       <Info size={16}/> STORY
                    </span>
                    {openAccordion === 'desc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordion === 'desc' && (
                    <div className="p-4 bg-white font-dm text-[14px] text-[#6B6560] leading-relaxed">
                      {variant.description || "Discover the timeless elegance of D'SIGNER watches."}
                    </div>
                  )}
                </div>

                {/* Tech Specs Accordion */}
                <div className="border border-[#EDE8DF] rounded-xl overflow-hidden bg-white">
                  <button 
                    onClick={() => setOpenAccordion(openAccordion === 'specs' ? null : 'specs')}
                    className="w-full flex items-center justify-between p-4 bg-[#FAF8F4] hover:bg-[#F0EBE2] transition-colors"
                  >
                    <span className="font-dm font-medium text-[13px] tracking-wide uppercase text-[#1A1918] flex items-center gap-2">
                       <Settings2 size={16}/> SPECIFICATIONS
                    </span>
                    {openAccordion === 'specs' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordion === 'specs' && (
                    <div className="p-4 bg-white grid grid-cols-2 gap-y-4 text-[13px] font-dm">
                       <div>
                         <span className="block text-[#9C9690] mb-1">Model</span>
                         <span className="text-[#1A1918]">{variant.sku}</span>
                       </div>
                       <div>
                         <span className="block text-[#9C9690] mb-1">Case Size</span>
                         <span className="text-[#1A1918]">{variant.specs.caseSize || variant.specs.dialSize || '42mm'}</span>
                       </div>
                       <div>
                         <span className="block text-[#9C9690] mb-1">Movement</span>
                         <span className="text-[#1A1918]">{variant.specs.movement || 'Quartz / Analog'}</span>
                       </div>
                       <div>
                         <span className="block text-[#9C9690] mb-1">Glass</span>
                         <span className="text-[#1A1918]">{variant.specs.glass || 'Mineral Glass'}</span>
                       </div>
                       <div>
                         <span className="block text-[#9C9690] mb-1">Water Res.</span>
                         <span className="text-[#1A1918]">{variant.specs.waterResistance || '30m'}</span>
                       </div>
                       <div>
                         <span className="block text-[#9C9690] mb-1">Strap</span>
                         <span className="text-[#1A1918]">{variant.specs.strap || 'Stainless Steel'}</span>
                       </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SPECIFICATIONS ACCORDION — Premium expandable
   ═══════════════════════════════════════════ */
function SpecificationsAccordion({ family }: { family: ModelFamilyGroup }) {
  const [openSection, setOpenSection] = useState<string | null>("specs");
  const variant = family.variants?.[0] || ({} as Variant);
  const specs = variant?.specs || ({} as Record<string, string>);

  const sections = [
    {
      id: "specs",
      title: "Technical Specifications",
      icon: <Settings2 size={18} />,
      content: (
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {Object.entries(specs).map(([key, val]) => {
            if (!val) return null;
            const label = specLabels[key] || key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase());
            return (
              <div key={key} className="flex justify-between items-center border-b border-[#F5F2ED] pb-2">
                <span className="font-dm text-[12px] text-[#9C9690]">{label}</span>
                <span className="font-dm text-[12px] text-[#1A1918] font-medium text-right">{val}</span>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      id: "materials",
      title: "Materials & Craftsmanship",
      icon: <Diamond size={18} />,
      content: (
        <div className="space-y-3 font-dm text-[13px] text-[#5C5752] leading-relaxed">
          <p>Each {family.name} is crafted with meticulous attention to detail, combining premium materials with four generations of horological expertise.</p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="bg-[#F7F4EF] rounded-xl p-3">
              <p className="text-[10px] text-[#9C9690] uppercase tracking-wider mb-1">Case</p>
              <p className="text-[#1A1918] font-medium text-[12px]">{specs.caseMaterial || "Stainless Steel"}</p>
            </div>
            <div className="bg-[#F7F4EF] rounded-xl p-3">
              <p className="text-[10px] text-[#9C9690] uppercase tracking-wider mb-1">Glass</p>
              <p className="text-[#1A1918] font-medium text-[12px]">{specs.glass || "Mineral Glass"}</p>
            </div>
            <div className="bg-[#F7F4EF] rounded-xl p-3">
              <p className="text-[10px] text-[#9C9690] uppercase tracking-wider mb-1">Strap</p>
              <p className="text-[#1A1918] font-medium text-[12px]">{specs.strap || "Stainless Steel"}</p>
            </div>
            <div className="bg-[#F7F4EF] rounded-xl p-3">
              <p className="text-[10px] text-[#9C9690] uppercase tracking-wider mb-1">Water Resistance</p>
              <p className="text-[#1A1918] font-medium text-[12px]">{specs.waterResistance || "30 m"}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "movement",
      title: "Movement & Precision",
      icon: <Watch size={18} />,
      content: (
        <div className="font-dm text-[13px] text-[#5C5752] leading-relaxed space-y-2">
          <p>Powered by a {specs.movement || "Quartz"} movement, delivering reliable timekeeping with exceptional accuracy.</p>
          {specs.functionality && (
            <p>Functionality: <span className="text-[#1A1918] font-medium">{specs.functionality}</span></p>
          )}
        </div>
      ),
    },
    {
      id: "warranty",
      title: "Warranty & Authenticity",
      icon: <ShieldCheck size={18} />,
      content: (
        <div className="font-dm text-[13px] text-[#5C5752] leading-relaxed space-y-2">
          <p>Every D&apos;SIGNER timepiece comes with a <span className="text-[#1A1918] font-medium">{specs.warranty || "2-Year"}</span> manufacturer warranty covering defects in materials and workmanship.</p>
          <p>Each watch includes a certificate of authenticity and is shipped in premium branded packaging.</p>
        </div>
      ),
    },
    {
      id: "shipping",
      title: "Shipping & Returns",
      icon: <Truck size={18} />,
      content: (
        <div className="font-dm text-[13px] text-[#5C5752] leading-relaxed space-y-2">
          <p>• <strong>Free shipping</strong> on orders above ₹5,000</p>
          <p>• Standard delivery: 5-7 business days</p>
          <p>• Express delivery: 2-3 business days (₹149)</p>
          <p>• 7-day hassle-free returns on unworn items</p>
          <p>• Cash on Delivery available with ₹299 advance</p>
        </div>
      ),
    },
    {
      id: "care",
      title: "Care Instructions",
      icon: <Info size={18} />,
      content: (
        <div className="font-dm text-[13px] text-[#5C5752] leading-relaxed space-y-2">
          <p>• Avoid exposure to extreme temperatures, chemicals, and magnetic fields</p>
          <p>• Clean with a soft, dry cloth regularly</p>
          <p>• For water-resistant models, check seals annually at an authorized service center</p>
          <p>• Store in the provided box when not in use</p>
          <p>• Service every 3-5 years for optimal performance</p>
        </div>
      ),
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-[#FAF8F4]">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-8">
          <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#B8935A] mb-2">DETAILS</p>
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#1A1918] font-light">
            Complete Specifications
          </h2>
          <div className="w-10 h-[0.5px] bg-[#B8935A] mx-auto mt-4" />
        </div>

        <div className="space-y-2">
          {sections.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl border border-[#EDE8DF] overflow-hidden transition-all hover:border-[rgba(0,57,38,0.15)]">
              <button
                onClick={() => setOpenSection(openSection === s.id ? null : s.id)}
                className="w-full flex items-center justify-between p-5 text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openSection === s.id ? "bg-[#003926] text-white" : "bg-[#003926]/5 text-[#003926]"
                  }`}>
                    {s.icon}
                  </div>
                  <span className="font-dm text-[14px] font-medium text-[#1A1918] group-hover:text-[#003926] transition-colors">{s.title}</span>
                </div>
                <motion.div animate={{ rotate: openSection === s.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={16} className="text-[#9C9690]" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openSection === s.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0">
                      <div className="h-px bg-[#EDE8DF] mb-4" />
                      {s.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
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
   DELIVERY SECTION
   ═══════════════════════════════════════════ */
function DeliverySection() {
  const [pincode, setPincode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState<{available: boolean; days: number; message: string} | null>(null);
  const [checking, setChecking] = useState(false);

  const checkDelivery = () => {
    if (pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }
    setChecking(true);
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
                className="px-6 py-3 bg-[#003926] text-white rounded-xl font-dm text-[12px] tracking-widest uppercase hover:bg-[#024D35] transition-colors disabled:opacity-50"
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
              whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(0,57,38,0.08)' }}
              className="text-center p-6 rounded-2xl bg-white border border-[#EDE8DF] hover:border-[#003926]/20 transition-all duration-400 group cursor-default"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#003926]/5 text-[#003926] mb-4 group-hover:bg-[#003926] group-hover:text-white transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="font-dm text-[14px] font-medium text-[#1A1918] mb-2 group-hover:text-[#003926] transition-colors">{f.title}</h3>
              <p className="font-dm text-[12px] text-[#9C9690] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   HERITAGE STORY SECTION — Luxury Storytelling
   ═══════════════════════════════════════════ */
function HeritageStorySection() {
  const pillars = [
    {
      icon: <Diamond size={28} />,
      title: "The Craft",
      text: "Each D'SIGNER timepiece is assembled with meticulous precision, combining Swiss-inspired engineering with contemporary Indian craftsmanship. From hand-polished cases to precision-set movements, every detail reflects four generations of horological dedication.",
    },
    {
      icon: <Clock size={28} />,
      title: "Heritage Since 1940",
      text: "The Nagpal Group's watchmaking journey began over eight decades ago. What started as a small workshop has evolved into one of India's most respected integrated watch enterprises — from OEM manufacturing to premium D2C retail.",
    },
    {
      icon: <Award size={28} />,
      title: "Collection Philosophy",
      text: "Our 24 curated collections each tell a distinct story — from the bold Tactix and Vortex lines to the refined Serene and Eternal series. Every family is designed to resonate with a unique personality and lifestyle.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0B3D2E 0%, #002A1B 40%, #001A11 100%)' }}>
      {/* Ambient gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(184,147,90,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#B8935A] mb-3">THE DESIGNER WORLD STORY</p>
          <h2 className="font-cormorant text-3xl md:text-[42px] text-white/90 font-light leading-tight">
            Where Heritage<br />Meets Innovation<span className="text-[#B8935A]">.</span>
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B8935A] to-transparent mx-auto mt-6" />
        </motion.div>

        {/* 3-Column Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center md:text-left group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5 transition-all duration-500" style={{ background: 'rgba(184,147,90,0.08)', border: '1px solid rgba(184,147,90,0.15)', color: '#B8935A' }}>
                {p.icon}
              </div>
              <h3 className="font-cormorant text-[22px] text-white/90 mb-3">{p.title}</h3>
              <p className="font-dm text-[13px] text-white/40 leading-[1.85]">{p.text}</p>
              {i < pillars.length - 1 && (
                <div className="md:hidden w-16 h-px bg-gradient-to-r from-transparent via-[#B8935A]/20 to-transparent mx-auto mt-8" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom accent line */}
        <div className="flex items-center gap-3 justify-center mt-16">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#B8935A]/30" />
          <span className="font-cormorant italic text-[14px] text-[#B8935A]/50">Four Generations of Excellence</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#B8935A]/30" />
        </div>
      </div>
    </section>
  );
}

function RelatedSection({ related }: { related: ModelFamilyGroup[] }) {
  if (!related || related.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#B8935A] mb-2">YOU MAY ALSO LIKE</p>
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#1A1918] font-light">
            Related Collections
          </h2>
          <div className="w-10 h-[0.5px] bg-[#B8935A] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((f, i) => {
            const img = f.variants?.[0]?.gallery?.primary || "";
            return (
              <Link key={f.slug} href={`/product/${f.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-[#FAF8F4] rounded-2xl overflow-hidden border border-[#EDE8DF] hover:border-[rgba(0,57,38,0.2)] hover:shadow-[0_20px_60px_rgba(0,57,38,0.08)] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative aspect-square bg-[#F7F4EF] flex items-center justify-center p-6 overflow-hidden">
                    <div className="relative w-full h-full group-hover:scale-[1.03] transition-transform duration-600">
                      {img ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={img}
                          alt={f.name}
                          className="absolute inset-0 w-full h-full object-contain"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : (
                        <LuxuryPlaceholder />
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="font-dm text-[9px] tracking-[0.2em] uppercase text-[#B8935A] mb-1">{f.brand || "D'SIGNER"}</p>
                    <p className="font-dm text-[14px] font-medium text-[#1A1918] mb-2 group-hover:text-[#003926] transition-colors">{f.name}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-cormorant italic text-[20px] text-[#B8935A]">From ₹{Number(f.priceRange.min).toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
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

        <div className="text-center bg-white rounded-2xl border border-[#EDE8DF] p-8 mb-8">
          <Star size={32} className="text-[#EDE8DF] mx-auto mb-3" />
          <p className="font-dm text-[14px] text-[#9C9690]">Be the first to review this timepiece series</p>
        </div>
      </div>
    </section>
  );
}
