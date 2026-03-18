"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
})

export async function updateProfile(formData: FormData) {
  const session = await auth()
  if (!session || !session.user?.id) {
    return { error: "You must be logged in to do this." }
  }

  const userId = session.user.id

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { name, email, currentPassword, newPassword } = parsed.data

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return { error: "User not found." }

    // Email change verification
    if (email !== user.email) {
      const existingEmail = await prisma.user.findUnique({ where: { email } })
      if (existingEmail) return { error: "Email is already in use by another account." }
    }

    // Password change verification
    let passwordHash = user.passwordHash
    if (newPassword && newPassword.length > 0) {
      if (!currentPassword || !user.passwordHash) {
        return { error: "Current password is required to set a new password." }
      }
      
      const isValid = await bcrypt.compare(currentPassword, user.passwordHash)
      if (!isValid) return { error: "Current password is incorrect." }

      passwordHash = await bcrypt.hash(newPassword, 10)
    }

    await prisma.user.update({
      where: { id: userId },
      data: { name, email, passwordHash }
    })

    revalidatePath("/account/profile")
    return { success: "Profile updated successfully!" }

  } catch (error) {
    console.error("Profile update error:", error)
    return { error: "An unexpected error occurred." }
  }
}
