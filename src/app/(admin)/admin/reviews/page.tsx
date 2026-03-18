import { prisma } from "@/lib/db"
import { Badge } from "@/components/admin/Badge"
import { Star, MessageCircle, Eye, Trash2, Heart } from "lucide-react"
import { toggleReviewApproval, toggleReviewFeatured, deleteReview } from "@/actions/admin.review.actions"

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    include: {
      user: { select: { name: true, email: true } },
      product: { select: { name: true, slug: true } }
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">Review Master</h2>
          <p className="text-xs text-gray-500 mt-1">Moderate customer feedback and highlight exceptional testimonials.</p>
        </div>
        <div className="flex gap-4">
           {/* Summary Stats could go here */}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className={`
              relative bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 hover:shadow-xl transition-all duration-300
              ${!review.isApproved ? "opacity-75 grayscale" : ""}
            `}
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Product & User Info */}
              <div className="md:w-64 flex-shrink-0 space-y-4">
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Product</p>
                   <p className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2">{review.product.name}</p>
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Customer</p>
                   <div className="flex items-center gap-2">
                     <p className="text-xs font-medium text-gray-900 dark:text-zinc-300">{review.user.name || "Anonymous User"}</p>
                     {review.user.name && <Badge variant="neutral" className="text-[8px] px-1.5 py-0">Verified</Badge>}
                   </div>
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Date</p>
                   <p className="text-[11px] text-gray-500">{review.createdAt.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>

              {/* Content & Rating */}
              <div className="flex-1 space-y-4 border-l border-gray-100 dark:border-zinc-800 md:pl-8">
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-200 dark:text-zinc-700"}`} 
                    />
                  ))}
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm italic leading-relaxed text-gray-800 dark:text-gray-200">
                    "{review.comment}"
                  </p>
                </div>

                {review.adminReply && (
                  <div className="bg-gray-50 dark:bg-zinc-950/50 p-4 rounded-xl border-l-2 border-black dark:border-white">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white mb-1">Official Response</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{review.adminReply}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-row md:flex-col justify-end gap-3 mt-4 md:mt-0">
                <div className="flex gap-2">
                  <Badge variant={review.isApproved ? "success" : "warning"}>
                    {review.isApproved ? "Public" : "Hidden"}
                  </Badge>
                  {review.isFeatured && (
                    <Badge variant="success" className="bg-pink-50 text-pink-600 border-pink-100 dark:bg-pink-900/10 dark:text-pink-400 dark:border-pink-800">
                       Featured
                    </Badge>
                  )}
                </div>
                <div className="flex md:flex-col gap-2">
                  <button 
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-gray-100 dark:border-zinc-800 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> Reply
                  </button>
                  <button 
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-gray-100 dark:border-zinc-800 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 ${review.isFeatured ? "text-pink-600 dark:text-pink-400" : ""}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${review.isFeatured ? "fill-current" : ""}`} /> Feature
                  </button>
                  <button 
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> 
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl">
            <Star className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <p className="text-sm font-medium text-gray-500">The hall of mirrors is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  )
}
