import type { Metadata } from "next";
import DsignerWomensGrid from "@/components/sections/dsigner-womens/DsignerWomensGrid";
import NewsletterStrip from "@/components/ui/NewsletterStrip";

export const metadata: Metadata = {
  title: "D'SIGNER Women's 670 Series | Designer World",
  description: "Explore the D'SIGNER 670 Series Women's watch collection. Precision crafted analogue timepieces with luxury mesh bracelets and premium quartz movements.",
};

export default function DsignerWomensPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] relative">
      <DsignerWomensGrid />
      <NewsletterStrip />
    </main>
  );
}
