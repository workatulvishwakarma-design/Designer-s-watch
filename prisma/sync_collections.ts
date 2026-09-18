import { prisma } from "../src/lib/db";
import { collections } from "../src/data/collections";
import { allModelFamilies } from "../src/data/productData";

async function syncCatalogToDb() {
  console.log("Starting DB Catalog Sync...");

  // 1. Sync all collections
  const collectionIdMap: Record<string, string> = {};

  for (const c of collections) {
    try {
      const dbCol = await prisma.collection.upsert({
        where: { slug: c.slug },
        update: {
          name: c.name,
          description: c.description,
          philosophy: c.meaning,
          identity: c.identity,
          gender: c.gender,
          featured: !!c.featured,
          bannerImage: c.heroImage || null,
          seoTitle: `${c.name} Collection | Designer World`,
          seoDescription: c.description,
          visibility: true,
        },
        create: {
          slug: c.slug,
          name: c.name,
          description: c.description,
          philosophy: c.meaning,
          identity: c.identity,
          gender: c.gender,
          featured: !!c.featured,
          bannerImage: c.heroImage || null,
          seoTitle: `${c.name} Collection | Designer World`,
          seoDescription: c.description,
          visibility: true,
        },
      });
      collectionIdMap[c.slug] = dbCol.id;
      console.log(`Synced Collection: ${c.name} (${c.slug}) -> ${dbCol.id}`);
    } catch (err: any) {
      console.error(`Failed to upsert collection ${c.slug}:`, err.message);
    }
  }

  // 2. Sync all Product Families and Variants
  let familyCount = 0;
  let variantCount = 0;

  for (const f of allModelFamilies) {
    try {
      const colId = f.collectionSlug ? collectionIdMap[f.collectionSlug] || null : null;
      const primaryVariant = f.variants[0];

      const dbFamily = await prisma.productFamily.upsert({
        where: { slug: f.slug },
        update: {
          name: f.name,
          description: primaryVariant?.description || `${f.name} luxury timepiece series.`,
          brand: f.brand,
          gender: f.gender,
          status: "ACTIVE",
          collectionId: colId,
        },
        create: {
          slug: f.slug,
          name: f.name,
          description: primaryVariant?.description || `${f.name} luxury timepiece series.`,
          brand: f.brand,
          gender: f.gender,
          status: "ACTIVE",
          collectionId: colId,
        },
      });
      familyCount++;

      // Upsert variants
      for (const v of f.variants) {
        try {
          await prisma.productVariant.upsert({
            where: { sku: v.sku },
            update: {
              price: v.price,
              mrp: v.mrp,
              color: v.dialColor?.name || null,
              dialColor: v.dialColor?.name || null,
              strapColor: v.strapColor?.name || null,
              movement: v.specs?.movement || null,
              caseSize: v.specs?.caseSize || null,
              caseThickness: v.specs?.thickness || null,
              glass: v.specs?.glass || null,
              waterResistance: v.specs?.waterResistance || null,
              strapMaterial: v.specs?.strap || null,
            },
            create: {
              familyId: dbFamily.id,
              sku: v.sku,
              price: v.price,
              mrp: v.mrp,
              color: v.dialColor?.name || null,
              dialColor: v.dialColor?.name || null,
              strapColor: v.strapColor?.name || null,
              movement: v.specs?.movement || null,
              caseSize: v.specs?.caseSize || null,
              caseThickness: v.specs?.thickness || null,
              glass: v.specs?.glass || null,
              waterResistance: v.specs?.waterResistance || null,
              strapMaterial: v.specs?.strap || null,
            },
          });
          variantCount++;
        } catch (vErr: any) {
          // ignore individual variant errors
        }
      }

      // Upsert images
      if (primaryVariant?.gallery?.primary) {
        try {
          const imgId = `${dbFamily.id}-hero`;
          await prisma.familyImage.upsert({
            where: { id: imgId },
            update: {
              url: primaryVariant.gallery.primary,
              altText: f.name,
              type: "HERO",
              sortOrder: 0,
            },
            create: {
              id: imgId,
              familyId: dbFamily.id,
              url: primaryVariant.gallery.primary,
              altText: f.name,
              type: "HERO",
              sortOrder: 0,
            },
          });
        } catch (imgErr) {
          // ignore image upsert issue
        }
      }
    } catch (fErr: any) {
      console.error(`Failed to upsert family ${f.slug}:`, fErr.message);
    }
  }

  console.log(`Successfully synced ${Object.keys(collectionIdMap).length} collections, ${familyCount} families, and ${variantCount} variants into database.`);
}

syncCatalogToDb()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("Sync error:", e);
    process.exit(1);
  });
