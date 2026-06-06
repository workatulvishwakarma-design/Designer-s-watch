/**
 * Complete Image Audit Script
 * Scans all product families, checks which SKUs have correct images,
 * which have wrong/cross-matched images, and which are missing entirely.
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const physicalMapPath = path.join(__dirname, '..', 'src', 'data', 'physicalImageMap.json');

// Load the physical image map
const physicalImageMap = JSON.parse(fs.readFileSync(physicalMapPath, 'utf-8'));

// Load the product JSON
const productJsonPath = path.join(__dirname, '..', 'src', 'designer_world_products_grouped.json');
let rawProducts = {};
try {
  rawProducts = JSON.parse(fs.readFileSync(productJsonPath, 'utf-8'));
} catch (e) {
  console.error('Could not load product JSON:', e.message);
}

// Collection map from collectionMap.ts
const COLLECTION_MAP = {
  "950": "grandeur", "840": "grandeur", "830": "grandeur", "824": "grandeur", "915": "grandeur",
  "234": "grandeur", "181": "grandeur", "314": "grandeur", "724": "grandeur", "578": "grandeur",
  "901L": "eternal",
  "812": "serene", "855": "serene", "670": "serene", "800": "serene", "788": "serene",
  "794": "serene", "834": "serene", "835": "serene",
  "748": "bolt", "680": "bolt",
  "837": "vortex", "845": "vortex", "960": "vortex", "450": "vortex", "851": "vortex", "825": "vortex",
  "841": "ignite", "854": "ignite",
  "862": "hallmark", "912": "hallmark", "777": "hallmark",
  "802": "quest", "806": "quest", "827": "quest", "836": "quest", "200": "quest",
  "795": "quest", "804": "quest", "865": "quest", "809": "quest", "826": "quest",
  "843": "quest", "867": "quest", "821": "quest", "814": "quest",
  "811": "pulse", "823": "pulse", "869": "pulse", "778": "pulse", "792": "pulse",
  "810": "pulse", "726": "pulse", "916": "pulse",
  "828": "glimmer", "819": "glimmer", "852": "glimmer", "860": "glimmer",
  "808": "tidemark", "876": "tidemark",
  "905": "echo", "807": "echo", "853": "echo",
  "856": "duetto", "521": "duetto", "820G": "duetto", "850L": "duetto",
};

// KNOWN_FAMILIES sorted by length descending for matching
const KNOWN_FAMILIES = Object.keys(COLLECTION_MAP).sort((a, b) => b.length - a.length);

function extractFamily(modelNo) {
  if (!modelNo) return null;
  const upper = modelNo.toUpperCase();
  for (const fam of KNOWN_FAMILIES) {
    if (upper.startsWith(fam.toUpperCase())) return fam;
  }
  const numMatch = modelNo.match(/^(\d+)/);
  if (numMatch) return numMatch[1];
  return null;
}

// Step 1: Scan all physical image directories to build the CORRECT SKU → image mapping
function scanImageDirectories() {
  const skuImageMap = {};
  
  const dirs = ['model-1', 'model-2'];
  for (const dir of dirs) {
    const dirPath = path.join(publicDir, 'images', 'new-img', dir);
    if (!fs.existsSync(dirPath)) continue;
    
    const modelDirs = fs.readdirSync(dirPath);
    for (const modelDir of modelDirs) {
      const modelPath = path.join(dirPath, modelDir);
      if (!fs.statSync(modelPath).isDirectory()) continue;
      
      // Recursively find all image files
      findImages(modelPath, `/images/new-img/${dir}/${modelDir}`, modelDir, skuImageMap);
    }
  }
  
  // Also scan watches directory
  const watchesDir = path.join(publicDir, 'images', 'watches');
  if (fs.existsSync(watchesDir)) {
    scanRecursive(watchesDir, '/images/watches', skuImageMap);
  }
  
  return skuImageMap;
}

function findImages(dirPath, urlPrefix, familyId, skuImageMap) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const urlPath = `${urlPrefix}/${entry.name}`;
      
      if (entry.isDirectory()) {
        findImages(fullPath, urlPath, familyId, skuImageMap);
      } else if (/\.(png|jpg|jpeg|webp)$/i.test(entry.name)) {
        // Try to extract SKU from the filename
        const baseName = path.basename(entry.name, path.extname(entry.name));
        
        // Check if this is a PNG product image (the main ones)
        if (/^\d{3}[A-Z]/.test(baseName)) {
          if (!skuImageMap[baseName.toUpperCase()]) {
            skuImageMap[baseName.toUpperCase()] = [];
          }
          skuImageMap[baseName.toUpperCase()].push(urlPath);
        }
      }
    }
  } catch (e) {
    // Skip
  }
}

function scanRecursive(dirPath, urlPrefix, skuImageMap) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const urlPath = `${urlPrefix}/${entry.name}`;
      
      if (entry.isDirectory()) {
        scanRecursive(fullPath, urlPath, skuImageMap);
      } else if (/\.(png|jpg|jpeg|webp)$/i.test(entry.name)) {
        const baseName = path.basename(entry.name, path.extname(entry.name));
        if (/^\d{3}[A-Z]/.test(baseName)) {
          if (!skuImageMap[baseName.toUpperCase()]) {
            skuImageMap[baseName.toUpperCase()] = [];
          }
          skuImageMap[baseName.toUpperCase()].push(urlPath);
        }
      }
    }
  } catch (e) {
    // Skip
  }
}

// Step 2: Replicate the EXACT imageResolver logic to see what each SKU actually resolves to
function findPhysicalImagesForSku(sku, familyId) {
  const skuUpper = sku.toUpperCase().trim();
  const famUpper = familyId.toUpperCase().trim();
  
  // 1. Direct exact match
  if (physicalImageMap[skuUpper]) {
    return { images: physicalImageMap[skuUpper], matchType: 'exact' };
  }
  
  // 2. Substring match
  for (const [key, paths] of Object.entries(physicalImageMap)) {
    if (key.includes(skuUpper) || skuUpper.includes(key)) {
      return { images: paths, matchType: `substring:${key}`, matchKey: key };
    }
  }
  
  // 3. Family fallback with color
  const candidates = [];
  let matchKey = null;
  for (const [key, paths] of Object.entries(physicalImageMap)) {
    if (key.length >= 4 && key.includes(famUpper)) {
      const hasColorMatch = 
        (skuUpper.includes("GM") && key.includes("GM")) ||
        (skuUpper.includes("RGM") && key.includes("RGM")) ||
        (skuUpper.includes("RTM") && key.includes("RTM")) ||
        (skuUpper.includes("SM") && key.includes("SM")) ||
        (skuUpper.includes("TM") && key.includes("TM"));
        
      if (hasColorMatch) {
        return { images: paths, matchType: `family-color:${key}`, matchKey: key };
      }
      candidates.push(...paths);
      if (!matchKey) matchKey = key;
    }
  }
  
  if (candidates.length > 0) {
    return { images: candidates, matchType: `family-fallback:${matchKey}`, matchKey };
  }
  
  return { images: [], matchType: 'none' };
}

// Step 3: Extract all product SKUs from the line sheet JSON
function extractAllSkus() {
  const skus = [];
  for (const [key, val] of Object.entries(rawProducts)) {
    if (key === "Image") continue;
    if (!Array.isArray(val)) continue;
    for (const item of val) {
      if (!item || typeof item !== 'object') continue;
      if (!item.column_1 || item.column_1 === "Model No") continue;
      const modelNo = String(item.column_1).trim();
      const mrpRaw = item.column_3;
      const mrp = typeof mrpRaw === 'number' ? mrpRaw : parseFloat(String(mrpRaw || '0'));
      if (!modelNo || !mrp || isNaN(mrp) || mrp <= 0) continue;
      
      const family = extractFamily(modelNo);
      if (!family) continue;
      
      skus.push({
        sku: modelNo,
        family,
        collection: COLLECTION_MAP[family] || 'unmapped',
      });
    }
  }
  return skus;
}

// Step 4: Check if image file actually exists
function imageFileExists(urlPath) {
  const filePath = path.join(publicDir, decodeURIComponent(urlPath));
  return fs.existsSync(filePath);
}

// Step 5: Check if an image path belongs to the right model family
function imageMatchesFamily(imagePath, familyId) {
  const pathUpper = imagePath.toUpperCase();
  const famUpper = familyId.toUpperCase();
  
  // Check if the path contains the family number in a meaningful way
  // e.g., /model-1/819/ or /model-2/819/ or filename starts with 819
  const pathParts = imagePath.split('/');
  for (const part of pathParts) {
    if (part === famUpper || part.startsWith(famUpper)) return true;
  }
  
  // Check filename
  const filename = pathParts[pathParts.length - 1].toUpperCase();
  if (filename.startsWith(famUpper)) return true;
  
  return false;
}

// ========================
// RUN THE AUDIT
// ========================

console.log('=== DESIGNER WORLD IMAGE AUDIT ===\n');

const allSkus = extractAllSkus();
console.log(`Total SKUs in product data: ${allSkus.length}`);

// Group by family
const familyGroups = {};
for (const s of allSkus) {
  if (!familyGroups[s.family]) familyGroups[s.family] = [];
  familyGroups[s.family].push(s);
}
console.log(`Total model families: ${Object.keys(familyGroups).length}\n`);

// Audit each family
const correctFamilies = [];
const wrongImageFamilies = [];
const missingImageFamilies = [];
const skuDetails = [];

for (const [familyId, skus] of Object.entries(familyGroups).sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))) {
  const collection = COLLECTION_MAP[familyId] || 'unmapped';
  
  // Check image resolution for first SKU (represents the family card)
  const firstSku = skus[0];
  const resolution = findPhysicalImagesForSku(firstSku.sku, familyId);
  
  if (resolution.images.length === 0) {
    missingImageFamilies.push({
      familyId,
      collection,
      skuCount: skus.length,
      sampleSku: firstSku.sku,
      issue: 'No images found at all',
    });
  } else {
    const primaryImage = resolution.images[0];
    const matchesCorrectFamily = imageMatchesFamily(primaryImage, familyId);
    const fileExists = imageFileExists(primaryImage);
    
    if (!matchesCorrectFamily) {
      wrongImageFamilies.push({
        familyId,
        collection,
        skuCount: skus.length,
        sampleSku: firstSku.sku,
        matchType: resolution.matchType,
        matchKey: resolution.matchKey || '',
        resolvedImage: primaryImage,
        imageExists: fileExists,
        issue: `Image belongs to different model. Match type: ${resolution.matchType}`,
      });
    } else if (!fileExists) {
      missingImageFamilies.push({
        familyId,
        collection,
        skuCount: skus.length,
        sampleSku: firstSku.sku,
        resolvedImage: primaryImage,
        issue: 'Image path resolved but file does not exist on disk',
      });
    } else {
      correctFamilies.push({
        familyId,
        collection,
        skuCount: skus.length,
        matchType: resolution.matchType,
        primaryImage,
      });
    }
  }
  
  // Check each individual SKU
  for (const s of skus) {
    const res = findPhysicalImagesForSku(s.sku, s.family);
    const correct = res.images.length > 0 && imageMatchesFamily(res.images[0], s.family);
    const exists = res.images.length > 0 ? imageFileExists(res.images[0]) : false;
    
    skuDetails.push({
      sku: s.sku,
      family: s.family,
      collection: s.collection,
      hasImage: res.images.length > 0,
      imageCorrect: correct,
      imageExists: exists,
      matchType: res.matchType,
      primaryImage: res.images[0] || 'NONE',
    });
  }
}

// Print results
console.log('=== FAMILIES WITH CORRECT IMAGES ===');
console.log(`Count: ${correctFamilies.length}`);
for (const f of correctFamilies) {
  console.log(`  ✅ Model ${f.familyId} (${f.collection}) - ${f.skuCount} variants - ${f.matchType}`);
}

console.log('\n=== FAMILIES WITH WRONG/CROSS-MATCHED IMAGES ===');
console.log(`Count: ${wrongImageFamilies.length}`);
for (const f of wrongImageFamilies) {
  console.log(`  ❌ Model ${f.familyId} (${f.collection}) - ${f.skuCount} variants`);
  console.log(`     SKU: ${f.sampleSku} → Resolved: ${f.resolvedImage}`);
  console.log(`     Match: ${f.matchType} | File exists: ${f.imageExists}`);
}

console.log('\n=== FAMILIES WITH MISSING IMAGES ===');
console.log(`Count: ${missingImageFamilies.length}`);
for (const f of missingImageFamilies) {
  console.log(`  ⚠️  Model ${f.familyId} (${f.collection}) - ${f.skuCount} variants`);
  console.log(`     Issue: ${f.issue}`);
  if (f.resolvedImage) console.log(`     Path: ${f.resolvedImage}`);
}

// Summary stats
const totalSkuCorrect = skuDetails.filter(s => s.imageCorrect && s.imageExists).length;
const totalSkuWrong = skuDetails.filter(s => s.hasImage && !s.imageCorrect).length;
const totalSkuMissing = skuDetails.filter(s => !s.hasImage).length;
const totalSkuBroken = skuDetails.filter(s => s.hasImage && !s.imageExists).length;

console.log('\n=== SUMMARY ===');
console.log(`Families - Correct: ${correctFamilies.length} | Wrong Image: ${wrongImageFamilies.length} | Missing: ${missingImageFamilies.length}`);
console.log(`SKUs     - Correct: ${totalSkuCorrect} | Wrong Image: ${totalSkuWrong} | Missing: ${totalSkuMissing} | Broken Path: ${totalSkuBroken}`);

// Now let's check what image directories exist on disk
console.log('\n=== PHYSICAL IMAGE DIRECTORIES ON DISK ===');
const model1Dir = path.join(publicDir, 'images', 'new-img', 'model-1');
const model2Dir = path.join(publicDir, 'images', 'new-img', 'model-2');

if (fs.existsSync(model1Dir)) {
  const m1Dirs = fs.readdirSync(model1Dir).filter(d => fs.statSync(path.join(model1Dir, d)).isDirectory());
  console.log(`model-1 directories: ${m1Dirs.join(', ')}`);
}
if (fs.existsSync(model2Dir)) {
  const m2Dirs = fs.readdirSync(model2Dir).filter(d => fs.statSync(path.join(model2Dir, d)).isDirectory());
  console.log(`model-2 directories: ${m2Dirs.join(', ')}`);
}

// Check which image directories DON'T correspond to any product family
const allFamilyIds = new Set(Object.keys(familyGroups));
const model1Dirs = fs.existsSync(model1Dir) ? fs.readdirSync(model1Dir).filter(d => fs.statSync(path.join(model1Dir, d)).isDirectory()) : [];
const model2Dirs = fs.existsSync(model2Dir) ? fs.readdirSync(model2Dir).filter(d => fs.statSync(path.join(model2Dir, d)).isDirectory()) : [];
const allImageDirs = new Set([...model1Dirs, ...model2Dirs]);

console.log('\nImage dirs NOT in product data:', [...allImageDirs].filter(d => !allFamilyIds.has(d)).join(', '));
console.log('Product families without image dir:', [...allFamilyIds].filter(f => !allImageDirs.has(f)).join(', '));

// Dump wrong-image families JSON for fixing
const fixData = wrongImageFamilies.map(f => ({
  familyId: f.familyId,
  collection: f.collection,
  sampleSku: f.sampleSku,
  currentResolvedImage: f.resolvedImage,
  matchType: f.matchType,
}));

fs.writeFileSync(path.join(__dirname, 'audit-wrong-images.json'), JSON.stringify(fixData, null, 2));
fs.writeFileSync(path.join(__dirname, 'audit-missing-images.json'), JSON.stringify(missingImageFamilies, null, 2));
console.log('\nWrote audit-wrong-images.json and audit-missing-images.json');
