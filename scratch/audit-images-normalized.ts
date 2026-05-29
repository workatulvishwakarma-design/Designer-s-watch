import fs from 'fs';
import path from 'path';
import d from '../src/designer_world_products_grouped.json';

const allVariants: any[] = [];
for (const [key, arr] of Object.entries(d)) {
  if (key === 'Image' || !Array.isArray(arr)) continue;
  for (const item of arr) {
    if (!item.column_1 || item.column_1 === 'Model No') continue;
    allVariants.push(item);
  }
}

const model1Dir = path.resolve(__dirname, '../public/images/new-img/model-1');
const model2Dir = path.resolve(__dirname, '../public/images/new-img/model-2');

function getModelDir(familyId: string): string | null {
  const m1 = ["200","234","314","450","521","578","670","680","724","748","753","777","778","788","792","794","795","800","802","804","806","807","808","809","810","811","812","814","819","820","820G","821","823","824","825","826","827","828","829"];
  const m2 = ["181","830","834","835","836","837","840","841","843","845","850","850L","851","852","853","854","855","856","857","860","862","865","867","869","876","901","901L","905","912","915","916","950","960","962","J905"];
  if (m1.includes(familyId)) return "model-1";
  if (m2.includes(familyId)) return "model-2";
  const base = familyId.replace(/[A-Za-z]+$/, "");
  if (m1.includes(base)) return "model-1";
  if (m2.includes(base)) return "model-2";
  return null;
}

// Normalize SKU for disk matching
// e.g. "670GM.16L" -> "670GM.16.L", "808GM.8.G" (which already has it), "680GL.2G" -> "680GL.2.G"
function normalizeSkuForDisk(sku: string): string {
  // If SKU ends in L or G or U and doesn't have a dot before it
  // e.g., "670GM.16L" matches and captures "670GM.16" and "L"
  const match = sku.match(/^(.*?\.\d+)([LGU])$/i);
  if (match) {
    return `${match[1]}.${match[2].toUpperCase()}`;
  }
  return sku;
}

let resolvedCount = 0;
let missingCount = 0;
const resolvedSamples: any[] = [];
const missingSamples: any[] = [];

allVariants.forEach(v => {
  const sku = String(v.column_1).trim();
  const numMatch = sku.match(/^(\d+)/);
  const match = sku.match(/^([A-Z0-9]+)/i);
  const family = numMatch ? numMatch[1] : (match ? match[1] : null);
  if (!family) return;

  const dir = getModelDir(family);
  if (!dir) {
    missingCount++;
    missingSamples.push({ sku, family, reason: 'Unknown model directory' });
    return;
  }

  const baseDir = dir === 'model-1' ? model1Dir : model2Dir;
  const famDir = path.join(baseDir, family);

  // Original and normalized SKUs
  const normSku = normalizeSkuForDisk(sku);

  // Candidates for resolution on disk
  const candidates = [
    // Normalized check
    path.join(famDir, `${normSku}.png`),
    path.join(famDir, `${normSku}.jpg`),
    path.join(famDir, family, `${normSku}.png`),
    path.join(famDir, family, `${normSku}.jpg`),
    path.join(famDir, `${family}png`, `${normSku}.png`),
    // Original check
    path.join(famDir, `${sku}.png`),
    path.join(famDir, `${sku}.jpg`),
    path.join(famDir, family, `${sku}.png`),
    path.join(famDir, family, `${sku}.jpg`),
    // Special directory name check (sometimes folder has suffixes like _Blue, etc.)
    // Let's see if a folder matching the normalized SKU exists
    path.join(famDir, normSku),
    path.join(famDir, sku),
  ];

  let found = false;
  let resolvedPath = '';

  for (const c of candidates) {
    if (fs.existsSync(c)) {
      found = true;
      resolvedPath = c;
      break;
    }
  }

  // Also check if any folder inside famDir starts with our normSku or sku
  if (!found && fs.existsSync(famDir)) {
    try {
      const contents = fs.readdirSync(famDir);
      for (const item of contents) {
        const itemLower = item.toLowerCase();
        if (itemLower.startsWith(normSku.toLowerCase()) || itemLower.startsWith(sku.toLowerCase())) {
          found = true;
          resolvedPath = path.join(famDir, item);
          break;
        }
      }
    } catch (e) {}
  }

  if (found) {
    resolvedCount++;
    resolvedSamples.push({ sku, normSku, path: path.relative(path.join(__dirname, '..'), resolvedPath) });
  } else {
    missingCount++;
    missingSamples.push({ sku, normSku });
  }
});

console.log('NORMALIZED RESOLUTION REPORT:');
console.log('----------------------------');
console.log('Total Variants audited:', allVariants.length);
console.log('Resolved to files/folders on disk:', resolvedCount);
console.log('Missing on disk:', missingCount);
console.log('Resolution success rate:', ((resolvedCount / allVariants.length) * 100).toFixed(2) + '%');

console.log('\nSample of 15 successfully resolved SKUs:');
resolvedSamples.slice(0, 15).forEach((item, idx) => {
  console.log(`  ${idx+1}. SKU: ${item.sku} (Normalized: ${item.normSku}) -> Found: ${item.path}`);
});

console.log('\nSample of 15 still missing SKUs:');
missingSamples.slice(0, 15).forEach((item, idx) => {
  console.log(`  ${idx+1}. SKU: ${item.sku} (Normalized: ${item.normSku})`);
});
