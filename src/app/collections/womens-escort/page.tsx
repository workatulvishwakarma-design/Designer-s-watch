"use client";
import EscortGrid from "@/components/sections/escort/EscortGrid";
import NewsletterStrip from "@/components/ui/NewsletterStrip";

export default function WomensEscortPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] relative">
      <EscortGrid gender="Women" />
      <NewsletterStrip />
    </main>
  );
}
