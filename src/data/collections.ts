// ─────────────────────────────────────────────────────────
//  Centralized Collection Metadata — 24 D'SIGNER Collections
//  Each collection carries emotional luxury identity + model families
//  Updated with exact mapping from Designer World line sheet
// ─────────────────────────────────────────────────────────

export interface Collection {
  slug: string;
  name: string;
  meaning: string;
  description: string;
  identity: string;
  luxuryIdentity: string;
  modelFamilies: string[];
  gender: "Men" | "Women" | "Unisex";
  featured?: boolean;
  heroImage?: string;
}

export const collections: Collection[] = [
  {
    slug: "grandeur",
    name: "Grandeur",
    meaning: "Splendor and impressiveness, especially in luxury styling and elevated presence",
    description: "A collection that embodies magnificence in every detail. Bold proportions, rich dial textures, and commanding presence define timepieces crafted for those who lead with distinction.",
    identity: "Majestic · Commanding · Opulent",
    luxuryIdentity: "Bold premium statement watches with commanding visual presence",
    modelFamilies: ["950", "840", "830", "824", "915"],
    gender: "Unisex",
    featured: true,
    heroImage: "/images/new-img/model-2/950/950/950GNFS.16G.png",
  },
  {
    slug: "eternal",
    name: "Eternal",
    meaning: "Timeless elegance designed to last forever",
    description: "Transcending trends and seasons, the Eternal collection celebrates designs that endure. Clean architecture and enduring materials create watches that grow more beautiful with age.",
    identity: "Timeless · Enduring · Classic",
    luxuryIdentity: "Refined timeless luxury with classic sophistication",
    modelFamilies: ["901L"],
    gender: "Unisex",
    featured: true,
    heroImage: "/images/new-img/model-2/901/901/901GM_Green.png",
  },
  {
    slug: "serene",
    name: "Serene",
    meaning: "Calm, peaceful, balanced, and elegantly understated",
    description: "Whisper-quiet refinement for those who find power in stillness. Soft-toned dials, minimalist indices, and gentle proportions define a collection built for contemplative elegance.",
    identity: "Peaceful · Minimal · Graceful",
    luxuryIdentity: "Minimal luxury and refined elegance",
    modelFamilies: ["812", "855", "670"],
    gender: "Women",
    featured: true,
  },
  {
    slug: "tactix",
    name: "Tactix",
    meaning: "Tactical precision, utility, confidence, and functionality",
    description: "Engineered for those who approach life with calculated confidence. Chronograph functionality, luminous indices, and robust construction define a collection that values precision.",
    identity: "Strategic · Technical · Bold",
    luxuryIdentity: "Strong masculine technical watches with bold functionality",
    modelFamilies: ["200", "795", "804", "865"],
    gender: "Men",
  },
  {
    slug: "bolt",
    name: "Bolt",
    meaning: "Fast energy, lightning-inspired movement, and dynamic power",
    description: "Dynamic lines and sport-inspired aesthetics for the active lifestyle. Built for movement, designed for impact — the Bolt collection channels raw kinetic energy into wearable art.",
    identity: "Dynamic · Energetic · Athletic",
    luxuryIdentity: "Aggressive sporty energy and modern premium styling",
    modelFamilies: ["748", "680"],
    gender: "Men",
    featured: true,
    heroImage: "/images/new-img/model-1/748/748/748/748GM.16G.png",
  },
  {
    slug: "pulse",
    name: "Pulse",
    meaning: "Rhythmic movement inspired by heartbeat and momentum",
    description: "Feel the rhythm of precision. The Pulse collection merges contemporary design with athletic functionality — timepieces that keep pace with your most ambitious moments.",
    identity: "Rhythmic · Vital · Contemporary",
    luxuryIdentity: "Urban contemporary movement-focused collection",
    modelFamilies: ["811", "823", "869", "778", "792"],
    gender: "Unisex",
  },
  {
    slug: "vortex",
    name: "Vortex",
    meaning: "Powerful rotational force and energetic motion",
    description: "A collection that draws you in with magnetic presence. Bold case geometry, textured dials, and assertive proportions create a gravitational pull that commands attention.",
    identity: "Magnetic · Powerful · Hypnotic",
    luxuryIdentity: "Layered chronograph aesthetics and dynamic detailing",
    modelFamilies: ["837", "845", "960", "450", "851"],
    gender: "Men",
  },
  {
    slug: "glimmer",
    name: "Glimmer",
    meaning: "Soft shimmering luxury and reflective elegance",
    description: "Subtle sparkle meets refined femininity. The Glimmer collection captures light through faceted cases, crystal accents, and lustrous finishing — elegance that catches every eye.",
    identity: "Luminous · Feminine · Delicate",
    luxuryIdentity: "Elegant metallic luxury with premium shine detailing",
    modelFamilies: ["828", "819", "852", "860"],
    gender: "Women",
    featured: true,
  },
  {
    slug: "ignite",
    name: "Ignite",
    meaning: "Energy, fire, confidence, and bold visual ignition",
    description: "For those who ignite rooms with their presence. Bold dial colours, striking contrasts, and confident proportions define timepieces that refuse to go unnoticed.",
    identity: "Passionate · Bold · Striking",
    luxuryIdentity: "Sport-luxury statement watches",
    modelFamilies: ["841", "854"],
    gender: "Men",
  },
  {
    slug: "tidemark",
    name: "Tidemark",
    meaning: "Ocean-inspired movement and navigational identity",
    description: "Inspired by the enduring impressions of nature. The Tidemark collection features fluid case lines and ocean-inspired dial textures — watches that leave lasting impressions.",
    identity: "Nautical · Enduring · Natural",
    luxuryIdentity: "Marine-inspired premium designs",
    modelFamilies: ["808", "876"],
    gender: "Men",
  },
  {
    slug: "hallmark",
    name: "Hallmark",
    meaning: "A mark of quality, authenticity, and craftsmanship",
    description: "The signature of true craftsmanship. Every Hallmark piece carries the DNA of four generations of watchmaking — heritage-defined design at its most refined.",
    identity: "Signature · Heritage · Definitive",
    luxuryIdentity: "Classic heritage luxury",
    modelFamilies: ["862", "912", "777"],
    gender: "Unisex",
  },
  {
    slug: "echo",
    name: "Echo",
    meaning: "Reflection, resonance, and timeless repetition",
    description: "Designs that resonate beyond the moment. The Echo collection draws from architectural symmetry and sonic precision — timepieces that amplify your personal style.",
    identity: "Resonant · Architectural · Reflective",
    luxuryIdentity: "Elegant modern classics",
    modelFamilies: ["905", "807", "853"],
    gender: "Unisex",
  },
  {
    slug: "quest",
    name: "Quest",
    meaning: "Journey, exploration, ambition, and discovery",
    description: "For the explorers and seekers. Rugged construction meets refined finishing in a collection designed for those whose journey defines their destination.",
    identity: "Adventurous · Purposeful · Rugged",
    luxuryIdentity: "Adventure-inspired premium styling",
    modelFamilies: ["802", "806", "827", "836"],
    gender: "Men",
  },
  {
    slug: "duetto",
    name: "Duetto",
    meaning: "Harmony between dual identities and balanced styling",
    description: "Designed in complementary pairs. The Duetto collection offers matching his-and-hers timepieces — where shared design language creates an unspoken bond of elegance.",
    identity: "Harmonious · Paired · Romantic",
    luxuryIdentity: "Balanced modern elegance",
    modelFamilies: ["856", "521"],
    gender: "Unisex",
  },
  {
    slug: "astral",
    name: "Astral",
    meaning: "Celestial inspiration and cosmic elegance",
    description: "Celestial inspiration meets earthly craftsmanship. Deep blue dials, constellation motifs, and luminous accents create watches that carry the mystique of the night sky.",
    identity: "Celestial · Mystical · Deep",
    luxuryIdentity: "Night-sky inspired premium watch aesthetics",
    modelFamilies: ["810", "726"],
    gender: "Unisex",
  },
  {
    slug: "daymark",
    name: "Daymark",
    meaning: "Guidance, navigation, and directional precision",
    description: "Your constant companion through every hour. The Daymark collection features clear legibility, day-date complications, and all-day comfort — designed for the man who navigates each day with purpose.",
    identity: "Reliable · Clear · Navigational",
    luxuryIdentity: "Structured modern utility-luxury",
    modelFamilies: ["809", "826", "843", "867", "821"],
    gender: "Men",
  },
  {
    slug: "axion",
    name: "Axion",
    meaning: "Futuristic scientific energy and advanced identity",
    description: "Undeniable design authority. The Axion collection strips away the unnecessary to reveal pure horological truth — bold, honest, and unapologetically modern.",
    identity: "Authoritative · Modern · Pure",
    luxuryIdentity: "Modern futuristic minimalism",
    modelFamilies: ["814"],
    gender: "Men",
  },
  {
    slug: "matrix",
    name: "Matrix",
    meaning: "Structured systems, precision, and layered complexity",
    description: "Complex beauty in structured form. Layered dial architecture, multi-axis textures, and geometric precision define a collection for those who appreciate depth in design.",
    identity: "Complex · Geometric · Layered",
    luxuryIdentity: "Architectural luxury watch styling",
    modelFamilies: ["916"],
    gender: "Men",
  },
  {
    slug: "spectre",
    name: "Spectre",
    meaning: "Mystery, shadow, and elegant darkness",
    description: "Stealth luxury at its finest. Dark-toned cases, shadow dials, and monochromatic finishing create an enigmatic presence — for those who let their style speak in whispers.",
    identity: "Mysterious · Stealth · Dark",
    luxuryIdentity: "Dark luxury aesthetics",
    modelFamilies: ["825"],
    gender: "Men",
  },
  {
    slug: "oasis",
    name: "Oasis",
    meaning: "Calm elegance within powerful surroundings",
    description: "A sanctuary on your wrist. Soft colour palettes, polished surfaces, and calming dial compositions create a collection that brings peace to every glance at the time.",
    identity: "Refreshing · Calm · Polished",
    luxuryIdentity: "Soft sophisticated minimal luxury",
    modelFamilies: ["800"],
    gender: "Women",
  },
  {
    slug: "breeze",
    name: "Breeze",
    meaning: "Light movement and effortless elegance",
    description: "Effortless elegance that moves with you. Lightweight construction, pastel tones, and airy proportions define a collection for the woman who embodies natural grace.",
    identity: "Light · Airy · Effortless",
    luxuryIdentity: "Lightweight refined everyday luxury",
    modelFamilies: ["788", "794"],
    gender: "Women",
  },
  {
    slug: "mist",
    name: "Mist",
    meaning: "Atmospheric softness and layered subtlety",
    description: "Ethereal beauty in material form. Frosted finishes, translucent elements, and soft gradients create watches that exist at the beautiful boundary between seen and unseen.",
    identity: "Ethereal · Soft · Dreamy",
    luxuryIdentity: "Soft-tone premium sophistication",
    modelFamilies: ["834", "835"],
    gender: "Women",
  },
  {
    slug: "bondline",
    name: "Bondline",
    meaning: "Precision connection and unified luxury",
    description: "Where function meets philosophy. The Bondline collection represents the connection between heritage craft and modern ambition — watches that bridge generations of style.",
    identity: "Connected · Bridging · Philosophical",
    luxuryIdentity: "Couple-inspired coordinated luxury watches",
    modelFamilies: ["820G", "850L"],
    gender: "Unisex",
  },
  {
    slug: "pinnacle",
    name: "Pinnacle",
    meaning: "The highest level of achievement and refinement",
    description: "The apex of D'SIGNER craftsmanship. Premium materials, sophisticated complications, and meticulous finishing define a collection that represents the very best we create.",
    identity: "Supreme · Premium · Apex",
    luxuryIdentity: "Top-tier flagship luxury collection",
    modelFamilies: ["234", "181", "314", "724", "578"],
    gender: "Men",
    featured: true,
  },
];

// ─── FAMILY → COLLECTION REVERSE MAP ───
const _familyToCollection: Record<string, string> = {};
for (const c of collections) {
  for (const f of c.modelFamilies) {
    _familyToCollection[f] = c.slug;
  }
}
export const familyToCollection = _familyToCollection;

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getFeaturedCollections(): Collection[] {
  return collections.filter((c) => c.featured);
}

export function getCollectionsByGender(gender: "Men" | "Women" | "Unisex"): Collection[] {
  return collections.filter((c) => c.gender === gender || c.gender === "Unisex");
}

export function getCollectionForFamily(familyId: string): string | null {
  return _familyToCollection[familyId] || null;
}
