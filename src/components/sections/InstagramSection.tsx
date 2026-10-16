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
      className="relative w-full bg-[#FAF9F6] text-[#242424] border-t border-[#242424]/[0.06] pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden select-none"
    >
      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Minimal Luxury Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          {/* Subtle Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-3">
            <span className="w-5 sm:w-7 h-px bg-[#C4A46A]/50" />
            <a
              href={feed.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-montserrat uppercase tracking-[0.28em] text-[#C4A46A] hover:text-[#242424] font-medium transition-colors"
            >
              <Instagram size={12} className="text-[#C4A46A]" />
              <span>@{feed.handle}</span>
            </a>
            <span className="w-5 sm:w-7 h-px bg-[#C4A46A]/50" />
          </div>

          {/* Primary Editorial Heading */}
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-[#242424] font-light tracking-wide uppercase mb-3 leading-[1.15]">
            DSIGNER <span className="italic font-normal text-[#C4A46A]">IN MOTION</span>
          </h2>

          {/* Editorial Subtitle */}
          <p className="font-montserrat text-xs sm:text-[13px] text-[#242424]/60 tracking-[0.18em] uppercase max-w-md mx-auto leading-relaxed font-light">
            The Art of Time, Captured in Moments.
          </p>

          {/* Refined Minimal Divider */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-6 h-px bg-[#C4A46A]/30" />
            <span className="text-[#C4A46A]/60 text-[8px]">❖</span>
            <div className="w-6 h-px bg-[#C4A46A]/30" />
          </div>
        </div>

        {/* Content Area: Real Feed Gallery OR Refined Luxury Setup State */}
        {hasLivePosts ? (
          <>
            {/* Responsive Light-Theme Editorial Grid */}
            {/* Large desktop: 5 cols, Laptop: 4 cols, Tablet: 3 cols, Mobile: 2 cols, Narrow: 1 col */}
            <div className="grid grid-cols-2 max-[380px]:grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 w-full items-stretch">
              {feed.posts.map((post, index) => (
                <InstagramCard key={post.id} post={post} index={index} />
              ))}
            </div>

            {/* Bottom Luxury Light-Theme CTA */}
            <div className="mt-10 md:mt-14 flex flex-col items-center justify-center text-center">
              <a
                href={feed.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full border border-[#C4A46A]/45 bg-white hover:bg-[#242424] text-[#242424] hover:text-white font-montserrat text-[11px] uppercase tracking-[0.22em] font-medium transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(36,36,36,0.12)] cursor-pointer"
              >
                <Instagram size={13} className="text-[#C4A46A] group-hover:text-white transition-colors" />
                <span>Follow Our Journey</span>
                <ArrowUpRight size={13} className="text-[#C4A46A] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </>
        ) : (
          /* Graceful Minimal Light-Theme Placeholder State */
          <div className="max-w-xl mx-auto rounded-2xl border border-[#242424]/[0.08] bg-white p-8 sm:p-12 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-[#C4A46A]/40 bg-[#FAF9F6] flex items-center justify-center text-[#C4A46A]">
              <Instagram size={22} />
            </div>

            <h3 className="font-cormorant text-2xl text-[#242424] font-normal tracking-wide uppercase mb-2">
              Official Instagram Feed Ready
            </h3>

            <p className="font-montserrat text-xs text-[#242424]/60 leading-relaxed max-w-sm mx-auto mb-6 tracking-wide font-light">
              Synchronizing fresh timepieces and atelier stories from @{feed.handle}.
            </p>

            <a
              href={feed.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#242424] text-white hover:bg-[#C4A46A] font-montserrat text-[11px] uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer"
            >
              <Instagram size={13} />
              <span>Follow Our Journey</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
