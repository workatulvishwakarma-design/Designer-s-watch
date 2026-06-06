// ─────────────────────────────────────────────────────────
//  COLLECTION MAP — Family ID → Collection Slug
//  
//  IMPORTANT: This map MUST match the modelFamilies arrays
//  defined in collections.ts. Each family belongs to exactly
//  one collection. Do NOT merge families into other slugs.
// ─────────────────────────────────────────────────────────

export const COLLECTION_MAP: Record<string, string> = {
  // GRANDEUR — "Splendor and impressiveness"
  "950": "grandeur",
  "840": "grandeur",
  "830": "grandeur",
  "824": "grandeur",
  "915": "grandeur",

  // ETERNAL — "Timeless elegance"
  "901L": "eternal",
  "901": "eternal",

  // SERENE — "Calm, peaceful, balanced" (Women's)
  "812": "serene",
  "855": "serene",
  "670": "serene",

  // TACTIX — "Tactical precision" (Men's)
  "200": "tactix",
  "795": "tactix",
  "804": "tactix",
  "865": "tactix",

  // BOLT — "Fast energy, lightning" (Men's)
  "748": "bolt",
  "680": "bolt",

  // PULSE — "Rhythmic movement" (Unisex)
  "811": "pulse",
  "823": "pulse",
  "869": "pulse",
  "778": "pulse",
  "792": "pulse",

  // VORTEX — "Powerful rotational force" (Men's)
  "837": "vortex",
  "845": "vortex",
  "960": "vortex",
  "450": "vortex",
  "851": "vortex",

  // GLIMMER — "Soft shimmering luxury" (Women's)
  "828": "glimmer",
  "819": "glimmer",
  "852": "glimmer",
  "860": "glimmer",

  // IGNITE — "Energy, fire, confidence" (Men's)
  "841": "ignite",
  "854": "ignite",

  // TIDEMARK — "Ocean-inspired movement" (Men's)
  "808": "tidemark",
  "876": "tidemark",

  // HALLMARK — "Mark of quality, authenticity" (Unisex)
  "862": "hallmark",
  "912": "hallmark",
  "777": "hallmark",

  // ECHO — "Reflection, resonance" (Unisex)
  "905": "echo",
  "807": "echo",
  "853": "echo",

  // QUEST — "Journey, exploration" (Men's)
  "802": "quest",
  "806": "quest",
  "827": "quest",
  "836": "quest",

  // DUETTO — "Harmony between dual identities" (Unisex)
  "856": "duetto",
  "521": "duetto",

  // ASTRAL — "Celestial inspiration" (Unisex)
  "810": "astral",
  "726": "astral",

  // DAYMARK — "Guidance, navigation" (Men's)
  "809": "daymark",
  "826": "daymark",
  "843": "daymark",
  "867": "daymark",
  "821": "daymark",

  // AXION — "Futuristic scientific energy" (Men's)
  "814": "axion",

  // MATRIX — "Structured systems, precision" (Men's)
  "916": "matrix",

  // SPECTRE — "Mystery, shadow" (Men's)
  "825": "spectre",

  // OASIS — "Calm elegance" (Women's)
  "800": "oasis",

  // BREEZE — "Light movement" (Women's)
  "788": "breeze",
  "794": "breeze",

  // MIST — "Atmospheric softness" (Women's)
  "834": "mist",
  "835": "mist",

  // BONDLINE — "Precision connection" (Unisex)
  "820G": "bondline",
  "820": "bondline",
  "850L": "bondline",
  "850": "bondline",

  // PINNACLE — "Highest level of achievement" (Men's)
  "234": "pinnacle",
  "181": "pinnacle",
  "314": "pinnacle",
  "724": "pinnacle",
  "578": "pinnacle",

  // ═══════════════════════════════════════════════════
  //  ESCORT BRAND — Everyday Excellence
  // ═══════════════════════════════════════════════════

  // ESCORT WOMEN'S — Bracelet & Leather
  "7779": "escort",
  "7806": "escort",
  "E-7914": "escort",
  "E-7931": "escort",

  // ESCORT MEN'S — Metal Bracelet
  "A-1589": "escort",
  "E-7751": "escort",

  // ESCORT UNISEX — Leather
  "E-7908": "escort",
};

export function getCollectionForFamily(familyId: string): string | null {
  return COLLECTION_MAP[familyId] || null;
}
