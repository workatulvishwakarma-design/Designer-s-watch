import rawData from "@/designer_world_products_grouped.json";
import { COLLECTION_MAP } from "./collectionMap";
import { resolveProductImages, familyHasImages, type ImageGallery } from "@/lib/imageResolver";

// ─── Interfaces ───

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

// ─── COLOUR HEX MAP ───
const COLOUR_HEX: Record<string, string> = {
  green: "#2E5A3C", silver: "#C0C0C0", black: "#1A1918", blue: "#1E3A5F",
  gold: "#C5A55A", brown: "#8B6914", grey: "#808080", gray: "#808080",
  white: "#F5F5F0", rose: "#B76E79", pink: "#E8A0B5", red: "#B22222",
  navy: "#1B2A4A", cream: "#FFFDD0", champagne: "#F7E7CE", burgundy: "#800020",
  teal: "#008080", maroon: "#800000", purple: "#6A0DAD", copper: "#B87333",
  bronze: "#CD7F32", gunmetal: "#2C3539", wine: "#722F37", olive: "#556B2F",
  ivory: "#FFFFF0", charcoal: "#36454F", mop: "#F0EBE3",
};

function getHex(colour: string | null): string {
  if (!colour) return "#808080";
  const lower = colour.toLowerCase().trim();
  if (COLOUR_HEX[lower]) return COLOUR_HEX[lower];
  for (const [key, hex] of Object.entries(COLOUR_HEX)) {
    if (lower.includes(key)) return hex;
  }
  return "#808080";
}

// ─── EXTRACT MODEL FAMILY ───
const KNOWN_FAMILIES = Object.keys(COLLECTION_MAP).sort((a, b) => b.length - a.length);

function extractFamily(modelNo: string): string | null {
  if (!modelNo) return null;
  const upper = modelNo.toUpperCase();
  
  // Match exact known families first (handles 901L, 820G, etc.)
  for (const fam of KNOWN_FAMILIES) {
    if (upper.startsWith(fam.toUpperCase())) return fam;
  }
  
  // Fallback: extract leading numeric block
  const numMatch = modelNo.match(/^(\d+)/);
  if (numMatch) return numMatch[1];
  
  // Last resort: extract leading alphanumeric block
  const match = modelNo.match(/^([A-Z0-9]+)/i);
  return match ? match[1].toUpperCase() : null;
}

// ─── NORMALIZE GENDER ───
function normalizeGender(g: string | null): "Men" | "Women" | "Unisex" {
  if (!g) return "Unisex";
  const lower = g.toLowerCase().trim();
  if (lower === "men" || lower === "male" || lower === "gents") return "Men";
  if (lower === "women" || lower === "female" || lower === "ladies") return "Women";
  return "Unisex";
}

// Image resolution is now handled by @/lib/imageResolver.ts
// resolveProductImages(familyId, sku) is imported at the top


