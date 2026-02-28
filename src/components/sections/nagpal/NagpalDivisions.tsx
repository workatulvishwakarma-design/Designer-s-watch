"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Globe, Settings, Building2, Wrench, Plane } from "lucide-react";

const divisions = [
  {
    id: "01",
    title: "International Brands",
    titleGold: null,
    titleRest: null,
    desc: "Distribution and retail of international watch brands across India, combining global partnerships with local market expertise for both retail and digital channels.",
    icon: Globe,
    tags: ["Global Distribution", "Retail & Digital", "20+ Brands"],
    image: "/images/nagpal1.png",
  },
  {
    id: "02",
    title: "OEM / ODM Manufacturing",
    titleGold: "OEM / ODM",
    titleRest: "Manufacturing",
    desc: "End-to-end private label manufacturing for brands and retailers, from design and prototyping to production and quality assurance, with over 500 labels delivered.",
    icon: Settings,
    tags: ["Private Label", "End-to-End", "500+ Labels"],
    image: "/images/nagpal2.png",
  },
  {
    id: "03",
    title: "B2B / Institutional Supply",
    titleGold: null,
    titleRest: null,
    desc: "Corporate and institutional supply of watches and related products, with reliable inventory and bulk order capabilities for businesses and organisations.",
    icon: Building2,
    tags: ["Corporate", "Bulk Orders", "Reliable Inventory"],
    image: "/images/nagpal3.png",
  },
  {
    id: "04",
    title: "Parts – Nagpal Bombay",
    titleGold: null,
    titleRest: null,
    desc: "Spare parts distribution and technical support for watches, serving authorised service centers and repair networks across the country with genuine components.",
    icon: Wrench,
    tags: ["Spare Parts", "Service Centers", "Technical Support"],
    image: "/images/nagpal1.png",
  },
  {
    id: "05",
    title: "Exports",
    titleGold: null,
    titleRest: null,
    desc: "Global supply capabilities delivering watches and components to international markets with dependable quality standards.",
    icon: Plane,
    tags: ["Global Markets", "Quality Assured", "International Delivery"],
    image: "/images/nagpal2.png",
  },
];

export default function NagpalDivisions() {
  return (
    <section
      id="divisions"
      className="relative py-14 md:py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#FAF8F4" }}
    >
      {/* Grain */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0" aria-hidden>
        <filter id="nagpal-div-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#nagpal-div-grain)" />
      </svg>

      {/* Decorative top curve / line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-0"
        style={{ background: "linear-gradient(90deg, transparent, rgba(184,147,90,0.2) 20%, rgba(184,147,90,0.2) 80%, transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-20"
        >
          <p
            className="font-body text-[11px] tracking-[0.3em] mb-4"
            style={{ color: "#B8935A" }}
          >
            VERTICALS
          </p>
          <h2
            className="font-heading text-[42px] md:text-[56px] lg:text-[64px] font-light"
            style={{ color: "#1A1918" }}
          >
            Our Core Divisions
          </h2>
          <div
            className="w-14 h-0.5 mx-auto mt-4 rounded-full"
            style={{ backgroundColor: "#B8935A" }}
          />
          <p
            className="font-body font-light text-[15px] md:text-[17px] max-w-[560px] mx-auto mt-5 leading-relaxed"
            style={{ color: "#6B6560" }}
          >
            Specialised business verticals that operate across manufacturing, distribution,
            components, and global supply.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {divisions.map((div, index) => (
            <motion.article
              key={div.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group flex flex-col h-full rounded-3xl overflow-hidden bg-white border shadow-sm hover:shadow-xl transition-all duration-400"
              style={{
                borderColor: "rgba(224, 216, 206, 0.8)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* Image block - full width, prominent */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F2EDE6]">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                  style={{
                    background: "linear-gradient(180deg, transparent 40%, rgba(13,51,41,0.08) 100%)",
                  }}
                />
                {div.image ? (
                  <Image
                    src={div.image}
                    alt={div.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : null}
                {/* Number badge on image */}
                <div
                  className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center font-display text-[14px] tracking-wider backdrop-blur-sm"
                  style={{ backgroundColor: "rgba(255,255,255,0.9)", color: "#B8935A" }}
                >
                  {div.id}
                </div>
                {/* Gold accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, transparent, #B8935A, transparent)" }}
                />
              </div>

              {/* Content block */}
              <div className="flex flex-col flex-1 p-6 md:p-8">
                <h3 className="font-heading text-[26px] md:text-[30px] mb-3 leading-tight" style={{ color: "#1A1918" }}>
                  {div.titleGold ? (
                    <>
                      <span style={{ color: "#B8935A" }}>{div.titleGold}</span>{" "}
                      <span style={{ color: "#1A1918" }}>{div.titleRest}</span>
                    </>
                  ) : (
                    div.title
                  )}
                </h3>
                <div
                  className="w-8 h-0.5 rounded-full mb-5"
                  style={{ backgroundColor: "#B8935A" }}
                />
                <p
                  className="font-body font-light text-[14px] md:text-[15px] leading-[1.85] flex-1"
                  style={{ color: "#6B6560" }}
                >
                  {div.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {div.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block font-body text-[11px] md:text-[12px] px-3 py-1.5 rounded-full border bg-[#FAF8F4] transition-colors duration-300 group-hover:border-[#B8935A]/50"
                      style={{ borderColor: "#E0D8CE", color: "#6B6560" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="#partner"
                  className="inline-flex items-center gap-2 font-body text-[13px] tracking-[0.1em] mt-6 text-[#B8935A] hover:text-[#0D3329] transition-colors duration-300 w-fit"
                >
                  Learn More
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px mt-16 md:mt-20 origin-center"
          style={{ background: "linear-gradient(90deg, transparent, rgba(184,147,90,0.25), transparent)" }}
        />
      </div>
    </section>
  );
}
