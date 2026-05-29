import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process...');
  
  const jsonPath = path.join(process.cwd(), 'src/data/designer_world_products_grouped.json');
  const fileData = fs.readFileSync(jsonPath, 'utf8');
  const rawData = JSON.parse(fileData);

  let successCount = 0;
  let skipCount = 0;

  console.log(`Found ${rawData.length} products in JSON.`);

  for (const item of rawData) {
    if (!item.sku || !item.price || !item.name) {
      skipCount++;
      continue;
    }

    // Try to find if product already exists by slug or sku
    // We will use sku as slug fallback
    const slug = item.slug || item.sku.toLowerCase();
    
    const existing = await prisma.product.findUnique({
      where: { slug }
    });

    if (existing) {
      console.log(`Product ${slug} already exists. Skipping...`);
      skipCount++;
      continue;
    }

    try {
      await prisma.product.create({
        data: {
          slug: slug,
          name: item.name || item.sku,
          description: item.description || "Premium Designer World Timepiece",
          price: item.price,
          comparePrice: item.mrp || item.price,
          msrp: item.mrp || item.price,
          status: "ACTIVE",
          featured: false,
          movementType: item.specifications?.movement || null,
          caseSize: item.specifications?.caseSize || null,
          strapDetails: item.specifications?.strap || null,
          specifications: item.specifications ? JSON.stringify(item.specifications) : null,
          inventory: {
            create: {
              sku: item.sku,
              stock: 10, // Default stock
              lowStockThreshold: 3
            }
          }
        } as any // using any to bypass some missing schema fields if any, will adjust
      });
      successCount++;
    } catch (e) {
      console.error(`Failed to insert ${item.sku}:`, e);
      skipCount++;
    }
  }

  console.log(`Seed complete. Added ${successCount} products. Skipped ${skipCount}.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
