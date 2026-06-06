import fs from "fs";
import path from "path";
import { allModelFamilies } from "@/data/productData";
import { collections } from "@/data/collections";
import { getAllPrimaryImageCandidates } from "@/lib/imageResolver";

export interface AuditIssue {
  id: string;
  collection: string;
  category: string;
  productName: string;
  productId: string; // SKU
  imageType: string;
  imagePath: string;
  status: "Missing" | "Placeholder" | "Duplicate" | "Broken Path" | "Healthy";
  pageUrl: string;
  priority: "High" | "Medium" | "Low" | "Healthy";
  details?: string;
}

export interface AuditSummary {
  totalWatches: number;
  totalImagesExpected: number;
  totalImagesFound: number;
  totalMissingImages: number;
  completionPercentage: number;
  lastScanTimestamp: string;
}

export interface AuditReport {
  summary: AuditSummary;
  issues: AuditIssue[];
}

// Global cache to store the latest scan results in memory
let latestReportCache: AuditReport | null = null;

export function getLatestAuditReport(): AuditReport | null {
  return latestReportCache;
}

export function setLatestAuditReport(report: AuditReport) {
  latestReportCache = report;
}

/**
 * Checks if a file physically exists on the disk inside the public folder.
 */
function fileExistsInPublic(imagePath: string): boolean {
  if (!imagePath || imagePath === "/" || imagePath.startsWith("http")) {
    return false;
  }
  
  try {
    const absolutePath = path.join(process.cwd(), "public", imagePath);
    return fs.existsSync(absolutePath);
  } catch (error) {
    return false;
  }
}

/**
 * Scans the entire project and checks for image assets.
 */
