"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useState } from "react";
import { Environment, ContactShadows, Preload } from "@react-three/drei";
import * as THREE from "three";
import { MotionValue, useTransform } from "framer-motion";

function WatchModel({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const groupRef = useRef<THREE.Group>(null);
    const secondHandRef = useRef<THREE.Mesh>(null);
    const minuteHandRef = useRef<THREE.Mesh>(null);
    const hourHandRef = useRef<THREE.Mesh>(null);

    // Scroll-driven transforms
    const rotateY = useTransform(scrollYProgress, [0, 0.3], [0, Math.PI * 1.5]);
    const rotateX = useTransform(scrollYProgress, [0, 0.3], [0.2, -0.1]);
    const posX = useTransform(scrollYProgress, [0.1, 0.4], [0, -3.5]);
    const posZ = useTransform(scrollYProgress, [0, 0.2], [-1, 0.5]);
    const scale = useTransform(scrollYProgress, [0, 0.15], [0.85, 1.15]);

    useFrame(() => {
        if (!groupRef.current) return;

        groupRef.current.rotation.y = rotateY.get();
        groupRef.current.rotation.x = rotateX.get();
        groupRef.current.position.x = posX.get();
        groupRef.current.position.z = posZ.get();

        const s = scale.get();
        groupRef.current.scale.set(s, s, s);

        // Idle float
        groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.08;

        // Live clock hands
        const now = new Date();
        const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
        const minutes = now.getMinutes() + seconds / 60;
        const hours = (now.getHours() % 12) + minutes / 60;

        if (secondHandRef.current)
            secondHandRef.current.rotation.z = -(seconds / 60) * Math.PI * 2;
        if (minuteHandRef.current)
            minuteHandRef.current.rotation.z = -(minutes / 60) * Math.PI * 2;
        if (hourHandRef.current)
            hourHandRef.current.rotation.z = -(hours / 12) * Math.PI * 2;
    });

    return (
        <group ref={groupRef}>
            <group rotation={[Math.PI / 2, 0, 0]}>
                {/* Watch Case */}
                <mesh castShadow receiveShadow>
                    <cylinderGeometry args={[1.4, 1.4, 0.35, 64]} />
                    <meshStandardMaterial color="#C0B090" metalness={0.95} roughness={0.05} />
                </mesh>

                {/* Watch Dial */}
                <mesh position={[0, 0.16, 0]} receiveShadow>
                    <cylinderGeometry args={[1.35, 1.35, 0.05, 64]} />
                    <meshStandardMaterial color="#FAF8F4" roughness={0.3} />
                </mesh>

                {/* Glass */}
                <mesh position={[0, 0.2, 0]}>
                    <cylinderGeometry args={[1.35, 1.35, 0.05, 64]} />
                    <meshPhysicalMaterial
                        transparent
                        opacity={0.15}
                        roughness={0}
                        transmission={0.9}
                        thickness={0.5}
                        color="#E8F0FF"
                    />
                </mesh>

                {/* Hour Markers */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <mesh
                        key={`marker-${i}`}
                        position={[
                            Math.sin((i * Math.PI * 2) / 12) * 1.1,
                            0.17,
                            Math.cos((i * Math.PI * 2) / 12) * 1.1,
                        ]}
                        rotation={[0, -(i * Math.PI * 2) / 12, 0]}
                    >
                        <boxGeometry args={[0.06, 0.02, i % 3 === 0 ? 0.2 : 0.12]} />
                        <meshStandardMaterial color="#003926" metalness={0.9} roughness={0.1} />
                    </mesh>
                ))}

                {/* Center Pin */}
                <mesh position={[0, 0.22, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.06, 32]} />
                    <meshStandardMaterial color="#003926" metalness={1} roughness={0.1} />
                </mesh>

                {/* Hour Hand */}
                <group position={[0, 0.19, 0]}>
                    <mesh ref={hourHandRef} position={[0, 0, -0.35]}>
                        <boxGeometry args={[0.06, 0.02, 0.7]} />
                        <meshStandardMaterial color="#B8935A" metalness={1} roughness={0.1} />
                    </mesh>
                </group>

                {/* Minute Hand */}
                <group position={[0, 0.20, 0]}>
                    <mesh ref={minuteHandRef} position={[0, 0, -0.45]}>
                        <boxGeometry args={[0.04, 0.02, 0.95]} />
                        <meshStandardMaterial color="#B8935A" metalness={1} roughness={0.1} />
                    </mesh>
                </group>

                {/* Second Hand */}
                <group position={[0, 0.21, 0]}>
                    <mesh ref={secondHandRef} position={[0, 0, -0.55]}>
                        <boxGeometry args={[0.02, 0.01, 1.1]} />
                        <meshStandardMaterial color="#CC3333" metalness={0.3} roughness={0.3} />
                    </mesh>
                </group>

                {/* Crown */}
                <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.08, 0.08, 0.25, 16]} />
                    <meshStandardMaterial color="#C0B090" metalness={0.95} roughness={0.1} />
                </mesh>

                {/* Lugs */}
                {[
                    [0.7, -1.35],
                    [-0.7, -1.35],
                    [0.7, 1.35],
                    [-0.7, 1.35],
                ].map(([x, z], i) => (
                    <mesh key={`lug-${i}`} position={[x, 0, z]} castShadow>
                        <boxGeometry args={[0.18, 0.25, 0.45]} />
                        <meshStandardMaterial color="#C0B090" metalness={0.95} roughness={0.05} />
                    </mesh>
                ))}

                {/* Strap Top */}
                <mesh position={[0, -0.04, -2.3]} rotation={[-0.08, 0, 0]} castShadow>
                    <boxGeometry args={[0.9, 0.18, 1.8]} />
                    <meshStandardMaterial color="#1A1918" roughness={0.8} />
                </mesh>

                {/* Strap Bottom */}
                <mesh position={[0, -0.04, 2.3]} rotation={[0.08, 0, 0]} castShadow>
                    <boxGeometry args={[0.9, 0.18, 1.8]} />
                    <meshStandardMaterial color="#1A1918" roughness={0.8} />
                </mesh>
            </group>
        </group>
    );
}

export default function HeroScene({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    if (isMobile) return null;

    return (
        <div className="w-full h-full absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 40 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                shadows
            >
                <Suspense fallback={null}>
                    {/* Lighting */}
                    <ambientLight intensity={0.4} color="#FFF5E6" />
                    <directionalLight position={[5, 8, 5]} intensity={1.8} color="#FFFFFF" castShadow />
                    <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#E8D0A0" />
                    <pointLight position={[0, 0, 3]} intensity={0.8} color="#FFE4B0" />
                    <spotLight
                        position={[0, 10, 0]}
                        intensity={2}
                        angle={0.3}
                        penumbra={0.5}
                        castShadow
                    />
                    <Environment preset="studio" />

                    <WatchModel scrollYProgress={scrollYProgress} />
                    <ContactShadows position={[0, -2, 0]} opacity={0.3} blur={2} />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
