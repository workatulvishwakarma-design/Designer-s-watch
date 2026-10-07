"use client";

import React from "react";
import type { InstagramLiveStatus } from "@/lib/instagram";
import { Radio } from "lucide-react";

interface InstagramLiveBadgeProps {
  liveStatus: InstagramLiveStatus;
}

export default function InstagramLiveBadge({ liveStatus }: InstagramLiveBadgeProps) {
  // STRICT RULE: Never fake Live status. Only render when verified by API.
  if (!liveStatus || !liveStatus.isLive) {
    return null;
  }

  const liveUrl = liveStatus.liveUrl || "https://www.instagram.com/designerworld1948/live/";

  return (
    <div className="flex justify-center mb-8">
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-red-950/80 via-black/90 to-red-950/80 border border-red-500/40 hover:border-red-400 shadow-[0_0_25px_rgba(239,68,68,0.3)] transition-all duration-300"
        title="Watch Instagram Live Stream"
      >
        {/* Pulsing Live Dot */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>

        {/* Live Text */}
        <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-semibold text-white group-hover:text-red-200 transition-colors">
          LIVE NOW ON INSTAGRAM
        </span>

        <Radio size={14} className="text-red-400 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
}
