"use server"

import { prisma } from "@/lib/db"
import { createAuditLog } from "@/lib/audit"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

export async function createStaffUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { error: "All fields are required" }
  }

  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) {
    return { error: "A user with this email already exists" }
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "ADMIN",
    }
  })

  await createAuditLog("STAFF_CREATE", "User", user.id, `Created admin user: ${name} (${email})`)
  revalidatePath("/admin/staff")
  return { success: true }
}

export async function toggleStaffRole(userId: string, newRole: "ADMIN" | "CUSTOMER") {
  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole }
  })

  await createAuditLog("STAFF_ROLE_CHANGE", "User", userId, `Changed role to: ${newRole}`)
  revalidatePath("/admin/staff")
  return { success: true }
}
