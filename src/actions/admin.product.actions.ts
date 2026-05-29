"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { createAuditLog } from "@/lib/audit"

// ----------------------------------------------------------------------
// PRODUCT FAMILY ACTIONS
// ----------------------------------------------------------------------

const familySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]),
  collectionId: z.string().optional().nullable(),
  brand: z.string().default("D'SIGNER"),
  gender: z.string().optional().nullable(),
  
  featured: z.coerce.boolean().default(false),
  newArrival: z.coerce.boolean().default(false),
  bestSeller: z.coerce.boolean().default(false),
  limitedEdition: z.coerce.boolean().default(false),
  
  heritageText: z.string().optional().nullable(),
  storyText: z.string().optional().nullable(),
})

type ActionResponse = {
  success?: string
  error?: string
}

export async function upsertProductFamily(formData: FormData): Promise<ActionResponse> {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  const rawData = {
    id: formData.get("id")?.toString(),
    name: formData.get("name")?.toString() || "",
    slug: formData.get("slug")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    status: formData.get("status")?.toString() || "DRAFT",
    collectionId: formData.get("collectionId")?.toString() || null,
    brand: formData.get("brand")?.toString() || "D'SIGNER",
    gender: formData.get("gender")?.toString() || null,
    
    featured: formData.get("featured") === "on",
    newArrival: formData.get("newArrival") === "on",
    bestSeller: formData.get("bestSeller") === "on",
    limitedEdition: formData.get("limitedEdition") === "on",
    
    heritageText: formData.get("heritageText")?.toString(),
    storyText: formData.get("storyText")?.toString(),
  }

  const parsed = familySchema.safeParse(rawData)

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const data = parsed.data

  try {
    if (data.id) {
      await prisma.productFamily.update({
        where: { id: data.id },
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          status: data.status,
          collectionId: data.collectionId,
          brand: data.brand,
          gender: data.gender,
          featured: data.featured,
          newArrival: data.newArrival,
          bestSeller: data.bestSeller,
          limitedEdition: data.limitedEdition,
          heritageText: data.heritageText,
          storyText: data.storyText,
        }
      })
      await createAuditLog("PRODUCT_UPDATE", `Updated family: ${data.name}`, session.user.id)
    } else {
      await prisma.productFamily.create({
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          status: data.status,
          collectionId: data.collectionId,
          brand: data.brand,
          gender: data.gender,
          featured: data.featured,
          newArrival: data.newArrival,
          bestSeller: data.bestSeller,
          limitedEdition: data.limitedEdition,
          heritageText: data.heritageText,
          storyText: data.storyText,
        }
      })
      await createAuditLog("PRODUCT_CREATE", `Created family: ${data.name}`, session.user.id)
    }

    revalidatePath("/admin/products")
    revalidatePath("/collections/[collection]", "page")
    
    return { success: data.id ? "Family updated successfully" : "Family created successfully" }
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "A family with this slug already exists" }
    }
    console.error("Family Upsert Error:", error)
    return { error: "Database error occurred" }
  }
}

// ----------------------------------------------------------------------
// PRODUCT VARIANT ACTIONS
// ----------------------------------------------------------------------

const variantSchema = z.object({
  id: z.string().optional(),
  familyId: z.string().min(1, "Family ID is required"),
  sku: z.string().min(1, "SKU is required"),
  price: z.coerce.number().positive("Price must be positive"),
  mrp: z.coerce.number().optional().nullable(),
  
  color: z.string().optional().nullable(),
  dialColor: z.string().optional().nullable(),
  strapColor: z.string().optional().nullable(),
  
  movement: z.string().optional().nullable(),
  glass: z.string().optional().nullable(),
  caseSize: z.string().optional().nullable(),
  caseThickness: z.string().optional().nullable(),
  strapMaterial: z.string().optional().nullable(),
  waterResistance: z.string().optional().nullable(),
  
  stock: z.coerce.number().min(0, "Stock cannot be negative").default(0),
})

export async function upsertProductVariant(formData: FormData): Promise<ActionResponse> {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  const rawData = {
    id: formData.get("id")?.toString(),
    familyId: formData.get("familyId")?.toString() || "",
    sku: formData.get("sku")?.toString() || "",
    price: formData.get("price"),
    mrp: formData.get("mrp") || null,
    
    color: formData.get("color")?.toString(),
    dialColor: formData.get("dialColor")?.toString(),
    strapColor: formData.get("strapColor")?.toString(),
    
    movement: formData.get("movement")?.toString(),
    glass: formData.get("glass")?.toString(),
    caseSize: formData.get("caseSize")?.toString(),
    caseThickness: formData.get("caseThickness")?.toString(),
    strapMaterial: formData.get("strapMaterial")?.toString(),
    waterResistance: formData.get("waterResistance")?.toString(),
    
    stock: formData.get("stock"),
  }

  const parsed = variantSchema.safeParse(rawData)

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const data = parsed.data

  try {
    if (data.id) {
      await prisma.$transaction(async (tx) => {
        await tx.productVariant.update({
          where: { id: data.id },
          data: {
            sku: data.sku,
            price: data.price,
            mrp: data.mrp,
            color: data.color,
            dialColor: data.dialColor,
            strapColor: data.strapColor,
            movement: data.movement,
            glass: data.glass,
            caseSize: data.caseSize,
            caseThickness: data.caseThickness,
            strapMaterial: data.strapMaterial,
            waterResistance: data.waterResistance,
          }
        })
        
        // Update Inventory
        await tx.inventory.upsert({
          where: { variantId: data.id },
          create: { variantId: data.id, stock: data.stock },
          update: { stock: data.stock }
        })
      })
      await createAuditLog("VARIANT_UPDATE", `Updated variant: ${data.sku}`, session.user.id)
    } else {
      await prisma.$transaction(async (tx) => {
        const variant = await tx.productVariant.create({
          data: {
            familyId: data.familyId,
            sku: data.sku,
            price: data.price,
            mrp: data.mrp,
            color: data.color,
            dialColor: data.dialColor,
            strapColor: data.strapColor,
            movement: data.movement,
            glass: data.glass,
            caseSize: data.caseSize,
            caseThickness: data.caseThickness,
            strapMaterial: data.strapMaterial,
            waterResistance: data.waterResistance,
          }
        })
        
        await tx.inventory.create({
          data: { variantId: variant.id, stock: data.stock }
        })
      })
      await createAuditLog("VARIANT_CREATE", `Created variant: ${data.sku}`, session.user.id)
    }

    revalidatePath(`/admin/products/${data.familyId}`)
    revalidatePath("/collections/[collection]", "page")
    
    return { success: data.id ? "Variant updated successfully" : "Variant created successfully" }
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "A variant with this SKU already exists" }
    }
    console.error("Variant Upsert Error:", error)
    return { error: "Database error occurred" }
  }
}
