"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { DiscountType } from "@prisma/client"
import { createAuditLog } from "@/lib/audit"

const couponSchema = z.object({
  id: z.string().optional(),
  code: z.string().min(1, "Code is required").toUpperCase(),
  discountType: z.nativeEnum(DiscountType),
  discountValue: z.coerce.number().positive("Value must be positive"),
  minCartAmount: z.coerce.number().optional().nullable(),
  maxDiscountAmount: z.coerce.number().optional().nullable(),
  startDate: z.string().optional().nullable(),
  expiresAt: z.string().optional().nullable(),
  maxUses: z.coerce.number().optional().nullable(),
  perUserLimit: z.coerce.number().optional().nullable(),
  isActive: z.coerce.boolean().default(true),
})

type ActionResponse = {
  success?: string
  error?: string
}

export async function upsertCoupon(formData: FormData): Promise<ActionResponse> {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  const rawData = {
    id: formData.get("id")?.toString(),
    code: formData.get("code")?.toString() || "",
    discountType: formData.get("discountType"),
    discountValue: formData.get("discountValue"),
    minCartAmount: formData.get("minCartAmount") || null,
    maxDiscountAmount: formData.get("maxDiscountAmount") || null,
    startDate: formData.get("startDate")?.toString() || null,
    expiresAt: formData.get("expiresAt")?.toString() || null,
    maxUses: formData.get("maxUses") || null,
    perUserLimit: formData.get("perUserLimit") || 1,
    isActive: formData.get("isActive") === "on",
  }

  const parsed = couponSchema.safeParse(rawData)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const data = parsed.data

  try {
    const payload = {
      code: data.code,
      discountType: data.discountType,
      discountValue: data.discountValue,
      minCartAmount: data.minCartAmount,
      maxDiscountAmount: data.maxDiscountAmount,
      startDate: data.startDate ? new Date(data.startDate) : null,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      maxUses: data.maxUses,
      perUserLimit: data.perUserLimit,
      isActive: data.isActive,
    }

    if (data.id) {
      await prisma.coupon.update({
        where: { id: data.id },
        data: payload,
      })
      await createAuditLog("COUPON_UPDATE", "Coupon", data.id, `Updated coupon: ${data.code}`)
      revalidatePath("/admin/coupons")
      return { success: "Coupon updated successfully!" }
    } else {
      const existing = await prisma.coupon.findUnique({ where: { code: data.code } })
      if (existing) return { error: "Coupon code already exists." }

      const newCoupon = await prisma.coupon.create({ data: payload })
      await createAuditLog("COUPON_CREATE", "Coupon", newCoupon.id, `Created coupon: ${data.code}`)
      revalidatePath("/admin/coupons")
      return { success: "Coupon created successfully!" }
    }
  } catch (error) {
    console.error("Coupon Action Error:", error)
    return { error: "Failed to save coupon." }
  }
}

export async function deleteCoupon(id: string): Promise<ActionResponse> {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  try {
    await prisma.coupon.delete({ where: { id } })
    await createAuditLog("COUPON_DELETE", "Coupon", id, `Deleted coupon ID: ${id}`)
    revalidatePath("/admin/coupons")
    return { success: "Coupon deleted successfully." }
  } catch (e) {
    return { error: "Failed to delete coupon." }
  }
}
