/**
 * ═══════════════════════════════════════════════════════════
 *  CENTRALIZED IMAGE RESOLVER — Designer World
 *  Production-grade image resolution with multi-level fallback
 * ═══════════════════════════════════════════════════════════
 */

// Local type to avoid circular dependency with productData.ts
export interface ImageGallery {
  primary: string;
  hover: string;
  detail: string[];
  lifestyle: string[];
}

// ─── MODEL DIRECTORY MAP ───
const MODEL_1_FAMILIES = new Set([
  "200","234","314","450","521","578","670","680","724","748","753","777","778","788","792","794","795",
  "800","802","804","806","807","808","809","810","811","812","814","819",
  "820","820G","821","823","824","825","826","827","828","829",
]);

const MODEL_2_FAMILIES = new Set([
  "181","830","834","835","836","837","840","841","843","845","850","850L","851","852",
  "853","854","855","856","857","860","862","865","867","869","876","901","901L","905","912",
  "915","916","950","960","962","J905",
]);

/**
 * Families whose PNG images are stored in a special "xxxpng" subdirectory
 * e.g. /model-1/680/680png/680BL.16G.png
 */
const PNG_SUBDIR_FAMILIES = new Set(["680"]);

/**
 * Families that have root-level .jpg files (not PNG) directly in the family dir
 * e.g. /model-1/670/670RGBLM.5.L.jpg
 */
const ROOT_JPG_FAMILIES = new Set(["670"]);

/**
 * Resolves image gallery paths for a given SKU and family.
 * 
 * Actual directory structures observed:
 * 
 * PATTERN A (model-1/795): Root-level PNGs
 *   /model-1/795/795SM.2G.png
 *   /model-1/795/795SM.2G/795SM (1).jpg  ← detail images
 * 
 * PATTERN B (model-2/950): Nested familyId/familyId/ PNGs 
 *   /model-2/950/950/950GNFS.16G.png
 *   /model-2/950/950GNFS.165G/  ← detail JPGs inside
 * 
 * PATTERN C (model-1/748): Triple-nested familyId/familyId/familyId/ PNGs
 *   /model-1/748/748/748/748BM.3G.png
 *   /model-1/748/748BLTM.5.G/748BLTM.5 (1).jpg  ← detail
 * 
 * PATTERN D (model-1/680): Special "xxxpng" subdir
 *   /model-1/680/680png/680BL.16G.png
 *   /model-1/680/680BL.16G/680BL (1).jpg  ← detail
 * 
 * PATTERN E (model-1/670): Root-level JPGs (not PNG)
 *   /model-1/670/670RGBLM.5.L.jpg
 *   /model-1/670/670GM.16.L/  ← detail JPGs inside
 * 
 * PATTERN F (model-2/830): Nested familyId/ PNGs
 *   /model-2/830/830/830GNFS.8G.png
 */
export function resolveProductImages(familyId: string, sku: string): ImageGallery {
  const dir = getModelDir(familyId);
  if (!dir) return emptyGallery();

  const base = `/images/new-img/${dir}/${familyId}`;

  // Build primary image candidates in priority order based on known structures
  const primaryCandidates: string[] = [];
  
  // Pattern A: Root-level PNG  (e.g., /model-1/795/795SM.2G.png)
  primaryCandidates.push(`${base}/${sku}.png`);
  
  // Pattern B/F: Nested familyId/ PNG  (e.g., /model-2/950/950/950GNFS.16G.png)
  primaryCandidates.push(`${base}/${familyId}/${sku}.png`);
  
  // Pattern C: Triple-nested familyId/familyId/ PNG  (e.g., /model-1/748/748/748/748BM.3G.png)
  primaryCandidates.push(`${base}/${familyId}/${familyId}/${sku}.png`);

  // Pattern D: xxxpng subdir  (e.g., /model-1/680/680png/680BL.16G.png)
  if (PNG_SUBDIR_FAMILIES.has(familyId)) {
    primaryCandidates.unshift(`${base}/${familyId}png/${sku}.png`);
  }
  
  // Pattern E: Root-level JPG  (e.g., /model-1/670/670RGBLM.5.L.jpg)
  if (ROOT_JPG_FAMILIES.has(familyId)) {
    primaryCandidates.push(`${base}/${sku}.jpg`);
  }

  // Strip the dot-suffix from SKU for detail image naming
  // e.g., "748BLTM.5.G" → "748BLTM" (base name for detail JPGs)
  // Detail images follow pattern: 748BLTM.5.G/748BLTM.5 (1).jpg
  const skuParts = sku.split(".");
  const skuBase = skuParts[0]; // e.g., "748BLTM" from "748BLTM.5.G"
  const skuMid = skuParts.length >= 2 ? `${skuParts[0]}.${skuParts[1]}` : skuBase;
  
  // Detail images: variant subdirectory with numbered JPGs
  const detail = [1, 2, 3, 4].map(n => `${base}/${sku}/${skuMid} (${n}).jpg`);

  return {
    primary: primaryCandidates[0],
    hover: primaryCandidates.length > 1 ? primaryCandidates[1] : primaryCandidates[0],
    detail,
    lifestyle: [],
  };
}

