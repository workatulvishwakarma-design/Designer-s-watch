export type Rect = [x: number, y: number, w: number, h: number];

export const ARTBOARD_WIDTH = 913;
export const ARTBOARD_HEIGHT = 11190;

export const PAPER_TILES: Rect[] = [
  [-9, 0, 931, 621],
  [-111, 621, 1135, 757],
  [-111, 1378, 1135, 757],
  [-111, 2135, 1135, 757],
  [-111, 2892, 1135, 757],
  [-111, 3649, 1135, 757],
  [-111, 4406, 1135, 757],
  [-111, 5163, 1135, 757],
  [-111, 5920, 1135, 757],
  [-111, 6677, 1135, 757],
  [-111, 7434, 1135, 757],
  [-111, 8191, 1135, 757],
  [-111, 8946, 1135, 757],
  [-111, 9703, 1135, 757],
  [-111, 10460, 1135, 757],
];

export const GREEN_TILES: Rect[] = [
  [181, 0, 551, 1378],
  [181, 1265, 551, 1378],
  [181, 2611, 551, 1378],
  [181, 3946, 551, 1279],
  [185, 5218, 551, 1279],
  [181, 6497, 551, 1279],
  [181, 7773, 551, 1279],
  [179, 9052, 551, 2069],
];

export type TextElement = {
  id: string;
  x: number;
  y: number;
  w?: number;
  className: string;
  html: string;
};

export type ImageElement = {
  id: string;
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  className?: string;
  alt?: string;
};

export type RuleElement = {
  x: number;
  y: number;
  w: number;
};

export type MilestoneSection = {
  id: string;
  label: string;
  yPosition: number;
  rules?: RuleElement[];
  texts?: TextElement[];
  images?: ImageElement[];
};

