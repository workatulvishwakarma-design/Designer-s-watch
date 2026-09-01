import transparentMap from "@/data/transparent_image_map.json";

/**
 * Resolves a product image path to its verified transparent asset in /images/transparent-img/
 * If no transparent asset is registered or available, safely falls back to the original image path.
 */
export function resolveTransparentImage(origPath: string | undefined | null): string {
  if (!origPath) return "";
  const clean = origPath.trim().replace(/\\/g, "/");
  
  // Direct lookup in generated transparent map
  const mapped = (transparentMap as Record<string, string>)[clean];
  if (mapped) return mapped;
  
  // If already pointing to transparent-img, return as-is
  if (clean.startsWith("/images/transparent-img/")) return clean;
  
  // Safe fallback to original
  return clean;
}
