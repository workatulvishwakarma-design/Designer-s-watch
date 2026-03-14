// ─────────────────────────────────────────────────────────
//  Centralized Product Data — All D'SIGNER + ESCORT watches
// ─────────────────────────────────────────────────────────

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface ProductSpecs {
  movement: string;
  strap: string;
  waterResistance: string;
  caseMaterial: string;
  glass: string;
  warranty: string;
}

export interface Product {
  slug: string;
  id: number;
  name: string;
  price: number;
  mrp?: number;
  brand: string;
  category: string;
  badge?: string | null;
  tags?: string[];
  description: string;
  images: string[];
  colors: ProductColor[];
  specs: ProductSpecs;
  sizes: string[];
}

/* ═══════════════════════════════════════
   D'SIGNER COLLECTION
   ═══════════════════════════════════════ */

const dsignerSpecs: ProductSpecs = {
  movement: "Japanese Quartz",
  strap: "Genuine Leather",
  waterResistance: "3 ATM",
  caseMaterial: "316L Stainless Steel",
  glass: "Hardened Mineral Glass",
  warranty: "2 Years",
};

const dsignerSizes = ["38mm", "40mm", "42mm"];

const dsigner: Product[] = [
  {
    slug: "dsigner-901",
    id: 1,
    name: "901",
    price: 4999,
    mrp: 6999,
    brand: "D'SIGNER",
    category: "Chronograph",
    badge: "Bestseller",
    tags: ["best-selling", "premium", "classic"],
    description:
      "A bold chronograph with refined dial detailing and commanding wrist presence. The 901 combines sport-inspired precision with everyday elegance — a statement piece for the modern connoisseur.",
    images: [
      "/images/watches/Designer/901/901/901GM.png",
      "/images/watches/Designer/901/901/901RGM.png",
      "/images/watches/Designer/901/901/901SM.png",
      "/images/watches/Designer/901/901/901RTM.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/watches/Designer/901/901/901GM.png" },
      { name: "Green", hex: "#2E5A3C", image: "/images/watches/Designer/901/901/901GM_Green.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/watches/Designer/901/901/901RGM.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/watches/Designer/901/901/901SM.png" },
      { name: "Blue", hex: "#1E3A5F", image: "/images/watches/Designer/901/901/901SM_Blue.png" },
    ],
    specs: { ...dsignerSpecs, glass: "Sapphire Crystal" },
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-915",
    id: 2,
    name: "915",
    price: 3499,
    mrp: 4999,
    brand: "D'SIGNER",
    category: "Classic",
    badge: "New",
    tags: ["new-arrivals", "classic"],
    description:
      "Timeless sophistication meets understated confidence. The 915 features a sunray-finished dial and refined indices — an essential piece for the discerning professional.",
    images: [
      "/images/watches/Designer/915 with video/915/915GFS.3G.png",
      "/images/watches/Designer/915 with video/915/915GNFS.3G.png",
      "/images/watches/Designer/915 with video/915/915SFS.2G.png",
      "/images/watches/Designer/915 with video/915/PNG/915RGFS.3G.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/watches/Designer/915 with video/915/915GFS.3G.png" },
      { name: "Gold Night", hex: "#2C2C2C", image: "/images/watches/Designer/915 with video/915/915GNFS.3G.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/watches/Designer/915 with video/915/915SFS.2G.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/watches/Designer/915 with video/915/PNG/915RGFS.3G.png" },
    ],
    specs: dsignerSpecs,
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-955",
    id: 3,
    name: "955",
    price: 2999,
    mrp: 3999,
    brand: "D'SIGNER",
    category: "Classic",
    badge: null,
    tags: ["classic"],
    description:
      "Pure elegance in every detail. The 955 showcases a clean dial architecture with a luxurious leather strap — designed for those who appreciate refined simplicity.",
    images: [
      "/images/watches/Designer/955/955GFS.16L/955GFS (1).jpg",
      "/images/watches/Designer/955/955GFS.16L/955GFS (2).jpg",
      "/images/watches/Designer/955/955GFS.16L/955GFS (3).jpg",
      "/images/watches/Designer/955/955GFS.16L/955GFS (4).jpg",
    ],
    colors: [
      { name: "Gold Brown", hex: "#8B6914", image: "/images/watches/Designer/955/955GFS.16L/955GFS (1).jpg" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/watches/Designer/955/955RGFS.16L/955RGFS (1).jpg" },
    ],
    specs: dsignerSpecs,
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-960",
    id: 4,
    name: "960",
    price: 4499,
    mrp: 5999,
    brand: "D'SIGNER",
    category: "Sport",
    badge: "Limited",
    tags: ["limited", "premium", "sport"],
    description:
      "Where athletic performance meets luxury finishing. The 960 features a robust build with sport-inspired chronograph subdials and premium case detailing.",
    images: [
      "/images/watches/Designer/960/960GFS.16G/960GFS (1).jpg",
      "/images/watches/Designer/960/960GFS.16G/960GFS (2).jpg",
      "/images/watches/Designer/960/960GFS.16G/960GFS (3).jpg",
      "/images/watches/Designer/960/960GFS.16G/960GFS (4).jpg",
    ],
    colors: [
      { name: "Gold Green", hex: "#2E5A3C", image: "/images/watches/Designer/960/960GFS.16G/960GFS (1).jpg" },
      { name: "Silver Green", hex: "#708090", image: "/images/watches/Designer/960/960SFS.16G/960SFS (1).jpg" },
    ],
    specs: { ...dsignerSpecs, waterResistance: "5 ATM", glass: "Sapphire Crystal" },
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-925",
    id: 5,
    name: "925",
    price: 3999,
    mrp: 5499,
    brand: "D'SIGNER",
    category: "Gold",
    badge: null,
    tags: ["premium", "classic"],
    description:
      "A masterpiece of golden elegance. The 925 exudes warmth and prestige with its rich gold-tone case and meticulously crafted dial — perfect for occasions that demand sophistication.",
    images: [
      "/images/watches/Designer/to focus on/925/925/925GM.16L.png",
      "/images/watches/Designer/to focus on/925/925/925GM.16L.png",
      "/images/watches/Designer/to focus on/925/925/925GM.16L.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/watches/Designer/to focus on/925/925/925GM.16L.png" },
    ],
    specs: { ...dsignerSpecs, strap: "Premium Leather" },
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-950",
    id: 6,
    name: "950",
    price: 1299,
    mrp: 1999,
    brand: "D'SIGNER",
    category: "Classic",
    badge: "New",
    tags: ["new-arrivals"],
    description:
      "Accessible luxury at its finest. The 950 delivers premium design cues and flawless proportioning at an exceptional value point — the ideal entry into the D'SIGNER world.",
    images: [
      "/images/watches/Designer/to focus on/950/950GNFS.16G.png",
      "/images/watches/Designer/to focus on/950/950GNFS.16G.png",
      "/images/watches/Designer/to focus on/950/950GNFS.16G.png",
    ],
    colors: [
      { name: "Gold Night", hex: "#2C2C2C", image: "/images/watches/Designer/to focus on/950/950GNFS.16G.png" },
    ],
    specs: dsignerSpecs,
    sizes: ["38mm", "40mm"],
  },
  {
    slug: "dsigner-863",
    id: 7,
    name: "863",
    price: 2799,
    mrp: 3499,
    brand: "D'SIGNER",
    category: "Silver",
    badge: null,
    tags: ["classic"],
    description:
      "Cool-toned confidence with every glance. The 863's silver palette and clean numerals create a watch that transitions effortlessly from boardroom to evening gatherings.",
    images: [
      "/images/watches/Designer/to post after holi/863 pair/863GM.16G & 863GM.16L.png",
      "/images/watches/Designer/to post after holi/863 pair/863GM.16G & 863GM.16L.png",
    ],
    colors: [
      { name: "Silver", hex: "#C0C0C0", image: "/images/watches/Designer/to post after holi/863 pair/863GM.16G & 863GM.16L.png" },
    ],
    specs: dsignerSpecs,
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-942",
    id: 8,
    name: "942",
    price: 3899,
    mrp: 4999,
    brand: "D'SIGNER",
    category: "Sport",
    badge: "Bestseller",
    tags: ["best-selling", "sport"],
    description:
      "Bold sport luxury redefined. The 942 pairs dynamic dial architecture with a robust exhibition caseback — engineered for those who demand both performance and prestige.",
    images: [
      "/images/watches/Designer/to post after holi/942 & 943 pair/942GM.16G & 943GM.16L.png",
      "/images/watches/Designer/to post after holi/942 & 943 pair/942GM.16G & 943GM.16L.png",
    ],
    colors: [
      { name: "Gold Green", hex: "#2E5A3C", image: "/images/watches/Designer/to post after holi/942 & 943 pair/942GM.16G & 943GM.16L.png" },
    ],
    specs: { ...dsignerSpecs, waterResistance: "5 ATM" },
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-901gm",
    id: 9,
    name: "901GM",
    price: 4299,
    mrp: 5999,
    brand: "D'SIGNER",
    category: "Classic",
    badge: "Limited",
    tags: ["limited", "premium", "classic"],
    description:
      "An exclusive limited variant of the iconic 901. The green dial edition brings a bold yet refined personality — a collector's statement wrapped in gold-tone luxury.",
    images: [
      "/images/watches/Designer/901/901/901GM_Green.png",
      "/images/watches/Designer/901/901/901GM.png",
      "/images/watches/Designer/901/901/901RGM_Green.png",
      "/images/watches/Designer/901/901/901RTM_Grey.png",
    ],
    colors: [
      { name: "Green Gold", hex: "#2E5A3C", image: "/images/watches/Designer/901/901/901GM_Green.png" },
      { name: "Gold", hex: "#C5A55A", image: "/images/watches/Designer/901/901/901GM.png" },
      { name: "Rose Green", hex: "#4A7C59", image: "/images/watches/Designer/901/901/901RGM_Green.png" },
      { name: "Grey", hex: "#808080", image: "/images/watches/Designer/901/901/901RTM_Grey.png" },
    ],
    specs: { ...dsignerSpecs, glass: "Sapphire Crystal" },
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-915gnfs",
    id: 10,
    name: "915 GNFS",
    price: 4999,
    mrp: 6499,
    brand: "D'SIGNER",
    category: "Gold",
    badge: "New",
    tags: ["new-arrivals", "premium"],
    description:
      "The pinnacle of the 915 series. This gold night-finish edition features a richly textured dark dial against warm gold tones — an exclusive offering for the discerning collector.",
    images: [
      "/images/watches/Designer/915 with video/915/915GNFS.3G.png",
      "/images/watches/Designer/915 with video/915/915GFS.3G.png",
      "/images/watches/Designer/915 with video/915/PNG/915GFS.3G.png",
    ],
    colors: [
      { name: "Gold Night", hex: "#2C2C2C", image: "/images/watches/Designer/915 with video/915/915GNFS.3G.png" },
      { name: "Gold", hex: "#C5A55A", image: "/images/watches/Designer/915 with video/915/915GFS.3G.png" },
    ],
    specs: { ...dsignerSpecs, strap: "Premium Leather" },
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-955rgfs",
    id: 11,
    name: "955 RGFS",
    price: 1599,
    mrp: 2499,
    brand: "D'SIGNER",
    category: "Sport",
    badge: null,
    tags: ["sport"],
    description:
      "Sport meets rose gold sophistication. The 955 RGFS delivers a warm metallic finish with athletic proportions — ideal for those who appreciate bold refinement.",
    images: [
      "/images/watches/Designer/955/955RGFS.16L/955RGFS (1).jpg",
      "/images/watches/Designer/955/955RGFS.16L/955RGFS (2).jpg",
      "/images/watches/Designer/955/955RGFS.16L/955RGFS (3).jpg",
      "/images/watches/Designer/955/955RGFS.16L/955RGFS (4).jpg",
    ],
    colors: [
      { name: "Rose Gold", hex: "#B76E79", image: "/images/watches/Designer/955/955RGFS.16L/955RGFS (1).jpg" },
      { name: "Gold Brown", hex: "#8B6914", image: "/images/watches/Designer/955/955GFS.16L/955GFS (1).jpg" },
    ],
    specs: dsignerSpecs,
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-960sfs",
    id: 12,
    name: "960 SFS",
    price: 2199,
    mrp: 2999,
    brand: "D'SIGNER",
    category: "Classic",
    badge: null,
    tags: ["classic"],
    description:
      "The silver edition of the acclaimed 960. Clean silver tones meet sport-inspired detailing for a versatile timepiece that commands attention with quiet confidence.",
    images: [
      "/images/watches/Designer/960/960SFS.16G/960SFS (1).jpg",
      "/images/watches/Designer/960/960SFS.16G/960SFS (2).jpg",
      "/images/watches/Designer/960/960SFS.16G/960SFS (3).jpg",
      "/images/watches/Designer/960/960SFS.16G/960SFS (4).jpg",
    ],
    colors: [
      { name: "Silver", hex: "#C0C0C0", image: "/images/watches/Designer/960/960SFS.16G/960SFS (1).jpg" },
      { name: "Gold", hex: "#C5A55A", image: "/images/watches/Designer/960/960GFS.16G/960GFS (1).jpg" },
    ],
    specs: dsignerSpecs,
    sizes: dsignerSizes,
  },
];

