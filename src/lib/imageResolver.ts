/**
 * ═══════════════════════════════════════════════════════════
 *  CENTRALIZED IMAGE RESOLVER — Designer World
 *  Production-grade image resolution with multi-level fallback
 *  
 *  Matches physical images from disk map with high precision:
 *  Exact SKU -> Clean SKU -> SKU Base -> Family Directory ->
 *  Structured Family Key -> Collection Hero Fallback.
 * ═══════════════════════════════════════════════════════════
 */

import rawPhysicalImageMap from "@/data/physicalImageMap.json";
import { collections } from "@/data/collections";
import { COLLECTION_MAP } from "@/data/collectionMap";

export interface ImageGallery {
  primary: string;
  hover: string;
  detail: string[];
  lifestyle?: string[];
}

const physicalImageMap = rawPhysicalImageMap as Record<string, string[]>;

// Build a fast lookup set of all physical paths on disk
const physicalPathsSet = new Set<string>();
for (const paths of Object.values(physicalImageMap)) {
  for (const p of paths) {
    physicalPathsSet.add(p);
  }
}

// Build clean alphanumeric lookup map (removes spaces, hyphens, parentheses, etc.)
const cleanKeyMap = new Map<string, string[]>();
for (const [key, paths] of Object.entries(physicalImageMap)) {
  if (key.startsWith("FAMILY:") || key.startsWith("DETAIL:")) continue;
  const clean = key.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (clean.length >= 3) {
    if (!cleanKeyMap.has(clean)) {
      cleanKeyMap.set(clean, []);
    }
    cleanKeyMap.get(clean)!.push(...paths);
  }
}

// Build fast folder lookup for all physical image paths
const familyDirectoryPaths = new Map<string, string[]>();
for (const p of physicalPathsSet) {
  const parts = p.split("/");
  // Index folder directory names (e.g., 824, 876, 950, 7914)
  for (const part of parts.slice(0, -1)) {
    const cleanPart = part.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (cleanPart.length >= 3) {
      if (!familyDirectoryPaths.has(cleanPart)) {
        familyDirectoryPaths.set(cleanPart, []);
      }
      familyDirectoryPaths.get(cleanPart)!.push(p);
    }
  }
}

/**
 * Checks if a path physically exists on disk (via the indexed map).
 */
export function pathExistsOnDisk(pathString: string): boolean {
  if (!pathString || pathString === "/" || pathString.startsWith("http")) {
    return false;
  }
  return physicalPathsSet.has(pathString);
}

/**
 * Helper: Filter image paths to prefer PNG product shots over JPG detail shots.
 * PNG images in the map are typically clean transparent product cutouts.
 */
function preferPngProductShots(paths: string[]): string[] {
  // First prefer clean PNG cutouts (avoiding parentheses like (2) or (3))
  const cleanPngs = paths.filter(p => p.toLowerCase().endsWith(".png") && !p.includes("("));
  if (cleanPngs.length > 0) return cleanPngs;

  const anyPngs = paths.filter(p => p.toLowerCase().endsWith(".png"));
  if (anyPngs.length > 0) return anyPngs;

  return paths;
}

/**
 * Find physical images matching a SKU and/or family ID from the map.
 * Multi-tiered lookup guarantees real watch images.
 */
