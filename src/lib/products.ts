/**
 * ─────────────────────────────────────────────────────────
 *  Unified Product Data Layer
 *  Re-exports ModelFamilyGroup from productData.ts
 *  Provides UnifiedProduct interface for grid components
 *  that still expect flat product arrays (WomenGrid, MenGrid, etc.)
 * ─────────────────────────────────────────────────────────
 */

import {
  type ModelFamilyGroup,
  type Variant,
} from "@/types/product";
import { allModelFamilies, getFamiliesByCollection, getFamiliesByGender } from "@/data/productData";

/* ═══════ Re-exports ═══════ */
export type { ModelFamilyGroup, Variant };

/* ═══════ Unified Product Interface (for grid components) ═══════ */
export interface UnifiedProduct {
  id: string;
  slug: string;
  name: string;
  modelNumber?: string;
  modelFamily?: string;
  collection?: string;
  price: number;
  comparePrice: number | null;
  brand: string;
  category: string;
  badge: string | null;
  tags: string[];
  description: string;
  image: string;
  hoverImage?: string;
  images: string[];
  galleryImages?: string[];
  colors: { name: string; hex: string; image: string }[];
  specs: Record<string, string>;
  sizes: string[];
  stock: number;
  lowStockThreshold: number;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  limitedEdition: boolean;
  source: "static" | "db";
  heritageText?: string;
  storyText?: string;
  materialDetails?: string;
  movementType?: string;
  caseSize?: string;
  strapDetails?: string;
  warrantyInfo?: string;
  gender: "Men" | "Women" | "Unisex";
  ean?: string | null;
  dbId?: string | null;
}

/* ═══════ Convert ModelFamilyGroup → UnifiedProduct[] (one per variant) ═══════ */
export function familyToUnified(family: ModelFamilyGroup): UnifiedProduct[] {
  return family.variants.map((v, idx) => ({
    id: `${family.slug}-${idx}`,
    slug: family.slug,
    name: `${family.name} - ${v.dialColor.name}`,
    modelNumber: v.sku,
    modelFamily: family.familyId,
    collection: family.collectionSlug || undefined,
    price: v.price,
    comparePrice: v.mrp > v.price ? v.mrp : null,
    brand: family.brand,
    category: family.category,
    badge: null,
    tags: [],
    description: v.description,
    image: v.gallery.primary || "",
    hoverImage: v.gallery.hover || undefined,
    images: [v.gallery.primary, v.gallery.hover, ...v.gallery.detail].filter(Boolean),
    galleryImages: v.gallery.detail,
    colors: [
      { name: v.dialColor.name, hex: v.dialColor.hex, image: v.gallery.primary },
      { name: v.strapColor.name, hex: v.strapColor.hex, image: "" },
    ],
    specs: { ...v.specs } as Record<string, string>,
    sizes: v.specs.caseSize ? [v.specs.caseSize] : [],
    stock: 25,
    lowStockThreshold: 5,
    featured: false,
    bestSeller: false,
    newArrival: false,
    limitedEdition: false,
    source: "static" as const,
    gender: v.gender,
    ean: v.ean,
  }));
}

/* ═══════ Get ALL variants as flat UnifiedProduct[] (for grid pages) ═══════ */
export function getAllUnifiedProducts(): UnifiedProduct[] {
  return allModelFamilies.flatMap(familyToUnified);
}

