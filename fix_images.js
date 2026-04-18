const fs = require('fs');
const path = require('path');

const productDataPath = path.join(__dirname, 'src/data/productData.ts');
let content = fs.readFileSync(productDataPath, 'utf8');

// Also process other files that might have broken paths
const filesToProcess = [
  productDataPath,
  path.join(__dirname, 'src/components/sections/HeroBanner.tsx'),
  path.join(__dirname, 'src/components/sections/HomeBrands.tsx'),
  path.join(__dirname, 'src/components/sections/LegacySection.tsx'),
  path.join(__dirname, 'src/components/sections/CraftSection.tsx'),
  path.join(__dirname, 'src/components/sections/about/DesignerJourney.tsx')
];

// Helper to find file by basename in the new-img directory
function findFileByBasename(dir, basename) {
    let result = null;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            result = findFileByBasename(fullPath, basename);
            if (result) break;
        } else if (file === basename || file === basename.replace('.png', ' (5).png') || file === basename.replace('.png', ' (2).png')) {
            result = fullPath;
            break;
        } else if (file.replace(/\s/g, '') === basename.replace(/\s/g, '')) {
            result = fullPath;
            break; 
        }
    }
    return result;
}

const newImgDir = path.join(__dirname, 'public/images/new-img');

filesToProcess.forEach(filePath => {
    if (!fs.existsSync(filePath)) return;
    let fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Fix DesignerJourney specific hardcoded 12.png
    if (filePath.includes('DesignerJourney.tsx')) {
        fileContent = fileContent.replace(/\/images\/12\.png/g, '/images/aboutImg2.png');
    }

    // Fix /images/new-img paths
    const regex = /\/images\/new-img\/[^"']+/g;
    fileContent = fileContent.replace(regex, (match) => {
        const absolutePath = path.join(__dirname, 'public', match);
        if (fs.existsSync(absolutePath)) {
            return match; // Path is correct
        }
        
        // Find by basename
        const basename = path.basename(match);
        const decodedBasename = decodeURIComponent(basename);
        
        // Search in model-1 and model-2
        let foundPath = findFileByBasename(newImgDir, decodedBasename);
        
        // If not found, try stripping off '.16G', ' (5)' etc.
        if (!foundPath) {
            const pureBase = decodedBasename.split('.')[0] + '.png';
            foundPath = findFileByBasename(newImgDir, pureBase);
        }

        if (foundPath) {
            // Convert back to absolute web path
            const webPath = foundPath.replace(__dirname, '').replace(/\\/g, '/').replace('/public', '');
            console.log(`Fixed: ${match} -> ${webPath}`);
            return webPath;
        }
        
        console.log(`Could not find replacement for: ${match}`);
        return match;
    });

    fs.writeFileSync(filePath, fileContent, 'utf8');
});

console.log("Image path fix completed.");
