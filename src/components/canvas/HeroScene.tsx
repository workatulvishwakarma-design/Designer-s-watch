"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import { Environment, Float, Preload, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useScroll, useTransform } from "framer-motion";

const WATCH_CONFIGS = [
    { // Slide 0: Rose Gold
        case: "#b76e79", bezel: "#0A192F", dial: "#0b1b33",
        markerBorder: "#b76e79", markerFill: "#e0f7fa",
        hands: "#b76e79", secondHand: "#ff3333", strap: "#0A192F"
    },
    { // Slide 1: Silver Black
        case: "#EAEAE9", bezel: "#1a1a1a", dial: "#f4f4f4",
        markerBorder: "#1a1a1a", markerFill: "#2a2a2a",
        hands: "#1a1a1a", secondHand: "#3366ff", strap: "#222222"
    },
    { // Slide 2: Gunmetal Orange
        case: "#333333", bezel: "#111111", dial: "#1a1a1a",
        markerBorder: "#555555", markerFill: "#ff6600",
        hands: "#EAEAE9", secondHand: "#ff6600", strap: "#111111"
    }
];

function WatchModel({ scrollYProgress, currentSlide }: { scrollYProgress: any, currentSlide: number }) {
    const modelRef = useRef<THREE.Group>(null);
    const secondHandRef = useRef<THREE.Group>(null);
    const minuteHandRef = useRef<THREE.Group>(null);
    const hourHandRef = useRef<THREE.Group>(null);

    const config = WATCH_CONFIGS[currentSlide % WATCH_CONFIGS.length];

    // Scroll rotation
    const rotateY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);

    // Slide spin animation target
    const [spinTarget, setSpinTarget] = useState(0);

    useEffect(() => {
        // Spin an extra full rotation on slide change
        setSpinTarget(prev => prev + Math.PI * 2);
    }, [currentSlide]);

    useFrame((state) => {
        if (!modelRef.current) return;

        // Smooth spin factor
        const currentSpin = modelRef.current.userData.spin || 0;
        const newSpin = THREE.MathUtils.lerp(currentSpin, spinTarget, 0.05);
        modelRef.current.userData.spin = newSpin;

        // Add subtle idle rotation + smooth spin
        modelRef.current.rotation.y = rotateY.get() + state.clock.getElapsedTime() * 0.1 + newSpin;
        modelRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;

        // Mouse damping interaction
        const targetX = (state.pointer.x * Math.PI) / 8;
        const targetY = (state.pointer.y * Math.PI) / 8;

        modelRef.current.rotation.x += 0.05 * (targetY - modelRef.current.rotation.x);
        modelRef.current.rotation.z += 0.05 * (targetX - modelRef.current.rotation.z);

        // Animate watch hands accurately
        const time = new Date();
        const millis = time.getMilliseconds();
        const seconds = time.getSeconds() + millis / 1000;
        const minutes = time.getMinutes() + seconds / 60;
        const hours = (time.getHours() % 12) + minutes / 60;

        if (secondHandRef.current) {
            // Smooth sweep second hand
            secondHandRef.current.rotation.y = -seconds * (Math.PI * 2 / 60);
        }
        if (minuteHandRef.current) {
            minuteHandRef.current.rotation.y = -minutes * (Math.PI * 2 / 60);
        }
        if (hourHandRef.current) {
            hourHandRef.current.rotation.y = -hours * (Math.PI * 2 / 12);
        }
    });

    return (
        <group ref={modelRef}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    {/* Main Case (Color configured) */}
                    <mesh castShadow receiveShadow>
                        <cylinderGeometry args={[1.5, 1.4, 0.4, 64]} />
                        <meshPhysicalMaterial color={config.case} metalness={1} roughness={0.15} clearcoat={1} />
                    </mesh>

                    {/* Exterior Bezel */}
                    <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
                        <torusGeometry args={[1.4, 0.15, 64, 64]} />
                        <meshPhysicalMaterial color={config.bezel} metalness={0.7} roughness={0.1} clearcoat={1} />
                    </mesh>

                    {/* Inner Dial */}
                    <mesh position={[0, 0.15, 0]} receiveShadow>
                        <cylinderGeometry args={[1.35, 1.35, 0.05, 64]} />
                        <meshStandardMaterial color={config.dial} roughness={0.6} metalness={0.4} />
                    </mesh>

                    {/* Inner Chapter Ring */}
                    <mesh position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
                        <torusGeometry args={[1.25, 0.02, 32, 64]} />
                        <meshPhysicalMaterial color={config.markerBorder} metalness={0.9} roughness={0.2} />
                    </mesh>

                    {/* Hour Markers */}
                    {Array.from({ length: 12 }).map((_, i) => (
                        <group
                            key={i}
                            position={[
                                Math.sin((i * Math.PI * 2) / 12) * 1.05,
                                0.18,
                                Math.cos((i * Math.PI * 2) / 12) * 1.05
                            ]}
                            rotation={[0, -(i * Math.PI * 2) / 12, 0]}
                        >
                            {/* Outer marker casing */}
                            <mesh position={[0, 0, 0]}>
                                <boxGeometry args={[0.08, 0.02, 0.25]} />
                                <meshStandardMaterial color={config.markerBorder} metalness={1} roughness={0.2} />
                            </mesh>
                            {/* Inner luminescent fill */}
                            <mesh position={[0, 0.01, 0]}>
                                <boxGeometry args={[0.04, 0.02, 0.2]} />
                                <meshStandardMaterial color={config.markerFill} emissive={config.markerFill} emissiveIntensity={0.5} roughness={0.4} />
                            </mesh>
                        </group>
                    ))}

                    {/* Minute ticks */}
                    {Array.from({ length: 60 }).filter((_, i) => i % 5 !== 0).map((_, i) => (
                        <mesh
                            key={`tick-${i}`}
                            position={[
                                Math.sin((i * Math.PI * 2) / 60) * 1.15,
                                0.16,
                                Math.cos((i * Math.PI * 2) / 60) * 1.15
                            ]}
                            rotation={[0, -(i * Math.PI * 2) / 60, 0]}
                        >
                            <boxGeometry args={[0.02, 0.01, 0.06]} />
                            <meshStandardMaterial color="#B0B5A7" roughness={0.5} />
                        </mesh>
                    ))}

                    {/* Center Pin */}
                    <mesh position={[0, 0.23, 0]}>
                        <cylinderGeometry args={[0.06, 0.06, 0.06, 32]} />
                        <meshPhysicalMaterial color={config.markerBorder} metalness={1} roughness={0.1} />
                    </mesh>

                    {/* Hour Hand */}
                    <group ref={hourHandRef} position={[0, 0.18, 0]}>
                        <mesh position={[0, 0, -0.35]}>
                            <boxGeometry args={[0.07, 0.02, 0.7]} />
                            <meshPhysicalMaterial color={config.hands} metalness={1} roughness={0.2} />
                        </mesh>
                        <mesh position={[0, 0.01, -0.4]}>
                            <boxGeometry args={[0.03, 0.02, 0.4]} />
                            <meshStandardMaterial color={config.markerFill} emissive={config.markerFill} emissiveIntensity={0.5} />
                        </mesh>
                    </group>

                    {/* Minute Hand */}
                    <group ref={minuteHandRef} position={[0, 0.20, 0]}>
                        <mesh position={[0, 0, -0.45]}>
                            <boxGeometry args={[0.05, 0.02, 1.0]} />
                            <meshPhysicalMaterial color={config.hands} metalness={1} roughness={0.2} />
                        </mesh>
                        <mesh position={[0, 0.01, -0.55]}>
                            <boxGeometry args={[0.02, 0.02, 0.6]} />
                            <meshStandardMaterial color={config.markerFill} emissive={config.markerFill} emissiveIntensity={0.5} />
                        </mesh>
                    </group>

                    {/* Second Hand */}
                    <group ref={secondHandRef} position={[0, 0.22, 0]}>
                        <mesh position={[0, 0, -0.55]}>
                            <boxGeometry args={[0.015, 0.01, 1.3]} />
                            <meshPhysicalMaterial color={config.secondHand} metalness={0.2} roughness={0.4} clearcoat={1} />
                        </mesh>
                        {/* Second hand counter-balance */}
                        <mesh position={[0, 0, 0.2]}>
                            <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
                            <meshPhysicalMaterial color={config.secondHand} metalness={0.2} roughness={0.4} />
                        </mesh>
                    </group>

                    {/* Crown */}
                    <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                        <cylinderGeometry args={[0.18, 0.18, 0.2, 32]} />
                        <meshPhysicalMaterial color={config.case} metalness={1} roughness={0.3} />
                    </mesh>

                    {/* Lugs */}
                    {[
                        [0.8, -1.4], [-0.8, -1.4],
                        [0.8, 1.4], [-0.8, 1.4]
                    ].map(([x, z], i) => (
                        <mesh key={i} position={[x, 0, z]} castShadow receiveShadow>
                            <boxGeometry args={[0.2, 0.3, 0.5]} />
                            <meshPhysicalMaterial color={config.case} metalness={1} roughness={0.15} />
                        </mesh>
                    ))}

                    {/* Strap */}
                    <mesh position={[0, -0.05, -2.5]} rotation={[-0.1, 0, 0]} castShadow receiveShadow>
                        <boxGeometry args={[1.4, 0.1, 2.5]} />
                        <meshStandardMaterial color={config.strap} roughness={0.9} bumpScale={0.02} />
                    </mesh>
                    <mesh position={[0, -0.05, 2.5]} rotation={[0.1, 0, 0]} castShadow receiveShadow>
                        <boxGeometry args={[1.4, 0.1, 2.5]} />
                        <meshStandardMaterial color={config.strap} roughness={0.9} bumpScale={0.02} />
                    </mesh>

                    {/* Glass (Domed Sapphire Crystal) */}
                    <mesh position={[0, 0.25, 0]}>
                        <sphereGeometry args={[1.4, 64, 32, 0, Math.PI * 2, 0, Math.PI / 12]} />
                        <meshPhysicalMaterial
                            transmission={0.95}
                            opacity={1}
                            metalness={0.2}
                            roughness={0}
                            ior={1.52}
                            thickness={0.1}
                            clearcoat={1}
                        />
                    </mesh>
                </group>
            </Float>
        </group>
    );
}

export default function HeroScene({ currentSlide = 0 }: { currentSlide?: number }) {
    const { scrollYProgress } = useScroll();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className="w-full h-full absolute inset-0 z-0 pointer-events-none">
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 8], fov: 35 }}
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
                    <pointLight position={[-10, -10, -5]} intensity={0.5} color="#b0b5a7" />

                    {/* Environment maps for realistic lighting reflection */}
                    <Environment preset="city" />

                    {/* Mobile scaling / layout improvements for the watch */}
                    <group
                        position={[isMobile ? 0 : 2.5, isMobile ? 1.5 : 0, 0]}
                        scale={isMobile ? 0.8 : 1.1}
                    >
                        <WatchModel scrollYProgress={scrollYProgress} currentSlide={currentSlide} />
                        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
                    </group>

                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
