import { prisma } from "@/lib/db"
import { CouponsTable } from "./CouponsTable"
import Link from "next/link"
import { Plus, Ticket, TrendingUp, CheckCircle, XCircle } from "lucide-react"

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" }
  })

  const mappedData = coupons.map(c => ({
    id: c.id,
    code: c.code,
    discount: c.discountType === "PERCENTAGE" ? `${c.discountValue.toString()}%` : `₹${c.discountValue.toString()}`,
    type: c.discountType,
    usage: `${c.usedCount} / ${c.maxUses || '∞'}`,
    status: c.isActive,
    expires: c.expiresAt ? c.expiresAt.toLocaleDateString() : "Never",
  }))

  const totalUses = coupons.reduce((s, c) => s + c.usedCount, 0)
  const activeCoupons = coupons.filter(c => c.isActive).length
  const expiredCoupons = coupons.filter(c => c.expiresAt && c.expiresAt < new Date()).length

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-100">Discounts & Coupons</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Create promotional codes for percentage or fixed amount discounts.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/coupons/new"
            className="flex items-center justify-center rounded-md bg-black dark:bg-white px-3 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <Plus className="-ml-0.5 mr-1.5 h-4 w-4" />
            Create Coupon
          </Link>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
            <Ticket className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Coupons</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">{coupons.length}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Active</p>
            <p className="text-xl font-semibold text-green-600">{activeCoupons}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-900/10 rounded-xl">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Uses</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">{totalUses}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-xl">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Expired</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">{expiredCoupons}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <CouponsTable data={mappedData} />
      </div>
    </div>
  )
}
