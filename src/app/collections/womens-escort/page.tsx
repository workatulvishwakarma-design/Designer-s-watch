"use client";
import CollectionHero from "@/components/sections/CollectionHero";
import EscortGrid from "@/components/sections/escort/EscortGrid";
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
        heroImage="/images/watches/Escort/E-7914/E-7914.RGM_Rose Gold.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections/escort" },
          { label: "Women's Escort", href: "/collections/womens-escort" },
        ]}
      />
      <SectionDivider />
      <EscortGrid gender="Women" />
      <NewsletterStrip />
    </main>
  );
}
