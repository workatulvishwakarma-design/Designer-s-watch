"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import type { InstagramMediaItem } from "@/lib/instagram";
import { getPlaybackCoordinator } from "@/lib/instagram-playback";

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
  // Playable video stream available if videoUrl exists and hasn't errored
  const hasPlayableVideo = Boolean(post.videoUrl && !videoError && !imageError);

  // Playback coordinator callback
  const handlePlayStateChange = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  // Register with playback coordinator using unique instance index
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

  // Gracefully fallback if image error
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
      className="group relative block w-full h-full aspect-[4/5] overflow-hidden select-none cursor-pointer bg-neutral-100 rounded-none border-none shadow-none"
    >
      {/* 1. High-Res Image / Poster */}
      {!imageError && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={displayImage}
          alt="Instagram visual"
          loading="lazy"
          decoding="async"
          onError={() => setImageError(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 pointer-events-none ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* 2. Real Playable HTML5 Video (Auto-play when visible, muted, loop) */}
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
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 pointer-events-none ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </a>
  );
}
