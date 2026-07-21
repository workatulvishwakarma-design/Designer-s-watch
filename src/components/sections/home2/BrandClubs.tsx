"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BrandClubs() {
  return (
    <section className="bg-[#003926] text-white overflow-hidden py-24 md:py-32 relative">
      {/* Subtle brand dots pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #D4C5A0 0.5px, transparent 0)", backgroundSize: "30px 30px" }}
      />
      
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 flex flex-col gap-24 md:gap-32">
        
        {/* ROW 1: D'SIGNER CLUB */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
          {/* Left panel: Text & watch insert (col-span-5) */}
          <div className="md:col-span-5 flex flex-col items-start relative z-10 order-2 md:order-1">
            <h2 className="font-dm text-[36px] sm:text-[48px] uppercase tracking-[0.08em] leading-none mb-1 font-bold">
              D'signer
            </h2>
            <h3 className="font-dm font-light text-[36px] sm:text-[48px] uppercase tracking-[0.15em] leading-none text-white/30 mb-8">
              Club
            </h3>

            {/* Watch display insert container */}
            <div className="relative w-full max-w-[280px] aspect-[3/1] bg-white rounded-sm overflow-hidden mb-8 border border-white/10 shadow-lg">
              <Image
                src="/img/home6.PNG"
                alt="D'Signer Watch Insert"
                fill
                className="object-contain p-2"
                sizes="280px"
              />
            </div>

            <p className="font-dm text-[13px] text-white/60 leading-[1.8] max-w-sm mb-8">
              We use a diamond cut technique for a crisp finish. The hands glow beautifully in the dark for clear visibility.
            </p>

            <Link
              href="/collections/dsigner"
              className="font-dm text-[11px] tracking-[0.2em] uppercase text-white hover:text-[#D4C5A0] border-b border-white/20 hover:border-[#D4C5A0] pb-1 transition-all duration-300 w-fit"
            >
              Discover More
            </Link>
          </div>

          {/* Right panel: Tall Portrait B&W Image (col-span-7) */}
          <div className="md:col-span-7 relative w-full order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden shadow-2xl bg-[#092218]"
            >
              <Image
                src="/img/home5.PNG"
                alt="D'Signer Style Man"
                fill
                className="object-cover object-center grayscale contrast-[1.1] transition-transform duration-[1.5s] ease-out hover:scale-103"
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
              />
              <div className="absolute inset-0 border border-white/5 rounded-sm pointer-events-none" />
            </motion.div>
          </div>
        </div>

        {/* ROW 2: ESCORT CLUB */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
          {/* Left panel: Landscape B&W Image (col-span-7) */}
          <div className="md:col-span-7 relative w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/3] rounded-sm overflow-hidden shadow-2xl bg-[#092218]"
            >
              <Image
                src="/img/home7.PNG"
                alt="Escort Style Hand"
                fill
                className="object-cover object-center grayscale contrast-[1.1] transition-transform duration-[1.5s] ease-out hover:scale-103"
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
              />
              <div className="absolute inset-0 border border-white/5 rounded-sm pointer-events-none" />
            </motion.div>
          </div>

          {/* Right panel: Text (col-span-5) */}
          <div className="md:col-span-5 flex flex-col items-start relative z-10">
            <h2 className="font-dm text-[36px] sm:text-[48px] uppercase tracking-[0.08em] leading-none mb-1 font-bold">
              Escort
            </h2>
            <h3 className="font-dm font-light text-[36px] sm:text-[48px] uppercase tracking-[0.15em] leading-none text-white/30 mb-8">
              Club
            </h3>

            <p className="font-dm text-[13px] text-white/60 leading-[1.8] max-w-sm mb-8">
              We use a diamond cut technique for a crisp finish. The hands glow beautifully in the dark for clear visibility.
            </p>

            <Link
              href="/collections/escort"
              className="font-dm text-[11px] tracking-[0.2em] uppercase text-white hover:text-[#D4C5A0] border-b border-white/20 hover:border-[#D4C5A0] pb-1 transition-all duration-300 w-fit"
            >
              Discover More
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
