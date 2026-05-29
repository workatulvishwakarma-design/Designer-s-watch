import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { collections } from "@/data/collections";
import { allModelFamilies } from "@/data/productData";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://designerworld.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/nagpal-group`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/terms-and-conditions`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/return-cancellation-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/shipping-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/cookie-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  let collectionSlugs: string[] = [];
  let familySlugs: string[] = [];

  try {
    const dbCollections = await prisma.collection.findMany({
      select: { slug: true }
    });
    if (dbCollections.length > 0) {
      collectionSlugs = dbCollections.map((c) => c.slug);
    } else {
      collectionSlugs = collections.map((c) => c.slug);
    }

    const dbFamilies = await prisma.productFamily.findMany({
      select: { slug: true }
    });
    if (dbFamilies.length > 0) {
      familySlugs = dbFamilies.map((f) => f.slug);
    } else {
      familySlugs = allModelFamilies.map((f) => f.slug);
    }
  } catch {
    // Database tables don't exist yet — expected during build/dev
    collectionSlugs = collections.map((c) => c.slug);
    familySlugs = allModelFamilies.map((f) => f.slug);
  }

  const collectionPages: MetadataRoute.Sitemap = collectionSlugs.map((slug) => ({
    url: `${BASE_URL}/collections/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = familySlugs.map((slug) => ({
    url: `${BASE_URL}/product/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...collectionPages, ...productPages];
}
