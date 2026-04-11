"use client"

import { useState } from "react"
import { Star, Heart, MessageCircle, Trash2, Eye, Search } from "lucide-react"
import { Badge } from "@/components/admin/Badge"
import { Drawer } from "@/components/admin/Drawer"
import { toggleReviewApproval, toggleReviewFeatured, deleteReview } from "@/actions/admin.review.actions"
import { toast } from "sonner"

interface ReviewItem {
  id: string
  userName: string
  userEmail: string
  productName: string
  productSlug: string
  rating: number
  comment: string
  isApproved: boolean
  isFeatured: boolean
  adminReply: string | null
  createdAt: string
}

interface Stats {
  total: number
  avgRating: string
  approved: number
  pendingModeration: number
  featured: number
  fiveStars: number
}

export function ReviewsClient({ reviews, stats }: { reviews: ReviewItem[]; stats: Stats }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState(0)
  const [selected, setSelected] = useState<ReviewItem | null>(null)

  const filtered = reviews.filter(r => {
    const matchesSearch = !searchTerm || 
      r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = filterRating === 0 || r.rating === filterRating
    return matchesSearch && matchesRating
  })

  const handleApprove = async (id: string) => {
    await toggleReviewApproval(id)
    toast.success("Review visibility toggled")
  }

  const handleFeature = async (id: string) => {
    await toggleReviewFeatured(id)
    toast.success("Featured status toggled")
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this review?")) return
    await deleteReview(id)
    toast.success("Review deleted")
    setSelected(null)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">Review Master</h2>
          <p className="text-xs text-gray-500 mt-1">Moderate customer feedback and highlight exceptional testimonials.</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">{stats.total}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Total</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center">
          <p className="text-xl font-semibold text-yellow-500">{stats.avgRating} ★</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Average</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center">
          <p className="text-xl font-semibold text-green-600">{stats.approved}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Public</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center">
          <p className="text-xl font-semibold text-amber-600">{stats.pendingModeration}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Pending</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center">
          <p className="text-xl font-semibold text-pink-600">{stats.featured}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Featured</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center">
          <p className="text-xl font-semibold text-emerald-600">{stats.fiveStars}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">5 Stars</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer, product, or review text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-black transition-all"
          />
        </div>
        <div className="flex gap-1">
          {[0, 5, 4, 3, 2, 1].map(r => (
            <button key={r} onClick={() => setFilterRating(r)} className={`text-xs px-3 py-2 rounded-lg font-medium transition-colors ${filterRating === r ? "bg-black text-white dark:bg-white dark:text-black" : "bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:bg-gray-200"}`}>
              {r === 0 ? "All" : `${r}★`}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 gap-6">
        {filtered.map((review) => (
          <div
            key={review.id}
            className={`relative bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 ${!review.isApproved ? "opacity-75 grayscale" : ""}`}
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Product & User Info */}
              <div className="md:w-64 flex-shrink-0 space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Product</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2">{review.productName}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Customer</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-gray-900 dark:text-zinc-300">{review.userName}</p>
                    {review.userName !== "Anonymous" && <Badge variant="neutral" className="text-[8px] px-1.5 py-0">Verified</Badge>}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Date</p>
                  <p className="text-[11px] text-gray-500">{review.createdAt}</p>
                </div>
              </div>

              {/* Content & Rating */}
              <div className="flex-1 space-y-4 border-l border-gray-100 dark:border-zinc-800 md:pl-8">
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-200 dark:text-zinc-700"}`} />
                  ))}
                </div>
                <p className="text-sm italic leading-relaxed text-gray-800 dark:text-gray-200">
                  &quot;{review.comment}&quot;
                </p>
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
                    onClick={() => handleApprove(review.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-gray-100 dark:border-zinc-800 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> {review.isApproved ? "Hide" : "Approve"}
                  </button>
                  <button
                    onClick={() => handleFeature(review.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-gray-100 dark:border-zinc-800 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors ${review.isFeatured ? "text-pink-600 dark:text-pink-400" : ""}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${review.isFeatured ? "fill-current" : ""}`} /> {review.isFeatured ? "Unfeature" : "Feature"}
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl">
            <Star className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <p className="text-sm font-medium text-gray-500">No reviews match your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
