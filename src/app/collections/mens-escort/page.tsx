"use client";
import CollectionHero from "@/components/sections/CollectionHero";
import EscortGrid from "@/components/sections/escort/EscortGrid";
import SectionDivider from "@/components/ui/SectionDivider";
import NewsletterStrip from "@/components/ui/NewsletterStrip";

export default function MensEscortPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] relative">
      <CollectionHero
        title="Men's Escort"
        subtitle="Everyday Horological Excellence"
        description="Designed for standard luxury and daily performance. Precision movements housed in durable, classic cases that suit any lifestyle, seamlessly translating from daytime work to evening events."
        brand="escort"
        gender="men"
        heroImage="/images/watches/Escort/E-7751/E-7751.SM_Blue.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections/escort" },
          { label: "Men's Escort", href: "/collections/mens-escort" },
        ]}
      />
      <SectionDivider />
      <EscortGrid gender="Men" />
      <NewsletterStrip />
    </main>
  );
}
