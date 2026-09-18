"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const reviewSchema = z.object({
  productId: z.string().min(1),
  rating: z.coerce.number().min(1).max(5),
  title: z.string().min(2, "Title is too short").max(50, "Title is too long"),
  content: z.string().min(10, "Review content must be at least 10 characters"),
})

export async function submitReview(formData: FormData) {
  const session = await auth()
  if (!session || !session.user?.id) {
    return { error: "You must be logged in to review a product." }
  }

  const parsed = reviewSchema.safeParse({
    productId: formData.get("productId"),
    rating: formData.get("rating"),
    title: formData.get("title"),
    content: formData.get("content"),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { productId, rating, title, content } = parsed.data

  try {
    let family = await prisma.productFamily.findFirst({
      where: {
        OR: [
          { id: productId },
          { slug: productId }
        ]
      }
    })

    if (!family) {
      const variant = await prisma.productVariant.findUnique({
        where: { id: productId },
        include: { family: true }
      })
      if (variant) {
        family = variant.family
      }
    }

    if (!family) {
      return { error: "Product not found." }
    }

    // Has user ordered this product family?
    const hasOrdered = await prisma.orderItem.findFirst({
      where: {
        variant: { familyId: family.id },
        order: { userId: session.user.id } 
      }
    })

    if (!hasOrdered) {
      return { error: "You can only review timepieces you have ordered." }
    }

    // Has user already reviewed?
    const existing = await prisma.review.findFirst({
      where: { familyId: family.id, userId: session.user.id }
    })

    if (existing) {
      return { error: "You have already reviewed this timepiece." }
    }

    await prisma.review.create({
      data: {
        familyId: family.id,
        userId: session.user.id,
        rating,
        comment: `[${title}] ${content}`,
        isApproved: false,
      }
    })

    revalidatePath(`/products/${family.slug}`)
    revalidatePath("/admin/reviews")
    return { success: "Review submitted successfully and is pending moderation." }

  } catch (error) {
    return { error: "Failed to submit review." }
  }
}
