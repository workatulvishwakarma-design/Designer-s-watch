"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const addressSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  addressLine1: z.string().min(5, "Address must be at least 5 characters"),
  addressLine2: z.string().optional().nullable(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().optional().nullable(),
  isDefault: z.coerce.boolean().default(false),
})

export async function upsertAddress(formData: FormData) {
  const session = await auth()
  if (!session || !session.user?.id) return { error: "Unauthorized" }

  const parsed = addressSchema.safeParse({
    id: formData.get("id") ? formData.get("id")?.toString() : undefined,
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2"),
    city: formData.get("city"),
    state: formData.get("state"),
    postalCode: formData.get("postalCode"),
    country: formData.get("country"),
    phone: formData.get("phone"),
    isDefault: formData.get("isDefault") === "on",
  })

  if (!parsed.success) return { error: parsed.error.issues[0].message }
  const data = parsed.data

  try {
    // If setting as default, unset others first
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { userId: session.user.id },
        data: { isDefault: false }
      })
    }

    if (data.id) {
      // Update
      const existing = await prisma.address.findUnique({ where: { id: data.id } })
      if (!existing || existing.userId !== session.user.id) return { error: "Address not found." }

      await prisma.address.update({
        where: { id: data.id },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
          phone: data.phone,
          isDefault: data.isDefault,
        }
      })
    } else {
      // Create
      // If it's the first address, auto-make it default
      const count = await prisma.address.count({ where: { userId: session.user.id } })
      
      await prisma.address.create({
        data: {
          userId: session.user.id,
          firstName: data.firstName,
          lastName: data.lastName,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
          phone: data.phone,
          isDefault: data.isDefault || count === 0,
          type: "SHIPPING",
        }
      })
    }

    revalidatePath("/account/addresses")
    revalidatePath("/checkout")
    return { success: "Address saved." }
  } catch (e) {
    return { error: "Failed to save address." }
  }
}

export async function deleteAddress(id: string) {
  const session = await auth()
  if (!session || !session.user?.id) return { error: "Unauthorized" }

  try {
    const address = await prisma.address.findUnique({ where: { id } })
    if (!address || address.userId !== session.user.id) return { error: "Not found." }

    await prisma.address.delete({ where: { id } })
    revalidatePath("/account/addresses")
    return { success: "Address removed." }
  } catch (e) {
    return { error: "Failed to delete address." }
  }
}
