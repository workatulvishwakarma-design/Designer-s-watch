"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const checkoutSchema = z.object({
  addressId: z.string().min(1, "Shipping Address is required"),
  cartItems: z.string(),
  couponId: z.string().optional(),
  paymentMethod: z.string().default("DEMO_GATEWAY"),
})

export async function processCheckout(formData: FormData) {
  const session = await auth()
  
  if (!session || !session.user?.id) {
    return { error: "You must be logged in to checkout." }
  }

  const userId = session.user.id

  const parsed = checkoutSchema.safeParse({
    addressId: formData.get("addressId"),
    cartItems: formData.get("cartItems"),
    couponId: formData.get("couponId") || undefined,
    paymentMethod: formData.get("paymentMethod") || "DEMO_GATEWAY",
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  let items: any[] = []
  try {
    items = JSON.parse(parsed.data.cartItems)
    if (!Array.isArray(items) || items.length === 0) {
      return { error: "Your cart is empty." }
    }
  } catch(e) {
    return { error: "Invalid cart data." }
  }

  try {
    // 1. Verify address
    const address = await prisma.address.findUnique({ where: { id: parsed.data.addressId } })
    if (!address || address.userId !== userId) {
      return { error: "Invalid shipping address." }
    }

    // 2. Get store settings for tax
    let taxRate = 18
    let taxLabel = "GST"
    let freeShipThreshold = 5000
    let flatShipRate = 150
    try {
      const settings = await prisma.storeSettings.findUnique({ where: { id: "singleton" } })
      if (settings) {
        taxRate = Number(settings.taxRate)
        taxLabel = settings.taxLabel || "GST"
        freeShipThreshold = Number(settings.freeShippingThreshold)
        flatShipRate = Number(settings.defaultShippingFee)
      }
    } catch(e) {
      // Use defaults if storeSettings fails
    }

    // 2.5 Resolve products using variant DB
    const resolvedItems: { variantId: string; quantity: number; price: number; name: string }[] = []

    for (const item of items) {
      const skuOrId = item.productId // Cart item uses sku or id
      const quantity = Number(item.quantity)

      const dbVariant = await prisma.productVariant.findFirst({
        where: {
          OR: [
            { id: skuOrId },
            { sku: skuOrId },
          ]
        },
        include: {
          family: true,
          inventory: true
        }
      })

      if (dbVariant) {
        if (dbVariant.inventory && dbVariant.inventory.stock < quantity) {
          return { error: `Not enough stock for "${dbVariant.family.name} - ${dbVariant.sku}".` }
        }

        resolvedItems.push({
          variantId: dbVariant.id,
          quantity: quantity,
          price: Number(dbVariant.price.toString() || 0),
          name: `${dbVariant.family.name} - ${dbVariant.sku}`,
        })
      } else {
        return { error: `Product "${item.name || skuOrId}" is no longer available. Please remove it from your cart.` }
      }
    }

    // 3. Calculate totals securely
    const subtotal = resolvedItems.reduce((acc, item) => {
      return acc + (item.price * item.quantity)
    }, 0)
    
    // 4. Apply coupon discount
    let discount = 0
    let appliedCouponId: string | null = null
    if (parsed.data.couponId) {
      const coupon = await prisma.coupon.findUnique({ where: { id: parsed.data.couponId } })
      if (coupon && coupon.isActive) {
        if (coupon.discountType === "PERCENTAGE") {
          discount = Math.round(subtotal * Number(coupon.discountValue) / 100)
          if (coupon.maxDiscountAmount) discount = Math.min(discount, Number(coupon.maxDiscountAmount))
        } else {
          discount = Number(coupon.discountValue)
        }
        appliedCouponId = coupon.id
        await prisma.coupon.update({ where: { id: coupon.id }, data: { usedCount: { increment: 1 } } })
      }
    }

    // 5. Calculate shipping
    const afterDiscount = subtotal - discount
    const shipping = afterDiscount >= freeShipThreshold ? 0 : flatShipRate

    // 6. Calculate tax (inclusive model)
    const taxAmount = Math.round(afterDiscount * taxRate / (100 + taxRate))

    // 7. Final total
    const totalAmount = afterDiscount + shipping

    // 8. Generate transaction reference
    const txnRef = `DW-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    const order = await prisma.order.create({
      data: {
        userId,
        status: "PENDING",
        totalAmount,
        taxAmount,
        shippingAmount: shipping,
        paymentMethod: parsed.data.paymentMethod,
        shippingAddressId: address.id,
        couponId: appliedCouponId,
        internalNotes: null,
        items: {
          create: resolvedItems.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
            priceAtPurchase: item.price,
          }))
        },
        trackingEvents: {
          create: {
            status: "PENDING",
            description: `Order initiated. Awaiting payment via ${parsed.data.paymentMethod}. Reference: ${txnRef}`
          }
        }
      }
    })

    revalidatePath("/admin/dashboard")
    revalidatePath("/admin/analytics")
    revalidatePath("/admin/orders")

    return { 
      success: true, 
      orderId: order.id,
      txnRef,
      totalAmount,
      discount,
      shipping,
      taxAmount,
      taxLabel,
    }

  } catch (error) {
    console.error("Checkout processing error:", error)
    return { error: `Failed to process order: ${error instanceof Error ? error.message : String(error)}` }
  }
}
