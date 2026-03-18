"use client"

import { useState } from "react"
import { submitReview } from "@/actions/user.review.actions"
import { toast } from "sonner"
import { Star, Loader2 } from "lucide-react"

export function ProductReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isPending, setIsPending] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    const formData = new FormData(e.currentTarget)
    formData.append("productId", productId)
    formData.append("rating", rating.toString())

    const res = await submitReview(formData)
    if (res.error) {
       toast.error(res.error)
    } else {
       toast.success(res.success)
       setHasSubmitted(true)
    }
    setIsPending(false)
  }

  if (hasSubmitted) {
    return (
       <div className="bg-[#FAF8F4] border border-[#E8E0D5] rounded-xl p-8 text-center max-w-2xl mx-auto my-12">
          <Star className="h-10 w-10 text-[#B8935A] fill-[#B8935A] mx-auto mb-4" />
          <h3 className="font-display text-2xl text-[#1A1918] mb-2">Thank you!</h3>
          <p className="font-body text-[#9C9690] text-sm md:text-base">Your exquisite review has been submitted and is pending curation by our team.</p>
       </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto my-16 bg-white border border-[#E8E0D5] p-8 md:p-10 rounded-2xl shadow-sm">
       <div className="text-center mb-10">
          <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#B8935A] mb-2">OWNERS ONLY</p>
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#1A1918] font-light">
            Share Your Experience
          </h2>
          <div className="w-10 h-[0.5px] bg-[#B8935A] mx-auto mt-4" />
       </div>

       <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center justify-center">
             <label className="font-dm text-[11px] tracking-[0.15em] uppercase text-[#9C9690] mb-3">Overall Rating</label>
             <div className="flex gap-2">
               {[1,2,3,4,5].map(star => (
                 <button
                   key={star}
                   type="button"
                   onClick={() => setRating(star)}
                   onMouseEnter={() => setHoveredRating(star)}
                   onMouseLeave={() => setHoveredRating(0)}
                   className="focus:outline-none transition-transform hover:scale-110"
                 >
                   <Star 
                     size={32} 
                     className={`transition-colors ${
                       star <= (hoveredRating || rating) 
                         ? "text-[#B8935A] fill-[#B8935A]" 
                         : "text-[#E8E0D5] fill-transparent"
                     }`}
                     strokeWidth={1}
                   />
                 </button>
               ))}
             </div>
          </div>

          <div>
            <label className="block font-dm text-[11px] tracking-[0.15em] uppercase text-[#9C9690] mb-2">Review Title</label>
            <input 
               type="text" 
               name="title" 
               required 
               placeholder="Summarize your thoughts"
               className="w-full bg-[#FAF8F4] border border-[#E8E0D5] rounded-lg px-4 py-3 font-body text-sm text-[#1A1918] focus:border-[#B8935A] focus:ring-1 focus:ring-[#B8935A] outline-none transition-all"
            />
          </div>

          <div>
             <label className="block font-dm text-[11px] tracking-[0.15em] uppercase text-[#9C9690] mb-2">Your Review</label>
             <textarea 
               name="content" 
               required
               rows={5}
               placeholder="Tell us about the craftsmanship, feel, and performance..."
               className="w-full bg-[#FAF8F4] border border-[#E8E0D5] rounded-lg px-4 py-3 font-body text-sm text-[#1A1918] focus:border-[#B8935A] focus:ring-1 focus:ring-[#B8935A] outline-none transition-all resize-none"
             />
          </div>

          <button
             type="submit"
             disabled={isPending}
             className="w-full bg-[#1A1918] text-white py-4 px-6 rounded-full font-body text-xs tracking-widest uppercase hover:bg-[#B8935A] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
          >
             {isPending ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : "Submit Review"}
          </button>
       </form>
    </div>
  )
}