/**
 * Returns ALL possible primary image paths for a given family and SKU.
 * Used for checking which path actually resolves.
 */
export function getAllPrimaryImageCandidates(familyId: string, sku: string): string[] {
  const dir = getModelDir(familyId);
  if (!dir) return [];

  const base = `/images/new-img/${dir}/${familyId}`;
  const candidates: string[] = [];
  
  if (PNG_SUBDIR_FAMILIES.has(familyId)) {
    candidates.push(`${base}/${familyId}png/${sku}.png`);
  }
  
  candidates.push(`${base}/${sku}.png`);
  candidates.push(`${base}/${familyId}/${sku}.png`);
  candidates.push(`${base}/${familyId}/${familyId}/${sku}.png`);
  
  if (ROOT_JPG_FAMILIES.has(familyId)) {
    candidates.push(`${base}/${sku}.jpg`);
  }

  return candidates;
}

/**
 * Resolves a single "hero" image for a family (uses first variant's primary).
 * For use in collection grids and cards.
 */
export function resolveFamilyHeroImage(familyId: string, firstSku?: string): string {
  const dir = getModelDir(familyId);
  if (!dir) return "";

  const base = `/images/new-img/${dir}/${familyId}`;

  if (firstSku) {
    // Try pattern D first for known families
    if (PNG_SUBDIR_FAMILIES.has(familyId)) {
      return `${base}/${familyId}png/${firstSku}.png`;
    }
    // Pattern A: root level
    return `${base}/${firstSku}.png`;
  }
  return `${base}/${familyId}.png`;
}

/**
 * Checks if an image path is a valid non-empty candidate.
 */
export function isValidImagePath(path: string | undefined | null): boolean {
  return !!path && path.length > 0 && path !== "/";
}

/**
 * Returns the best available image from a list of candidates.
 * Since we can't check filesystem at build time, returns the first candidate.
 * The frontend uses onError fallback for runtime handling.
 */
export function getBestImage(candidates: string[]): string {
  for (const c of candidates) {
    if (isValidImagePath(c)) return c;
  }
  return "";
}

// ─── FAMILIES WITH VERIFIED IMAGES (for sorting priority) ───
// These families have multiple confirmed image files on disk
export const FAMILIES_WITH_IMAGES = new Set([
  // model-1 families (verified from disk listing)
  "450","521","670","680","748","753","777","778","788","792","794","795",
  "800","802","804","806","807","808","809","810","811","812","814","819",
  "820","821","823","824","826","827","829",
  // model-2 families (verified from disk listing)
  "830","834","835","836","837","840","841","843","845","849","850","851","852",
  "853","854","855","856","857","860","862","867","869","876","901","905","912",
  "915","916","950","960","962",
]);

/**
 * Check if a family has images available on disk.
 */
export function familyHasImages(familyId: string): boolean {
  return FAMILIES_WITH_IMAGES.has(familyId);
}

// ─── INTERNALS ───

function getModelDir(familyId: string): string | null {
  // Strip trailing letter suffixes for lookup (e.g., "901L" → check both "901L" and "901")
  if (MODEL_1_FAMILIES.has(familyId)) return "model-1";
  if (MODEL_2_FAMILIES.has(familyId)) return "model-2";

  // Fallback: strip trailing letters and try base number
  const baseId = familyId.replace(/[A-Za-z]+$/, "");
  if (MODEL_1_FAMILIES.has(baseId)) return "model-1";
  if (MODEL_2_FAMILIES.has(baseId)) return "model-2";

  return null;
}

function emptyGallery(): ImageGallery {
  return { primary: "", hover: "", detail: [], lifestyle: [] };
}
