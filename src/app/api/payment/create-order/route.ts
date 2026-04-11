/**
 * POST /api/payment/create-order
 * 
 * Creates a Cashfree order for payment processing.
 * Server-side price validation + order creation in DB.
 * Returns payment_session_id for frontend SDK.
 */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  createCashfreeOrder,
  generateOrderId,
  isCashfreeConfigured,
  getCashfreeMode,
  COD_ADVANCE_AMOUNT,
} from "@/lib/cashfree";
import { getProductBySlug } from "@/data/productData";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await req.json();
    const {
      addressId,
      cartItems,
      paymentMethod, // "PREPAID" | "COD"
      couponId,
      customerPhone,
      customerEmail,
      idempotencyKey, // Prevent duplicate orders
    } = body;

    // ── 1. Validate inputs ──
    if (!addressId) {
      return NextResponse.json({ error: "Shipping address required" }, { status: 400 });
    }
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // ── 2. Check for duplicate order (idempotency) ──
    if (idempotencyKey) {
      const existing = await prisma.order.findUnique({
        where: { transactionRef: idempotencyKey },
      });
      if (existing) {
        return NextResponse.json({
          error: "Order already exists",
          orderId: existing.id,
          paymentSessionId: existing.paymentSessionId,
        }, { status: 409 });
      }
    }

    // ── 3. Verify address belongs to user ──
    const address = await prisma.address.findUnique({ where: { id: addressId } });
    if (!address || address.userId !== session.user.id) {
      return NextResponse.json({ error: "Invalid shipping address" }, { status: 400 });
    }

    // ── 4. Resolve products and validate prices on server ──
    let subtotal = 0;
    const resolvedItems: { productId: string; name: string; price: number; quantity: number; isStatic: boolean }[] = [];

    for (const item of cartItems) {
      const slug = item.productId || item.slug;
      const quantity = Number(item.quantity) || 1;

      // Try DB first
      let dbProduct = null;
      try {
        dbProduct = await prisma.product.findFirst({
          where: {
            OR: [{ id: slug }, { slug: slug }],
            status: "ACTIVE",
          },
          select: { id: true, price: true, name: true },
        });
      } catch { /* ignore parse errors for slug-format IDs */ }

      if (dbProduct) {
        const serverPrice = Number(dbProduct.price.toString());
        resolvedItems.push({
          productId: dbProduct.id,
          name: dbProduct.name,
          price: serverPrice,
          quantity,
          isStatic: false,
        });
        subtotal += serverPrice * quantity;
      } else {
        // Static catalog fallback
        const staticProduct = getProductBySlug(slug);
        if (!staticProduct) {
          return NextResponse.json({
            error: `Product "${item.name || slug}" is no longer available`,
          }, { status: 400 });
        }
        resolvedItems.push({
          productId: slug,
          name: staticProduct.name,
          price: staticProduct.price,
          quantity,
          isStatic: true,
        });
        subtotal += staticProduct.price * quantity;
      }
    }

    // ── 5. Apply coupon ──
    let discount = 0;
    let appliedCouponId: string | null = null;
    if (couponId) {
      const coupon = await prisma.coupon.findUnique({ where: { id: couponId } });
      if (coupon && coupon.isActive) {
        if (coupon.discountType === "PERCENTAGE") {
          discount = Math.round(subtotal * Number(coupon.discountValue) / 100);
          if (coupon.maxDiscountAmount) discount = Math.min(discount, Number(coupon.maxDiscountAmount));
        } else {
          discount = Number(coupon.discountValue);
        }
        appliedCouponId = coupon.id;
      }
    }

    // ── 6. Calculate totals ──
    let storeSettings;
    try {
      storeSettings = await prisma.storeSettings.findUnique({ where: { id: "singleton" } });
    } catch { /* use defaults */ }

    const taxRate = Number(storeSettings?.taxRate || 18);
    const freeShipThreshold = Number(storeSettings?.freeShippingThreshold || 5000);
    const flatShipRate = Number(storeSettings?.defaultShippingFee || 150);

    const afterDiscount = subtotal - discount;
    const shipping = afterDiscount >= freeShipThreshold ? 0 : flatShipRate;
    const taxAmount = Math.round(afterDiscount * taxRate / (100 + taxRate));
    const totalAmount = afterDiscount + shipping;

    // ── 7. Determine payment amount ──
    const isCOD = paymentMethod === "COD";
    const paymentAmount = isCOD ? COD_ADVANCE_AMOUNT : totalAmount;
    const balanceDue = isCOD ? totalAmount - COD_ADVANCE_AMOUNT : 0;

    // ── 8. Generate order reference ──
    const transactionRef = idempotencyKey || generateOrderId();

    // ── 9. Create order in DB ──
    const dbItems = resolvedItems.filter(i => !i.isStatic);
    const staticItems = resolvedItems.filter(i => i.isStatic);

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: "PENDING",
        paymentStatus: "PENDING",
        totalAmount,
        taxAmount,
        shippingAmount: shipping,
        paymentMethod: isCOD ? "COD_ADVANCE" : "PREPAID",
        shippingAddressId: addressId,
        couponId: appliedCouponId,
        transactionRef,
        isCOD,
        advancePaid: 0,
        balanceDue: isCOD ? balanceDue : 0,
        customerPhone: customerPhone || address.phone || "",
        customerEmail: customerEmail || session.user.email || "",
        deliveryETA: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        internalNotes: staticItems.length > 0
          ? `Includes static catalog items: ${staticItems.map(i => `${i.name} x${i.quantity} @₹${i.price}`).join(", ")}`
          : null,
        items: {
          create: dbItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.price,
          })),
        },
        trackingEvents: {
          create: {
            status: "PENDING",
            description: `Order created. ${isCOD ? `COD advance ₹${COD_ADVANCE_AMOUNT} pending.` : `Full payment ₹${totalAmount} pending.`} Ref: ${transactionRef}`,
          },
        },
      },
    });

    // ── 10. Create Cashfree order (if configured) ──
    if (isCashfreeConfigured()) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

      const cfResult = await createCashfreeOrder({
        order_id: transactionRef,
        order_amount: paymentAmount,
        customer_details: {
          customer_id: session.user.id,
          customer_phone: (customerPhone || address.phone || "9999999999").replace(/\D/g, "").slice(-10),
          customer_email: customerEmail || session.user.email || "customer@example.com",
          customer_name: `${address.firstName} ${address.lastName}`,
        },
        order_meta: {
          return_url: `${siteUrl}/checkout/status?order_id=${order.id}&txn=${transactionRef}`,
          notify_url: `${siteUrl}/api/payment/webhook`,
        },
        order_note: isCOD
          ? `COD Advance ₹${COD_ADVANCE_AMOUNT} for Order ${order.id}`
          : `Payment for Order ${order.id}`,
      });

      if (cfResult.success) {
        // Update order with Cashfree IDs
        await prisma.order.update({
          where: { id: order.id },
          data: {
            paymentGatewayOrderId: cfResult.data.cf_order_id,
            paymentSessionId: cfResult.data.payment_session_id,
          },
        });

        return NextResponse.json({
          success: true,
          orderId: order.id,
          transactionRef,
          paymentSessionId: cfResult.data.payment_session_id,
          cfOrderId: cfResult.data.cf_order_id,
          paymentAmount,
          isCOD,
          balanceDue,
          cashfreeMode: getCashfreeMode(),
        });
      } else {
        // Cashfree order creation failed — still return order ID for retry
        console.error("[Payment] Cashfree order creation failed:", cfResult.error);
        return NextResponse.json({
          success: false,
          error: `Payment gateway error: ${cfResult.error}`,
          orderId: order.id,
          transactionRef,
        }, { status: 502 });
      }
    }

    // ── 11. Cashfree NOT configured — demo/test mode ──
    return NextResponse.json({
      success: true,
      orderId: order.id,
      transactionRef,
      paymentSessionId: null,
      cfOrderId: null,
      paymentAmount,
      isCOD,
      balanceDue,
      cashfreeMode: "not_configured",
      message: "Payment gateway not configured. Add CASHFREE_APP_ID and CASHFREE_SECRET_KEY to .env",
    });

  } catch (error) {
    console.error("[Payment] Create order error:", error);
    return NextResponse.json({
      error: `Server error: ${error instanceof Error ? error.message : String(error)}`,
    }, { status: 500 });
  }
}
