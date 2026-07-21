"use client";

import { useRef, useEffect, useState } from "react";
import type { ModelFamilyGroup } from "@/types/product";
import { getAllPrimaryImageCandidates } from "@/lib/imageResolver";
import Link from "next/link";

interface WatchStripProps {
  families: ModelFamilyGroup[];
}

/**
 * A horizontally scrolling strip of watch thumbnails — 
 * mimicking the editorial "gallery strip" seen on premium watch sites.
 * Auto-scrolls slowly and pauses on hover.
 */
export default function WatchStrip({ families }: WatchStripProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // De-duplicate and take a subset
  const watches = (() => {
    const seen = new Set<string>();
    return families.filter((f) => {
      if (seen.has(f.slug)) return false;
      seen.add(f.slug);
      return true;
    }).slice(0, 10);
  })();

  // Auto-scroll effect
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let animId: number;
    const speed = 0.5; // px per frame

    const step = () => {
      if (!isPaused && el) {
        el.scrollLeft += speed;
        // Loop around
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  return (
    <section
      className="relative overflow-hidden border-y"
      style={{ background: "#F5F1EB", borderColor: "rgba(0,0,0,0.06)" }}
    >
      <div
        ref={trackRef}
        className="flex gap-0 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {watches.map((family) => (
          <WatchThumb key={family.slug} family={family} />
        ))}
        {/* Duplicate for seamless loop */}
        {watches.map((family) => (
          <WatchThumb key={`dup-${family.slug}`} family={family} />
        ))}
      </div>
    </section>
  );
}

function WatchThumb({ family }: { family: ModelFamilyGroup }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const primaryVariant = family.variants[0];

  const candidates = (() => {
    if (!primaryVariant) return [];
    return getAllPrimaryImageCandidates(family.familyId, primaryVariant.sku);
  })();

  const imgSrc = candidates[imgIdx] || primaryVariant?.gallery?.primary || "";

  const handleError = () => {
    if (imgIdx < candidates.length - 1) {
      setImgIdx((prev) => prev + 1);
    } else {
      setImgFailed(true);
    }
  };

  return (
    <Link
      href={`/product/${family.slug}`}
      className="shrink-0 w-[160px] sm:w-[200px] aspect-square relative group flex items-center justify-center"
      style={{ background: "radial-gradient(ellipse at center, #E8E2D8, #F5F1EB)" }}
    >
      {imgSrc && !imgFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgSrc}
          alt={family.name}
          className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-110"
          onError={handleError}
          loading="lazy"
        />
      ) : (
        <div className="text-center px-4">
          <span className="font-cormorant text-[14px] text-[#9C9690] italic">{family.name}</span>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-[#003926]/80 to-transparent">
        <span className="font-dm text-[9px] tracking-[0.15em] text-white uppercase truncate max-w-[90%]">
          {family.name}
        </span>
      </div>
    </Link>
  );
}
