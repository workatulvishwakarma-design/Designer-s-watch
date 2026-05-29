"use client";
import CollectionHero from "@/components/sections/CollectionHero";
import WomenGrid from "@/components/sections/women/WomenGrid";
import SectionDivider from "@/components/ui/SectionDivider";
import NewsletterStrip from "@/components/ui/NewsletterStrip";

export default function WomensEscortPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] relative">
      <CollectionHero
        title="Women's Escort"
        subtitle="Simplicity, Grace & Versatility"
        description="Delicate silhouettes and clean styling make the Women's Escort series the perfect daily luxury. Created for the woman who values balanced, understated design and reliable mechanical timekeeping."
        brand="escort"
        gender="women"
        heroImage="/images/new-img/model-2/852/852SM.2G.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections/escort" },
          { label: "Women's Escort", href: "/collections/womens-escort" },
        ]}
      />
      <SectionDivider />
      <WomenGrid />
      <NewsletterStrip />
    </main>
  );
}
