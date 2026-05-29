"use client";
import CollectionHero from "@/components/sections/CollectionHero";
import MenGrid from "@/components/sections/men/MenGrid";
import SectionDivider from "@/components/ui/SectionDivider";
import NewsletterStrip from "@/components/ui/NewsletterStrip";

export default function MensCollectionPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] relative">
      <CollectionHero
        title="Men's Horology"
        subtitle="The Ultimate Men's Watch Showcase"
        description="Explore our entire catalog of masterfully crafted men's timepieces. From the Swiss-inspired high-complication D'Signer series to our classic, robust Escort lines."
        brand="dsigner"
        gender="men"
        heroImage="/images/new-img/model-1/808/PNG/808GM.8.G.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections/dsigner" },
          { label: "Men's Collection", href: "/collections/men" },
        ]}
      />
      <SectionDivider />
      <MenGrid />
      <NewsletterStrip />
    </main>
  );
}
