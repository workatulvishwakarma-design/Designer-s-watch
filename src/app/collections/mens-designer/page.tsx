"use client";
import CollectionHero from "@/components/sections/CollectionHero";
import MenGrid from "@/components/sections/men/MenGrid";
import SectionDivider from "@/components/ui/SectionDivider";
import NewsletterStrip from "@/components/ui/NewsletterStrip";

export default function MensDesignerPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] relative">
      <CollectionHero
        title="Men's D'Signer"
        subtitle="Precision Meets Commanding Aesthetics"
        description="Engineered with surgical-grade stainless steel and sapphire glass. Premium luxury timepieces crafted for the modern man who defines his own legacy."
        brand="dsigner"
        gender="men"
        heroImage="/images/new-img/model-1/808/PNG/808GM.8.G.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections/dsigner" },
          { label: "Men's D'Signer", href: "/collections/mens-designer" },
        ]}
      />
      <SectionDivider />
      <MenGrid />
      <NewsletterStrip />
    </main>
  );
}
