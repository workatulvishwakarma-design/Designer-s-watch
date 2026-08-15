"use client";
import WomenGrid from "@/components/sections/women/WomenGrid";
import NewsletterStrip from "@/components/ui/NewsletterStrip";

export default function WomensCollectionPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] relative">
      <WomenGrid />
      <NewsletterStrip />
    </main>
  );
}
