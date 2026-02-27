"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
}

interface CollectionCarouselProps {
    title: string;
    products: Product[];
    brand?: string;
    backgroundColor?: string;
}

/* ─── Scroll-reveal hook (IntersectionObserver, no libraries) ─── */
function useStaggerReveal(containerRef: React.RefObject<HTMLDivElement | null>) {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const cards = container.querySelectorAll<HTMLElement>("[data-card]");
        cards.forEach((card, i) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(40px)";
            card.style.transition = `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s`;
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        el.style.opacity = "1";
                        el.style.transform = "translateY(0)";
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.1 }
        );

        cards.forEach((card) => observer.observe(card));
        return () => observer.disconnect();
    }, [containerRef]);
}

/* ─── Mouse drag-to-scroll hook ─── */
function useDragScroll(ref: React.RefObject<HTMLDivElement | null>) {
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        isDown.current = true;
        startX.current = e.pageX - el.offsetLeft;
        scrollLeft.current = el.scrollLeft;
        el.style.cursor = "grabbing";
    }, [ref]);

    const onMouseUp = useCallback(() => {
        isDown.current = false;
        if (ref.current) ref.current.style.cursor = "grab";
    }, [ref]);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDown.current || !ref.current) return;
        e.preventDefault();
        const x = e.pageX - ref.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        ref.current.scrollLeft = scrollLeft.current - walk;
    }, [ref]);

    return { onMouseDown, onMouseUp, onMouseLeave: onMouseUp, onMouseMove };
}

export default function CollectionCarousel({
    title,
    products,
    brand = "D'SIGNER",
    backgroundColor = "#FAF8F4",
}: CollectionCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const dragHandlers = useDragScroll(scrollRef);

    useStaggerReveal(scrollRef);

    return (
        <section className="py-[100px]" style={{ backgroundColor }}>
            {/* ─── Collection Header ─── */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2
                        className="font-display text-[30px] md:text-[36px] tracking-[0.08em] mb-3"
                        style={{ color: "#1A1918" }}
                    >
                        {title}
                    </h2>
                    <div
                        className="w-[40px] h-[2px]"
                        style={{ backgroundColor: "#003926" }}
                    />
                </div>

                <button
                    className="font-body text-[12px] tracking-[0.15em] uppercase flex items-center gap-2 group"
                    style={{ color: "#003926" }}
                >
                    View All {products.length} Pieces
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                        →
                    </span>
                </button>
            </div>

            {/* ─── Horizontal Scroll Area ─── */}
            <div
                ref={scrollRef}
                className="flex gap-5 px-6 md:px-12 overflow-x-auto select-none"
                style={{
                    scrollbarWidth: "none",
                    cursor: "grab",
                    padding: "16px 4px 16px 24px",
                    marginLeft: "calc(max((100vw - 1280px) / 2, 0px))",
                }}
                {...dragHandlers}
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        data-card
                        className="group relative overflow-hidden"
                        style={{
                            width: "300px",
                            minWidth: "300px",
                            flexShrink: 0,
                            background: "#FFFFFF",
                            border: "1px solid #E8E0D5",
                            borderRadius: "20px",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.4s cubic-bezier(0.22,1,0.36,1)",
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget;
                            el.style.transform = "translateY(-10px)";
                            el.style.boxShadow = "0 20px 60px rgba(0,0,0,0.13)";
                            el.style.borderColor = "#003926";
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget;
                            el.style.transform = "translateY(0)";
                            el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
                            el.style.borderColor = "#E8E0D5";
                        }}
                    >
                        {/* Image Container */}
                        <div
                            className="relative w-full overflow-hidden flex items-center justify-center"
                            style={{
                                height: "280px",
                                backgroundColor: "#F5F2ED",
                                borderRadius: "20px 20px 0 0",
                                padding: "24px",
                            }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain transition-transform"
                                    style={{
                                        objectPosition: "center",
                                        transitionDuration: "0.4s",
                                        transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                                    }}
                                    sizes="300px"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "scale(1.06)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "scale(1)";
                                    }}
                                />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div style={{ padding: "20px 24px 24px" }}>
                            <span
                                className="block font-body text-[10px] tracking-[0.25em] uppercase"
                                style={{ color: "#003926" }}
                            >
                                {brand}
                            </span>
                            <h3
                                className="font-body font-medium text-[16px] mt-1"
                                style={{ color: "#1A1918" }}
                            >
                                {product.name}
                            </h3>
                            <p
                                className="font-heading italic text-[22px] mt-2"
                                style={{ color: "#003926" }}
                            >
                                {product.price}
                            </p>
                        </div>

                        {/* Slide-up CTA — appears on card hover */}
                        <div
                            className="absolute bottom-0 left-0 w-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                            style={{
                                height: "44px",
                                backgroundColor: "#1A1918",
                                borderRadius: "0 0 20px 20px",
                                transform: "translateY(100%)",
                                transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s cubic-bezier(0.22,1,0.36,1)",
                            }}
                            ref={(el) => {
                                // Use parent group hover via MutationObserver alternative:
                                // We control via CSS by attaching to group
                            }}
                        >
                            <span className="font-body text-[13px] tracking-[0.1em] uppercase text-white">
                                View Details
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* CSS for scrollbar hiding + slide-up CTA on group hover */}
            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
                .group:hover > [data-cta] {
                    transform: translateY(0) !important;
                    opacity: 1 !important;
                }
                @media (max-width: 767px) {
                    [data-card] {
                        width: 240px !important;
                        min-width: 240px !important;
                    }
                    [data-card] > div:first-child {
                        height: 220px !important;
                    }
                }
            `}</style>
        </section>
    );
}
