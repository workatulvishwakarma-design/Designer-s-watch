// generate-image-spec.js
// Generates a CSV with all image sizes for about-2 and pillar-2 pages

const fs = require("fs");
const path = require("path");

// ─── ABOUT-2 PAGE IMAGE DATA ───────────────────────────────────────────────
// Layout: 3-column grid per milestone card
// image1 → Left column: small secondary image — rendered at max-width 260px, height 200px
// image2 → Right column: main feature image — rendered at full column width (~360px), height 280px
// Hero banner image → full viewport width (100vw), height 80vh (~560–700px typically)

const about2Images = [
  // Hero Banner
  {
    no: 1,
    page: "About-2",
    section: "Hero Banner",
    role: "Hero Banner (Full Width)",
    imagePath: "/images/about-2.png",
    displayWidthPx: "1920px (full screen)",
    displayHeightPx: "80vh ≈ 700px",
    recommendedSizePx: "1920 × 900px",
    aspectRatio: "16:9 (wider)",
    notes: "objectFit: cover, objectPosition: center. Use high-res JPG/WebP. Text overlay present — keep subject centered.",
  },

  // Milestone image1 (LEFT column: small secondary image, max-width 260px, height 200px)
  { no: 2, page: "About-2", section: "Milestone 01 — 1940s", role: "Left Column Small Image", imagePath: "/images/about us journey/1940s — The Beginning/about-img1_1.webp", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "objectFit: cover. Rendered at max 260px wide. 2× for retina." },
  { no: 3, page: "About-2", section: "Milestone 01 — 1940s", role: "Right Column Main Image", imagePath: "/images/about us journey/1960- The 2nd Generation/WhatsApp Image 2026-04-27 at 10.50.37 AM (1).jpeg", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "objectFit: cover. Full right-column width ~360px at 1200px container. 2× for retina." },

  { no: 4, page: "About-2", section: "Milestone 02 — 1960s", role: "Left Column Small Image", imagePath: "/images/about us journey/1960- The 2nd Generation/WhatsApp Image 2026-04-27 at 10.50.37 AM.jpeg", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "objectFit: cover." },
  { no: 5, page: "About-2", section: "Milestone 02 — 1960s", role: "Right Column Main Image", imagePath: "/images/about us journey/1960- The 2nd Generation/WhatsApp Image 2026-04-13 at 8.14.16 AM (1).jpeg", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "objectFit: cover." },

  { no: 6, page: "About-2", section: "Milestone 03 — 1976", role: "Left Column Small Image", imagePath: "/images/about us journey/1976 - Nagpal Bombay/IMG_0216.jpeg", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "objectFit: cover." },
  { no: 7, page: "About-2", section: "Milestone 03 — 1976", role: "Right Column Main Image", imagePath: "/images/new-content/pillars/Corporate B2B/34.jpg", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "objectFit: cover." },

  { no: 8, page: "About-2", section: "Milestone 04 — 1991", role: "Left Column Small Image", imagePath: "/images/about us journey/1991 — A Brand is Born/Backup_of_dq designer old logo-13.png", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "Logo/PNG — use transparent PNG or white bg. objectFit: cover." },
  { no: 9, page: "About-2", section: "Milestone 04 — 1991", role: "Right Column Main Image", imagePath: "/images/about us journey/1991 — A Brand is Born/1 (7).jpg", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "objectFit: cover." },

  { no: 10, page: "About-2", section: "Milestone 05 — 1992", role: "Left Column Small Image", imagePath: "/images/about us journey/1992 - Voltage Batteries/IMG_0205.jpeg", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "objectFit: cover." },
  { no: 11, page: "About-2", section: "Milestone 05 — 1992", role: "Right Column Main Image", imagePath: "/images/new-content/pillars/Corporate B2B/4.jpg", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "objectFit: cover." },

  { no: 12, page: "About-2", section: "Milestone 06 — 1995", role: "Left Column Small Image", imagePath: "/images/about us journey/1995 — Style for All/Escort Logo 1995.png", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "Logo PNG. objectFit: cover." },
  { no: 13, page: "About-2", section: "Milestone 06 — 1995", role: "Right Column Main Image", imagePath: "/images/about us journey/1995 — Style for All/IMG_7789.jpeg", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "objectFit: cover." },

  { no: 14, page: "About-2", section: "Milestone 07 — 1998", role: "Left Column Small Image", imagePath: "/images/watches/ESCORT POSTER.../Escort -1.jpg", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "objectFit: cover." },
  { no: 15, page: "About-2", section: "Milestone 07 — 1998", role: "Right Column Main Image", imagePath: "/images/watches/ESCORT POSTER.../Escort.jpg", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "objectFit: cover." },

  { no: 16, page: "About-2", section: "Milestone 08 — 2004", role: "Left Column Small Image", imagePath: "/images/about us journey/1991 — A Brand is Born/2 (6).jpg", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "objectFit: cover." },
  { no: 17, page: "About-2", section: "Milestone 08 — 2004", role: "Right Column Main Image", imagePath: "/images/new-img/pillars/4.jpg", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "objectFit: cover." },

  { no: 18, page: "About-2", section: "Milestone 09 — 2007", role: "Left Column Small Image", imagePath: "/images/about us journey/2007 - Daniel Klein/daniel klein exclusive-13.png", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "Logo/PNG. objectFit: cover." },
  { no: 19, page: "About-2", section: "Milestone 09 — 2007", role: "Right Column Main Image", imagePath: "/images/about us journey/1991 — A Brand is Born/3 (3).jpg", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "objectFit: cover." },

  { no: 20, page: "About-2", section: "Milestone 10 — 2010", role: "Left Column Small Image", imagePath: "/images/watches/ESCORT POSTER.../Escort-2.jpg", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "objectFit: cover." },
  { no: 21, page: "About-2", section: "Milestone 10 — 2010", role: "Right Column Main Image", imagePath: "/images/new-content/home2-club-escort-hand.png", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "objectFit: cover." },

  { no: 22, page: "About-2", section: "Milestone 11 — 2015", role: "Left Column Small Image", imagePath: "/images/about us journey/2015 — Beyond Our Own Brand/WhatsApp Image 2026-04-04 at 4.14.22 PM (1).jpeg", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "objectFit: cover." },
  { no: 23, page: "About-2", section: "Milestone 11 — 2015", role: "Right Column Main Image", imagePath: "/images/watches/ESCORT POSTER.../1 (4).jpg", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "objectFit: cover." },

  { no: 24, page: "About-2", section: "Milestone 12 — 2017", role: "Left Column Small Image", imagePath: "/images/watches/ESCORT POSTER.../824RGFS.16G.jpg", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "objectFit: cover." },
  { no: 25, page: "About-2", section: "Milestone 12 — 2017", role: "Right Column Main Image", imagePath: "/images/threeimg1-nobg.png", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "objectFit: cover." },

  { no: 26, page: "About-2", section: "Milestone 13 — 2020", role: "Left Column Small Image", imagePath: "/images/about us journey/1991 — A Brand is Born/5 (2).jpg", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "objectFit: cover." },
  { no: 27, page: "About-2", section: "Milestone 13 — 2020", role: "Right Column Main Image", imagePath: "/images/threeimg2-nobg.png", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "objectFit: cover." },

  { no: 28, page: "About-2", section: "Milestone 14 — 2022", role: "Left Column Small Image", imagePath: "/images/about us journey/2022 - Designer world Brands/DW-BRANDS-LOGO-B.png", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "Logo PNG. objectFit: cover." },
  { no: 29, page: "About-2", section: "Milestone 14 — 2022", role: "Right Column Main Image", imagePath: "/images/about us journey/2022 - Designer world Brands/DW-BRANDS-LOGO-White (1).png", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "Logo PNG on dark bg. objectFit: cover." },

  { no: 30, page: "About-2", section: "Milestone 15 — 2024", role: "Left Column Small Image", imagePath: "/images/about us journey/2024 - Designer Lab Grown Diamond.../746GM.2L.jpg", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "objectFit: cover. Product photo — ensure no background cut." },
  { no: 31, page: "About-2", section: "Milestone 15 — 2024", role: "Right Column Main Image", imagePath: "/images/about us journey/2024 - Designer Lab Grown Diamond.../810GM.2L.jpg", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "objectFit: cover. Product photo." },

  { no: 32, page: "About-2", section: "Milestone 16 — 2025", role: "Left Column Small Image", imagePath: "/images/about us journey/2025 - Time Corridor/1A1A8511.JPG", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "objectFit: cover." },
  { no: 33, page: "About-2", section: "Milestone 16 — 2025", role: "Right Column Main Image", imagePath: "/images/about us journey/2025 - Time Corridor/DSIGNER TIME CORRIDOR LOGO final.png", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "Logo PNG. objectFit: cover." },

  { no: 34, page: "About-2", section: "Milestone 17 — Today", role: "Left Column Small Image", imagePath: "/images/today1.png", displayWidthPx: "260px", displayHeightPx: "200px", recommendedSizePx: "520 × 400px", aspectRatio: "1.3:1", notes: "objectFit: cover." },
  { no: 35, page: "About-2", section: "Milestone 17 — Today", role: "Right Column Main Image", imagePath: "/images/about us journey/2024 - Designer Lab Grown Diamond.../834GM.16L.jpg", displayWidthPx: "~360px", displayHeightPx: "280px", recommendedSizePx: "720 × 560px", aspectRatio: "1.29:1", notes: "objectFit: cover. Product photo." },
];

