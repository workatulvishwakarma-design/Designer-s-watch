"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { collections, type Collection } from "@/data/collections";

const FEATURED = collections.filter((c) => c.featured);
const DISPLAY = FEATURED.length >= 5 ? FEATURED : collections.slice(0, 8);

function CollectionCard({ collection, index }: { collection: Collection; index: number }) {
  const [h, setH] = useState(false);
  const gl = collection.gender === "Unisex" ? "His & Hers" : collection.gender === "Men" ? "For Him" : "For Her";
  const img = collection.heroImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.06 }}
      className="flex-shrink-0 relative cursor-pointer group"
      style={{ width: 300, height: 420 }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <Link href={`/collections/${collection.slug}`} className="block w-full h-full">
        <div
          className="relative w-full h-full rounded-[24px] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #111110 0%, #1A1918 100%)",
            border: `1px solid ${h ? "rgba(184,147,90,0.35)" : "rgba(184,147,90,0.1)"}`,
            boxShadow: h ? "0 30px 80px rgba(0,0,0,0.35), 0 0 40px rgba(0,57,38,0.12)" : "0 8px 30px rgba(0,0,0,0.15)",
            transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: h ? "translateY(-8px)" : "translateY(0)",
          }}
        >
          {/* Hero product image */}
          {img && (
            <div className="absolute inset-0" style={{ transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)", transform: h ? "scale(1.05)" : "scale(1)" }}>
              <Image src={img} alt={collection.name} fill className="object-cover" style={{ opacity: h ? 0.5 : 0.35, transition: "opacity 0.5s ease" }} sizes="300px" />
            </div>
          )}

          {/* Dial pattern fallback */}
          {!img && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: h ? 0.12 : 0.06, transition: "opacity 0.5s ease" }}>
              <div className="w-[200px] h-[200px] rounded-full" style={{ border: "2px solid rgba(184,147,90,0.3)", boxShadow: "inset 0 0 60px rgba(184,147,90,0.05)" }}>
                <div className="w-full h-full rounded-full flex items-center justify-center" style={{ border: "1px solid rgba(184,147,90,0.15)" }}>
                  <div className="w-[120px] h-[120px] rounded-full" style={{ border: "1px solid rgba(184,147,90,0.1)" }} />
                </div>
              </div>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: img
              ? "linear-gradient(180deg, rgba(17,17,16,0.4) 0%, rgba(17,17,16,0.15) 30%, rgba(17,17,16,0.55) 65%, rgba(17,17,16,0.95) 100%)"
              : "linear-gradient(180deg, transparent 0%, rgba(17,17,16,0.3) 60%, rgba(17,17,16,0.7) 100%)"
          }} />

          {/* Green ambient hover glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at bottom, rgba(0,57,38,0.2), transparent 60%)", opacity: h ? 1 : 0, transition: "opacity 0.6s ease" }} />

          {/* Gold top edge shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(184,147,90,0.4), transparent)", opacity: h ? 1 : 0, transition: "opacity 0.5s ease" }} />

          {/* Index */}
          <div className="absolute top-6 left-7 z-10">
            <span className="font-cormorant italic text-[64px] leading-none select-none" style={{ color: h ? "rgba(184,147,90,0.2)" : "rgba(184,147,90,0.1)", transition: "color 0.5s ease" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-7 z-10">
            <div className="mb-auto pt-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-dm text-[9px] tracking-[0.15em] uppercase" style={{ background: h ? "rgba(184,147,90,0.18)" : "rgba(184,147,90,0.1)", color: "#B8935A", border: "1px solid rgba(184,147,90,0.15)", transition: "background 0.4s ease" }}>
                <span className="w-1 h-1 rounded-full bg-[#B8935A]" />
                {gl}
              </span>
            </div>

            <h3 className="font-cormorant text-[36px] leading-[0.95] text-white mb-2" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)", transition: "letter-spacing 0.5s ease", letterSpacing: h ? "0.02em" : "0" }}>
              {collection.name}<span className="text-[#B8935A]">.</span>
            </h3>

            <p className="font-cormorant italic text-[14px] mb-3" style={{ color: h ? "rgba(184,147,90,0.7)" : "rgba(255,255,255,0.5)", transition: "color 0.4s ease" }}>
              &ldquo;{collection.meaning}&rdquo;
            </p>

            <p className="font-dm text-[10px] tracking-[0.15em] uppercase text-white/30 mb-4">{collection.identity}</p>

            <div className="w-full h-px mb-4" style={{ background: "linear-gradient(90deg, transparent, rgba(184,147,90,0.4), transparent)" }} />

            <div className="flex items-center justify-between">
              <span className="font-dm text-[10px] tracking-[0.2em] uppercase" style={{ color: h ? "#B8935A" : "rgba(255,255,255,0.4)", transition: "color 0.4s ease" }}>Discover</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ transition: "transform 0.5s ease", transform: h ? "translateX(4px)" : "translateX(0)" }}>
                <path d="M4 10h12M12 6l4 4-4 4" stroke={h ? "#B8935A" : "rgba(255,255,255,0.3)"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.4s ease" }} />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CollectionStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#0D0D0C" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none blur-[100px]" style={{ background: "radial-gradient(ellipse, rgba(0,57,38,0.5), transparent)", opacity: 0.12 }} />

      <div className="max-w-7xl mx-auto px-6 mb-14 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center">
          <span className="font-dm uppercase text-[10px] tracking-[0.4em] text-[#B8935A] block mb-4">THE COLLECTION ARCHIVE</span>
          <h2 className="font-cormorant text-[38px] sm:text-[48px] lg:text-[58px] text-white leading-[1.08]">
            Named by <span className="italic font-light text-white/70">Character</span><span className="text-[#003926]">.</span>
          </h2>
          <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }} className="w-14 h-px mx-auto mt-6 origin-center" style={{ background: "linear-gradient(90deg, transparent, #003926, #B8935A, #003926, transparent)" }} />
          <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="font-dm text-[14px] text-white/40 mt-5 max-w-xl mx-auto leading-relaxed">
            Each collection carries a distinct identity — a name that evokes the spirit of its design. Grandeur speaks to magnificence. Eternal transcends trends. Explore the full archive.
          </motion.p>
        </motion.div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, #0D0D0C 0%, transparent 100%)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg, #0D0D0C 0%, transparent 100%)" }} />
        <div className="flex gap-5 px-8 lg:px-12 py-4 overflow-x-auto hide-scrollbar" style={{ scrollSnapType: "x mandatory" }}>
          {DISPLAY.map((c, i) => (
            <div key={c.slug} style={{ scrollSnapAlign: "start" }}><CollectionCard collection={c} index={i} /></div>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }} className="text-center mt-12 relative z-10">
        <Link href="/collections/dsigner" className="group inline-flex items-center gap-3 font-dm text-[11px] tracking-[0.2em] uppercase text-[#B8935A] hover:text-white transition-colors duration-300">
          <span className="relative">View All 24 Collections<span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out bg-white" /></span>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="group-hover:translate-x-1 transition-transform duration-300"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </motion.div>

      <div className="absolute bottom-0 left-1/3 w-[400px] h-[150px] pointer-events-none blur-[80px]" style={{ background: "radial-gradient(ellipse, rgba(0,57,38,0.5), transparent)", opacity: 0.08 }} />
    </section>
  );
}
