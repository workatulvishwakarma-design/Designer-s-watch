"use client";
import EscortGrid from "@/components/sections/escort/EscortGrid";
import NewsletterStrip from "@/components/ui/NewsletterStrip";

export default function MensEscortPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] relative">
      <EscortGrid gender="Men" />
      <NewsletterStrip />
    </main>
  );
}
