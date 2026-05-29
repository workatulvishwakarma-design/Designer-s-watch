"use client";
import CollectionHero from "@/components/sections/CollectionHero";
import WomenGrid from "@/components/sections/women/WomenGrid";
import SectionDivider from "@/components/ui/SectionDivider";
import NewsletterStrip from "@/components/ui/NewsletterStrip";

export default function WomensCollectionPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] relative">
      <CollectionHero
        title="Women's Horology"
        subtitle="The Ultimate Women's Watch Showcase"
        description="Explore our complete boutique of exceptional women's watches. Showcasing refined designs, mother-of-pearl dials, luxury stone-settings, and sleek, classic timekeeping shapes."
        brand="dsigner"
        gender="women"
        heroImage="/images/new-img/model-2/855/855SM.2G.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections/dsigner" },
          { label: "Women's Collection", href: "/collections/women" },
        ]}
      />
      <SectionDivider />
      <WomenGrid />
      <NewsletterStrip />
    </main>
  );
}
