export interface SearchableProduct {
  name: string;
  slug: string;
  brand: string;
  familyId: string;
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
  { name: "About", href: "/about", description: "Our heritage, philosophy, and watchmaking values", icon: "BookOpen" },
  { name: "Contact", href: "/contact", description: "Get in touch with customer service & sales support", icon: "Phone" },
  { name: "Pillars", href: "/nagpal-group", description: "Our corporate profile and horological history", icon: "Building" },
  { name: "D'Signer Collection", href: "/collections/dsigner", description: "Our core lineup of Swiss and luxury inspired mechanical and quartz timepieces", icon: "Compass" },
  { name: "Escort Collection", href: "/collections/escort", description: "Affordable luxury, everyday elegance watches", icon: "Zap" },
  { name: "Men's Watches", href: "/collections/men", description: "Timepieces for men, precision styled for boardroom to beyond", icon: "Compass" },
  { name: "Women's Watches", href: "/collections/women", description: "Timeless elegance and jewelry watches for women", icon: "Feather" },
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

  // Search products by name, brand, or family ID
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(cleanQuery) ||
      p.brand.toLowerCase().includes(cleanQuery) ||
      p.familyId.toLowerCase().includes(cleanQuery)
  );

  // Search collections by name or description
  const filteredCollections = collections.filter(
    (c) =>
      c.name.toLowerCase().includes(cleanQuery) ||
      c.description.toLowerCase().includes(cleanQuery) ||
      c.gender.toLowerCase().includes(cleanQuery)
  );

  // Search pages by name or description
  const filteredPages = pages.filter(
    (p) =>
      p.name.toLowerCase().includes(cleanQuery) ||
      p.description.toLowerCase().includes(cleanQuery)
  );

  return {
    products: filteredProducts.slice(0, 6),
    collections: filteredCollections.slice(0, 4),
    pages: filteredPages.slice(0, 4),
  };
}
