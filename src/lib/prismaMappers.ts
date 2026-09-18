import type { ModelFamilyGroup, Variant, ProductSpecs, ProductColor } from "@/types/product";
import { type ImageGallery, resolveProductImages } from "@/lib/imageResolver";
import { getFamilyBySlug } from "@/data/productData";

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
  const famId = family.slug.replace(/^(dsigner|designer|escort)[-_]/i, "") || family.id;
  const staticFam = getFamilyBySlug(family.slug) || getFamilyBySlug(famId) || getFamilyBySlug(family.id);

  // If DB family has no variants, fallback to static family
  if (!family.variants || family.variants.length === 0) {
    if (staticFam && staticFam.variants && staticFam.variants.length > 0) {
      return staticFam;
    }
  }

  const variants: Variant[] = (family.variants || []).map(v => {
    // 1. Resolve Images: check DB images first, then fallback to physical imageResolver
    const skuImages = v.images?.filter(i => i.type === "SKU").map(i => i.url) || [];
    const hoverImage = v.images?.find(i => i.type === "HOVER")?.url;
    
    let primary = skuImages[0] || "";
    let hover = hoverImage || skuImages[1] || "";
    let detail = skuImages.slice(1);

    if (!primary) {
      const resolved = resolveProductImages(famId, v.sku);
      primary = resolved.primary;
      hover = hover || resolved.hover || primary;
      detail = detail.length > 0 ? detail : resolved.detail;
    }

    // If still no primary, check static variant
    if (!primary && staticFam) {
      const staticVar = staticFam.variants.find(sv => sv.sku.toLowerCase() === v.sku.toLowerCase());
      if (staticVar?.gallery?.primary) {
        primary = staticVar.gallery.primary;
        hover = hover || staticVar.gallery.hover || primary;
        detail = detail.length > 0 ? detail : staticVar.gallery.detail;
      }
    }

    // 2. Resolve Price: ensure no Rs. 0 price
    let price = Number(v.price) || 0;
    let mrp = v.mrp ? Number(v.mrp) : price;

    if (price === 0 && staticFam) {
      const staticVar = staticFam.variants.find(sv => sv.sku.toLowerCase() === v.sku.toLowerCase());
      if (staticVar && staticVar.price > 0) {
        price = staticVar.price;
        mrp = staticVar.mrp || price;
      }
    }

    const gallery: ImageGallery = {
      primary,
      hover: hover || primary,
      detail: detail.length > 0 ? detail : (primary ? [primary] : []),
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
      price,
      mrp,
      gender: (family.gender as "Men" | "Women" | "Unisex") || "Unisex",
      dialColor: { name: v.dialColor || "Standard", hex: resolveColorHex(v.dialColor) },
      strapColor: { name: v.strapColor || "Standard", hex: resolveColorHex(v.strapColor) },
      specs,
      description: family.name,
      gallery
    };
  });

  const validPrices = variants.map(v => v.price).filter(p => p > 0);
  const minPrice = validPrices.length ? Math.min(...validPrices) : 0;
  const maxPrice = validPrices.length ? Math.max(...validPrices) : 0;

  // If minPrice is 0 or variants is empty, fallback to static family
  if ((minPrice === 0 || variants.length === 0) && staticFam && staticFam.variants.length > 0) {
    return staticFam;
  }

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
