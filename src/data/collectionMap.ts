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
  //  56 model families from ESCORT LINE SHEET 20-04-2026
  // ═══════════════════════════════════════════════════

  // ESCORT MEN'S
  "1890": "escort",
  "7226": "escort",
  "7308": "escort",
  "7359": "escort",
  "7393": "escort",
  "7406": "escort",
  "7426": "escort",
  "7441": "escort",
  "7443": "escort",
  "7444": "escort",
  "7449": "escort",
  "7450": "escort",
  "7455": "escort",
  "7548": "escort",
  "7594": "escort",
  "7689": "escort",
  "7690": "escort",
  "A-1589": "escort",
  "E-7751": "escort",

  // ESCORT WOMEN'S
  "1850": "escort",
  "7154": "escort",
  "7280": "escort",
  "7337": "escort",
  "7395": "escort",
  "7399": "escort",
  "7405": "escort",
  "7409": "escort",
  "7413": "escort",
  "7422": "escort",
  "7428": "escort",
  "7430": "escort",
  "7440": "escort",
  "7447": "escort",
  "7458": "escort",
  "7459": "escort",
  "7461": "escort",
  "7463": "escort",
  "7530": "escort",
  "7533": "escort",
  "7560": "escort",
  "7566": "escort",
  "7567": "escort",
  "7575": "escort",
  "7597": "escort",
  "7598": "escort",
  "7620": "escort",
  "7626": "escort",
  "7627": "escort",
  "7691": "escort",
  "7706": "escort",
  "7724": "escort",
  "7731": "escort",
  "7732": "escort",
  "7733": "escort",
  "7734": "escort",
  "7768": "escort",
  "7776": "escort",
  "7777": "escort",
  "7779": "escort",
  "7781": "escort",
  "7791": "escort",
  "7806": "escort",
  "E-7914": "escort",
  "E-7931": "escort",

  // ESCORT UNISEX
  "E-7908": "escort",
  "1900": "escort",
  "2150": "escort",
};

export function getCollectionForFamily(familyId: string): string | null {
  return COLLECTION_MAP[familyId] || null;
}
