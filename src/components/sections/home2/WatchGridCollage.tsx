"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getCollectionProducts } from "@/lib/collectionProducts";
import type { ModelFamilyGroup } from "@/types/product";

interface GridCollectionItem {
  id: string;
  collectionSlug: string;
  label: string;
  src: string;
  alt: string;
}

const IMAGES: Record<string, GridCollectionItem> = {
  col1: {
    id: "col1",
    collectionSlug: "grandeur",
    label: "GRANDEUR",
    src: "/images/new-img/home-2-dark.jpg",
    alt: "D'Signer Grandeur – Luxury Skeleton Automatic",
  },
  col2_top: {
    id: "col2_top",
    collectionSlug: "tactix",
    label: "TACTIX",
    src: "/images/models/875RGBLM.5G.jpg",
    alt: "D'Signer Tactix – Rose Gold Black Link Bracelet",
  },
  col2_bottom: {
    id: "col2_bottom",
    collectionSlug: "tactix",
    label: "TACTIX",
    src: "/images/models/875RGGNM.3G.jpg",
    alt: "D'Signer Tactix – Rose Gold Multi Sub-Dial",
  },
  col3_top: {
    id: "col3_top",
    collectionSlug: "grandeur",
    label: "GRANDEUR",
    src: "/images/models/980GFS.16.jpg",
    alt: "D'Signer Grandeur – Green Gold Skeleton Tourbillon",
  },
  col3_bottom: {
    id: "col3_bottom",
    collectionSlug: "stratos",
    label: "STRATOS",
    src: "/images/models/916GNM.16G.jpg",
    alt: "D'Signer Stratos – Green Drum Chrono",
  },
  col4: {
    id: "col4",
    collectionSlug: "grandeur",
    label: "GRANDEUR",
    src: "/images/new-img/model-1/824/824-RGFS-3-nobg.png",
    alt: "D'Signer Grandeur",
  },
};

