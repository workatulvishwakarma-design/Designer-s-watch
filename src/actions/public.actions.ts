"use server"

import { prisma } from "@/lib/db"
import {
  dbToUnified,
  mergeProducts,
  getStaticProducts,
  filterByBrand,
  getBestSellers,
  type UnifiedProduct,
} from "@/lib/products"
import { allProducts as staticCatalog, getProductBySlug as getStaticBySlug } from "@/data/productData"

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
    const dbProducts = await prisma.product.findMany({
      where: { status: "ACTIVE" },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        category: { select: { name: true, slug: true } },
        inventory: { select: { stock: true, lowStockThreshold: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    })
    dbUnified = dbProducts.map(dbToUnified)
  } catch (error) {
    console.error("DB fetch failed, using static catalog only:", error)
  }

  // Merge: static catalog + DB overlay (DB wins on slug duplicate)
  const all = mergeProducts(dbUnified)

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
    const dbProduct = await prisma.product.findUnique({
      where: { slug, status: "ACTIVE" },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        category: { select: { name: true, slug: true } },
        inventory: { select: { stock: true, lowStockThreshold: true, sku: true } },
        reviews: {
          where: { isApproved: true },
          select: { rating: true, comment: true, user: { select: { name: true } }, createdAt: true },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    })

    if (dbProduct) {
      const unified = dbToUnified(dbProduct)
      return {
        ...unified,
        reviews: dbProduct.reviews || [],
        fromDB: true,
        dbId: dbProduct.id, // Keep real DB ID for checkout
      }
    }
  } catch (error) {
    console.error("DB lookup failed for slug:", slug, error)
  }

  // 2. Fallback to static catalog
  const staticProduct = getStaticBySlug(slug)
  if (staticProduct) {
    const { staticToUnified } = await import("@/lib/products")
    return {
      ...staticToUnified(staticProduct),
      reviews: [],
      fromDB: false,
      dbId: null,
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
    const dbProducts = await prisma.product.findMany({
      where: { status: "ACTIVE", slug: { not: currentSlug } },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        category: { select: { name: true, slug: true } },
      },
      take: 20,
    })
    dbUnified = dbProducts.map(dbToUnified)
  } catch (e) {
    // ignore
  }

  const all = mergeProducts(dbUnified)
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
    const dbProducts = await prisma.product.findMany({
      where: { status: "ACTIVE" },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        category: { select: { name: true, slug: true } },
        inventory: { select: { stock: true, lowStockThreshold: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    })
    dbUnified = dbProducts.map(dbToUnified)
  } catch (e) {
    console.error("DB fetch failed for collection:", e)
  }

  const all = mergeProducts(dbUnified)
  return filterByBrand(all, brand)
}

/* ═══════════════════════════════════════════
   LEGACY COMPAT
   ═══════════════════════════════════════════ */
export async function getFeaturedProducts() {
  const data = await getHomepageProducts()
  return data.all.slice(0, 12)
}
