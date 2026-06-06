import { prisma } from "@/lib/db";
import { mapPrismaFamilyToGroup } from "@/lib/prismaMappers";
import CollectionClient from "@/components/CollectionClient";
import { getFamiliesByCollection } from "@/data/productData";
import { getCollectionBySlug } from "@/data/collections";

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: slug } = await params;

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
  
  // Merge DB collection and registry collection to guarantee all 8 registry fields are defined
  const collectionData = hardcodedCollection
    ? {
        ...hardcodedCollection,
        ...(dbCollection || {}),
        title: hardcodedCollection.title,
        tagline: hardcodedCollection.tagline,
        category: hardcodedCollection.category,
        featuredImage: hardcodedCollection.featuredImage,
        ctaLabel: hardcodedCollection.ctaLabel,
      }
    : (dbCollection || {
        slug: slug,
        title: slug.charAt(0).toUpperCase() + slug.slice(1),
        name: slug.charAt(0).toUpperCase() + slug.slice(1),
        tagline: "Elegance and Precision",
        meaning: "Elegance and Precision",
        description: "Discover our exclusive timepieces.",
        heroImage: "/images/img01.png",
        category: "Signature Collections",
        featuredImage: "/images/img01.png",
        ctaLabel: "Explore Collection",
        gender: "Unisex",
        modelFamilies: [],
      });

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