export function performImageAudit(): AuditReport {
  const issues: AuditIssue[] = [];
  let totalWatches = 0;
  let totalImagesExpected = 0;
  let totalImagesFound = 0;

  // Track image usage to detect duplicate image references
  const imageUsageMap = new Map<string, string[]>(); // path -> SKUs

  // 1. Audit Collections Cover and Hero Images
  for (const col of collections) {
    const pageUrl = `/collections/${col.slug}`;
    
    // Check Hero Image
    if (col.heroImage) {
      totalImagesExpected++;
      const exists = fileExistsInPublic(col.heroImage);
      const isPlaceholder = col.heroImage.includes("main-img") || col.heroImage.includes("img03");
      
      if (exists) {
        totalImagesFound++;
        if (isPlaceholder) {
          issues.push({
            id: `col-hero-${col.slug}-placeholder`,
            collection: col.title,
            category: "Collection Cover",
            productName: `${col.title} Hero Banner`,
            productId: col.slug,
            imageType: "Hero Banner Image",
            imagePath: col.heroImage,
            status: "Placeholder",
            pageUrl,
            priority: "High",
            details: "Standard fallback template image detected instead of collection asset."
          });
        }
      } else {
        issues.push({
          id: `col-hero-${col.slug}-missing`,
          collection: col.title,
          category: "Collection Cover",
          productName: `${col.title} Hero Banner`,
          productId: col.slug,
          imageType: "Hero Banner Image",
          imagePath: col.heroImage,
          status: "Missing",
          pageUrl,
          priority: "High",
          details: "Asset does not exist in project's public repository."
        });
      }
    } else {
      totalImagesExpected++;
      issues.push({
        id: `col-hero-${col.slug}-empty`,
        collection: col.title,
        category: "Collection Cover",
        productName: `${col.title} Hero Banner`,
        productId: col.slug,
        imageType: "Hero Banner Image",
        imagePath: "",
        status: "Broken Path",
        pageUrl,
        priority: "High",
        details: "Image field is empty or null."
      });
    }

    // Check Featured Image
    if (col.featuredImage) {
      totalImagesExpected++;
      const exists = fileExistsInPublic(col.featuredImage);
      if (exists) {
        totalImagesFound++;
      } else {
        issues.push({
          id: `col-feat-${col.slug}-missing`,
          collection: col.title,
          category: "Collection Thumbnail",
          productName: `${col.title} Grid Cover`,
          productId: col.slug,
          imageType: "Collection Card Image",
          imagePath: col.featuredImage,
          status: "Missing",
          pageUrl,
          priority: "High",
          details: "Featured grid thumbnail is missing."
        });
      }
    }
  }

  // 2. Audit All Products and Variants
  for (const family of allModelFamilies) {
    const colName = family.brand || "D'Signer";
    const pageUrl = `/product/${family.slug}`;

    for (const variant of family.variants) {
      totalWatches++;
      const sku = variant.sku;
      const gallery = variant.gallery;

      // ── PRIMARY IMAGE CHECK ──
      totalImagesExpected++;
      if (gallery.primary) {
        // Track usage
        if (!imageUsageMap.has(gallery.primary)) {
          imageUsageMap.set(gallery.primary, []);
        }
        imageUsageMap.get(gallery.primary)!.push(sku);

        const exists = fileExistsInPublic(gallery.primary);
        const isPlaceholder = gallery.primary.includes("main-img") || gallery.primary.includes("doublewatch-nobg") || gallery.primary.includes("threeimg");
        
        if (exists) {
          totalImagesFound++;
          if (isPlaceholder) {
            issues.push({
              id: `prod-primary-${sku}-placeholder`,
              collection: colName,
              category: family.category || "Prestige",
              productName: `${family.name} (${variant.dialColor.name} Dial)`,
              productId: sku,
              imageType: "Main Product Image",
              imagePath: gallery.primary,
              status: "Placeholder",
              pageUrl,
              priority: "High",
              details: "Uses default brand landing page mockup image."
            });
          }
        } else {
          issues.push({
            id: `prod-primary-${sku}-missing`,
            collection: colName,
            category: family.category || "Prestige",
            productName: `${family.name} (${variant.dialColor.name} Dial)`,
            productId: sku,
            imageType: "Main Product Image",
            imagePath: gallery.primary,
            status: "Missing",
            pageUrl,
            priority: "High",
            details: `Asset path: ${gallery.primary} is broken or missing.`
          });
        }
      } else {
        issues.push({
          id: `prod-primary-${sku}-empty`,
          collection: colName,
          category: family.category || "Prestige",
          productName: `${family.name} (${variant.dialColor.name} Dial)`,
          productId: sku,
          imageType: "Main Product Image",
          imagePath: "",
          status: "Broken Path",
          pageUrl,
          priority: "High",
          details: "Null or empty primary image attribute."
        });
      }

      // ── HOVER IMAGE CHECK ──
      totalImagesExpected++;
      if (gallery.hover) {
        if (!imageUsageMap.has(gallery.hover)) {
          imageUsageMap.set(gallery.hover, []);
        }
        imageUsageMap.get(gallery.hover)!.push(sku);

        const exists = fileExistsInPublic(gallery.hover);
        if (exists) {
          totalImagesFound++;
        } else {
          issues.push({
            id: `prod-hover-${sku}-missing`,
            collection: colName,
            category: family.category || "Prestige",
            productName: `${family.name} (${variant.dialColor.name} Dial)`,
            productId: sku,
            imageType: "Hover Image",
            imagePath: gallery.hover,
            status: "Missing",
            pageUrl,
            priority: "Low",
            details: "Optional interactive card hover image is missing."
          });
        }
      } else {
        issues.push({
          id: `prod-hover-${sku}-empty`,
          collection: colName,
          category: family.category || "Prestige",
          productName: `${family.name} (${variant.dialColor.name} Dial)`,
          productId: sku,
          imageType: "Hover Image",
          imagePath: "",
          status: "Broken Path",
          pageUrl,
          priority: "Low",
          details: "No hover image path assigned."
        });
      }

      // ── DETAIL GALLERY IMAGES CHECK (Expect up to 4 detail shots) ──
      if (gallery.detail && gallery.detail.length > 0) {
        gallery.detail.forEach((detPath, idx) => {
          totalImagesExpected++;
          const exists = fileExistsInPublic(detPath);
          if (exists) {
            totalImagesFound++;
          } else {
            // Only report if it's the first two detail images (others are optional)
            const prio = idx < 2 ? "Medium" : "Low";
            issues.push({
              id: `prod-detail-${sku}-${idx}-missing`,
              collection: colName,
              category: family.category || "Prestige",
              productName: `${family.name} Detail #${idx + 1}`,
              productId: sku,
              imageType: "Gallery Image",
              imagePath: detPath,
              status: "Missing",
              pageUrl,
              priority: prio,
              details: `Gallery detail frame #${idx + 1} is missing.`
            });
          }
        });
      }
    }
  }

  // 3. Scan for duplicate reference detections
  for (const [imgPath, skus] of imageUsageMap.entries()) {
    if (skus.length > 1 && !imgPath.includes("main-img") && !imgPath.includes("doublewatch")) {
      // Report duplicate references
      skus.forEach(sku => {
        const matchingIssue = issues.find(i => i.productId === sku && i.imagePath === imgPath);
        if (matchingIssue) {
          matchingIssue.status = "Duplicate";
          matchingIssue.details = `Asset is shared across multiple SKUs: ${skus.join(", ")}.`;
        } else {
          const family = allModelFamilies.find(f => f.variants.some(v => v.sku === sku));
          issues.push({
            id: `prod-duplicate-${sku}-${imgPath.replace(/\//g, "-")}`,
            collection: family?.brand || "D'Signer",
            category: family?.category || "Prestige",
            productName: `${family?.name || "Watch"} (Duplicate Asset Reference)`,
            productId: sku,
            imageType: "Main Product Image",
            imagePath: imgPath,
            status: "Duplicate",
            pageUrl: `/product/${family?.slug || ""}`,
            priority: "Medium",
            details: `Identical product asset path shared by other SKUs: ${skus.filter(s => s !== sku).join(", ")}.`
          });
        }
      });
    }
  }

  // Formulate scan summary metrics
  const totalMissingImages = issues.filter(i => i.status === "Missing" || i.status === "Broken Path").length;
  const completionPercentage = totalImagesExpected > 0 
    ? parseFloat(((totalImagesFound / totalImagesExpected) * 100).toFixed(1))
    : 100;

  const lastScanTimestamp = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }) + " " + new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  const report: AuditReport = {
    summary: {
      totalWatches,
      totalImagesExpected,
      totalImagesFound,
      totalMissingImages,
      completionPercentage,
      lastScanTimestamp
    },
    issues
  };

  setLatestAuditReport(report);
  return report;
}
