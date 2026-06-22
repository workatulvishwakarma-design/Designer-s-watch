import { prisma } from '../src/lib/db';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

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

async function seedProducts() {
  console.log("Seeding collections and products...");
  const jsonPath = path.join(process.cwd(), 'src/designer_world_products_grouped.json');
  if (!fs.existsSync(jsonPath)) {
    console.error("Grouped products JSON not found at:", jsonPath);
    return;
  }
  const fileContent = fs.readFileSync(jsonPath, 'utf-8');
  const groupedData: Record<string, LegacyVariant[]> = JSON.parse(fileContent);

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

    for (const v of variants) {
      if (!v.column_1) continue;

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
          
          movement: v.column_19 || null,
          glass: v.column_23 || null,
          caseSize: v.column_8 ? v.column_8.toString() : null,
          caseThickness: v.column_10 ? v.column_10.toString() : null,
          strapMaterial: v.column_14 || null,
          waterResistance: v.column_21 || null,
          
          specifications: {
            dialSize: v.column_7,
            bandSize: v.column_9,
            caseMaterial: v.column_17,
          }
        }
      });

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

      if (v.gallery?.primary) {
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
  console.log("Products seeding completed successfully!");
}

async function seedUsers() {
  console.log("Seeding Demo Users...");
  const passwordHash = bcrypt.hashSync("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@designerworld.com' },
    update: {
      passwordHash: passwordHash,
      role: 'ADMIN',
    },
    create: {
      name: 'Maison Administrator',
      email: 'admin@designerworld.com',
      passwordHash: passwordHash,
      role: 'ADMIN',
    }
  });
  console.log(`Admin user created: ${admin.email}`);

  const customer = await prisma.user.upsert({
    where: { email: 'customer@designerworld.com' },
    update: {
      passwordHash: passwordHash,
      role: 'CUSTOMER',
    },
    create: {
      name: 'VIP Guest Persona',
      email: 'customer@designerworld.com',
      passwordHash: passwordHash,
      role: 'CUSTOMER',
    }
  });
  console.log(`VIP Customer user created: ${customer.email}`);
  console.log("Demo Users Seed Complete!");
}

async function seedPages() {
  console.log("Seeding Dynamic Pages...");
  
  await prisma.page.upsert({
    where: { slug: 'faq' },
    update: {},
    create: {
      slug: 'faq',
      title: 'Frequently Asked Questions',
      content: `
        <div class="space-y-8">
          <section>
            <h3 class="text-xl font-semibold mb-3">Is shipping free for luxury timepieces?</h3>
            <p class="opacity-70">Yes, we provide complimentary insured shipping for all orders within India. Every timepiece is shipped in a secure, tamper-proof luxury presentation box.</p>
          </section>
          <section>
            <h3 class="text-xl font-semibold mb-3">How do I verify the authenticity of my watch?</h3>
            <p class="opacity-70">All watches purchased from Designer World come with an official brand warranty card, stamped and dated, along with a certificate of authenticity. Each watch has a unique serial number engraved on the case back.</p>
          </section>
          <section>
            <h3 class="text-xl font-semibold mb-3">What is the return policy?</h3>
            <p class="opacity-70">We offer a 7-day return and exchange policy for unworn watches in original condition with all seals, tags, and packaging intact. Please refer to our Return & Cancellation Policy page for detailed instructions.</p>
          </section>
          <section>
            <h3 class="text-xl font-semibold mb-3">Does my timepiece come with a warranty?</h3>
            <p class="opacity-70">Yes, every timepiece is covered by a 1 to 2-year international manufacturer warranty. The warranty covers manufacturing defects and movement issues. It does not cover wear and tear, glass, or strap damage.</p>
          </section>
        </div>
      `,
      isActive: true,
      seoTitle: 'Frequently Asked Questions | Designer World',
      seoDescription: 'Find answers to common questions about shipping, warranty, authenticity, and returns for our luxury timepieces.'
    }
  });

  await prisma.page.upsert({
    where: { slug: 'service' },
    update: {},
    create: {
      slug: 'service',
      title: 'Watch Service & Care',
      content: `
        <div class="space-y-8">
          <p class="opacity-80 leading-relaxed text-lg">A luxury timepiece is a lifetime investment. To ensure its precision and longevity, we recommend professional maintenance and care.</p>
          <section>
            <h3 class="text-xl font-semibold mb-3">Authorized Service Centers</h3>
            <p class="opacity-70">Our dedicated service network consists of state-of-the-art facilities equipped with original manufacturer tools and testing instruments. Only certified watchmakers handle your timepieces.</p>
          </section>
          <section>
            <h3 class="text-xl font-semibold mb-3">Recommended Service Intervals</h3>
            <p class="opacity-70">We recommend a complete service every 3 to 5 years. This includes complete movement disassembly, cleaning, lubrication, water-resistance gasket replacement, and timing calibration.</p>
          </section>
          <section>
            <h3 class="text-xl font-semibold mb-3">Daily Care Tips</h3>
            <ul class="list-disc pl-5 space-y-2 opacity-70">
              <li>Keep your watch clean by wiping it with a soft cloth.</li>
              <li>Always ensure the crown is fully screwed down before exposure to water.</li>
              <li>Avoid exposing your timepiece to strong magnetic fields (speakers, MRI machines, laptop chargers).</li>
              <li>Do not wear your watch during extreme sports or hot showers/saunas.</li>
            </ul>
          </section>
        </div>
      `,
      isActive: true,
      seoTitle: 'Watch Service & Care | Designer World',
      seoDescription: 'Learn about watch service intervals, authorized service centers, and daily care tips to maintain your luxury timepieces.'
    }
  });

  console.log("Dynamic Pages Seeding Completed successfully!");
}

async function main() {
  console.log("Starting Unified Database Seed...");
  await seedProducts();
  await seedUsers();
  await seedPages();
  console.log("Unified Database Seed Completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
