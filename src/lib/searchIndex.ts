import { ALL_DSIGNER_ITEMS } from "@/lib/dsignerCatalog";
import { ALL_ESCORT_ITEMS } from "@/lib/escortCatalog";
import { allModelFamilies } from "@/data/productData";
import { resolveTransparentImage } from "@/lib/transparentImageResolver";

export interface SearchableProduct {
  name: string;
  slug: string;
  brand: string;
  modelNumber?: string;
  allSkus?: string[];
  series?: string;
  familyId: string;
  ean?: string;
  color?: string;
  gender?: string;
  image: string;
  price: string;
}

export interface SearchableCollection {
  name: string;
  slug: string;
  description: string;
  gender: string;
}

export interface SearchablePage {
  name: string;
  href: string;
  description: string;
  icon: string;
}

export const STATIC_PAGES: SearchablePage[] = [
  { name: "Home", href: "/", description: "Designer World main page & collection showroom", icon: "Home" },
  { name: "About", href: "/about-5", description: "Our heritage, philosophy, and watchmaking values", icon: "BookOpen" },
  { name: "Contact", href: "/contact", description: "Get in touch with customer service & sales support", icon: "Phone" },
  { name: "Pillars", href: "/pillar-4", description: "Our corporate profile and horological history", icon: "Building" },
  { name: "D'Signer Collection", href: "/collections/dsigner", description: "Our core lineup of Swiss and luxury inspired mechanical and quartz timepieces", icon: "Compass" },
  { name: "Escort Collection", href: "/collections/escort", description: "Affordable luxury, everyday elegance watches", icon: "Zap" },
  { name: "Men's D'Signer", href: "/collections/dsigner-men", description: "Timepieces for men, precision styled for boardroom to beyond", icon: "Compass" },
  { name: "Women's D'Signer", href: "/collections/dsigner-womens", description: "Timeless elegance and jewelry watches for women", icon: "Feather" },
  { name: "Men's Escort", href: "/collections/Escort-men", description: "Everyday reliability and sport watches for men", icon: "Compass" },
  { name: "Women's Escort", href: "/collections/Escort-womens", description: "Refined simplicity timepieces for women", icon: "Feather" },
  { name: "Privacy Policy", href: "/privacy-policy", description: "Your data rights, security, and usage policies", icon: "Shield" },
  { name: "Terms and Conditions", href: "/terms-and-conditions", description: "E-commerce store terms, conditions, and legal framework", icon: "FileText" },
  { name: "Return & Cancellation Policy", href: "/return-cancellation-policy", description: "Details on our 7-day hassle-free return window and refunds", icon: "RotateCcw" },
  { name: "Shipping Policy", href: "/shipping-policy", description: "Delivery timelines, premium packaging, and free shipping rates", icon: "Truck" },
  { name: "Cookie Policy", href: "/cookie-policy", description: "Management of cookies and third-party tracking preferences", icon: "Cookie" },
];

export interface SearchResults {
  products: SearchableProduct[];
  collections: SearchableCollection[];
  pages: SearchablePage[];
}

let cachedSearchCatalog: SearchableProduct[] | null = null;

export function getAllSearchableProducts(): SearchableProduct[] {
  if (cachedSearchCatalog) return cachedSearchCatalog;

  const escortProducts: SearchableProduct[] = ALL_ESCORT_ITEMS.map((item) => {
    const primary = resolveTransparentImage(item.primaryImage);
    const priceNum = item.price > 0 ? item.price : (item.mrp > 0 ? item.mrp : 1650);
    return {
      name: `Escort ${item.modelNo}${item.dialColor ? ` (${item.dialColor})` : ""}`,
      slug: item.slug,
      brand: "ESCORT",
      modelNumber: item.modelNo,
      allSkus: [item.modelNo],
      series: item.series,
      familyId: item.series,
      ean: "",
      color: item.dialColor || "",
      gender: item.gender,
      image: primary,
      price: `₹${priceNum.toLocaleString("en-IN")}`,
    };
  });

  const dsignerProducts: SearchableProduct[] = ALL_DSIGNER_ITEMS.map((item) => {
    const primary = resolveTransparentImage(item.primaryImage);
    const priceNum = item.price > 0 ? item.price : (item.mrp > 0 ? item.mrp : 12995);
    return {
      name: item.name ? `${item.name}${item.dialColor ? ` (${item.dialColor})` : ""}` : `D'Signer ${item.modelNo}${item.dialColor ? ` (${item.dialColor})` : ""}`,
      slug: item.slug,
      brand: "D'SIGNER",
      modelNumber: item.modelNo,
      allSkus: [item.modelNo],
      series: item.series,
      familyId: item.series,
      ean: item.ean || "",
      color: item.dialColor || "",
      gender: item.gender,
      image: primary,
      price: `₹${priceNum.toLocaleString("en-IN")}`,
    };
  });

  const familyProducts: SearchableProduct[] = allModelFamilies.map((f) => {
    const variantSkus = f.variants.map((v) => v.sku).filter(Boolean);
    const variantEans = f.variants.map((v) => v.ean).filter(Boolean) as string[];
    const colors = f.variants.map((v) => v.dialColor?.name).filter(Boolean);
    return {
      name: f.name,
      slug: f.slug,
      brand: f.brand || "D'SIGNER",
      modelNumber: variantSkus[0] || f.familyId,
      allSkus: variantSkus,
      series: f.familyId,
      familyId: f.familyId,
      ean: variantEans[0] || "",
      color: colors.join(" "),
      gender: f.gender,
      image: f.variants[0]?.gallery?.primary || "",
      price: `From ₹${f.priceRange.min.toLocaleString("en-IN")}`,
    };
  });

  cachedSearchCatalog = [...escortProducts, ...dsignerProducts, ...familyProducts];
  return cachedSearchCatalog;
}

