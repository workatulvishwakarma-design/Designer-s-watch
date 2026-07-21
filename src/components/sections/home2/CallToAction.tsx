"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "600px", background: "#1A1918" }}>
      {/* Background Image Layer */}
      <Image
        src="/images/new-content/home2-hero.png"
        alt=""
        fill
        className="object-cover opacity-25"
        sizes="100vw"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#003926]/95 via-[#003926]/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#003926]/90 via-transparent to-[#003926]/60 z-10" />

      {/* Noise texture */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.08]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #D4C5A0 0.3px, transparent 0)", backgroundSize: "30px 30px" }}
      />

      <div className="relative z-20 max-w-[900px] mx-auto px-6 sm:px-10 py-28 md:py-36 text-center flex flex-col items-center">
        {/* Diamond ornament */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-[1px] bg-[#D4C5A0]/40" />
          <div className="w-2 h-2 rotate-45 bg-[#D4C5A0]/60" />
          <div className="w-8 h-[1px] bg-[#D4C5A0]/40" />
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-dm text-[10px] tracking-[0.35em] text-[#D4C5A0] font-bold block mb-6 uppercase"
        >
          PRIVATE CLIENT SERVICES
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-cormorant text-[36px] sm:text-[52px] lg:text-[64px] text-white font-light leading-[1.1] mb-5"
        >
          Request a<br />
          <span className="italic text-[#D4C5A0]">Private Viewing.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-dm text-[14px] text-white/55 max-w-xl leading-[1.8] mb-12"
        >
          Gain exclusive access to private capsule releases, bespoke client engraving services, and priority reservations on upcoming mechanical releases.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-5"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-10 py-4 rounded-sm bg-[#D4C5A0] text-[#003926] font-dm text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-white transition-all duration-500"
          >
            Schedule Consultation
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-sm border border-[#D4C5A0]/30 text-[#D4C5A0] font-dm text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-[#D4C5A0] hover:text-[#003926] transition-all duration-500"
          >
            The Atelier
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
