"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import type { InstagramMediaItem } from "@/lib/instagram";
import { getPlaybackCoordinator } from "@/lib/instagram-playback";
import { Instagram } from "lucide-react";

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

  const displayImage = post.thumbnailUrl || post.mediaUrl;
  const hasPlayableVideo = Boolean(post.videoUrl && !videoError && !imageError);

  const handlePlayStateChange = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  useEffect(() => {
    if (!hasPlayableVideo || !containerRef.current || !videoRef.current) {
      return;
    }

    const coordinator = getPlaybackCoordinator();
    const currentVideo = videoRef.current;
    const currentContainer = containerRef.current;
    const instanceId = `${post.id}-slide-${index}`;

    coordinator.register({
      id: instanceId,
      container: currentContainer,
      video: currentVideo,
      onPlayStateChange: handlePlayStateChange,
      intersectionRatio: 0,
      viewportDistance: 9999,
      userPaused: false,
    });

    return () => {
      coordinator.unregister(instanceId);
    };
  }, [hasPlayableVideo, post.id, index, handlePlayStateChange]);

  if (imageError && (!hasPlayableVideo || videoError)) {
    return null;
  }

  return (
    <a
      ref={containerRef}
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View on Instagram"
      className="group relative block w-full h-full overflow-hidden select-none cursor-pointer bg-neutral-100 rounded-none border-none shadow-none"
      style={{ aspectRatio: "3 / 5.04" }}
    >
      {/* 1. High-Res Image / Poster */}
      {!imageError && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={displayImage}
          alt="Instagram media"
          loading="lazy"
          decoding="async"
          onError={() => setImageError(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105 ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* 2. Real Playable HTML5 Video (Autoplay when in viewport, muted, loop) */}
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
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105 ${
            isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      {/* 3. The Label Jenn Signature Hover Effect: Soft Vignette + Center Instagram Glyph */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
        <Instagram
          size={32}
          strokeWidth={1.5}
          className="text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] transform scale-75 group-hover:scale-100 transition-transform duration-300 ease-out"
        />
      </div>
    </a>
  );
}
