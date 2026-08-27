export type TimelineItem = {
  id: string;
  yearMain: string;       // e.g. "19" or "20"
  yearSub: string;        // e.g. "40s" or "76"
  isDecadeSuffix?: boolean; // true for "40s", "60s"
  yearSide: 'left' | 'right';
  title: string;
  titleGreen?: boolean;
  leftText: string;
  rightText: string;
  centerImages?: {
    src: string;
    alt: string;
    width?: number | string;
    maxWidth?: number | string;
    style?: React.CSSProperties;
  }[];
  sideImage?: {
    side: 'left' | 'right';
    src: string;
    alt: string;
    width?: number | string;
    style?: React.CSSProperties;
  };
};

const ASSET_DIR = '/about-us-coded/assets/';

export const TIMELINE_SECTIONS: TimelineItem[] = [
  // 1940s
  {
    id: '1940s',
    yearMain: '19',
    yearSub: '40s',
    isDecadeSuffix: true,
    yearSide: 'left',
    title: 'The Beginning',
    leftText:
      'Started a new division solely managing foreign brand distribution under the name DESIGNER WORLD BRANDS & added more labels like INGERSOLL, INVICTA, and SANTA BARBARA POLO CLUB.',
    centerImages: [
      {
        src: ASSET_DIR + 'x102.png',
        alt: 'Founder Portrait',
        width: '100%',
        maxWidth: 290,
      },
    ],
    rightText:
      'Dedicated brand management infrastructure empowered global fashion icons to flourish in the Indian marketplace.',
    sideImage: {
      side: 'right',
      src: ASSET_DIR + 'x122.png',
      alt: 'Nagpal Watch Co. Store',
      maxWidth: 340,
    },
  },
  // 1960s
  {
    id: '1960s',
    yearMain: '19',
    yearSub: '60s',
    isDecadeSuffix: true,
    yearSide: 'right',
    title: 'The 2nd Generation of Nagpal Watch.CO',
    titleGreen: true,
    leftText:
      'International partnerships formed the backbone of a growing enterprise. By the mid-60s, Nagpals had become a trusted name in the Northern India trade circuit for precision components and watch batteries.',
    centerImages: [
      {
        src: ASSET_DIR + 'x114.png',
        alt: '1960s Family Group',
        width: '130%',
        maxWidth: 380,
      },
    ],
    rightText:
      'This was when the 2nd generation of Nagpal’s family entered the business, deepening roots in horology and building relationships with component suppliers across Northern India.',
  },
  // 1976
  {
    id: '1976',
    yearMain: '19',
    yearSub: '76',
    yearSide: 'left',
    title: '‘Nagpal’s Bombay‘ was formed',
    leftText:
      'This was when the 2nd generation of Nagpal’s family entered the business, deepening roots in horology and building relationships across Northern India.',
    centerImages: [
      {
        src: ASSET_DIR + 'x130.png',
        alt: 'Nagpals Bombay Logo',
        maxWidth: 210,
        style: { marginBottom: 12 },
      },
      {
        src: ASSET_DIR + 'x118.png',
        alt: 'Nagpals Bombay 1976 Photo',
        maxWidth: 420,
      },
    ],
    rightText:
      'This was the time when they travelled to international markets to import parts & components for direct distribution and during various BUTTON CELL brands tied up with NAGPALS BOMBAY for battery distribution all over India. Brands from Japan like MAXELL & Swiss like RENATA became a major area of company’s focus for growth.',
  },
  // 1991
  {
    id: '1991',
    yearMain: '19',
    yearSub: '91',
    yearSide: 'right',
    title: 'A Brand Is Born',
    titleGreen: true,
    leftText:
      'D’SIGNER was not simply a product launch but a philosophical statement. At a time when Indian watchmaking was dominated by mass-market models, D’SIGNER chose craftsmanship over compromise and design over convention.',
    centerImages: [
      {
        src: ASSET_DIR + 'x110.png',
        alt: "D'SIGNER Logo",
        maxWidth: 180,
        style: { marginBottom: 10 },
      },
      {
        src: ASSET_DIR + 'x98.png',
        alt: "D'SIGNER Couple Watch Advertisement",
        maxWidth: 300,
      },
    ],
    rightText:
      'D’SIGNER was introduced, a step into creating watches defined by design, quality, and individuality. One of the early Indian brands to design and manufacture to international horological standards.',
  },
  // 1995
  {
    id: '1995',
    yearMain: '19',
    yearSub: '95',
    yearSide: 'left',
    title: 'Style For All',
    leftText:
      'ESCORT was launched to make timeless design more accessible, bringing style to a wider audience with robust everyday timepieces at honest prices.',
    centerImages: [
      {
        src: ASSET_DIR + 'x126.png',
        alt: 'ESCORT Logo',
        maxWidth: 190,
        style: { marginBottom: 10 },
      },
      {
        src: ASSET_DIR + 'x88.png',
        alt: 'ESCORT Banquet Launch',
        maxWidth: 320,
      },
    ],
    rightText:
      'Escort answered a simple question: why shouldn’t every Indian have access to a reliable, beautifully finished timepiece? The market responded with extraordinary enthusiasm.',
  },
  // 1998
  {
    id: '1998',
    yearMain: '19',
    yearSub: '98',
    yearSide: 'right',
    title: 'Introduction of Tissot in India',
    titleGreen: true,
    leftText:
      'Bringing prestige Swiss and French horological brands to Indian retail counters established the Nagpal Group as an esteemed national distributor.',
    centerImages: [
      {
        src: ASSET_DIR + 'x106.png',
        alt: 'Tissot Partnership Meeting',
        maxWidth: 320,
      },
    ],
    rightText:
      'We were the ones to launch TISSOT watches in India as national distributors. We initiated the distribution for Tissot, Givenchy Paris, Christian Bernard Paris, and Rotary in India.',
  },
  // 2004
  {
    id: '2004',
    yearMain: '20',
    yearSub: '04',
    yearSide: 'left',
    title: 'D’signer Effects',
    leftText:
      'Connecting brand messaging with high-quality custom corporate gifts allowed businesses across India to elevate their marketing initiatives and employee reward programs.',
    centerImages: [
      {
        src: ASSET_DIR + 'x80.png',
        alt: "D'SIGNER Effects Logo",
        maxWidth: 220,
        style: { marginBottom: 10 },
      },
      {
        src: ASSET_DIR + 'x72.png',
        alt: "D'SIGNER Effects Corporate Gifts Catalog",
        maxWidth: 250,
      },
    ],
    rightText:
      'We started a division purely in the corporate gifts & promotion business under the name D’SIGNER EFFECTS. Here the idea was to connect with all small and large organizations, offering all sorts of promotion gifts for schemes and marketing plans.',
  },
  // 2010
  {
    id: '2010',
    yearMain: '20',
    yearSub: '10',
    yearSide: 'right',
    title: 'B2B & Corporate Gifting',
    titleGreen: true,
    leftText:
      'DESIGNER WATCHES scaled production skills and managed largest volume B2B orders of watches in lakhs, delivering projects for esteemed groups like TATA INDICOM, REEBOK, NIKON, and PHARMA COMPANIES.\n\nB2B & Corporate Gifting became a very important focus as wristwatches became a strong category for business promotion and marketing plans for major corporates. Launched clocks & bags category under D’SIGNER for B2B requirements.',
    centerImages: [
      {
        src: ASSET_DIR + 'x76.png',
        alt: 'Antique Clock',
        maxWidth: 160,
      },
      {
        src: ASSET_DIR + 'x46.png',
        alt: 'Corporate Desk Clock',
        maxWidth: 200,
        style: { marginTop: 10 },
      },
      {
        src: ASSET_DIR + 'x50.png',
        alt: 'Clocks Collection Display',
        maxWidth: 340,
        style: { marginTop: 12 },
      },
    ],
    rightText:
      'B2B & Corporate Gifting became a very important focus as wristwatches became a strong category for business promotion and marketing plans for major corporates.',
  },
  // 2013
  {
    id: '2013',
    yearMain: '20',
    yearSub: '13',
    yearSide: 'left',
    title: 'Daniel Klein in India',
    leftText:
      'Got exclusive distribution of Daniel Klein, a leading Turkish brand of watches and fashion accessories, in India.',
    centerImages: [
      {
        src: ASSET_DIR + 'x84.png',
        alt: 'Daniel Klein Watch with Liquid Chrome Splash',
        maxWidth: 320,
      },
    ],
    rightText:
      'Bringing dynamic international styling and accessible luxury to retail counters opened new fashion-forward demographics across all major tier-1 and tier-2 cities.',
  },
  // 2015
  {
    id: '2015',
    yearMain: '20',
    yearSub: '15',
    yearSide: 'right',
    title: 'Beyond Our Own Brand',
    titleGreen: true,
    leftText:
      'Over 500 private labels would trust our manufacturing expertise to engineer precision timepieces adhering to international quality benchmarks.',
    centerImages: [
      {
        src: ASSET_DIR + 'x60.png',
        alt: 'OEM Time Lab Logo',
        maxWidth: 140,
        style: { marginBottom: 10 },
      },
      {
        src: ASSET_DIR + 'x42.png',
        alt: 'Every Second Handcrafted Workshop Stack',
        maxWidth: 270,
      },
    ],
    rightText:
      'Expanding into OEM manufacturing, we began designing and producing watches for global and national brands, marking a significant leap in manufacturing capability.',
  },
  // 2017
  {
    id: '2017',
    yearMain: '20',
    yearSub: '17',
    yearSide: 'left',
    title: 'Adding More Brands',
    leftText:
      'Same year Designer World stepped into international exports, in London, Singapore, and in Middle Eastern countries like Bahrain and Oman.',
    centerImages: [
      {
        src: ASSET_DIR + 'x34.png',
        alt: 'Mathey-Tissot Chronograph Watch',
        maxWidth: 320,
      },
    ],
    rightText:
      'The house introduced few more international fashion brands in its distribution channel: MATHEY TISSOT and D1 MILANO.',
  },
  // 2020
  {
    id: '2020',
    yearMain: '20',
    yearSub: '20',
    yearSide: 'right',
    title: 'The Digital Shift',
    titleGreen: true,
    leftText:
      'Direct-to-consumer acceleration and modern logistics allowed us to deliver timepieces with agility to watch lovers across India.',
    centerImages: [
      {
        src: ASSET_DIR + 'x24.png',
        alt: 'ghadiwaala Logo',
        maxWidth: 190,
      },
    ],
    rightText:
      'With the rise of e-commerce, we adapted quickly, designing for online-first brands and expanding our reach across digital platforms.',
  },
  // 2022
  {
    id: '2022',
    yearMain: '20',
    yearSub: '22',
    yearSide: 'left',
    title: 'Designer World Brands',
    titleGreen: true,
    leftText:
      'Dedicated brand management infrastructure empowered global fashion icons to flourish in the Indian marketplace.',
    centerImages: [
      {
        src: ASSET_DIR + 'x20.png',
        alt: 'Designer World Brands Portfolio',
        maxWidth: 290,
      },
    ],
    rightText:
      'Started a new division solely managing foreign brand distribution under the name DESIGNER WORLD BRANDS & added more labels like INGERSOLL, INVICTA, and SANTA BARBARA POLO CLUB.',
  },
  // 2024
  {
    id: '2024',
    yearMain: '20',
    yearSub: '24',
    yearSide: 'right',
    title: 'D’signer Diamond Watches',
    titleGreen: true,
    leftText:
      'Combining modern ethical lab-grown diamonds with Swiss-inspired horology to deliver sophisticated luxury for discerning collectors.',
    centerImages: [
      {
        src: ASSET_DIR + 'x16.png',
        alt: "D'SIGNER Diamond Watches",
        maxWidth: 310,
      },
    ],
    rightText:
      'Launched Lab Grown Diamond Studded Watches as a new step to reach a more luxury audience, featuring models ranging up to Rs. 1,50,000/-.',
  },
  // 2025
  {
    id: '2025',
    yearMain: '20',
    yearSub: '25',
    yearSide: 'left',
    title: 'Time Corridor',
    leftText:
      'A latest feather in Designer World story. At Designer World it’s not about just the product we make but the aura we pass to our user with the time we design.',
    centerImages: [
      {
        src: ASSET_DIR + 'x12.png',
        alt: 'Time Corridor Luxury Boutique',
        maxWidth: 320,
      },
    ],
    rightText:
      'This retail Time Boutique is initiated to promote our home brands, D’SIGNER & ESCORT watches at a unique experience store showcasing our prime models, new launches, top sellers & special editions with an appealing display and aura. A gesture to connect & add some value to our happy watch buyers.',
  },
];
