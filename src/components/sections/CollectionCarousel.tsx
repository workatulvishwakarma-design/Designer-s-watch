"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
}

interface CollectionCarouselProps {
    title: string;
    products: Product[];
}

export default function CollectionCarousel({ title, products }: CollectionCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const progress = scrollLeft / (scrollWidth - clientWidth);
            setScrollProgress(progress);
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.addEventListener("scroll", handleScroll);
            return () => el.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
        }
    };

    return (
        <section className="py-24 bg-[#F5F5F3] text-primaryText overflow-hidden" ref={containerRef}>
            <div className="container mx-auto px-6 md:px-12 xl:px-24 mb-12 flex justify-between items-end">
                <h2 className="text-4xl md:text-5xl font-serif">{title}</h2>

                <div className="hidden md:flex gap-4">
                    <button onClick={scrollLeft} className="p-3 border border-primaryText/20 rounded-full hover:bg-primaryText hover:text-background transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <button onClick={scrollRight} className="p-3 border border-primaryText/20 rounded-full hover:bg-primaryText hover:text-background transition-colors">
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            <div className="relative w-full">
                {/* Carousel Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 px-6 md:px-12 xl:px-24 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 cursor-grab active:cursor-grabbing"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            className="min-w-[80vw] md:min-w-[400px] lg:min-w-[350px] aspect-[3/4] snap-center snap-always relative group flex-shrink-0 bg-white"
                        >
                            <div className="absolute inset-0 overflow-hidden bg-[#EAEAE8] p-8 flex items-center justify-center">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={300}
                                    height={400}
                                    className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                                    loading="lazy"
                                />
                            </div>

                            {/* Hover overlay content */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 p-8 flex flex-col justify-end">
                                <h3 className="text-white font-serif text-2xl mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{product.name}</h3>
                                <p className="text-white/80 font-sans text-sm tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{product.price}</p>

                                <button className="mt-6 w-full py-4 bg-white text-primaryText font-sans uppercase tracking-widest text-xs translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100 outline-none">
                                    Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Progress Bar Container */}
                <div className="container mx-auto px-6 md:px-12 xl:px-24 mt-4">
                    <div className="w-full h-[2px] bg-primaryText/10 relative overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-primaryText origin-left"
                            style={{ scaleX: scrollProgress, width: "100%" }}
                        />
                    </div>
                </div>
            </div>

            <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    );
}
