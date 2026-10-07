"use client";

import React, { useState } from "react";
import type { InstagramPost } from "@/lib/instagram";
import { Instagram, Play } from "lucide-react";

interface InstagramCardProps {
  post: InstagramPost;
  index: number;
}

export default function InstagramCard({ post, index }: InstagramCardProps) {
  const [imageError, setImageError] = useState(false);
  const isVideo = post.mediaType === "VIDEO" || post.isReel;
  const displayImage = post.thumbnailUrl || post.mediaUrl;

  // If the media genuinely cannot load (e.g. expired CDN token), gracefully hide this card
  // rather than rendering an empty black box or broken alt text.
  if (imageError) {
    return null;
  }

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View on Instagram"
      className="group relative block w-full aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-[#F2EDE6] border border-[#E0D8CE]/70 shadow-sm hover:shadow-[0_12px_30px_rgba(0,57,38,0.12)] hover:border-[#B8935A]/60 transition-all duration-500 cursor-pointer select-none"
    >
      {/* Media Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={displayImage}
        alt=""
        loading="lazy"
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Reel indicator — minimal and only rendered when media is a video/reel */}
      {isVideo && (
        <span className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-[9px] uppercase tracking-wider font-medium pointer-events-none">
          <Play size={8} fill="currentColor" strokeWidth={0} />
          <span>Reel</span>
        </span>
      )}

      {/* Subtle Luxury Hover Overlay */}
      <div className="absolute inset-0 z-20 bg-black/35 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center">
        <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-md">
          <Instagram size={18} className="text-[#D4AA72]" />
        </div>
      </div>
    </a>
  );
}
