import masterInventory from "@/data/dsigner_master_inventory.json";
import type { ModelFamilyGroup, Variant } from "@/types/product";
import type { UnifiedProduct } from "@/lib/products";
import { resolveTransparentImage } from "@/lib/transparentImageResolver";

export interface MasterProductItem {
  modelNo: string;
  slug: string;
  series: string;
  ean: string;
  mrp: number;
  price: number;
  styleId: string;
  dialColor: string;
  dialHex: string;
  strapColor: string;
  strapHex: string;
  dialSize: string;
  caseSize: string;
  bandSize: string;
  thickness: string;
  strapLength: string;
  weight: string;
  dialShape: string;
  strapMaterial: string;
  watchType: string;
  gender: "Men" | "Women";
  caseMaterial: string;
  functionality: string;
  movement: string;
  description: string;
  waterResistance: string;
  strapClosure: string;
  glassMaterial: string;
  primaryImage: string;
  hoverImage: string;
  gallery: string[];
}

export const MEN_ITEMS: MasterProductItem[] = masterInventory.men as MasterProductItem[];
export const WOMEN_ITEMS: MasterProductItem[] = masterInventory.women as MasterProductItem[];
export const ALL_DSIGNER_ITEMS: MasterProductItem[] = [...MEN_ITEMS, ...WOMEN_ITEMS];

function itemToUnified(item: MasterProductItem, idx: number, collectionSlug: string): UnifiedProduct {
  const primary = resolveTransparentImage(item.primaryImage);
  const hover = resolveTransparentImage(item.hoverImage) || primary;
  const gallery = (item.gallery || []).map(g => resolveTransparentImage(g));

  return {
    id: `dsigner-${item.slug}-${idx}`,
    slug: item.slug,
    name: item.modelNo,
    modelNumber: item.modelNo,
    modelFamily: item.series,
    collection: collectionSlug,
    price: item.price,
    comparePrice: item.mrp > item.price ? item.mrp : null,
    brand: "D'SIGNER",
    category: `${item.series} Series`,
    badge: item.gender.toUpperCase(),
    tags: ["D'SIGNER", item.series, item.dialColor, item.strapColor, item.gender],
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
      strap: item.strapMaterial,
      waterResistance: item.waterResistance,
      caseMaterial: item.caseMaterial,
      caseSize: item.caseSize,
      dialSize: item.dialSize,
      glass: item.glassMaterial,
      warranty: "2 Years",
      functionality: item.functionality,
      bandSize: item.bandSize,
      thickness: item.thickness,
      weight: item.weight,
      strapClosure: item.strapClosure
    },
    sizes: item.caseSize ? [item.caseSize] : [],
    stock: 25,
    lowStockThreshold: 5,
    featured: true,
    bestSeller: false,
    newArrival: true,
    limitedEdition: false,
    source: "static",
    gender: item.gender,
    ean: item.ean
  };
}

export const DSIGNER_MEN_UNIFIED_PRODUCTS: UnifiedProduct[] = MEN_ITEMS.map((item, idx) =>
  itemToUnified(item, idx, "dsigner-men")
);

export const DSIGNER_WOMENS_UNIFIED_PRODUCTS: UnifiedProduct[] = WOMEN_ITEMS.map((item, idx) =>
  itemToUnified(item, idx, "dsigner-womens")
);

function norm(s: string): string {
  return String(s || "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

export function getDsignerProductBySlug(slugOrSku: string): ModelFamilyGroup | undefined {
  if (!slugOrSku) return undefined;
  const n = norm(slugOrSku);
  const matched = ALL_DSIGNER_ITEMS.find(item => norm(item.slug) === n || norm(item.modelNo) === n);
  if (!matched) return undefined;

  const primary = resolveTransparentImage(matched.primaryImage);
  const hover = resolveTransparentImage(matched.hoverImage) || primary;
  const gallery = (matched.gallery || []).map(g => resolveTransparentImage(g));

  const variant: Variant = {
    sku: matched.modelNo,
    ean: matched.ean,
    price: matched.price,
    mrp: matched.mrp,
    gender: matched.gender,
    dialColor: { name: matched.dialColor, hex: matched.dialHex },
    strapColor: { name: matched.strapColor, hex: matched.strapHex },
    specs: {
      movement: matched.movement,
      strap: matched.strapMaterial,
      waterResistance: matched.waterResistance,
      caseMaterial: matched.caseMaterial,
      glass: matched.glassMaterial,
      warranty: "2 Years",
      caseSize: matched.caseSize,
      dialSize: matched.dialSize,
      functionality: matched.functionality,
      bandSize: matched.bandSize,
      thickness: matched.thickness,
      weight: matched.weight,
      closure: matched.strapClosure,
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
    collectionSlug: matched.gender === "Women" ? "dsigner-womens" : "dsigner-men",
    name: matched.modelNo,
    brand: "D'SIGNER",
    category: `${matched.series} Series`,
    gender: matched.gender,
    priceRange: { min: matched.price, max: matched.price },
    variants: [variant],
    variantCount: 1
  };
}
