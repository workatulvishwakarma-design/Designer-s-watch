const d = require('./src/designer_world_products_grouped.json');
const keys = Object.keys(d);
console.log('Sheet keys:', keys.length);
keys.forEach(k => console.log(' -', k, Array.isArray(d[k]) ? d[k].length + ' rows' : typeof d[k]));

// Extract all unique model numbers
const allModels = new Set();
const familyGroups = {};
for (const [key, arr] of Object.entries(d)) {
  if (key === 'Image' || !Array.isArray(arr)) continue;
  for (const item of arr) {
    if (!item.column_1 || item.column_1 === 'Model No') continue;
    const model = item.column_1;
    allModels.add(model);
    
    // Extract family prefix
    const match = model.match(/^([A-Z0-9]+)/i);
    if (match) {
      // Try to find the numeric family
      const numMatch = model.match(/^(\d+)/);
      const family = numMatch ? numMatch[1] : match[1];
      if (!familyGroups[family]) familyGroups[family] = [];
      familyGroups[family].push(model);
    }
  }
}

console.log('\nTotal unique model numbers:', allModels.size);
console.log('Total family groups:', Object.keys(familyGroups).length);

// Show all family IDs sorted
const families = Object.keys(familyGroups).sort((a,b) => {
  const na = parseInt(a), nb = parseInt(b);
  if (!isNaN(na) && !isNaN(nb)) return na - nb;
  return a.localeCompare(b);
});
console.log('\nAll family IDs with counts:');
families.forEach(f => console.log(`  ${f}: ${familyGroups[f].length} variants`));

// Check the COLLECTION_MAP coverage
const collectionMap = {
  "950":"grandeur","840":"grandeur","830":"grandeur","824":"grandeur","915":"grandeur",
  "901L":"eternal","812":"serene","855":"serene","670":"serene",
  "200":"tactix","795":"tactix","804":"tactix","865":"tactix",
  "748":"bolt","680":"bolt","811":"pulse","823":"pulse","869":"pulse","778":"pulse","792":"pulse",
  "837":"vortex","845":"vortex","960":"vortex","450":"vortex","851":"vortex",
  "828":"glimmer","819":"glimmer","852":"glimmer","860":"glimmer",
  "841":"ignite","854":"ignite","808":"tidemark","876":"tidemark",
  "862":"hallmark","912":"hallmark","777":"hallmark",
  "905":"echo","807":"echo","853":"echo",
  "802":"quest","806":"quest","827":"quest","836":"quest",
  "856":"duetto","521":"duetto","810":"astral","726":"astral",
  "809":"daymark","826":"daymark","843":"daymark","867":"daymark","821":"daymark",
  "814":"axion","916":"matrix","825":"spectre","800":"oasis",
  "788":"breeze","794":"breeze","834":"mist","835":"mist",
  "820G":"bondline","850L":"bondline",
  "234":"pinnacle","181":"pinnacle","314":"pinnacle","724":"pinnacle","578":"pinnacle"
};

// Check which families from JSON are NOT in the collection map
const unmapped = families.filter(f => !collectionMap[f]);
console.log('\nFamilies NOT in COLLECTION_MAP:', unmapped.length);
unmapped.forEach(f => console.log(`  ${f}: ${familyGroups[f].length} variants - samples: ${familyGroups[f].slice(0,3).join(', ')}`));

// Check which COLLECTION_MAP keys don't have products
const mapKeys = Object.keys(collectionMap);
const orphanMapKeys = mapKeys.filter(k => !familyGroups[k]);
console.log('\nCOLLECTION_MAP keys without products:', orphanMapKeys.length);
orphanMapKeys.forEach(k => console.log(`  ${k} -> ${collectionMap[k]}`));

// Check gender distribution
const genderCount = { Men: 0, Women: 0, null: 0, other: 0 };
for (const [key, arr] of Object.entries(d)) {
  if (key === 'Image' || !Array.isArray(arr)) continue;
  for (const item of arr) {
    if (!item.column_1 || item.column_1 === 'Model No') continue;
    const g = item.column_16;
    if (!g) genderCount.null++;
    else if (g.toLowerCase().includes('men') || g.toLowerCase().includes('gents') || g.toLowerCase().includes('male')) genderCount.Men++;
    else if (g.toLowerCase().includes('women') || g.toLowerCase().includes('ladies') || g.toLowerCase().includes('female')) genderCount.Women++;
    else genderCount.other++;
  }
}
console.log('\nGender distribution:', JSON.stringify(genderCount));
