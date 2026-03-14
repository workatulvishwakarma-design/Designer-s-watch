const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');

async function processImage(inputPath, outputPath) {
  console.log(`Processing: ${inputPath}`);
  try {
    const blob = await removeBackground(inputPath);
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync(outputPath, buffer);
    console.log(`Saved transparent image to: ${outputPath}`);
  } catch (err) {
    console.error(`Failed to process ${inputPath}:`, err);
  }
}

async function main() {
  await processImage('public/images/threeimg1.png', 'public/images/threeimg1-nobg.png');
  await processImage('public/images/threeimg2.png', 'public/images/threeimg2-nobg.png');
  await processImage('public/images/threeimg3.png', 'public/images/threeimg3-nobg.png');
  console.log("All done!");
}

main();
