import { prisma } from "@/lib/db";
import { mapPrismaFamilyToGroup } from "@/lib/prismaMappers";
import CollectionClient from "@/components/CollectionClient";
import { getFamiliesByCollection } from "@/data/productData";
import { getCollectionBySlug } from "@/data/collections";
import { getCollectionProducts } from "@/lib/collectionProducts";

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

  const hardcodedCollection = getCollectionBySlug(slug) || (
    slug.toLowerCase().includes("escort") ? {
      slug,
      name: slug.toLowerCase().includes("women") ? "Escort Women's" : slug.toLowerCase().includes("men") ? "Escort Men's" : "Escort",
      title: slug.toLowerCase().includes("women") ? "Escort Women's Collection" : slug.toLowerCase().includes("men") ? "Escort Men's Collection" : "Escort Collection",
      tagline: "Timeless style, accessible elegance for every day",
      meaning: "Accessible elegance and dependable precision for everyday luxury",
      description: "Built for endurance and daily wear, the Escort collection brings refined design to everyday life.",
      identity: "Accessible · Reliable · Everyday Luxury",
      luxuryIdentity: "Affordable everyday excellence with refined styling",
      heroImage: "/images/watches/Escort/E-7914/E-7914.GM_Blue.png",
      featuredImage: "/images/watches/Escort/E-7914/E-7914.GM_Blue.png",
      category: "Escort Collections",
      ctaLabel: "Explore Escort",
      gender: slug.toLowerCase().includes("women") ? ("Women" as const) : slug.toLowerCase().includes("men") ? ("Men" as const) : ("Unisex" as const),
      modelFamilies: [],
    } : null
  );
  
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

  // 3. Load complete master collection products (individual models + model families)
  const masterProducts = getCollectionProducts(slug);
  let families = [...masterProducts];

  if (rawFamilies.length > 0) {
    const dbGroups = rawFamilies.map(mapPrismaFamilyToGroup);
    const seenSlugs = new Set(masterProducts.map(p => p.slug.toLowerCase()));
    for (const dbg of dbGroups) {
      if (!seenSlugs.has(dbg.slug.toLowerCase()) && dbg.variants && dbg.variants.length > 0 && dbg.priceRange.min > 0) {
        families.push(dbg);
        seenSlugs.add(dbg.slug.toLowerCase());
      }
    }
  }

  return <CollectionClient collection={collectionData} families={families} slug={slug} />;
}