export default function WatchGridCollage() {
  const [activePreview, setActivePreview] = useState<{ slug: string; name: string } | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number>(0);

  // Retrieve genuine collection products dynamically from catalogue
  const previewProducts = useMemo<ModelFamilyGroup[]>(() => {
    if (!activePreview?.slug) return [];
    const all = getCollectionProducts(activePreview.slug);
    // Return up to 8 verified products with images and prices
    return all.filter((p) => p.variants?.[0]?.gallery?.primary && p.priceRange.min > 0).slice(0, 8);
  }, [activePreview?.slug]);

  // Reset index when active collection changes
  useEffect(() => {
    setPreviewIndex(0);
  }, [activePreview?.slug]);

  // Lock body scroll and handle Escape key when popup is open
  useEffect(() => {
    if (!activePreview) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePreview(null);
      } else if (e.key === "ArrowLeft") {
        setPreviewIndex((prev) => (prev > 0 ? prev - 1 : previewProducts.length - 1));
      } else if (e.key === "ArrowRight") {
        setPreviewIndex((prev) => (prev < previewProducts.length - 1 ? prev + 1 : 0));
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePreview, previewProducts.length]);

  const handleOpenPreview = useCallback((slug: string, name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActivePreview({ slug, name });
  }, []);

  const handleClosePreview = useCallback(() => {
    setActivePreview(null);
  }, []);

  const currentProduct = previewProducts[previewIndex] || previewProducts[0];
  const currentVariant = currentProduct?.variants?.[0];
  const currentImage = currentVariant?.gallery?.primary || "/images/placeholder-watch.png";
  const currentPrice = currentProduct?.priceRange.min
    ? `₹${currentProduct.priceRange.min.toLocaleString("en-IN")}`
    : "Price on Request";

  return (
    <section className="relative w-full bg-[#E8E4DC] py-14 md:py-24 px-4 sm:px-8 overflow-hidden select-none">
      {/* Main Full-Width Catalog Shell Container */}
      <div className="relative w-full max-w-[1800px] mx-auto p-4 sm:p-8 md:p-12 overflow-hidden">
        
        {/* Top Header & Navigation */}
        <div className="flex flex-col items-center justify-center text-center mb-8 md:mb-12 relative z-10">
          <span className="font-montserrat text-[10px] sm:text-[11px] tracking-[0.35em] text-[#003926] font-semibold uppercase mb-2">
            ✦ LIFESTYLE EDITORIAL ✦
          </span>
          <h2 className="font-montserrat text-[28px] sm:text-[40px] md:text-[48px] text-[#1A1918] font-medium leading-none tracking-[-0.01em]">
            Horology on Wrist
          </h2>
        </div>

        {/* 4-Column Grid Collage with Edge-to-Edge Premium Fitting Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 items-stretch relative z-10">
          
          {/* COLUMN 1: Tall Left Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden aspect-[3/5] bg-[#0A120E] group rounded-sm border border-black/10 shadow-lg cursor-pointer"
          >
            {/* Clickable Card Link to Collection Page */}
            <Link
              href={`/collections/${IMAGES.col1.collectionSlug}`}
              className="absolute inset-0 z-10 block cursor-pointer"
              aria-label={`Explore ${IMAGES.col1.label} Collection`}
            />

            <Image
              src={IMAGES.col1.src}
              alt={IMAGES.col1.alt}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
              sizes="(max-width: 768px) 100vw, 25vw"
              priority
            />
            {/* Dark Gradient Overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
              <span className="font-montserrat text-[12px] text-white font-medium tracking-wider block bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/20 shadow-md group-hover:border-white/40 transition-colors">
                {IMAGES.col1.label}
              </span>
            </div>

            {/* Plus Quick-Preview Modal Button */}
            <button
              type="button"
              onClick={(e) => handleOpenPreview(IMAGES.col1.collectionSlug, IMAGES.col1.label, e)}
              className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-transparent text-white flex items-center justify-center hover:bg-[#003926] hover:border-[#003926] transition-all duration-300 cursor-pointer border border-white/40 backdrop-blur-sm shadow-lg"
              title={`Preview ${IMAGES.col1.label} Collection`}
              aria-label={`Preview ${IMAGES.col1.label} Collection`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </motion.div>

          {/* COLUMN 2: Two Stacked Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 md:gap-5"
          >
            {/* Top Card */}
            <div className="relative overflow-hidden aspect-[4/3] bg-[#0A120E] group flex-grow rounded-sm border border-black/10 shadow-lg cursor-pointer">
              <Link
                href={`/collections/${IMAGES.col2_top.collectionSlug}`}
                className="absolute inset-0 z-10 block cursor-pointer"
                aria-label={`Explore ${IMAGES.col2_top.label} Collection`}
              />

              <Image
                src={IMAGES.col2_top.src}
                alt={IMAGES.col2_top.alt}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="font-montserrat text-[12px] text-white font-medium tracking-wider block bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/20 shadow-md group-hover:border-white/40 transition-colors">
                  {IMAGES.col2_top.label}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => handleOpenPreview(IMAGES.col2_top.collectionSlug, IMAGES.col2_top.label, e)}
                className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-transparent text-white flex items-center justify-center hover:bg-[#003926] hover:border-[#003926] transition-all duration-300 cursor-pointer border border-white/40 backdrop-blur-sm shadow-lg"
                title={`Preview ${IMAGES.col2_top.label} Collection`}
                aria-label={`Preview ${IMAGES.col2_top.label} Collection`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>

            {/* Bottom Card */}
            <div className="relative overflow-hidden aspect-[4/3] bg-[#0A120E] group flex-grow rounded-sm border border-black/10 shadow-lg cursor-pointer">
              <Link
                href={`/collections/${IMAGES.col2_bottom.collectionSlug}`}
                className="absolute inset-0 z-10 block cursor-pointer"
                aria-label={`Explore ${IMAGES.col2_bottom.label} Collection`}
              />

              <Image
                src={IMAGES.col2_bottom.src}
                alt={IMAGES.col2_bottom.alt}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="font-montserrat text-[12px] text-white font-medium tracking-wider block bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/20 shadow-md group-hover:border-white/40 transition-colors">
                  {IMAGES.col2_bottom.label}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => handleOpenPreview(IMAGES.col2_bottom.collectionSlug, IMAGES.col2_bottom.label, e)}
                className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-transparent text-white flex items-center justify-center hover:bg-[#003926] hover:border-[#003926] transition-all duration-300 cursor-pointer border border-white/40 backdrop-blur-sm shadow-lg"
                title={`Preview ${IMAGES.col2_bottom.label} Collection`}
                aria-label={`Preview ${IMAGES.col2_bottom.label} Collection`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* COLUMN 3: Two Stacked Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 md:gap-5"
          >
            {/* Top Card */}
            <div className="relative overflow-hidden aspect-[4/3] bg-[#0A120E] group flex-grow rounded-sm border border-black/10 shadow-lg cursor-pointer">
              <Link
                href={`/collections/${IMAGES.col3_top.collectionSlug}`}
                className="absolute inset-0 z-10 block cursor-pointer"
                aria-label={`Explore ${IMAGES.col3_top.label} Collection`}
              />

              <Image
                src={IMAGES.col3_top.src}
                alt={IMAGES.col3_top.alt}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="font-montserrat text-[12px] text-white font-medium tracking-wider block bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/20 shadow-md group-hover:border-white/40 transition-colors">
                  {IMAGES.col3_top.label}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => handleOpenPreview(IMAGES.col3_top.collectionSlug, IMAGES.col3_top.label, e)}
                className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-transparent text-white flex items-center justify-center hover:bg-[#003926] hover:border-[#003926] transition-all duration-300 cursor-pointer border border-white/40 backdrop-blur-sm shadow-lg"
                title={`Preview ${IMAGES.col3_top.label} Collection`}
                aria-label={`Preview ${IMAGES.col3_top.label} Collection`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>

            {/* Bottom Card */}
            <div className="relative overflow-hidden aspect-[4/3] bg-[#0A120E] group flex-grow rounded-sm border border-black/10 shadow-lg cursor-pointer">
              <Link
                href={`/collections/${IMAGES.col3_bottom.collectionSlug}`}
                className="absolute inset-0 z-10 block cursor-pointer"
                aria-label={`Explore ${IMAGES.col3_bottom.label} Collection`}
              />

              <Image
                src={IMAGES.col3_bottom.src}
                alt={IMAGES.col3_bottom.alt}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="font-montserrat text-[12px] text-white font-medium tracking-wider block bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/20 shadow-md group-hover:border-white/40 transition-colors">
                  {IMAGES.col3_bottom.label}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => handleOpenPreview(IMAGES.col3_bottom.collectionSlug, IMAGES.col3_bottom.label, e)}
                className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-transparent text-white flex items-center justify-center hover:bg-[#003926] hover:border-[#003926] transition-all duration-300 cursor-pointer border border-white/40 backdrop-blur-sm shadow-lg"
                title={`Preview ${IMAGES.col3_bottom.label} Collection`}
                aria-label={`Preview ${IMAGES.col3_bottom.label} Collection`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* COLUMN 4: Tall Right Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden aspect-[3/5] bg-[#0A120E] group rounded-sm border border-black/10 shadow-lg cursor-pointer"
          >
            <Link
              href={`/collections/${IMAGES.col4.collectionSlug}`}
              className="absolute inset-0 z-10 block cursor-pointer"
              aria-label={`Explore ${IMAGES.col4.label} Collection`}
            />

            {/* Cutout PNG Watch product styling with dark background */}
            <div className="relative w-full h-full p-6 flex items-center justify-center pointer-events-none">
              <Image
                src={IMAGES.col4.src}
                alt={IMAGES.col4.alt}
                fill
                unoptimized
                className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-108 drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                sizes="(max-width: 768px) 100vw, 25vw"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
              <span className="font-montserrat text-[12px] text-white font-medium tracking-wider block bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/20 shadow-md group-hover:border-white/40 transition-colors">
                {IMAGES.col4.label}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => handleOpenPreview(IMAGES.col4.collectionSlug, IMAGES.col4.label, e)}
              className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-transparent text-white flex items-center justify-center hover:bg-[#003926] hover:border-[#003926] transition-all duration-300 cursor-pointer border border-white/40 backdrop-blur-sm shadow-lg"
              title={`Preview ${IMAGES.col4.label} Collection`}
              aria-label={`Preview ${IMAGES.col4.label} Collection`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </motion.div>

        </div>

      </div>

      {/* ─── LUXURY QUICK PREVIEW MODAL ─── */}
      <AnimatePresence>
        {activePreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-auto">
            {/* Backdrop with luxury dark blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClosePreview}
              className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md sm:max-w-lg bg-[#FAF8F4] border border-[#E0D8CE] shadow-2xl rounded-sm overflow-hidden z-10 text-[#1A1918]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#EAE4D9]">
                <div>
                  <span className="font-montserrat text-[10px] tracking-[0.25em] text-[#B8935A] uppercase font-bold block mb-0.5">
                    COLLECTION PREVIEW
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl text-[#1A1918] font-normal leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {activePreview.name} Collection
                  </h3>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleClosePreview}
                  className="w-8 h-8 rounded-full border border-[#D5CEC4] bg-white text-[#1A1918] flex items-center justify-center hover:bg-[#1A1918] hover:text-white transition-colors cursor-pointer shadow-xs"
                  aria-label="Close Preview"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Modal Body: Curated Watch Showcase */}
              <div className="p-6">
                {previewProducts.length > 0 && currentProduct ? (
                  <div className="flex flex-col items-center">
                    
                    {/* Watch Image Stage with Navigation Arrows */}
                    <div className="relative w-full h-64 sm:h-72 flex items-center justify-center bg-gradient-to-b from-[#F2ECE0]/50 to-transparent rounded-sm p-4 overflow-hidden">
                      
                      {/* Previous Arrow */}
                      {previewProducts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setPreviewIndex((prev) => (prev > 0 ? prev - 1 : previewProducts.length - 1))}
                          className="absolute left-2 z-20 w-8 h-8 rounded-full border border-[#D5CEC4] bg-white/90 text-[#1A1918] flex items-center justify-center hover:bg-[#003926] hover:text-white hover:border-[#003926] transition-all cursor-pointer shadow-sm"
                          aria-label="Previous model"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                        </button>
                      )}

                      {/* Watch Image Display */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`preview-${currentProduct.slug}-${previewIndex}`}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.25 }}
                          className="relative w-full h-full flex items-center justify-center"
                        >
                          <Image
                            src={currentImage}
                            alt={currentProduct.name}
                            fill
                            className="object-contain p-2"
                            sizes="(max-width: 640px) 240px, 320px"
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Next Arrow */}
                      {previewProducts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setPreviewIndex((prev) => (prev < previewProducts.length - 1 ? prev + 1 : 0))}
                          className="absolute right-2 z-20 w-8 h-8 rounded-full border border-[#D5CEC4] bg-white/90 text-[#1A1918] flex items-center justify-center hover:bg-[#003926] hover:text-white hover:border-[#003926] transition-all cursor-pointer shadow-sm"
                          aria-label="Next model"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Model Details */}
                    <div className="text-center mt-4 w-full">
                      <span className="inline-block font-montserrat text-[10px] font-semibold tracking-widest text-[#003926] bg-[#003926]/8 px-2.5 py-0.5 rounded-full uppercase mb-1">
                        {currentProduct.gender || "Luxury"} • {currentProduct.category || "Timepiece"}
                      </span>
                      <h4 className="font-montserrat text-base sm:text-lg font-semibold text-[#1A1918] tracking-wide truncate px-2">
                        {currentProduct.name}
                      </h4>
                      <p className="font-montserrat text-sm font-bold text-[#003926] mt-0.5">
                        {currentPrice}
                      </p>
                    </div>

                    {/* Dot Pagination Indicators */}
                    {previewProducts.length > 1 && (
                      <div className="flex items-center gap-1.5 mt-3">
                        {previewProducts.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setPreviewIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`h-1.5 rounded-full transition-all cursor-pointer ${
                              idx === previewIndex
                                ? "w-5 bg-[#003926]"
                                : "w-1.5 bg-[#D5CEC4] hover:bg-[#B8935A]"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="py-12 text-center text-[#7A7368] font-montserrat text-sm">
                    Discover exquisite handcrafted models in this collection.
                  </div>
                )}
              </div>

              {/* Modal Footer CTA */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/collections/${activePreview.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-[#003926] text-white font-montserrat text-[11px] sm:text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-[#0E4A35] transition-all shadow-md group cursor-pointer"
                  onClick={handleClosePreview}
                >
                  <span>EXPLORE COLLECTION</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </Link>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
