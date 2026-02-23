"use client";

import { useScroll, useSpring, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });
        lenisRef.current = lenis;

        let requestAnimationFrameId: number;

        // requestAnimationFrame loop for Lenis
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrameId = requestAnimationFrame(raf);
        }
        requestAnimationFrameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(requestAnimationFrameId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
