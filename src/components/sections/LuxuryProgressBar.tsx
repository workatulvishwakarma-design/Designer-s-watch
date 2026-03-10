"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LuxuryProgressBarProps {
  progress: number; // 0 to 1
}

const LuxuryProgressBar: React.FC<LuxuryProgressBarProps> = ({ progress }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        scaleY: progress,
        duration: 0.3,
        ease: "power3.out",
        transformOrigin: "bottom"
      });
    }

    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        y: `${progress * 100}%`,
        duration: 0.3,
        ease: "power3.out"
      });
    }
  }, [progress]);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center">
      {/* Elegant Divider Lines */}
      <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#B8935A] to-transparent mb-4" />
      <div className="w-2 h-2 bg-[#B8935A] rounded-full opacity-60 mb-2" />

      {/* Progress Bar */}
      <div className="relative w-1 h-40 bg-[#F2EDE6] rounded-full overflow-hidden shadow-lg">
        <div
          ref={barRef}
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#B8935A] via-[#D4AF37] to-[#0F4C3A] rounded-full transform scale-y-0 origin-bottom"
          style={{ height: '100%' }}
        />
      </div>

      {/* Cursor Glow */}
      <div
        ref={cursorRef}
        className="absolute right-0 w-6 h-6 bg-[#B8935A] rounded-full opacity-70 blur-sm transform -translate-y-1/2"
        style={{ top: '0%' }}
      />

      {/* Decorative Dots */}
      <div className="mt-4 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              progress > (i + 1) / 4 ? 'bg-[#B8935A] scale-125 shadow-lg' : 'bg-[#D4C5B0] scale-100'
            }`}
          />
        ))}
      </div>

      {/* Bottom Divider */}
      <div className="w-2 h-2 bg-[#B8935A] rounded-full opacity-60 mt-2" />
      <div className="w-px h-16 bg-gradient-to-t from-transparent via-[#B8935A] to-transparent mt-4" />
    </div>
  );
};

export default LuxuryProgressBar;
