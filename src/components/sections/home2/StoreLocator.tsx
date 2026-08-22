"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Search,
  X,
  ExternalLink,
  Phone,
  Mail,
  User,
  ShieldCheck,
  Building2,
  Navigation,
} from "lucide-react";
import {
  dealers,
  dealerCategories,
  searchDealers,
  allCities,
  Dealer,
} from "@/data/dealers";

const POPULAR_CITIES = [
  "DELHI",
  "MUMBAI",
  "SURAT",
  "AMRITSAR",
  "KANPUR",
  "LUCKNOW",
  "AHMEDABAD",
  "BANGALORE",
  "CHENNAI",
  "PUNE",
  "KOLKATA",
];

export default function StoreLocator() {
  const [category, setCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [modalSearch, setModalSearch] = useState("");
  const [modalCategory, setModalCategory] = useState<string>("");
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(e.target as Node)
      ) {
        setAutocompleteOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync modal search state when modal opens
  const handleOpenModal = useCallback(
    (presetQuery?: string, presetCat?: string) => {
      const q = presetQuery !== undefined ? presetQuery : searchQuery;
      const c = presetCat !== undefined ? presetCat : category;
      setModalSearch(q);
      setModalCategory(c);
      setModalOpen(true);
      setAutocompleteOpen(false);
    },
    [searchQuery, category]
  );

  // Auto-focus the scroll list when modal opens
  useEffect(() => {
    if (modalOpen && scrollContainerRef.current) {
      scrollContainerRef.current.focus();
    }
  }, [modalOpen]);

  // Autocomplete city / dealer suggestions for input on main page
  const suggestions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];

    const matchedCities = allCities
      .filter((c) => c.toLowerCase().includes(q))
      .slice(0, 4)
      .map((c) => ({ type: "city" as const, label: c, sub: "City Search" }));

    const matchedDealers = dealers
      .filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.area.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q)
      )
      .slice(0, 4)
      .map((d) => ({
        type: "store" as const,
        label: d.name,
        sub: `${d.area ? d.area + ", " : ""}${d.city}`,
        dealer: d,
      }));

    return [...matchedCities, ...matchedDealers].slice(0, 6);
  }, [searchQuery]);

  // Results inside modal
  const filteredModalDealers = useMemo(() => {
    return searchDealers(modalSearch, modalCategory);
  }, [modalSearch, modalCategory]);

  // Active map embed query
  const mapQuery = useMemo(() => {
    if (selectedDealer) {
      const parts = [
        selectedDealer.name,
        selectedDealer.area,
        selectedDealer.city,
        selectedDealer.state,
        "India",
      ].filter(Boolean);
      return encodeURIComponent(parts.join(", "));
    }
    if (searchQuery.trim()) {
      return encodeURIComponent(`${searchQuery.trim()}, India`);
    }
    return encodeURIComponent(
      "Designer World, Mumbai, Maharashtra, India"
    );
  }, [selectedDealer, searchQuery]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [modalOpen]);

  return (
    <section className="bg-[#F5F3EF] py-16 md:py-24 border-t border-[#E8E3DA]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1340px] mx-auto px-6 sm:px-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ── Left Column: Form & Search ── */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1.5px] bg-[#003926]" />
              <span className="font-montserrat text-[11px] uppercase tracking-[0.25em] text-[#003926] font-semibold">
                Authorized Retail Network
              </span>
            </div>

            <h2
              className="font-cormorant text-[36px] sm:text-[44px] md:text-[50px] text-[#1A1918] font-semibold leading-[1.12] mb-7"
              style={{ fontStyle: "italic" }}
            >
              Find Your
              <br />
              Nearest Store
            </h2>

            <p className="font-montserrat text-[13px] text-[#6B6560] leading-[1.7] mb-7 max-w-lg">
              Explore 200+ authorized retail partners, boutique showrooms, and
              official stockists across India offering authentic D&apos;SIGNER &
              ESCORT timepieces with warranty support.
            </p>

            <div className="w-full max-w-md flex flex-col gap-3.5 mb-7">
              {/* Category Dropdown (Only D'Signer Watches & Escort Watches) */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full text-left px-5 py-3.5 bg-white border border-[#D8D3CB] text-[13.5px] font-montserrat text-[#1A1918] focus:outline-none focus:border-[#003926] transition-colors duration-200 flex items-center justify-between shadow-sm rounded-sm cursor-pointer"
                >
                  <span className={category ? "text-[#1A1918] font-medium" : "text-[#6B6560]"}>
                    {category || "Choose Category"}
                  </span>
                  <svg
                    className={`w-4 h-4 text-[#9C9690] transition-transform duration-200 shrink-0 ml-2 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 w-full bg-white border border-[#D8D3CB] border-t-0 z-30 shadow-xl rounded-b-sm overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                    {dealerCategories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          // Toggle category selection
                          setCategory(category === cat ? "" : cat);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3 text-[13px] font-montserrat transition-colors cursor-pointer ${
                          category === cat
                            ? "bg-[#003926] text-white font-medium"
                            : "text-[#6B6560] hover:bg-[#F0EDE8] hover:text-[#003926]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* City / State / Pincode Search Input with Live Dropdown */}
              <div className="relative" ref={autocompleteRef}>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setAutocompleteOpen(true);
                  }}
                  onFocus={() => {
                    if (searchQuery.trim()) setAutocompleteOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleOpenModal();
                    }
                  }}
                  placeholder="Enter City, State, Area or Store Name"
                  className="w-full px-5 py-3.5 pr-11 bg-white border border-[#D8D3CB] text-[13.5px] font-montserrat text-[#1A1918] placeholder-[#9C9690] focus:outline-none focus:border-[#003926] transition-colors duration-200 shadow-sm rounded-sm"
                />
                <button
                  type="button"
                  onClick={() => handleOpenModal()}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9C9690] hover:text-[#003926] transition-colors p-1 cursor-pointer"
                  aria-label="Search"
                >
                  <MapPin size={18} />
                </button>

                {/* Autocomplete Dropdown */}
                {autocompleteOpen && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white border border-[#D8D3CB] border-t-0 z-30 shadow-2xl rounded-b-sm overflow-hidden">
                    <div className="px-4 py-2 bg-[#F8F6F2] border-b border-[#EAE5DC] text-[10.5px] font-montserrat font-bold text-[#8C857B] tracking-wider uppercase">
                      Quick Suggestions
                    </div>
                    {suggestions.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSearchQuery(item.label);
                          if (item.type === "store" && item.dealer) {
                            setSelectedDealer(item.dealer);
                          }
                          setAutocompleteOpen(false);
                          handleOpenModal(item.label);
                        }}
                        className="w-full text-left px-5 py-2.5 hover:bg-[#F0EDE8] transition-colors flex items-center justify-between group border-b border-[#F5F2EB] last:border-0 cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {item.type === "city" ? (
                            <MapPin size={13} className="text-[#003926] shrink-0" />
                          ) : (
                            <Building2 size={13} className="text-[#003926] shrink-0" />
                          )}
                          <span className="text-[13px] font-montserrat text-[#1A1918] font-medium group-hover:text-[#003926] truncate">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-[10.5px] font-montserrat text-[#9C9690] shrink-0 uppercase tracking-wider">
                          {item.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Popular Cities */}
            <div className="mb-7 flex flex-wrap items-center gap-1.5 max-w-md">
              <span className="text-[11px] font-montserrat text-[#8C857B] font-semibold uppercase tracking-wider mr-1">
                Popular:
              </span>
              {POPULAR_CITIES.slice(0, 6).map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setSearchQuery(city);
                    handleOpenModal(city);
                  }}
                  className="text-[11px] font-montserrat font-medium text-[#003926] bg-white border border-[#DCD6CC] hover:bg-[#003926] hover:text-white px-2.5 py-1 transition-all duration-200 rounded-sm shadow-2xs cursor-pointer"
                >
                  {city}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <motion.button
                type="button"
                onClick={() => handleOpenModal()}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 24px rgba(0,57,38,0.22)",
                }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-[#003926] text-white px-8 py-4 font-montserrat text-[12px] tracking-[0.14em] uppercase font-semibold hover:bg-[#024D35] transition-all duration-300 cursor-pointer shadow-md rounded-sm"
              >
                <span>View Stores ({dealers.length})</span>
                <ArrowRight size={15} />
              </motion.button>

              {(searchQuery || category) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setCategory("");
                    setSelectedDealer(null);
                  }}
                  className="text-[12px] font-montserrat text-[#8C857B] hover:text-[#003926] underline transition-colors cursor-pointer"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>

          {/* ── Right Column: Interactive Map Preview ── */}
          <div className="lg:col-span-6 relative w-full overflow-hidden rounded-sm shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-[#E0DACE] bg-white">
            {/* Top Right Active Dealer Badge */}
            {selectedDealer && (
              <div className="absolute top-3 right-3 z-10 bg-[#003926] text-white text-[11px] font-montserrat font-medium px-3 py-1.5 shadow-md rounded-sm truncate max-w-[220px]">
                📍 {selectedDealer.name}
              </div>
            )}

            {/* Map Frame */}
            <div className="relative w-full" style={{ paddingBottom: "62%" }}>
              <iframe
                src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                className="absolute inset-0 w-full h-full border-0 grayscale-[20%] contrast-[1.05]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Designer World Store Location"
              />
            </div>

            {/* Bottom info footer on map */}
            <div className="px-5 py-3 bg-[#FAF8F4] border-t border-[#EAE5DC] flex items-center justify-between text-[11.5px] font-montserrat text-[#6B6560]">
              <div className="flex items-center gap-2 truncate">
                <ShieldCheck size={14} className="text-[#003926] shrink-0" />
                <span className="truncate">
                  {selectedDealer
                    ? `${selectedDealer.name} — ${selectedDealer.city}${
                        selectedDealer.state ? `, ${selectedDealer.state}` : ""
                      }`
                    : "Over 200+ Verified Dealerships Across India"}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#003926] font-semibold hover:underline uppercase text-[11px] tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <span>Open in Maps</span>
                  <ExternalLink size={11} />
                </a>
                <span className="text-[#D0C9BE]">|</span>
                <button
                  type="button"
                  onClick={() => handleOpenModal()}
                  className="text-[#003926] font-semibold hover:underline uppercase text-[11px] tracking-wider cursor-pointer"
                >
                  Browse All
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════
          MODAL: ULTRA-SMOOTH STORE LIST & SEARCH (225+ DEALERS)
          ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-5 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-black/75 cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-5xl bg-[#FAF8F4] h-[88vh] max-h-[88vh] flex flex-col shadow-2xl rounded-sm border border-[#D8D3CB] overflow-hidden z-10"
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 md:px-8 md:py-6 bg-[#003926] text-white shrink-0 relative">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="absolute top-5 right-5 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X size={22} />
                </button>

                <div className="flex items-center gap-2 mb-1.5">
                  <Navigation size={13} className="text-[#D4C5A0]" />
                  <span className="text-[10.5px] font-montserrat tracking-[0.25em] uppercase text-[#D4C5A0] font-semibold">
                    Authorized Dealer Directory
                  </span>
                </div>

                <h3
                  className="font-cormorant text-[26px] sm:text-[34px] font-semibold leading-tight text-white mb-1.5"
                  style={{ fontStyle: "italic" }}
                >
                  Nearest Store Locations
                </h3>

                <p className="text-[12px] font-montserrat text-white/70 max-w-xl">
                  Showing {filteredModalDealers.length} authorized locations
                  {modalSearch ? ` matching "${modalSearch}"` : ""}{" "}
                  {modalCategory ? ` in ${modalCategory}` : ""}.
                </p>
              </div>

              {/* Modal Search & Brand Category Filter Bar */}
              <div className="p-4 sm:p-5 bg-white border-b border-[#E8E3DA] flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between shrink-0">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9C9690] pointer-events-none"
                  />
                  <input
                    type="text"
                    value={modalSearch}
                    onChange={(e) => setModalSearch(e.target.value)}
                    placeholder="Search by city (e.g. Mumbai, Surat, Delhi, Kanpur), store name, state..."
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F4] border border-[#DCD6CC] text-[13.5px] font-montserrat text-[#1A1918] placeholder-[#9C9690] focus:outline-none focus:border-[#003926] rounded-sm transition-colors"
                  />
                  {modalSearch && (
                    <button
                      type="button"
                      onClick={() => setModalSearch("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9C9690] hover:text-[#1A1918] p-1 cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Brand Category Filter Pills (Only D'Signer Watches and Escort Watches) */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none shrink-0">
                  {dealerCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setModalCategory(modalCategory === cat ? "" : cat)}
                      className={`px-3 py-2 text-[11px] font-montserrat whitespace-nowrap rounded-sm font-semibold transition-all duration-150 uppercase tracking-wider cursor-pointer ${
                        modalCategory === cat
                          ? "bg-[#003926] text-white shadow-xs"
                          : "bg-[#F0EDE8] text-[#6B6560] hover:bg-[#E4DFD6] hover:text-[#003926]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                  {modalCategory && (
                    <button
                      type="button"
                      onClick={() => setModalCategory("")}
                      className="text-[11px] font-montserrat text-[#8C857B] hover:text-[#003926] underline px-2 py-1 cursor-pointer whitespace-nowrap"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Quick City Pills in Modal */}
              <div className="px-4 sm:px-6 py-2 bg-[#F6F4EE] border-b border-[#EAE5DC] flex items-center gap-1.5 overflow-x-auto text-[11px] font-montserrat scrollbar-none shrink-0">
                <span className="font-semibold text-[#8C857B] uppercase tracking-wider shrink-0 mr-1">
                  City:
                </span>
                {POPULAR_CITIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setModalSearch(c)}
                    className={`px-2.5 py-1 rounded-sm transition-colors whitespace-nowrap cursor-pointer ${
                      modalSearch.toUpperCase() === c
                        ? "bg-[#003926] text-white font-semibold"
                        : "bg-white border border-[#DCD6CC] text-[#003926] hover:bg-[#EAE5DC]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Dedicated Scroll Container with Lenis Prevent */}
              <div
                ref={scrollContainerRef}
                tabIndex={0}
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-[#FAF8F4] focus:outline-none"
                style={{
                  height: "100%",
                  minHeight: "0px",
                  WebkitOverflowScrolling: "touch",
                  overscrollBehavior: "contain",
                }}
              >
                {filteredModalDealers.length > 0 ? (
                  filteredModalDealers.map((dealer) => (
                    <div
                      key={dealer.id}
                      className="bg-white border border-[#E5E0D8] p-4 sm:p-5 rounded-sm hover:border-[#003926] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      {/* Left Store Info */}
                      <div className="flex-1 space-y-1.5">
                        {/* Title & Brand Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-montserrat font-bold text-[15px] text-[#1A1918] uppercase tracking-[0.02em]">
                            {dealer.name}
                          </h4>
                          {dealer.brands.map((b) => (
                            <span
                              key={b}
                              className={`text-[9.5px] font-montserrat font-bold uppercase tracking-widest px-2 py-0.5 rounded-2xs ${
                                b.includes("D'Signer")
                                  ? "bg-[#003926]/10 text-[#003926] border border-[#003926]/20"
                                  : "bg-[#7A2E39]/10 text-[#7A2E39] border border-[#7A2E39]/20"
                              }`}
                            >
                              {b.replace(" Watches", "")}
                            </span>
                          ))}
                          {dealer.tabs.includes("Sheet1") && (
                            <span className="text-[9.5px] font-montserrat font-bold uppercase tracking-widest px-2 py-0.5 rounded-2xs bg-[#B8935A]/15 text-[#85642E] border border-[#B8935A]/30">
                              Premium Partner
                            </span>
                          )}
                        </div>

                        {/* Location / Area / City / State */}
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-[12px] font-montserrat text-[#6B6560]">
                          <div className="flex items-center gap-1 text-[#1A1918] font-medium">
                            <MapPin size={13} className="text-[#003926] shrink-0" />
                            <span>
                              {dealer.city || "India"}
                              {dealer.state && dealer.state !== dealer.city
                                ? `, ${dealer.state}`
                                : ""}
                            </span>
                          </div>
                          {dealer.area && (
                            <span className="text-[#8C857B]">
                              Area: <strong>{dealer.area}</strong>
                            </span>
                          )}
                          {dealer.location && (
                            <span className="text-[#9C9690] text-[10.5px] uppercase tracking-wider bg-[#F2EFE9] px-2 py-0.5 rounded-2xs">
                              {dealer.location}
                            </span>
                          )}
                        </div>

                        {/* Contact Person & Phone */}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 pt-0.5 text-[11.5px] font-montserrat text-[#5C5750]">
                          {dealer.contactPerson && (
                            <div className="flex items-center gap-1.5">
                              <User size={12} className="text-[#003926]/60 shrink-0" />
                              <span>{dealer.contactPerson}</span>
                            </div>
                          )}
                          {dealer.phone && (
                            <a
                              href={`tel:${dealer.phone}`}
                              className="flex items-center gap-1.5 font-semibold text-[#003926] hover:underline"
                            >
                              <Phone size={12} className="shrink-0" />
                              <span>{dealer.phone}</span>
                            </a>
                          )}
                          {dealer.email && (
                            <a
                              href={`mailto:${dealer.email}`}
                              className="flex items-center gap-1.5 text-[#003926] hover:underline"
                            >
                              <Mail size={12} className="shrink-0" />
                              <span>{dealer.email}</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Right Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#F0ECE4]">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedDealer(dealer);
                            setModalOpen(false);
                          }}
                          className="px-3.5 py-2.5 text-[11px] font-montserrat font-semibold uppercase tracking-wider text-[#003926] bg-[#FAF8F4] border border-[#D4CFC6] hover:bg-[#003926] hover:text-white transition-colors rounded-sm flex items-center gap-1.5 cursor-pointer"
                        >
                          <Navigation size={12} />
                          <span>View on Map</span>
                        </button>

                        <a
                          href={dealer.googleMapsQuery}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 text-[11px] font-montserrat font-bold uppercase tracking-wider text-white bg-[#003926] hover:bg-[#024D35] transition-colors rounded-sm flex items-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <span>Open in Maps</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 bg-white border border-[#E5E0D8] rounded-sm p-8">
                    <MapPin size={36} className="mx-auto text-[#C2BCB2] mb-3" />
                    <h4 className="font-montserrat font-bold text-[15px] text-[#1A1918] mb-1">
                      No matching stores found
                    </h4>
                    <p className="text-[12.5px] font-montserrat text-[#7C766E] max-w-sm mx-auto mb-4">
                      We couldn&apos;t find any stores matching &ldquo;{modalSearch}&rdquo;.
                      Try searching by city name like Mumbai, Delhi, Surat, Kanpur, or reset filters.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setModalSearch("");
                        setModalCategory("");
                      }}
                      className="px-5 py-2.5 bg-[#003926] text-white text-[11.5px] font-montserrat font-semibold uppercase tracking-wider rounded-sm hover:bg-[#024D35] transition-colors cursor-pointer"
                    >
                      Show All Stores ({dealers.length})
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-white border-t border-[#E8E3DA] flex items-center justify-between text-[11.5px] font-montserrat text-[#6B6560] shrink-0">
                <span>
                  Showing {filteredModalDealers.length} of {dealers.length} total
                  locations across 5 regional networks
                </span>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-[#F0EDE8] hover:bg-[#E4DFD6] text-[#003926] font-semibold text-[11px] uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
