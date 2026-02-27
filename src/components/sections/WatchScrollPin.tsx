"use client";

import { useRef, useMemo, useState, useEffect, Component, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Preload } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import Image from "next/image";
import type { MotionValue } from "framer-motion";

/* Error Boundary for WebGL Canvas */
class CanvasErrorBoundary extends Component<
    { children: ReactNode; fallback: ReactNode },
    { hasError: boolean }
> {
    constructor(props: { children: ReactNode; fallback: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}

/* ---------- PANEL DATA ---------- */
const panels = [
    {
        eyebrow: "CRAFTSMANSHIP",
        title: "Every Detail,\nPerfected.",
        body: "Stainless steel construction machined to micron-level precision. Each case polished by hand to achieve mirror-grade finish.",
        badge: "✦ Stainless Steel 316L",
        side: "left" as const,
    },
    {
        eyebrow: "WATER RESISTANCE",
        title: "Built for\nEvery Moment.",
        body: "5 to 10 ATM water resistance. Whether boardroom or beach, Designer World watches perform without compromise.",
        badge: "✦ 5–10 ATM Certified",
        side: "right" as const,
    },
    {
        eyebrow: "MOVEMENT",
        title: "Precision You\nCan Hear.",
        body: "Japanese Quartz movement delivering ±15 seconds per month accuracy. Reliable. Consistent. Uncompromising.",
        badge: "✦ Quartz Precision Movement",
        side: "left" as const,
    },
    {
        eyebrow: "SAPPHIRE GLASS",
        title: "Clarity at\nEvery Glance.",
        body: "Sapphire-coated mineral glass. Scratch-resistant. Anti-reflective. Engineered to show time in perfect clarity.",
        badge: "✦ Sapphire Coated Glass",
        side: "right" as const,
    },
];

const watchColors = [
    { case: "#C4956A", strap: "#2C1810" }, // Rose Gold
    { case: "#C8C8C8", strap: "#111111" }, // Silver Black
    { case: "#555555", strap: "#222222" }, // Gunmetal
    { case: "#003926", strap: "#1A1208" }, // Gold Classic
];

/* ---------- 3D PINNED WATCH ---------- */
function PinnedWatch({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const groupRef = useRef<THREE.Group>(null);
    const caseMat = useRef<THREE.MeshStandardMaterial>(null);
    const strapTopMat = useRef<THREE.MeshStandardMaterial>(null);
    const strapBotMat = useRef<THREE.MeshStandardMaterial>(null);

    const rotY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 4]);
    const scaleVal = useTransform(scrollYProgress, [0, 0.1, 0.5, 0.9, 1], [0.8, 1.1, 1.0, 1.1, 0.8]);

    const caseColors = useMemo(() => watchColors.map((c) => new THREE.Color(c.case)), []);
    const strapColors = useMemo(() => watchColors.map((c) => new THREE.Color(c.strap)), []);

    useFrame(() => {
        if (!groupRef.current) return;

        groupRef.current.rotation.y = rotY.get();
        groupRef.current.rotation.x = Math.sin(Date.now() * 0.0008) * 0.1;
        groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.06;

        const s = scaleVal.get();
        groupRef.current.scale.set(s, s, s);

        // Interpolate colors based on scroll
        const progress = scrollYProgress.get();
        const segment = Math.min(progress * 4, 3);
        const idx = Math.floor(segment);
        const t = segment - idx;
        const nextIdx = Math.min(idx + 1, 3);

        const caseColor = new THREE.Color().lerpColors(caseColors[idx], caseColors[nextIdx], t);
        const strapColor = new THREE.Color().lerpColors(strapColors[idx], strapColors[nextIdx], t);

        if (caseMat.current) caseMat.current.color = caseColor;
        if (strapTopMat.current) strapTopMat.current.color = strapColor;
        if (strapBotMat.current) strapBotMat.current.color = strapColor;
    });

    return (
        <group ref={groupRef}>
            <group rotation={[Math.PI / 2, 0, 0]}>
                {/* Case */}
                <mesh castShadow>
                    <cylinderGeometry args={[1.4, 1.4, 0.35, 64]} />
                    <meshStandardMaterial ref={caseMat} color="#C4956A" metalness={0.95} roughness={0.05} />
                </mesh>
                {/* Dial */}
                <mesh position={[0, 0.16, 0]}>
                    <cylinderGeometry args={[1.3, 1.3, 0.05, 64]} />
                    <meshStandardMaterial color="#FAF8F4" roughness={0.3} />
                </mesh>
                {/* Glass */}
                <mesh position={[0, 0.2, 0]}>
                    <cylinderGeometry args={[1.35, 1.35, 0.05, 64]} />
                    <meshPhysicalMaterial transparent opacity={0.12} roughness={0} transmission={0.9} thickness={0.5} />
                </mesh>
                {/* Markers */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <mesh
                        key={i}
                        position={[
                            Math.sin((i * Math.PI * 2) / 12) * 1.05,
                            0.17,
                            Math.cos((i * Math.PI * 2) / 12) * 1.05,
                        ]}
                        rotation={[0, -(i * Math.PI * 2) / 12, 0]}
                    >
                        <boxGeometry args={[0.05, 0.02, i % 3 === 0 ? 0.18 : 0.1]} />
                        <meshStandardMaterial color="#003926" metalness={0.9} roughness={0.1} />
                    </mesh>
                ))}
                {/* Hands */}
                <mesh position={[0, 0.19, -0.3]}>
                    <boxGeometry args={[0.05, 0.02, 0.6]} />
                    <meshStandardMaterial color="#003926" metalness={1} roughness={0.1} />
                </mesh>
                <mesh position={[0, 0.20, -0.4]}>
                    <boxGeometry args={[0.035, 0.02, 0.85]} />
                    <meshStandardMaterial color="#003926" metalness={1} roughness={0.1} />
                </mesh>
                {/* Crown */}
                <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.22, 16]} />
                    <meshStandardMaterial color="#C4956A" metalness={0.95} roughness={0.1} />
                </mesh>
                {/* Straps */}
                <mesh position={[0, -0.04, -2.2]} rotation={[-0.08, 0, 0]}>
                    <boxGeometry args={[0.85, 0.16, 1.6]} />
                    <meshStandardMaterial ref={strapTopMat} color="#2C1810" roughness={0.8} />
                </mesh>
                <mesh position={[0, -0.04, 2.2]} rotation={[0.08, 0, 0]}>
                    <boxGeometry args={[0.85, 0.16, 1.6]} />
                    <meshStandardMaterial ref={strapBotMat} color="#2C1810" roughness={0.8} />
                </mesh>
            </group>
        </group>
    );
}

