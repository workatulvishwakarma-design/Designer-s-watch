import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { collections as staticCollections } from "@/data/collections";
import { getFamiliesByCollection } from "@/data/productData";
import CollectionsDirectoryClient, { CollectionCardData } from "@/components/CollectionsDirectoryClient";

export const metadata: Metadata = {
  title: "D'SIGNER Collections | Designer World Haute Horlogerie",
  description:
    "Discover all 24 luxury watch collections by D'SIGNER. Explore timepieces crafted across four generations of watchmaking excellence.",
};

export default async function CollectionsPage() {
  // 1. Fetch collections from DB (excluding escort)
  let dbCollections: any[] = [];
  try {
    if (prisma.collection) {
      dbCollections = await prisma.collection.findMany({
        where: {
          slug: { not: "escort" },
          visibility: true,
        },
        include: {
          families: {
            where: { status: "ACTIVE" },
            include: { variants: true },
          },
        },
        orderBy: { sortPriority: "asc" },
      });
    }
  } catch (error) {
    console.warn("CollectionsPage: DB query for collections failed:", (error as Error).message);
  }

  // 2. Build collection card data by merging DB collections with static metadata
  const dsignerStatic = staticCollections.filter((c) => c.slug !== "escort");

  const cards: CollectionCardData[] = dsignerStatic.map((staticCol) => {
    const matchedDb = dbCollections.find((c) => c.slug === staticCol.slug);
    
    // Calculate total timepiece/variant count from static catalog + DB
    const staticFamilies = getFamiliesByCollection(staticCol.slug);
    const staticTotal = staticFamilies.reduce((sum, f) => sum + f.variants.length, 0);
    
    const dbTotal = matchedDb?.families?.reduce(
      (sum: number, f: any) => sum + (f.variants?.length || 0),
      0
    ) || 0;

    const totalTimepieces = Math.max(staticTotal, dbTotal, 1);

    return {
      slug: staticCol.slug,
      name: matchedDb?.name || staticCol.name,
      meaning: matchedDb?.philosophy || staticCol.meaning,
      description: matchedDb?.description || staticCol.description,
      identity: matchedDb?.identity || staticCol.identity,
      category: staticCol.category || "Signature Collections",
      gender: staticCol.gender || "Unisex",
      heroImage: matchedDb?.bannerImage || staticCol.heroImage || staticCol.featuredImage,
      modelFamilies: staticCol.modelFamilies || [],
      totalTimepieces,
    };
  });

  return <CollectionsDirectoryClient collections={cards} />;
}
