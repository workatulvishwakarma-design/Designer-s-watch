import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import ProductClientView from "@/components/product/ProductClientView";
import { prisma } from "@/lib/db";
import { mapPrismaFamilyToGroup } from "@/lib/prismaMappers";
import { getFamilyBySlug, getFamilyBySku, getFamiliesByCollection } from "@/data/productData";
import { ModelFamilyGroup } from "@/types/product";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug: urlSlug } = await params;
  const slug = decodeURIComponent(urlSlug);
  
  let family: ModelFamilyGroup | undefined;

  try {
    const familyRaw = await prisma.productFamily.findUnique({
      where: { slug },
      include: {
        variants: { include: { images: true, inventory: true } },
        images: true,
        collection: true
      }
    });

    if (familyRaw) {
      family = mapPrismaFamilyToGroup(familyRaw as any);
    }
  } catch (error) {
    console.warn("generateMetadata: DB query failed, using static data fallback:", (error as Error).message);
  }

  // Fallback to static data
  if (!family) {
    family = getFamilyBySlug(slug);
    if (!family) {
      family = getFamilyBySku(slug);
    }
  }

  if (!family) {
    return {
      title: "Product Not Found | Designer World",
    };
  }

  const primaryImage = family.variants[0]?.gallery?.primary || "";
  const description = family.variants[0]?.description || `Discover the luxury ${family.name} by Designer World.`;

  return {
    title: `${family.name} | Designer World - Luxury Watches`,
    description: description.slice(0, 160),
    openGraph: {
      title: `${family.name} | Designer World`,
      description: description.slice(0, 160),
      images: primaryImage ? [{ url: primaryImage, width: 800, height: 800, alt: family.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${family.name} | Designer World`,
      description: description.slice(0, 160),
      images: primaryImage ? [primaryImage] : [],
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: urlSlug } = await params;
  const slug = decodeURIComponent(urlSlug);

  let family: ModelFamilyGroup | undefined;
  let relatedFamilies: ModelFamilyGroup[] = [];

  try {
    const familyRaw = await prisma.productFamily.findUnique({
      where: { slug },
      include: {
        collection: true,
        variants: { include: { images: true, inventory: true } },
        images: true,
      },
    });

    if (!familyRaw) {
      const variantRaw = await prisma.productVariant.findUnique({
        where: { sku: slug },
        include: { family: true }
      });

      if (variantRaw?.family?.slug) {
        redirect(`/product/${variantRaw.family.slug}`);
      }
    }

    if (familyRaw) {
      family = mapPrismaFamilyToGroup(familyRaw as any);
      
      const collectionSlug = familyRaw.collection?.slug || "designer";
      const relatedFamiliesRaw = await prisma.productFamily.findMany({
        where: {
          collection: { slug: collectionSlug },
          status: "ACTIVE",
          NOT: { id: familyRaw.id }
        },
        include: {
          collection: true,
          variants: { include: { images: true, inventory: true } },
          images: true,
        },
        take: 4
      });
      
      relatedFamilies = relatedFamiliesRaw.map(f => mapPrismaFamilyToGroup(f as any));
    }
  } catch (error) {
    console.warn("ProductPage: DB query failed, using static data fallback:", (error as Error).message);
  }

  // Fallback to static data
  if (!family) {
    family = getFamilyBySlug(slug);
    if (!family) {
      family = getFamilyBySku(slug);
    }
    
    if (family) {
      const allInCollection = getFamiliesByCollection(family.collectionSlug || "designer");
      relatedFamilies = allInCollection.filter(f => f.slug !== family!.slug).slice(0, 4);
    }
  }

  if (!family) {
    return notFound();
  }

  return <ProductClientView family={family} relatedFamilies={relatedFamilies} />;
}

