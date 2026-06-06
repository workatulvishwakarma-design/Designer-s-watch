const fs = require("fs");
const path = require("path");

const publicDir = path.resolve(__dirname, "..", "public");
const newImgDir = path.resolve(publicDir, "images", "new-img");
const outputMapFile = path.resolve(__dirname, "..", "src", "data", "physicalImageMap.json");

function scanForImages() {
  const map = {};
  let totalImagesCount = 0;

  function traverse(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else {
        const ext = path.extname(item).toLowerCase();
        if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
          totalImagesCount++;
          // Get relative path from public folder
          const relativePath = "/" + path.relative(publicDir, fullPath).replace(/\\/g, "/");
          
          // Get the base filename without extension to use as SKU
          const baseName = path.basename(item, ext).trim();
          const baseNameUpper = baseName.toUpperCase();

          // Save primary mapping
          if (!map[baseNameUpper]) {
            map[baseNameUpper] = [];
          }
          map[baseNameUpper].push(relativePath);
        }
      }
    }
  }

  traverse(newImgDir);
  // Also traverse public/images generally for any other root-level assets
  traverse(path.join(publicDir, "images"));

  console.log(`Scan completed. Found ${totalImagesCount} image assets.`);
  
  // Save the map to file
  fs.writeFileSync(outputMapFile, JSON.stringify(map, null, 2), "utf8");
  console.log(`Saved physical image map with ${Object.keys(map).length} unique SKU keys to ${outputMapFile}`);
}

scanForImages();