export function findPhysicalImagesForSku(sku: string, familyId: string): string[] {
  const skuUpper = (sku || "").toUpperCase().trim();
  const famUpper = (familyId || "").toUpperCase().trim();
  const skuClean = skuUpper.replace(/[^A-Z0-9]/g, "");
  const famClean = famUpper.replace(/[^A-Z0-9]/g, "");

  // 1. Direct exact SKU match (e.g., "950GNFS.16G")
  if (skuUpper && physicalImageMap[skuUpper]) {
    return preferPngProductShots(physicalImageMap[skuUpper]);
  }

  // 2. Normalized clean SKU match (handles spaces, hyphens on disk)
  if (skuClean && cleanKeyMap.has(skuClean)) {
    return preferPngProductShots(cleanKeyMap.get(skuClean)!);
  }

  // 3. Try without strap suffix (e.g., "950GNFS" from "950GNFS.16G")
  const dotIndex = skuUpper.indexOf(".");
  if (dotIndex > 0) {
    const skuBase = skuUpper.substring(0, dotIndex);
    if (physicalImageMap[skuBase]) {
      return preferPngProductShots(physicalImageMap[skuBase]);
    }
    const skuBaseClean = skuBase.replace(/[^A-Z0-9]/g, "");
    if (cleanKeyMap.has(skuBaseClean)) {
      return preferPngProductShots(cleanKeyMap.get(skuBaseClean)!);
    }
  }

  // 4. Substring clean match (for compound keys or variant codes)
  if (skuClean.length >= 6) {
    for (const [kClean, paths] of cleanKeyMap.entries()) {
      if (kClean.includes(skuClean) || skuClean.includes(kClean)) {
        return preferPngProductShots(paths);
      }
    }
  }

  // 5. Family directory lookup on disk (e.g., /824/, /876/, /950/, /E-7914/, /E-1890/)
  if (famClean) {
    let famPaths: string[] | undefined = familyDirectoryPaths.get(famClean);
    if (!famPaths && !famClean.startsWith("E")) {
      famPaths = familyDirectoryPaths.get(`E${famClean}`);
    }
    if (!famPaths) {
      for (const [dirKey, paths] of familyDirectoryPaths.entries()) {
        if (dirKey === famClean || dirKey === `E${famClean}` || dirKey.includes(famClean)) {
          famPaths = paths;
          break;
        }
      }
    }
    if (!famPaths) {
      // Direct path search in physicalPathsSet
      const matched = Array.from(physicalPathsSet).filter(p => {
        const u = p.toUpperCase();
        return u.includes(`/${famUpper}/`) || u.includes(`/${famClean}/`) ||
               u.includes(`/E-${famUpper}`) || u.includes(`/E-${famClean}`) ||
               u.includes(`E-${famClean}`) || u.includes(`E${famClean}`);
      });
      if (matched.length > 0) {
        famPaths = matched;
      }
    }

    if (famPaths && famPaths.length > 0) {
      const cleanPngs = famPaths.filter(p => p.toLowerCase().endsWith(".png") && !p.includes("("));
      if (cleanPngs.length > 0) return cleanPngs;

      const anyPngs = famPaths.filter(p => p.toLowerCase().endsWith(".png"));
      if (anyPngs.length > 0) return anyPngs;

      const cleanJpgs = famPaths.filter(p => !p.includes("("));
      if (cleanJpgs.length > 0) return cleanJpgs;

      return famPaths.slice(0, 4);
    }
  }

  // 6. Structured family key: FAMILY:<id>
  const familyKey = `FAMILY:${famUpper}`;
  if (physicalImageMap[familyKey]) {
    return preferPngProductShots(physicalImageMap[familyKey]);
  }

  // 7. Collection hero fallback if available
  const colSlug = COLLECTION_MAP[familyId] || COLLECTION_MAP[famClean] || COLLECTION_MAP[famUpper];
  if (colSlug) {
    if (colSlug === "escort") {
      const escortHero = "/images/watches/Escort/E-7914/E-7914.GM_Blue.png";
      if (physicalPathsSet.has(escortHero) || pathExistsOnDisk(escortHero)) {
        return [escortHero];
      }
    }
    const col = collections.find(c => c.slug === colSlug);
    if (col?.heroImage && (physicalPathsSet.has(col.heroImage) || pathExistsOnDisk(col.heroImage))) {
      return [col.heroImage];
    }
  }

  return [];
}

/**
 * Helper to find detail images dynamically from the map.
 */
