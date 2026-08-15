// generate-simple-image-spec.js
// Simple, client-friendly image size reference sheet

const fs = require("fs");
const path = require("path");

// ─── ABOUT-2 PAGE ─────────────────────────────────────────────────────────
// The page has a Hero Banner + 17 milestone cards
// Each milestone card has 2 image boxes (same size for all 17)

const about2 = [
  {
    no: 1,
    imageBox: "Hero Banner",
    requiredSize: "1920 x 900 px",
    howMany: "1 image",
    tip: "Keep main subject centered. Wide landscape photo.",
  },
  {
    no: 2,
    imageBox: "Milestone Card — Small Image (Left side)",
    requiredSize: "520 x 400 px",
    howMany: "17 images (one per year)",
    tip: "Keep subject centered. Portrait or square photos work well.",
  },
  {
    no: 3,
    imageBox: "Milestone Card — Main Image (Right side)",
    requiredSize: "720 x 560 px",
    howMany: "17 images (one per year)",
    tip: "Keep subject centered. Landscape or square photos work well.",
  },
];

// ─── PILLAR-2 PAGE ─────────────────────────────────────────────────────────
// The page has 7 division cards in a carousel
// Each card has 1 image box (same size for all 7)

const pillar2 = [
  {
    no: 1,
    imageBox: "Division Card Image (Desktop)",
    requiredSize: "576 x 360 px",
    howMany: "7 images (one per division)",
    tip: "Wide landscape format. Keep subject centered.",
  },
  {
    no: 2,
    imageBox: "Division Card Thumbnail (Mobile)",
    requiredSize: "224 x 224 px",
    howMany: "7 images (same files as above, auto-cropped square)",
    tip: "Same image file used. Keep subject in center square area.",
  },
];

// ─── BUILD CSV ─────────────────────────────────────────────────────────────

function escapeCsv(val) {
  const s = String(val ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function buildSection(title, rows) {
  const header = ["No.", "Image Box / Location", "Required Image Size", "How Many", "Tip for Photographer / Designer"];
  const lines = [];
  lines.push([title, "", "", "", ""].map(escapeCsv).join(","));
  lines.push(header.map(escapeCsv).join(","));
  rows.forEach((r) => {
    lines.push([r.no, r.imageBox, r.requiredSize, r.howMany, r.tip].map(escapeCsv).join(","));
  });
  return lines.join("\r\n");
}

const csv = [
  buildSection("PAGE: About-2  (Our History / Timeline)", about2),
  ",,,,,",
  buildSection("PAGE: Pillar-2  (Our Core Divisions)", pillar2),
  ",,,,,",
  [
    "IMPORTANT NOTE,,,,,",
    '"All sizes are in pixels (px). Images will be automatically cropped to fit the box — always keep the main subject in the center of the photo to avoid any part being cut off.",,,,,',
    '"For best quality on retina / high-resolution screens — the sizes listed above are already 2× the screen size (so no blurriness).",,,,,',
  ].join("\r\n"),
].join("\r\n");

const outputPath = path.join(__dirname, "..", "Image-Sizes_About2_Pillar2.csv");
fs.writeFileSync(outputPath, csv, "utf8");

console.log("✅ Done! File saved to:", outputPath);