// ─── PILLAR-2 PAGE IMAGE DATA ──────────────────────────────────────────────
// Layout: Desktop — card carousel. Each card = 320px wide.
//   Card image area: margin 16px each side → inner width ~288px, aspect-ratio 16/10 → height ~180px
// Mobile — thumbnail image: w-24 h-24 = 96×96px (sm: 112×112px)

const pillar2Images = [
  // Desktop Card Images (aspect-ratio: 16/10, card width 320px, inner 288px)
  { no: 36, page: "Pillar-2", section: "Division 01 — Nagpals Bombay", role: "Desktop Card Image", imagePath: "/images/new-content/pillars/Nagpal_s Bombay/ng-bombay.jpg", displayWidthPx: "288px", displayHeightPx: "180px (16:10)", recommendedSizePx: "576 × 360px", aspectRatio: "16:10", notes: "Desktop card. objectFit: cover. Card is 320px wide with 16px margin each side. 2× for retina." },
  { no: 37, page: "Pillar-2", section: "Division 01 — Nagpals Bombay", role: "Mobile Thumbnail", imagePath: "/images/new-content/pillars/Nagpal_s Bombay/ng-bombay.jpg", displayWidthPx: "96–112px", displayHeightPx: "96–112px", recommendedSizePx: "224 × 224px", aspectRatio: "1:1 (Square)", notes: "Mobile only. objectFit: cover. w-24 (96px) on mobile, sm:w-28 (112px). Square crop." },

  { no: 38, page: "Pillar-2", section: "Division 02 — Corporate B2B", role: "Desktop Card Image", imagePath: "/images/new-content/pillars/Corporate B2B/2a.jpg", displayWidthPx: "288px", displayHeightPx: "180px (16:10)", recommendedSizePx: "576 × 360px", aspectRatio: "16:10", notes: "Desktop card. objectFit: cover." },
  { no: 39, page: "Pillar-2", section: "Division 02 — Corporate B2B", role: "Mobile Thumbnail", imagePath: "/images/new-content/pillars/Corporate B2B/2a.jpg", displayWidthPx: "96–112px", displayHeightPx: "96–112px", recommendedSizePx: "224 × 224px", aspectRatio: "1:1 (Square)", notes: "Mobile only. Square crop." },

  { no: 40, page: "Pillar-2", section: "Division 03 — OEM / Private Label", role: "Desktop Card Image", imagePath: "/images/new-content/pillars/OEM- ODM/WhatsApp Image 2026-04-04 at 4.14.22 PM (1).jpeg", displayWidthPx: "288px", displayHeightPx: "180px (16:10)", recommendedSizePx: "576 × 360px", aspectRatio: "16:10", notes: "Desktop card. objectFit: cover." },
  { no: 41, page: "Pillar-2", section: "Division 03 — OEM / Private Label", role: "Mobile Thumbnail", imagePath: "/images/new-content/pillars/OEM- ODM/WhatsApp Image 2026-04-04 at 4.14.22 PM (1).jpeg", displayWidthPx: "96–112px", displayHeightPx: "96–112px", recommendedSizePx: "224 × 224px", aspectRatio: "1:1 (Square)", notes: "Mobile only. Square crop." },

  { no: 42, page: "Pillar-2", section: "Division 04 — D'SIGNER • ESCORT", role: "Desktop Card Image", imagePath: "/images/new-img/pillars/8.jpg", displayWidthPx: "288px", displayHeightPx: "180px (16:10)", recommendedSizePx: "576 × 360px", aspectRatio: "16:10", notes: "Desktop card. objectFit: cover." },
  { no: 43, page: "Pillar-2", section: "Division 04 — D'SIGNER • ESCORT", role: "Mobile Thumbnail", imagePath: "/images/new-img/pillars/8.jpg", displayWidthPx: "96–112px", displayHeightPx: "96–112px", recommendedSizePx: "224 × 224px", aspectRatio: "1:1 (Square)", notes: "Mobile only. Square crop." },

  { no: 44, page: "Pillar-2", section: "Division 05 — Exports & Global Trade", role: "Desktop Card Image", imagePath: "/images/new-content/pillars/Exports/WhatsApp Image 2026-04-15 at 11.30.22 AM.jpeg", displayWidthPx: "288px", displayHeightPx: "180px (16:10)", recommendedSizePx: "576 × 360px", aspectRatio: "16:10", notes: "Desktop card. objectFit: cover." },
  { no: 45, page: "Pillar-2", section: "Division 05 — Exports & Global Trade", role: "Mobile Thumbnail", imagePath: "/images/new-content/pillars/Exports/WhatsApp Image 2026-04-15 at 11.30.22 AM.jpeg", displayWidthPx: "96–112px", displayHeightPx: "96–112px", recommendedSizePx: "224 × 224px", aspectRatio: "1:1 (Square)", notes: "Mobile only. Square crop." },

  { no: 46, page: "Pillar-2", section: "Division 06 — Time Corridor", role: "Desktop Card Image", imagePath: "/images/new-content/pillars/Time Corridor/time corriddor/1A1A8499.JPG", displayWidthPx: "288px", displayHeightPx: "180px (16:10)", recommendedSizePx: "576 × 360px", aspectRatio: "16:10", notes: "Desktop card. objectFit: cover." },
  { no: 47, page: "Pillar-2", section: "Division 06 — Time Corridor", role: "Mobile Thumbnail", imagePath: "/images/new-content/pillars/Time Corridor/time corriddor/1A1A8499.JPG", displayWidthPx: "96–112px", displayHeightPx: "96–112px", recommendedSizePx: "224 × 224px", aspectRatio: "1:1 (Square)", notes: "Mobile only. Square crop." },

  { no: 48, page: "Pillar-2", section: "Division 07 — Batteries & Components", role: "Desktop Card Image", imagePath: "/images/new-content/pillars/Batteries/batteries-banner.webp", displayWidthPx: "288px", displayHeightPx: "180px (16:10)", recommendedSizePx: "576 × 360px", aspectRatio: "16:10", notes: "Desktop card. objectFit: cover." },
  { no: 49, page: "Pillar-2", section: "Division 07 — Batteries & Components", role: "Mobile Thumbnail", imagePath: "/images/new-content/pillars/Batteries/batteries-banner.webp", displayWidthPx: "96–112px", displayHeightPx: "96–112px", recommendedSizePx: "224 × 224px", aspectRatio: "1:1 (Square)", notes: "Mobile only. Square crop." },
];

const allImages = [...about2Images, ...pillar2Images];

// ─── BUILD CSV ────────────────────────────────────────────────────────────
const headers = [
  "No.",
  "Page",
  "Section / Milestone",
  "Image Role",
  "File Path (public/)",
  "Display Width (px)",
  "Display Height (px)",
  "Recommended Upload Size",
  "Aspect Ratio",
  "Notes (Safe Crop / objectFit)",
];

function escapeCsv(val) {
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

const rows = allImages.map((img) => [
  img.no,
  img.page,
  img.section,
  img.role,
  img.imagePath,
  img.displayWidthPx,
  img.displayHeightPx,
  img.recommendedSizePx,
  img.aspectRatio,
  img.notes,
].map(escapeCsv).join(","));

const csvContent = [headers.map(escapeCsv).join(","), ...rows].join("\r\n");

const outputPath = path.join(__dirname, "..", "Image-Size-Spec_About2_Pillar2.csv");
fs.writeFileSync(outputPath, csvContent, "utf8");

console.log("✅ CSV written to:", outputPath);
console.log(`   Total images documented: ${allImages.length}`);
console.log(`   About-2 images: ${about2Images.length}`);
console.log(`   Pillar-2 images: ${pillar2Images.length}`);
