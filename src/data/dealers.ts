import rawDealers from "./dealers.json";

export interface Dealer {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  brands: string[];
  area: string;
  city: string;
  state: string;
  location: string;
  tabs: string[];
  googleMapsQuery: string;
  searchIndex: string;
}

export const dealers: Dealer[] = rawDealers as Dealer[];

export const dealerCategories = [
  "D'Signer Watches",
  "Escort Watches",
];

export const allCities: string[] = Array.from(
  new Set(dealers.map((d) => d.city).filter(Boolean))
).sort();

export const allStates: string[] = Array.from(
  new Set(dealers.map((d) => d.state).filter(Boolean))
).sort();

/**
 * Multi-tier weighted search:
 * 1. Filter by brand category ("D'Signer Watches" or "Escort Watches" or all)
 * 2. If query provided, score by:
 *    - City exact/prefix match (Score 100+)
 *    - Area exact/prefix match (Score 80+)
 *    - Store name match (Score 60+)
 *    - State match (Score 40+)
 *    - Generic searchIndex match (Score 20+)
 */
export function searchDealers(
  query: string,
  category: string = ""
): Dealer[] {
  const q = query.trim().toLowerCase();

  // 1. Filter by Brand Category
  const categoryFiltered = dealers.filter((dealer) => {
    if (!category || category === "Choose Category" || category === "All Categories" || category === "All Brands") {
      return true;
    }
    return dealer.brands.includes(category);
  });

  if (!q) {
    return categoryFiltered;
  }

  // 2. Score and sort by relevance
  const scored: { dealer: Dealer; score: number }[] = [];

  for (const dealer of categoryFiltered) {
    let score = 0;
    const nameLower = dealer.name.toLowerCase();
    const cityLower = dealer.city.toLowerCase();
    const stateLower = dealer.state.toLowerCase();
    const areaLower = dealer.area.toLowerCase();
    const phoneClean = dealer.phone.replace(/[^0-9]/g, "");
    const qClean = q.replace(/[^0-9]/g, "");

    // City exact or prefix match
    if (cityLower === q) {
      score += 150;
    } else if (cityLower.startsWith(q)) {
      score += 120;
    } else if (cityLower.includes(q)) {
      score += 90;
    }

    // Area match
    if (areaLower && areaLower.includes(q)) {
      score += 80;
    }

    // Name match
    if (nameLower.startsWith(q)) {
      score += 70;
    } else if (nameLower.includes(q)) {
      score += 50;
    }

    // State match
    if (stateLower === q) {
      score += 40;
    } else if (stateLower.includes(q)) {
      score += 30;
    }

    // Phone match
    if (qClean && phoneClean && phoneClean.includes(qClean)) {
      score += 60;
    }

    // Generic index match fallback
    if (score === 0 && dealer.searchIndex.includes(q)) {
      score += 20;
    }

    if (score > 0) {
      scored.push({ dealer, score });
    }
  }

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  return scored.map((item) => item.dealer);
}
