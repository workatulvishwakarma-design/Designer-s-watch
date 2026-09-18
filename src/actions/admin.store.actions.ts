"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { createAuditLog } from "@/lib/audit"

const storeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Store name is required"),
  contactPerson: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  brands: z.array(z.string()).default([]),
  category: z.string().optional().nullable(),
  address: z.string().min(1, "Address is required"),
  area: z.string().optional().nullable(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  location: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  googleMapsQuery: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
})

export type StoreActionResponse = {
  success?: string
  error?: string
  store?: any
}

export async function upsertStore(formData: FormData): Promise<StoreActionResponse> {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  const rawBrands = formData.get("brands")?.toString() || ""
  let parsedBrands: string[] = []
  if (rawBrands.trim()) {
    try {
      if (rawBrands.startsWith("[")) {
        parsedBrands = JSON.parse(rawBrands)
      } else {
        parsedBrands = rawBrands.split(",").map(b => b.trim()).filter(Boolean)
      }
    } catch {
      parsedBrands = rawBrands.split(",").map(b => b.trim()).filter(Boolean)
    }
  } else {
    // Default brands
    parsedBrands = ["D'Signer Watches", "Escort Watches"]
  }

  const latStr = formData.get("latitude")?.toString()
  const lngStr = formData.get("longitude")?.toString()
  const sortOrderStr = formData.get("sortOrder")?.toString()
  const isActiveVal = formData.get("isActive")?.toString()

  const rawData = {
    id: formData.get("id")?.toString() || undefined,
    name: formData.get("name")?.toString()?.trim() || "",
    contactPerson: formData.get("contactPerson")?.toString()?.trim() || null,
    phone: formData.get("phone")?.toString()?.trim() || null,
    email: formData.get("email")?.toString()?.trim() || null,
    brands: parsedBrands,
    category: formData.get("category")?.toString()?.trim() || "Authorized Retailer",
    address: formData.get("address")?.toString()?.trim() || "",
    area: formData.get("area")?.toString()?.trim() || null,
    city: formData.get("city")?.toString()?.trim().toUpperCase() || "",
    state: formData.get("state")?.toString()?.trim().toUpperCase() || "",
    location: formData.get("location")?.toString()?.trim() || null,
    latitude: latStr && !isNaN(parseFloat(latStr)) ? parseFloat(latStr) : null,
    longitude: lngStr && !isNaN(parseFloat(lngStr)) ? parseFloat(lngStr) : null,
    googleMapsQuery: formData.get("googleMapsQuery")?.toString()?.trim() || null,
    isActive: isActiveVal === "false" ? false : true,
    sortOrder: sortOrderStr && !isNaN(parseInt(sortOrderStr, 10)) ? parseInt(sortOrderStr, 10) : 0,
  }

  // Auto construct googleMapsQuery if empty
  if (!rawData.googleMapsQuery && rawData.name && (rawData.address || rawData.city)) {
    const query = encodeURIComponent(`${rawData.name}, ${rawData.address || ''}, ${rawData.city || ''}`);
    rawData.googleMapsQuery = `https://www.google.com/maps/search/?api=1&query=${query}`
  }

  const parsed = storeSchema.safeParse(rawData)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid store data" }
  }

  const data = parsed.data

  try {
    if (data.id) {
      const updated = await prisma.store.update({
        where: { id: data.id },
        data: {
          name: data.name,
          contactPerson: data.contactPerson,
          phone: data.phone,
          email: data.email,
          brands: data.brands,
          category: data.category,
          address: data.address,
          area: data.area,
          city: data.city,
          state: data.state,
          location: data.location,
          latitude: data.latitude,
          longitude: data.longitude,
          googleMapsQuery: data.googleMapsQuery,
          isActive: data.isActive,
          sortOrder: data.sortOrder,
        }
      })
      const adminId = session?.user?.id || "admin"
      await createAuditLog("STORE_UPDATE", `Updated store: ${data.name} (${data.city})`, adminId)
      revalidatePath("/admin/stores")
      revalidatePath("/")
      return { success: "Store updated successfully!", store: updated }
    } else {
      const created = await prisma.store.create({
        data: {
          name: data.name,
          contactPerson: data.contactPerson,
          phone: data.phone,
          email: data.email,
          brands: data.brands,
          category: data.category,
          address: data.address,
          area: data.area,
          city: data.city,
          state: data.state,
          location: data.location,
          latitude: data.latitude,
          longitude: data.longitude,
          googleMapsQuery: data.googleMapsQuery,
          isActive: data.isActive,
          sortOrder: data.sortOrder,
        }
      })
      const adminId = session?.user?.id || "admin"
      await createAuditLog("STORE_CREATE", `Created store: ${data.name} (${data.city})`, adminId)
      revalidatePath("/admin/stores")
      revalidatePath("/")
      return { success: "Store created successfully!", store: created }
    }
  } catch (err: any) {
    console.error("Error upserting store:", err)
    return { error: err.message || "Failed to save store" }
  }
}

export async function deleteStore(storeId: string): Promise<StoreActionResponse> {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  try {
    const existing = await prisma.store.findUnique({
      where: { id: storeId },
      select: { name: true, city: true }
    })
    if (!existing) {
      return { error: "Store not found" }
    }

    await prisma.store.delete({
      where: { id: storeId }
    })

    const adminId = session?.user?.id || "admin"
    await createAuditLog("STORE_DELETE", `Deleted store: ${existing.name} (${existing.city})`, adminId)
    revalidatePath("/admin/stores")
    revalidatePath("/")
    return { success: "Store deleted successfully" }
  } catch (err: any) {
    console.error("Error deleting store:", err)
    return { error: err.message || "Failed to delete store" }
  }
}

export async function toggleStoreStatus(storeId: string, isActive?: boolean): Promise<StoreActionResponse> {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  try {
    const existing = await prisma.store.findUnique({
      where: { id: storeId },
      select: { name: true, isActive: true }
    })
    if (!existing) {
      return { error: "Store not found" }
    }

    const nextState = isActive !== undefined ? isActive : !existing.isActive
    const updated = await prisma.store.update({
      where: { id: storeId },
      data: { isActive: nextState }
    })

    const adminId = session?.user?.id || "admin"
    await createAuditLog(
      "STORE_UPDATE",
      `Changed store status: ${existing.name} to ${nextState ? 'Active' : 'Inactive'}`,
      adminId
    )
    revalidatePath("/admin/stores")
    revalidatePath("/")
    return { success: `Store ${nextState ? 'activated' : 'deactivated'} successfully!`, store: updated }
  } catch (err: any) {
    console.error("Error toggling store status:", err)
    return { error: err.message || "Failed to update store status" }
  }
}
