"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [windowFocused, setWindowFocused] = useState(true);
    const [isTouch, setIsTouch] = useState(false);

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
            if (!isVisible) setIsVisible(true);
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
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

        return () => {
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("blur", handleBlur);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            observer.disconnect();
        };
    }, [isVisible]);

    // Hide cursor on touch devices
    if (isTouch) return null;

    const show = windowFocused && isVisible;

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none transition-opacity duration-200"
            style={{
                opacity: show ? 1 : 0,
                willChange: "transform",
                zIndex: 2147483647,
            }}
        >
            {/* Normal Cursor Arrow in Green (#003926) */}
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    transform: isHovering ? "scale(1.15)" : "scale(1)",
                    transition: "transform 0.15s ease",
                    filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.3))",
                }}
            >
                <path
                    d="M3 3L10.07 19.97L13.58 12.58L20.97 9.07L3 3Z"
                    fill="#003926"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}
