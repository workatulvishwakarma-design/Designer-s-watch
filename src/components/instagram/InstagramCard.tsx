"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import type { InstagramMediaItem } from "@/lib/instagram";
import { getPlaybackCoordinator } from "@/lib/instagram-playback";
import { Play } from "lucide-react";

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

  const isVideo = post.mediaType === "VIDEO" || post.isReel;
  const displayImage = post.thumbnailUrl || post.mediaUrl;

  // Playable video stream available if we have videoUrl and video hasn't errored
  const hasPlayableVideo = Boolean(post.videoUrl && !videoError && !imageError);

  // Playback coordinator callback
  const handlePlayStateChange = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  // Register with playback coordinator (IntersectionObserver with max 2 desktop / 1 mobile budget)
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

  // Gracefully hide card if image and video both fail to load
  if (imageError && (!hasPlayableVideo || videoError)) {
    return null;
  }

  return (
    <a
      ref={containerRef}
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View DSIGNER post on Instagram"
      className="group relative block w-full aspect-[4/5] rounded-[12px] overflow-hidden bg-[#EFECE6] border border-[#242424]/[0.08] hover:border-[#C4A46A]/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(196,164,106,0.14)] transition-all duration-300 ease-out cursor-pointer select-none"
    >
      {/* 1. High-Res Poster Image (Clean visual focus, lazy-loaded) */}
      {!imageError && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={displayImage}
          alt="DSIGNER Instagram Visual"
          loading="lazy"
          decoding="async"
          onError={() => setImageError(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-300 ease-out ${
            isPlaying ? "opacity-0" : "opacity-100 group-hover:scale-[1.025]"
          } will-change-transform`}
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
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-300 ease-out will-change-transform ${
            isPlaying ? "opacity-100 group-hover:scale-[1.025]" : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      {/* 3. Subtle ambient hover glow (no heavy dark overlays or text) */}
      <div className="absolute inset-0 bg-[#C4A46A]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* 4. Tiny, elegant Reel indicator (Minimal glass pill, no distracting labels) */}
      {isVideo && (
        <div className="absolute top-2.5 right-2.5 z-20 flex items-center justify-center w-6 h-6 rounded-full bg-black/40 backdrop-blur-md border border-white/25 text-white shadow-sm pointer-events-none transition-transform duration-200 group-hover:scale-105">
          {isPlaying ? (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4A46A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C4A46A]"></span>
            </span>
          ) : (
            <Play size={9} className="fill-white text-white ml-0.5" />
          )}
        </div>
      )}
    </a>
  );
}
