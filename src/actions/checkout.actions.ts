"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { getProductBySlug } from "@/data/productData"

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

    // 2.5 Resolve products — handles both DB IDs (CUID) and slug-based IDs
    // Cart items now use slug as productId. We need to look them up.
    const resolvedItems: { productId: string; quantity: number; price: number; name: string }[] = []

    for (const item of items) {
      const productId = item.productId // This is now a slug

      // Try to find by ID (for backward compat with old cart data)
      let dbProduct = null
      try {
        dbProduct = await prisma.product.findFirst({
          where: {
            OR: [
              { id: productId },
              { slug: productId },
            ],
            status: "ACTIVE",
          },
          select: { id: true, price: true, status: true, name: true }
        })
      } catch(e) {
        // May fail if productId format doesn't match DB expectations
      }

      if (dbProduct) {
        // DB product found — use live price
        resolvedItems.push({
          productId: dbProduct.id,
          quantity: Number(item.quantity),
          price: Number(dbProduct.price?.toString() || 0),
          name: dbProduct.name,
        })
      } else {
        // Try static catalog lookup by slug
        const staticProduct = getProductBySlug(productId)
        if (staticProduct) {
          // For static products in demo: create a temporary product record in DB
          // or use the cart price (trusted for demo)
          resolvedItems.push({
            productId: productId, // slug
            quantity: Number(item.quantity),
            price: item.price || staticProduct.price,
            name: staticProduct.name,
          })
        } else {
          return { error: `Product "${item.name || productId}" is no longer available. Please remove it from your cart.` }
        }
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

    // 9. Create order — only include items that have valid DB product IDs
    const dbItems = resolvedItems.filter(item => {
      // Check if productId looks like a CUID (DB ID)
      return item.productId.length > 20 // CUIDs are typically 25+ chars
    })

    const staticItems = resolvedItems.filter(item => item.productId.length <= 20)

    // For DB products, create proper order items
    // For static products, we'll include them in internal notes
    const order = await prisma.order.create({
      data: {
        userId,
        status: "PROCESSING",
        totalAmount,
        taxAmount,
        shippingAmount: shipping,
        paymentMethod: parsed.data.paymentMethod,
        shippingAddressId: address.id,
        couponId: appliedCouponId,
        internalNotes: staticItems.length > 0
          ? `Demo order includes static catalog items: ${staticItems.map(i => `${i.name} x${i.quantity} @₹${i.price}`).join(', ')}`
          : null,
        items: {
          create: dbItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.price,
          }))
        },
        trackingEvents: {
          create: {
            status: "PROCESSING",
            description: `Order confirmed. Payment received via ${parsed.data.paymentMethod}. Reference: ${txnRef}`
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
