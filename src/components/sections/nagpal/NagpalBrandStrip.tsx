"use client";

const brands = [
  "TISSOT",
  "DANIEL KLEIN",
  "CIGA DESIGN",
  "SANTA BARBARA POLO",
  "MAXELL",
  "RENATA",
  "SONY",
  "SEIZAIKEN",
  "CASIO",
];

export default function NagpalBrandStrip() {
  return (
    <section
      className="relative py-10 md:py-14 overflow-hidden"
      style={{ backgroundColor: "#FAF8F4" }}
    >
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" aria-hidden>
        <filter id="nagpal-brand-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#nagpal-brand-grain)" />
      </svg>

      <div className="relative z-10 text-center mb-8 md:mb-10">
        <p
          className="font-body text-[13px] tracking-[0.2em]"
          style={{ color: "#B8935A" }}
        >
          Brands We Work With
        </p>
      </div>

      {/* Fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[200px] z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to right, #FAF8F4, transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-[200px] z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to left, #FAF8F4, transparent)",
        }}
      />

      {/* Row 1 - scroll left */}
      <div className="relative overflow-hidden py-2 group/marquee">
        <div
          className="flex gap-8 md:gap-12 whitespace-nowrap w-max group-hover/marquee:[animation-play-state:paused]"
          style={{
            animation: "nagpalMarqueeLeft 30s linear infinite",
          }}
        >
          {[...brands, ...brands].map((name, i) => (
            <span key={`${name}-${i}`} className="flex items-center gap-8 md:gap-12">
              <span
                className="font-body font-semibold text-[16px] md:text-[18px]"
                style={{ color: "#1A1918", opacity: 0.5 }}
              >
                {name}
              </span>
              <span className="text-[#B8935A] text-sm">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 - scroll right */}
      <div className="relative overflow-hidden py-2 group/marquee2">
        <div
          className="flex gap-8 md:gap-12 whitespace-nowrap w-max group-hover/marquee2:[animation-play-state:paused]"
          style={{
            animation: "nagpalMarqueeRight 35s linear infinite",
          }}
        >
          {[...brands, ...brands].map((name, i) => (
            <span key={`2-${name}-${i}`} className="flex items-center gap-8 md:gap-12">
              <span
                className="font-body font-semibold text-[16px] md:text-[18px]"
                style={{ color: "#1A1918", opacity: 0.35 }}
              >
                {name}
              </span>
              <span className="text-[#B8935A] text-sm">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 py-6 md:py-8 max-w-7xl mx-auto px-6">
        <div
          className="flex-1 h-px bg-gradient-to-r from-transparent via-[#B8935A]/25 to-transparent"
        />
        <span className="text-[#B8935A] text-xs">✦</span>
        <div
          className="flex-1 h-px bg-gradient-to-r from-transparent via-[#B8935A]/25 to-transparent"
        />
      </div>

      <style jsx global>{`
        @keyframes nagpalMarqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes nagpalMarqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
