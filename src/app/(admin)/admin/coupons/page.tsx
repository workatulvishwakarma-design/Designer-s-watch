import { prisma } from "@/lib/db"
import { CouponsTable } from "./CouponsTable"
import Link from "next/link"
import { Plus } from "lucide-react"

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
      
      <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <CouponsTable data={mappedData} />
      </div>
    </div>
  )
}
