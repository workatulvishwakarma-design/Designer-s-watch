/**
 * ═══════════════════════════════════════════════════════════
 *  UNIFIED COLLECTION PRODUCTS ENGINE — Designer World
 *  
 *  Architecture:
 *  MASTER PRODUCT DATA (ALL_DSIGNER_ITEMS, ALL_ESCORT_ITEMS, allModelFamilies)
 *          ↓
 *  CORRECT COLLECTION MAPPING (collection field, series, modelNo mapped to collectionSlug)
 *          ↓
 *  COLLECTION PAGE QUERY (getCollectionProducts(slug))
 *          ↓
 *  ALL MATCHING PRODUCTS
 * ═══════════════════════════════════════════════════════════
 */

import { ALL_DSIGNER_ITEMS, getDsignerProductBySlug } from "@/lib/dsignerCatalog";
import { ALL_ESCORT_ITEMS, getEscortProductBySlug } from "@/lib/escortCatalog";
import { allModelFamilies } from "@/data/productData";
import { COLLECTION_MAP } from "@/data/collectionMap";
import { resolveProductImages } from "@/lib/imageResolver";
import type { ModelFamilyGroup } from "@/types/product";

function norm(s: string): string {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Returns the complete set of genuine matching products for any collection.
 * Matches both individual watch models and model family groups.
 */
export function getCollectionProducts(collectionSlug: string): ModelFamilyGroup[] {
  if (!collectionSlug) return [];
  const target = collectionSlug.toLowerCase().trim();
  const products: ModelFamilyGroup[] = [];
  const seenSlugs = new Set<string>();

  // 1. D'SIGNER MASTER INVENTORY ITEMS
  if (
    target !== "escort" &&
    target !== "escort-men" &&
    target !== "escort-womens" &&
    target !== "mens-escort" &&
    target !== "womens-escort"
  ) {
    for (const item of ALL_DSIGNER_ITEMS) {
      const colRaw = (item.collection || "").toLowerCase().trim();
      const series = (item.series || "").trim();
      const mappedCol = colRaw && colRaw !== "none" ? colRaw : (COLLECTION_MAP[series] || "");

      let matches = false;
      if (target === "dsigner" || target === "designer") {
        matches = true;
      } else if (target === "mens-designer" || target === "dsigner-men" || target === "designer-men") {
        matches = item.gender === "Men";
      } else if (target === "womens-designer" || target === "dsigner-womens" || target === "designer-women") {
        matches = item.gender === "Women";
      } else {
        matches = mappedCol === target || COLLECTION_MAP[series] === target;
      }

      if (matches) {
        const p = getDsignerProductBySlug(item.slug);
        if (p) {
          // Verify price and MRP
          if (!p.priceRange.min || p.priceRange.min === 0) {
            const fallbackPrice = item.price > 0 ? item.price : (item.mrp > 0 ? Math.round(item.mrp * 0.85) : 5995);
            p.priceRange = { min: fallbackPrice, max: fallbackPrice };
            if (p.variants[0]) {
              p.variants[0].price = fallbackPrice;
              p.variants[0].mrp = item.mrp > 0 ? item.mrp : fallbackPrice;
            }
          }
          // Verify primary image
          if (!p.variants[0]?.gallery?.primary) {
            const resolved = resolveProductImages(item.series, item.modelNo);
            if (resolved.primary && p.variants[0]) {
              p.variants[0].gallery.primary = resolved.primary;
              p.variants[0].gallery.hover = resolved.hover || resolved.primary;
            }
          }
          products.push(p);
          seenSlugs.add(norm(p.slug));
          seenSlugs.add(norm(item.modelNo));
        }
      }
    }
  }

  // 2. ESCORT MASTER INVENTORY ITEMS
  if (
    target === "escort" ||
    target === "escort-men" ||
    target === "mens-escort" ||
    target === "escort-womens" ||
    target === "womens-escort"
  ) {
    for (const item of ALL_ESCORT_ITEMS) {
      let matches = false;
      if (target === "escort") {
        matches = true;
      } else if (target === "escort-men" || target === "mens-escort") {
        matches = item.gender === "Men";
      } else if (target === "escort-womens" || target === "womens-escort") {
        matches = item.gender === "Women";
      }

      if (matches) {
        const p = getEscortProductBySlug(item.slug);
        if (p) {
          if (!p.priceRange.min || p.priceRange.min === 0) {
            const fallbackPrice = item.price > 0 ? item.price : (item.mrp > 0 ? Math.round(item.mrp * 0.85) : 1699);
            p.priceRange = { min: fallbackPrice, max: fallbackPrice };
            if (p.variants[0]) {
              p.variants[0].price = fallbackPrice;
              p.variants[0].mrp = item.mrp > 0 ? item.mrp : fallbackPrice;
            }
          }
          if (!p.variants[0]?.gallery?.primary) {
            const resolved = resolveProductImages(item.series, item.modelNo);
            if (resolved.primary && p.variants[0]) {
              p.variants[0].gallery.primary = resolved.primary;
              p.variants[0].gallery.hover = resolved.hover || resolved.primary;
            }
          }
          products.push(p);
          seenSlugs.add(norm(p.slug));
          seenSlugs.add(norm(item.modelNo));
        }
      }
    }
  }

  // 3. MODEL FAMILIES (includes families like Glimmer 860, 852, 819, 828)
  let staticFamilies: ModelFamilyGroup[] = [];
  if (target === "dsigner" || target === "designer") {
    staticFamilies = allModelFamilies.filter(f => f.brand.toUpperCase() === "D'SIGNER");
  } else if (target === "mens-designer" || target === "dsigner-men" || target === "designer-men") {
    staticFamilies = allModelFamilies.filter(f => f.brand.toUpperCase() === "D'SIGNER" && (f.gender === "Men" || f.gender === "Unisex"));
  } else if (target === "womens-designer" || target === "dsigner-womens" || target === "designer-women") {
    staticFamilies = allModelFamilies.filter(f => f.brand.toUpperCase() === "D'SIGNER" && (f.gender === "Women" || f.gender === "Unisex"));
  } else if (target === "escort") {
    staticFamilies = allModelFamilies.filter(f => f.brand.toUpperCase() === "ESCORT");
  } else if (target === "mens-escort" || target === "escort-men") {
    staticFamilies = allModelFamilies.filter(f => f.brand.toUpperCase() === "ESCORT" && (f.gender === "Men" || f.gender === "Unisex"));
  } else if (target === "womens-escort" || target === "escort-womens") {
    staticFamilies = allModelFamilies.filter(f => f.brand.toUpperCase() === "ESCORT" && (f.gender === "Women" || f.gender === "Unisex"));
  } else {
    staticFamilies = allModelFamilies.filter(f => f.collectionSlug?.toLowerCase() === target);
  }

  for (const f of staticFamilies) {
    if (!seenSlugs.has(norm(f.slug))) {
      products.push(f);
      seenSlugs.add(norm(f.slug));
    }
  }

  // Sort: watches with verified images first, then by price descending
  return products.sort((a, b) => {
    const aImg = a.variants[0]?.gallery?.primary ? 0 : 1;
    const bImg = b.variants[0]?.gallery?.primary ? 0 : 1;
    if (aImg !== bImg) return aImg - bImg;
    return b.priceRange.min - a.priceRange.min;
  });
}
