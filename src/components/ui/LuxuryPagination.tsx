"use client";

import React from "react";

interface LuxuryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export default function LuxuryPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage
}: LuxuryPaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers with smart ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="mt-16 pt-8 border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-6">
      {/* Items count label */}
      <p className="font-dm text-xs tracking-wider uppercase text-[#707070]">
        Showing <span className="text-[#1A1918] font-medium">{startItem}–{endItem}</span> of{" "}
        <span className="text-[#1A1918] font-medium">{totalItems}</span> timepieces
      </p>

      {/* Pagination controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-dm text-xs tracking-widest uppercase border transition-all duration-300 ${
            currentPage === 1
              ? "border-[#E8E2D9] text-[#C5BEB5] cursor-not-allowed opacity-50"
              : "border-[#D5CEBF] bg-white text-[#1A1918] hover:border-[#B8935A] hover:text-[#B8935A] hover:bg-[#FAF8F4] cursor-pointer shadow-sm"
          }`}
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Number Buttons */}
        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            if (p === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-9 h-9 flex items-center justify-center font-dm text-xs text-[#9C9690]"
                >
                  ...
                </span>
              );
            }

            const pageNum = p as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={`page-${pageNum}`}
                onClick={() => onPageChange(pageNum)}
                aria-current={isActive ? "page" : undefined}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-dm text-xs font-medium transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? "bg-[#1A1918] text-[#FAF8F4] border border-[#1A1918] shadow-sm scale-105"
                    : "bg-white text-[#1A1918] border border-[#E8E2D9] hover:border-[#B8935A] hover:text-[#B8935A] hover:bg-[#FAF8F4] cursor-pointer"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-dm text-xs tracking-widest uppercase border transition-all duration-300 ${
            currentPage === totalPages
              ? "border-[#E8E2D9] text-[#C5BEB5] cursor-not-allowed opacity-50"
              : "border-[#D5CEBF] bg-white text-[#1A1918] hover:border-[#B8935A] hover:text-[#B8935A] hover:bg-[#FAF8F4] cursor-pointer shadow-sm"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
