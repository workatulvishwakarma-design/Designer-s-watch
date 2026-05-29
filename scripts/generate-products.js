/**
 * ─────────────────────────────────────────────────────────────────
 *  JSON → TypeScript Converter for Designer World Products
 *  Parses designer_world_products_grouped.json and generates:
 *   1. productData.ts — all products with correct model families
 *   2. collectionMap.ts — family-to-collection mapping
 * ─────────────────────────────────────────────────────────────────
 */
const fs = require('fs');
const path = require('path');

// ─── COLLECTION → FAMILY MAPPING (from user spec) ───
const COLLECTION_MAP = {
  grandeur:  ['950','840','830','824','915'],
  eternal:   ['901L'],
  serene:    ['812','855','670'],
  tactix:    ['200','795','804','865'],
  bolt:      ['748','680'],
  pulse:     ['811','823','869','778','792'],
  vortex:    ['837','845','960','450','851'],
  glimmer:   ['828','819','852','860'],
  ignite:    ['841','854'],
  tidemark:  ['808','876'],
  hallmark:  ['862','912','777'],
  echo:      ['905','807','853'],
  quest:     ['802','806','827','836'],
  duetto:    ['856','521'],
  astral:    ['810','726'],
  daymark:   ['809','826','843','867','821'],
  axion:     ['814'],
  matrix:    ['916'],
  spectre:   ['825'],
  oasis:     ['800'],
  breeze:    ['788','794'],
  mist:      ['834','835'],
  bondline:  ['820G','850L'],
  pinnacle:  ['234','181','314','724','578'],
};

// Build reverse map: family → collection
const FAMILY_TO_COLLECTION = {};
for (const [collection, families] of Object.entries(COLLECTION_MAP)) {
  for (const family of families) {
    FAMILY_TO_COLLECTION[family] = collection;
  }
}

// ─── DIAL COLOUR → HEX MAPPING ───
const COLOUR_HEX = {
  'green': '#2E5A3C', 'silver': '#C0C0C0', 'black': '#1A1918', 'blue': '#1E3A5F',
  'gold': '#C5A55A', 'brown': '#8B6914', 'grey': '#808080', 'gray': '#808080',
  'white': '#F5F5F0', 'rose': '#B76E79', 'rose gold': '#B76E79', 'pink': '#E8A0B5',
  'red': '#B22222', 'navy': '#1B2A4A', 'cream': '#FFFDD0', 'champagne': '#F7E7CE',
  'burgundy': '#800020', 'teal': '#008080', 'maroon': '#800000', 'purple': '#6A0DAD',
  'copper': '#B87333', 'bronze': '#CD7F32', 'gunmetal': '#2C3539', 'wine': '#722F37',
  'olive': '#556B2F', 'ivory': '#FFFFF0', 'mother of pearl': '#F0EBE3',
  'white mop': '#F0EBE3', 'mop': '#F0EBE3', 'charcoal': '#36454F',
};

function getHex(colourStr) {
  if (!colourStr) return '#808080';
  const lower = colourStr.toLowerCase().trim();
  if (COLOUR_HEX[lower]) return COLOUR_HEX[lower];
  // partial match
  for (const [key, hex] of Object.entries(COLOUR_HEX)) {
    if (lower.includes(key)) return hex;
  }
  return '#808080';
}

// ─── EXTRACT MODEL FAMILY FROM MODEL NUMBER ───
function extractFamily(modelNo) {
  if (!modelNo) return null;
  // Handle special cases like "901LGM.5G" → "901L", "820GFS.16G" → "820G" etc.
  // Strategy: extract leading digits + optional trailing letter that forms a known family
  
  // First try: check all known families from longest to shortest
  const knownFamilies = Object.keys(FAMILY_TO_COLLECTION).sort((a, b) => b.length - a.length);
  for (const fam of knownFamilies) {
    if (modelNo.startsWith(fam)) return fam;
  }
  
  // Fallback: extract numeric prefix
  const match = modelNo.match(/^(\d+)/);
  return match ? match[1] : null;
}

// ─── NORMALIZE GENDER ───
function normalizeGender(g) {
  if (!g) return 'Unisex';
  const lower = g.toLowerCase().trim();
  if (lower === 'men' || lower === 'male' || lower === 'gents') return 'Men';
  if (lower === 'women' || lower === 'female' || lower === 'ladies') return 'Women';
  return 'Unisex';
}

