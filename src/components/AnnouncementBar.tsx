"use client"

import { X } from "lucide-react"
import { useState } from "react"

export function AnnouncementBar({ text }: { text: string }) {
  const [visible, setVisible] = useState(true)
  
  if (!visible) return null

  return (
    <div id="announcement-bar" className="bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] py-2.5 text-center relative z-[110]">
      <span>{text}</span>
      <button 
        onClick={() => setVisible(false)} 
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Close announcement"
      >
        <X size={12} />
      </button>
    </div>
  )
}
