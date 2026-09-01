import type { ModelFamilyGroup, Variant } from "@/types/product";
import type { UnifiedProduct } from "@/lib/products";

export interface Data680Item {
  modelNo: string;
  slug: string;
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
  gender: "Men";
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

export const RAW_680_DATA: Data680Item[] = [
  {
    modelNo: "680BL.16G",
    slug: "680bl-16g",
    ean: "7435873481718",
    mrp: 7450,
    price: 7450,
    styleId: "36505651",
    dialColor: "Green",
    dialHex: "#2E5A3C",
    strapColor: "Black",
    strapHex: "#1A1918",
    dialSize: "41 mm",
    caseSize: "45 mm",
    bandSize: "22x20 mm",
    thickness: "11 mm",
    strapLength: "Standard",
    weight: "90 gm",
    dialShape: "Round",
    strapMaterial: "Genuine Leather",
    watchType: "Analogue",
    gender: "Men",
    caseMaterial: "Stainless steel",
    functionality: "Patterned",
    movement: "Quartz",
    description: "D'SIGNER Analog Watch for Men. This watch features a striking green dial, encased within a sophisticated round brass dial with a black finish. Complemented by a genuine black leather strap offering both comfort and distinction. Powered by a high-precision quartz movement, ensuring accurate timekeeping. Designed for versatility, from business boardroom to evening gatherings. Includes a two-year manufacturing defect warranty.",
    waterResistance: "30 m",
    strapClosure: "Buckle",
    glassMaterial: "Mineral Glass",
    primaryImage: "/images/new-img/model-1/680/680BL.16G/680BL (1).jpg",
    hoverImage: "/images/new-img/model-1/680/680BL.16G/680BL (2).jpg",
    gallery: [
      "/images/new-img/model-1/680/680BL.16G/680BL (1).jpg",
      "/images/new-img/model-1/680/680BL.16G/680BL (2).jpg",
      "/images/new-img/model-1/680/680BL.16G/680BL (3).jpg",
      "/images/new-img/model-1/680/680BL.16G/680BL (4).jpg",
      "/images/new-img/model-1/680/680png/680BL.16G.png"
    ]
  },
  {
    modelNo: "680BRNL.9G",
    slug: "680brnl-9g",
    ean: "7435873481848",
    mrp: 7450,
    price: 7450,
    styleId: "36505652",
    dialColor: "Brown",
    dialHex: "#6B3E26",
    strapColor: "Brown",
    strapHex: "#6B3E26",
    dialSize: "41 mm",
    caseSize: "45 mm",
    bandSize: "22x20 mm",
    thickness: "11 mm",
    strapLength: "Standard",
    weight: "90 gm",
    dialShape: "Round",
    strapMaterial: "Genuine Leather",
    watchType: "Analogue",
    gender: "Men",
    caseMaterial: "Stainless steel",
    functionality: "Patterned",
    movement: "Quartz",
    description: "D'SIGNER Analog Watch for Men. Features a refined warm brown sunburst dial set inside a polished case. Paired with an authentic brown leather strap that molds comfortably to the wrist. Driven by a precise quartz caliber for dependable everyday timekeeping. Backed by a two-year warranty.",
    waterResistance: "30 m",
    strapClosure: "Buckle",
    glassMaterial: "Mineral Glass",
    primaryImage: "/images/new-img/model-1/680/680BRNL.9G/680BRNL (1).jpg",
    hoverImage: "/images/new-img/model-1/680/680BRNL.9G/680BRNL (2).jpg",
    gallery: [
      "/images/new-img/model-1/680/680BRNL.9G/680BRNL (1).jpg",
      "/images/new-img/model-1/680/680BRNL.9G/680BRNL (2).jpg",
      "/images/new-img/model-1/680/680BRNL.9G/680BRNL (3).jpg",
      "/images/new-img/model-1/680/680BRNL.9G/680BRNL (4).jpg",
      "/images/new-img/model-1/680/680png/680BRNL.9G.png"
    ]
  },
  {
    modelNo: "680GL.2G",
    slug: "680gl-2g",
    ean: "7435873481978",
    mrp: 7250,
    price: 7250,
    styleId: "36505653",
    dialColor: "Silver",
    dialHex: "#C0C0C0",
    strapColor: "Brown",
    strapHex: "#6B3E26",
    dialSize: "41 mm",
    caseSize: "45 mm",
    bandSize: "22x20 mm",
    thickness: "11 mm",
    strapLength: "Standard",
    weight: "90 gm",
    dialShape: "Round",
    strapMaterial: "Genuine Leather",
    watchType: "Analogue",
    gender: "Men",
    caseMaterial: "Stainless steel",
    functionality: "Patterned",
    movement: "Quartz",
    description: "D'SIGNER Analog Watch for Men. Showcases a classic silver dial encased in a rich gold-tone bezel and case. Fitted with a supple brown leather strap with clean stitching. Reliable quartz mechanism provides accurate time display for formal and casual occasions.",
    waterResistance: "30 m",
    strapClosure: "Buckle",
    glassMaterial: "Mineral Glass",
    primaryImage: "/images/new-img/model-1/680/680GL.2G/680GL (1).jpg",
    hoverImage: "/images/new-img/model-1/680/680GL.2G/680GL (2).jpg",
    gallery: [
      "/images/new-img/model-1/680/680GL.2G/680GL (1).jpg",
      "/images/new-img/model-1/680/680GL.2G/680GL (2).jpg",
      "/images/new-img/model-1/680/680GL.2G/680GL (3).jpg",
      "/images/new-img/model-1/680/680GL.2G/680GL (4).jpg"
    ]
  },
  {
    modelNo: "680GNL.16G",
    slug: "680gnl-16g",
    ean: "7435873482036",
    mrp: 7450,
    price: 7450,
    styleId: "36505654",
    dialColor: "Green",
    dialHex: "#2E5A3C",
    strapColor: "Black",
    strapHex: "#1A1918",
    dialSize: "41 mm",
    caseSize: "45 mm",
    bandSize: "22x20 mm",
    thickness: "11 mm",
    strapLength: "Standard",
    weight: "90 gm",
    dialShape: "Round",
    strapMaterial: "Genuine Leather",
    watchType: "Analogue",
    gender: "Men",
    caseMaterial: "Stainless steel",
    functionality: "Patterned",
    movement: "Quartz",
    description: "D'SIGNER Analog Watch for Men. Highlights a rich emerald green dial accented with gunmetal case details. The durable black leather strap ensures a sleek, masculine profile. Features Japanese quartz precision and 30m water resistance.",
    waterResistance: "30 m",
    strapClosure: "Buckle",
    glassMaterial: "Mineral Glass",
    primaryImage: "/images/new-img/model-1/680/680GNL.16G/680GNL (1).jpg",
    hoverImage: "/images/new-img/model-1/680/680GNL.16G/680GNL (2).jpg",
    gallery: [
      "/images/new-img/model-1/680/680GNL.16G/680GNL (1).jpg",
      "/images/new-img/model-1/680/680GNL.16G/680GNL (2).jpg",
      "/images/new-img/model-1/680/680GNL.16G/680GNL (3).jpg",
      "/images/new-img/model-1/680/680GNL.16G/680GNL (4).jpg",
      "/images/new-img/model-1/680/680png/680GNL.16G.png"
    ]
  },
  {
    modelNo: "680GNL.8G",
    slug: "680gnl-8g",
    ean: "7435873482166",
    mrp: 7450,
    price: 7450,
    styleId: "36505655",
    dialColor: "Grey",
    dialHex: "#707070",
    strapColor: "Black",
    strapHex: "#1A1918",
    dialSize: "41 mm",
    caseSize: "45 mm",
    bandSize: "22x20 mm",
    thickness: "11 mm",
    strapLength: "Standard",
    weight: "90 gm",
    dialShape: "Round",
    strapMaterial: "Genuine Leather",
    watchType: "Analogue",
    gender: "Men",
    caseMaterial: "Stainless steel",
    functionality: "Patterned",
    movement: "Quartz",
    description: "D'SIGNER Analog Watch for Men. An understated grey sunray dial framed in a gunmetal stainless steel casing. Complemented by a high-grade black genuine leather strap. Built for enduring style and daily resilience.",
    waterResistance: "30 m",
    strapClosure: "Buckle",
    glassMaterial: "Mineral Glass",
    primaryImage: "/images/new-img/model-1/680/680GNL.8G/680GNL (1).jpg",
    hoverImage: "/images/new-img/model-1/680/680GNL.8G/680GNL (2).jpg",
    gallery: [
      "/images/new-img/model-1/680/680GNL.8G/680GNL (1).jpg",
      "/images/new-img/model-1/680/680GNL.8G/680GNL (2).jpg",
      "/images/new-img/model-1/680/680GNL.8G/680GNL (3).jpg",
      "/images/new-img/model-1/680/680GNL.8G/680GNL (4).jpg",
      "/images/new-img/model-1/680/680png/680GNL.8G.png"
    ]
  },
  {
    modelNo: "680RGL.16G",
    slug: "680rgl-16g",
    ean: "7435873482296",
    mrp: 7450,
    price: 7450,
    styleId: "36505656",
    dialColor: "Green",
    dialHex: "#2E5A3C",
    strapColor: "Green",
    strapHex: "#2E5A3C",
    dialSize: "41 mm",
    caseSize: "45 mm",
    bandSize: "22x20 mm",
    thickness: "11 mm",
    strapLength: "Standard",
    weight: "90 gm",
    dialShape: "Round",
    strapMaterial: "Genuine Leather",
    watchType: "Analogue",
    gender: "Men",
    caseMaterial: "Stainless steel",
    functionality: "Patterned",
    movement: "Quartz",
    description: "D'SIGNER Analog Watch for Men. Radiates sophistication with a green dial encased in a rose-gold tone bezel and complemented by a matching dark green leather strap. Powered by quartz movement with 2-year warranty.",
    waterResistance: "30 m",
    strapClosure: "Buckle",
    glassMaterial: "Mineral Glass",
    primaryImage: "/images/new-img/model-1/680/680RGL.16G/680RGL (1).jpg",
    hoverImage: "/images/new-img/model-1/680/680RGL.16G/680RGL (2).jpg",
    gallery: [
      "/images/new-img/model-1/680/680RGL.16G/680RGL (1).jpg",
      "/images/new-img/model-1/680/680RGL.16G/680RGL (2).jpg",
      "/images/new-img/model-1/680/680RGL.16G/680RGL (3).jpg",
      "/images/new-img/model-1/680/680RGL.16G/680RGL (4).jpg",
      "/images/new-img/model-1/680/680png/680RGL.16G.png"
    ]
  },
  {
    modelNo: "680RGL.5G",
    slug: "680rgl-5g",
    ean: "7435873482326",
    mrp: 7450,
    price: 7450,
    styleId: "36505657",
    dialColor: "Blue",
    dialHex: "#1E3A5F",
    strapColor: "Blue",
    strapHex: "#1E3A5F",
    dialSize: "41 mm",
    caseSize: "45 mm",
    bandSize: "22x20 mm",
    thickness: "11 mm",
    strapLength: "Standard",
    weight: "90 gm",
    dialShape: "Round",
    strapMaterial: "Genuine Leather",
    watchType: "Analogue",
    gender: "Men",
    caseMaterial: "Stainless steel",
    functionality: "Patterned",
    movement: "Quartz",
    description: "D'SIGNER Analog Watch for Men. Features an ocean blue sunburst dial housed in a luxurious rose-gold tone case, complete with a coordinating blue genuine leather strap. Designed for modern gentlemen.",
    waterResistance: "30 m",
    strapClosure: "Buckle",
    glassMaterial: "Mineral Glass",
    primaryImage: "/images/new-img/model-1/680/680RGL.5G/680RGL (1).jpg",
    hoverImage: "/images/new-img/model-1/680/680RGL.5G/680RGL (2).jpg",
    gallery: [
      "/images/new-img/model-1/680/680RGL.5G/680RGL (1).jpg",
      "/images/new-img/model-1/680/680RGL.5G/680RGL (2).jpg",
      "/images/new-img/model-1/680/680RGL.5G/680RGL (3).jpg",
      "/images/new-img/model-1/680/680RGL.5G/680RGL (4).jpg",
      "/images/new-img/model-1/680/680png/680RGL.5G.png"
    ]
  },
  {
    modelNo: "680RGL.9G",
    slug: "680rgl-9g",
    ean: "7435873482456",
    mrp: 7450,
    price: 7450,
    styleId: "36505658",
    dialColor: "Brown",
    dialHex: "#6B3E26",
    strapColor: "Brown",
    strapHex: "#6B3E26",
    dialSize: "41 mm",
    caseSize: "45 mm",
    bandSize: "22x20 mm",
    thickness: "11 mm",
    strapLength: "Standard",
    weight: "90 gm",
    dialShape: "Round",
    strapMaterial: "Genuine Leather",
    watchType: "Analogue",
    gender: "Men",
    caseMaterial: "Stainless steel",
    functionality: "Patterned",
    movement: "Quartz",
    description: "D'SIGNER Analog Watch for Men. A striking chocolate brown dial set within an elegant rose-gold tone case. Paired with an authentic brown leather strap with buckle closure. 2-year warranty included.",
    waterResistance: "30 m",
    strapClosure: "Buckle",
    glassMaterial: "Mineral Glass",
    primaryImage: "/images/new-img/model-1/680/680RGL.9G/680RGL (1).jpg",
    hoverImage: "/images/new-img/model-1/680/680RGL.9G/680RGL (2).jpg",
    gallery: [
      "/images/new-img/model-1/680/680RGL.9G/680RGL (1).jpg",
      "/images/new-img/model-1/680/680RGL.9G/680RGL (2).jpg",
      "/images/new-img/model-1/680/680RGL.9G/680RGL (3).jpg",
      "/images/new-img/model-1/680/680RGL.9G/680RGL (4).jpg",
      "/images/new-img/model-1/680/680png/680RGL.9G.png"
    ]
  },
  {
    modelNo: "680SL.2G",
    slug: "680sl-2g",
    ean: "7435873482586",
    mrp: 6995,
    price: 6995,
    styleId: "36505659",
    dialColor: "Silver",
    dialHex: "#C0C0C0",
    strapColor: "Black",
    strapHex: "#1A1918",
    dialSize: "41 mm",
    caseSize: "45 mm",
    bandSize: "22x20 mm",
    thickness: "11 mm",
    strapLength: "Standard",
    weight: "90 gm",
    dialShape: "Round",
    strapMaterial: "Genuine Leather",
    watchType: "Analogue",
    gender: "Men",
    caseMaterial: "Stainless steel",
    functionality: "Patterned",
    movement: "Quartz",
    description: "D'SIGNER Analog Watch for Men. Features a crisp silver sunburst dial encased in a polished silver stainless steel frame. Paired with a timeless black leather band. Driven by dependable quartz movement.",
    waterResistance: "30 m",
    strapClosure: "Buckle",
    glassMaterial: "Mineral Glass",
    primaryImage: "/images/new-img/model-1/680/680SL.2G/680SL (1).jpg",
    hoverImage: "/images/new-img/model-1/680/680SL.2G/680SL (2).jpg",
    gallery: [
      "/images/new-img/model-1/680/680SL.2G/680SL (1).jpg",
      "/images/new-img/model-1/680/680SL.2G/680SL (2).jpg",
      "/images/new-img/model-1/680/680SL.2G/680SL (3).jpg",
      "/images/new-img/model-1/680/680SL.2G/680SL (4).jpg",
      "/images/new-img/model-1/680/680png/680SL.2G.png"
    ]
  },
  {
    modelNo: "680SL.5G",
    slug: "680sl-5g",
    ean: "7435873482616",
    mrp: 6995,
    price: 6995,
    styleId: "36505660",
    dialColor: "Blue",
    dialHex: "#1E3A5F",
    strapColor: "Blue",
    strapHex: "#1E3A5F",
    dialSize: "41 mm",
    caseSize: "45 mm",
    bandSize: "22x20 mm",
    thickness: "11 mm",
    strapLength: "Standard",
    weight: "90 gm",
    dialShape: "Round",
    strapMaterial: "Genuine Leather",
    watchType: "Analogue",
    gender: "Men",
    caseMaterial: "Stainless steel",
    functionality: "Patterned",
    movement: "Quartz",
    description: "D'SIGNER Analog Watch for Men. Highlights a deep midnight blue dial matched with a blue genuine leather strap and polished stainless steel case. Engineered for refined everyday style and dependable precision.",
    waterResistance: "30 m",
    strapClosure: "Buckle",
    glassMaterial: "Mineral Glass",
    primaryImage: "/images/new-img/model-1/680/680SL.5G/680SL (1).jpg",
    hoverImage: "/images/new-img/model-1/680/680SL.5G/680SL (2).jpg",
    gallery: [
      "/images/new-img/model-1/680/680SL.5G/680SL (1).jpg",
      "/images/new-img/model-1/680/680SL.5G/680SL (2).jpg",
      "/images/new-img/model-1/680/680SL.5G/680SL (3).jpg",
      "/images/new-img/model-1/680/680SL.5G/680SL (4).jpg",
      "/images/new-img/model-1/680/680png/680SL.5G.png"
    ]
  }
];

export const DSIGNER_680_UNIFIED_PRODUCTS: UnifiedProduct[] = RAW_680_DATA.map((item, idx) => ({
  id: `dsigner-680-${idx}`,
  slug: item.slug,
  name: item.modelNo,
  modelNumber: item.modelNo,
  modelFamily: "680",
  collection: "dsigner-men",
  price: item.price,
  comparePrice: item.mrp > item.price ? item.mrp : null,
  brand: "D'SIGNER",
  category: "Classic",
  badge: "MEN",
  tags: ["Men", "D'SIGNER", "680", item.dialColor, item.strapColor],
  description: item.description,
  image: item.primaryImage,
  hoverImage: item.hoverImage,
  images: item.gallery,
  galleryImages: item.gallery.slice(1),
  colors: [
    { name: item.dialColor, hex: item.dialHex, image: item.primaryImage },
    { name: item.strapColor, hex: item.strapHex, image: item.hoverImage }
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
  sizes: [item.caseSize],
  stock: 25,
  lowStockThreshold: 5,
  featured: true,
  bestSeller: false,
  newArrival: true,
  limitedEdition: false,
  source: "static",
  gender: "Men",
  ean: item.ean
}));

function norm(s: string): string {
  return String(s || "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

export function get680Family(slugOrSku: string): ModelFamilyGroup | undefined {
  if (!slugOrSku) return undefined;
  const n = norm(slugOrSku);
  const matched = RAW_680_DATA.find(item => norm(item.slug) === n || norm(item.modelNo) === n);
  if (!matched) return undefined;

  const variant: Variant = {
    sku: matched.modelNo,
    ean: matched.ean,
    price: matched.price,
    mrp: matched.mrp,
    gender: "Men",
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
      primary: matched.primaryImage,
      hover: matched.hoverImage,
      detail: matched.gallery.slice(2)
    }
  };

  return {
    slug: matched.slug,
    familyId: "680",
    collectionSlug: "dsigner-men",
    name: matched.modelNo,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Men",
    priceRange: { min: matched.price, max: matched.price },
    variants: [variant],
    variantCount: 1
  };
}