/* ---------- TEXT PANEL ---------- */
function TextPanel({
    panel,
    index,
    scrollYProgress,
}: {
    panel: (typeof panels)[0];
    index: number;
    scrollYProgress: MotionValue<number>;
}) {
    const start = index * 0.25;
    const end = (index + 1) * 0.25;
    const mid = start + 0.125;

    const opacity = useTransform(scrollYProgress, [start, start + 0.05, mid, end - 0.05, end], [0, 1, 1, 1, 0]);
    const x = useTransform(
        scrollYProgress,
        [start, start + 0.05, end - 0.05, end],
        [panel.side === "left" ? -60 : 60, 0, 0, panel.side === "left" ? -60 : 60]
    );

    return (
        <motion.div
            className="absolute inset-0 flex items-center pointer-events-none"
            style={{ opacity, x }}
        >
            <div
                className={`w-full max-w-7xl mx-auto px-6 md:px-12 flex ${panel.side === "right" ? "justify-end" : "justify-start"
                    }`}
            >
                <div className="max-w-[420px]">
                    <p
                        className="font-body text-[11px] tracking-[0.3em] uppercase mb-5"
                        style={{ color: "#003926" }}
                    >
                        {panel.eyebrow}
                    </p>
                    <h3
                        className="font-heading text-[36px] md:text-[48px] leading-[1.1] font-light mb-6 whitespace-pre-line"
                        style={{ color: "#1A1918" }}
                    >
                        {panel.title}
                    </h3>
                    <p
                        className="font-body font-light text-[15px] leading-[1.8] mb-6"
                        style={{ color: "#5C5750" }}
                    >
                        {panel.body}
                    </p>
                    <span
                        className="inline-block font-body text-[11px] tracking-[0.15em] px-4 py-2 border"
                        style={{ color: "#003926", borderColor: "#003926" }}
                    >
                        {panel.badge}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

/* ---------- MAIN SECTION ---------- */
export default function WatchScrollPin() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <section ref={sectionRef} className="relative" style={{ height: "400vh" }}>
            <div
                className="sticky top-0 h-screen overflow-hidden"
                style={{ backgroundColor: "#FAF8F4" }}
            >
                {/* Watch Product Image Center */}
                {!isMobile && (
                    <div className="absolute inset-0 z-0 flex items-center justify-center">
                        <motion.div
                            animate={{ y: [-6, 6, -6] }}
                            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                            className="relative w-[300px] h-[420px]"
                        >
                            <Image
                                src="/images/img01.png"
                                alt="Designer World Watch"
                                fill
                                className="object-contain"
                                style={{ filter: "drop-shadow(0 25px 50px rgba(0,57,38,0.25))" }}
                            />
                        </motion.div>
                    </div>
                )}

                {/* Text Panels */}
                {panels.map((panel, i) => (
                    <TextPanel
                        key={i}
                        panel={panel}
                        index={i}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>
        </section>
    );
}
