"use client";

import { useMemo, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Eye, Shield, Package, RefreshCw, Award, ChevronDown, Droplets, Cog, Watch, Gem, ArrowUpRight, Diamond } from "lucide-react";
import type { ModelFamilyGroup } from "@/types/product";
import { collections } from "@/data/collections";
import LuxuryPlaceholder from "@/components/ui/LuxuryPlaceholder";
import { ProductGridSkeleton } from "@/components/ui/CollectionSkeleton";

/* ═══════════════════════════════════════════
   1. PRODUCT FAMILY CARD
   ═══════════════════════════════════════════ */
function CollectionFamilyCard({ family }: { family: ModelFamilyGroup }) {
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const primaryImage = family.variants[0]?.gallery?.primary || "";
  const secondaryImage = family.variants[0]?.gallery?.hover || family.variants[0]?.gallery?.detail?.[1] || primaryImage;
  const formattedPrice = `From ₹${family.priceRange.min.toLocaleString("en-IN")}`;
  const showImages = primaryImage && !imgFailed;

  return (
    <Link href={`/product/${family.slug}`} className="block group">
      <div
        className="rounded-2xl overflow-hidden cursor-pointer relative"
        style={{
          background: "white",
          border: `1px solid ${hovered ? "rgba(0,57,38,0.2)" : "#EDE8DF"}`,
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.1), 0 0 40px rgba(0,57,38,0.06)" : "0 2px 8px rgba(0,0,0,0.04)",
          transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "4/5",
            background: "radial-gradient(ellipse at center, #F0EDE8, #F5F2ED)",
          }}
        >
          {showImages ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={primaryImage} alt={family.name} className="absolute inset-0 w-full h-full object-contain p-8"
                style={{ transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)", transform: hovered ? "scale(1.06)" : "scale(1)", opacity: hovered && secondaryImage !== primaryImage ? 0 : 1 }}
                onError={() => setImgFailed(true)} loading="lazy" />
              {secondaryImage !== primaryImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={secondaryImage} alt={`${family.name} alt`} className="absolute inset-0 w-full h-full object-contain p-8"
                  style={{ transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)", transform: hovered ? "scale(1.06)" : "scale(1.02)", opacity: hovered ? 1 : 0 }} loading="lazy" />
              )}
            </>
          ) : (
            <LuxuryPlaceholder />
          )}

          {/* Styles badge */}
          <span className="absolute top-3 left-3 rounded-full font-dm px-3 py-1.5 z-10"
            style={{ fontSize: "9px", letterSpacing: "0.1em", background: "#1A1918", color: "white" }}>
            {family.variantCount} {family.variantCount === 1 ? "Style" : "Styles"}
          </span>

          {/* Hover overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10"
            style={{ background: "rgba(250,248,244,0.70)", backdropFilter: "blur(12px)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease", pointerEvents: hovered ? "auto" : "none" }}>
            <button className="rounded-full font-dm flex items-center gap-2"
              style={{ background: "transparent", border: "1px solid #E0D8CE", color: "#1A1918", fontSize: "12px", padding: "10px 20px", transition: "all 0.3s ease, transform 0.4s ease 0.07s", transform: hovered ? "translateY(0)" : "translateY(16px)" }}>
              <Eye size={14} />Explore Series
            </button>
          </div>

          {/* Inner shadow for depth */}
          <div className="absolute inset-0 pointer-events-none rounded-t-2xl" style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.03)" }} />
        </div>

        <div className="p-5 md:p-6 flex flex-col">
          <p className="font-dm uppercase" style={{ fontSize: "9px", color: "#003926", letterSpacing: "0.2em" }}>{family.brand}</p>
          <p className="font-dm font-medium mt-1" style={{ fontSize: "14px", color: "#1A1918" }}>{family.name}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="font-cormorant italic" style={{ fontSize: "20px", color: "#003926" }}>{formattedPrice}</p>
            {family.variantCount > 1 && (
              <p className="font-dm" style={{ fontSize: "11px", color: "#9C9690" }}>· {family.variantCount} variants</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════
   2. COLLECTION STORY SECTION
   ═══════════════════════════════════════════ */
function CollectionStory({ collection }: { collection: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-[#FAF8F4] border-b border-[#EDE8DF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#B8935A]" />
              <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#B8935A]">The Story</span>
            </div>
            <h2 className="font-cormorant text-[36px] sm:text-[42px] text-[#1A1918] leading-[1.1] mb-6">
              The Essence of {collection.title}<span className="text-[#003926]">.</span>
            </h2>
            <p className="font-dm text-[14px] text-[#5C5750] leading-[1.9] mb-6">
              {collection.description || `The ${collection.title} collection embodies the highest standards of horological craft. Designed for those who appreciate timeless elegance and precision engineering.`}
            </p>
            {collection.luxuryIdentity && (
              <p className="font-cormorant italic text-[16px] text-[#003926]/60 mb-6">
                &ldquo;{collection.luxuryIdentity}&rdquo;
              </p>
            )}
            {/* Identity pills */}
            {collection.identity && (
              <div className="flex flex-wrap gap-2">
                {collection.identity.split("·").map((trait: string) => (
                  <span key={trait.trim()} className="inline-flex px-3.5 py-1.5 rounded-full font-dm text-[10px] text-[#003926]/60 bg-[#F0F7F4] border border-[#003926]/8 tracking-[0.08em]">
                    {trait.trim()}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Atmospheric visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden bg-[#111110] min-h-[320px] relative">
              {collection.heroImage ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={collection.heroImage}
                    alt={`${collection.title} collection`}
                    className="w-full h-full object-cover absolute inset-0"
                    style={{ opacity: 0.6 }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111110]/80 via-transparent to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[160px] h-[160px] rounded-full border border-[#B8935A]/15 flex items-center justify-center">
                    <div className="w-[100px] h-[100px] rounded-full border border-[#B8935A]/10 flex items-center justify-center">
                      <Watch className="w-10 h-10 text-[#B8935A]/20" />
                    </div>
                  </div>
                </div>
              )}
              {/* Emerald glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[80px] blur-[60px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,57,38,0.4), transparent)" }} />
              {/* Collection name overlay */}
              <div className="absolute bottom-6 left-6 z-10">
                <span className="font-cormorant text-[28px] text-white/85">{collection.title}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   3. HIGHLIGHTS / SPECS BLOCK
   ═══════════════════════════════════════════ */
function HighlightsBlock({ families }: { families: ModelFamilyGroup[] }) {
  const firstVariant = families[0]?.variants?.[0];
  const specs = firstVariant?.specs;

  const highlights = useMemo(() => [
    { icon: <Gem size={20} />, label: "Case Material", value: specs?.caseMaterial || "Stainless Steel" },
    { icon: <Droplets size={20} />, label: "Water Resistance", value: specs?.waterResistance || "30m" },
    { icon: <Cog size={20} />, label: "Movement", value: specs?.movement || "Quartz" },
    { icon: <Shield size={20} />, label: "Glass", value: specs?.glass || "Mineral Glass" },
  ], [specs]);

  return (
    <section className="py-12 bg-[#F0EDE8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item) => (
            <div key={item.label} className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 border border-[#EDE8DF]">
              <div className="w-10 h-10 rounded-lg bg-[#F0F7F4] flex items-center justify-center text-[#003926] shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="font-dm text-[10px] uppercase tracking-[0.15em] text-[#9C9690] mb-0.5">{item.label}</p>
                <p className="font-dm text-[13px] font-medium text-[#1A1918]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   4. GALLERY SECTION
   ═══════════════════════════════════════════ */
function CollectionGallery({ collection }: { collection: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const galleryImages = useMemo(() => {
    // Curated gallery setup
    return [
      collection.featuredImage || collection.heroImage || "/images/img01.png",
      "/images/img02.png",
      "/images/img05.png"
    ];
  }, [collection]);

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-[#FAF8F4] border-b border-[#EDE8DF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="font-dm uppercase text-[10px] tracking-[0.3em] text-[#B8935A] mb-3">VISUAL GALLERY</p>
          <h2 className="font-cormorant text-[32px] sm:text-[36px] text-[#1A1918]">
            Editorial Showcase<span className="text-[#003926]">.</span>
          </h2>
          <div className="w-12 h-px mx-auto mt-4" style={{ background: "linear-gradient(90deg, transparent, #B8935A, transparent)" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Main showcase card */}
          <div className="md:col-span-2 relative h-[380px] rounded-2xl overflow-hidden bg-gray-900 group shadow-md">
            <Image
              src={galleryImages[0]}
              alt={`${collection.title} detail 1`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 text-white z-10">
              <span className="font-dm text-[9px] uppercase tracking-widest text-[#B8935A] block mb-1">Lifestyle View</span>
              <h4 className="font-cormorant text-[20px]">{collection.title} Essence</h4>
            </div>
          </div>

          {/* Sub cards side panel */}
          <div className="grid grid-cols-1 gap-6">
            <div className="relative h-[178px] rounded-2xl overflow-hidden bg-gray-900 group shadow-sm">
              <Image
                src={galleryImages[1]}
                alt={`${collection.title} detail 2`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-white z-10">
                <span className="font-dm text-[8px] uppercase tracking-widest text-[#B8935A] block mb-0.5">Macro Detail</span>
                <h5 className="font-cormorant text-[16px]">Flawless Casing</h5>
              </div>
            </div>
            <div className="relative h-[178px] rounded-2xl overflow-hidden bg-gray-900 group shadow-sm">
              <Image
                src={galleryImages[2]}
                alt={`${collection.title} detail 3`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-white z-10">
                <span className="font-dm text-[8px] uppercase tracking-widest text-[#B8935A] block mb-0.5">Craft Finish</span>
                <h5 className="font-cormorant text-[16px]">Precision Dial</h5>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   5. CRAFTSMANSHIP SECTION
   ═══════════════════════════════════════════ */
function CraftsmanshipSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const highlights = [
    {
      title: "Hand-Assembled Caliber",
      desc: "Each internal movement is calibrated by expert horologists to ensure split-second precision."
    },
    {
      title: "Premium PVD Coating",
      desc: "An advanced physical vapor deposition process offers scratch protection and color longevity."
    },
    {
      title: "Surgical-Grade Casing",
      desc: "Constructed with 316L stainless steel for hypoallergenic durability and high lustrous finishing."
    }
  ];

  return (
    <section ref={ref} className="py-20 lg:py-24 bg-[#0D0D0C] text-white relative overflow-hidden border-b border-white/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] pointer-events-none blur-[100px] opacity-10" style={{ background: "radial-gradient(circle, #B8935A, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#B8935A] block mb-4">HOROLOGY STANDARDS</span>
            <h2 className="font-cormorant text-[36px] sm:text-[46px] leading-[1.08] mb-6">
              A Legacy of Handcrafting & Precision<span className="text-[#B8935A]">.</span>
            </h2>
            <p className="font-dm text-[13px] text-white/55 leading-[1.9] mb-8">
              At Designer World, time is not just measured; it is sculpted. Every timepiece in our collections is hand-assembled under rigid luxury standards. We build watchmaking monuments that transcend seasons and last generations.
            </p>
            <div className="w-14 h-px" style={{ background: "linear-gradient(90deg, #B8935A, transparent)" }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {highlights.map((hl, i) => (
              <div key={hl.title} className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all duration-300">
                <div className="w-8 h-8 rounded-lg bg-[#B8935A]/10 text-[#B8935A] flex items-center justify-center font-dm font-semibold text-[13px] shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-dm font-semibold text-[13px] text-white mb-1 uppercase tracking-wide">{hl.title}</h4>
                  <p className="font-dm text-[11.5px] text-white/40 leading-relaxed">{hl.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   6. RELATED COLLECTIONS
   ═══════════════════════════════════════════ */
function RelatedCollections({ currentSlug }: { currentSlug: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const related = useMemo(() => {
    return collections
      .filter(c => c.slug !== currentSlug)
      .slice(0, 4);
  }, [currentSlug]);

  return (
    <section ref={ref} className="py-16 bg-[#F0EDE8] border-b border-[#EDE8DF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="font-dm uppercase text-[10px] tracking-[0.3em] text-[#B8935A] mb-3">COMPLEMENTARY STYLES</p>
          <h2 className="font-cormorant text-[32px] text-[#1A1918]">Related Collections<span className="text-[#003926]">.</span></h2>
          <div className="w-12 h-px mx-auto mt-4" style={{ background: "linear-gradient(90deg, transparent, #003926, transparent)" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {related.map((col, i) => (
            <Link key={col.slug} href={`/collections/${col.slug}`} className="group block">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EDE8DF] hover:shadow-md hover:border-[#B8935A]/30 transition-all duration-500 flex flex-col h-full">
                <div className="relative aspect-[4/3] bg-gray-900 overflow-hidden">
                  <Image
                    src={col.featuredImage || col.heroImage || "/images/img01.png"}
                    alt={col.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                  />
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h4 className="font-cormorant text-[20px] text-[#1A1918] group-hover:text-[#B8935A] transition-colors leading-tight mb-1">
                    {col.title}
                  </h4>
                  <p className="font-dm text-[10px] italic text-[#9C9690] mb-3 line-clamp-1">
                    &ldquo;{col.tagline}&rdquo;
                  </p>
                  <span className="font-dm text-[9px] tracking-[0.15em] uppercase text-[#003926] font-semibold mt-auto flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
                    Discover <ArrowUpRight size={10} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   7. TRUST BLOCK
   ═══════════════════════════════════════════ */
function TrustBlock() {
  const items = [
    { icon: <Shield size={22} />, title: "2-Year Warranty", desc: "Full manufacturer warranty coverage" },
    { icon: <Award size={22} />, title: "100% Authentic", desc: "Genuine certified timepieces" },
    { icon: <Package size={22} />, title: "Premium Packaging", desc: "Luxury unboxing experience" },
    { icon: <RefreshCw size={22} />, title: "7-Day Returns", desc: "Hassle-free return policy" },
  ];

  return (
    <section className="py-16 bg-[#F7F3EE] border-b border-[#EDE8DF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-10">
          <p className="font-dm uppercase text-[10px] tracking-[0.3em] text-[#003926]/40 mb-3">OUR PROMISE</p>
          <h2 className="font-cormorant text-[32px] text-[#1A1918]">Crafted with Integrity<span className="text-[#003926]">.</span></h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.title} className="trust-icon-card bg-white rounded-xl p-6 text-center border border-[#EDE8DF] hover:border-[#B8935A]/20 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#FAF8F4] flex items-center justify-center text-[#003926]">
                {item.icon}
              </div>
              <h3 className="font-dm font-semibold text-[13px] text-[#1A1918] mb-1">{item.title}</h3>
              <p className="font-dm text-[11px] text-[#9C9690] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   8. FAQ SECTION
   ═══════════════════════════════════════════ */
function CollectionFAQ({ collection }: { collection: any }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = useMemo(() => {
    const genderText = collection.gender === "Men" ? "men's" : collection.gender === "Women" ? "women's" : "unisex";
    return [
      {
        q: `What makes the ${collection.title} collection unique?`,
        a: collection.description || `The ${collection.title} collection represents ${collection.tagline || "the pinnacle of craftsmanship"}. Each timepiece is designed with meticulous attention to detail, premium materials, and a distinctive design language.`,
      },
      {
        q: "What materials are used in these watches?",
        a: "Our timepieces feature surgical-grade stainless steel cases, sapphire or hardened mineral glass crystals, and premium leather or stainless steel straps. Every material is chosen for durability and luxury feel.",
      },
      {
        q: `Are these watches suitable for ${genderText} styles?`,
        a: `The ${collection.title} collection is designed specifically for ${genderText} aesthetics, with proportions, dial sizes, and finishing details tailored to match contemporary ${genderText} fashion sensibilities.`,
      },
      {
        q: "What warranty is included?",
        a: "Every Designer World timepiece comes with a comprehensive 2-year manufacturer warranty covering defects in materials and workmanship. Our commitment to quality ensures your investment is protected.",
      },
      {
        q: "Can I return or exchange my purchase?",
        a: "We offer a hassle-free 7-day return policy. If you're not completely satisfied with your purchase, you can return it in its original condition for a full refund or exchange.",
      },
    ];
  }, [collection]);

  return (
    <section className="py-16 lg:py-20 bg-[#FAF8F4] border-b border-[#EDE8DF]">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-10">
          <p className="font-dm uppercase text-[10px] tracking-[0.3em] text-[#B8935A] mb-3">HAVE QUESTIONS?</p>
          <h2 className="font-cormorant text-[32px] text-[#1A1918]">Frequently Asked<span className="text-[#003926]">.</span></h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item rounded-xl border border-[#EDE8DF] bg-white overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-dm text-[13px] font-medium text-[#1A1918] pr-4">{faq.q}</span>
                <ChevronDown size={16} className={`faq-chevron text-[#003926]/30 shrink-0 ${openIdx === i ? "open" : ""}`} />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 pb-5 border-t border-[#EDE8DF]">
                      <p className="font-dm text-[12px] text-[#9C9690] leading-[1.8] pt-4">{faq.a}</p>
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
   9. FINAL CTA SECTION
   ═══════════════════════════════════════════ */
function FinalCTA({ collectionName }: { collectionName: string }) {
  return (
    <section className="py-20 lg:py-28 bg-[#111110] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none blur-[120px] opacity-10" style={{ background: "radial-gradient(circle, rgba(0,57,38,0.6), transparent)" }} />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <span className="font-dm uppercase text-[10px] tracking-[0.3em] text-[#B8935A] block mb-4">CONTINUE EXPLORING</span>
        <h2 className="font-cormorant text-[36px] sm:text-[44px] text-white leading-[1.08] mb-4">
          The {collectionName} Journey Awaits<span className="text-[#B8935A]">.</span>
        </h2>
        <p className="font-dm text-[13px] text-white/35 leading-relaxed max-w-md mx-auto mb-8">
          Every timepiece tells a story. Find yours across our complete catalog of masterfully crafted watches.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/collections/dsigner" className="luxury-cta-primary shadow-lg shadow-black/50">
            Browse All Watches
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
          <Link href="/contact" className="luxury-cta-outline-dark">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FALLBACK TEASER SYSTEM (Coming Soon)
   ═══════════════════════════════════════════ */
function CollectionTeaser({ collection, relatedFamilies }: { collection: any; relatedFamilies: ModelFamilyGroup[] }) {
  return (
    <div className="w-full">
      {/* Teaser Banner */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#B8935A]/20 flex items-center justify-center bg-[#F7F3EE]">
          <Watch className="w-8 h-8 text-[#B8935A]/40" />
        </div>
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-dm text-[10px] tracking-[0.2em] uppercase bg-[#F0F7F4] text-[#003926] border border-[#003926]/10 mb-6">
          Coming Soon
        </span>
        <h2 className="font-cormorant text-[32px] text-[#1A1918] mb-4">
          The {collection.title} Teaser Collection<span className="text-[#003926]">.</span>
        </h2>
        <p className="font-dm text-[14px] text-[#9C9690] leading-relaxed mb-6">
          We are currently preparing something extraordinary. The {collection.title} collection is being meticulously assembled in our Swiss workshops. Register your interest for early access.
        </p>
        <p className="font-cormorant italic text-[15px] text-[#003926]/50">
          &ldquo;{collection.tagline || "Crafted for the discerning"}&rdquo;
        </p>
      </div>

      {/* Loading Skeleton */}
      <div className="mb-16">
        <p className="font-dm uppercase text-[9px] tracking-[0.25em] text-[#9C9690] mb-6 text-center">Curating New Timepieces (Preview)</p>
        <ProductGridSkeleton count={4} />
      </div>

      {/* Related Collection Recommendations */}
      {relatedFamilies.length > 0 && (
        <div className="pt-6 border-t border-[#EDE8DF]">
          <div className="text-center mb-8">
            <p className="font-dm uppercase text-[10px] tracking-[0.3em] text-[#B8935A] mb-2">MEANWHILE, DISCOVER AVAILABLE MODELS</p>
            <h3 className="font-cormorant text-[28px] text-[#1A1918]">Alternative Timepieces<span className="text-[#003926]">.</span></h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedFamilies.slice(0, 4).map((f) => (
              <CollectionFamilyCard key={f.slug} family={f} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COLLECTION CLIENT
   ═══════════════════════════════════════════ */
export default function CollectionClient({
  collection,
  families,
  slug
}: {
  collection: any;
  families: ModelFamilyGroup[];
  slug: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  // Get related collections for "Other Collections" section and fallback
  const relatedCollections = useMemo(() =>
    collections
      .filter(c => c.slug !== slug)
      .sort((a, b) => {
        // Prioritize same gender
        if (a.gender === collection?.gender && b.gender !== collection?.gender) return -1;
        if (b.gender === collection?.gender && a.gender !== collection?.gender) return 1;
        return 0;
      }),
    [slug, collection?.gender]
  );

  // For empty state fallback, use families from related collections
  const fallbackFamilies = useMemo(() => {
    if (families.length > 0) return [];
    const { getFamiliesByCollection } = require("@/data/productData");
    const related = relatedCollections.slice(0, 3);
    const result: ModelFamilyGroup[] = [];
    for (const rc of related) {
      const fams = getFamiliesByCollection(rc.slug);
      result.push(...fams.slice(0, 2));
      if (result.length >= 4) break;
    }
    return result.slice(0, 4);
  }, [families.length, relatedCollections]);

  if (!collection) {
    return (
      <main className="min-h-screen bg-[#FAF8F4] flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#B8935A]/20 flex items-center justify-center bg-[#F7F3EE]">
            <Watch className="w-8 h-8 text-[#B8935A]/40" />
          </div>
          <h1 className="font-cormorant text-[48px] text-[#1A1918]">Collection Not Found</h1>
          <p className="font-dm text-[14px] text-[#9C9690] mt-4">The collection &ldquo;{slug}&rdquo; does not exist in our archive.</p>
          <Link href="/collections/dsigner" className="luxury-cta-primary mt-8 inline-flex">
            Browse All Watches
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F4]">
      {/* ═══ 1. HERO SECTION ═══ */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden" style={{ background: "#111110" }}>
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] pointer-events-none opacity-10 blur-[120px] -translate-y-1/2"
          style={{ background: "radial-gradient(circle, rgba(0,57,38,0.5), transparent)" }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-8">
            <Link href="/" className="font-dm text-[11px] text-white/40 tracking-[0.1em] uppercase hover:text-[#B8935A] transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link href="/collections/dsigner" className="font-dm text-[11px] text-white/40 tracking-[0.1em] uppercase hover:text-[#B8935A] transition-colors">Collections</Link>
            <span className="text-white/20">/</span>
            <span className="font-dm text-[11px] text-[#B8935A] tracking-[0.1em] uppercase">{collection.title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#B8935A]" />
                <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#B8935A]">
                  {collection.gender === "Unisex" ? "HIS & HERS" : collection.gender === "Men" ? "FOR HIM" : "FOR HER"} COLLECTION
                </span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                className="font-cormorant text-[48px] sm:text-[64px] lg:text-[76px] text-white leading-[1.02]">
                {collection.title}<span className="text-[#B8935A]">.</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="font-cormorant italic text-[18px] text-white/50 mt-3">
                &ldquo;{collection.tagline || "Elegance and Precision"}&rdquo;
              </motion.p>
            </div>
            <div>
              <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="font-dm text-[14px] text-white/40 leading-[1.85] max-w-lg lg:ml-auto">
                {collection.description}
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-6 mt-6 lg:justify-end">
                <span className="font-dm text-[11px] text-white/30 tracking-[0.15em] uppercase">
                  {families.length} {families.length === 1 ? "Family" : "Families"}
                </span>
                {collection.identity && (
                  <span className="font-dm text-[11px] text-[#B8935A] tracking-[0.1em] uppercase">
                    {collection.identity}
                  </span>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
          >
            <div className="w-0.5 h-2 bg-[#B8935A]/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ 2. COLLECTION STORY ═══ */}
      <CollectionStory collection={collection} />

      {/* ═══ 3. FEATURED PRODUCTS (WITH FALLBACK/TEASER/SKELETON) ═══ */}
      <section ref={sectionRef} className="py-16 lg:py-24 bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {families.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <p className="font-dm uppercase text-[10px] tracking-[0.3em] text-[#003926]/40 mb-3">THE COLLECTION</p>
                <h2 className="font-cormorant text-[32px] sm:text-[36px] text-[#1A1918]">
                  Explore {collection.title} Timepieces<span className="text-[#003926]">.</span>
                </h2>
                <div className="w-12 h-px mx-auto mt-4" style={{ background: "linear-gradient(90deg, transparent, #003926, #B8935A, transparent)" }} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {families.map((f, i) => (
                  <motion.div key={f.slug}
                    initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.05 }}>
                    <CollectionFamilyCard family={f} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <CollectionTeaser collection={collection} relatedFamilies={fallbackFamilies} />
          )}
        </div>
      </section>

      {/* ═══ 4. SPECIFICATIONS BLOCK ═══ */}
      {families.length > 0 ? (
        <HighlightsBlock families={families} />
      ) : (
        <HighlightsBlock families={fallbackFamilies} />
      )}

      {/* ═══ 5. GALLERY SECTION ═══ */}
      <CollectionGallery collection={collection} />

      {/* ═══ 6. CRAFTSMANSHIP SECTION ═══ */}
      <CraftsmanshipSection />

      {/* ═══ 7. RELATED COLLECTIONS ═══ */}
      <RelatedCollections currentSlug={slug} />

      {/* ═══ 8. FAQ SECTION ═══ */}
      <CollectionFAQ collection={collection} />

      {/* ═══ 9. FINAL CTA SECTION ═══ */}
      <FinalCTA collectionName={collection.title} />
    </main>
  );
}
