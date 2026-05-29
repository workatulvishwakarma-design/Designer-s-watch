import { prisma } from "@/lib/db"
import { CouponForm } from "@/components/admin/CouponForm"
import { notFound } from "next/navigation"

export default async function EditCouponPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const coupon = await prisma.coupon.findUnique({
    where: { id }
  })

  if (!coupon) notFound()

  // Convert Decimal and Date objects to plain JS types before passing to client components
  const serializedCoupon = {
    ...coupon,
    discountValue: Number(coupon.discountValue),
    minCartAmount: coupon.minCartAmount ? Number(coupon.minCartAmount) : null,
    maxDiscountAmount: coupon.maxDiscountAmount ? Number(coupon.maxDiscountAmount) : null,
    startDate: coupon.startDate ? coupon.startDate.toISOString() : null,
    expiresAt: coupon.expiresAt ? coupon.expiresAt.toISOString() : null,
    createdAt: coupon.createdAt.toISOString(),
    updatedAt: coupon.updatedAt.toISOString(),
  }

  return (
    <div className="py-6">
      <CouponForm initialData={serializedCoupon} />
    </div>
  )
}