/* ═══════ Convert DB product row → UnifiedProduct ═══════ */
export function dbToUnified(p: any): UnifiedProduct {
  const numericPrice = Number(p.price?.toString() || 0);
  const comparePrice = p.comparePrice ? Number(p.comparePrice.toString()) : null;
  const categoryName = p.category?.name || "";

  let brand = "D'SIGNER";
  const catLower = categoryName.toLowerCase();
  if (catLower.includes("escort")) brand = "ESCORT";

  let badge: string | null = null;
  if (p.bestSeller) badge = "BEST SELLER";
  else if (p.newArrival) badge = "NEW";
  else if (p.limitedEdition) badge = "LIMITED";

  const totalStock = p.inventory?.reduce((sum: number, inv: any) => sum + (inv.stock || 0), 0) ?? 10;
  const lowThreshold = p.inventory?.[0]?.lowStockThreshold ?? 5;

  return {
    id: p.slug,
    slug: p.slug,
    name: p.name,
    price: numericPrice,
    comparePrice: comparePrice && comparePrice > numericPrice ? comparePrice : null,
    brand,
    category: categoryName || "Watches",
    badge,
    tags: [],
    description: p.description || "",
    image: p.images?.[0]?.url || "",
    hoverImage: p.images?.[1]?.url || undefined,
    images: p.images?.length > 0 ? p.images.map((img: any) => img.url) : [],
    colors: [],
    specs: {
      ...(p.movementType ? { movement: p.movementType } : {}),
      ...(p.strapDetails ? { strap: p.strapDetails } : {}),
      ...(p.materialDetails ? { caseMaterial: p.materialDetails } : {}),
      ...(p.caseSize ? { caseSize: p.caseSize } : {}),
      ...(p.warrantyInfo ? { warranty: p.warrantyInfo } : {}),
    },
    sizes: p.caseSize ? [p.caseSize] : [],
    stock: totalStock,
    lowStockThreshold: lowThreshold,
    featured: p.featured || false,
    bestSeller: p.bestSeller || false,
    newArrival: p.newArrival || false,
    limitedEdition: p.limitedEdition || false,
    source: "db",
    heritageText: p.heritageText || undefined,
    storyText: p.storyText || undefined,
    materialDetails: p.materialDetails || undefined,
    movementType: p.movementType || undefined,
    caseSize: p.caseSize || undefined,
    strapDetails: p.strapDetails || undefined,
    warrantyInfo: p.warrantyInfo || undefined,
    gender: p.gender || "Unisex",
  };
}

/* ═══════ Filter helpers ═══════ */
export function filterByBrand(products: UnifiedProduct[], brand: string): UnifiedProduct[] {
  return products.filter(p => p.brand.toUpperCase() === brand.toUpperCase());
}

export function filterByGender(products: UnifiedProduct[], gender: "Men" | "Women" | "Unisex"): UnifiedProduct[] {
  return products.filter(p => p.gender === gender || p.gender === "Unisex");
}

export function filterByCollection(products: UnifiedProduct[], collectionSlug: string): UnifiedProduct[] {
  return products.filter(p => p.collection === collectionSlug);
}

export function getCollectionProducts(collectionSlug: string): UnifiedProduct[] {
  const families = getFamiliesByCollection(collectionSlug);
  return families.flatMap(familyToUnified);
}

export function getFeaturedByCollection(collectionSlug: string, count = 4): UnifiedProduct[] {
  const collectionProducts = getCollectionProducts(collectionSlug);
  return collectionProducts.slice(0, count);
}

export function getBestSellers(products: UnifiedProduct[]): UnifiedProduct[] {
  const explicit = products.filter(p => p.bestSeller || p.badge === "BEST SELLER");
  if (explicit.length >= 4) return explicit;
  const featured = products.filter(p => p.featured && !explicit.includes(p));
  return [...explicit, ...featured].slice(0, Math.max(8, explicit.length));
}

/* ═══════ Collection family grouping ═══════ */
export function getCollectionFamilies(collectionSlug: string): ModelFamilyGroup[] {
  return getFamiliesByCollection(collectionSlug);
}

/* ═══════ Sort helpers ═══════ */
export type SortOption = "Featured" | "Price: Low to High" | "Price: High to Low" | "Newest Arrivals" | "Best Selling";

export function sortProducts(products: UnifiedProduct[], sort: SortOption): UnifiedProduct[] {
  const sorted = [...products];
  switch (sort) {
    case "Price: Low to High":
      return sorted.sort((a, b) => a.price - b.price);
    case "Price: High to Low":
      return sorted.sort((a, b) => b.price - a.price);
    case "Newest Arrivals":
      return sorted.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    case "Best Selling":
      return sorted.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
    case "Featured":
    default:
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}

/* ═══════ Format price ═══════ */
export function formatPrice(price: number): string {
  return "₹" + price.toLocaleString("en-IN");
}
