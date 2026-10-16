"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import type { InstagramMediaItem } from "@/lib/instagram";
import InstagramCard from "./InstagramCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface InstagramCarouselProps {
  posts: InstagramMediaItem[];
  profileUrl?: string;
}

const GAP_PX = 2.5;

export default function InstagramCarousel({ posts }: InstagramCarouselProps) {
  // If fewer than 8 posts, repeat them so infinite scrolling has plenty of buffer
  const basePosts = useMemo(() => {
    if (!posts || posts.length === 0) return [];
    let list = [...posts];
    while (list.length < 8) {
      list = [...list, ...posts];
    }
    return list;
  }, [posts]);

  // Triple buffer for seamless infinite looping
  const extendedPosts = useMemo(() => {
    return [...basePosts, ...basePosts, ...basePosts];
  }, [basePosts]);

  const n = basePosts.length;
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
      if (rect.width > 0) {
        setStepSize(rect.width + GAP_PX);
      }
    }
  }, []);

  useEffect(() => {
    measureStep();
    const handleResize = () => measureStep();
    window.addEventListener("resize", handleResize);
    // Double-check step after initial hydration
    const timer = setTimeout(measureStep, 100);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
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

  // Seamless wrap-around when reaching ends of clone sets
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex >= 2 * n) {
      slideTo(currentIndex - n, false);
    } else if (currentIndex < n) {
      slideTo(currentIndex + n, false);
    }
  };

  // Touch handlers for mobile swipe
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

  const translateX = stepSize > 0 ? -(currentIndex * stepSize) + dragOffset : 0;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden select-none"
    >
      {/* Edge-to-edge sliding track with hairline gaps */}
      <div
        ref={trackRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translate3d(${translateX}px, 0, 0)`,
          transition: isTransitioning && !isDragging ? "transform 600ms cubic-bezier(0.25, 1, 0.5, 1)" : "none",
          gap: `${GAP_PX}px`,
        }}
        className="flex w-full will-change-transform cursor-grab active:cursor-grabbing"
      >
        {extendedPosts.map((post, idx) => (
          <div
            key={`${post.id}-${idx}`}
            style={{ aspectRatio: "3 / 4.2" }}
            className="flex-shrink-0 w-[calc((100%-2.5px*0.4)/1.4)] min-[375px]:w-[calc((100%-2.5px)/2)] sm:w-[calc((100%-5px)/3)] lg:w-[calc((100%-10px)/5)] 2xl:w-[calc((100%-15px)/7)]"
          >
            <InstagramCard post={post} index={idx} />
          </div>
        ))}
      </div>

      {/* Sleek Floating Circular Navigation Disc (Left) */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Instagram slide"
        className="absolute left-3 sm:left-5 md:left-7 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-black shadow-[0_3px_14px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.26)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer border border-black/5"
      >
        <ChevronLeft size={20} strokeWidth={1.8} className="text-black stroke-[2] -ml-0.5" />
      </button>

      {/* Sleek Floating Circular Navigation Disc (Right) */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Instagram slide"
        className="absolute right-3 sm:right-5 md:right-7 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-black shadow-[0_3px_14px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.26)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer border border-black/5"
      >
        <ChevronRight size={20} strokeWidth={1.8} className="text-black stroke-[2] -mr-0.5" />
      </button>
    </div>
  );
}
