"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { createAuditLog } from "@/lib/audit"

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be positive"),
  comparePrice: z.coerce.number().optional().nullable(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]),
  categoryId: z.string().optional().nullable(),
  featured: z.coerce.boolean().default(false),
  newArrival: z.coerce.boolean().default(false),
  bestSeller: z.coerce.boolean().default(false),
  limitedEdition: z.coerce.boolean().default(false),
  
  // Luxury & Specs
  heritageText: z.string().optional().nullable(),
  storyText: z.string().optional().nullable(),
  materialDetails: z.string().optional().nullable(),
  movementType: z.string().optional().nullable(),
  caseSize: z.string().optional().nullable(),
  strapDetails: z.string().optional().nullable(),
  warrantyInfo: z.string().optional().nullable(),
  
  // SEO
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  seoKeywords: z.string().optional().nullable(),
  
  sku: z.string().min(1, "SKU is required"),
  stock: z.coerce.number().min(0, "Stock cannot be negative").default(0),
})

type ActionResponse = {
  success?: string
  error?: string
}

export async function upsertProduct(formData: FormData): Promise<ActionResponse> {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  // Parse raw form data
  const rawData = {
    id: formData.get("id")?.toString(),
    name: formData.get("name")?.toString() || "",
    slug: formData.get("slug")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    price: formData.get("price"),
    status: formData.get("status")?.toString() || "DRAFT",
    categoryId: formData.get("categoryId")?.toString() || null,
    featured: formData.get("featured") === "on",
    newArrival: formData.get("newArrival") === "on",
    bestSeller: formData.get("bestSeller") === "on",
    limitedEdition: formData.get("limitedEdition") === "on",
    
    heritageText: formData.get("heritageText")?.toString(),
    storyText: formData.get("storyText")?.toString(),
    materialDetails: formData.get("materialDetails")?.toString(),
    movementType: formData.get("movementType")?.toString(),
    caseSize: formData.get("caseSize")?.toString(),
    strapDetails: formData.get("strapDetails")?.toString(),
    warrantyInfo: formData.get("warrantyInfo")?.toString(),
    
    seoTitle: formData.get("seoTitle")?.toString(),
    seoDescription: formData.get("seoDescription")?.toString(),
    seoKeywords: formData.get("seoKeywords")?.toString(),
    
    sku: formData.get("sku")?.toString() || "",
    stock: formData.get("stock"),
  }

  const parsed = productSchema.safeParse(rawData)

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const data = parsed.data

  try {
    if (data.id) {
      // Update logic
      await prisma.product.update({
        where: { id: data.id },
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          price: data.price,
          status: data.status,
          categoryId: data.categoryId,
          featured: data.featured,
          newArrival: data.newArrival,
          bestSeller: data.bestSeller,
          limitedEdition: data.limitedEdition,
          heritageText: data.heritageText,
          storyText: data.storyText,
          materialDetails: data.materialDetails,
          movementType: data.movementType,
          caseSize: data.caseSize,
          strapDetails: data.strapDetails,
          warrantyInfo: data.warrantyInfo,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
          seoKeywords: data.seoKeywords,
        },
      })

      // Upsert base inventory
      await prisma.inventory.upsert({
        where: { sku: data.sku },
        update: { stock: data.stock },
        create: {
          productId: data.id,
          sku: data.sku,
          stock: data.stock,
        },
      })
      
      await createAuditLog("PRODUCT_UPDATE", "Product", data.id, `Updated product: ${data.name}`)
      revalidatePath("/admin/products")
      return { success: "Product updated successfully!" }

    } else {
      // Create logic
      const existingSlug = await prisma.product.findUnique({ where: { slug: data.slug } })
      if (existingSlug) return { error: "Slug is already in use." }

      const existingSku = await prisma.inventory.findUnique({ where: { sku: data.sku } })
      if (existingSku) return { error: "SKU is already in use." }

      await prisma.product.create({
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          price: data.price,
          status: data.status,
          categoryId: data.categoryId,
          featured: data.featured,
          newArrival: data.newArrival,
          bestSeller: data.bestSeller,
          limitedEdition: data.limitedEdition,
          heritageText: data.heritageText,
          storyText: data.storyText,
          materialDetails: data.materialDetails,
          movementType: data.movementType,
          caseSize: data.caseSize,
          strapDetails: data.strapDetails,
          warrantyInfo: data.warrantyInfo,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
          seoKeywords: data.seoKeywords,
          inventory: {
            create: {
              sku: data.sku,
              stock: data.stock,
            }
          }
        },
      })

      const newProduct = await prisma.product.findUnique({ where: { slug: data.slug } })
      await createAuditLog("PRODUCT_CREATE", "Product", newProduct?.id || "unknown", `Created product: ${data.name}`)

      revalidatePath("/admin/products")
      return { success: "Product created successfully!" }
    }
  } catch (error: any) {
    console.error("Product Action Error:", error)
    return { error: "Failed to save product to database." }
  }
}

export async function deleteProduct(id: string): Promise<ActionResponse> {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  try {
    await prisma.product.delete({ where: { id } })
    await createAuditLog("PRODUCT_DELETE", "Product", id, `Deleted product ID: ${id}`)
    revalidatePath("/admin/products")
    return { success: "Product deleted successfully." }
  } catch (e) {
    return { error: "Failed to delete product." }
  }
}
