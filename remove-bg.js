const Jimp = require('jimp');

async function processImage() {
  console.log('Loading image...');
  const img = await Jimp.read('public/images/doublewatch.png');
  const w = img.bitmap.width;
  const h = img.bitmap.height;
  
  console.log(`Image loaded. Size: ${w}x${h}`);

  // Threshold for considering a pixel "black"
  const threshold = 15; 
  let removedCounts = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (w * y + x) << 2;
      const r = img.bitmap.data[idx];
      const g = img.bitmap.data[idx + 1];
      const b = img.bitmap.data[idx + 2];
      
      // If the pixel is near-black, make it completely transparent
      if (r <= threshold && g <= threshold && b <= threshold) {
        img.bitmap.data[idx + 3] = 0; // Alpha to 0
        removedCounts++;
      } else if (r <= threshold + 20 && g <= threshold + 20 && b <= threshold + 20) {
        // Soft anti-aliasing edge
        const dist = Math.max(r, g, b) - threshold;
        const alpha = Math.floor((dist / 20) * 255);
        if (alpha < img.bitmap.data[idx + 3]) {
             img.bitmap.data[idx + 3] = alpha;
        }
      }
    }
  }

  console.log(`Removed ${removedCounts} black background pixels... Saving...`);
  await img.writeAsync('public/images/doublewatch-nobg.png');
  console.log('Saved as doublewatch-nobg.png');
}

processImage().catch(console.error);
