/**
 * POST /api/payment/razorpay/create-order
 *
 * Creates a Razorpay order for payment processing.
 * Server-side price validation + order creation in DB.
 * Returns order_id for frontend Razorpay Standard Checkout modal.
 */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  createRazorpayOrder,
  isRazorpayConfigured,
  getRazorpayKeyId,
} from "@/lib/razorpay";
import { generateOrderId, COD_ADVANCE_AMOUNT } from "@/lib/cashfree";
import { ensureProductVariant } from "@/lib/ensureProductVariant";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // ── 0. Check Razorpay configuration ──
    if (!isRazorpayConfigured()) {
      return NextResponse.json(
        { error: "Razorpay payment gateway not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env" },
        { status: 503 }
      );
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
        return NextResponse.json(
          {
            error: "Order already exists",
            orderId: existing.id,
          },
          { status: 409 }
        );
      }
    }

    // ── 3. Verify address belongs to user ──
    const address = await prisma.address.findUnique({ where: { id: addressId } });
    if (!address || address.userId !== session.user.id) {
      return NextResponse.json({ error: "Invalid shipping address" }, { status: 400 });
    }

    // ── 4. Resolve products and validate prices on server ──
    let subtotal = 0;
    const resolvedItems: { productId: string; name: string; price: number; quantity: number; isStatic?: boolean }[] = [];

    for (const item of cartItems) {
      const slug = item.productId || item.slug;
      const quantity = Number(item.quantity) || 1;

      const dbVariant = await ensureProductVariant(slug);

      if (!dbVariant || !dbVariant.family) {
        return NextResponse.json(
          { error: `Product "${item.name || slug}" is no longer available` },
          { status: 400 }
        );
      }

      if (dbVariant.inventory && dbVariant.inventory.stock < quantity) {
        return NextResponse.json(
          { error: `Not enough stock for "${dbVariant.family.name} - ${dbVariant.sku}"` },
          { status: 400 }
        );
      }

      const serverPrice = Number(dbVariant.price.toString());
      resolvedItems.push({
        productId: dbVariant.id,
        name: `${dbVariant.family.name} - ${dbVariant.sku}`,
        price: serverPrice,
        quantity,
        isStatic: false,
      });
      subtotal += serverPrice * quantity;
    }

    // ── 5. Apply coupon ──
    let discount = 0;
    let appliedCouponId: string | null = null;
    if (couponId) {
      const coupon = await prisma.coupon.findUnique({ where: { id: couponId } });
      if (coupon && coupon.isActive) {
        if (coupon.discountType === "PERCENTAGE") {
          discount = Math.round((subtotal * Number(coupon.discountValue)) / 100);
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
    } catch {
      /* use defaults */
    }

    const taxRate = Number(storeSettings?.taxRate || 18);
    const freeShipThreshold = Number(storeSettings?.freeShippingThreshold || 5000);
    const flatShipRate = Number(storeSettings?.defaultShippingFee || 150);

    const afterDiscount = subtotal - discount;
    const shipping = afterDiscount >= freeShipThreshold ? 0 : flatShipRate;
    const taxAmount = Math.round((afterDiscount * taxRate) / (100 + taxRate));
    const totalAmount = afterDiscount + shipping;

    // ── 7. Determine payment amount ──
    const isCOD = paymentMethod === "COD";
    const paymentAmount = isCOD ? COD_ADVANCE_AMOUNT : totalAmount;
    const balanceDue = isCOD ? totalAmount - COD_ADVANCE_AMOUNT : 0;

    // ── 8. Generate order reference ──
    const transactionRef = idempotencyKey || generateOrderId();

    // ── 9. Create Razorpay order (amount in paise) ──
    const rzpResult = await createRazorpayOrder({
      amount: Math.round(paymentAmount * 100), // Convert ₹ to paise
      currency: "INR",
      receipt: transactionRef,
      notes: {
        customer_id: session.user.id,
        is_cod: isCOD ? "true" : "false",
      },
    });

    if (!rzpResult.success) {
      console.error("[Razorpay] Order creation failed:", rzpResult.error);

      // Distinguish auth errors from other gateway errors
      const isAuthError = 'isAuthError' in rzpResult && rzpResult.isAuthError;
      const statusCode = isAuthError ? 401 : 502;
      const errorMessage = isAuthError
        ? `Razorpay authentication failed. Please verify RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env are correct and active on the Razorpay dashboard.`
        : `Payment gateway error: ${rzpResult.error}`;

      return NextResponse.json(
        { error: errorMessage, razorpayError: rzpResult.error, isAuthError },
        { status: statusCode }
      );
    }

    // ── 10. Create order in DB ──
    const dbItems = resolvedItems.filter((i) => !i.isStatic);
    const staticItems = resolvedItems.filter((i) => i.isStatic);

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
        deliveryETA: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        paymentGatewayOrderId: rzpResult.data.id, // Razorpay order_id
        internalNotes: staticItems.length > 0
          ? `Includes static catalog items: ${staticItems.map((i) => `${i.name} x${i.quantity} @₹${i.price}`).join(", ")}`
          : `Razorpay Order: ${rzpResult.data.id}`,
        items: {
          create: dbItems.map((item) => ({
            variantId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.price,
          })),
        },
        trackingEvents: {
          create: {
            status: "PENDING",
            description: `Order created via Razorpay. ${isCOD ? `COD advance ₹${COD_ADVANCE_AMOUNT} pending.` : `Full payment ₹${totalAmount} pending.`} Ref: ${transactionRef}`,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      transactionRef,
      razorpayOrderId: rzpResult.data.id,
      razorpayKeyId: getRazorpayKeyId(),
      paymentAmount,
      amountInPaise: rzpResult.data.amount,
      currency: rzpResult.data.currency,
      isCOD,
      balanceDue,
    });
  } catch (error) {
    console.error("[Razorpay] Create order error:", error);
    return NextResponse.json(
      { error: `Server error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
