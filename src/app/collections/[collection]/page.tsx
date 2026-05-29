import { prisma } from "@/lib/db";
import { mapPrismaFamilyToGroup } from "@/lib/prismaMappers";
import CollectionClient from "@/components/CollectionClient";
import { getFamiliesByCollection } from "@/data/productData";
import { getCollectionBySlug } from "@/data/collections";

export default async function CollectionPage({ params }: { params: { collection: string } }) {
  const slug = params.collection;

  let dbCollection = null;
  let rawFamilies: any[] = [];

  // 1. Try DB for collection
  try {
    if (prisma.collection) {
      dbCollection = await prisma.collection.findUnique({
        where: { slug }
      });
    }
  } catch (error) {
    console.warn("CollectionPage: DB query for collection failed:", (error as Error).message);
  }

  const hardcodedCollection = getCollectionBySlug(slug);
  
  const collectionData = dbCollection || hardcodedCollection || {
    name: slug,
    slug: slug,
    description: "Discover our exclusive timepieces.",
    gender: "Unisex",
    identity: "CLASSIC",
    meaning: "Elegance and Precision"
  };

  // 2. Try DB for families
  try {
    if (prisma.productFamily) {
      rawFamilies = await prisma.productFamily.findMany({
        where: { 
          collection: { slug: slug },
          status: "ACTIVE" 
        },
        include: {
          collection: true,
          variants: {
            include: { images: true, inventory: true },
          },
          images: true,
        },
      });
    }
  } catch (error) {
    console.warn("CollectionPage: DB query for families failed:", (error as Error).message);
  }

  let families = [];
  if (rawFamilies.length > 0) {
    families = rawFamilies.map(mapPrismaFamilyToGroup);
  } else {
    // Fallback to static data
    families = getFamiliesByCollection(slug);
    console.log(`CollectionPage: Loaded ${families.length} families from static data for ${slug}`);
  }

  return <CollectionClient collection={collectionData} families={families} slug={slug} />;
}
