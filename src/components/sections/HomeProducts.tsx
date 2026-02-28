"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dsignerProducts } from "@/components/sections/dsigner/DsignerGrid";
import { escortProducts } from "@/components/sections/escort/EscortGrid";
import ProductCard from "@/components/ui/ProductCard";

export default function HomeProducts() {
  const bestTrack = useRef<HTMLDivElement>(null);
  const dsignerTrack = useRef<HTMLDivElement>(null);
  const escortTrack = useRef<HTMLDivElement>(null);

  const [bestProgress, setBestProgress] = useState(0);
  const [dsignerProgress, setDsignerProgress] = useState(0);
  const [escortProgress, setEscortProgress] = useState(0);

  const bestSellers = [
    ...dsignerProducts.filter(p => p.tags?.includes("best-selling")).slice(0, 3),
    ...escortProducts.filter(p => p.tags?.includes("best-selling")).slice(0, 3),
  ].map(p => ({ ...p, badge: "BEST SELLER" }));

  const handleScroll = (track: React.RefObject<HTMLDivElement | null>, setter: React.Dispatch<React.SetStateAction<number>>) => () => {
    const el = track.current;
    if (el) {
      const progress = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100 || 0;
      setter(progress);
    }
  };

  return (
    <section className="bg-[#FAF8F4]">
      <div className="py-20 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#B8935A] font-dm">CURATED FOR YOU</p>
        <h2 className="font-cormorant text-[56px] text-[#1A1918] font-light mt-4">Timepieces Worth Wearing.</h2>
      </div>

      <div className="pb-[80px]">
        <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col md:flex-row justify-between">
          <div>
            <span className="inline-block bg-[#FFF3E8] text-[#B8935A] border border-[rgba(184,147,90,0.2)] px-4 py-1.5 rounded-full font-dm text-[11px]">🔥 TRENDING NOW</span>
            <h3 className="font-bebas text-[40px] text-[#1A1918] mt-3">Best Sellers</h3>
          </div>
          <div className="mt-4 md:mt-0">
            <a href="#" className="font-dm text-[12px] text-[#B8935A] tracking-widest underline-offset-2 hover:underline">View All →</a>
          </div>
        </div>
        <div className="relative">
          <div className="w-[200px] mx-auto mb-4">
            <div className="h-2 bg-[#EDE8DF] rounded-full">
              <div className="h-full rounded-full bg-gradient-to-r from-[#B8935A] to-[#D4AA72] transition-all duration-100" style={{ width: `${bestProgress}%` }} />
            </div>
          </div>
          <div className="overflow-hidden">
            <div ref={bestTrack} onScroll={handleScroll(bestTrack, setBestProgress)} className="flex gap-5 px-6 pb-4 overflow-x-auto" style={{ scrollSnapType: 'x mandatory' }}>
              {bestSellers.map((prod, i) => (
                <div key={prod.id} className="flex-shrink-0 w-[220px] sm:w-[260px] lg:w-[280px]" style={{ scrollSnapAlign: 'start' }}>
                  <ProductCard product={prod as any} variant="premium" index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* D'Signer Section */}
      <div className="pb-[80px]">
        <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col md:flex-row justify-between">
          <div>
            <span className="inline-block bg-[#FFF3E8] text-[#B8935A] border border-[rgba(184,147,90,0.2)] px-4 py-1.5 rounded-full font-dm text-[11px]">💎 PREMIUM</span>
            <h3 className="font-bebas text-[40px] text-[#1A1918] mt-3">D&apos;Signer Collection</h3>
          </div>
          <div className="mt-4 md:mt-0">
            <a href="#" className="font-dm text-[12px] text-[#B8935A] tracking-widest underline-offset-2 hover:underline">View All →</a>
          </div>
        </div>
        <div className="relative">
          <div className="w-[200px] mx-auto mb-4">
            <div className="h-2 bg-[#EDE8DF] rounded-full">
              <div className="h-full rounded-full bg-gradient-to-r from-[#B8935A] to-[#D4AA72] transition-all duration-100" style={{ width: `${dsignerProgress}%` }} />
            </div>
          </div>
          <div className="overflow-hidden">
            <div ref={dsignerTrack} onScroll={handleScroll(dsignerTrack, setDsignerProgress)} className="flex gap-5 px-6 pb-4 overflow-x-auto" style={{ scrollSnapType: 'x mandatory' }}>
              {dsignerProducts.slice(0, 6).map((prod: any) => (
                <div key={prod.id} className="flex-shrink-0 w-[220px] sm:w-[260px] lg:w-[280px]" style={{ scrollSnapAlign: 'start' }}>
                  <ProductCard product={prod} variant="premium" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Escort Section - Green Theme */}
      <div className="pb-[80px]">
        <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col md:flex-row justify-between">
          <div>
            <span className="inline-block bg-[#F0F7F4] text-[#003926] border border-[#003926]/20 px-4 py-1.5 rounded-full font-dm text-[11px]">⌚ EVERYDAY</span>
            <h3 className="font-bebas text-[40px] text-[#1A1918] mt-3">Escort Collection</h3>
          </div>
          <div className="mt-4 md:mt-0">
            <a href="#" className="font-dm text-[12px] text-[#003926] tracking-widest underline-offset-2 hover:underline">View All →</a>
          </div>
        </div>
        <div className="relative">
          <div className="w-[200px] mx-auto mb-4">
            <div className="h-2 bg-[#EDE8DF] rounded-full">
              <div className="h-full rounded-full bg-gradient-to-r from-[#003926] to-[#4CAF50] transition-all duration-100" style={{ width: `${escortProgress}%` }} />
            </div>
          </div>
          <div className="overflow-hidden">
            <div ref={escortTrack} onScroll={handleScroll(escortTrack, setEscortProgress)} className="flex gap-5 px-6 pb-4 overflow-x-auto" style={{ scrollSnapType: 'x mandatory' }}>
              {escortProducts.slice(0, 6).map((prod: any) => (
                <div key={prod.id} className="flex-shrink-0 w-[220px] sm:w-[260px] lg:w-[280px]" style={{ scrollSnapAlign: 'start' }}>
                  <ProductCard product={prod} variant="everyday" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