/* ═══════════════════════════════════════
   ESCORT COLLECTION
   ═══════════════════════════════════════ */

const escortSpecs: ProductSpecs = {
  movement: "Japanese Quartz",
  strap: "Alloy Bracelet",
  waterResistance: "3 ATM",
  caseMaterial: "Alloy Case",
  glass: "Hardened Mineral Glass",
  warranty: "1 Year",
};

const escortSizes = ["38mm", "40mm"];

const escort: Product[] = [
  {
    slug: "escort-7779",
    id: 101,
    name: "7779",
    price: 800,
    mrp: 1299,
    brand: "ESCORT",
    category: "Sport",
    badge: "Value Pick",
    tags: ["best-value", "sport"],
    description:
      "Dependable sport styling at an unbeatable value. The 7779 delivers rugged everyday charm with a multi-dial layout and bold presence — quality you can trust.",
    images: [
      "/images/watches/Escort/7779/E-2250-7779.GM.2L.png",
      "/images/watches/Escort/7779/E-2250-7779.GM.3L.png",
      "/images/watches/Escort/7779/E-2250-7779.GM.5L.png",
      "/images/watches/Escort/7779/E-2250-7779.GM.16L.png",
    ],
    colors: [
      { name: "Gold Brown", hex: "#8B6914", image: "/images/watches/Escort/7779/E-2250-7779.GM.2L.png" },
      { name: "Two Tone", hex: "#A0522D", image: "/images/watches/Escort/7779/E-2250-7779.TM.2L.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/watches/Escort/7779/E-2300-7779.RGM.2L.png" },
    ],
    specs: escortSpecs,
    sizes: escortSizes,
  },
  {
    slug: "escort-7806",
    id: 102,
    name: "7806",
    price: 1200,
    mrp: 1799,
    brand: "ESCORT",
    category: "Minimal",
    badge: null,
    tags: ["everyday"],
    description:
      "Minimalist design meets reliable craftsmanship. The 7806 features a clean dial with elegant proportions — the perfect everyday companion for understated style.",
    images: [
      "/images/watches/Escort/7806/E-2200-7806.GM.5L.jpg",
      "/images/watches/Escort/7806/E-2200-7806.RTM.16L.jpg",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/watches/Escort/7806/E-2200-7806.GM.5L.jpg" },
      { name: "Rose Two Tone", hex: "#B76E79", image: "/images/watches/Escort/7806/E-2200-7806.RTM.16L.jpg" },
    ],
    specs: escortSpecs,
    sizes: escortSizes,
  },
  {
    slug: "escort-a1589",
    id: 103,
    name: "A-1589",
    price: 2200,
    mrp: 2999,
    brand: "ESCORT",
    category: "Sport",
    badge: "Bestseller",
    tags: ["best-selling", "sport"],
    description:
      "A sport icon in the Escort range. The A-1589's aggressive dial geometry and durable build make it the go-to choice for active lifestyles that demand reliability.",
    images: [
      "/images/watches/Escort/A-1589/A-1589.SM_Black.png",
      "/images/watches/Escort/A-1589/A-1589.SM_Blue.png",
      "/images/watches/Escort/A-1589/A-1589.SM_Green.png",
      "/images/watches/Escort/A-1589/A-1589.BM_Black.png",
    ],
    colors: [
      { name: "Black", hex: "#1A1918", image: "/images/watches/Escort/A-1589/A-1589.SM_Black.png" },
      { name: "Blue", hex: "#1E3A5F", image: "/images/watches/Escort/A-1589/A-1589.SM_Blue.png" },
      { name: "Green", hex: "#2E5A3C", image: "/images/watches/Escort/A-1589/A-1589.SM_Green.png" },
      { name: "Grey", hex: "#808080", image: "/images/watches/Escort/A-1589/A-1589.SM_Grey.png" },
      { name: "Teal", hex: "#008080", image: "/images/watches/Escort/A-1589/A-1589.SM_Teal Green.png" },
    ],
    specs: { ...escortSpecs, waterResistance: "5 ATM" },
    sizes: escortSizes,
  },
  {
    slug: "escort-e7751",
    id: 104,
    name: "E-7751",
    price: 999,
    mrp: 1499,
    brand: "ESCORT",
    category: "Classic",
    badge: null,
    tags: ["everyday"],
    description:
      "Classic charm without compromise. The E-7751 offers clean lines and a timeless dial layout — an elegant essential for those who value simplicity and reliability.",
    images: [
      "/images/watches/Escort/E-7751/E-7751.BM_Black.png",
      "/images/watches/Escort/E-7751/E-7751.BM_Black.png",
    ],
    colors: [
      { name: "Black", hex: "#1A1918", image: "/images/watches/Escort/E-7751/E-7751.BM_Black.png" },
    ],
    specs: escortSpecs,
    sizes: escortSizes,
  },
  {
    slug: "escort-e7908",
    id: 105,
    name: "E-7908",
    price: 1499,
    mrp: 2199,
    brand: "ESCORT",
    category: "Sport",
    badge: "New",
    tags: ["new-arrivals", "sport"],
    description:
      "Fresh energy meets refined sport design. The E-7908 introduces vibrant dial options and a confident silhouette — a new-generation watch for the bold and contemporary.",
    images: [
      "/images/watches/Escort/E-7908/E-2200-7908.GM_White.png",
      "/images/watches/Escort/E-7908/E-2200-7908.RGM_Blue.png",
      "/images/watches/Escort/E-7908/E-2200-7908.RGM_Green.png",
      "/images/watches/Escort/E-7908/E-2200-7908.TM_Black.png",
    ],
    colors: [
      { name: "White", hex: "#F5F5F0", image: "/images/watches/Escort/E-7908/E-2200-7908.GM_White.png" },
      { name: "Blue", hex: "#1E3A5F", image: "/images/watches/Escort/E-7908/E-2200-7908.RGM_Blue.png" },
      { name: "Green", hex: "#2E5A3C", image: "/images/watches/Escort/E-7908/E-2200-7908.RGM_Green.png" },
      { name: "Brown", hex: "#6B4226", image: "/images/watches/Escort/E-7908/E-2200-7908.RGM_Brown.png" },
      { name: "Black", hex: "#1A1918", image: "/images/watches/Escort/E-7908/E-2200-7908.TM_Black.png" },
    ],
    specs: escortSpecs,
    sizes: escortSizes,
  },
  {
    slug: "escort-e7914",
    id: 106,
    name: "E-7914",
    price: 1100,
    mrp: 1599,
    brand: "ESCORT",
    category: "Minimal",
    badge: null,
    tags: ["everyday", "best-value"],
    description:
      "Subtle elegance in a compact form. The E-7914's blue dial edition adds a splash of personality to a beautifully minimal frame — effortless style for every day.",
    images: [
      "/images/watches/Escort/E-7914/E-7914.BM_Blue.png",
      "/images/watches/Escort/E-7914/E-7914.BM_Blue.png",
    ],
    colors: [
      { name: "Blue", hex: "#1E3A5F", image: "/images/watches/Escort/E-7914/E-7914.BM_Blue.png" },
    ],
    specs: escortSpecs,
    sizes: escortSizes,
  },
  {
    slug: "escort-7779rgm",
    id: 107,
    name: "7779 (RGM)",
    price: 1599,
    mrp: 2299,
    brand: "ESCORT",
    category: "Classic",
    badge: "New",
    tags: ["new-arrivals", "everyday"],
    description:
      "The rose gold edition of the beloved 7779. Warm rose tones elevate the sporty silhouette into a refined classic — versatile enough for office and weekend.",
    images: [
      "/images/watches/Escort/7779/E-2300-7779.RGM.16L.png",
      "/images/watches/Escort/7779/E-2300-7779.RGM.2L.png",
      "/images/watches/Escort/7779/E-2300-7779.RGM.3L.png",
      "/images/watches/Escort/7779/E-2300-7779.RGM.5L.png",
    ],
    colors: [
      { name: "Rose Gold", hex: "#B76E79", image: "/images/watches/Escort/7779/E-2300-7779.RGM.16L.png" },
      { name: "Rose Two Tone", hex: "#A0522D", image: "/images/watches/Escort/7779/E-2300-7779.RTM.16L.png" },
      { name: "Gold", hex: "#C5A55A", image: "/images/watches/Escort/7779/E-2250-7779.GM.16L.png" },
    ],
    specs: escortSpecs,
    sizes: escortSizes,
  },
  {
    slug: "escort-7806rtm",
    id: 108,
    name: "7806 (RTM)",
    price: 1800,
    mrp: 2499,
    brand: "ESCORT",
    category: "Sport",
    badge: null,
    tags: ["sport"],
    description:
      "A sporty two-tone finish gives the 7806 a contemporary edge. The RTM variant combines warm rose gold accents with stainless steel for a modern mixed-metal aesthetic.",
    images: [
      "/images/watches/Escort/7806/E-2200-7806.RTM.16L.jpg",
      "/images/watches/Escort/7806/E-2200-7806.GM.5L.jpg",
    ],
    colors: [
      { name: "Rose Two Tone", hex: "#B76E79", image: "/images/watches/Escort/7806/E-2200-7806.RTM.16L.jpg" },
      { name: "Gold", hex: "#C5A55A", image: "/images/watches/Escort/7806/E-2200-7806.GM.5L.jpg" },
    ],
    specs: escortSpecs,
    sizes: escortSizes,
  },
];

/* ═══════════════════════════════════════
   COMBINED CATALOG
   ═══════════════════════════════════════ */

export const allProducts: Product[] = [...dsigner, ...escort];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return allProducts
    .filter((p) => p.slug !== product.slug && p.brand === product.brand)
    .slice(0, count);
}

/**
 * Generate a slug from product brand + name.
 * Used by ProductCard to create links matching the catalog slugs.
 */
export function generateSlug(brand: string, name: string): string {
  return `${brand}-${name}`
    .toLowerCase()
    .replace(/[']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