// ─── PARSE RAW JSON INTO FAMILIES ───
function parseFamilies(): ModelFamilyGroup[] {
  const data = rawData as Record<string, unknown>;
  const items: Array<Record<string, unknown>> = [];
  
  for (const [key, val] of Object.entries(data)) {
    if (key === "Image") continue;
    if (!Array.isArray(val)) continue;
    const arr = val as Array<Record<string, unknown>>;
    for (const item of arr) {
      if (!item || typeof item !== "object") continue;
      if (!item.column_1 || item.column_1 === "Model No") continue;
      items.push(item);
    }
  }
  
  console.log(`[productData] Parsed ${items.length} raw product items from JSON`);
  
  const familyGroups: Record<string, Variant[]> = {};
  const familyMeta: Record<string, { gender: "Men" | "Women" | "Unisex"; category: string }> = {};
  
  for (const v of items) {
    try {
      const modelNo = String(v.column_1 || "").trim();
      const mrpRaw = v.column_3;
      const mrp = typeof mrpRaw === "number" ? mrpRaw : parseFloat(String(mrpRaw || "0"));
      if (!modelNo || !mrp || isNaN(mrp) || mrp <= 0) continue;
      
      const family = extractFamily(modelNo);
      if (!family) continue;
      
      const dialColourRaw = v.column_5 ? String(v.column_5) : null;
      const strapColourRaw = v.column_6 ? String(v.column_6) : null;
      const strapMaterial = v.column_14 ? String(v.column_14) : null;
      const caseMaterial = v.column_17 ? String(v.column_17) : "Stainless steel";
      const functionality = v.column_18 ? String(v.column_18) : null;
      const movement = v.column_19 ? String(v.column_19) : "Quartz";
      const description = v.column_20 ? String(v.column_20) : "";
      const waterResistance = v.column_21 ? String(v.column_21) : "30 m";
      const glassMaterial = v.column_23 ? String(v.column_23) : "Mineral Glass";
      const gender = normalizeGender(v.column_16 ? String(v.column_16) : null);
      
      const category = functionality
        ? functionality.toLowerCase().includes("chronograph") ? "Chronograph"
        : functionality.toLowerCase().includes("multi") ? "Multifunction"
        : "Classic"
        : "Classic";
        
      const specs: ProductSpecs = {
        movement,
        strap: strapMaterial || "Stainless Steel",
        waterResistance,
        caseMaterial,
        glass: glassMaterial,
        warranty: "2 Years",
      };
      if (functionality) specs.functionality = functionality;
      if (v.column_7) specs.dialSize = String(v.column_7).replace(/\s/g, "");
      if (v.column_8) specs.caseSize = String(v.column_8).replace(/\s/g, "");
      if (v.column_9) specs.bandSize = String(v.column_9);
      if (v.column_10) specs.thickness = String(v.column_10).replace(/\s/g, "");
      if (v.column_12) specs.weight = String(v.column_12);
      if (v.column_13) specs.shape = String(v.column_13);
      if (v.column_22) specs.closure = String(v.column_22);
      
      let ean: string | null = null;
      if (v.column_2 != null) {
        const eanNum = Number(v.column_2);
        ean = isNaN(eanNum) ? String(v.column_2) : String(Math.floor(eanNum));
      }
      
      // Selling price: apply 15% discount from MRP for display
      const sellingPrice = Math.round(mrp * 0.85);

      const variant: Variant = {
        sku: modelNo,
        ean,
        price: sellingPrice,
        mrp,
        gender,
        dialColor: { name: dialColourRaw || "Default", hex: getHex(dialColourRaw) },
        strapColor: { name: strapColourRaw || "Default", hex: getHex(strapColourRaw) },
        specs,
        description: description.replace(/\n/g, " ").trim(),
        gallery: resolveProductImages(family, modelNo),
      };

      if (!familyGroups[family]) {
        familyGroups[family] = [];
        familyMeta[family] = { gender, category };
      }
      familyGroups[family].push(variant);
    } catch (itemErr) {
      // Skip individual bad items silently
      continue;
    }
  }
  
  const result: ModelFamilyGroup[] = [];
  
  for (const [familyId, variants] of Object.entries(familyGroups)) {
    const collectionSlug = COLLECTION_MAP[familyId] || "designer";
    const slug = `${collectionSlug}-${familyId.toLowerCase()}`;
    const prices = variants.map((v) => v.price);
    
    result.push({
      slug,
      familyId,
      collectionSlug,
      name: `Model ${familyId}`,
      brand: "D'SIGNER",
      category: variants[0].specs.functionality ? "Chronograph" : "Classic",
      gender: variants[0].gender,
      priceRange: { min: Math.min(...prices), max: Math.max(...prices) },
      variants,
      variantCount: variants.length,
    });
  }
  
  console.log(`[productData] Built ${result.length} model families`);
  
  // Log collection distribution for debugging
  const colDist: Record<string, number> = {};
  for (const f of result) {
    const cs = f.collectionSlug || "unmapped";
    colDist[cs] = (colDist[cs] || 0) + 1;
  }
  console.log(`[productData] Collection distribution:`, JSON.stringify(colDist));
  
  // Sort: families with verified images first, then by variant count (descending), then alphabetically
  return result.sort((a, b) => {
    const aHasImg = familyHasImages(a.familyId) ? 0 : 1;
    const bHasImg = familyHasImages(b.familyId) ? 0 : 1;
    if (aHasImg !== bHasImg) return aHasImg - bHasImg;
    
    // Prioritize watches with multiple variants/images
    if (b.variants.length !== a.variants.length) {
      return b.variants.length - a.variants.length;
    }
    
    return a.familyId.localeCompare(b.familyId, undefined, { numeric: true });
  });
}

