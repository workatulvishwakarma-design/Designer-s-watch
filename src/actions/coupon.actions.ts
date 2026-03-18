"use server"

import { prisma } from "@/lib/db"

export async function validateCoupon(code: string, subtotal: number) {
  if (!code || code.trim().length === 0) {
    return { error: "Please enter a coupon code." }
  }

  const coupon = await prisma.coupon.findUnique({
    where: { code: code.toUpperCase().trim() }
  })

  if (!coupon) {
    return { error: "Invalid coupon code." }
  }

  if (!coupon.isActive) {
    return { error: "This coupon is no longer active." }
  }

  if (coupon.expiresAt && coupon.expiresAt < new Date()) {
    return { error: "This coupon has expired." }
  }

  if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
    return { error: "This coupon has reached its usage limit." }
  }

  if (coupon.minCartAmount && subtotal < Number(coupon.minCartAmount)) {
    return { error: `Minimum order value of ₹${Number(coupon.minCartAmount).toLocaleString()} required.` }
  }

  // Calculate discount
  let discount = 0
  if (coupon.discountType === "PERCENTAGE") {
    discount = Math.round(subtotal * Number(coupon.discountValue) / 100)
    if (coupon.maxDiscountAmount) {
      discount = Math.min(discount, Number(coupon.maxDiscountAmount))
    }
  } else {
    discount = Number(coupon.discountValue)
  }

  return {
    success: true,
    couponId: coupon.id,
    code: coupon.code,
    discountType: coupon.discountType,
    discountValue: Number(coupon.discountValue),
    discount,
    description: coupon.discountType === "PERCENTAGE" 
      ? `${coupon.discountValue}% off` 
      : `₹${Number(coupon.discountValue).toLocaleString()} off`
  }
}
