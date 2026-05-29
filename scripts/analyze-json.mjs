import { readFileSync } from 'fs';

const raw = JSON.parse(readFileSync('../src/designer_world_products_grouped.json', 'utf8'));
const keys = Object.keys(raw);
console.log('Top-level keys:', keys.length);
console.log('Keys:', keys.join(', '));
console.log('---');

let totalProducts = 0;
const familyMap = new Map(); // modelNumber prefix -> count

for (const key of keys) {
  const items = raw[key];
  totalProducts += items.length;
  console.log(`  "${key}": ${items.length} items`);
  
  // For "None" key, analyze model families from column_1
  for (const item of items) {
    const modelNo = item.column_1;
    if (!modelNo || modelNo === 'Model No') continue;
    // Extract family: take numeric prefix (e.g. "200GM.16G" -> "200", "901LGM.5G" -> "901L")
    const match = modelNo.match(/^(\d+[A-Z]?)/i);
    if (match) {
      const family = match[1];
      if (!familyMap.has(family)) familyMap.set(family, []);
      familyMap.get(family).push(modelNo);
    }
  }
}

console.log('\nTotal products:', totalProducts);
console.log('\nModel families detected:', familyMap.size);
console.log('\nFamily breakdown:');
const sortedFamilies = [...familyMap.entries()].sort((a, b) => a[0].localeCompare(b[0], undefined, {numeric: true}));
for (const [family, models] of sortedFamilies) {
  console.log(`  ${family}: ${models.length} variants — ${models.slice(0, 5).join(', ')}${models.length > 5 ? '...' : ''}`);
}
