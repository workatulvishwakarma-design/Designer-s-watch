const fs = require('fs');

const ls = JSON.parse(fs.readFileSync('public/line_sheet_parsed.json'));
const im = JSON.parse(fs.readFileSync('public/image_map.json'));

const enriched = {};

// Skip first row which is headers
for (let i = 1; i < ls.length; i++) {
  const row = ls[i];
  if (!row || !row.__EMPTY_1) continue;
  
  // Extract base model (e.g. 748GM.16G -> 748)
  const fullModel = row.__EMPTY_1.toString();
  const modelMatch = fullModel.match(/^(\d+)/);
  if (!modelMatch) continue;
  const model = modelMatch[1];
  
  if (!enriched[model]) {
    enriched[model] = {
      modelNumber: model,
      description: row.__EMPTY_20 || '',
      brand: "D'SIGNER", // Assuming mostly D'SIGNER
      category: row.__EMPTY_16 === 'Men' ? 'Men' : row.__EMPTY_16 === 'Women' ? 'Women' : 'Unisex',
      mrp: parseInt(row.__EMPTY_3) || null,
      dialSize: row.__EMPTY_7 || '',
      movement: row.__EMPTY_19 || '',
      strap: row.__EMPTY_14 || '',
      glass: row.__EMPTY_23 || 'Mineral Glass',
      waterResistance: row.__EMPTY_21 || '30 m'
    };
  }
}

fs.writeFileSync('src/data/lineSheetEnrichment.json', JSON.stringify(enriched, null, 2));
console.log('Enrichment generated for ' + Object.keys(enriched).length + ' models.');