// ─── STRAP COLOUR → METAL FINISH MAPPING ───
function getStrapFinish(strapColour) {
  if (!strapColour) return 'Silver';
  const lower = strapColour.toLowerCase();
  if (lower.includes('rose gold two tone') || lower.includes('rose gold & silver')) return 'Rose Two-Tone';
  if (lower.includes('gold two tone') || lower.includes('gold & silver')) return 'Two-Tone';
  if (lower.includes('rose gold') || lower.includes('rose')) return 'Rose Gold';
  if (lower.includes('gold')) return 'Gold';
  if (lower.includes('black') || lower.includes('gun')) return 'Black';
  if (lower.includes('silver') || lower.includes('steel')) return 'Silver';
  if (lower.includes('brown')) return 'Brown';
  if (lower.includes('blue')) return 'Blue';
  if (lower.includes('green')) return 'Green';
  return strapColour;
}

// ─── MAIN ───
function main() {
  console.log('Reading JSON...');
  const raw = JSON.parse(fs.readFileSync(
    path.join(__dirname, '..', 'src', 'designer_world_products_grouped.json'), 'utf8'
  ));
  
  const allItems = [];
  for (const [key, items] of Object.entries(raw)) {
    if (key === 'Image') continue; // skip header row
    for (const item of items) {
      if (!item.column_1 || item.column_1 === 'Model No') continue; // skip headers/nulls
      allItems.push(item);
    }
  }
  
  console.log(`Found ${allItems.length} raw product entries (before filtering nulls)`);
  
  // Group by model family
  const familyGroups = {};
  let skipped = 0;
  
  for (const item of allItems) {
    const modelNo = item.column_1;
    const family = extractFamily(modelNo);
    if (!family) { skipped++; continue; }
    if (!familyGroups[family]) familyGroups[family] = [];
    familyGroups[family].push(item);
  }
  
  console.log(`Grouped into ${Object.keys(familyGroups).length} model families, skipped ${skipped}`);
  
  // Generate product array
  const products = [];
  let id = 1;
  
  const sortedFamilies = Object.keys(familyGroups).sort((a, b) => 
    a.localeCompare(b, undefined, { numeric: true })
  );
  
  for (const family of sortedFamilies) {
    const variants = familyGroups[family];
    const collection = FAMILY_TO_COLLECTION[family] || null;
    
    for (const v of variants) {
      const modelNo = v.column_1;
      const ean = v.column_2;
      const mrp = v.column_3;
      const styleId = v.column_4;
      const dialColour = v.column_5;
      const strapColour = v.column_6;
      const dialSize = v.column_7;
      const caseSize = v.column_8;
      const bandSize = v.column_9;
      const thickness = v.column_10;
      const strapLength = v.column_11;
      const weight = v.column_12;
      const shape = v.column_13;
      const strapMaterial = v.column_14;
      const watchType = v.column_15;
      const gender = normalizeGender(v.column_16);
      const caseMaterial = v.column_17;
      const functionality = v.column_18;
      const movement = v.column_19;
      const description = v.column_20;
      const waterResistance = v.column_21;
      const closure = v.column_22;
      const glassMaterial = v.column_23;
      
      if (!modelNo || !mrp) continue; // skip truly empty rows
      
      const slug = `dsigner-${modelNo.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/(^-|-$)/g, '')}`;
      
      products.push({
        id: id++,
        slug,
        modelNumber: modelNo,
        modelFamily: family,
        collection: collection,
        name: modelNo,
        ean: ean ? String(Math.floor(ean)) : null,
        price: mrp,
        mrp: mrp,
        brand: "D'SIGNER",
        gender,
        dialColour: dialColour || null,
        strapColour: strapColour || null,
        dialSize: dialSize ? String(dialSize) : null,
        caseSize: caseSize ? String(caseSize) : null,
        bandSize: bandSize ? String(bandSize) : null,
        thickness: thickness ? String(thickness) : null,
        strapLength: strapLength ? String(strapLength) : null,
        weight: weight ? String(weight) : null,
        shape: shape || 'Round',
        strapMaterial: strapMaterial || null,
        watchType: watchType || 'Analogue',
        caseMaterial: caseMaterial || 'Stainless steel',
        functionality: functionality || null,
        movement: movement || 'Quartz',
        description: description ? description.replace(/\n/g, ' ').trim() : '',
        waterResistance: waterResistance || '30 m',
        closure: closure || null,
        glassMaterial: glassMaterial || 'Mineral Glass',
        colourHex: getHex(dialColour),
      });
    }
  }
  
  console.log(`Generated ${products.length} valid products across ${Object.keys(familyGroups).length} families`);
  
  // Stats
  const collectionCounts = {};
  const uncollected = [];
  for (const p of products) {
    if (p.collection) {
      collectionCounts[p.collection] = (collectionCounts[p.collection] || 0) + 1;
    } else {
      if (!uncollected.includes(p.modelFamily)) uncollected.push(p.modelFamily);
    }
  }
  
  console.log('\nCollection breakdown:');
  for (const [col, count] of Object.entries(collectionCounts).sort((a,b) => b[1] - a[1])) {
    console.log(`  ${col}: ${count} variants`);
  }
  if (uncollected.length > 0) {
    console.log(`\nFamilies NOT in any collection (${uncollected.length}): ${uncollected.join(', ')}`);
  }
  
  // ─── GENERATE productData.ts ───
  let ts = `// ═══════════════════════════════════════════════════════════════════
//  AUTO-GENERATED from designer_world_products_grouped.json
//  ${products.length} products across ${Object.keys(familyGroups).length} model families
//  Generated: ${new Date().toISOString()}
// ═══════════════════════════════════════════════════════════════════

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface ProductSpecs {
  movement: string;
  strap: string;
  waterResistance: string;
  caseMaterial: string;
  glass: string;
  warranty: string;
  functionality?: string;
  dialSize?: string;
  caseSize?: string;
  bandSize?: string;
  thickness?: string;
  weight?: string;
  shape?: string;
  closure?: string;
}

export interface Product {
  slug: string;
  id: number;
  name: string;
  modelNumber: string;
  modelFamily: string;
  collection: string | null;
  ean: string | null;
  price: number;
  mrp: number;
  brand: string;
  category: string;
  gender: "Men" | "Women" | "Unisex";
  badge?: string | null;
  tags?: string[];
  description: string;
  primaryImage?: string;
  hoverImage?: string;
  images: string[];
  galleryImages?: string[];
  colors: ProductColor[];
  specs: ProductSpecs;
  sizes: string[];
}

`;

  // Build image registry from filesystem
  const imageBasePaths = ['model-1', 'model-2'];
  const imageRegistry = {}; // family -> [image paths]
  
  for (const base of imageBasePaths) {
    const baseDir = path.join(__dirname, '..', 'public', 'images', 'new-img', base);
    if (!fs.existsSync(baseDir)) continue;
    const familyDirs = fs.readdirSync(baseDir);
    for (const famDir of familyDirs) {
      const famPath = path.join(baseDir, famDir);
      if (!fs.statSync(famPath).isDirectory()) continue;
      const famKey = famDir.replace(/\s+leather$/i, '').trim();
      if (!imageRegistry[famKey]) imageRegistry[famKey] = [];
      // Recursively find all png/jpg files
      findImages(famPath, `/images/new-img/${base}/${famDir}`, imageRegistry[famKey]);
    }
  }
  
  console.log(`\nImage registry: ${Object.keys(imageRegistry).length} families with images`);
  
  // Group products by family for generating grouped data
  const familyProducts = {};
  for (const p of products) {
    if (!familyProducts[p.modelFamily]) familyProducts[p.modelFamily] = [];
    familyProducts[p.modelFamily].push(p);
  }
  
  // Generate the product entries
  ts += `const allProductsRaw: Product[] = [\n`;
  
  for (const family of sortedFamilies) {
    const variants = familyProducts[family];
    if (!variants || variants.length === 0) continue;
    
    const collection = FAMILY_TO_COLLECTION[family] || null;
    const images = imageRegistry[family] || [];
    
    ts += `  // ─── Family ${family}${collection ? ` (${collection.toUpperCase()})` : ''} — ${variants.length} variants ───\n`;
    
    for (const p of variants) {
      // Match images by model number prefix
      const matchedImages = findMatchingImages(images, p.modelNumber);
      const primaryImage = matchedImages[0] || null;
      const hoverImage = matchedImages[1] || null;
      
      const specs = {
        movement: p.movement || 'Quartz',
        strap: p.strapMaterial || 'Stainless Steel',
        waterResistance: p.waterResistance || '30 m',
        caseMaterial: p.caseMaterial || 'Stainless steel',
        glass: p.glassMaterial || 'Mineral Glass',
        warranty: '2 Years',
      };
      if (p.functionality) specs.functionality = p.functionality;
      if (p.dialSize) specs.dialSize = p.dialSize + (String(p.dialSize).includes('mm') ? '' : 'mm');
      if (p.caseSize) specs.caseSize = String(p.caseSize).includes('MM') || String(p.caseSize).includes('mm') ? String(p.caseSize) : p.caseSize + 'mm';
      if (p.bandSize) specs.bandSize = String(p.bandSize);
      if (p.thickness) specs.thickness = String(p.thickness).includes('MM') || String(p.thickness).includes('mm') ? String(p.thickness) : p.thickness + 'mm';
      if (p.weight) specs.weight = String(p.weight).includes('G') || String(p.weight).includes('g') ? String(p.weight) : p.weight + 'g';
      if (p.shape) specs.shape = p.shape;
      if (p.closure) specs.closure = p.closure;
      
      const category = p.functionality ? 
        (p.functionality.toLowerCase().includes('chronograph') ? 'Chronograph' : 
         p.functionality.toLowerCase().includes('multi') ? 'Multifunction' : 'Classic') : 'Classic';

      ts += `  {\n`;
      ts += `    slug: ${JSON.stringify(p.slug)},\n`;
      ts += `    id: ${p.id},\n`;
      ts += `    name: ${JSON.stringify(p.name)},\n`;
      ts += `    modelNumber: ${JSON.stringify(p.modelNumber)},\n`;
      ts += `    modelFamily: ${JSON.stringify(p.modelFamily)},\n`;
      ts += `    collection: ${collection ? JSON.stringify(collection) : 'null'},\n`;
      ts += `    ean: ${p.ean ? JSON.stringify(p.ean) : 'null'},\n`;
      ts += `    price: ${p.price},\n`;
      ts += `    mrp: ${p.mrp},\n`;
      ts += `    brand: "D'SIGNER",\n`;
      ts += `    category: ${JSON.stringify(category)},\n`;
      ts += `    gender: ${JSON.stringify(p.gender)},\n`;
      ts += `    badge: null,\n`;
      ts += `    tags: [],\n`;
      ts += `    description: ${JSON.stringify(p.description)},\n`;
      if (primaryImage) ts += `    primaryImage: ${JSON.stringify(primaryImage)},\n`;
      if (hoverImage) ts += `    hoverImage: ${JSON.stringify(hoverImage)},\n`;
      ts += `    images: ${JSON.stringify(matchedImages.slice(0, 4))},\n`;
      ts += `    colors: [{ name: ${JSON.stringify(p.dialColour || 'Default')}, hex: ${JSON.stringify(p.colourHex)}, image: ${JSON.stringify(primaryImage || '')} }],\n`;
      ts += `    specs: ${JSON.stringify(specs)},\n`;
      ts += `    sizes: [${p.caseSize ? JSON.stringify(String(p.caseSize).replace(/MM$/i, 'mm')) : '"42mm"'}],\n`;
      ts += `  },\n`;
    }
  }
  
  ts += `];\n\n`;
  
  // Export helpers
  ts += `export const allProducts: Product[] = allProductsRaw;\n\n`;
  ts += `export function getProductBySlug(slug: string): Product | undefined {\n`;
  ts += `  return allProducts.find((p) => p.slug === slug);\n`;
  ts += `}\n\n`;
  ts += `export function getRelatedProducts(product: Product, count = 4): Product[] {\n`;
  ts += `  return allProducts\n`;
  ts += `    .filter((p) => p.slug !== product.slug && p.brand === product.brand)\n`;
  ts += `    .slice(0, count);\n`;
  ts += `}\n\n`;
  ts += `export function getProductsByFamily(family: string): Product[] {\n`;
  ts += `  return allProducts.filter((p) => p.modelFamily === family);\n`;
  ts += `}\n\n`;
  ts += `export function getProductsByCollection(collectionSlug: string): Product[] {\n`;
  ts += `  return allProducts.filter((p) => p.collection === collectionSlug);\n`;
  ts += `}\n\n`;
  ts += `export function generateSlug(brand: string, name: string): string {\n`;
  ts += `  return \`\${brand}-\${name}\`\n`;
  ts += `    .toLowerCase()\n`;
  ts += `    .replace(/[']/g, "")\n`;
  ts += `    .replace(/[^a-z0-9]+/g, "-")\n`;
  ts += `    .replace(/(^-|-$)/g, "");\n`;
  ts += `}\n`;
  
  const outPath = path.join(__dirname, '..', 'src', 'data', 'productData.ts');
  fs.writeFileSync(outPath, ts);
  console.log(`\n✅ Written ${outPath}`);
  console.log(`   ${products.length} products, ${Object.keys(familyGroups).length} families`);
}

