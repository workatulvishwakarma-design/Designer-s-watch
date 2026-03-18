import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, Role, OrderStatus, AddressType } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString, ssl: true })
const adapter = new PrismaPg(pool as any)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding Database with Enterprise Luxury Data...')

  // 1. Clear existing data
  console.log('Wiping existing data for fresh seed...')
  await prisma.auditLog.deleteMany()
  await prisma.contentBlock.deleteMany()
  await prisma.page.deleteMany()
  await prisma.storeSettings.deleteMany()
  await prisma.review.deleteMany()
  await prisma.orderTrackingEvent.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.inventory.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.address.deleteMany()
  await prisma.coupon.deleteMany()
  await prisma.contactQuery.deleteMany()
  await prisma.user.deleteMany()

  // 2. Create Users
  const passwordHash = await bcryptjs.hash('password123', 10)

  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@designerworld.com',
      passwordHash,
      role: Role.ADMIN,
      emailVerified: new Date(),
    },
  })

  const customerUser = await prisma.user.create({
    data: {
      name: 'Vip Customer',
      email: 'customer@designerworld.com',
      passwordHash,
      role: Role.CUSTOMER,
      emailVerified: new Date(),
      addresses: {
        create: {
          type: AddressType.SHIPPING,
          firstName: 'Vip',
          lastName: 'Customer',
          addressLine1: 'Cyber Hub, DLF Phase 2',
          city: 'Gurugram',
          state: 'Haryana',
          postalCode: '122002',
          country: 'India',
          phone: '+91 9876543210',
          isDefault: true,
        }
      }
    },
  })

  const customerAddressId = (await prisma.address.findFirst({ where: { userId: customerUser.id } }))?.id

  // 3. Create Store Settings (Singleton)
  await prisma.storeSettings.create({
    data: {
      id: 'singleton',
      storeName: "Designer's Watch",
      contactEmail: 'support@designerworld.com',
      contactPhone: '+91 11 2345 6789',
      businessAddress: '123 Luxury Lane, South Extension, New Delhi, India',
      currency: 'INR',
      taxLabel: 'GST',
      taxRate: 18.0,
      taxInclusive: true,
      freeShippingThreshold: 5000,
      defaultShippingFee: 0,
      defaultSeoTitle: "Designer's Watch | Premium Luxury Timepieces",
      defaultSeoDescription: "Exclusively curated luxury watches from D'SIGNER and global Swiss brands.",
      announcementText: "✨ Festive Offer: Use GOLDRUSH for 15% off on all D'SIGNER watches!",
      announcementActive: true,
    }
  })

  // 4. Create Content Blocks for Homepage Sections
  await prisma.contentBlock.createMany({
    data: [
      {
        sectionId: "home-hero",
        title: "The Art of Precision",
        subtitle: "Luxury Defined",
        description: "Discover the new 2026 Collection — where heritage meets modern innovation.",
        buttonText: "Shop Collection",
        buttonLink: "/collections/royal-oak-collection",
      },
      {
        sectionId: "brand-story",
        title: "A Timeless Legacy",
        subtitle: "ESTD. 1940",
        description: "From a small setup in Amritsar to a global distribution powerhouse, the Nagpal Group has defined luxury watchmaking for over four generations.",
      },
      {
        sectionId: "heritage-timeline",
        title: "Nagpal Group Journey",
        subtitle: "OUR LEGACY",
        content: [
          { year: "1940", title: "The Beginning", content: "Virbhan Nagpal starts a small setup in Amritsar." },
          { year: "1991", title: "D'SIGNER Launch", content: "Official launch of our first home brand." },
          { year: "2020", title: "Ghadiwaala.com", content: "Went live with our direct-to-consumer store." }
        ] as any
      }
    ]
  })

  // 5. Create Standalone Pages
  await prisma.page.createMany({
    data: [
      {
        slug: 'privacy-policy',
        title: 'Privacy Policy',
        content: 'Your privacy is extremely important to us...',
      },
      {
        slug: 'shipping-policy',
        title: 'Shipping Policy',
        content: 'All our products are shipped via secure, insured couriers...',
      }
    ]
  })

  // 6. Create Coupons
  await prisma.coupon.create({
    data: {
      code: 'WELCOME10',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      minCartAmount: 1000,
      maxUses: 100,
      isActive: true,
    }
  })

  await prisma.coupon.create({
    data: {
      code: 'GOLDRUSH',
      discountType: 'FIXED',
      discountValue: 500,
      minCartAmount: 5000,
      isActive: true,
    }
  })

  // 7. Create Categories
  const catRoyal = await prisma.category.create({
    data: {
      name: 'Royal Oak Collection',
      slug: 'royal-oak-collection',
      description: 'The iconic octagonal bezel.',
      seoTitle: 'Royal Oak Watches | Boutique Collection',
    }
  })

  const catNautilus = await prisma.category.create({
    data: {
      name: 'Nautilus Series',
      slug: 'nautilus-series',
      description: 'The perfect synthesis of sporty and elegant.',
    }
  })

  // 8. Create Luxury Products with Expanded Specs
  const products = [
    {
      name: 'Royal Oak Selfwinding Chronograph',
      slug: 'royal-oak-chrono-blue',
      description: '41mm Stainless Steel, Bleu Nuit Grande Tapisserie dial.',
      price: 2850000,
      heritageText: "The Royal Oak first appeared in 1972, changing the world of horology forever.",
      storyText: "Hand-finished with alternating polished and satin-brushed surfaces.",
      materialDetails: "Stainless steel case, glareproofed sapphire crystal.",
      movementType: "Selfwinding Calibre 4401",
      caseSize: "41mm",
      strapDetails: "Integrated steel bracelet with AP folding clasp.",
      warrantyInfo: "5 Year Global Warranty",
      status: 'ACTIVE',
      categoryId: catRoyal.id,
      featured: true,
      bestSeller: true,
      seoTitle: "AP Royal Oak 41mm Chronograph Bleu Nuit",
      sku: 'RO-41-CH-BL',
      images: ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800'],
    },
    {
      name: 'Nautilus Travel Time Chronograph',
      slug: 'nautilus-travel-time',
      description: 'Rose Gold, Sunburst brown dial.',
      price: 9500000,
      movementType: "Mechanical self-winding movement",
      caseSize: "40.5 mm",
      limitedEdition: true,
      status: 'ACTIVE',
      categoryId: catNautilus.id,
      featured: true,
      sku: 'PP-5990-1R',
      images: ['https://images.unsplash.com/photo-1587834079836-9b57ceebec0e?auto=format&fit=crop&q=80&w=800'],
    }
  ]

  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        heritageText: p.heritageText,
        storyText: p.storyText,
        materialDetails: p.materialDetails,
        movementType: p.movementType,
        caseSize: p.caseSize,
        strapDetails: p.strapDetails,
        warrantyInfo: p.warrantyInfo,
        status: 'ACTIVE',
        categoryId: p.categoryId,
        featured: p.featured || false,
        bestSeller: p.bestSeller || false,
        limitedEdition: p.limitedEdition || false,
        seoTitle: p.seoTitle,
        images: {
          create: p.images.map((url, i) => ({ url, sortOrder: i }))
        },
        inventory: {
          create: {
            sku: p.sku,
            stock: 10
          }
        }
      }
    })
  }

  // 9. Add Review with Admin Reply
  const firstProd = await prisma.product.findFirst({ where: { slug: 'royal-oak-chrono-blue' } })
  if (firstProd) {
    await prisma.review.create({
      data: {
        userId: customerUser.id,
        productId: firstProd.id,
        rating: 5,
        comment: "An absolute masterpiece. The craftsmanship is unparalleled.",
        isApproved: true,
        isFeatured: true,
        adminReply: "Thank you for the kind words! We are glad you appreciate the craftsmanship of the Royal Oak.",
      }
    })
  }

  // 10. Create Inquiry
  await prisma.contactQuery.create({
    data: {
      name: "John Smith",
      email: "john@example.com",
      subject: "Custom Strap Inquiry",
      message: "I am looking for a black alligator strap for my Royal Oak. Do you have it in stock?",
      status: "NEW",
    }
  })

  console.log('✅ Seeding Complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
