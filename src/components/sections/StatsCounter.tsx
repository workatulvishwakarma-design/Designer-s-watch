"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(end: number, duration: number, inView: boolean) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const increment = end / (duration * 60);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [inView, end, duration]);
    return count;
}

interface StatItemProps {
    value: number;
    suffix: string;
    label: string;
    delay: number;
}

function StatItem({ value, suffix, label, delay }: StatItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const count = useCountUp(value, 2, inView);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay }}
            className="flex flex-col items-center gap-3 relative"
        >
            <span
                className="font-display text-[56px] md:text-[72px] leading-none"
                style={{ color: "#003926" }}
            >
                {count}{suffix}
            </span>
            <span
                className="font-body font-light text-[11px] md:text-[13px] tracking-[0.15em] uppercase text-center max-w-[160px]"
                style={{ color: "#9C9690" }}
            >
                {label}
            </span>
        </motion.div>
    );
}

export default function StatsCounter() {
    const stats = [
        { value: 4, suffix: "+", label: "Generations of Expertise" },
        { value: 20, suffix: "+", label: "International Brands" },
        { value: 500, suffix: "+", label: "Private Labels Manufactured" },
        { value: 100, suffix: "+", label: "Multi-Brand Outlets" },
    ];

    return (
        <section className="py-[100px]" style={{ backgroundColor: "#FAF8F4" }}>
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="relative flex justify-center">
                            <StatItem
                                value={stat.value}
                                suffix={stat.suffix}
                                label={stat.label}
                                delay={i * 0.15}
                            />
                            {/* Gold vertical divider */}
                            {i < stats.length - 1 && (
                                <div
                                    className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[60px]"
                                    style={{ backgroundColor: "#E0D8CE" }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