export function findDetailImagesForSku(sku: string, familyId: string): string[] {
  const skuUpper = (sku || "").toUpperCase().trim();
  const skuParts = skuUpper.split(".");
  const skuBase = skuParts[0];
  const famClean = (familyId || "").toUpperCase().replace(/[^A-Z0-9]/g, "");

  const detailPaths: string[] = [];

  // 1. Check DETAIL: keys matching this SKU base
  const detailKey = `DETAIL:${skuBase}`;
  if (physicalImageMap[detailKey]) {
    detailPaths.push(...physicalImageMap[detailKey]);
  }

  // 2. Check for keys that match the pattern "SKUBASE (1)", "SKUBASE (2)" etc.
  for (const [key, paths] of Object.entries(physicalImageMap)) {
    if (key.startsWith("FAMILY:") || key.startsWith("DETAIL:")) continue;
    if (skuBase && key.startsWith(skuBase) && /\(\d+\)/.test(key)) {
      detailPaths.push(...paths);
    }
  }

  // 3. Include additional images from the family folder if detail paths are sparse
  if (detailPaths.length < 2 && famClean && familyDirectoryPaths.has(famClean)) {
    const famPaths = familyDirectoryPaths.get(famClean)!;
    for (const p of famPaths) {
      if (!detailPaths.includes(p)) {
        detailPaths.push(p);
      }
    }
  }

  const unique = Array.from(new Set(detailPaths));
  return unique.sort();
}

/**
 * Resolves image gallery paths for a given SKU and family.
 */
export function resolveProductImages(familyId: string, sku: string): ImageGallery {
  const physicalImages = findPhysicalImagesForSku(sku, familyId);

  if (physicalImages.length > 0) {
    const primary = physicalImages[0];
    const hover = physicalImages.length > 1 ? physicalImages[1] : primary;
    const detail = findDetailImagesForSku(sku, familyId);

    return {
      primary,
      hover,
      detail: detail.length > 0 ? detail : [primary],
      lifestyle: []
    };
  }

  return {
    primary: "",
    hover: "",
    detail: [],
    lifestyle: []
  };
}

/**
 * Returns ALL possible primary image paths for a given family and SKU.
 */
export function getAllPrimaryImageCandidates(familyId: string, sku: string): string[] {
  return findPhysicalImagesForSku(sku, familyId);
}

/**
 * Resolves a single "hero" image for a family (uses first variant's primary).
 */
export function resolveFamilyHeroImage(familyId: string, firstSku?: string): string {
  if (firstSku) {
    const physical = findPhysicalImagesForSku(firstSku, familyId);
    if (physical.length > 0) {
      return physical[0];
    }
  }
  const physicalFamily = findPhysicalImagesForSku(familyId, familyId);
  if (physicalFamily.length > 0) {
    return physicalFamily[0];
  }
  return "";
}

/**
 * Checks if an image path is a valid non-empty candidate.
 */
export function isValidImagePath(path: string | undefined | null): boolean {
  return !!path && path.length > 0 && path !== "/";
}

/**
 * Returns the best available image from a list of candidates.
 */
export function getBestImage(candidates: string[]): string {
  for (const c of candidates) {
    if (isValidImagePath(c) && pathExistsOnDisk(c)) return c;
  }
  return candidates[0] || "";
}

// ─── FAMILIES WITH VERIFIED IMAGES (for sorting priority) ───
export const FAMILIES_WITH_IMAGES = new Set<string>();
for (const key of Object.keys(physicalImageMap)) {
  if (key.startsWith("FAMILY:")) {
    FAMILIES_WITH_IMAGES.add(key.replace("FAMILY:", ""));
    continue;
  }
  if (key.startsWith("DETAIL:")) continue;
  const match = key.match(/^([A-Z0-9]+)/);
  if (match) {
    const fam = match[1].match(/^(\d+)/)?.[1];
    if (fam && fam.length >= 3) {
      FAMILIES_WITH_IMAGES.add(fam);
    }
  }
}
// Also add all families found in directory indexing
for (const famKey of familyDirectoryPaths.keys()) {
  FAMILIES_WITH_IMAGES.add(famKey);
}

/**
 * Check if a family has images available on disk.
 */
export function familyHasImages(familyId: string): boolean {
  const upper = (familyId || "").toUpperCase().trim();
  const clean = upper.replace(/[^A-Z0-9]/g, "");
  return FAMILIES_WITH_IMAGES.has(upper) || FAMILIES_WITH_IMAGES.has(clean);
}
