import type { ModelFamilyGroup, Variant } from "@/types/product";
import type { UnifiedProduct } from "@/lib/products";

export interface Data670Item {
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
  gender: "Women" | "Ladies";
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

export const RAW_670_DATA: Data670Item[] = [
  {
    modelNo: "670GM.16L",
    slug: "670gm-16l",
    ean: "7435873330979",
    mrp: 5995,
    price: 5995,
    styleId: "36505643",
    dialColor: "Green",
    dialHex: "#2E5A3C",
    strapColor: "Gold",
    strapHex: "#D4AF37",
    dialSize: "34 mm",
    caseSize: "38 mm",
    bandSize: "20x18 mm",
    thickness: "9 mm",
    strapLength: "Standard",
    weight: "77 gm",
    dialShape: "Round",
    strapMaterial: "Stainless Steel Mesh",
    watchType: "Analogue",
    gender: "Women",
    caseMaterial: "Stainless steel",
    functionality: "Patterned",
    movement: "Quartz",
    description: "D'SIGNER Analog Watch for Women. This watch features a striking green dial, symbolizing growth and prosperity, encased within a sophisticated rose gold-toned Round brass dial. The watch is complemented by a luxurious rose gold-toned stainless steel mesh strap, offering both comfort and style. Powered by quartz movement and battery, it ensures accurate timekeeping and discreet checks. Designed for versatility, this analog watch is suitable for various occasions, from casual outings to formal events and parties. It carries a Two-year manufacturing defect warranty for peace of mind.",
    waterResistance: "30 m",
    strapClosure: "Sliding Buckle",
    glassMaterial: "Mineral Glass",
    primaryImage: "/images/new-img/model-1/670/670GM.16.L/670GM.16 (1).jpg",
    hoverImage: "/images/new-img/model-1/670/670GM.16.L/670GM.16 (2).jpg",
    gallery: [
      "/images/new-img/model-1/670/670GM.16.L/670GM.16 (1).jpg",
      "/images/new-img/model-1/670/670GM.16.L/670GM.16 (2).jpg",
      "/images/new-img/model-1/670/670GM.16.L/670GM.16 (3).jpg",
      "/images/new-img/model-1/670/670GM.16.L/670GM.16 (4).jpg"
    ]
  },
  {
    modelNo: "670GM.2L",
    slug: "670gm-2l",
    ean: "7435873331389",
    mrp: 5995,
    price: 5995,
    styleId: "36505645",
    dialColor: "Silver",
    dialHex: "#C0C0C0",
    strapColor: "Gold",
    strapHex: "#D4AF37",
    dialSize: "34 mm",
    caseSize: "38 mm",
    bandSize: "20x18 mm",
    thickness: "9 mm",
    strapLength: "Standard",
    weight: "77 gm",
    dialShape: "Round",
    strapMaterial: "Stainless Steel Mesh",
    watchType: "Analogue",
    gender: "Women",
    caseMaterial: "Stainless steel",
    functionality: "Patterned",
    movement: "Quartz",
    description: "D'SIGNER Analog Watch for Women. This watch features a striking Silver dial, symbolizing growth and prosperity, encased within a sophisticated rose gold-toned round brass dial. The watch is complemented by a luxurious rose gold-toned stainless steel mesh strap, offering both comfort and style. Powered by quartz movement and battery, it ensures accurate timekeeping and discreet checks. Designed for versatility, this analog watch is suitable for various occasions, from casual outings to formal events and parties. It carries a Two-year manufacturing defect warranty for peace of mind.",
    waterResistance: "30 m",
    strapClosure: "Sliding Buckle",
    glassMaterial: "Mineral Glass",
    primaryImage: "/images/new-img/model-1/670/670GM.2.L/670GM.2 (1).jpg",
    hoverImage: "/images/new-img/model-1/670/670GM.2.L/670GM.2 (2).jpg",
    gallery: [
      "/images/new-img/model-1/670/670GM.2.L/670GM.2 (1).jpg",
      "/images/new-img/model-1/670/670GM.2.L/670GM.2 (2).jpg",
      "/images/new-img/model-1/670/670GM.2.L/670GM.2 (3).jpg",
      "/images/new-img/model-1/670/670GM.2.L/670GM.2 (4).jpg"
    ]
  },
  {
    modelNo: "670GM.4L",
    slug: "670gm-4l",
    ean: "7435873331518",
    mrp: 5995,
    price: 5995,
    styleId: "36505644",
    dialColor: "Gold",
    dialHex: "#D4AF37",
    strapColor: "Gold",
    strapHex: "#D4AF37",
    dialSize: "34 mm",
    caseSize: "38 mm",
    bandSize: "20x18 mm",
    thickness: "9 mm",
    strapLength: "Standard",
    weight: "77 gm",
    dialShape: "Round",
    strapMaterial: "Stainless Steel Mesh",
    watchType: "Analogue",
    gender: "Women",
    caseMaterial: "Stainless steel",
    functionality: "Patterned",
    movement: "Quartz",
    description: "D'SIGNER Analog Watch for Women. This watch features a striking Gold dial, symbolizing growth and prosperity, encased within a sophisticated rose gold-toned round brass dial. The watch is complemented by a luxurious rose gold-toned stainless steel mesh strap, offering both comfort and style. Powered by quartz movement and battery, it ensures accurate timekeeping and discreet checks. Designed for versatility, this analog watch is suitable for various occasions, from casual outings to formal events and parties. It carries a Two-year manufacturing defect warranty for peace of mind.",
    waterResistance: "30 m",
    strapClosure: "Sliding Buckle",
    glassMaterial: "Mineral Glass",
    primaryImage: "/images/new-img/model-1/670/670GM.4.L/670GM.4 (1).jpg",
    hoverImage: "/images/new-img/model-1/670/670GM.4.L/670GM.4 (2).jpg",
    gallery: [
      "/images/new-img/model-1/670/670GM.4.L/670GM.4 (1).jpg",
      "/images/new-img/model-1/670/670GM.4.L/670GM.4 (2).jpg",
      "/images/new-img/model-1/670/670GM.4.L/670GM.4 (3).jpg",
      "/images/new-img/model-1/670/670GM.4.L/670GM.4 (4).jpg"
    ]
  },
  {
    modelNo: "670SM.2L",
    slug: "670sm-2l",
    ean: "7435873516878",
    mrp: 5495,
    price: 5495,
    styleId: "36505646",
    dialColor: "Silver",
    dialHex: "#C0C0C0",
    strapColor: "Silver",
    strapHex: "#C0C0C0",
    dialSize: "34 mm",
    caseSize: "38 mm",
    bandSize: "20x18 mm",
    thickness: "9 mm",
    strapLength: "Standard",
    weight: "77 gm",
    dialShape: "Round",
    strapMaterial: "Stainless Steel Mesh",
    watchType: "Analogue",
    gender: "Women",
    caseMaterial: "Stainless steel",
    functionality: "Patterned",
    movement: "Quartz",
    description: "D'SIGNER Analog Watch for Women. This watch features a striking Silver dial, symbolizing growth and prosperity, encased within a sophisticated Silver-toned round brass dial. The watch is complemented by a luxurious rose gold-toned stainless steel mesh strap, offering both comfort and style. Powered by quartz movement and battery, it ensures accurate timekeeping and discreet checks. Designed for versatility, this analog watch is suitable for various occasions, from casual outings to formal events and parties. It carries a Two-year manufacturing defect warranty for peace of mind.",
    waterResistance: "30 m",
    strapClosure: "Sliding Buckle",
    glassMaterial: "Mineral Glass",
    primaryImage: "/images/new-img/model-1/670/670/670SM.2L/670SM (1).jpg",
    hoverImage: "/images/new-img/model-1/670/670/670SM.2L/670SM (2).jpg",
    gallery: [
      "/images/new-img/model-1/670/670/670SM.2L/670SM (1).jpg",
      "/images/new-img/model-1/670/670/670SM.2L/670SM (2).jpg",
      "/images/new-img/model-1/670/670/670SM.2L/670SM (3).jpg",
      "/images/new-img/model-1/670/670/670SM.2L/670SM (4).jpg",
      "/images/new-img/model-1/670/670/670/670SM.2L.png"
    ]
  },
  {
    modelNo: "670SM.5L",
    slug: "670sm-5l",
    ean: "7435873517004",
    mrp: 5495,
    price: 5495,
    styleId: "36505647",
    dialColor: "Blue",
    dialHex: "#1E3A5F",
    strapColor: "Silver",
    strapHex: "#C0C0C0",
    dialSize: "34 mm",
    caseSize: "38 mm",
    bandSize: "20x18 mm",
    thickness: "9 mm",
    strapLength: "Standard",
    weight: "77 gm",
    dialShape: "Round",
    strapMaterial: "Stainless Steel Mesh",
    watchType: "Analogue",
    gender: "Women",
    caseMaterial: "Stainless steel",
    functionality: "Patterned",
    movement: "Quartz",
    description: "D'SIGNER Analog Watch for Women. This watch features a striking blue dial, symbolizing growth and prosperity, encased within a sophisticated Silver-toned round brass dial. The watch is complemented by a luxurious rose gold-toned stainless steel mesh strap, offering both comfort and style. Powered by quartz movement and battery, it ensures accurate timekeeping and discreet checks. Designed for versatility, this analog watch is suitable for various occasions, from casual outings to formal events and parties. It carries a Two-year manufacturing defect warranty for peace of mind.",
    waterResistance: "30 m",
    strapClosure: "Sliding Buckle",
    glassMaterial: "Mineral Glass",
    primaryImage: "/images/new-img/model-1/670/670/670SM.5L/670SM (1).jpg",
    hoverImage: "/images/new-img/model-1/670/670/670SM.5L/670SM (2).jpg",
    gallery: [
      "/images/new-img/model-1/670/670/670SM.5L/670SM (1).jpg",
      "/images/new-img/model-1/670/670/670SM.5L/670SM (2).jpg",
      "/images/new-img/model-1/670/670/670SM.5L/670SM (3).jpg",
      "/images/new-img/model-1/670/670/670SM.5L/670SM (4).jpg",
      "/images/new-img/model-1/670/670/670/670SM.5L.png"
    ]
  },
  {
    modelNo: "670RGBRNM.9L",
    slug: "670rgbrnm-9l",
    ean: "7435873332164",
    mrp: 6495,
    price: 6495,
    styleId: "36505648",
    dialColor: "Brown",
    dialHex: "#6B3E26",
    strapColor: "Brown",
    strapHex: "#6B3E26",
    dialSize: "34 mm",
    caseSize: "38 mm",
    bandSize: "20x18 mm",
    thickness: "9.5 mm",
    strapLength: "22 cm",
    weight: "75 gm",
    dialShape: "Round",
    strapMaterial: "Stainless Steel Mesh",
    watchType: "Analogue",
    gender: "Ladies",
    caseMaterial: "Stainless Steel",
    functionality: "Analog",
    movement: "Quartz",
    description: "Elevate your everyday style with this refined timepiece featuring a striking brown dial and matching mesh strap. The warm rose-gold case creates a beautiful contrast, delivering a modern yet timeless look suitable for both formal and casual wear. Sophisticated Dial: Deep sunburst dial with a clean, minimalist design. Premium Finish: Polished rose-gold tone case for a luxurious touch. Slim Profile: Lightweight and comfortable for all-day wear. Mesh Strap: Durable stainless-steel mesh band in matching tone for a sleek fit. Precision Movement: Reliable quartz movement for accurate timekeeping. Effortlessly Stylish for Casual and Party Occasions.",
    waterResistance: "3 ATM",
    strapClosure: "Jewellery clasp",
    glassMaterial: "Mineral Glass",
    primaryImage: "/images/new-img/model-1/670/670RGBRNM.9.L.jpg",
    hoverImage: "/images/new-img/model-1/670/670RGBRNM.9.L.jpg",
    gallery: [
      "/images/new-img/model-1/670/670RGBRNM.9.L.jpg"
    ]
  }
];

export const DSIGNER_670_UNIFIED_PRODUCTS: UnifiedProduct[] = RAW_670_DATA.map((item, idx) => ({
  id: `dsigner-670-${idx}`,
  slug: item.slug,
  name: item.modelNo,
  modelNumber: item.modelNo,
  modelFamily: "670",
  collection: "dsigner-womens",
  price: item.price,
  comparePrice: item.mrp > item.price ? item.mrp : null,
  brand: "D'SIGNER",
  category: "Classic",
  badge: "WOMEN",
  tags: ["Women", "D'SIGNER", "670", item.dialColor, item.strapColor],
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
  gender: "Women",
  ean: item.ean
}));

function norm(s: string): string {
  return String(s || "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

export function get670Family(slugOrSku: string): ModelFamilyGroup | undefined {
  if (!slugOrSku) return undefined;
  const n = norm(slugOrSku);
  const matched = RAW_670_DATA.find(item => norm(item.slug) === n || norm(item.modelNo) === n);
  if (!matched) return undefined;

  const variant: Variant = {
    sku: matched.modelNo,
    ean: matched.ean,
    price: matched.price,
    mrp: matched.mrp,
    gender: "Women",
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
    familyId: "670",
    collectionSlug: "dsigner-womens",
    name: matched.modelNo,
    brand: "D'SIGNER",
    category: "Classic",
    gender: "Women",
    priceRange: { min: matched.price, max: matched.price },
    variants: [variant],
    variantCount: 1
  };
}
