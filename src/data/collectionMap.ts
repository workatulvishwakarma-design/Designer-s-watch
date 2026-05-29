export const COLLECTION_MAP: Record<string, string> = {
  // GRANDEUR
  "950": "grandeur",
  "840": "grandeur",
  "830": "grandeur",
  "824": "grandeur",
  "915": "grandeur",

  // ETERNAL
  "901L": "eternal",

  // SERENE
  "812": "serene",
  "855": "serene",
  "670": "serene",

  // TACTIX
  "200": "tactix",
  "795": "tactix",
  "804": "tactix",
  "865": "tactix",

  // BOLT
  "748": "bolt",
  "680": "bolt",

  // PULSE
  "811": "pulse",
  "823": "pulse",
  "869": "pulse",
  "778": "pulse",
  "792": "pulse",

  // VORTEX
  "837": "vortex",
  "845": "vortex",
  "960": "vortex",
  "450": "vortex",
  "851": "vortex",

  // GLIMMER
  "828": "glimmer",
  "819": "glimmer",
  "852": "glimmer",
  "860": "glimmer",

  // IGNITE
  "841": "ignite",
  "854": "ignite",

  // TIDEMARK
  "808": "tidemark",
  "876": "tidemark",

  // HALLMARK
  "862": "hallmark",
  "912": "hallmark",
  "777": "hallmark",

  // ECHO
  "905": "echo",
  "807": "echo",
  "853": "echo",

  // QUEST
  "802": "quest",
  "806": "quest",
  "827": "quest",
  "836": "quest",

  // DUETTO
  "856": "duetto",
  "521": "duetto",

  // ASTRAL
  "810": "astral",
  "726": "astral",

  // DAYMARK
  "809": "daymark",
  "826": "daymark",
  "843": "daymark",
  "867": "daymark",
  "821": "daymark",

  // AXION
  "814": "axion",

  // MATRIX
  "916": "matrix",

  // SPECTRE
  "825": "spectre",

  // OASIS
  "800": "oasis",

  // BREEZE
  "788": "breeze",
  "794": "breeze",

  // MIST
  "834": "mist",
  "835": "mist",

  // BONDLINE
  "820G": "bondline",
  "850L": "bondline",

  // PINNACLE
  "234": "pinnacle",
  "181": "pinnacle",
  "314": "pinnacle",
  "724": "pinnacle",
  "578": "pinnacle",
};

export function getCollectionForFamily(familyId: string): string | null {
  return COLLECTION_MAP[familyId] || null;
}
