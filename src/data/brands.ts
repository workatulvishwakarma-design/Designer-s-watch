// ─────────────────────────────────────────────────────────
//  Centralized Brand Metadata — D'SIGNER + ESCORT
// ─────────────────────────────────────────────────────────

export interface Brand {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  priceRange: { min: number; max: number };
  priceLabel: string;
  identity: string;
  logoPath: string;
  logoDarkPath: string;
  accentColor: string;
  bgStyle: "dark" | "light";
}

export const brands: Brand[] = [
  {
    slug: "dsigner",
    name: "D'SIGNER",
    tagline: "Designed for Those Who Define Time",
    description:
      "Born in 1991, D'SIGNER represents the pinnacle of Designer World's craft — where four generations of horological expertise converge into timepieces that balance luxury, precision, and modern sophistication. Each watch is a statement of individuality, designed for those who don't follow time — they set it.",
    priceRange: { min: 5000, max: 50000 },
    priceLabel: "₹5,000 — ₹50,000",
    identity: "Premium · Bold · Heritage Luxury",
    logoPath: "/images/deigner.png",
    logoDarkPath: "/images/deigner.png",
    accentColor: "#B8935A",
    bgStyle: "dark",
  },
  {
    slug: "escort",
    name: "ESCORT",
    tagline: "Timeless Style, Accessible Elegance",
    description:
      "Launched in 1995, Escort brings timeless design to a wider audience. Crafted with the same attention to detail as its premium sibling, Escort delivers refined everyday elegance — proving that quality craftsmanship need not compromise accessibility.",
    priceRange: { min: 1500, max: 6000 },
    priceLabel: "₹1,500 — ₹6,000",
    identity: "Elegant · Accessible · Everyday Luxury",
    logoPath: "/images/escort.png",
    logoDarkPath: "/images/escort_b.png",
    accentColor: "#003926",
    bgStyle: "light",
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