function normalize(s: string): string {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function searchItems(
  query: string,
  products: SearchableProduct[],
  collections: SearchableCollection[],
  pages: SearchablePage[] = STATIC_PAGES
): SearchResults {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) {
    return { products: [], collections: [], pages: [] };
  }

  const normQ = normalize(cleanQuery);
  const qTokens = cleanQuery.split(/[\s\-._/]+/).filter(Boolean);

  const productPool = products && products.length > 0 ? products : getAllSearchableProducts();

  // Search products with smart relevance ranking for model numbers, series, names, and specs
  const scoredProducts: { product: SearchableProduct; score: number }[] = [];

  for (const p of productPool) {
    const normModel = normalize(p.modelNumber || "");
    const normSeries = normalize(p.series || p.familyId || "");
    const normSlug = normalize(p.slug || "");
    const cleanName = p.name.toLowerCase();
    const cleanBrand = p.brand.toLowerCase();
    const cleanEan = (p.ean || "").toLowerCase();
    const allSkus = p.allSkus || [];
    let score = 0;

    // 1. Exact model number match (e.g. E1650-7359.TM.5)
    if (normModel && normModel === normQ) score += 1200;
    else if (normModel && normModel.startsWith(normQ)) score += 850;
    else if (normModel && normModel.includes(normQ)) score += 650;

    // 2. Series / Base model match (e.g. 7359, 806)
    if (normSeries && normSeries === normQ) score += 600;
    else if (normSeries && normSeries.includes(normQ)) score += 450;

    // 3. Variant SKU match
    if (allSkus.some((s) => normalize(s) === normQ)) score += 800;
    else if (allSkus.some((s) => normalize(s).includes(normQ))) score += 550;

    // 4. EAN barcode match
    if (cleanEan && cleanEan.includes(cleanQuery)) score += 600;

    // 5. Slug match
    if (normSlug === normQ) score += 500;
    else if (normSlug.includes(normQ)) score += 350;

    // 6. Name / Brand match
    if (cleanName.includes(cleanQuery)) score += 300;
    else if (cleanBrand.includes(cleanQuery)) score += 150;

    // 7. Multi-token match across all fields (e.g. "escort blue", "e-7359", "dsigner 806")
    if (qTokens.length > 1) {
      const fullText = `${cleanBrand} ${p.modelNumber || ""} ${p.series || ""} ${p.color || ""} ${cleanName} ${allSkus.join(" ")}`.toLowerCase();
      const normFull = normalize(fullText);
      const allTokensPresent = qTokens.every((t) => {
        const nt = normalize(t);
        return fullText.includes(t) || (nt && normFull.includes(nt));
      });
      if (allTokensPresent) score += 300;
    }

    if (score > 0) {
      scoredProducts.push({ product: p, score });
    }
  }

  // Sort products by highest relevance score
  scoredProducts.sort((a, b) => b.score - a.score);

  // Search collections by name or description
  const filteredCollections = collections.filter(
    (c) =>
      c.name.toLowerCase().includes(cleanQuery) ||
      c.description.toLowerCase().includes(cleanQuery) ||
      c.gender.toLowerCase().includes(cleanQuery) ||
      cleanQuery.includes(c.name.toLowerCase())
  );

  // Search pages by name or description
  const filteredPages = pages.filter(
    (p) =>
      p.name.toLowerCase().includes(cleanQuery) ||
      p.description.toLowerCase().includes(cleanQuery) ||
      cleanQuery.includes(p.name.toLowerCase())
  );

  return {
    products: scoredProducts.slice(0, 12).map((item) => item.product),
    collections: filteredCollections.slice(0, 4),
    pages: filteredPages.slice(0, 4),
  };
}
