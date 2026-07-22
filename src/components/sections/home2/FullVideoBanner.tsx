"use client";

export default function FullVideoBanner() {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Autoplay Video */}
      <video
        src="/images/new-content/videobanner-1.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-102 pointer-events-none"
      />

      {/* Subtle Edge Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.4)"
        }}
      />
    </section>
  );
}
