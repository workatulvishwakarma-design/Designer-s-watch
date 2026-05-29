import fs from 'fs';
import path from 'path';
import d from '../src/designer_world_products_grouped.json';
import { FAMILIES_WITH_IMAGES } from '../src/lib/imageResolver';

const allFamilies = new Set<string>();
const familyGroups: Record<string, string[]> = {};
const allVariants: any[] = [];

for (const [key, arr] of Object.entries(d)) {
  if (key === 'Image' || !Array.isArray(arr)) continue;
  for (const item of arr) {
    if (!item.column_1 || item.column_1 === 'Model No') continue;
    const model = String(item.column_1).trim();
    allVariants.push(item);
    
    // Extract family prefix
    const numMatch = model.match(/^(\d+)/);
    const match = model.match(/^([A-Z0-9]+)/i);
    const family = numMatch ? numMatch[1] : (match ? match[1] : null);
    if (family) {
      allFamilies.add(family);
      if (!familyGroups[family]) familyGroups[family] = [];
      familyGroups[family].push(model);
    }
  }
}

console.log('AUDIT STATISTICS:');
console.log('-----------------');
console.log('Total Variants in JSON:', allVariants.length);
console.log('Total Family Groups in JSON:', allFamilies.size);

const verifiedWithImages = Array.from(allFamilies).filter(f => FAMILIES_WITH_IMAGES.has(f));
const missingImages = Array.from(allFamilies).filter(f => !FAMILIES_WITH_IMAGES.has(f));

console.log('Families with confirmed images on disk (FAMILIES_WITH_IMAGES set):', verifiedWithImages.length);
console.log('Families missing images (no entry in FAMILIES_WITH_IMAGES):', missingImages.length);

console.log('\nLIST OF FAMILIES MISSING IMAGES IN THE SET:');
console.log('-------------------------------------------');
let totalMissingVariants = 0;
missingImages.forEach((f, idx) => {
  const count = familyGroups[f]?.length || 0;
  totalMissingVariants += count;
  console.log(`${idx + 1}. Family "${f}": ${count} variants - samples: ${familyGroups[f]?.slice(0, 3).join(', ')}`);
});

console.log('\nTotal variants affected by missing images in set:', totalMissingVariants);

// Verify filesystem existence of images to see if there are any broken paths in the verified ones
console.log('\nCHECKING PHYSICALLY RESOLVING IMAGES FOR ALL FAMILIES:');
console.log('------------------------------------------------------');

const model1Dir = path.resolve(__dirname, '../public/images/new-img/model-1');
const model2Dir = path.resolve(__dirname, '../public/images/new-img/model-2');

console.log('Model-1 Dir exists:', fs.existsSync(model1Dir));
console.log('Model-2 Dir exists:', fs.existsSync(model2Dir));

let physicallyFound = 0;
let physicallyMissing = 0;
const missingPhysicalFiles: any[] = [];

// For a few sample variants, let's see if we find their files
allVariants.forEach(v => {
  const sku = String(v.column_1).trim();
  const numMatch = sku.match(/^(\d+)/);
  const match = sku.match(/^([A-Z0-9]+)/i);
  const family = numMatch ? numMatch[1] : (match ? match[1] : null);
  if (!family) return;

  const isModel1 = fs.existsSync(path.join(model1Dir, family));
  const isModel2 = fs.existsSync(path.join(model2Dir, family));
  
  let found = false;
  let searchedPaths: string[] = [];

  if (isModel1 || isModel2) {
    const parentDir = isModel1 ? model1Dir : model2Dir;
    const famDir = path.join(parentDir, family);
    
    // Candidates
    const candidates = [
      path.join(famDir, `${sku}.png`),
      path.join(famDir, family, `${sku}.png`),
      path.join(famDir, family, family, `${sku}.png`),
      path.join(famDir, `${family}png`, `${sku}.png`),
      path.join(famDir, `${sku}.jpg`),
    ];
    searchedPaths = candidates;

    for (const c of candidates) {
      if (fs.existsSync(c)) {
        found = true;
        break;
      }
    }
  }

  if (found) {
    physicallyFound++;
  } else {
    physicallyMissing++;
    missingPhysicalFiles.push({ sku, family, searchedPaths: searchedPaths.map(p => path.relative(path.join(__dirname, '..'), p)) });
  }
});

console.log('Total SKUs physically resolved to a file on disk:', physicallyFound);
console.log('Total SKUs physically missing (no file found):', physicallyMissing);
console.log('Physically missing rate:', ((physicallyMissing / allVariants.length) * 100).toFixed(2) + '%');

if (missingPhysicalFiles.length > 0) {
  console.log('\nSample of Physically Missing SKUs (Top 25):');
  console.log('-----------------------------------------');
  missingPhysicalFiles.slice(0, 25).forEach((item, idx) => {
    console.log(`  ${idx+1}. SKU: ${item.sku} (Family: ${item.family}) - Checked paths like: ${item.searchedPaths[0]}`);
  });
}
