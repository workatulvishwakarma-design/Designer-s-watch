"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
    value: number;
    suffix?: string;
    duration?: number;
}

function Counter({ value, suffix = "", duration = 2 }: CounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            // Calculate current value based on progress and duration
            // using easeOutExpo for smooth deceleration
            const percent = Math.min(progress / (duration * 1000), 1);
            const easeOut = percent === 1 ? 1 : 1 - Math.pow(2, -10 * percent);

            const currentVal = Math.floor(easeOut * value);

            setCount(currentVal);

            if (percent < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setCount(value);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className="text-5xl md:text-7xl font-serif">
            {count}{suffix}
        </span>
    );
}

export default function StatsCounter() {
    const stats = [
        { value: 4, label: "Generations of Expertise" },
        { value: 20, suffix: "+", label: "International Brands" },
        { value: 500, suffix: "+", label: "Private Labels Manufactured" },
        { value: 100, suffix: "+", label: "Multi-Brand Outlets" },
    ];

    return (
        <section className="py-24 bg-white text-primaryText">
            <div className="container mx-auto px-6 md:px-12 xl:px-24">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                            className="flex flex-col items-center justify-center gap-4"
                        >
                            <div className="text-secondary/80 font-serif text-[4rem] md:text-[5.5rem] leading-none mb-2"
                                style={{
                                    WebkitTextStroke: "1px #0E3D2B",
                                    WebkitTextFillColor: "transparent"
                                }}>
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-70 max-w-[140px] leading-relaxed mx-auto">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
