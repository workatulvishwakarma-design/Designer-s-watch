// generate-final-image-spec.js
// Client-ready image size sheet
// About-Us (new editorial layout) + Pillar-2 (unchanged)

const fs = require("fs");
const path = require("path");

function escapeCsv(val) {
  const s = String(val ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function row(cells) {
  return cells.map(escapeCsv).join(",");
}

const HEADERS = [
  "No.",
  "Where on Page",
  "Image Size (W x H)",
  "Aspect Ratio",
  "How Many",
  "Important Note",
];

// ─────────────────────────────────────────────────────────────
// PAGE 1 — ABOUT US  (new editorial / magazine style layout)
//
// Based on reference layout:
//  ┌──────────────────────────────────────────────────┐
//  │  NAV                                              │
//  │  [INTRO TITLE + small author avatar photo]        │
//  │                                                   │
//  │  ┌──────────── HERO IMAGE (full width) ─────────┐ │
//  │  └──────────────────────────────────────────────┘ │
//  │                                                   │
//  │  BIG YEAR   │  ┌── SECTION IMAGE (right half) ─┐ │
//  │  TEXT       │  └─────────────────────────────── ┘ │
//  │                                                   │
//  │  ┌── SECTION IMAGE (left half) ──┐  │  BIG YEAR  │
//  │  └────────────────────────────── ┘  │  TEXT      │
//  │                                                   │
//  │  [TWO COLUMNS TEXT]   ┌─ PORTRAIT IMAGE (right)─┐│
//  │                       └─────────────────────────┘│
//  └──────────────────────────────────────────────────┘
// ─────────────────────────────────────────────────────────────

const aboutUs = [
  {
    no: 1,
    where: "Author / Brand Avatar (Small Circle, top intro area)",
    size: "160 x 160 px",
    ratio: "1:1  (Square / Circle)",
    count: "1 image",
    note: "Circular crop. Face or logo must be centered. No text near edges.",
  },
  {
    no: 2,
    where: "Hero Image — Full Width Banner (below intro text)",
    size: "1920 x 780 px",
    ratio: "~21:9  (Very wide landscape)",
    count: "1 image",
    note: "Full page width. Keep main subject in the center. Landscape only.",
  },
  {
    no: 3,
    where: "Section Image — Right Side (next to large year text, left half empty)",
    size: "900 x 580 px",
    ratio: "~16:10  (Landscape)",
    count: "1 image per section",
    note: "Fills the right ~55% of the page. Keep subject in center. Repeats for each year block.",
  },
  {
    no: 4,
    where: "Section Image — Left Side (next to large year text on right)",
    size: "900 x 580 px",
    ratio: "~16:10  (Landscape)",
    count: "1 image per section",
    note: "Fills the left ~55% of the page. Keep subject in center. Repeats for each year block.",
  },
  {
    no: 5,
    where: "Small Portrait Image — Bottom Section (right column)",
    size: "480 x 600 px",
    ratio: "4:5  (Portrait)",
    count: "1 image per section",
    note: "Portrait orientation. Keep subject in upper-center area. Avoid cropped heads.",
  },
];

// ─────────────────────────────────────────────────────────────
// PAGE 2 — PILLAR-2  (Core Divisions — Carousel, unchanged)
// ─────────────────────────────────────────────────────────────

const pillar2 = [
  {
    no: 1,
    where: "Division Card Image — Desktop Carousel",
    size: "576 x 360 px",
    ratio: "16:10  (Landscape)",
    count: "7 images  (1 per division)",
    note: "Wide landscape. Keep subject centered left-to-right and top-to-bottom.",
  },
  {
    no: 2,
    where: "Division Card Thumbnail — Mobile View",
    size: "224 x 224 px",
    ratio: "1:1  (Square)",
    count: "Same 7 image files — auto square-cropped on mobile",
    note: "Same file as above. Make sure the key subject is visible in the center square area.",
  },
];

// ─── BUILD CSV ──────────────────────────────────────────────

const lines = [];

// Section 1
lines.push(row(["PAGE: About Us  (New Editorial / Magazine Layout)", "", "", "", "", ""]));
lines.push(row(HEADERS));
aboutUs.forEach((r) => lines.push(row([r.no, r.where, r.size, r.ratio, r.count, r.note])));

lines.push(row(["", "", "", "", "", ""]));

// Section 2
lines.push(row(["PAGE: Pillar-2  (Our Core Divisions — same as before)", "", "", "", "", ""]));
lines.push(row(HEADERS));
pillar2.forEach((r) => lines.push(row([r.no, r.where, r.size, r.ratio, r.count, r.note])));

lines.push(row(["", "", "", "", "", ""]));

// Global note
lines.push(row(["GLOBAL RULE", "", "", "", "", ""]));
lines.push(row([
  "All images are automatically cropped to fill their box (object-fit: cover).",
  "Always keep the main subject in the CENTER of the photo.",
  "Never place important content near the edges — it may get cut.",
  "All sizes listed are already 2× screen size for sharp/retina display.",
  "",
  "",
]));

const csv = lines.join("\r\n");
const outputPath = path.join(__dirname, "..", "Image-Sizes_AboutUs_Pillar2_FINAL.csv");
fs.writeFileSync(outputPath, csv, "utf8");

console.log("✅ File saved:", outputPath);
