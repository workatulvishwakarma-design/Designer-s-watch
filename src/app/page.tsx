import { prisma } from "@/lib/db";
import { mapPrismaFamilyToGroup } from "@/lib/prismaMappers";
import { getFamiliesByGender } from "@/data/productData";
import HomeClient2 from "@/components/HomeClient2";

export const revalidate = 60;

export default async function HomePage() {
  let menFamilies: any[] = [];
  let womenFamilies: any[] = [];
  let stores: any[] = [];

  // Fetch DB data in parallel
  try {
    const [menRaw, womenRaw, storesRaw] = await Promise.all([
      prisma.productFamily
        ? prisma.productFamily.findMany({
            where: { gender: "Men", status: "ACTIVE" },
            include: { collection: true, variants: { include: { images: true, inventory: true } }, images: true },
            take: 12,
          }).catch(() => [])
        : Promise.resolve([]),
      prisma.productFamily
        ? prisma.productFamily.findMany({
            where: { gender: "Women", status: "ACTIVE" },
            include: { collection: true, variants: { include: { images: true, inventory: true } }, images: true },
            take: 12,
          }).catch(() => [])
        : Promise.resolve([]),
      prisma.store
        ? prisma.store.findMany({
            where: { isActive: true },
            orderBy: [{ sortOrder: "asc" }, { name: "asc" }]
          }).catch(() => [])
        : Promise.resolve([])
    ]);

    if (menRaw && menRaw.length > 0) menFamilies = menRaw.map(mapPrismaFamilyToGroup);
    if (womenRaw && womenRaw.length > 0) womenFamilies = womenRaw.map(mapPrismaFamilyToGroup);
    if (storesRaw && storesRaw.length > 0) stores = storesRaw;
  } catch (err) {
    console.error("Failed to load DB data for home page:", err);
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
