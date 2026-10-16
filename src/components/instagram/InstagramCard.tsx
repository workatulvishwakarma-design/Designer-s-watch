"use client";

import React, { useState } from "react";
import type { InstagramMediaItem } from "@/lib/instagram";
import { formatCaptionTeaser, formatRelativeTime } from "@/lib/instagram";
import { Instagram, Play, Copy, ArrowUpRight } from "lucide-react";

interface InstagramCardProps {
  post: InstagramMediaItem;
  index: number;
}

export default function InstagramCard({ post, index }: InstagramCardProps) {
  const [imageError, setImageError] = useState(false);
  const isVideo = post.mediaType === "VIDEO" || post.isReel;
  const isCarousel = post.mediaType === "CAROUSEL_ALBUM" || post.isCarousel;
  const displayImage = post.thumbnailUrl || post.mediaUrl;
  const relativeTime = formatRelativeTime(post.timestamp);
  const captionTeaser = formatCaptionTeaser(post.caption, 70);

  // Gracefully hide card if image URL fails to load
  if (imageError) {
    return null;
  }

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={post.caption ? `Instagram post: ${post.caption.slice(0, 50)}` : "View on Instagram"}
      className={`group relative block w-full ${post.aspectRatioClass || "aspect-[4/5]"} rounded-xl overflow-hidden bg-[#121412] border border-white/[0.08] hover:border-[#B8935A]/60 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_36px_rgba(184,147,90,0.18)] transition-all duration-700 ease-out cursor-pointer select-none`}
    >
      {/* Background Media Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={displayImage}
        alt={post.caption ? post.caption.slice(0, 100) : "DSIGNER Horological Moment"}
        loading="lazy"
        decoding="async"
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-[0.92] group-hover:brightness-100 will-change-transform"
      />

      {/* Subtle Base Dark Vignette for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

      {/* Top Media Type Badge (Reel or Carousel) */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 pointer-events-none">
        {isVideo && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#FAF8F4] text-[10px] tracking-widest uppercase font-montserrat font-medium shadow-md">
            <Play size={9} className="fill-[#B8935A] text-[#B8935A]" />
            <span className="text-[9px]">Reel</span>
          </span>
        )}
        {isCarousel && (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#FAF8F4] text-[9px] uppercase font-montserrat shadow-md">
            <Copy size={9} className="text-[#B8935A]" />
          </span>
        )}
      </div>

      {/* Top Left: Relative Time */}
      {relativeTime && (
        <span className="absolute top-3 left-3 z-10 text-[10px] font-montserrat uppercase tracking-wider text-white/60 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded pointer-events-none">
          {relativeTime}
        </span>
      )}

      {/* Luxury Cinematic Editorial Hover Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/95 via-black/60 to-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-5 text-left">
        {/* Top of hover overlay: Instagram Brand Tag */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-montserrat uppercase tracking-[0.25em] text-[#B8935A] font-semibold">
            @designerworld1948
          </span>
          <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#FAF8F4] group-hover:text-[#B8935A] transition-colors">
            <Instagram size={13} />
          </div>
        </div>

        {/* Center/Bottom of hover overlay: Caption & CTA */}
        <div className="space-y-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          {captionTeaser ? (
            <p className="font-montserrat text-xs text-[#FAF8F4]/85 leading-relaxed line-clamp-2 font-light">
              &ldquo;{captionTeaser}&rdquo;
            </p>
          ) : (
            <p className="font-cormorant italic text-sm text-[#FAF8F4]/90">
              The Art of Horological Precision.
            </p>
          )}

          <div className="flex items-center gap-1 text-[11px] font-montserrat uppercase tracking-[0.18em] text-[#B8935A] font-medium pt-1">
            <span>View on Instagram</span>
            <ArrowUpRight size={12} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </a>
  );
}
