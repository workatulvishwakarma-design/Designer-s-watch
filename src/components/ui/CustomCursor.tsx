"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [windowFocused, setWindowFocused] = useState(true);
    const [isTouch, setIsTouch] = useState(false);
    const mouse = useRef({ x: 0, y: 0 });
    const ring = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Detect touch device
        const touchDevice = () => {
            return (
                typeof window !== "undefined" && 
                (window.matchMedia("(pointer: coarse)").matches ||
                 "ontouchstart" in window ||
                 navigator.maxTouchPoints > 0)
            );
        };
        
        if (touchDevice()) {
            setIsTouch(true);
            return;
        }

        const handleFocus = () => setWindowFocused(true);
        const handleBlur = () => setWindowFocused(false);
        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleBlur);

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
            }
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        // Hover detection for interactive elements
        const addHoverListeners = () => {
            const interactiveEls = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
            interactiveEls.forEach((el) => {
                el.addEventListener("mouseenter", () => setIsHovering(true));
                el.addEventListener("mouseleave", () => setIsHovering(false));
            });
        };

        addHoverListeners();
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        // Ring lerp animation
        let rafId: number;
        const animate = () => {
            ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
            ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
            if (ringRef.current) {
                const size = isHovering ? 60 : 36;
                ringRef.current.style.width = `${size}px`;
                ringRef.current.style.height = `${size}px`;
                ringRef.current.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`;
            }
            rafId = requestAnimationFrame(animate);
        };
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("blur", handleBlur);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(rafId);
            observer.disconnect();
        };
    }, [isVisible, isHovering]);

    // Hide cursor on touch devices
    if (isTouch) return null;

    const show = windowFocused && isVisible;

    return (
        <>
            {/* Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
                style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#003926",
                    opacity: show && !isHovering ? 1 : 0,
                    transition: "opacity 0.2s ease",
                }}
            />
            {/* Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none"
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1.5px solid #003926",
                    opacity: show ? 0.7 : 0,
                    transition: "width 0.3s ease, height 0.3s ease, opacity 0.2s ease",
                }}
            />
        </>
    );
}
