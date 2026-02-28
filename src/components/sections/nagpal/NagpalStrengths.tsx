"use client";

import { motion } from "framer-motion";
import { Globe, Handshake, Link2 } from "lucide-react";

const strengths = [
  {
    icon: Globe,
    title: "Multi-channel Distribution Network",
    body: "Reaching customers through retail, e-commerce, and institutional channels with a unified supply chain and brand presence.",
  },
  {
    icon: Handshake,
    title: "Long-standing Retail & Service Partnerships",
    body: "Decades of trusted relationships with retailers and service centers ensure consistent availability and after-sales support.",
  },
  {
    icon: Link2,
    title: "Strong Supply Chain & Component Sourcing",
    body: "Vertically integrated sourcing and logistics enable reliable quality and timely delivery across the value chain.",
  },
];

export default function NagpalStrengths() {
  return (
    <section
      className="relative py-10 md:py-14 lg:py-20 overflow-hidden"
      style={{
        backgroundColor: "#FAF8F4",
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          rgba(184,147,90,0.025) 0px,
          rgba(184,147,90,0.025) 1px,
          transparent 1px,
          transparent 14px
        )`,
      }}
    >
      {/* Grain */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" aria-hidden>
        <filter id="nagpal-strengths-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#nagpal-strengths-grain)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <header className="text-center mb-12 md:mb-16">
          <p
            className="font-body text-[11px] tracking-[0.3em] mb-4"
            style={{ color: "#B8935A" }}
          >
            OUR STRENGTHS
          </p>
          <h2
            className="font-heading text-[36px] md:text-[46px]"
            style={{ color: "#1A1918" }}
          >
            What Drives Us Forward
          </h2>
          <div
            className="w-12 h-0.5 mx-auto mt-3"
            style={{ backgroundColor: "#B8935A" }}
          />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strengths.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative bg-white rounded-[20px] p-8 md:p-9 lg:p-[44px_36px] border overflow-hidden transition-all duration-400 hover:-translate-y-2.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)]"
              style={{
                borderColor: "#E8E0D5",
                borderWidth: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#B8935A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E8E0D5";
              }}
            >
              <item.icon
                className="w-8 h-8"
                style={{ color: "#B8935A" }}
                strokeWidth={1.5}
              />
              <h3
                className="font-body font-semibold text-[18px] mt-5 mb-4"
                style={{ color: "#1A1918" }}
              >
                {item.title}
              </h3>
              <p
                className="font-body font-light text-[14px] leading-[1.85]"
                style={{ color: "#6B6560" }}
              >
                {item.body}
              </p>
              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#B8935A] transition-all duration-500 ease-out group-hover:w-full"
                style={{ backgroundColor: "#B8935A" }}
              />
              {/* Shimmer */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-0"
                aria-hidden
              >
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
