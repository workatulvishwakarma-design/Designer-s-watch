"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const contentBlockSchema = z.object({
  id: z.string().optional(),
  sectionId: z.string().min(1),
  title: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  mediaUrl: z.string().optional().nullable(),
  buttonText: z.string().optional().nullable(),
  buttonLink: z.string().optional().nullable(),
  isActive: z.coerce.boolean().default(true),
})

export async function upsertContentBlock(formData: FormData) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  const rawData = {
    id: formData.get("id")?.toString(),
    sectionId: formData.get("sectionId")?.toString() || "",
    title: formData.get("title")?.toString(),
    subtitle: formData.get("subtitle")?.toString(),
    description: formData.get("description")?.toString(),
    mediaUrl: formData.get("mediaUrl")?.toString(),
    buttonText: formData.get("buttonText")?.toString(),
    buttonLink: formData.get("buttonLink")?.toString(),
    isActive: formData.get("isActive") === "on",
  }

  const parsed = contentBlockSchema.safeParse(rawData)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const data = parsed.data

  try {
    if (data.id) {
      await prisma.contentBlock.update({
        where: { id: data.id },
        data
      })
    } else {
      await prisma.contentBlock.create({ data })
    }
    revalidatePath("/admin/content")
    revalidatePath("/") // Revalidate homepage as it likely uses these blocks
    return { success: "Content section updated." }
  } catch (e) {
    return { error: "Failed to save content block." }
  }
}
