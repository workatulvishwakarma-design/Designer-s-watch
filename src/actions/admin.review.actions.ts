"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function toggleReviewApproval(id: string, currentStatus: boolean) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  try {
    await prisma.review.update({
      where: { id },
      data: { isApproved: !currentStatus }
    })
    revalidatePath("/admin/reviews")
    return { success: !currentStatus ? "Review approved" : "Review hidden" }
  } catch (e) {
    return { error: "Failed to update review status." }
  }
}

export async function toggleReviewFeatured(id: string, currentStatus: boolean) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  try {
    await prisma.review.update({
      where: { id },
      data: { isFeatured: !currentStatus }
    })
    revalidatePath("/admin/reviews")
    return { success: !currentStatus ? "Marked as featured" : "Removed from featured" }
  } catch (e) {
    return { error: "Failed to update featured status." }
  }
}

export async function saveReviewReply(id: string, reply: string) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  try {
    await prisma.review.update({
      where: { id },
      data: { adminReply: reply }
    })
    revalidatePath("/admin/reviews")
    return { success: "Reply saved." }
  } catch (e) {
    return { error: "Failed to save reply." }
  }
}

export async function deleteReview(id: string) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  try {
    await prisma.review.delete({ where: { id } })
    revalidatePath("/admin/reviews")
    return { success: "Review deleted permanently." }
  } catch (e) {
    return { error: "Failed to delete review." }
  }
}
