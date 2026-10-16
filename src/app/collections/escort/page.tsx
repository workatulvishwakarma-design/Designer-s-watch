import { Metadata } from "next";
import { collections as staticCollections } from "@/data/collections";
import CollectionsDirectoryClient, { CollectionCardData } from "@/components/CollectionsDirectoryClient";
import { ALL_ESCORT_ITEMS } from "@/lib/escortCatalog";

export const metadata: Metadata = {
  title: "ESCORT Collections | Designer World Everyday Luxury",
  description:
    "Discover all signature collections by ESCORT — Classico, Bliss, Bling, and Hustler. Accessible elegance, enduring craftsmanship, and dependable precision for everyday life.",
};

export default async function EscortCollectionsPage() {
  // 1. Filter Escort collections from static registry
  const escortStatic = staticCollections.filter(
    (c) => c.category === "Escort Collections" && c.slug !== "escort"
  );

  // 2. Count active timepieces per collection directly from enriched catalog
  const counts: Record<string, number> = {};
  for (const item of ALL_ESCORT_ITEMS) {
    const slug = (item.collectionSlug || "bliss").toLowerCase();
    counts[slug] = (counts[slug] || 0) + 1;
  }

  // 3. Build CollectionCardData for each Escort collection
  const cards: CollectionCardData[] = escortStatic.map((staticCol) => {
    const totalTimepieces = counts[staticCol.slug] || 0;

    return {
      slug: staticCol.slug,
      name: staticCol.name,
      meaning: staticCol.meaning,
      description: staticCol.description,
      identity: staticCol.identity,
      category:
        staticCol.gender === "Men"
          ? "Men's Collections"
          : staticCol.gender === "Women"
          ? "Women's Collections"
          : "Unisex Collections",
      gender: staticCol.gender || "Unisex",
      heroImage: staticCol.heroImage || staticCol.featuredImage,
      modelFamilies: staticCol.modelFamilies || [],
      totalTimepieces,
    };
  });

  return (
    <CollectionsDirectoryClient
      collections={cards}
      badgeText="Everyday Luxury Directory"
      brandTitle="ESCORT COLLECTIONS"
      subtitle="Explore the signature collections from ESCORT. From the classic distinction of Classico to the serene grace of Bliss, radiant elegance of Bling, and dynamic ambition of Hustler, select any collection to discover its complete range of timepieces."
      categories={["All", "Men's Collections", "Women's Collections", "Unisex Collections"]}
      searchPlaceholder="Search Escort collections (e.g. Bliss, Classico, 1890)..."
    />
  );
}
