import type { Metadata } from "next";
import DsignerMenGrid from "@/components/sections/dsigner-men/DsignerMenGrid";
import NewsletterStrip from "@/components/ui/NewsletterStrip";

export const metadata: Metadata = {
  title: "D'SIGNER Men's 680 Series | Designer World",
  description: "Explore the D'SIGNER 680 Series Men's watch collection. Precision crafted analogue timepieces with genuine leather straps and premium quartz movements.",
  openGraph: {
    title: "D'SIGNER Men's 680 Series | Designer World",
    description: "Explore the D'SIGNER 680 Series Men's watch collection.",
    images: ["/images/new-img/model-1/680/680BL.16G/680BL (1).jpg"],
  }
};

export default function DsignerMenPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] relative">
      <DsignerMenGrid />
      <NewsletterStrip />
    </main>
  );
}
