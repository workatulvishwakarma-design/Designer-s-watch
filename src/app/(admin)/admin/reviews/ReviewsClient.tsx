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
    const r = reviews.find(item => item.id === id)
    if (!r) return
    await toggleReviewApproval(id, r.isApproved)
    toast.success("Review visibility toggled")
  }

  const handleFeature = async (id: string) => {
    const r = reviews.find(item => item.id === id)
    if (!r) return
    await toggleReviewFeatured(id, r.isFeatured)
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
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Review Master</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Moderate customer feedback and highlight exceptional testimonials.</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs text-center">
          <p className="text-2xl font-extrabold text-slate-900">{stats.total}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Total</p>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs text-center">
          <p className="text-2xl font-extrabold text-amber-500">{stats.avgRating} ★</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Average</p>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs text-center">
          <p className="text-2xl font-extrabold text-emerald-600">{stats.approved}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Public</p>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs text-center">
          <p className="text-2xl font-extrabold text-amber-600">{stats.pendingModeration}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Pending</p>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs text-center">
          <p className="text-2xl font-extrabold text-rose-600">{stats.featured}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Featured</p>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs text-center">
          <p className="text-2xl font-extrabold text-emerald-600">{stats.fiveStars}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">5 Stars</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer, product, or review text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-xs"
          />
        </div>
        <div className="flex gap-1.5 items-center">
          {[0, 5, 4, 3, 2, 1].map(r => (
            <button
              key={r}
              onClick={() => setFilterRating(r)}
              className={`text-xs px-3.5 py-2 rounded-xl font-semibold transition-all ${
                filterRating === r 
                  ? "bg-slate-950 text-white shadow-xs" 
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {r === 0 ? "All" : `${r}★`}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 gap-5">
        {filtered.map((review) => (
          <div
            key={review.id}
            className={`relative bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200 ${!review.isApproved ? "opacity-75 bg-slate-50/50" : ""}`}
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Product & User Info */}
              <div className="md:w-64 flex-shrink-0 space-y-3.5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Product</p>
                  <p className="text-sm font-bold text-slate-900 line-clamp-2">{review.productName}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Customer</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-slate-800">{review.userName}</p>
                    {review.userName !== "Anonymous" && <Badge variant="neutral" className="text-[9px] px-1.5 py-0">Verified</Badge>}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Date</p>
                  <p className="text-xs font-medium text-slate-600">{review.createdAt}</p>
                </div>
              </div>

              {/* Content & Rating */}
              <div className="flex-1 space-y-3 border-l border-slate-200 md:pl-6">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-slate-200"}`} />
                  ))}
                </div>
                <p className="text-sm font-medium leading-relaxed text-slate-800">
                  &quot;{review.comment}&quot;
                </p>
                {review.adminReply && (
                  <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-slate-900">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-1">Official Response</p>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{review.adminReply}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-row md:flex-col justify-end gap-2.5 mt-4 md:mt-0">
                <div className="flex gap-2">
                  <Badge variant={review.isApproved ? "success" : "warning"}>
                    {review.isApproved ? "Public" : "Hidden"}
                  </Badge>
                  {review.isFeatured && (
                    <Badge variant="success" className="bg-rose-50 text-rose-700 border-rose-200">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="flex md:flex-col gap-2">
                  <button
                    onClick={() => handleApprove(review.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> {review.isApproved ? "Hide" : "Approve"}
                  </button>
                  <button
                    onClick={() => handleFeature(review.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors ${review.isFeatured ? "text-rose-600 bg-rose-50 border-rose-200" : "text-slate-700"}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${review.isFeatured ? "fill-current" : ""}`} /> {review.isFeatured ? "Unfeature" : "Feature"}
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-700 rounded-lg hover:bg-rose-100 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-20 text-center bg-white border border-dashed border-slate-300 rounded-2xl">
            <Star className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-600">No reviews match your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
