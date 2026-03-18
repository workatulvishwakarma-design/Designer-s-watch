import { prisma } from "@/lib/db"
import { MessageSquare, Star, Heart } from "lucide-react"
import { Badge } from "@/components/admin/Badge"

export default async function AdminTestimonialsPage() {
  const reviews = await prisma.review.findMany({
    where: { isFeatured: true },
    include: {
      user: { select: { name: true, email: true } },
      product: { select: { name: true } }
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white uppercase">Featured Testimonials</h2>
        <p className="text-xs text-gray-500 mt-1">Highlight exceptional customer stories that represent the boutique experience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 hover:shadow-xl transition-all">
            <div className="flex items-center gap-1 text-yellow-500 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-200 dark:text-zinc-700"}`} 
                />
              ))}
            </div>
            <p className="text-sm italic text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
              &ldquo;{review.comment}&rdquo;
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800">
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">{review.user.name || "Anonymous"}</p>
                <p className="text-[10px] text-gray-500">on {review.product.name}</p>
              </div>
              <Badge variant="success" className="bg-pink-50 text-pink-600 border-pink-100 dark:bg-pink-900/10 dark:text-pink-400">
                <Heart className="w-3 h-3 fill-current inline mr-1" /> Featured
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl">
          <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-4" />
          <p className="text-sm font-medium text-gray-500">No featured testimonials yet.</p>
          <p className="text-xs text-gray-400 mt-1">Feature reviews from the <a href="/admin/reviews" className="underline text-black dark:text-white">Review Master</a> page.</p>
        </div>
      )}
    </div>
  )
}
