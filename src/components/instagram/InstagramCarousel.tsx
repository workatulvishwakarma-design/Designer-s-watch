"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import type { InstagramMediaItem } from "@/lib/instagram";
import InstagramCard from "./InstagramCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface InstagramCarouselProps {
  posts: InstagramMediaItem[];
  profileUrl?: string;
}

export default function InstagramCarousel({ posts }: InstagramCarouselProps) {
  // If fewer than 4 posts, repeat them so infinite scrolling has enough content
  const basePosts = useMemo(() => {
    if (!posts || posts.length === 0) return [];
    let list = [...posts];
    while (list.length < 8) {
      list = [...list, ...posts];
    }
    return list;
  }, [posts]);

  // Triple clone for seamless infinite looping: [clones_before, original_set, clones_after]
  const extendedPosts = useMemo(() => {
    return [...basePosts, ...basePosts, ...basePosts];
  }, [basePosts]);

  const n = basePosts.length;
  // Start in the middle set
  const [currentIndex, setCurrentIndex] = useState(n);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [stepSize, setStepSize] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Measure card width + gap dynamically
  const measureStep = useCallback(() => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.children[0] as HTMLElement | undefined;
    if (firstCard) {
      const rect = firstCard.getBoundingClientRect();
      // 3px gap matching reference
      setStepSize(rect.width + 3);
    }
  }, []);

  useEffect(() => {
    measureStep();
    window.addEventListener("resize", measureStep);
    return () => window.removeEventListener("resize", measureStep);
  }, [measureStep]);

  // Slide navigation
  const slideTo = useCallback((index: number, animate = true) => {
    setIsTransitioning(animate);
    setCurrentIndex(index);
  }, []);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    slideTo(currentIndex + 1, true);
  }, [currentIndex, isTransitioning, slideTo]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    slideTo(currentIndex - 1, true);
  }, [currentIndex, isTransitioning, slideTo]);

  // Auto-slide every 2500ms
  useEffect(() => {
    if (isHovered || isDragging) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, 2500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [handleNext, isHovered, isDragging]);

  // Seamless wrap-around when reaching ends of clone boundaries
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex >= 2 * n) {
      // Wrapped past end of middle set: jump back to start of middle set invisibly
      slideTo(currentIndex - n, false);
    } else if (currentIndex < n) {
      // Wrapped before start of middle set: jump forward to end of middle set invisibly
      slideTo(currentIndex + n, false);
    }
  };

  // Touch gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    isHorizontalSwipeRef.current = null;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diffX = e.touches[0].clientX - touchStartXRef.current;
    const diffY = e.touches[0].clientY - touchStartYRef.current;

    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
        isHorizontalSwipeRef.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalSwipeRef.current) {
      // Horizontal swipe detected - prevent page scroll
      if (e.cancelable) e.preventDefault();
      setDragOffset(diffX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (Math.abs(dragOffset) > 40) {
      if (dragOffset < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setDragOffset(0);
    isHorizontalSwipeRef.current = null;
  };

  // Calculate transform
  const translateX = stepSize > 0 ? -(currentIndex * stepSize) + dragOffset : 0;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden select-none"
    >
      {/* Edge-to-edge sliding track */}
      <div
        ref={trackRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translate3d(${translateX}px, 0, 0)`,
          transition: isTransitioning && !isDragging ? "transform 600ms cubic-bezier(0.25, 1, 0.5, 1)" : "none",
          gap: "3px",
        }}
        className="flex w-full will-change-transform cursor-grab active:cursor-grabbing"
      >
        {extendedPosts.map((post, idx) => (
          <div
            key={`${post.id}-${idx}`}
            className="flex-shrink-0 w-[calc((100%-3px*0.4)/1.4)] min-[375px]:w-[calc((100%-3px)/2)] md:w-[calc((100%-6px)/3)] lg:w-[calc((100%-12px)/5)] 2xl:w-[calc((100%-18px)/7)] aspect-[4/5]"
          >
            <InstagramCard post={post} index={idx} />
          </div>
        ))}
      </div>

      {/* Floating White Circular Navigation Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Instagram item"
        className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black shadow-[0_2px_12px_rgba(0,0,0,0.18)] hover:shadow-[0_4px_18px_rgba(0,0,0,0.26)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer border border-black/[0.04]"
      >
        <ChevronLeft size={18} className="text-black stroke-[2.2] -ml-0.5" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Instagram item"
        className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black shadow-[0_2px_12px_rgba(0,0,0,0.18)] hover:shadow-[0_4px_18px_rgba(0,0,0,0.26)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer border border-black/[0.04]"
      >
        <ChevronRight size={18} className="text-black stroke-[2.2] -mr-0.5" />
      </button>
    </div>
  );
}
