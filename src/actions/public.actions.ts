"use server"

import { prisma } from "@/lib/db"
import { mapPrismaFamilyToGroup } from "@/lib/prismaMappers"
import {
  dbToUnified,
  getAllUnifiedProducts,
  filterByBrand,
  filterByGender,
  getBestSellers,
  familyToUnified,
  type UnifiedProduct,
} from "@/lib/products"
import { getFamilyBySku } from "@/data/productData"

/* Note: Client components should import UnifiedProduct from @/lib/products directly */

/**
 * Backwards-compat type alias used by homepage
 */
export interface FeaturedProduct {
  id: string
  name: string
  price: string
  numericPrice: number
  comparePrice: number | null
  image: string
  brand: string
  slug: string
  badge?: string
  categoryName?: string
  stock: number
  lowStockThreshold: number
}

export interface HomepageProducts {
  bestSellers: FeaturedProduct[]
  designer: FeaturedProduct[]
  escort: FeaturedProduct[]
  all: FeaturedProduct[]
}

/** Convert UnifiedProduct → FeaturedProduct for homepage cards */
function toFeatured(p: UnifiedProduct): FeaturedProduct {
  return {
    id: p.slug, // use slug as universal ID
    name: p.name,
    price: "₹" + p.price.toLocaleString("en-IN"),
    numericPrice: p.price,
    comparePrice: p.comparePrice,
    image: p.image,
    brand: p.brand,
    slug: p.slug,
    badge: p.badge || undefined,
    categoryName: p.category,
    stock: p.stock,
    lowStockThreshold: p.lowStockThreshold,
  }
}

/* ═══════════════════════════════════════════
   HOMEPAGE PRODUCTS — Hybrid (static + DB)
   ═══════════════════════════════════════════ */
