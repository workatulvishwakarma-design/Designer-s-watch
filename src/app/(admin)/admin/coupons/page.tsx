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
          <h2 className="text-xl font-bold leading-6 text-slate-900">Discounts & Coupons</h2>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Create promotional codes for percentage or fixed amount discounts.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/coupons/new"
            className="flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors"
          >
            <Plus className="-ml-0.5 mr-1.5 h-4 w-4" />
            Create Coupon
          </Link>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 border border-blue-200/70 rounded-xl">
            <Ticket className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Coupons</p>
            <p className="text-2xl font-extrabold text-slate-900">{coupons.length}</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 border border-emerald-200/70 rounded-xl">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active</p>
            <p className="text-2xl font-extrabold text-emerald-600">{activeCoupons}</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-indigo-50 border border-indigo-200/70 rounded-xl">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Uses</p>
            <p className="text-2xl font-extrabold text-slate-900">{totalUses}</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-rose-50 border border-rose-200/70 rounded-xl">
            <XCircle className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Expired</p>
            <p className="text-2xl font-extrabold text-slate-900">{expiredCoupons}</p>
          </div>
        </div>
      </div>
      
      <CouponsTable data={mappedData} />
    </div>
  )
}
