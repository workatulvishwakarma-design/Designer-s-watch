"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const pageSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  slug: z.string().min(1).toLowerCase(),
  content: z.string().min(1),
  isActive: z.coerce.boolean().default(true),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
})

export async function upsertPage(formData: FormData) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  const rawData = {
    id: formData.get("id")?.toString(),
    title: formData.get("title")?.toString() || "",
    slug: formData.get("slug")?.toString() || "",
    content: formData.get("content")?.toString() || "",
    isActive: formData.get("isActive") === "on",
    seoTitle: formData.get("seoTitle")?.toString(),
    seoDescription: formData.get("seoDescription")?.toString(),
  }

  const parsed = pageSchema.safeParse(rawData)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  try {
    if (parsed.data.id) {
      await prisma.page.update({
        where: { id: parsed.data.id },
        data: parsed.data
      })
    } else {
      await prisma.page.create({ data: parsed.data })
    }
    revalidatePath("/admin/pages")
    revalidatePath(`/${parsed.data.slug}`)
    return { success: "Page saved successfully." }
  } catch (e) {
    return { error: "Failed to save page. Slug must be unique." }
  }
}

export async function deletePage(id: string) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  try {
    await prisma.page.delete({ where: { id } })
    revalidatePath("/admin/pages")
    return { success: "Page deleted permanently." }
  } catch (e) {
    return { error: "Failed to delete page." }
  }
}
