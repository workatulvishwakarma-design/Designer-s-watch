const { readFileSync } = require('fs');

const raw = JSON.parse(readFileSync('./src/designer_world_products_grouped.json', 'utf8'));
const keys = Object.keys(raw);
console.log('Top-level keys:', keys.length);
console.log('---');

let totalProducts = 0;
const familyMap = {};

for (const key of keys) {
  const items = raw[key];
  totalProducts += items.length;
  console.log('  "' + key + '": ' + items.length + ' items');
  
  for (const item of items) {
    const modelNo = item.column_1;
    if (!modelNo || modelNo === 'Model No') continue;
    const match = modelNo.match(/^(\d+[A-Z]?)/i);
    if (match) {
      const family = match[1];
      if (!familyMap[family]) familyMap[family] = [];
      familyMap[family].push(modelNo);
    }
  }
}

console.log('\nTotal products:', totalProducts);
console.log('\nModel families detected:', Object.keys(familyMap).length);
console.log('\nFamily breakdown:');
const sortedFamilies = Object.entries(familyMap).sort((a, b) => a[0].localeCompare(b[0], undefined, {numeric: true}));
for (const [family, models] of sortedFamilies) {
  console.log('  ' + family + ': ' + models.length + ' variants - ' + models.slice(0, 4).join(', ') + (models.length > 4 ? '...' : ''));
}
