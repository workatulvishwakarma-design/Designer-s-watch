import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Map your original JSON columns to a readable format if needed
// or just parse the 'designer_world_products_grouped.json' structure directly.
interface LegacyVariant {
  column_1: string; // SKU
  column_3: number; // Price
  column_5: string; // Dial Color
  column_6: string; // Strap Color
  column_7: number; // Dial Size
  column_8: number; // Case Size
  column_9: string; // Band Size
  column_10: number; // Case Thickness
  column_14: string; // Strap Material
  column_16: string; // Gender
  column_17: string; // Case Material
  column_19: string; // Movement
  column_20: string; // Description
  column_21: string; // Water Resistance
  column_23: string; // Glass Material
  modelFamily: string;
  slug: string; // Used as family slug
  gallery?: {
    primary?: string;
    hover?: string;
    detail?: string[];
  };
}

async function main() {
  console.log("Starting Database Seed...");
  
  const jsonPath = path.join(process.cwd(), 'src/designer_world_products_grouped.json');
  const fileContent = fs.readFileSync(jsonPath, 'utf-8');
  const groupedData: Record<string, LegacyVariant[]> = JSON.parse(fileContent);

  // 1. Create a Default Collection for all items without a mapped collection
  const defaultCollection = await prisma.collection.upsert({
    where: { slug: 'heritage' },
    update: {},
    create: {
      name: 'Heritage Collection',
      slug: 'heritage',
      description: 'The foundation of Designer World.',
      gender: 'Unisex',
      identity: 'CLASSIC',
      visibility: true,
    }
  });

  console.log("Default collection created.");

  for (const [familyName, variants] of Object.entries(groupedData)) {
    if (!variants || variants.length === 0 || familyName === "Image" || familyName === "None") continue;

    const baseVariant = variants[0];
    const familySlug = baseVariant.slug || familyName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    // Create or Update Family
    const family = await prisma.productFamily.upsert({
      where: { slug: familySlug },
      update: {
        description: baseVariant.column_20 || `${familyName} series timepieces.`,
      },
      create: {
        name: familyName,
        slug: familySlug,
        description: baseVariant.column_20 || `${familyName} series timepieces.`,
        gender: baseVariant.column_16 || 'Unisex',
        collectionId: defaultCollection.id,
      }
    });

    console.log(`Processing Family: ${familyName} (${variants.length} variants)`);

    // Insert Variants
    for (const v of variants) {
      if (!v.column_1) continue; // Skip if no SKU

      const variantSku = v.column_1.toString();
      
      const variant = await prisma.productVariant.upsert({
        where: { sku: variantSku },
        update: {
          price: v.column_3 || 0,
        },
        create: {
          familyId: family.id,
          sku: variantSku,
          price: v.column_3 || 0,
          color: v.column_5 || null,
          dialColor: v.column_5 || null,
          strapColor: v.column_6 || null,
          
          // Core Specs
          movement: v.column_19 || null,
          glass: v.column_23 || null,
          caseSize: v.column_8 ? v.column_8.toString() : null,
          caseThickness: v.column_10 ? v.column_10.toString() : null,
          strapMaterial: v.column_14 || null,
          waterResistance: v.column_21 || null,
          
          // Overflow Specs into JSON
          specifications: {
            dialSize: v.column_7,
            bandSize: v.column_9,
            caseMaterial: v.column_17,
          }
        }
      });

      // Insert Default Inventory
      await prisma.inventory.upsert({
        where: { sku: variantSku },
        update: {},
        create: {
          variantId: variant.id,
          sku: variantSku,
          stock: 10,
          availabilityStatus: 'IN_STOCK'
        }
      });

      // Handle Images (Mocking one SKU image if gallery exists)
      if (v.gallery?.primary) {
        // Upsert is tricky without unique fields for images, so we create if it doesn't exist
        const existingImages = await prisma.variantImage.findFirst({
          where: { variantId: variant.id, url: v.gallery.primary }
        });
        
        if (!existingImages) {
          await prisma.variantImage.create({
            data: {
              variantId: variant.id,
              url: v.gallery.primary,
              type: 'SKU'
            }
          });
        }
      }
    }
  }

  console.log("Seed completed successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
