"use client";
import CollectionHero from "@/components/sections/CollectionHero";
import WomenGrid from "@/components/sections/women/WomenGrid";
import SectionDivider from "@/components/ui/SectionDivider";
import NewsletterStrip from "@/components/ui/NewsletterStrip";

export default function WomensDesignerPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] relative">
      <CollectionHero
        title="Women's D'Signer"
        subtitle="Sculpted Elegance & Uncompromised Grace"
        description="Exquisite details, shimmering dial faces, and premium materials designed to grace the wrist of the modern woman. A true embodiment of horological art."
        brand="dsigner"
        gender="women"
        heroImage="/images/new-img/model-2/855/855SM.2G.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections/dsigner" },
          { label: "Women's D'Signer", href: "/collections/womens-designer" },
        ]}
      />
      <SectionDivider />
      <WomenGrid />
      <NewsletterStrip />
    </main>
  );
}
