"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { createAuditLog } from "@/lib/audit"

const collectionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  meaning: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
})

type ActionResponse = {
  success?: string
  error?: string
}

export async function upsertCollection(formData: FormData): Promise<ActionResponse> {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  const rawData = {
    id: formData.get("id")?.toString(),
    name: formData.get("name")?.toString() || "",
    slug: formData.get("slug")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    meaning: formData.get("meaning")?.toString(),
    gender: formData.get("gender")?.toString(),
  }

  const parsed = collectionSchema.safeParse(rawData)

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const data = parsed.data

  try {
    if (data.id) {
      await prisma.collection.update({
        where: { id: data.id },
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          meaning: data.meaning,
          gender: data.gender,
        }
      })
      await createAuditLog("COLLECTION_UPDATE", `Updated collection: ${data.name}`, session.user.id)
    } else {
      await prisma.collection.create({
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          meaning: data.meaning,
          gender: data.gender,
        }
      })
      await createAuditLog("COLLECTION_CREATE", `Created collection: ${data.name}`, session.user.id)
    }

    revalidatePath("/admin/categories")
    revalidatePath("/collections/[collection]", "page")
    revalidatePath("/")
    
    return { success: data.id ? "Collection updated successfully" : "Collection created successfully" }
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "A collection with this slug already exists" }
    }
    console.error("Collection Upsert Error:", error)
    return { error: "Database error occurred" }
  }
}
