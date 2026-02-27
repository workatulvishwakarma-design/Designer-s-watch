"use client";

export default function GrainOverlay() {
    return (
        <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none z-0">
            <filter id="grain">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="3"
                    stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
    );
}
