import { prisma } from "@/lib/db"
import { ReviewsClient } from "./ReviewsClient"

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    include: {
      user: { select: { name: true, email: true } },
      product: { select: { name: true, slug: true } }
    },
    orderBy: { createdAt: "desc" }
  })

  const mappedData = reviews.map(r => ({
    id: r.id,
    userName: r.user.name || "Anonymous",
    userEmail: r.user.email || "",
    productName: r.product.name,
    productSlug: r.product.slug,
    rating: r.rating,
    comment: r.comment || "",
    isApproved: r.isApproved,
    isFeatured: r.isFeatured,
    adminReply: r.adminReply,
    createdAt: r.createdAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
  }))

  const stats = {
    total: reviews.length,
    avgRating: reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0",
    approved: reviews.filter(r => r.isApproved).length,
    pendingModeration: reviews.filter(r => !r.isApproved).length,
    featured: reviews.filter(r => r.isFeatured).length,
    fiveStars: reviews.filter(r => r.rating === 5).length,
  }

  return <ReviewsClient reviews={mappedData} stats={stats} />
}
