"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BrandClubs() {
  return (
    <section className="bg-[#003926] text-white overflow-hidden py-24 md:py-32 relative">
      {/* Subtle brand dots pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #D4C5A0 0.5px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 flex flex-col gap-24 md:gap-32">
        {/* ROW 1: D'SIGNER CLUB */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
          {/* Left panel: Text & watch insert (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 flex flex-col items-start relative z-10 order-2 md:order-1"
          >
            <h2 className="font-montserrat text-[36px] sm:text-[48px] uppercase tracking-[0.08em] leading-[1.15] mb-8">
              <span className="font-bold block">D&apos;SIGNER</span>
              <span className="font-light block">WATCHES</span>
            </h2>

            {/* Watch display insert container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[320px] aspect-[2/1] overflow-hidden mb-8 shadow-lg"
            >
              <Image
                src="/images/new-img/small-img.PNG"
                alt="D'Signer Watch Insert"
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
                sizes="320px"
              />
            </motion.div>

            <p className="font-montserrat text-[13px] text-white/60 leading-[1.8] max-w-sm mb-8 font-medium">
              Democratic luxury crafted for the masses. Combining signature diamond-cut precision with daily durability, D&apos;signer brings premium horology within reach for everyone.
            </p>

            <Link
              href="/collections/dsigner"
              className="font-montserrat text-[11px] tracking-[0.2em] uppercase text-white hover:text-[#D4C5A0] border-b border-white/20 hover:border-[#D4C5A0] pb-1 transition-all duration-300 w-fit font-bold"
            >
              Discover More
            </Link>
          </motion.div>

          {/* Right panel: Reduced Height B&W Image (col-span-7) */}
          <div className="md:col-span-7 relative w-full order-1 md:order-2 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[16/10] sm:aspect-[16/10] md:aspect-[16/10] max-h-[460px] overflow-hidden shadow-2xl bg-[#092218]"
            >
              <Image
                src="/images/new-img/dsigner-m.PNG"
                alt="D'Signer Style Man"
                fill
                className="object-cover object-center grayscale contrast-[1.1] transition-transform duration-[1.5s] ease-out hover:scale-103"
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
              />
              <div className="absolute inset-0 border border-white/5 pointer-events-none" />
            </motion.div>
          </div>
        </div>

        {/* ROW 2: ESCORT CLUB */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
          {/* Left panel: Landscape B&W Image (col-span-7) */}
          <div className="md:col-span-7 relative w-full">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/3] overflow-hidden shadow-2xl bg-[#092218]"
            >
              <Image
                src="/images/new-img/escort-f.PNG"
                alt="Escort Style Hand"
                fill
                className="object-cover object-center grayscale contrast-[1.1] transition-transform duration-[1.5s] ease-out hover:scale-103"
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
              />
              <div className="absolute inset-0 border border-white/5 pointer-events-none" />
            </motion.div>
          </div>

          {/* Right panel: Text (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 flex flex-col items-start relative z-10"
          >
            <h2 className="font-montserrat text-[36px] sm:text-[48px] uppercase tracking-[0.08em] leading-[1.15] mb-8">
              <span className="font-bold block">ESCORT</span>
              <span className="font-light block">WATCHES</span>
            </h2>

            <p className="font-montserrat text-[13px] text-white/60 leading-[1.8] max-w-sm mb-8 font-medium">
              Elite craftsmanship curated for the classes. Built with sovereign precision and subtle prestige, Escort is designed exclusively for those who appreciate the finer circles of life.
            </p>

            <Link
              href="/collections/escort"
              className="font-montserrat text-[11px] tracking-[0.2em] uppercase text-white hover:text-[#D4C5A0] border-b border-white/20 hover:border-[#D4C5A0] pb-1 transition-all duration-300 w-fit font-bold"
            >
              Discover More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
