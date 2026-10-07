import React from "react";
import { fetchInstagramFeed } from "@/lib/instagram";
import InstagramCard from "@/components/instagram/InstagramCard";
import InstagramLiveBadge from "@/components/instagram/InstagramLiveBadge";
import { ArrowUpRight, Instagram } from "lucide-react";

export default async function InstagramSection() {
  const feed = await fetchInstagramFeed();
  const hasLivePosts = feed.isConfigured && feed.posts && feed.posts.length > 0;

  return (
    <section 
      aria-label="DSIGNER Instagram Feed"
      className="relative w-full bg-[#FAF8F4] border-t border-[#E0D8CE]/60 pt-16 pb-16 md:pt-20 md:pb-20 overflow-hidden"
    >
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 xl:px-12">
        {/* Section Header with Restrained Luxury Scale */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2.5 mb-2.5">
            <span className="w-6 sm:w-10 h-px bg-[#B8935A]/50" />
            <a
              href={feed.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#003926] font-semibold hover:text-[#B8935A] transition-colors"
            >
              <Instagram size={12} className="text-[#B8935A]" />
              @{feed.handle}
            </a>
            <span className="w-6 sm:w-10 h-px bg-[#B8935A]/50" />
          </div>

          {/* Restrained Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-[#1A1918] tracking-widest uppercase mb-2.5 leading-tight">
            Follow D&apos;SIGNER on Instagram
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#5C5750] font-body tracking-wider max-w-md mx-auto leading-relaxed">
            Discover our latest horological creations, atelier craft, and stories in motion.
          </p>

          {/* Optional Live Broadcast Badge (Strictly rendered only when confirmed live) */}
          {feed.liveStatus?.isLive && (
            <div className="mt-5">
              <InstagramLiveBadge liveStatus={feed.liveStatus} />
            </div>
          )}
        </div>

        {/* Content Area: Real Feed Gallery OR Refined Luxury Setup State */}
        {hasLivePosts ? (
          <>
            {/* Responsive 6-column Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3.5 lg:gap-4 w-full">
              {feed.posts.map((post, index) => (
                <InstagramCard key={post.id} post={post} index={index} />
              ))}
            </div>

            {/* Bottom CTA Button */}
            <div className="mt-10 md:mt-12 text-center">
              <a
                href={feed.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#003926] text-[#003926] hover:bg-[#003926] hover:text-white transition-all duration-300 font-sans text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>View Instagram</span>
                <ArrowUpRight size={13} className="text-[#B8935A]" />
              </a>
            </div>
          </>
        ) : (
          /* Refined Luxury Editorial State (Shown cleanly before credentials are added) */
          <div className="max-w-xl mx-auto rounded-2xl border border-[#E0D8CE] bg-white/70 p-8 sm:p-10 text-center shadow-[0_4px_24px_rgba(0,0,0,0.03)] backdrop-blur-sm">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-[#B8935A]/40 bg-[#FAF8F4] flex items-center justify-center text-[#003926]">
              <Instagram size={22} className="text-[#003926]" />
            </div>
            
            <h3 className="font-display text-lg sm:text-xl text-[#1A1918] tracking-widest uppercase mb-2">
              Instagram Live Feed Ready
            </h3>
            
            <p className="font-body text-xs sm:text-sm text-[#5C5750] leading-relaxed max-w-sm mx-auto mb-6 tracking-wide">
              The live social gallery will automatically synchronize once Meta Instagram API credentials are configured.
            </p>

            <a
              href={feed.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#003926] hover:bg-[#00271A] text-white border border-[#003926] hover:border-[#B8935A]/50 transition-all duration-300 font-sans text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Visit @{feed.handle} on Instagram</span>
              <ArrowUpRight size={13} className="text-[#D4AA72]" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
