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

export const EDITORIAL_ITEMS: MasterProductItem[] = [
  {
    modelNo: "875RGBLM.5G",
    slug: "dsigner-875-rgblm",
    series: "875",
    ean: "7435873587501",
    mrp: 15995,
    price: 12800,
    styleId: "875001",
    dialColor: "Black",
    dialHex: "#1A1918",
    strapColor: "Rose Gold & Black",
    strapHex: "#B76E79",
    dialSize: "42 mm",
    caseSize: "46 mm",
    bandSize: "24 mm",
    thickness: "12 mm",
    strapLength: "Standard",
    weight: "145 gm",
    dialShape: "Tonneau",
    strapMaterial: "Stainless Steel Link Bracelet",
    watchType: "Chronograph",
    gender: "Men",
    caseMaterial: "Stainless Steel PVD",
    functionality: "Multifunction Chronograph",
    movement: "High-Precision Quartz",
    description: "The D'Signer Tactix 875 exudes architectural authority with its bold tonneau-silhouette case, rose gold accents, and multi-layered tactical chronograph display. Paired with a robust black PVD and rose gold link bracelet for uncompromising luxury.",
    waterResistance: "50 m",
    strapClosure: "Butterfly Clasp",
    glassMaterial: "Scratch-Resistant Sapphire Crystal",
    primaryImage: "/img/models/875RGBLM.5G.jpg",
    hoverImage: "/img/models/875RGBLM.5G.jpg",
    gallery: ["/img/models/875RGBLM.5G.jpg"]
  },
  {
    modelNo: "875RGGNM.3G",
    slug: "dsigner-875-rggnm",
    series: "875",
    ean: "7435873587502",
    mrp: 16500,
    price: 13200,
    styleId: "875002",
    dialColor: "Rose Gold & Black",
    dialHex: "#B76E79",
    strapColor: "Black",
    strapHex: "#1A1918",
    dialSize: "42 mm",
    caseSize: "46 mm",
    bandSize: "24 mm",
    thickness: "12.5 mm",
    strapLength: "Standard",
    weight: "120 gm",
    dialShape: "Octagonal",
    strapMaterial: "High-Grade Silicone Strap",
    watchType: "Chronograph",
    gender: "Men",
    caseMaterial: "Brushed Stainless Steel",
    functionality: "Multifunction Sub-Dials",
    movement: "High-Precision Quartz",
    description: "Featuring a sculptured octagonal bezel, contrasting sub-dials, and a performance rubber strap, this D'Signer timepiece strikes the perfect balance between high-octane motorsport aesthetic and refined everyday durability.",
    waterResistance: "50 m",
    strapClosure: "Tang Buckle",
    glassMaterial: "Sapphire Coated Mineral Glass",
    primaryImage: "/images/new-img/homme-3.png",
    hoverImage: "/images/new-img/homme-3.png",
    gallery: ["/images/new-img/homme-3.png"]
  },
  {
    modelNo: "980GFS.16",
    slug: "dsigner-980-gfs",
    series: "980",
    ean: "7435873598001",
    mrp: 23995,
    price: 18900,
    styleId: "980001",
    dialColor: "Emerald Green Skeleton",
    dialHex: "#2E5A3C",
    strapColor: "Emerald Green",
    strapHex: "#2E5A3C",
    dialSize: "44 mm",
    caseSize: "48 mm",
    bandSize: "26 mm",
    thickness: "13 mm",
    strapLength: "Standard",
    weight: "130 gm",
    dialShape: "Tonneau",
    strapMaterial: "Perforated Racing Silicone",
    watchType: "Automatic Skeleton",
    gender: "Men",
    caseMaterial: "Gold PVD Stainless Steel",
    functionality: "Dual Balance Tourbillon Aesthetic",
    movement: "Automatic Mechanical",
    description: "A masterpiece of avant-garde haute horlogerie. The D'Signer Grandeur 980 showcases a skeletonized openwork dial revealing an intricate dual-balance movement, encased in an opulent gold-tone tonneau case paired with a textured racing strap.",
    waterResistance: "50 m",
    strapClosure: "Deployment Buckle",
    glassMaterial: "Curved Sapphire Crystal",
    primaryImage: "/img/models/980GFS.16.jpg",
    hoverImage: "/img/models/980GFS.16.jpg",
    gallery: ["/img/models/980GFS.16.jpg"]
  }
];

export const MEN_ITEMS: MasterProductItem[] = [
  ...(masterInventory.men as MasterProductItem[]),
  ...EDITORIAL_ITEMS,
];
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
    price: item.price > 0 ? item.price : (item.mrp > 0 ? item.mrp : 12995),
    comparePrice: (item.mrp && item.price && item.mrp > item.price) ? item.mrp : null,
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
  const cleanN = n.replace(/^(dsigner|designer|escort)/, "");

  const matched = ALL_DSIGNER_ITEMS.find(item => {
    const itemSlugNorm = norm(item.slug);
    const itemModelNorm = norm(item.modelNo);
    if (itemSlugNorm === n || itemModelNorm === n) return true;
    if (cleanN && (itemSlugNorm === cleanN || itemModelNorm === cleanN)) return true;
    if (cleanN && (itemSlugNorm.startsWith(cleanN) || cleanN.startsWith(itemSlugNorm))) return true;
    return false;
  });
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
