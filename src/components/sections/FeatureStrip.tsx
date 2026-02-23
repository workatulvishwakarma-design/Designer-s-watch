"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "framer-motion";

interface FeatureStripProps {
    baseVelocity: number;
}

export default function FeatureStrip({ baseVelocity = 2 }: FeatureStripProps) {
    const features = [
        "STAINLESS STEEL CONSTRUCTION",
        "5–10 ATM WATER RESISTANCE",
        "SAPPHIRE COATED GLASS",
        "OEM & ODM WATCH SOLUTIONS",
        "TRUSTED BY GLOBAL BRANDS",
        "DURABILITY MEETS DESIGN",
    ];

    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    // Wrap value conceptually: simple mod
    // We need to wrap between 0 and -50% (since we doubled the array)
    // We will assume 100% is the actual width we translate across
    const x = useTransform(baseX, (v) => `${(v % 50) - 50}%`);

    return (
        <div className="overflow-hidden whitespace-nowrap bg-[#0E3D2B] text-white py-6 flex items-center hover:pause">
            <motion.div className="flex gap-12 text-sm sm:text-base md:text-lg lg:text-xl font-sans tracking-widest uppercase items-center will-change-transform" style={{ x }}>
                {[...features, ...features, ...features, ...features].map((feature, idx) => (
                    <span key={idx} className="flex items-center gap-12 group cursor-pointer transition-opacity hover:opacity-80">
                        <span>{feature}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform duration-300"></span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