// ─── Helper: recursively find image files ───
function findImages(dir, urlPrefix, results) {
  try {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        findImages(fullPath, `${urlPrefix}/${entry}`, results);
      } else if (/\.(png|jpg|jpeg|webp)$/i.test(entry)) {
        // URL-encode spaces in path
        const encodedUrl = `${urlPrefix}/${entry}`.replace(/ /g, '%20');
        results.push(encodedUrl);
      }
    }
  } catch (e) {
    // ignore
  }
}

// ─── Helper: match images to a specific model variant ───
function findMatchingImages(allFamilyImages, modelNumber) {
  if (!allFamilyImages || allFamilyImages.length === 0) return [];
  
  // Extract the variant prefix (e.g. "748GM" from "748GM.16G")
  const dotIdx = modelNumber.indexOf('.');
  const variantPrefix = dotIdx > 0 ? modelNumber.substring(0, dotIdx) : modelNumber;
  
  // Try exact variant match first
  const exactMatches = allFamilyImages.filter(img => {
    const basename = path.basename(img).toLowerCase();
    return basename.startsWith(variantPrefix.toLowerCase());
  });
  
  if (exactMatches.length > 0) return exactMatches.slice(0, 4);
  
  // Fallback: return any family images
  return allFamilyImages.slice(0, 4);
}

main();
