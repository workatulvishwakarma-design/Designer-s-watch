"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const settingsSchema = z.object({
  storeName: z.string().min(1),
  contactEmail: z.string().email().optional().nullable(),
  contactPhone: z.string().optional().nullable(),
  businessAddress: z.string().optional().nullable(),
  taxLabel: z.string().default("GST"),
  taxRate: z.coerce.number().default(18.0),
  taxInclusive: z.coerce.boolean().default(true),
  freeShippingThreshold: z.coerce.number().default(5000),
  defaultShippingFee: z.coerce.number().default(0),
  defaultSeoTitle: z.string().optional().nullable(),
  defaultSeoDescription: z.string().optional().nullable(),
  announcementText: z.string().optional().nullable(),
  announcementActive: z.coerce.boolean().default(false),
})

export async function updateStoreSettings(formData: FormData) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  const rawData = {
    storeName: formData.get("storeName")?.toString() || "Designer's Watch",
    contactEmail: formData.get("contactEmail")?.toString(),
    contactPhone: formData.get("contactPhone")?.toString(),
    businessAddress: formData.get("businessAddress")?.toString(),
    taxLabel: formData.get("taxLabel")?.toString() || "GST",
    taxRate: formData.get("taxRate"),
    taxInclusive: formData.get("taxInclusive") === "on",
    freeShippingThreshold: formData.get("freeShippingThreshold"),
    defaultShippingFee: formData.get("defaultShippingFee"),
    defaultSeoTitle: formData.get("defaultSeoTitle")?.toString(),
    defaultSeoDescription: formData.get("defaultSeoDescription")?.toString(),
    announcementText: formData.get("announcementText")?.toString(),
    announcementActive: formData.get("announcementActive") === "on",
  }

  const parsed = settingsSchema.safeParse(rawData)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  try {
    await prisma.storeSettings.upsert({
      where: { id: "singleton" },
      update: parsed.data,
      create: { id: "singleton", ...parsed.data }
    })
    revalidatePath("/admin/settings")
    return { success: "Settings updated successfully." }
  } catch (e) {
    console.error("Settings Action Error:", e)
    return { error: "Failed to update settings." }
  }
}
