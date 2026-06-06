"use client";

import React from 'react';

interface LuxuryProgressBarProps {
  progress: number; // 0 to 1
}

const LuxuryProgressBar: React.FC<LuxuryProgressBarProps> = ({ progress }) => {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center">
      {/* Elegant Divider Lines */}
      <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#B8935A] to-transparent mb-4" />
      <div className="w-2 h-2 bg-[#B8935A] rounded-full opacity-60 mb-2" />

      {/* Progress Bar Container */}
      <div className="relative h-40 w-6 flex items-center justify-center">
        {/* Progress Bar Track */}
        <div className="relative w-1 h-full bg-[#F2EDE6] rounded-full overflow-hidden shadow-lg">
          <div
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#B8935A] via-[#D4AF37] to-[#0F4C3A] rounded-full origin-bottom transition-transform duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)]"
            style={{ 
              height: '100%', 
              transform: `scaleY(${progress})` 
            }}
          />
        </div>

        {/* Cursor Glow */}
        <div
          className="absolute w-5 h-5 bg-[#B8935A] rounded-full opacity-70 blur-sm transition-all duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)]"
          style={{ 
            bottom: `calc(${progress * 100}% - 10px)`
          }}
        />
      </div>

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
