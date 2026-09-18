import { prisma } from "@/lib/db";
import { mapPrismaFamilyToGroup } from "@/lib/prismaMappers";
import { getFamiliesByGender } from "@/data/productData";
import HomeClient2 from "@/components/HomeClient2";

export const dynamic = "force-dynamic";

export default async function HomePage2() {
  let menFamilies: any[] = [];
  let womenFamilies: any[] = [];
  let stores: any[] = [];

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

  // Fetch active stores from DB
  try {
    if (prisma.store) {
      stores = await prisma.store.findMany({
        where: { isActive: true },
        orderBy: [
          { sortOrder: "asc" },
          { name: "asc" }
        ]
      });
    }
  } catch (err) {
    console.error("Failed to load active stores for home-2 page:", err);
  }

  // Fallback to static JSON data
  if (menFamilies.length === 0) {
    menFamilies = getFamiliesByGender("Men").slice(0, 12);
  }
  if (womenFamilies.length === 0) {
    womenFamilies = getFamiliesByGender("Women").slice(0, 12);
  }

  return <HomeClient2 menFamilies={menFamilies} womenFamilies={womenFamilies} stores={stores} />;
}
