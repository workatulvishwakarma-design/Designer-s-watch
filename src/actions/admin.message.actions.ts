"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function updateInquiryStatus(id: string, status: "PENDING" | "READ" | "RESPONDED" | "ARCHIVED") {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  try {
    await prisma.contactQuery.update({
      where: { id },
      data: { status }
    })
    revalidatePath("/admin/messages")
    return { success: `Marked as ${status.toLowerCase()}` }
  } catch (e) {
    return { error: "Failed to update status." }
  }
}

export async function addInquiryNote(id: string, note: string) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  try {
    await prisma.contactQuery.update({
      where: { id },
      data: { internalNote: note }
    })
    revalidatePath("/admin/messages")
    return { success: "Note saved." }
  } catch (e) {
    return { error: "Failed to save note." }
  }
}

export async function deleteInquiry(id: string) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  try {
    await prisma.contactQuery.delete({ where: { id } })
    revalidatePath("/admin/messages")
    return { success: "Deleted." }
  } catch (e) {
    return { error: "Failed to delete." }
  }
}