// ─── BUILD & EXPORT (safely) ───
let _parsed: ModelFamilyGroup[] = [];
try {
  _parsed = parseFamilies();
  console.log(`[productData] ✅ Successfully loaded ${_parsed.length} model families`);
} catch (e) {
  console.error("[productData] CRITICAL: Failed to parse product families:", e);
  _parsed = [];
}
export const allModelFamilies: ModelFamilyGroup[] = _parsed;

export function getFamilyBySlug(slug: string): ModelFamilyGroup | undefined {
  if (!slug) return undefined;
  const target = slug.toLowerCase().trim();
  return allModelFamilies.find((f) => f.slug.toLowerCase() === target || f.familyId.toLowerCase() === target);
}

export function getFamiliesByCollection(collectionSlug: string): ModelFamilyGroup[] {
  if (!collectionSlug) return [];
  const target = collectionSlug.toLowerCase().trim();
  
  let families: ModelFamilyGroup[] = [];
  
  if (target === "dsigner" || target === "designer") {
    families = allModelFamilies.filter(f => f.brand.toUpperCase() === "D'SIGNER");
  } else if (target === "mens-designer") {
    families = allModelFamilies.filter(f => f.brand.toUpperCase() === "D'SIGNER" && (f.gender === "Men" || f.gender === "Unisex"));
  } else if (target === "womens-designer") {
    families = allModelFamilies.filter(f => f.brand.toUpperCase() === "D'SIGNER" && (f.gender === "Women" || f.gender === "Unisex"));
  } else if (target === "mens-escort") {
    // Escort Men's: map elegant men's families with lower price points as Escort
    families = allModelFamilies
      .filter(f => (f.gender === "Men" || f.gender === "Unisex") && f.priceRange.min < 8000)
      .slice(0, 16);
    // Re-brand them as Escort for display
    families = families.map(f => ({ ...f, brand: "ESCORT" }));
  } else if (target === "womens-escort") {
    // Escort Women's: map elegant women's families with lower price points as Escort
    families = allModelFamilies
      .filter(f => (f.gender === "Women" || f.gender === "Unisex") && f.priceRange.min < 8000)
      .slice(0, 16);
    families = families.map(f => ({ ...f, brand: "ESCORT" }));
  } else if (target === "escort") {
    // All Escort: affordable families from both genders
    families = allModelFamilies
      .filter(f => f.priceRange.min < 8000)
      .slice(0, 24);
    families = families.map(f => ({ ...f, brand: "ESCORT" }));
  } else {
    // Named collection (grandeur, eternal, etc.)
    families = allModelFamilies.filter((f) => f.collectionSlug?.toLowerCase() === target);
    
    // If collection is empty, try to populate from nearby families
    if (families.length === 0) {
      // Fallback: show curated selection from the full catalog
      families = allModelFamilies
        .filter(f => familyHasImages(f.familyId))
        .slice(0, 8);
    }
  }

  // Sort: families with images first, then by variant count
  return families.sort((a, b) => {
    const aHasImg = familyHasImages(a.familyId) ? 0 : 1;
    const bHasImg = familyHasImages(b.familyId) ? 0 : 1;
    if (aHasImg !== bHasImg) return aHasImg - bHasImg;
    if (b.variants.length !== a.variants.length) return b.variants.length - a.variants.length;
    return a.familyId.localeCompare(b.familyId, undefined, { numeric: true });
  });
}

// ─── SKU → FAMILY LOOKUP (For PDP fallback routing) ───
export function getFamilyBySku(sku: string): ModelFamilyGroup | undefined {
  if (!sku) return undefined;
  const target = sku.toLowerCase().trim();
  return allModelFamilies.find(f => f.variants.some(v => v.sku.toLowerCase() === target));
}

// ─── FAMILY GENDER FILTER (For homepage sections) ───
export function getFamiliesByGender(gender: "Men" | "Women" | "Unisex"): ModelFamilyGroup[] {
  const families = allModelFamilies.filter(f => f.gender === gender || f.gender === "Unisex");
  // Sort: families with images first, then by variant count
  return families.sort((a, b) => {
    const aHasImg = familyHasImages(a.familyId) ? 0 : 1;
    const bHasImg = familyHasImages(b.familyId) ? 0 : 1;
    if (aHasImg !== bHasImg) return aHasImg - bHasImg;
    if (b.variants.length !== a.variants.length) return b.variants.length - a.variants.length;
    return a.familyId.localeCompare(b.familyId, undefined, { numeric: true });
  });
}
