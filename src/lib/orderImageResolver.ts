import physicalImageMap from "@/data/physicalImageMap.json";
import { resolveTransparentImage } from "@/lib/transparentImageResolver";
import { getDsignerProductBySlug } from "@/lib/dsignerCatalog";
import { getEscortProductBySlug } from "@/lib/escortCatalog";
import { getFamilyBySku, getFamilyBySlug } from "@/data/productData";

interface OrderImageOptions {
  sku?: string | null;
  name?: string | null;
  familySlug?: string | null;
  dbUrl?: string | null;
}

/**
 * Dynamically and reliably resolves the real, authentic product image
 * for any order item, preventing fallback to random placeholder photos.
 */
export function resolveOrderItemImage(options: OrderImageOptions): string {
  const { sku, name, familySlug, dbUrl } = options;

  // 1. If DB already has a valid non-picsum, non-placeholder image
  if (
    dbUrl &&
    typeof dbUrl === "string" &&
    !dbUrl.includes("picsum.photos") &&
    !dbUrl.includes("via.placeholder") &&
    dbUrl.trim().length > 0
  ) {
    return resolveTransparentImage(dbUrl);
  }

  const rawKeys = [sku, name, familySlug].filter(Boolean) as string[];

  // 2. Lookup in physicalImageMap
  for (const rawKey of rawKeys) {
    const key = rawKey.trim();

    // Exact lookup
    const list = (physicalImageMap as Record<string, string[]>)[key];
    if (list && Array.isArray(list) && list.length > 0 && list[0]) {
      return resolveTransparentImage(list[0]);
    }

    // Cleaned key lookup (e.g., removing whitespace or special characters)
    const normKey = key.toLowerCase().replace(/[^a-z0-9]/g, "");
    const matchingEntry = Object.entries(physicalImageMap).find(
      ([k]) => k.toLowerCase().replace(/[^a-z0-9]/g, "") === normKey
    );
    if (matchingEntry && matchingEntry[1] && matchingEntry[1].length > 0 && matchingEntry[1][0]) {
      return resolveTransparentImage(matchingEntry[1][0]);
    }
  }

  // 3. Lookup in static catalogs (D'SIGNER & ESCORT & Unified)
  for (const rawKey of rawKeys) {
    const dsigner = getDsignerProductBySlug(rawKey);
    if (dsigner?.variants?.[0]?.gallery?.primary) {
      return resolveTransparentImage(dsigner.variants[0].gallery.primary);
    }

    const escort = getEscortProductBySlug(rawKey);
    if (escort?.variants?.[0]?.gallery?.primary) {
      return resolveTransparentImage(escort.variants[0].gallery.primary);
    }

    const family = getFamilyBySku(rawKey) || getFamilyBySlug(rawKey);
    if (family?.variants?.[0]?.gallery?.primary) {
      return resolveTransparentImage(family.variants[0].gallery.primary);
    }
  }

  // 4. Safe authentic fallback watch image if nothing matches
  return "/images/transparent-img/model-1/680/680png/680BL.16G.png";
}
