import { type ImageGallery } from "@/lib/imageResolver";

export type { ImageGallery };

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSpecs {
  movement: string;
  strap: string;
  waterResistance: string;
  caseMaterial: string;
  glass: string;
  warranty: string;
  functionality?: string;
  dialSize?: string;
  caseSize?: string;
  bandSize?: string;
  thickness?: string;
  weight?: string;
  shape?: string;
  closure?: string;
}

export interface Variant {
  sku: string;
  ean: string | null;
  price: number;
  mrp: number;
  gender: "Men" | "Women" | "Unisex";
  dialColor: ProductColor;
  strapColor: ProductColor;
  specs: ProductSpecs;
  description: string;
  gallery: ImageGallery;
}

export interface ModelFamilyGroup {
  slug: string; // e.g., tactix-200
  familyId: string;
  collectionSlug: string | null;
  name: string;
  brand: string;
  category: string;
  gender: "Men" | "Women" | "Unisex";
  priceRange: { min: number; max: number };
  variants: Variant[];
  variantCount: number;
}
