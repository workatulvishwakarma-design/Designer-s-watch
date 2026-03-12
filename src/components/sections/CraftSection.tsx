"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Shield, Droplets, Clock, Sparkles, Globe, LucideIcon } from "lucide-react";

const features: {
  num: string;
  Icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    num: "01",
    Icon: Shield,
    title: "316L Surgical Steel",
    body: "Surgical grade stainless steel for lasting premium mirror finish.",
  },
  {
    num: "02",
    Icon: Droplets,
    title: "5–10 ATM Resistance",
    body: "Certified water resistance for boardroom to beach performance.",
  },
  {
    num: "03",
    Icon: Clock,
    title: "Quartz Precision",
    body: "±15 seconds monthly accuracy with Japanese movement.",
  },
  {
    num: "04",
    Icon: Sparkles,
    title: "Sapphire Glass",
    body: "Scratch-resistant coated glass for crystal clarity always.",
  },
  {
    num: "05",
    Icon: Globe,
    title: "International Standards",
    body: "Manufactured to global quality benchmarks with 4 decades expertise.",
  },
];

const cardStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ── Single Feature Card ── */
function FeatureCard({
  f,
  area,
}: {
  f: (typeof features)[0];
  area: string;
}) {
  const [hovered, setHovered] = useState(false);
  const IconComp = f.Icon;

  return (
    <motion.div
      variants={cardItem}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-2xl cursor-default"
      style={{
        gridArea: area,
        background: "white",
        border: `1px solid ${hovered ? "rgba(184,147,90,0.3)" : "#EDE8DF"}`,
        padding: 24,
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 16px 40px rgba(0,0,0,0.08)"
          : "0 1px 4px rgba(0,0,0,0.03)",
      }}
    >
      {/* Number */}
      <p
        className="font-bebas"
        style={{
          fontSize: 13,
          color: "#B8935A",
          letterSpacing: "0.2em",
          marginBottom: 12,
        }}
      >
        {f.num}
      </p>

      {/* Icon */}
      <IconComp
        size={24}
        color="#003926"
        strokeWidth={1.5}
        style={{ marginBottom: 12 }}
      />

      {/* Title */}
      <p
        className="font-dm font-semibold"
        style={{
          fontSize: 15,
          color: "#1A1918",
          marginBottom: 8,
        }}
      >
        {f.title}
      </p>

      {/* Body */}
      <p
        className="font-dm font-light"
        style={{
          fontSize: 12,
          color: "#6B6560",
          lineHeight: 1.7,
        }}
      >
        {f.body}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[3px] bg-[#B8935A]"
        style={{
          width: hovered ? "100%" : "0%",
          transition: "width 0.5s ease",
        }}
      />
    </motion.div>
  );
}

export default function CraftSection() {
  return (
    <section className="bg-[#FAF8F4]" style={{ padding: "80px 0" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* ── SECTION HEADER ── */}
        <div className="mb-10">
          <p
            className="font-dm uppercase"
            style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              color: "#B8935A",
            }}
          >
            BUILT DIFFERENT
          </p>
          <h2
            className="font-cormorant text-[#1A1918] mt-2"
            style={{ fontSize: "clamp(40px, 4vw, 64px)" }}
          >
            Quality You Can Feel.
          </h2>
          <div
            className="bg-[#B8935A] mt-4"
            style={{ width: 48, height: 2 }}
          />
        </div>

        {/* ── SPLIT ROW ── */}
        <div className="flex flex-col md:flex-row gap-10 items-stretch">
          {/* LEFT — Hero Image (45%) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-[45%] relative rounded-[20px] overflow-hidden group"
            style={{ minHeight: 520 }}
          >
            {/* Gold Corner Accent */}
            <svg
              width="32"
              height="32"
              stroke="#B8935A"
              fill="none"
              className="absolute top-5 left-5 z-10 opacity-50 pointer-events-none"
            >
              <path
                d="M0 32 L0 0 L32 0"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            <Image
              src="/images/main-img5.png"
              alt="Premium watch craftsmanship"
              fill
              className="object-cover object-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
              priority
            />

            {/* Bottom gradient */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{
                height: "50%",
                background:
                  "linear-gradient(transparent 0%, rgba(17,17,16,0.4) 100%)",
              }}
            />
          </motion.div>

          {/* RIGHT — Feature Cards Grid (55%) */}
          <motion.div
            variants={cardStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full md:w-[55%] grid gap-4"
            style={{
              gridTemplateColumns: "1fr 1fr",
              gridTemplateAreas: `
                "card1 card2"
                "card3 card4"
                "card5 card5"
              `,
            }}
          >
            {features.map((f, i) => (
              <FeatureCard key={f.num} f={f} area={`card${i + 1}`} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