export async function getHomepageProducts(): Promise<HomepageProducts> {
  let dbUnified: UnifiedProduct[] = []

  try {
    const rawFamilies = await prisma.productFamily.findMany({
      where: { status: "ACTIVE" },
      include: {
        collection: true,
        variants: {
          include: { images: true, inventory: true }
        },
        images: true
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    })
    dbUnified = rawFamilies.map(f => mapPrismaFamilyToGroup(f as any)).flatMap(familyToUnified)
  } catch (error) {
    console.error("DB fetch failed, using static catalog only:", error)
  }

  // Merge: static catalog + DB overlay (DB wins on slug duplicate)
  const statics = getAllUnifiedProducts()
  const slugMap = new Map<string, UnifiedProduct>()
  for (const p of statics) slugMap.set(p.slug, p)
  for (const p of dbUnified) slugMap.set(p.slug, p)
  const all = Array.from(slugMap.values())

  const bestSellers = getBestSellers(all).map(toFeatured)
  const designer = filterByBrand(all, "D'SIGNER").map(toFeatured)
  const escort = filterByBrand(all, "ESCORT").map(toFeatured)

  return {
    bestSellers,
    designer,
    escort,
    all: all.map(toFeatured),
  }
}

/* ═══════════════════════════════════════════
   SINGLE PRODUCT — DB first, static fallback
   Used by product/[slug]/page.tsx
   ═══════════════════════════════════════════ */
export async function getProductBySlugHybrid(slug: string) {
  // 1. Try DB first
  try {
    const familyRaw = await prisma.productFamily.findUnique({
      where: { slug, status: "ACTIVE" },
      include: {
        collection: true,
        variants: { include: { images: true, inventory: true } },
        images: true,
        reviews: {
          where: { isApproved: true },
          select: { rating: true, comment: true, user: { select: { name: true } }, createdAt: true },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    })

    if (familyRaw) {
      const group = mapPrismaFamilyToGroup(familyRaw as any)
      const unified = familyToUnified(group)[0] // get the first variant as a baseline
      return {
        ...unified,
        reviews: familyRaw.reviews || [],
        fromDB: true,
        dbId: familyRaw.id, // Keep real DB ID for checkout
      }
    }
  } catch (error) {
    console.error("DB lookup failed for slug:", slug, error)
  }

  // 2. Fallback to static catalog (family-based)
  const family = getFamilyBySku(slug)
  if (family) {
    const { familyToUnified } = await import("@/lib/products")
    const variants = familyToUnified(family)
    const matched = variants.find(v => v.modelNumber === slug) || variants[0]
    if (matched) {
      return {
        ...matched,
        reviews: [],
        fromDB: false,
        dbId: null,
      }
    }
  }

  return null
}

/* ═══════════════════════════════════════════
   RELATED PRODUCTS — same brand, different slug
   ═══════════════════════════════════════════ */
export async function getRelatedProductsHybrid(currentSlug: string, brand: string, count = 4) {
  let dbUnified: UnifiedProduct[] = []

  try {
    const rawFamilies = await prisma.productFamily.findMany({
      where: { status: "ACTIVE", slug: { not: currentSlug } },
      include: {
        collection: true,
        variants: { include: { images: true, inventory: true } },
        images: true,
      },
      take: 20,
    })
    dbUnified = rawFamilies.map(f => mapPrismaFamilyToGroup(f as any)).flatMap(familyToUnified)
  } catch (e) {
    // ignore
  }

  const statics = getAllUnifiedProducts()
  const slugMap = new Map<string, UnifiedProduct>()
  for (const p of statics) slugMap.set(p.slug, p)
  for (const p of dbUnified) slugMap.set(p.slug, p)
  const all = Array.from(slugMap.values())
  // Same brand first, then others
  const sameBrand = all.filter(p => p.brand === brand && p.slug !== currentSlug)
  const others = all.filter(p => p.brand !== brand && p.slug !== currentSlug)
  return [...sameBrand, ...others].slice(0, count)
}

/* ═══════════════════════════════════════════
   COLLECTION PRODUCTS — Full list for grid pages
   ═══════════════════════════════════════════ */
export async function getCollectionProducts(brand: string): Promise<UnifiedProduct[]> {
  let dbUnified: UnifiedProduct[] = []

  try {
    const rawFamilies = await prisma.productFamily.findMany({
      where: { status: "ACTIVE" },
      include: {
        collection: true,
        variants: { include: { images: true, inventory: true } },
        images: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    })
    dbUnified = rawFamilies.map(f => mapPrismaFamilyToGroup(f as any)).flatMap(familyToUnified)
  } catch (e) {
    console.error("DB fetch failed for collection:", e)
  }

  const statics = getAllUnifiedProducts()
  const slugMap = new Map<string, UnifiedProduct>()
  for (const p of statics) slugMap.set(p.slug, p)
  for (const p of dbUnified) slugMap.set(p.slug, p)
  const all = Array.from(slugMap.values())
  return filterByBrand(all, brand)
}

/* ═══════════════════════════════════════════
   COLLECTION PRODUCTS BY GENDER — Full list for grid pages
   ═══════════════════════════════════════════ */
export async function getCollectionProductsByGender(gender: "Men" | "Women"): Promise<UnifiedProduct[]> {
  let dbUnified: UnifiedProduct[] = []

  try {
    const rawFamilies = await prisma.productFamily.findMany({
      where: { status: "ACTIVE", gender },
      include: {
        collection: true,
        variants: { include: { images: true, inventory: true } },
        images: true,
      },
      orderBy: { createdAt: "desc" },
      take: 100, // higher limit since it's an entire gender
    })
    dbUnified = rawFamilies.map(f => mapPrismaFamilyToGroup(f as any)).flatMap(familyToUnified)
  } catch (e) {
    console.error("DB fetch failed for collection:", e)
  }

  const statics = getAllUnifiedProducts()
  const slugMap = new Map<string, UnifiedProduct>()
  for (const p of statics) slugMap.set(p.slug, p)
  for (const p of dbUnified) slugMap.set(p.slug, p)
  const all = Array.from(slugMap.values())
  return filterByGender(all, gender)
}

/* ═══════════════════════════════════════════
   LEGACY COMPAT
   ═══════════════════════════════════════════ */
export async function getFeaturedProducts() {
  const data = await getHomepageProducts()
  return data.all.slice(0, 12)
}
