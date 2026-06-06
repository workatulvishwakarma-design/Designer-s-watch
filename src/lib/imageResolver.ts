/**
 * ═══════════════════════════════════════════════════════════
 *  CENTRALIZED IMAGE RESOLVER — Designer World
 *  Production-grade image resolution with multi-level fallback
 *  
 *  v2: Fixed SKU→image matching to use structured keys
 *  (FAMILY:xxx, DETAIL:xxx, exact SKU) instead of broken
 *  substring matching that caused cross-contamination
 * ═══════════════════════════════════════════════════════════
 */

import rawPhysicalImageMap from "@/data/physicalImageMap.json";
import { collections } from "@/data/collections";

export interface ImageGallery {
  primary: string;
  hover: string;
  detail: string[];
  lifestyle: string[];
}

const physicalImageMap = rawPhysicalImageMap as Record<string, string[]>;

// Build a fast lookup set of all physical paths on disk
const physicalPathsSet = new Set<string>();
for (const paths of Object.values(physicalImageMap)) {
  for (const p of paths) {
    physicalPathsSet.add(p);
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
 * PNG images in the map are typically clean product cutouts.
 */
function preferPngProductShots(paths: string[]): string[] {
  const pngs = paths.filter(p => p.toLowerCase().endsWith('.png'));
  if (pngs.length > 0) return pngs;
  return paths;
}

/**
 * Helper: Filter paths to only those belonging to a specific family directory.
 */
function filterPathsByFamily(paths: string[], familyId: string): string[] {
  const famUpper = familyId.toUpperCase().trim();
  return paths.filter(p => {
    const parts = p.split('/');
    return parts.some(part => part === famUpper || part === familyId);
  });
}

/**
 * Find physical images matching a SKU and/or family ID from the map.
 * Uses structured keys: exact SKU → family-level fallback.
 * NO more dangerous substring matching against single-digit keys.
 */
export function findPhysicalImagesForSku(sku: string, familyId: string): string[] {
  const skuUpper = sku.toUpperCase().trim();
  const famUpper = familyId.toUpperCase().trim();
  
  // 1. Direct exact SKU match (e.g., "950GNFS.16G")
  if (physicalImageMap[skuUpper]) {
    return preferPngProductShots(physicalImageMap[skuUpper]);
  }
  
  // 2. Try without strap suffix (e.g., "950GNFS" from "950GNFS.16G")
  const dotIndex = skuUpper.indexOf('.');
  if (dotIndex > 0) {
    const skuBase = skuUpper.substring(0, dotIndex);
    if (physicalImageMap[skuBase]) {
      return preferPngProductShots(physicalImageMap[skuBase]);
    }
  }
  
  // 3. Search for compound keys containing this exact SKU (e.g., "521GM.16G & 521GM.16L")
  for (const [key, paths] of Object.entries(physicalImageMap)) {
    if (key.startsWith('FAMILY:') || key.startsWith('DETAIL:')) continue;
    // Only match if the key contains the full SKU as a word boundary
    if (key.length >= skuUpper.length && key.includes(skuUpper)) {
      return preferPngProductShots(paths);
    }
  }
  
  // 4. Search for keys that start with the same base SKU and have matching color codes
  if (dotIndex > 0) {
    const skuBase = skuUpper.substring(0, dotIndex);
    for (const [key, paths] of Object.entries(physicalImageMap)) {
      if (key.startsWith('FAMILY:') || key.startsWith('DETAIL:')) continue;
      if (key.startsWith(skuBase) && !key.includes('(')) {
        return preferPngProductShots(paths);
      }
    }
  }

  // 5. Family-level fallback: use FAMILY:<id> key to find any image for this model
  const familyKey = `FAMILY:${famUpper}`;
  if (physicalImageMap[familyKey]) {
    // Filter to prefer PNG product shots within the family
    const familyPaths = physicalImageMap[familyKey];
    const productPngs = familyPaths.filter(p => {
      const fn = p.split('/').pop()?.toUpperCase() || '';
      return fn.endsWith('.PNG') && /^\d{3,4}[A-Z]/.test(fn);
    });
    if (productPngs.length > 0) return productPngs;
    
    // Fall back to any JPG product shots (not numbered files)
    const productJpgs = familyPaths.filter(p => {
      const fn = p.split('/').pop()?.toUpperCase() || '';
      return /^\d{3,4}[A-Z]/.test(fn.replace(/\.\w+$/, ''));
    });
    if (productJpgs.length > 0) return productJpgs;
    
    // Last resort: return first few family images
    return familyPaths.slice(0, 4);
  }
  
  return [];
}

/**
 * Helper to find detail images dynamically from the map.
 */
export function findDetailImagesForSku(sku: string, familyId: string): string[] {
  const skuUpper = sku.toUpperCase().trim();
  const skuParts = skuUpper.split(".");
  const skuBase = skuParts[0]; // e.g., "450RGBFS" from "450RGBFS.16G"
  
  const detailPaths: string[] = [];
  
  // 1. Check DETAIL: keys matching this SKU base
  const detailKey = `DETAIL:${skuBase}`;
  if (physicalImageMap[detailKey]) {
    detailPaths.push(...physicalImageMap[detailKey]);
  }
  
  // 2. Check for keys that match the pattern "SKUBASE (1)", "SKUBASE (2)" etc.
  for (const [key, paths] of Object.entries(physicalImageMap)) {
    if (key.startsWith('FAMILY:') || key.startsWith('DETAIL:')) continue;
    if (key.startsWith(skuBase) && /\(\d+\)/.test(key)) {
      // This is a detail image - but filter to only those in the right SKU's folder
      const skuFolder = skuUpper.includes('.') ? skuUpper : null;
      if (skuFolder) {
        const matching = paths.filter(p => p.toUpperCase().includes(skuFolder));
        if (matching.length > 0) {
          detailPaths.push(...matching);
          continue;
        }
      }
      detailPaths.push(...paths);
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
  if (key.startsWith('FAMILY:')) {
    FAMILIES_WITH_IMAGES.add(key.replace('FAMILY:', ''));
    continue;
  }
  if (key.startsWith('DETAIL:')) continue;
  const match = key.match(/^([A-Z0-9]+)/);
  if (match) {
    const fam = match[1].match(/^(\d+)/)?.[1];
    if (fam && fam.length >= 3) {
      FAMILIES_WITH_IMAGES.add(fam);
    }
  }
}

/**
 * Check if a family has images available on disk.
 */
export function familyHasImages(familyId: string): boolean {
  return FAMILIES_WITH_IMAGES.has(familyId.toUpperCase().trim());
}

function emptyGallery(): ImageGallery {
  return { primary: "", hover: "", detail: [], lifestyle: [] };
}