export const MILESTONES_DATA: MilestoneSection[] = [
  // 1940s
  {
    id: '1940s',
    label: '1940s',
    yPosition: 59,
    rules: [{ x: 49, y: 398, w: 78 }],
    texts: [
      {
        id: '1940-year',
        x: 49,
        y: 59,
        className: 'year big',
        html: '19<br><span class="suffix">40s</span>',
      },
      {
        id: '1940-title',
        x: 49,
        y: 344,
        w: 210,
        className: 'story s',
        html: 'The Beginning',
      },
      {
        id: '1940-left-body',
        x: 49,
        y: 423,
        w: 200,
        className: 'kicker',
        html: 'Started a new division solely managing foreign brand distribution under the name <b>DESIGNER WORLD BRANDS</b> &amp; added more labels like INGERSOLL, INVICTA, and SANTA BARBARA POLO CLUB.',
      },
      {
        id: '1940-right-label',
        x: 611,
        y: 145,
        w: 180,
        className: 'story green s',
        html: '1940s',
      },
      {
        id: '1940-right-body',
        x: 611,
        y: 228,
        w: 225,
        className: 'kicker',
        html: 'Dedicated brand management infrastructure empowered global fashion icons to flourish in the Indian marketplace.',
      },
    ],
    images: [
      { id: 'founder', src: 'x102.png', x: 290, y: 60, w: 330, h: 423, className: 'reveal', alt: 'Founder Portrait' },
      { id: 'store', src: 'x122.png', x: 467, y: 350, w: 449, h: 437, className: 'reveal', alt: 'Nagpal Watch Co. Store' },
    ],
  },
  // 1960s
  {
    id: '1960s',
    label: '1960s',
    yPosition: 813,
    texts: [
      {
        id: '1960-left-label',
        x: 47,
        y: 978,
        className: 'year small',
        html: '1960s',
      },
      {
        id: '1960-left-body',
        x: 47,
        y: 1050,
        w: 170,
        className: 'kicker',
        html: 'International partnerships formed the backbone of a growing enterprise. By the mid-60s, Nagpals had become a trusted name in the Northern India trade circuit for precision components and watch batteries.',
      },
      {
        id: '1960-year',
        x: 611,
        y: 813,
        className: 'year big',
        html: '19<br><span class="suffix">60s</span>',
      },
      {
        id: '1960-title',
        x: 611,
        y: 1119,
        w: 220,
        className: 'story green s',
        html: 'The 2nd Generation<br>of Nagpal Watch.CO',
      },
      {
        id: '1960-right-body',
        x: 611,
        y: 1208,
        w: 245,
        className: 'kicker',
        html: 'This was when the 2nd generation of Nagpal’s family entered the business, deepening roots in horology and building relationships with component suppliers across Northern India.',
      },
    ],
    images: [
      { id: 'family-1960', src: 'x114.png', x: 129, y: 1189, w: 482, h: 321, className: 'reveal', alt: '1960s Family Group' },
    ],
  },
  // 1976
  {
    id: '1976',
    label: '1976',
    yPosition: 1706,
    texts: [
      {
        id: '1976-year',
        x: 38,
        y: 1706,
        className: 'year big',
        html: '19<br><span class="suffix">76</span>',
      },
      {
        id: '1976-title',
        x: 38,
        y: 1970,
        w: 220,
        className: 'story s',
        html: '‘Nagpal’s Bombay‘<br>was formed',
      },
      {
        id: '1976-left-body',
        x: 38,
        y: 2105,
        w: 210,
        className: 'kicker',
        html: 'This was when the 2nd generation of Nagpal’s family entered the business, deepening roots in horology and building relationships across Northern India.',
      },
      {
        id: '1976-right-label',
        x: 611,
        y: 1740,
        className: 'year small',
        html: '1976',
      },
      {
        id: '1976-right-body',
        x: 611,
        y: 1819,
        w: 235,
        className: 'kicker',
        html: 'This was the time when they travelled to international markets to import parts &amp; components for direct distribution and during various BUTTON CELL brands tied up with NAGPALS BOMBAY for battery distribution all over India. Brands from Japan like MAXELL &amp; Swiss like RENATA became a major area of company’s focus for growth.',
      },
    ],
    images: [
      { id: 'nagpals-logo', src: 'x130.png', x: 342, y: 1834, w: 228, h: 91, className: 'reveal', alt: 'Nagpals Bombay Logo' },
    ],
  },
  // 1991
  {
    id: '1991',
    label: '1991',
    yPosition: 2392,
    texts: [
      {
        id: '1991-left-label',
        x: 38,
        y: 2538,
        className: 'year small',
        html: '1991',
      },
      {
        id: '1991-left-body',
        x: 38,
        y: 2590,
        w: 225,
        className: 'kicker',
        html: 'D’SIGNER was not simply a product launch but a philosophical statement. At a time when Indian watchmaking was dominated by mass-market models, D’SIGNER chose craftsmanship over compromise and design over convention.',
      },
      {
        id: '1991-year',
        x: 611,
        y: 2392,
        className: 'year big',
        html: '19<br><span class="suffix">91</span>',
      },
      {
        id: '1991-title',
        x: 611,
        y: 2678,
        w: 220,
        className: 'story green s',
        html: 'A Brand Is Born',
      },
      {
        id: '1991-right-body',
        x: 611,
        y: 2720,
        w: 225,
        className: 'kicker',
        html: 'D’SIGNER was introduced, a step into creating watches defined by design, quality, and individuality. One of the early Indian brands to design and manufacture to international horological standards.',
      },
    ],
    images: [
      { id: 'dsigner-logo', src: 'x110.png', x: 351, y: 2521, w: 211, h: 79, alt: "D'SIGNER Logo" },
      { id: 'dsigner-ad', src: 'x98.png', x: 267, y: 2652, w: 349, h: 232, className: 'reveal', alt: "D'SIGNER Vintage Advertisement" },
    ],
  },
  // 1995
  {
    id: '1995',
    label: '1995',
    yPosition: 3033,
    texts: [
      {
        id: '1995-year',
        x: 47,
        y: 3033,
        className: 'year big',
        html: '19<br><span class="suffix">95</span>',
      },
      {
        id: '1995-title',
        x: 47,
        y: 3319,
        w: 165,
        className: 'story s',
        html: 'Style For All',
      },
      {
        id: '1995-left-body',
        x: 47,
        y: 3408,
        w: 210,
        className: 'kicker',
        html: 'ESCORT was launched to make timeless design more accessible, bringing style to a wider audience with robust everyday timepieces at honest prices.',
      },
      {
        id: '1995-right-label',
        x: 609,
        y: 3088,
        className: 'year small',
        html: '1995',
      },
      {
        id: '1995-right-body',
        x: 609,
        y: 3133,
        w: 235,
        className: 'kicker',
        html: 'Escort answered a simple question: why shouldn’t every Indian have access to a reliable, beautifully finished timepiece? The market responded with extraordinary enthusiasm.',
      },
    ],
    images: [
      { id: 'escort-logo', src: 'x126.png', x: 358, y: 3117, w: 212, h: 119, alt: 'ESCORT Logo' },
      { id: 'escort-party', src: 'x88.png', x: 296, y: 3284, w: 407, h: 271, className: 'reveal', alt: 'ESCORT Launch Party' },
    ],
  },
  // 1998
  {
    id: '1998',
    label: '1998',
    yPosition: 3667,
    texts: [
      {
        id: '1998-left-label',
        x: 41,
        y: 3773,
        className: 'year small',
        html: '1998',
      },
      {
        id: '1998-left-body',
        x: 41,
        y: 3855,
        w: 225,
        className: 'kicker',
        html: 'Bringing prestige Swiss and French horological brands to Indian retail counters established the Nagpal Group as an esteemed national distributor.',
      },
      {
        id: '1998-year',
        x: 616,
        y: 3667,
        className: 'year big',
        html: '19<br><span class="suffix">98</span>',
      },
      {
        id: '1998-title',
        x: 616,
        y: 3999,
        w: 220,
        className: 'story green s',
        html: 'Introduction of<br>Tissot in India',
      },
      {
        id: '1998-right-body',
        x: 616,
        y: 4080,
        w: 226,
        className: 'kicker',
        html: 'We were the ones to launch TISSOT watches in India as national distributors. We initiated the distribution for Tissot, Givenchy Paris, Christian Bernard Paris, and Rotary in India.',
      },
    ],
    images: [
      { id: 'tissot-meet', src: 'x106.png', x: 236, y: 3866, w: 393, h: 262, className: 'reveal', alt: 'Tissot Launch' },
    ],
  },
  // 2004
  {
    id: '2004',
    label: '2004',
    yPosition: 4378,
    texts: [
      {
        id: '2004-year',
        x: 54,
        y: 4378,
        className: 'year big',
        html: '20<br><span class="suffix">04</span>',
      },
      {
        id: '2004-title',
        x: 54,
        y: 4664,
        w: 210,
        className: 'story s',
        html: 'D’signer Effects',
      },
      {
        id: '2004-left-body',
        x: 54,
        y: 4777,
        w: 230,
        className: 'kicker',
        html: 'Connecting brand messaging with high-quality custom corporate gifts allowed businesses across India to elevate their marketing initiatives and employee reward programs.',
      },
      {
        id: '2004-right-label',
        x: 616,
        y: 4538,
        className: 'year small',
        html: '2004',
      },
      {
        id: '2004-right-body',
        x: 616,
        y: 4610,
        w: 228,
        className: 'kicker',
        html: 'We started a division purely in the corporate gifts &amp; promotion business under the name D’SIGNER EFFECTS. Here the idea was to connect with all small and large organizations, offering all sorts of promotion gifts for schemes and marketing plans.',
      },
    ],
    images: [
      { id: 'effects-gifts', src: 'x72.png', x: 335, y: 4541, w: 246, h: 308, className: 'reveal', alt: "D'SIGNER Effects Catalog" },
    ],
  },
  // 2010
  {
    id: '2010',
    label: '2010',
    yPosition: 5046,
    texts: [
      {
        id: '2010-year-left',
        x: 41,
        y: 5196,
        className: 'year big',
        html: '20<br><span class="suffix">10</span>',
      },
      {
        id: '2010-left-body-1',
        x: 41,
        y: 5275,
        w: 170,
        className: 'kicker',
        html: 'DESIGNER WATCHES scaled production skills and managed largest volume B2B orders of watches in lakhs, delivering projects for esteemed groups like TATA INDICOM, REEBOK, NIKON, and PHARMA COMPANIES.',
      },
      {
        id: '2010-left-body-2',
        x: 41,
        y: 5600,
        w: 175,
        className: 'kicker',
        html: 'B2B &amp; Corporate Gifting became a very important focus as wristwatches became a strong category for business promotion and marketing plans for major corporates. Launched clocks &amp; bags category under D’SIGNER for B2B requirements.',
      },
      {
        id: '2010-year-right',
        x: 616,
        y: 5046,
        className: 'year big',
        html: '20<br><span class="suffix">10</span>',
      },
      {
        id: '2010-title',
        x: 616,
        y: 5352,
        w: 235,
        className: 'story green s',
        html: 'B2B &amp; Corporate<br>Gifting',
      },
    ],
    images: [
      { id: 'clocks-1', src: 'x76.png', x: 288, y: 5149, w: 164, h: 219, className: 'reveal', alt: 'Antique Clock' },
      { id: 'clocks-2', src: 'x46.png', x: 398, y: 5237, w: 245, h: 245, className: 'reveal', alt: 'Corporate Clock' },
      { id: 'clocks-3', src: 'x50.png', x: 197, y: 5449, w: 508, h: 339, className: 'reveal', alt: 'Clocks Collection' },
    ],
  },
  // 2013
  {
    id: '2013',
    label: '2013',
    yPosition: 5951,
    texts: [
      {
        id: '2013-year',
        x: 46,
        y: 5951,
        className: 'year big',
        html: '20<br><span class="suffix">13</span>',
      },
      {
        id: '2013-title',
        x: 46,
        y: 6237,
        w: 225,
        className: 'story s',
        html: 'Daniel Klein in India',
      },
      {
        id: '2013-left-body',
        x: 46,
        y: 6327,
        w: 210,
        className: 'kicker',
        html: 'Got exclusive distribution of Daniel Klein, a leading Turkish brand of watches and fashion accessories, in India.',
      },
      {
        id: '2013-right-label',
        x: 614,
        y: 6046,
        className: 'year small',
        html: '2013',
      },
      {
        id: '2013-right-body',
        x: 614,
        y: 6170,
        w: 250,
        className: 'kicker',
        html: 'Bringing dynamic international styling and accessible luxury to retail counters opened new fashion-forward demographics across all major tier-1 and tier-2 cities.',
      },
    ],
    images: [
      { id: 'dk-watch', src: 'x84.png', x: 292, y: 5977, w: 347, h: 520, className: 'reveal', alt: 'Daniel Klein Watch with Splash' },
    ],
  },
  // 2015
  {
    id: '2015',
    label: '2015',
    yPosition: 6607,
    texts: [
      {
        id: '2015-left-label',
        x: 41,
        y: 6757,
        className: 'year small',
        html: '2015',
      },
      {
        id: '2015-left-body',
        x: 41,
        y: 7030,
        w: 215,
        className: 'kicker',
        html: 'Over 500 private labels would trust our manufacturing expertise to engineer precision timepieces adhering to international quality benchmarks.',
      },
      {
        id: '2015-year',
        x: 616,
        y: 6607,
        className: 'year big',
        html: '20<br><span class="suffix">15</span>',
      },
      {
        id: '2015-title',
        x: 616,
        y: 6913,
        w: 230,
        className: 'story green s',
        html: 'Beyond Our Own<br>Brand',
      },
      {
        id: '2015-right-body',
        x: 616,
        y: 7005,
        w: 235,
        className: 'kicker',
        html: 'Expanding into OEM manufacturing, we began designing and producing watches for global and national brands, marking a significant leap in manufacturing capability.',
      },
    ],
    images: [
      { id: 'oem-logo', src: 'x60.png', x: 385, y: 6669, w: 150, h: 133, alt: 'OEM Time Lab Logo' },
      { id: 'handcrafted', src: 'x42.png', x: 316, y: 6819, w: 283, h: 400, className: 'reveal', alt: 'Every Second Handcrafted' },
    ],
  },
  // 2017
  {
    id: '2017',
    label: '2017',
    yPosition: 7297,
    texts: [
      {
        id: '2017-year',
        x: 39,
        y: 7297,
        className: 'year big',
        html: '20<br><span class="suffix">17</span>',
      },
      {
        id: '2017-title',
        x: 39,
        y: 7615,
        w: 220,
        className: 'story s',
        html: 'Adding More Brands',
      },
      {
        id: '2017-left-body',
        x: 39,
        y: 7705,
        w: 230,
        className: 'kicker',
        html: 'Same year Designer World stepped into international exports, in London, Singapore, and in Middle Eastern countries like Bahrain and Oman.',
      },
      {
        id: '2017-right-label',
        x: 614,
        y: 7475,
        className: 'year small',
        html: '2017',
      },
      {
        id: '2017-right-body',
        x: 614,
        y: 7550,
        w: 238,
        className: 'kicker',
        html: 'The house introduced few more international fashion brands in its distribution channel: MATHEY TISSOT and D1 MILANO.',
      },
    ],
    images: [
      { id: 'mathey-watch', src: 'x34.png', x: 276, y: 7587, w: 366, h: 244, className: 'reveal', alt: 'Mathey-Tissot Watch' },
    ],
  },
  // 2020
  {
    id: '2020',
    label: '2020',
    yPosition: 7892,
    texts: [
      {
        id: '2020-left-label',
        x: 50,
        y: 8042,
        className: 'year small',
        html: '2020',
      },
      {
        id: '2020-left-body',
        x: 50,
        y: 8125,
        w: 235,
        className: 'kicker',
        html: 'Direct-to-consumer acceleration and modern logistics allowed us to deliver timepieces with agility to watch lovers across India.',
      },
      {
        id: '2020-year',
        x: 625,
        y: 7892,
        className: 'year big',
        html: '20<br><span class="suffix">20</span>',
      },
      {
        id: '2020-title',
        x: 625,
        y: 8198,
        w: 215,
        className: 'story green s',
        html: 'The Digital Shift',
      },
      {
        id: '2020-right-body',
        x: 625,
        y: 8288,
        w: 230,
        className: 'kicker',
        html: 'With the rise of e-commerce, we adapted quickly, designing for online-first brands and expanding our reach across digital platforms.',
      },
    ],
    images: [
      { id: 'ghadiwaala', src: 'x24.png', x: 348, y: 8141, w: 216, h: 72, alt: 'ghadiwaala' },
    ],
  },
  // 2022
  {
    id: '2022',
    label: '2022',
    yPosition: 8390,
    texts: [
      {
        id: '2022-year',
        x: 50,
        y: 8390,
        className: 'year big',
        html: '20<br><span class="suffix">22</span>',
      },
      {
        id: '2022-title',
        x: 50,
        y: 8685,
        w: 190,
        className: 'story green s',
        html: 'Designer World<br>Brands',
      },
      {
        id: '2022-left-body',
        x: 50,
        y: 8790,
        w: 218,
        className: 'kicker',
        html: 'Dedicated brand management infrastructure empowered global fashion icons to flourish in the Indian marketplace.',
      },
      {
        id: '2022-right-year',
        x: 625,
        y: 8012,
        className: 'year big',
        html: '20<br><span class="suffix">22</span>',
      },
      {
        id: '2022-right-label',
        x: 625,
        y: 8568,
        w: 230,
        className: 'story green s',
        html: '2022',
      },
      {
        id: '2022-right-body',
        x: 625,
        y: 8648,
        w: 236,
        className: 'kicker',
        html: 'Started a new division solely managing foreign brand distribution under the name DESIGNER WORLD BRANDS &amp; added more labels like INGERSOLL, INVICTA, and SANTA BARBARA POLO CLUB.',
      },
    ],
    images: [
      { id: 'dw-brands', src: 'x20.png', x: 129, y: 8557, w: 318, h: 212, className: 'reveal', alt: 'Designer World Brands' },
    ],
  },
  // 2024
  {
    id: '2024',
    label: '2024',
    yPosition: 8981,
    texts: [
      {
        id: '2024-left-label',
        x: 50,
        y: 9131,
        className: 'year small',
        html: '2024',
      },
      {
        id: '2024-left-body',
        x: 50,
        y: 9228,
        w: 220,
        className: 'kicker',
        html: 'Combining modern ethical lab-grown diamonds with Swiss-inspired horology to deliver sophisticated luxury for discerning collectors.',
      },
      {
        id: '2024-year',
        x: 625,
        y: 8981,
        className: 'year big',
        html: '20<br><span class="suffix">24</span>',
      },
      {
        id: '2024-title',
        x: 625,
        y: 9287,
        w: 235,
        className: 'story green s',
        html: 'D’signer Diamond<br>Watches',
      },
      {
        id: '2024-right-body',
        x: 625,
        y: 9397,
        w: 225,
        className: 'kicker',
        html: 'Launched Lab Grown Diamond Studded Watches as a new step to reach a more luxury audience, featuring models ranging up to Rs. 1,50,000/-.',
      },
    ],
    images: [
      { id: 'diamond-watch', src: 'x16.png', x: 253, y: 9019, w: 370, h: 463, className: 'reveal', alt: "D'SIGNER Diamond Watches" },
    ],
  },
  // 2025
  {
    id: '2025',
    label: '2025',
    yPosition: 9709,
    texts: [
      {
        id: '2025-year',
        x: 62,
        y: 9709,
        className: 'year big',
        html: '20<br><span class="suffix">25</span>',
      },
      {
        id: '2025-title',
        x: 62,
        y: 10030,
        w: 225,
        className: 'story s',
        html: 'Time Corridor',
      },
      {
        id: '2025-left-body',
        x: 62,
        y: 10100,
        w: 240,
        className: 'kicker',
        html: 'A latest feather in Designer World story. At Designer World it’s not about just the product we make but the aura we pass to our user with the time we design.',
      },
      {
        id: '2025-right-label',
        x: 649,
        y: 9858,
        className: 'year small',
        html: '2025',
      },
      {
        id: '2025-right-body',
        x: 649,
        y: 9990,
        w: 220,
        className: 'kicker',
        html: 'This retail Time Boutique is initiated to promote our home brands, D’SIGNER &amp; ESCORT watches at a unique experience store showcasing our prime models, new launches, top sellers &amp; special editions with an appealing display and aura. A gesture to connect &amp; add some value to our happy watch buyers.',
      },
    ],
    images: [
      { id: 'time-corridor', src: 'x12.png', x: 290, y: 9766, w: 390, h: 585, className: 'reveal', alt: 'Time Corridor Boutique' },
    ],
  },
  // TODAY
  {
    id: 'today',
    label: 'TODAY',
    yPosition: 10655,
    texts: [
      {
        id: 'today-title-left',
        x: 38,
        y: 10655,
        w: 220,
        className: 'today',
        html: 'TODAY',
      },
      {
        id: 'today-left-body',
        x: 38,
        y: 10710,
        w: 220,
        className: 'kicker',
        html: 'Blending decades of legacy with modern design, Designer World continues to create watches that balance style, quality, and accessibility.',
      },
      {
        id: 'today-title-right',
        x: 625,
        y: 10718,
        w: 220,
        className: 'afford',
        html: 'Affordable Luxury',
      },
      {
        id: 'today-right-body',
        x: 625,
        y: 10776,
        w: 225,
        className: 'kicker',
        html: 'Where heritage meets modern design, Designer World creates watches that combine timeless style, reliable quality, and everyday accessibility.',
      },
    ],
    images: [
      { id: 'team-photo', src: 'x8.png', x: 155, y: 10839, w: 547, h: 365, className: 'reveal', alt: 'Designer World Team Photo' },
    ],
  },
];
