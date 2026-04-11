"use server"

import { prisma } from "@/lib/db"
import { createAuditLog } from "@/lib/audit"
import { revalidatePath } from "next/cache"

export async function updateShippingConfig(formData: FormData) {
  const freeShippingThreshold = parseFloat(formData.get("freeShippingThreshold") as string) || 5000
  const defaultShippingFee = parseFloat(formData.get("defaultShippingFee") as string) || 0
  const estimatedDeliveryDays = formData.get("estimatedDeliveryDays") as string || "5-7"
  const codEnabled = formData.get("codEnabled") === "on"
  const codAdvancePercent = parseFloat(formData.get("codAdvancePercent") as string) || 10

  await prisma.storeSettings.update({
    where: { id: "singleton" },
    data: {
      freeShippingThreshold,
      defaultShippingFee,
    }
  })

  await createAuditLog(
    "SHIPPING_UPDATE",
    "StoreSettings",
    "singleton",
    `Updated shipping: Free threshold ₹${freeShippingThreshold}, Flat rate ₹${defaultShippingFee}, EST ${estimatedDeliveryDays} days, COD ${codEnabled ? "ON" : "OFF"}`
  )

  revalidatePath("/admin/shipping")
  revalidatePath("/admin/settings")
  return { success: true }
}
