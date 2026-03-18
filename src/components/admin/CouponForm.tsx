"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { upsertCoupon } from "@/actions/admin.coupon.actions"

export function CouponForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    if (initialData?.id) formData.append("id", initialData.id)

    try {
      const res = await upsertCoupon(formData)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success(res.success)
        router.push("/admin/coupons")
      }
    } catch (e) {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {initialData ? "Modify Promotion" : "Create New Promotion"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">Configure discount rules and usage limits.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/coupons"
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-black dark:bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white dark:text-black shadow-lg hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {isPending ? "Processing..." : "Save Coupon"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Core Configuration */}
        <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 sm:rounded-2xl p-8 space-y-8">
          <div className="space-y-4">
            <label htmlFor="code" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Coupon Code</label>
            <input
              type="text"
              name="code"
              id="code"
              required
              defaultValue={initialData?.code}
              className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm font-mono uppercase focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              placeholder="e.g. WELCOME10"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <label htmlFor="discountType" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Type</label>
              <select
                id="discountType"
                name="discountType"
                defaultValue={initialData?.discountType || "PERCENTAGE"}
                className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm"
              >
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FIXED">Fixed Amount (₹)</option>
              </select>
            </div>
            <div className="space-y-4">
              <label htmlFor="discountValue" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Value</label>
              <input
                type="number"
                step="0.01"
                name="discountValue"
                id="discountValue"
                required
                defaultValue={initialData?.discountValue}
                className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white">Active Status</span>
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  defaultChecked={initialData?.isActive ?? true}
                  className="h-5 w-5 rounded-lg border-gray-300 dark:border-zinc-700 text-black dark:bg-zinc-950 focus:ring-black"
                />
             </div>
          </div>
        </div>

        {/* Usage Rules */}
        <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 sm:rounded-2xl p-8 space-y-8">
          <div className="space-y-4">
            <label htmlFor="minCartAmount" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Min. Spend (₹)</label>
            <input
              type="number"
              name="minCartAmount"
              id="minCartAmount"
              defaultValue={initialData?.minCartAmount}
              className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm"
              placeholder="Optional"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <label htmlFor="maxUses" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Global Limit</label>
              <input
                type="number"
                name="maxUses"
                id="maxUses"
                defaultValue={initialData?.maxUses}
                className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm"
                placeholder="Total uses"
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="perUserLimit" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Per User</label>
              <input
                type="number"
                name="perUserLimit"
                id="perUserLimit"
                defaultValue={initialData?.perUserLimit || 1}
                className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label htmlFor="expiresAt" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Expiry Date</label>
            <input
              type="date"
              name="expiresAt"
              id="expiresAt"
              defaultValue={initialData?.expiresAt ? new Date(initialData.expiresAt).toISOString().split('T')[0] : ""}
              className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm"
            />
          </div>
        </div>
      </div>
    </form>
  )
}
