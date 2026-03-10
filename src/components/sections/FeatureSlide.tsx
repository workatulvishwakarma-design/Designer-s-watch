"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FeatureSlideProps {
  titleLight: string;
  titleBold: string;
  body: string;
  imageIndex: number;
  bg: string;
}

const WATCH_IMAGES = ['/images/img01.png','/images/img02.png','/images/img03.png','/images/img04.png'];

const FeatureSlide: React.FC<FeatureSlideProps> = ({
  titleLight,
  titleBold,
  body,
  imageIndex,
  bg
}) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!slideRef.current || !imageRef.current) return;

      // Floating animation for watch
      gsap.to(imageRef.current, {
        y: -10,
        rotation: 2,
        duration: 6,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Shimmer effect on hover
      const shimmer = gsap.timeline({ paused: true });
      shimmer.to(imageRef.current, {
        filter: "drop-shadow(0 25px 50px rgba(184, 147, 90, 0.6)) brightness(1.1)",
        duration: 0.3
      });

      imageRef.current.addEventListener('mouseenter', () => shimmer.play());
      imageRef.current.addEventListener('mouseleave', () => shimmer.reverse());

      // Title underline animation
      if (titleRef.current) {
        const underline = titleRef.current.querySelector('.underline') as HTMLElement;
        if (underline) {
          gsap.set(underline, { scaleX: 0, transformOrigin: "left" });
          gsap.to(underline, {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          });
        }
      }

    }, slideRef);

    return () => ctx.revert();
  }, []);

  const watchImg = WATCH_IMAGES[imageIndex] || WATCH_IMAGES[0];

  return (
    <div
      ref={slideRef}
      className="w-screen h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: bg }}
    >
      {/* Animated Background Gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(135deg, ${bg} 0%, #0F4C3A 30%, #B8935A 60%, ${bg} 100%)`,
          animation: "gradientShift 8s ease-in-out infinite"
        }}
      />

      {/* Particle Dust Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#B8935A] opacity-20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="slide-text relative z-10 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Side */}
        <div className="text-center lg:text-left">
          <div className="mb-8">
            <h2
              ref={titleRef}
              className="font-cormorant text-6xl lg:text-9xl text-[#1A1918] leading-tight cursor-pointer group"
            >
              <span className="block font-light group-hover:text-[#B8935A] transition-colors duration-500">
                {titleLight}
              </span>
              <span className="block font-semibold text-[#0F4C3A] group-hover:text-[#003926] transition-colors duration-500">
                {titleBold}
              </span>
              <div className="underline w-full h-1 bg-[#B8935A] mt-2"></div>
            </h2>
          </div>

          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#B8935A] to-transparent mx-auto lg:mx-0 mb-8" />

          <p className="font-dm text-lg lg:text-xl text-[#6B6560] leading-relaxed max-w-lg mx-auto lg:mx-0">
            {body}
          </p>
        </div>

        {/* Image Side */}
        <div className="slide-image flex justify-center lg:justify-end">
          <div className="relative">
            {/* Glass Reflection Overlay */}
            <div
              className="absolute inset-0 rounded-full opacity-10"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)",
                clipPath: "circle(50% at center)"
              }}
            />

            {/* Glow Effect */}
            <div
              className="absolute inset-0 rounded-full opacity-40 blur-3xl"
              style={{
                background: `radial-gradient(circle, #B8935A 0%, transparent 70%)`
              }}
            />

            {/* Watch Image */}
            <img
              ref={imageRef}
              src={watchImg}
              alt={`${titleLight} ${titleBold}`}
              className="relative w-96 h-96 lg:w-[32rem] lg:h-[32rem] object-contain drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 25px 50px rgba(184, 147, 90, 0.3))',
                transform: 'translateZ(0)', // GPU acceleration
                willChange: 'transform'
              }}
            />

            {/* Metallic Shimmer */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: "conic-gradient(from 0deg, transparent 0deg, rgba(184,147,90,0.3) 45deg, transparent 90deg, rgba(184,147,90,0.3) 135deg, transparent 180deg)",
                animation: "shimmer 4s linear infinite",
                clipPath: "circle(50% at center)"
              }}
            />

            {/* Floating Particles */}
            <div className="absolute top-12 left-12 w-3 h-3 bg-[#B8935A] rounded-full opacity-70 animate-bounce" />
            <div className="absolute bottom-16 right-16 w-2 h-2 bg-[#0F4C3A] rounded-full opacity-50 animate-pulse" />
            <div className="absolute top-1/2 right-8 w-1 h-1 bg-[#B8935A] rounded-full opacity-60 animate-ping" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FeatureSlide;
