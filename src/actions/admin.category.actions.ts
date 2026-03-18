"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional().nullable(),
  sortPriority: z.coerce.number().default(0),
  visibility: z.coerce.boolean().default(true),
  image: z.string().optional().nullable(),
})

export async function upsertCategory(formData: FormData) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  const rawData = {
    id: formData.get("id")?.toString(),
    name: formData.get("name")?.toString() || "",
    slug: formData.get("slug")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    sortPriority: formData.get("sortPriority") || "0",
    visibility: formData.get("visibility") === "on",
    image: formData.get("image")?.toString() || "",
  }

  const parsed = categorySchema.safeParse(rawData)
  if (!parsed.success) return { error: parsed.error.issues[0].message }
  const data = parsed.data

  try {
    if (data.id) {
      await prisma.category.update({
        where: { id: data.id },
        data,
      })
      revalidatePath("/admin/categories")
      return { success: "Category updated!" }
    } else {
      const existing = await prisma.category.findUnique({ where: { slug: data.slug } })
      if (existing) return { error: "Slug is already in use." }

      await prisma.category.create({ data })
      revalidatePath("/admin/categories")
      return { success: "Category created!" }
    }
  } catch (error) {
    return { error: "Database error." }
  }
}

export async function deleteCategory(id: string) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  try {
    const productsUsing = await prisma.product.count({ where: { categoryId: id } })
    if (productsUsing > 0) return { error: `Cannot delete: ${productsUsing} products use this category.` }

    await prisma.category.delete({ where: { id } })
    revalidatePath("/admin/categories")
    return { success: "Category deleted." }
  } catch (e) {
    return { error: "Failed to delete category." }
  }
}
