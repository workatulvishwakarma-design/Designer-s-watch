"use client";

interface GrainOverlayProps {
    opacity?: number;
}

export default function GrainOverlay({ opacity = 0.035 }: GrainOverlayProps) {
    return (
        <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0" 
            style={{ opacity }}
        >
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
