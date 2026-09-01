import masterInventory from "@/data/escort_master_inventory.json";
import type { ModelFamilyGroup, Variant } from "@/types/product";
import type { UnifiedProduct } from "@/lib/products";
import { resolveTransparentImage } from "@/lib/transparentImageResolver";

export interface EscortProductItem {
  modelNo: string;
  slug: string;
  series: string;
  baseModel: string;
  brand: string;
  mrp: number;
  price: number;
  dialColor: string;
  dialHex: string;
  strapColor: string;
  strapHex: string;
  caseSize: string;
  dialSize: string;
  dialShape: string;
  movement: string;
  waterResistance: string;
  category: string;
  gender: "Men" | "Women";
  description: string;
  primaryImage: string;
  hoverImage: string;
  gallery: string[];
}

export const ESCORT_MEN_ITEMS: EscortProductItem[] = masterInventory.men as EscortProductItem[];
export const ESCORT_WOMEN_ITEMS: EscortProductItem[] = masterInventory.women as EscortProductItem[];
export const ALL_ESCORT_ITEMS: EscortProductItem[] = [...ESCORT_MEN_ITEMS, ...ESCORT_WOMEN_ITEMS];

function itemToUnified(item: EscortProductItem, collectionSlug: string): UnifiedProduct {
  const primary = resolveTransparentImage(item.primaryImage);
  const hover = resolveTransparentImage(item.hoverImage) || primary;
  const gallery = (item.gallery || []).map(g => resolveTransparentImage(g));

  return {
    id: `escort-${item.slug}`,
    slug: item.slug,
    name: item.modelNo,
    modelNumber: item.modelNo,
    modelFamily: item.series,
    collection: collectionSlug,
    price: item.price,
    comparePrice: null,
    brand: "ESCORT",
    category: `${item.series} Series`,
    badge: item.gender.toUpperCase(),
    tags: ["ESCORT", item.series, item.dialColor, item.strapColor, item.gender],
    description: item.description,
    image: primary,
    hoverImage: hover,
    images: gallery,
    galleryImages: gallery.slice(1),
    colors: [
      { name: item.dialColor, hex: item.dialHex, image: primary },
      { name: item.strapColor, hex: item.strapHex, image: hover }
    ],
    specs: {
      movement: item.movement,
      strap: "Stainless Steel",
      waterResistance: item.waterResistance,
      caseMaterial: "Stainless Steel",
      caseSize: item.caseSize,
      dialSize: item.dialSize,
      glass: "Mineral Glass",
      warranty: "1 Year",
      functionality: "Analog",
      bandSize: "Standard",
      thickness: "Standard",
      weight: "Standard",
      strapClosure: "Sliding Buckle"
    },
    sizes: item.caseSize ? [item.caseSize] : [],
    stock: 30,
    lowStockThreshold: 5,
    featured: true,
    bestSeller: false,
    newArrival: true,
    limitedEdition: false,
    source: "static",
    gender: item.gender
  };
}

export const ESCORT_MEN_UNIFIED_PRODUCTS: UnifiedProduct[] = ESCORT_MEN_ITEMS.map((item) =>
  itemToUnified(item, "Escort-men")
);

export const ESCORT_WOMENS_UNIFIED_PRODUCTS: UnifiedProduct[] = ESCORT_WOMEN_ITEMS.map((item) =>
  itemToUnified(item, "Escort-womens")
);

function norm(s: string): string {
  return String(s || "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

export function getEscortProductBySlug(slugOrSku: string): ModelFamilyGroup | undefined {
  if (!slugOrSku) return undefined;
  const n = norm(slugOrSku);
  const matched = ALL_ESCORT_ITEMS.find(item => norm(item.slug) === n || norm(item.modelNo) === n);
  if (!matched) return undefined;

  const primary = resolveTransparentImage(matched.primaryImage);
  const hover = resolveTransparentImage(matched.hoverImage) || primary;
  const gallery = (matched.gallery || []).map(g => resolveTransparentImage(g));

  const variant: Variant = {
    sku: matched.modelNo,
    price: matched.price,
    mrp: matched.mrp,
    gender: matched.gender,
    dialColor: { name: matched.dialColor, hex: matched.dialHex },
    strapColor: { name: matched.strapColor, hex: matched.strapHex },
    specs: {
      movement: matched.movement,
      strap: "Stainless Steel",
      waterResistance: matched.waterResistance,
      caseMaterial: "Stainless Steel",
      glass: "Mineral Glass",
      warranty: "1 Year",
      caseSize: matched.caseSize,
      dialSize: matched.dialSize,
      functionality: "Analog",
      bandSize: "Standard",
      thickness: "Standard",
      weight: "Standard",
      closure: "Sliding Buckle",
      shape: matched.dialShape
    },
    description: matched.description,
    gallery: {
      primary: primary,
      hover: hover,
      detail: gallery.slice(2),
      lifestyle: []
    }
  };

  return {
    slug: matched.slug,
    familyId: matched.series,
    collectionSlug: matched.gender === "Women" ? "Escort-womens" : "Escort-men",
    name: matched.modelNo,
    brand: "ESCORT",
    category: `${matched.series} Series`,
    gender: matched.gender,
    priceRange: { min: matched.price, max: matched.price },
    variants: [variant],
    variantCount: 1
  };
}
