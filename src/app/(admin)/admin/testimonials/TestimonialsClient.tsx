"use client"

import { useState } from "react"
import { Star, Heart, MessageSquare, Eye, Check, X, Grid3X3, List, Search } from "lucide-react"
import { Badge } from "@/components/admin/Badge"
import { Drawer } from "@/components/admin/Drawer"
import { DataTable, Column } from "@/components/admin/DataTable"
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
  approved: number
  featured: number
  avgRating: string
  pendingModeration: number
}

export function TestimonialsClient({ reviews, stats }: { reviews: ReviewItem[]; stats: Stats }) {
  const [viewMode, setViewMode] = useState<"grid" | "table">("table")
  const [selected, setSelected] = useState<ReviewItem | null>(null)
  const [filterRating, setFilterRating] = useState(0)
  const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "pending" | "featured">("all")

  const filtered = reviews.filter(r => {
    if (filterRating > 0 && r.rating !== filterRating) return false
    if (filterStatus === "approved" && !r.isApproved) return false
    if (filterStatus === "pending" && r.isApproved) return false
    if (filterStatus === "featured" && !r.isFeatured) return false
    return true
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
    if (!confirm("Delete this review permanently?")) return
    await deleteReview(id)
    toast.success("Review deleted")
    setSelected(null)
  }

  const columns: Column<ReviewItem>[] = [
    {
      header: "Customer",
      accessor: (row) => (
        <div>
          <p className="text-xs font-bold text-gray-900 dark:text-white">{row.userName}</p>
          <p className="text-[10px] text-gray-500">{row.userEmail}</p>
        </div>
      ),
      exportValue: (row) => row.userName,
    },
    {
      header: "Product",
      accessor: (row) => <span className="text-xs text-gray-700 dark:text-gray-300 truncate max-w-[150px] block">{row.productName}</span>,
      exportValue: (row) => row.productName,
    },
    {
      header: "Rating",
      accessor: (row) => (
        <div className="flex items-center gap-0.5 text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < row.rating ? "fill-current" : "text-gray-200 dark:text-zinc-700"}`} />
          ))}
        </div>
      ),
      exportValue: (row) => row.rating,
      sortKey: "rating" as any,
    },
    {
      header: "Comment",
      accessor: (row) => <p className="text-[11px] text-gray-500 line-clamp-1 max-w-[200px]">{row.comment || "—"}</p>,
      exportValue: (row) => row.comment || "—",
    },
    {
      header: "Status",
      accessor: (row) => (
        <div className="flex gap-1.5">
          <Badge variant={row.isApproved ? "success" : "warning"}>{row.isApproved ? "Public" : "Hidden"}</Badge>
          {row.isFeatured && <Badge variant="success" className="bg-pink-50 text-pink-600 border-pink-100 dark:bg-pink-900/10 dark:text-pink-400">★</Badge>}
        </div>
      ),
      exportValue: (row) => `${row.isApproved ? "Public" : "Hidden"}${row.isFeatured ? " ★Featured" : ""}`,
    },
    {
      header: "Date",
      accessor: "createdAt",
      sortKey: "createdAt" as any,
    },
    {
      header: "",
      accessor: (row) => (
        <div className="flex gap-1">
          <button onClick={(e) => { e.stopPropagation(); handleApprove(row.id) }} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" title={row.isApproved ? "Hide" : "Approve"}>
            {row.isApproved ? <Eye className="w-3.5 h-3.5 text-green-600" /> : <Eye className="w-3.5 h-3.5 text-gray-400" />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleFeature(row.id) }} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" title={row.isFeatured ? "Unfeature" : "Feature"}>
            <Heart className={`w-3.5 h-3.5 ${row.isFeatured ? "fill-pink-500 text-pink-500" : "text-gray-400"}`} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setSelected(row) }} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" title="View Details">
            <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      ),
      exportValue: () => "",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white uppercase">Testimonials & Reviews</h2>
          <p className="text-xs text-gray-500 mt-1">Moderate customer feedback and highlight exceptional testimonials.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode("table")} className={`p-2 rounded-lg ${viewMode === "table" ? "bg-black text-white dark:bg-white dark:text-black" : "bg-gray-100 dark:bg-zinc-800 text-gray-500"}`}>
            <List className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-black text-white dark:bg-white dark:text-black" : "bg-gray-100 dark:bg-zinc-800 text-gray-500"}`}>
            <Grid3X3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <button onClick={() => setFilterStatus("all")} className={`bg-white dark:bg-zinc-900 border ${filterStatus === "all" ? "border-black dark:border-white" : "border-gray-100 dark:border-zinc-800"} rounded-xl p-4 shadow-sm text-center`}>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Total</p>
        </button>
        <button onClick={() => setFilterStatus("approved")} className={`bg-white dark:bg-zinc-900 border ${filterStatus === "approved" ? "border-black dark:border-white" : "border-gray-100 dark:border-zinc-800"} rounded-xl p-4 shadow-sm text-center`}>
          <p className="text-2xl font-semibold text-green-600">{stats.approved}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Approved</p>
        </button>
        <button onClick={() => setFilterStatus("pending")} className={`bg-white dark:bg-zinc-900 border ${filterStatus === "pending" ? "border-black dark:border-white" : "border-gray-100 dark:border-zinc-800"} rounded-xl p-4 shadow-sm text-center`}>
          <p className="text-2xl font-semibold text-amber-600">{stats.pendingModeration}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Pending</p>
        </button>
        <button onClick={() => setFilterStatus("featured")} className={`bg-white dark:bg-zinc-900 border ${filterStatus === "featured" ? "border-black dark:border-white" : "border-gray-100 dark:border-zinc-800"} rounded-xl p-4 shadow-sm text-center`}>
          <p className="text-2xl font-semibold text-pink-600">{stats.featured}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Featured</p>
        </button>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center">
          <p className="text-2xl font-semibold text-yellow-500">{stats.avgRating} ★</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Avg Rating</p>
        </div>
      </div>

      {/* Rating filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Filter by rating:</span>
        {[0, 5, 4, 3, 2, 1].map(r => (
          <button key={r} onClick={() => setFilterRating(r)} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${filterRating === r ? "bg-black text-white dark:bg-white dark:text-black" : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"}`}>
            {r === 0 ? "All" : `${r} ★`}
          </button>
        ))}
      </div>

      {/* Table View */}
      {viewMode === "table" ? (
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
          <DataTable
            data={filtered}
            columns={columns}
            keyField="id"
            searchable
            searchPlaceholder="Search reviews..."
            exportable
            exportFilename="DesignerWorld_Reviews"
            pageSize={15}
          />
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(review => (
            <div key={review.id} className={`bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 hover:shadow-xl transition-all cursor-pointer ${!review.isApproved ? "opacity-60" : ""}`} onClick={() => setSelected(review)}>
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-200 dark:text-zinc-700"}`} />
                ))}
              </div>
              <p className="text-sm italic text-gray-800 dark:text-gray-200 leading-relaxed mb-4 line-clamp-3">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800">
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">{review.userName}</p>
                  <p className="text-[10px] text-gray-500">on {review.productName}</p>
                </div>
                <div className="flex gap-1.5">
                  <Badge variant={review.isApproved ? "success" : "warning"}>{review.isApproved ? "Public" : "Hidden"}</Badge>
                  {review.isFeatured && (
                    <Badge variant="success" className="bg-pink-50 text-pink-600 border-pink-100 dark:bg-pink-900/10 dark:text-pink-400">
                      <Heart className="w-3 h-3 fill-current inline mr-1" /> Featured
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-2 py-20 text-center border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl">
              <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-4" />
              <p className="text-sm font-medium text-gray-500">No reviews match your filters.</p>
            </div>
          )}
        </div>
      )}

      {/* Detail Drawer */}
      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Review Detail" width="xl">
        {selected && (
          <div className="space-y-6">
            <div className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < selected.rating ? "fill-current" : "text-gray-200"}`} />
              ))}
              <span className="text-sm font-medium text-gray-500 ml-2">{selected.rating}/5</span>
            </div>

            <div className="bg-gray-50 dark:bg-zinc-900 p-5 rounded-xl border border-gray-100 dark:border-zinc-800">
              <p className="text-sm italic text-gray-800 dark:text-gray-200 leading-relaxed">&ldquo;{selected.comment}&rdquo;</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Customer</p><p className="text-sm font-medium text-gray-900 dark:text-white">{selected.userName}</p></div>
              <div><p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Product</p><p className="text-sm font-medium text-gray-900 dark:text-white">{selected.productName}</p></div>
              <div><p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Date</p><p className="text-sm text-gray-600">{selected.createdAt}</p></div>
            </div>

            {selected.adminReply && (
              <div className="bg-gray-50 dark:bg-zinc-950/50 p-4 rounded-xl border-l-2 border-black dark:border-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white mb-1">Official Response</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{selected.adminReply}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-zinc-800">
              <button onClick={() => handleApprove(selected.id)} className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest border border-gray-200 dark:border-zinc-700 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                <Eye className="w-3.5 h-3.5" /> {selected.isApproved ? "Hide" : "Approve"}
              </button>
              <button onClick={() => handleFeature(selected.id)} className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest border border-gray-200 dark:border-zinc-700 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors ${selected.isFeatured ? "text-pink-600" : ""}`}>
                <Heart className={`w-3.5 h-3.5 ${selected.isFeatured ? "fill-current" : ""}`} /> {selected.isFeatured ? "Unfeature" : "Feature"}
              </button>
              <button onClick={() => handleDelete(selected.id)} className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 transition-colors ml-auto">
                <X className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
