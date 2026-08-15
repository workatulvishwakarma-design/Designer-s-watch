"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const categories = [
  "All Categories",
  "D'Signer Watches",
  "Escort Watches",
  "Accessories",
  "Service Centers",
];

export default function StoreLocator() {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <section className="bg-[#F5F3EF] py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1300px] mx-auto px-6 sm:px-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Form */}
          <div className="flex flex-col">
            <h2
              className="font-cormorant text-[32px] sm:text-[40px] md:text-[48px] text-[#1A1918] font-semibold leading-[1.15] mb-8"
              style={{ fontStyle: "italic" }}
            >
              Find Your
              <br />
              Nearest Store
            </h2>

            {/* Category Dropdown */}
            <div className="relative mb-4">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full max-w-md text-left px-5 py-3.5 bg-white border border-[#D8D3CB] text-[14px] font-montserrat text-[#6B6560] focus:outline-none focus:border-[#003926] transition-colors duration-300 flex items-center justify-between"
              >
                <span>{category || "Choose Category"}</span>
                <svg
                  className={`w-4 h-4 text-[#9C9690] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 w-full max-w-md bg-white border border-[#D8D3CB] border-t-0 z-20 shadow-lg">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setCategory(cat);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-5 py-3 text-[13px] font-montserrat text-[#6B6560] hover:bg-[#F0EDE8] hover:text-[#003926] transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* City / State / Pincode Input */}
            <div className="relative mb-6">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter City, State or Pincode"
                className="w-full max-w-md px-5 py-3.5 bg-white border border-[#D8D3CB] text-[14px] font-montserrat text-[#1A1918] placeholder-[#9C9690] focus:outline-none focus:border-[#003926] transition-colors duration-300"
              />
              <MapPin
                size={16}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#9C9690] pointer-events-none"
                style={{ right: "calc(100% - min(100%, 32rem) + 1.25rem)" }}
              />
            </div>

            {/* CTA Button */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,57,38,0.18)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 bg-[#003926] text-white px-7 py-3.5 w-fit font-montserrat text-[12px] tracking-[0.12em] uppercase font-semibold hover:bg-[#024D35] transition-colors duration-300 cursor-pointer"
            >
              View More
              <ArrowRight size={15} />
            </motion.a>
          </div>

          {/* Right — Map */}
          <div className="relative w-full overflow-hidden rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.697!2d72.856!3d19.076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjYiTiA3MsKwNTEnMjEuNiJF!5e0!3m2!1sen!2sin!4v1"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Designer World Store Location"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
