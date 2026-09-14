import { prisma } from "@/lib/db";
import { getDsignerProductBySlug } from "@/lib/dsignerCatalog";
import { getEscortProductBySlug } from "@/lib/escortCatalog";
import { getFamilyBySku, getFamilyBySlug } from "@/data/productData";
import { Prisma } from "@prisma/client";

export type ResolvedVariantWithRelations = Prisma.ProductVariantGetPayload<{
  include: {
    family: true;
    inventory: true;
  };
}>;

/**
 * Ensures that a product variant exists in the database.
 * If it doesn't exist in Prisma ProductVariant, it resolves from the static catalog
 * (D'SIGNER, ESCORT, or General Families) and creates the Family, Variant, and Inventory record.
 */
export async function ensureProductVariant(skuOrSlug: string): Promise<ResolvedVariantWithRelations | null> {
  if (!skuOrSlug) return null;

  try {
    // 1. Try finding existing variant in DB by ID or SKU
    const existing = await prisma.productVariant.findFirst({
      where: {
        OR: [
          { id: skuOrSlug },
          { sku: skuOrSlug },
          { sku: { equals: skuOrSlug, mode: "insensitive" } },
        ],
      },
      include: {
        family: true,
        inventory: true,
      },
    });

    if (existing) {
      // Ensure inventory exists and has stock
      if (!existing.inventory) {
        const inv = await prisma.inventory.upsert({
          where: { variantId: existing.id },
          update: { stock: { increment: 50 }, availabilityStatus: "IN_STOCK" },
          create: {
            variantId: existing.id,
            sku: existing.sku,
            stock: 50,
            availabilityStatus: "IN_STOCK",
          },
        });
        return { ...existing, inventory: inv };
      }
      return existing;
    }

    // 2. Lookup in static catalogs
    const dsignerItem = getDsignerProductBySlug(skuOrSlug);
    const escortItem = !dsignerItem ? getEscortProductBySlug(skuOrSlug) : undefined;
    const generalItem = !dsignerItem && !escortItem ? (getFamilyBySku(skuOrSlug) || getFamilyBySlug(skuOrSlug)) : undefined;

    const catalogGroup = dsignerItem || escortItem || generalItem;
    if (!catalogGroup) {
      console.warn(`[ensureProductVariant] Product not found in catalog: ${skuOrSlug}`);
      return null;
    }

    // Find the closest matching variant or first variant
    const matchedVariant =
      catalogGroup.variants.find(
        (v) =>
          v.sku.toLowerCase() === skuOrSlug.toLowerCase() ||
          v.sku.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() === skuOrSlug.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
      ) || catalogGroup.variants[0];

    if (!matchedVariant) {
      return null;
    }

    const familySlug = (catalogGroup.slug || skuOrSlug).toLowerCase().replace(/[^a-z0-9-_]/g, "-");
    const variantSku = matchedVariant.sku || skuOrSlug;
    const priceVal = Number(matchedVariant.price) || 9999;
    const mrpVal = Number(matchedVariant.mrp) || priceVal;

    // 3. Upsert ProductFamily
    const family = await prisma.productFamily.upsert({
      where: { slug: familySlug },
      update: {
        name: catalogGroup.name || variantSku,
        brand: catalogGroup.brand || "D'SIGNER",
        gender: catalogGroup.gender || "Unisex",
        status: "ACTIVE",
      },
      create: {
        slug: familySlug,
        name: catalogGroup.name || variantSku,
        description: matchedVariant.description || `${catalogGroup.name} Luxury Timepiece`,
        brand: catalogGroup.brand || "D'SIGNER",
        gender: catalogGroup.gender || "Unisex",
        status: "ACTIVE",
        featured: true,
      },
    });

    // 4. Upsert ProductVariant
    const variant = await prisma.productVariant.upsert({
      where: { sku: variantSku },
      update: {
        price: new Prisma.Decimal(priceVal),
        mrp: new Prisma.Decimal(mrpVal),
        color: matchedVariant.dialColor?.name || "Classic",
        dialColor: matchedVariant.dialColor?.name || "Classic",
        strapColor: matchedVariant.strapColor?.name || "Steel",
      },
      create: {
        familyId: family.id,
        sku: variantSku,
        price: new Prisma.Decimal(priceVal),
        mrp: new Prisma.Decimal(mrpVal),
        color: matchedVariant.dialColor?.name || "Classic",
        dialColor: matchedVariant.dialColor?.name || "Classic",
        strapColor: matchedVariant.strapColor?.name || "Steel",
        movement: matchedVariant.specs?.movement || "Quartz",
        caseSize: matchedVariant.specs?.caseSize || "40mm",
        waterResistance: matchedVariant.specs?.waterResistance || "5 ATM",
        glass: matchedVariant.specs?.glass || "Sapphire Crystal",
      },
    });

    // 5. Upsert Inventory with plenty of stock (e.g. 50 units)
    const inventory = await prisma.inventory.upsert({
      where: { variantId: variant.id },
      update: {
        stock: { increment: 50 },
        availabilityStatus: "IN_STOCK",
      },
      create: {
        variantId: variant.id,
        sku: variant.sku,
        stock: 50,
        availabilityStatus: "IN_STOCK",
      },
    });

    return {
      ...variant,
      family,
      inventory,
    };
  } catch (error) {
    console.error(`[ensureProductVariant] Error ensuring variant for ${skuOrSlug}:`, error);
    return null;
  }
}
