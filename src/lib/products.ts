/**
 * ─────────────────────────────────────────────────────────
 *  Unified Product Data Layer
 *  Merges static catalog (productData.ts) with DB products.
 *  Slug is the universal product identifier.
 *  DB products take priority when slugs match (deduplication).
 * ─────────────────────────────────────────────────────────
 */

import { allProducts, type Product as StaticProduct } from "@/data/productData";

/* ═══════ Unified Product Interface ═══════ */
export interface UnifiedProduct {
  id: string;           // slug used as universal ID for cart
  slug: string;
  name: string;
  price: number;
  comparePrice: number | null;
  brand: string;
  category: string;
  badge: string | null;
  tags: string[];
  description: string;
  image: string;        // primary image
  images: string[];
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
  // Luxury fields
  heritageText?: string;
  storyText?: string;
  materialDetails?: string;
  movementType?: string;
  caseSize?: string;
  strapDetails?: string;
  warrantyInfo?: string;
}

/* ═══════ Convert static product → UnifiedProduct ═══════ */
export function staticToUnified(p: StaticProduct): UnifiedProduct {
  const badgeMap: Record<string, string> = {
    "Bestseller": "BEST SELLER",
    "New": "NEW",
    "Limited": "LIMITED",
    "Value Pick": "VALUE PICK",
  };

  return {
    id: p.slug,
    slug: p.slug,
    name: p.name,
    price: p.price,
    comparePrice: p.mrp || null,
    brand: p.brand,
    category: p.category,
    badge: p.badge ? (badgeMap[p.badge] || p.badge.toUpperCase()) : null,
    tags: p.tags || [],
    description: p.description,
    image: p.images[0] || "/images/main-img1.png",
    images: p.images,
    colors: p.colors || [],
    specs: p.specs ? { ...p.specs } : {},
    sizes: p.sizes || [],
    stock: 25, // Static products always "in stock" for demo
    lowStockThreshold: 5,
    featured: p.tags?.includes("premium") || false,
    bestSeller: p.tags?.includes("best-selling") || false,
    newArrival: p.tags?.includes("new-arrivals") || false,
    limitedEdition: p.tags?.includes("limited") || false,
    source: "static",
  };
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

  // Aggregate stock from inventory records
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
    image: p.images?.[0]?.url || "/images/main-img1.png",
    images: p.images?.length > 0 ? p.images.map((img: any) => img.url) : ["/images/main-img1.png"],
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
  };
}

/* ═══════ Get all static products as unified ═══════ */
export function getStaticProducts(): UnifiedProduct[] {
  return allProducts.map(staticToUnified);
}

/* ═══════ Merge static + DB products (DB wins on slug duplicate) ═══════ */
export function mergeProducts(
  dbProducts: UnifiedProduct[],
  staticProducts?: UnifiedProduct[]
): UnifiedProduct[] {
  const statics = staticProducts || getStaticProducts();
  const slugMap = new Map<string, UnifiedProduct>();

  // Add static first
  for (const p of statics) {
    slugMap.set(p.slug, p);
  }

  // DB overwrites on same slug
  for (const p of dbProducts) {
    slugMap.set(p.slug, p);
  }

  return Array.from(slugMap.values());
}

/* ═══════ Filter helpers ═══════ */
export function filterByBrand(products: UnifiedProduct[], brand: string): UnifiedProduct[] {
  return products.filter(p => p.brand.toUpperCase() === brand.toUpperCase());
}

export function getBestSellers(products: UnifiedProduct[]): UnifiedProduct[] {
  const explicit = products.filter(p => p.bestSeller || p.badge === "BEST SELLER");
  if (explicit.length >= 4) return explicit;
  // Fill with featured or first products
  const featured = products.filter(p => p.featured && !explicit.includes(p));
  return [...explicit, ...featured].slice(0, Math.max(8, explicit.length));
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
