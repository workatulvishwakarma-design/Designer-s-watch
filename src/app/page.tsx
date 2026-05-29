import { prisma } from "@/lib/db";
import { mapPrismaFamilyToGroup } from "@/lib/prismaMappers";
import { getFamiliesByGender } from "@/data/productData";
import HomeClient from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let menFamilies: any[] = [];
  let womenFamilies: any[] = [];

  // Try DB first (will fail gracefully if tables don't exist)
  try {
    if (prisma.productFamily) {
      const menRaw = await prisma.productFamily.findMany({
        where: { gender: "Men", status: "ACTIVE" },
        include: { collection: true, variants: { include: { images: true, inventory: true } }, images: true },
        take: 12,
      });
      const womenRaw = await prisma.productFamily.findMany({
        where: { gender: "Women", status: "ACTIVE" },
        include: { collection: true, variants: { include: { images: true, inventory: true } }, images: true },
        take: 12,
      });

      if (menRaw.length > 0) menFamilies = menRaw.map(mapPrismaFamilyToGroup);
      if (womenRaw.length > 0) womenFamilies = womenRaw.map(mapPrismaFamilyToGroup);
    }
  } catch {
    // DB tables don't exist — expected during development without migrations
  }

  // Fallback to static JSON data (already sorted: images-first)
  if (menFamilies.length === 0) {
    menFamilies = getFamiliesByGender("Men").slice(0, 12);
  }
  if (womenFamilies.length === 0) {
    womenFamilies = getFamiliesByGender("Women").slice(0, 12);
  }

  return <HomeClient menFamilies={menFamilies} womenFamilies={womenFamilies} />;
}
