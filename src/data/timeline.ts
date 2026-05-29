// ─────────────────────────────────────────────────────────
//  Centralized Timeline Data — Designer World Heritage
//  From the 1940s to the Present Day
// ─────────────────────────────────────────────────────────

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: "origin" | "brand" | "expansion" | "milestone" | "modern";
  image?: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: "1940s",
    title: "The Beginning",
    description:
      "A small watch parts shop in Amritsar marked the start of a journey rooted in craftsmanship and trust.",
    category: "origin",
  },
  {
    year: "1960s",
    title: "The 2nd Generation",
    description:
      "The second generation of Nagpal's family entered the business, carrying forward the legacy of precision and dedication that defined the founding era.",
    category: "origin",
  },
  {
    year: "1976",
    title: "Nagpal's Bombay Was Formed",
    description:
      "The family established their new company under the name 'NAGPALS BOMBAY'. With extensive efforts, support & dedication, the network expanded all around India. They travelled to international markets to import parts & components for direct distribution. During the 1980s, various button cell brands tied up with Nagpals Bombay for battery distribution all over India — brands from Japan like MAXELL & Swiss like RENATA became a major focus for growth.",
    category: "milestone",
  },
  {
    year: "1991",
    title: "A Brand Is Born",
    description:
      "D'SIGNER was introduced — a step into creating watches defined by design, quality, and individuality.",
    category: "brand",
    image: "/images/deigner.png",
  },
  {
    year: "1992",
    title: "Voltage Batteries",
    description:
      "An attempt to produce watch button cells, with a small manufacturing unit in Nashik — expanding capabilities beyond watchmaking into component production.",
    category: "expansion",
  },
  {
    year: "1995",
    title: "Style for All",
    description:
      "ESCORT was launched to make timeless design more accessible, bringing refined style to a wider audience.",
    category: "brand",
    image: "/images/escort.png",
  },
  {
    year: "1998",
    title: "Introduction of Tissot in India",
    description:
      "Designer World became the national distributors to launch TISSOT watches in India. They initiated distribution for Tissot, Givenchy Paris, Christian Bernard Paris, and Rotary — establishing a formidable presence in the luxury watch distribution landscape.",
    category: "milestone",
  },
  {
    year: "2004",
    title: "D'Signer Effects",
    description:
      "A new division purely in the corporate gifts & promotion business was started under the name D'SIGNER EFFECTS — connecting with organizations of all sizes to offer promotion gifts for marketing schemes and plans.",
    category: "expansion",
  },
  {
    year: "2007",
    title: "Daniel Klein in India",
    description:
      "Got exclusive distribution of the Turkish brand watches and accessories in India, further expanding the house's international portfolio.",
    category: "expansion",
  },
  {
    year: "2010",
    title: "B2B & Corporate Gifting",
    description:
      "B2B & Corporate Gifting became a major focus as wristwatches became a strong category for business promotion. Launched clocks & bags under D'SIGNER for B2B requirements. Scaled production to manage the largest volume B2B orders in lakhs — projects for Tata Indicom, Reebok, Nikon, and pharma companies.",
    category: "milestone",
  },
  {
    year: "2015",
    title: "Beyond Our Own Brand",
    description:
      "Expanding into OEM manufacturing, Designer World began designing and producing watches for global and national brands — leveraging decades of craft expertise at industrial scale.",
    category: "expansion",
  },
  {
    year: "2017",
    title: "Adding More Brands",
    description:
      "The house introduced international fashion brands to its distribution channel: Mathey Tissot and D1 Milano. The same year, Designer World stepped into international exports — London, Singapore, and Middle Eastern countries including Bahrain and Oman.",
    category: "expansion",
  },
  {
    year: "2020",
    title: "The Digital Shift",
    description:
      "With the rise of e-commerce, Designer World adapted quickly — designing for online-first brands and expanding reach through digital channels.",
    category: "modern",
  },
  {
    year: "2022",
    title: "Designer World Brands",
    description:
      "Started a new division solely managing foreign brand distribution under the name DESIGNER WORLD BRANDS — adding labels like Ingersoll, Invicta, and Santa Barbara Polo Club.",
    category: "modern",
  },
  {
    year: "2024",
    title: "D'Signer Diamond Watches",
    description:
      "Launched Lab Grown Diamond Studded Watches as a new step to reach a more luxury audience, with models ranging up to ₹1,50,000.",
    category: "milestone",
  },
  {
    year: "2025",
    title: "Time Corridor",
    description:
      "The latest feather in the Designer World story. This retail Time Boutique is initiated to promote D'SIGNER & ESCORT watches at a unique experience store — showcasing prime models, new launches, top sellers & special editions with an appealing display and aura. A gesture to connect and add value to every happy watch buyer.",
    category: "modern",
  },
  {
    year: "Today",
    title: "Affordable Luxury",
    description:
      "Blending decades of legacy with modern design, Designer World continues to create watches that balance style, quality, and accessibility — built on legacy, designed for now.",
    category: "modern",
  },
];

export function getTimelineByCategory(category: TimelineEvent["category"]): TimelineEvent[] {
  return timelineEvents.filter((e) => e.category === category);
}
