const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../public/images/about us journey');
if (!fs.existsSync(baseDir)) {
  console.log('Journey directory does not exist:', baseDir);
  process.exit(1);
}

const entries = fs.readdirSync(baseDir);
for (const entry of entries) {
  const fullPath = path.join(baseDir, entry);
  const stat = fs.statSync(fullPath);
  if (stat.isDirectory()) {
    const files = fs.readdirSync(fullPath).filter(f => fs.statSync(path.join(fullPath, f)).isFile());
    console.log(`${entry}: ${files.join(', ')}`);
  }
}
