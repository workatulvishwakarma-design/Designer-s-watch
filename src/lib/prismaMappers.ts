import type { ModelFamilyGroup, Variant, ProductSpecs, ProductColor } from "@/types/product";
import { type ImageGallery } from "@/lib/imageResolver";

// Define the shape of the Prisma payload we expect
export type PrismaFamilyPayload = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  gender: string | null;
  collection: { slug: string; name: string } | null;
  variants: {
    sku: string;
    price: any; // Decimal
    mrp: any | null; // Decimal
    color: string | null;
    dialColor: string | null;
    strapColor: string | null;
    movement: string | null;
    glass: string | null;
    caseSize: string | null;
    caseThickness: string | null;
    strapMaterial: string | null;
    waterResistance: string | null;
    specifications: any | null;
    images: { url: string; type: string }[];
  }[];
};

const COLOUR_HEX: Record<string, string> = {
  green: "#2E5A3C", silver: "#C0C0C0", black: "#1A1918", blue: "#1E3A5F",
  gold: "#C5A55A", brown: "#8B6914", grey: "#808080", gray: "#808080",
  white: "#FFFFFF", red: "#8B0000", yellow: "#FFD700", pink: "#FFC0CB",
  orange: "#FFA500", purple: "#800080", "rose gold": "#B76E79",
  "two tone": "#D4AF37", steel: "#B0C4DE", leather: "#8B4513"
};

function resolveColorHex(colorName: string | null): string {
  if (!colorName) return "#000000";
  const normalized = colorName.toLowerCase().trim();
  for (const [key, hex] of Object.entries(COLOUR_HEX)) {
    if (normalized.includes(key)) return hex;
  }
  return "#000000";
}

export function mapPrismaFamilyToGroup(family: PrismaFamilyPayload): ModelFamilyGroup {
  const variants: Variant[] = family.variants.map(v => {
    
    // Resolve Images
    const skuImages = v.images.filter(i => i.type === "SKU").map(i => i.url);
    const hoverImage = v.images.find(i => i.type === "HOVER")?.url;
    
    const gallery: ImageGallery = {
      primary: skuImages[0] || "",
      hover: hoverImage || skuImages[1] || skuImages[0] || "",
      detail: skuImages.slice(1),
      lifestyle: []
    };

    const specs: ProductSpecs = {
      movement: v.movement || "",
      strap: v.strapMaterial || "",
      waterResistance: v.waterResistance || "",
      caseMaterial: v.specifications?.caseMaterial || "",
      glass: v.glass || "",
      warranty: "1 Year",
      dialSize: v.specifications?.dialSize?.toString() || "",
      caseSize: v.caseSize?.toString() || "",
      bandSize: v.specifications?.bandSize?.toString() || "",
      thickness: v.caseThickness?.toString() || "",
    };

    return {
      sku: v.sku,
      ean: null,
      price: Number(v.price),
      mrp: v.mrp ? Number(v.mrp) : Number(v.price),
      gender: (family.gender as "Men" | "Women" | "Unisex") || "Unisex",
      dialColor: { name: v.dialColor || "Standard", hex: resolveColorHex(v.dialColor) },
      strapColor: { name: v.strapColor || "Standard", hex: resolveColorHex(v.strapColor) },
      specs,
      description: family.name,
      gallery
    };
  });

  const prices = variants.map(v => v.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  return {
    slug: family.slug,
    familyId: family.id,
    collectionSlug: family.collection?.slug || null,
    name: family.name,
    brand: family.brand,
    category: family.collection?.name || "Watches",
    gender: (family.gender as "Men" | "Women" | "Unisex") || "Unisex",
    priceRange: { min: minPrice, max: maxPrice },
    variants,
    variantCount: variants.length
  };
}
