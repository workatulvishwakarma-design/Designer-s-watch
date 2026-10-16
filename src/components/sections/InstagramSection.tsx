import React from "react";
import { fetchInstagramFeed } from "@/lib/instagram";
import InstagramCard from "@/components/instagram/InstagramCard";
import { Instagram, ArrowUpRight } from "lucide-react";

export default async function InstagramSection() {
  const feed = await fetchInstagramFeed();
  const hasLivePosts = feed.isConfigured && feed.posts && feed.posts.length > 0;

  return (
    <section
      id="instagram-feed"
      aria-label="DSIGNER In Motion - Instagram Gallery"
      className="relative w-full bg-[#080908] text-[#FAF8F4] border-t border-[#B8935A]/20 pt-20 pb-20 md:pt-28 md:pb-28 overflow-hidden select-none"
    >
      {/* Background Ambience: Subtle Radial Gold/Emerald Aura */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[400px] bg-[radial-gradient(ellipse_at_top,_rgba(184,147,90,0.12)_0%,_rgba(0,57,38,0.15)_45%,_transparent_75%)] blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[radial-gradient(circle,_rgba(184,147,90,0.06)_0%,_transparent_70%)] blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-6 xl:px-12">
        {/* ROTORIS-Inspired Luxury Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          {/* Eyebrow Label with Ornamental Accents */}
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-6 sm:w-10 h-px bg-gradient-to-r from-transparent to-[#B8935A]/70" />
            <a
              href={feed.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-montserrat uppercase tracking-[0.35em] text-[#B8935A] hover:text-[#D4AF37] font-semibold transition-colors"
            >
              <Instagram size={13} className="text-[#B8935A]" />
              <span>@{feed.handle}</span>
            </a>
            <span className="w-6 sm:w-10 h-px bg-gradient-to-l from-transparent to-[#B8935A]/70" />
          </div>

          {/* Primary Editorial Heading */}
          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-[#FAF8F4] font-light tracking-wide uppercase mb-4 leading-[1.1]">
            DSIGNER <span className="italic font-normal text-[#D4AF37]">IN MOTION</span>
          </h2>

          {/* Editorial Subtitle */}
          <p className="font-montserrat text-xs sm:text-sm text-[#FAF8F4]/70 tracking-[0.18em] uppercase max-w-xl mx-auto leading-relaxed">
            The Art of Time, Captured in Moments.
          </p>

          {/* Subtle Ornamental Hairline Divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-12 h-px bg-[#B8935A]/30" />
            <span className="text-[#B8935A]/60 text-[10px]">❖</span>
            <div className="w-12 h-px bg-[#B8935A]/30" />
          </div>
        </div>

        {/* Content Area: Real Feed Gallery OR Refined Luxury Setup State */}
        {hasLivePosts ? (
          <>
            {/* ROTORIS 5-Column Editorial Gallery (Desktop 5 col, Tablet 3 col, Mobile 2 col) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 w-full items-stretch">
              {feed.posts.map((post, index) => (
                <InstagramCard key={post.id} post={post} index={index} />
              ))}
            </div>

            {/* Bottom Luxury CTA Strip */}
            <div className="mt-14 md:mt-20 flex flex-col items-center justify-center text-center">
              <a
                href={feed.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full border border-[#B8935A]/60 bg-[#B8935A]/10 hover:bg-[#B8935A] text-[#FAF8F4] hover:text-[#080908] font-montserrat text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(184,147,90,0.35)] cursor-pointer"
              >
                <Instagram size={15} className="text-[#B8935A] group-hover:text-[#080908] transition-colors" />
                <span>Follow Our Journey</span>
                <ArrowUpRight size={14} className="text-[#B8935A] group-hover:text-[#080908] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <p className="text-[11px] font-montserrat text-[#FAF8F4]/40 uppercase tracking-[0.2em] mt-4">
                Explore daily horological stories & atelier craftsmanship
              </p>
            </div>
          </>
        ) : (
          /* Graceful Luxury Editorial Placeholder State (before credentials or if empty) */
          <div className="max-w-2xl mx-auto rounded-2xl border border-white/10 bg-[#121412]/80 backdrop-blur-md p-10 sm:p-14 text-center shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-[#B8935A]/40 bg-[#B8935A]/10 flex items-center justify-center text-[#D4AF37]">
              <Instagram size={26} />
            </div>

            <h3 className="font-cormorant text-2xl sm:text-3xl text-[#FAF8F4] font-normal tracking-wide uppercase mb-3">
              Official Instagram Feed Ready
            </h3>

            <p className="font-montserrat text-xs sm:text-sm text-[#FAF8F4]/65 leading-relaxed max-w-md mx-auto mb-8 tracking-wide">
              The live editorial showcase is configured to automatically synchronize fresh timepieces and atelier stories from @{feed.handle}.
            </p>

            <a
              href={feed.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B8935A] to-[#D4AF37] text-[#080908] font-montserrat text-xs uppercase tracking-[0.2em] font-bold shadow-[0_4px_20px_rgba(184,147,90,0.3)] hover:brightness-110 transition-all cursor-pointer"
            >
              <Instagram size={15} />
              <span>Follow Our Journey</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
