/**
 * GET /api/payment/verify?order_id=xxx&txn=xxx
 * 
 * Verifies payment status from Cashfree after user returns.
 * Called from the return URL page.
 * Never trusts frontend — always verifies through Cashfree API.
 */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getOrderPayments, isCashfreeConfigured } from "@/lib/cashfree";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    // We do NOT block immediately on !session because we support guest checkout.

    const orderId = req.nextUrl.searchParams.get("order_id");
    const txnRef = req.nextUrl.searchParams.get("txn");

    if (!orderId) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 });
    }

    // ── 1. Find order ──
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: { product: { select: { name: true, images: { take: 1 } } } },
        },
        shippingAddress: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Require auth if order belongs to a user
    if (order.userId && order.userId !== session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized access to order" }, { status: 401 });
    }

    // For guest orders, strictly require the txnRef token to view it
    if (!order.userId && txnRef && order.transactionRef !== txnRef) {
       return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // Standardized Payload Builder for Frontend Invoice Generation
    const buildResponse = (statusOverride?: any, extraProps = {}) => ({
      success: (statusOverride || order.paymentStatus) !== "FAILED",
      status: statusOverride || order.paymentStatus,
      orderId: order.id,
      orderStatus: order.status,
      date: order.createdAt.toISOString(),
      totalAmount: Number(order.totalAmount),
      taxAmount: Number(order.taxAmount || 0),
      shippingAmount: Number(order.shippingAmount || 0),
      paymentMethod: order.paymentMethod,
      isCOD: order.isCOD,
      advancePaid: Number(order.advancePaid),
      balanceDue: Number(order.balanceDue),
      transactionRef: order.transactionRef,
      shippingAddress: order.shippingAddress,
      customerEmail: order.customerEmail,
      items: order.items.map(item => ({
        name: item.product?.name || "Product",
        quantity: item.quantity,
        price: Number(item.priceAtPurchase),
        image: item.product?.images?.[0]?.url || null,
      })),
      ...extraProps,
    });

    // ── 2. If webhook already processed, return stored status ──
    if (order.paymentStatus !== "PENDING") {
      return NextResponse.json(buildResponse());
    }

    // ── 3. Verify with Cashfree API (if configured) ──
    if (isCashfreeConfigured() && order.transactionRef) {
      const result = await getOrderPayments(order.transactionRef);

      if (result.success && result.payments.length > 0) {
        const latestPayment = result.payments[0];
        const cfStatus = latestPayment.payment_status;

        if (cfStatus === "SUCCESS") {
          // Update order if webhook hasn't processed
          const newPaymentStatus = order.isCOD ? "ADVANCE_PAID" : "PAID";
          await prisma.order.update({
            where: { id: order.id },
            data: {
              paymentStatus: newPaymentStatus,
              status: "PROCESSING",
              paymentGatewayPaymentId: latestPayment.cf_payment_id?.toString(),
              advancePaid: order.isCOD ? 299 : Number(order.totalAmount),
            },
          });
          return NextResponse.json(buildResponse(newPaymentStatus, { orderStatus: "PROCESSING", advancePaid: order.isCOD ? 299 : Number(order.totalAmount) }));
        } else if (cfStatus === "FAILED") {
          await prisma.order.update({
            where: { id: order.id },
            data: { paymentStatus: "FAILED" },
          });
          return NextResponse.json(buildResponse("FAILED", { message: "Payment failed. Please try again." }));
        }
      }
    }

    // ── 4. Cashfree not configured OR still pending ──
    return NextResponse.json(buildResponse(order.paymentStatus, {
      message: !isCashfreeConfigured() 
        ? "Payment gateway not configured. Order created in test mode." 
        : "Payment is being processed..."
    }));

  } catch (error) {
    console.error("[Verify] Error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
