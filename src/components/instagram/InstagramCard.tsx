"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import type { InstagramMediaItem } from "@/lib/instagram";
import { formatCaptionTeaser, formatRelativeTime } from "@/lib/instagram";
import { getPlaybackCoordinator } from "@/lib/instagram-playback";
import { Instagram, Play, Pause, Copy, ArrowUpRight } from "lucide-react";

interface InstagramCardProps {
  post: InstagramMediaItem;
  index: number;
}

export default function InstagramCard({ post, index }: InstagramCardProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const isVideo = post.mediaType === "VIDEO" || post.isReel;
  const isCarousel = post.mediaType === "CAROUSEL_ALBUM" || post.isCarousel;
  const displayImage = post.thumbnailUrl || post.mediaUrl;
  const relativeTime = formatRelativeTime(post.timestamp);
  const captionTeaser = formatCaptionTeaser(post.caption, 70);

  // Playable video stream is available if we have videoUrl and video hasn't errored
  const hasPlayableVideo = Boolean(post.videoUrl && !videoError && !imageError);

  // Handle play state notifications from coordinator
  const handlePlayStateChange = useCallback((playing: boolean, blocked = false) => {
    setIsPlaying(playing);
    setIsAutoplayBlocked(blocked);
  }, []);

  // Register with playback coordinator
  useEffect(() => {
    if (!hasPlayableVideo || !containerRef.current || !videoRef.current) {
      return;
    }

    const coordinator = getPlaybackCoordinator();
    const currentVideo = videoRef.current;
    const currentContainer = containerRef.current;

    coordinator.register({
      id: post.id,
      container: currentContainer,
      video: currentVideo,
      onPlayStateChange: handlePlayStateChange,
      intersectionRatio: 0,
      viewportDistance: 9999,
      userPaused: false,
    });

    return () => {
      coordinator.unregister(post.id);
    };
  }, [hasPlayableVideo, post.id, handlePlayStateChange]);

  // Toggle play/pause manually from badge
  const handleTogglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!videoRef.current) return;
    const coordinator = getPlaybackCoordinator();

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setUserPaused(true);
      coordinator.setUserPaused(post.id, true);
    } else {
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setUserPaused(false);
          coordinator.setUserPaused(post.id, false);
        })
        .catch(() => {
          setIsAutoplayBlocked(true);
        });
    }
  };

  // Gracefully hide card if both image and video fail to load
  if (imageError && (!hasPlayableVideo || videoError)) {
    return null;
  }

  return (
    <a
      ref={containerRef}
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={post.caption ? `Instagram post: ${post.caption.slice(0, 50)}` : "View on Instagram"}
      className={`group relative block w-full ${post.aspectRatioClass || "aspect-[4/5]"} rounded-xl overflow-hidden bg-[#121412] border border-white/[0.08] hover:border-[#B8935A]/60 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_36px_rgba(184,147,90,0.18)] transition-all duration-700 ease-out cursor-pointer select-none`}
    >
      {/* 1. Underlying High-Res Poster Image (prevents layout shift & provides fallback) */}
      {!imageError && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={displayImage}
          alt={post.caption ? post.caption.slice(0, 100) : "DSIGNER Horological Moment"}
          loading="lazy"
          decoding="async"
          onError={() => setImageError(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isPlaying ? "opacity-0 scale-105" : "opacity-100 group-hover:scale-108"
          } filter brightness-[0.92] group-hover:brightness-100 will-change-transform`}
        />
      )}

      {/* 2. Real Playable HTML5 Video (Autoplay when in viewport, Max 2 desktop / 1 mobile) */}
      {hasPlayableVideo && (
        <video
          ref={videoRef}
          src={post.videoUrl}
          poster={displayImage}
          muted
          loop
          playsInline
          preload="none"
          onError={() => {
            setVideoError(true);
            setIsPlaying(false);
          }}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out will-change-transform ${
            isPlaying
              ? "opacity-100 scale-100 group-hover:scale-105"
              : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      {/* Subtle Base Dark Vignette for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none z-10" />

      {/* Top Right Media Type Badge (Reel Play indicator or Carousel) */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
        {isVideo && (
          hasPlayableVideo ? (
            <button
              type="button"
              onClick={handleTogglePlay}
              title={isPlaying ? "Pause Reel preview" : "Play Reel preview"}
              aria-label={isPlaying ? "Pause Reel preview" : "Play Reel preview"}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-[#B8935A]/40 hover:border-[#B8935A] text-[#FAF8F4] text-[10px] tracking-widest uppercase font-montserrat font-medium shadow-md transition-all duration-300"
            >
              {isPlaying ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8935A] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B8935A]"></span>
                  </span>
                  <span className="text-[9px] text-[#FAF8F4] font-medium tracking-wider">Reel</span>
                  <Pause size={8} className="text-[#B8935A] ml-0.5 fill-[#B8935A]" />
                </>
              ) : (
                <>
                  <Play size={9} className="fill-[#B8935A] text-[#B8935A]" />
                  <span className="text-[9px]">Reel</span>
                </>
              )}
            </button>
          ) : (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#FAF8F4] text-[10px] tracking-widest uppercase font-montserrat font-medium shadow-md pointer-events-none">
              <Play size={9} className="fill-[#B8935A] text-[#B8935A]" />
              <span className="text-[9px]">Reel</span>
            </span>
          )
        )}
        {isCarousel && (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#FAF8F4] text-[9px] uppercase font-montserrat shadow-md pointer-events-none">
            <Copy size={9} className="text-[#B8935A]" />
          </span>
        )}
      </div>

      {/* Top Left: Relative Time */}
      {relativeTime && (
        <span className="absolute top-3 left-3 z-20 text-[10px] font-montserrat uppercase tracking-wider text-white/70 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded pointer-events-none border border-white/5">
          {relativeTime}
        </span>
      )}

      {/* Luxury Cinematic Editorial Hover Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/95 via-black/60 to-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-5 text-left pointer-events-none">
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
