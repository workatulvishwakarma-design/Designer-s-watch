// ─────────────────────────────────────────────────────────
//  Centralized Product Data — All D'SIGNER + ESCORT watches
//  Updated with new-img model-1 / model-2 real product images
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
  gender: "Men" | "Women" | "Unisex";
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

const dsignerMetalSpecs: ProductSpecs = {
  movement: "Japanese Quartz",
  strap: "Stainless Steel Bracelet",
  waterResistance: "3 ATM",
  caseMaterial: "316L Stainless Steel",
  glass: "Hardened Mineral Glass",
  warranty: "2 Years",
};

const dsignerSizes = ["38mm", "40mm", "42mm"];
const dsignerSizesSmall = ["32mm", "34mm", "36mm"];

const dsigner: Product[] = [
  // ─── EXISTING MODELS (updated images from new-img/model-2) ───
  {
    slug: "dsigner-748",
    id: 1,
    name: "748",
    price: 4999,
    mrp: 6999,
    brand: "D'SIGNER",
    category: "Chronograph",
    gender: "Men",
    badge: "Bestseller",
    tags: ["best-selling", "premium", "classic"],
    description:
      "A bold chronograph with refined dial detailing and commanding wrist presence. The 748 combines sport-inspired precision with everyday elegance — a statement piece for the modern connoisseur.",
    images: [
      "/images/new-img/model-1/748/748/748/748GM.16G.png",
      "/images/new-img/model-1/748/748/748/748RGM.16G.png",
      "/images/new-img/model-1/748/748/748/748RTM.9G.png",
      "/images/new-img/model-1/748/748/748/748TM.16G.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-1/748/748/748/748GM.16G.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-1/748/748/748/748RGM.16G.png" },
      { name: "Two Tone", hex: "#D4AF37", image: "/images/new-img/model-1/748/748/748/748RTM.9G.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-1/748/748/748/748TM.16G.png" },
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
    gender: "Men",
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
    gender: "Men",
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
    gender: "Men",
    badge: "Limited",
    tags: ["limited", "premium", "sport"],
    description:
      "Where athletic performance meets luxury finishing. The 960 features a robust build with sport-inspired chronograph subdials and premium case detailing.",
    images: [
      "/images/new-img/model-2/960/960GFS.16G/960GFS (5).png",
      "/images/new-img/model-2/960/960SFS.16G/960SFS (5).png",
      "/images/watches/Designer/960/960GFS.16G/960GFS (2).jpg",
      "/images/watches/Designer/960/960GFS.16G/960GFS (3).jpg",
    ],
    colors: [
      { name: "Gold Green", hex: "#2E5A3C", image: "/images/new-img/model-2/960/960GFS.16G/960GFS (5).png" },
      { name: "Silver Green", hex: "#708090", image: "/images/new-img/model-2/960/960SFS.16G/960SFS (5).png" },
    ],
    specs: { ...dsignerSpecs, waterResistance: "5 ATM", glass: "Sapphire Crystal" },
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
    gender: "Men",
    badge: "New",
    tags: ["new-arrivals"],
    description:
      "Accessible luxury at its finest. The 950 delivers premium design cues and flawless proportioning at an exceptional value point — the ideal entry into the D'SIGNER world.",
    images: [
      "/images/new-img/model-2/950/950/950GNFS.16G.png",
      "/images/new-img/model-2/950/950/950RGBFS.16G.png",
      "/images/new-img/model-2/950/950/950GTFS.3G.png",
      "/images/new-img/model-2/950/950/950RGBLFS.5G.png",
    ],
    colors: [
      { name: "Gold Night", hex: "#2C2C2C", image: "/images/new-img/model-2/950/950/950GNFS.16G.png" },
      { name: "Rose Gold Black", hex: "#B76E79", image: "/images/new-img/model-2/950/950/950RGBFS.16G.png" },
      { name: "Gold Two-Tone", hex: "#C5A55A", image: "/images/new-img/model-2/950/950/950GTFS.3G.png" },
    ],
    specs: dsignerSpecs,
    sizes: ["38mm", "40mm"],
  },
  {
    slug: "dsigner-901gm",
    id: 9,
    name: "901GM Green",
    price: 4299,
    mrp: 5999,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Men",
    badge: "Limited",
    tags: ["limited", "premium", "classic"],
    description:
      "An exclusive limited variant of the iconic 901. The green dial edition brings a bold yet refined personality — a collector's statement wrapped in gold-tone luxury.",
    images: [
      "/images/new-img/model-2/901/901/901GM_Green.png",
      "/images/new-img/model-2/901/901/901GM.png",
      "/images/new-img/model-2/901/901/901RGM_Green.png",
      "/images/new-img/model-2/901/901/901RTM_Grey.png",
    ],
    colors: [
      { name: "Green Gold", hex: "#2E5A3C", image: "/images/new-img/model-2/901/901/901GM_Green.png" },
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-2/901/901/901GM.png" },
      { name: "Rose Green", hex: "#4A7C59", image: "/images/new-img/model-2/901/901/901RGM_Green.png" },
      { name: "Grey", hex: "#808080", image: "/images/new-img/model-2/901/901/901RTM_Grey.png" },
    ],
    specs: { ...dsignerSpecs, glass: "Sapphire Crystal" },
    sizes: dsignerSizes,
  },

  // ─── NEW MODELS FROM new-img FOLDERS ───

  {
    slug: "dsigner-808",
    id: 13,
    name: "808",
    price: 2499,
    mrp: 3499,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Men",
    badge: "New",
    tags: ["new-arrivals", "classic"],
    description:
      "A masterclass in versatile elegance. The 808 blends contemporary proportions with heritage-inspired detailing — a watch for every chapter of your day.",
    images: [
      "/images/new-img/model-1/808/PNG/808GM.8.G.png",
      "/images/new-img/model-1/808/PNG/808GNM.8G.png",
      "/images/new-img/model-1/808/PNG/808RGM.16.G.png",
      "/images/new-img/model-1/808/PNG/808SM.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-1/808/PNG/808GM.8.G.png" },
      { name: "Gold Night", hex: "#2C2C2C", image: "/images/new-img/model-1/808/PNG/808GNM.8G.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-1/808/PNG/808RGM.16.G.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-1/808/PNG/808SM.png" },
    ],
    specs: dsignerMetalSpecs,
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-810",
    id: 14,
    name: "810",
    price: 2799,
    mrp: 3999,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Men",
    badge: null,
    tags: ["classic", "premium"],
    description:
      "Quiet confidence wrapped around your wrist. The 810 delivers a rich leather-strap aesthetic with polished case geometry — for those who lead without raising their voice.",
    images: [
      "/images/new-img/model-1/810/810/810GM.2L.png",
      "/images/new-img/model-1/810/810/810/810RGM.16L.png",
      "/images/new-img/model-1/810/810/810SM.2L.png",
      "/images/new-img/model-1/810/810/810TM.16L.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-1/810/810/810GM.2L.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-1/810/810/810/810RGM.16L.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-1/810/810/810SM.2L.png" },
      { name: "Two-Tone", hex: "#A0522D", image: "/images/new-img/model-1/810/810/810TM.16L.png" },
    ],
    specs: dsignerSpecs,
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-812",
    id: 15,
    name: "812",
    price: 2599,
    mrp: 3499,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Men",
    badge: null,
    tags: ["classic"],
    description:
      "Distinguished dial work meets refined proportions. The 812 carries a presence that speaks of tradition without saying a word — modern heritage at its finest.",
    images: [
      "/images/new-img/model-1/812/812/812/812GM.2L.png",
      "/images/new-img/model-1/812/812/812/812RGM.16L.png",
      "/images/new-img/model-1/812/812/812/812SM.2L.png",
      "/images/new-img/model-1/812/812/812/812GNM.8L.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-1/812/812/812/812GM.2L.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-1/812/812/812/812RGM.16L.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-1/812/812/812/812SM.2L.png" },
      { name: "Gold Night", hex: "#2C2C2C", image: "/images/new-img/model-1/812/812/812/812GNM.8L.png" },
    ],
    specs: dsignerSpecs,
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-820",
    id: 16,
    name: "820",
    price: 3299,
    mrp: 4499,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Men",
    badge: "Bestseller",
    tags: ["best-selling", "premium"],
    description:
      "Engineered sophistication with a steel bracelet foundation. The 820 commands attention through its measured proportions and flawless finishing — the watch that anchors every wardrobe.",
    images: [
      "/images/new-img/model-1/820/820GFS.16G/820GFS.16G.png",
      "/images/new-img/model-1/820/820GNFS.16G/820GNFS.16G.png",
      "/images/new-img/model-1/820/820RGFS.16/820RGFS.16.png",
      "/images/new-img/model-1/820/820SFS.5G.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-1/820/820GFS.16G/820GFS.16G.png" },
      { name: "Gold Night", hex: "#2C2C2C", image: "/images/new-img/model-1/820/820GNFS.16G/820GNFS.16G.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-1/820/820RGFS.16/820RGFS.16.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-1/820/820SFS.5G.png" },
    ],
    specs: dsignerMetalSpecs,
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-834",
    id: 17,
    name: "834",
    price: 1999,
    mrp: 2999,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Men",
    badge: null,
    tags: ["classic"],
    description:
      "Bold metal craftsmanship with chromatic depth. The 834 showcases modern dial geometry within a commanding case — engineered for impact, designed for daily wear.",
    images: [
      "/images/new-img/model-2/834/834GM.16.L/834GM.png",
      "/images/new-img/model-2/834/834RGM.11.L/834RGM.png",
      "/images/new-img/model-2/834/834RTM.2.L/834RTM.png",
      "/images/new-img/model-2/834/834TM.2.L/834TM.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-2/834/834GM.16.L/834GM.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-2/834/834RGM.11.L/834RGM.png" },
      { name: "Rose Two-Tone", hex: "#A0522D", image: "/images/new-img/model-2/834/834RTM.2.L/834RTM.png" },
      { name: "Two-Tone", hex: "#708090", image: "/images/new-img/model-2/834/834TM.2.L/834TM.png" },
    ],
    specs: dsignerMetalSpecs,
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-836",
    id: 18,
    name: "836",
    price: 2299,
    mrp: 2999,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Men",
    badge: "New",
    tags: ["new-arrivals"],
    description:
      "Contemporary poise with structural assertiveness. The 836 merges precision-finished indices with a generously proportioned dial — a declaration of considered taste.",
    images: [
      "/images/new-img/model-2/836/836/836GM.4.G_1.png",
      "/images/new-img/model-2/836/836/836GNM.16.G_1.png",
      "/images/new-img/model-2/836/836/836RGM.11.G_1.png",
      "/images/new-img/model-2/836/836/836SM.2.G_1.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-2/836/836/836GM.4.G_1.png" },
      { name: "Gold Night", hex: "#2C2C2C", image: "/images/new-img/model-2/836/836/836GNM.16.G_1.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-2/836/836/836RGM.11.G_1.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-2/836/836/836SM.2.G_1.png" },
    ],
    specs: dsignerMetalSpecs,
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-843",
    id: 19,
    name: "843",
    price: 2699,
    mrp: 3999,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Men",
    badge: null,
    tags: ["classic", "premium"],
    description:
      "Heritage warmth on a leather foundation. The 843 delivers traditional watchmaking proportions with modern finishing — a timepiece that gets better with every wear.",
    images: [
      "/images/new-img/model-2/843/843/843GM.16L.png",
      "/images/new-img/model-2/843/843/843RGM.2L.png",
      "/images/new-img/model-2/843/843/843RTM.2L.png",
      "/images/new-img/model-2/843/843/843GNM.3L.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-2/843/843/843GM.16L.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-2/843/843/843RGM.2L.png" },
      { name: "Rose Two-Tone", hex: "#A0522D", image: "/images/new-img/model-2/843/843/843RTM.2L.png" },
      { name: "Gold Night", hex: "#2C2C2C", image: "/images/new-img/model-2/843/843/843GNM.3L.png" },
    ],
    specs: dsignerSpecs,
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-850",
    id: 20,
    name: "850",
    price: 3499,
    mrp: 4999,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Men",
    badge: "Bestseller",
    tags: ["best-selling", "premium"],
    description:
      "The 850 embodies structured luxury — a fluted dial paired with a leather strap for a timepiece that transitions effortlessly from boardroom to evening. Unmistakably D'SIGNER.",
    images: [
      "/images/new-img/model-2/850/850/850/850/850GFS.16L.png",
      "/images/new-img/model-2/850/850/850/850RGFS.12L.png",
      "/images/new-img/model-2/850/850/850/850/850SFS.3L.png",
      "/images/new-img/model-2/850/850/850/850/850SFS.5L.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-2/850/850/850/850/850GFS.16L.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-2/850/850/850/850RGFS.12L.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-2/850/850/850/850/850SFS.3L.png" },
    ],
    specs: dsignerSpecs,
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-853",
    id: 21,
    name: "853",
    price: 2899,
    mrp: 3999,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Men",
    badge: null,
    tags: ["classic"],
    description:
      "Refined versatility in every detail. The 853 carries a measured confidence — a watch that complements rather than competes with your personal style.",
    images: [
      "/images/new-img/model-2/853/853/853GM.2L.png",
      "/images/new-img/model-2/853/853/853RGM.5L.png",
      "/images/new-img/model-2/853/853/853SM.2L.png",
      "/images/new-img/model-2/853/853/853RTM.16L.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-2/853/853/853GM.2L.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-2/853/853/853RGM.5L.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-2/853/853/853SM.2L.png" },
      { name: "Rose Two-Tone", hex: "#A0522D", image: "/images/new-img/model-2/853/853/853RTM.16L.png" },
    ],
    specs: dsignerSpecs,
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-860",
    id: 22,
    name: "860",
    price: 2199,
    mrp: 2999,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Men",
    badge: null,
    tags: ["classic"],
    description:
      "Clean lines and honest craftsmanship define the 860. A watch that respects the essentials — legible dial, comfortable proportions, and a finish that catches light with intention.",
    images: [
      "/images/new-img/model-2/860/860GM.12.L/860GM.png",
      "/images/new-img/model-2/860/860RGM.12.L/860RGM.png",
      "/images/new-img/model-2/860/860SM.12.L/860SM.png",
      "/images/new-img/model-2/860/860TM.12.L/860TM.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-2/860/860GM.12.L/860GM.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-2/860/860RGM.12.L/860RGM.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-2/860/860SM.12.L/860SM.png" },
      { name: "Two-Tone", hex: "#708090", image: "/images/new-img/model-2/860/860TM.12.L/860TM.png" },
    ],
    specs: dsignerMetalSpecs,
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-862",
    id: 23,
    name: "862",
    price: 2999,
    mrp: 3999,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Men",
    badge: null,
    tags: ["classic"],
    description:
      "Understated refinement meets leather luxury. The 862 is built for those who value quiet elegance — a watch that complements tailored moments and everyday confidence alike.",
    images: [
      "/images/new-img/model-2/862/862/862GM.16L.png",
      "/images/new-img/model-2/862/862/862RGM.9L.png",
      "/images/new-img/model-2/862/862/862SM.5L.png",
      "/images/new-img/model-2/862/862/862TM.19L.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-2/862/862/862GM.16L.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-2/862/862/862RGM.9L.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-2/862/862/862SM.5L.png" },
      { name: "Two-Tone", hex: "#708090", image: "/images/new-img/model-2/862/862/862TM.19L.png" },
    ],
    specs: dsignerSpecs,
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-869",
    id: 24,
    name: "869",
    price: 2399,
    mrp: 3299,
    brand: "D'SIGNER",
    category: "Sport",
    gender: "Men",
    badge: "New",
    tags: ["new-arrivals", "sport"],
    description:
      "Athletic proportions meet refined finishing. The 869 brings a sport-inspired edge to the D'SIGNER lineup — bold enough for the weekend, polished enough for the boardroom.",
    images: [
      "/images/new-img/model-2/869/869GM.2G.png",
      "/images/new-img/model-2/869/869RGM.16G.png",
      "/images/new-img/model-2/869/869RTM.16G.png",
      "/images/new-img/model-2/869/869GNM.3G.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-2/869/869GM.2G.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-2/869/869RGM.16G.png" },
      { name: "Rose Two-Tone", hex: "#A0522D", image: "/images/new-img/model-2/869/869RTM.16G.png" },
      { name: "Gold Night", hex: "#2C2C2C", image: "/images/new-img/model-2/869/869GNM.3G.png" },
    ],
    specs: { ...dsignerMetalSpecs, waterResistance: "5 ATM" },
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-905",
    id: 25,
    name: "905",
    price: 3799,
    mrp: 4999,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Men",
    badge: null,
    tags: ["premium", "classic"],
    description:
      "Where heritage meets contemporary authority. The 905 offers an elevated leather-strap experience with deeply worked dial textures — a testament to D'SIGNER's design command.",
    images: [
      "/images/new-img/model-2/905/905/905GM.16L.png",
      "/images/new-img/model-2/905/905/905RTM.16L.png",
      "/images/new-img/model-2/905/905/905SM.6L.png",
      "/images/new-img/model-2/905/905/905GNM.13L.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-2/905/905/905GM.16L.png" },
      { name: "Rose Two-Tone", hex: "#A0522D", image: "/images/new-img/model-2/905/905/905RTM.16L.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-2/905/905/905SM.6L.png" },
      { name: "Gold Night", hex: "#2C2C2C", image: "/images/new-img/model-2/905/905/905GNM.13L.png" },
    ],
    specs: { ...dsignerSpecs, strap: "Premium Leather" },
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-912",
    id: 26,
    name: "912",
    price: 3199,
    mrp: 4499,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Men",
    badge: null,
    tags: ["classic", "premium"],
    description:
      "Balanced proportions and meticulous finishing define the 912. Each detail — from the bevelled case to the polished crown — reflects a commitment to craft that transcends trends.",
    images: [
      "/images/new-img/model-2/912/912/912GM.5L.png",
      "/images/new-img/model-2/912/912/912RGM.6L.png",
      "/images/new-img/model-2/912/912/912TM.16L.png",
      "/images/new-img/model-2/912/912/912SM.5L.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-2/912/912/912GM.5L.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-2/912/912/912RGM.6L.png" },
      { name: "Two-Tone", hex: "#708090", image: "/images/new-img/model-2/912/912/912TM.16L.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-2/912/912/912SM.5L.png" },
    ],
    specs: dsignerSpecs,
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-962",
    id: 27,
    name: "962",
    price: 3599,
    mrp: 4999,
    brand: "D'SIGNER",
    category: "Sport",
    gender: "Men",
    badge: "New",
    tags: ["new-arrivals", "sport", "premium"],
    description:
      "The 962 pushes the boundary of sport luxury. An assertive case profile, luminous indices, and a robust bracelet deliver performance aesthetics with uncompromised refinement.",
    images: [
      "/images/new-img/model-2/962/962/962GM.16L.png",
      "/images/new-img/model-2/962/962/962RGM.16L.png",
      "/images/new-img/model-2/962/962/962RTM.16L.png",
      "/images/new-img/model-2/962/962/962SM.2L.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-2/962/962/962GM.16L.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-2/962/962/962RGM.16L.png" },
      { name: "Rose Two-Tone", hex: "#A0522D", image: "/images/new-img/model-2/962/962/962RTM.16L.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-2/962/962/962SM.2L.png" },
    ],
    specs: { ...dsignerSpecs, waterResistance: "5 ATM" },
    sizes: dsignerSizes,
  },
  {
    slug: "dsigner-916",
    id: 28,
    name: "916",
    price: 2799,
    mrp: 3999,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Men",
    badge: null,
    tags: ["classic"],
    description:
      "Modern metal watchmaking with character. The 916 pairs a richly layered dial with a robust bracelet — designed for those who appreciate substance behind every surface.",
    images: [
      "/images/new-img/model-2/916/916/916GM.16G.png",
      "/images/new-img/model-2/916/916/916GNM.16G.png",
      "/images/new-img/model-2/916/916/916RTM.2G.png",
      "/images/new-img/model-2/916/916/916BM.3G.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-2/916/916/916GM.16G.png" },
      { name: "Gold Night", hex: "#2C2C2C", image: "/images/new-img/model-2/916/916/916GNM.16G.png" },
      { name: "Rose Two-Tone", hex: "#A0522D", image: "/images/new-img/model-2/916/916/916RTM.2G.png" },
      { name: "Black", hex: "#1A1918", image: "/images/new-img/model-2/916/916/916BM.3G.png" },
    ],
    specs: dsignerMetalSpecs,
    sizes: dsignerSizes,
  },

  // ─── WOMEN'S COLLECTION (from new-img) ───

  {
    slug: "dsigner-670",
    id: 30,
    name: "670",
    price: 1999,
    mrp: 2999,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Women",
    badge: "New",
    tags: ["new-arrivals", "classic"],
    description:
      "Delicate beauty with resolute quality. The 670 for women brings refined proportions and graceful dial work — a timepiece that elevates every gesture.",
    images: [
      "/images/new-img/model-1/670/670/670/670SM.2L.png",
      "/images/new-img/model-1/670/670/670/670RGM.9L.png",
      "/images/new-img/model-1/670/670/670/670/670GM.6L.png",
      "/images/new-img/model-1/670/670/670/670/670SM.12L.png",
    ],
    colors: [
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-1/670/670/670/670SM.2L.png" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-1/670/670/670/670RGM.9L.png" },
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-1/670/670/670/670/670GM.6L.png" },
    ],
    specs: { ...dsignerSpecs, caseMaterial: "316L Stainless Steel" },
    sizes: dsignerSizesSmall,
  },
  {
    slug: "dsigner-680",
    id: 31,
    name: "680",
    price: 2499,
    mrp: 3499,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Women",
    badge: "Bestseller",
    tags: ["best-selling", "classic"],
    description:
      "An elegant leather-strap expression for the modern woman. The 680 delivers soft colour tones and boutique-quality finishing — where luxury meets everyday wearability.",
    images: [
      "/images/new-img/model-1/680/680png/680RGL.16G.png",
      "/images/new-img/model-1/680/680png/680GNL.16G.png",
      "/images/new-img/model-1/680/680png/680SL.2G.png",
      "/images/new-img/model-1/680/680png/680GL.9G.png",
    ],
    colors: [
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-1/680/680png/680RGL.16G.png" },
      { name: "Gold Night", hex: "#2C2C2C", image: "/images/new-img/model-1/680/680png/680GNL.16G.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-1/680/680png/680SL.2G.png" },
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-1/680/680png/680GL.9G.png" },
    ],
    specs: { ...dsignerSpecs, strap: "Premium Leather" },
    sizes: dsignerSizesSmall,
  },
  {
    slug: "dsigner-854",
    id: 32,
    name: "854",
    price: 2299,
    mrp: 3299,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Women",
    badge: null,
    tags: ["classic"],
    description:
      "Graceful proportions with a modern sensibility. The 854 captures light beautifully through its polished case and textured dial — a signature piece for the confident woman.",
    images: [
      "/images/new-img/model-2/854/854 leather/PNG/854/854RGL.16G.png",
      "/images/new-img/model-2/854/854 leather/PNG/854/854GL.16G.png",
      "/images/new-img/model-2/854/854 leather/PNG/854/854SL.2G.png",
      "/images/new-img/model-2/854/854 leather/PNG/854/854RGL.2G.png",
    ],
    colors: [
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-2/854/854 leather/PNG/854/854RGL.16G.png" },
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-2/854/854 leather/PNG/854/854GL.16G.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-2/854/854 leather/PNG/854/854SL.2G.png" },
    ],
    specs: { ...dsignerSpecs, strap: "Premium Leather" },
    sizes: dsignerSizesSmall,
  },
  {
    slug: "dsigner-840",
    id: 33,
    name: "840",
    price: 2799,
    mrp: 3999,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Women",
    badge: "New",
    tags: ["new-arrivals", "premium"],
    description:
      "The 840 is a refined metal bracelet watch designed for the woman who values polish and precision. Luminous indices and a sculpted case create a bracelet-watch experience that transcends occasion.",
    images: [
      "/images/new-img/model-2/840/840/840/840RGFS.5G.png",
      "/images/new-img/model-2/840/840/840/840RGNFS.16G.png",
      "/images/new-img/model-2/840/840/840BFS.3G.png",
      "/images/new-img/model-2/840/840/840RGBFS.9G.png",
    ],
    colors: [
      { name: "Rose Gold", hex: "#B76E79", image: "/images/new-img/model-2/840/840/840/840RGFS.5G.png" },
      { name: "Rose Gold Night", hex: "#8B4C5A", image: "/images/new-img/model-2/840/840/840/840RGNFS.16G.png" },
      { name: "Black", hex: "#1A1918", image: "/images/new-img/model-2/840/840/840BFS.3G.png" },
    ],
    specs: { ...dsignerMetalSpecs, caseMaterial: "316L Stainless Steel" },
    sizes: dsignerSizesSmall,
  },
  {
    slug: "dsigner-j905",
    id: 34,
    name: "J905",
    price: 3499,
    mrp: 4999,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Women",
    badge: "Bestseller",
    tags: ["best-selling", "premium"],
    description:
      "The J905 is D'SIGNER's signature women's timepiece — a harmonious blend of refined dial artistry and feminine proportions. Designed for moments that matter.",
    images: [
      "/images/new-img/model-2/J905/J905/J905GM.16L.png",
      "/images/new-img/model-2/J905/J905/J905RTM.16L.png",
      "/images/new-img/model-2/J905/J905/J905SM.6L.png",
      "/images/new-img/model-2/J905/J905/J905RTM.12L.png",
    ],
    colors: [
      { name: "Gold", hex: "#C5A55A", image: "/images/new-img/model-2/J905/J905/J905GM.16L.png" },
      { name: "Rose Two-Tone", hex: "#A0522D", image: "/images/new-img/model-2/J905/J905/J905RTM.16L.png" },
      { name: "Silver", hex: "#C0C0C0", image: "/images/new-img/model-2/J905/J905/J905SM.6L.png" },
    ],
    specs: { ...dsignerSpecs, strap: "Premium Leather" },
    sizes: dsignerSizesSmall,
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
    gender: "Men",
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
    gender: "Men",
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
    gender: "Men",
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
    gender: "Men",
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
    gender: "Men",
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
    gender: "Unisex",
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
    name: "7779 RGM",
    price: 1599,
    mrp: 2299,
    brand: "ESCORT",
    category: "Classic",
    gender: "Men",
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
    name: "7806 RTM",
    price: 1800,
    mrp: 2499,
    brand: "ESCORT",
    category: "Sport",
    gender: "Men",
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
