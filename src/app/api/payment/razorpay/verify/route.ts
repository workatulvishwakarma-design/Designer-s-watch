/**
 * POST /api/payment/razorpay/verify
 *
 * Verifies Razorpay payment signature using HMAC-SHA256.
 * Called from the frontend after the Razorpay modal returns success.
 * Never trusts frontend — always verifies the signature server-side.
 */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { verifyRazorpaySignature, isRazorpayConfigured } from "@/lib/razorpay";
import { COD_ADVANCE_AMOUNT } from "@/lib/cashfree";
import { sendPaymentSuccessSMS, sendCODAdvanceSMS } from "@/lib/sms";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    if (!isRazorpayConfigured()) {
      return NextResponse.json({ error: "Razorpay not configured" }, { status: 503 });
    }

    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId, // Our internal order ID
    } = body;

    // ── 1. Validate required fields ──
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment verification fields: razorpay_order_id, razorpay_payment_id, razorpay_signature are required" },
        { status: 400 }
      );
    }

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    // ── 2. Find order ──
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        user: { select: { name: true, email: true } },
        shippingAddress: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // ── 3. Verify order belongs to this user ──
    if (order.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ── 4. Verify the Razorpay order_id matches ──
    if (order.paymentGatewayOrderId !== razorpay_order_id) {
      return NextResponse.json(
        { error: "Order ID mismatch — possible tampering" },
        { status: 400 }
      );
    }

    // ── 5. Prevent duplicate processing ──
    if (order.paymentStatus === "PAID" || order.paymentStatus === "ADVANCE_PAID") {
      return NextResponse.json({
        success: true,
        message: "Payment already verified",
        orderId: order.id,
        status: order.paymentStatus,
      });
    }

    // ── 6. Verify signature (HMAC-SHA256) ──
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      console.error(
        `[Razorpay] Signature mismatch for order ${orderId}. ` +
        `order_id=${razorpay_order_id}, payment_id=${razorpay_payment_id}`
      );

      // Mark as failed but do NOT mark as paid
      await prisma.order.update({
        where: { id: order.id },
        data: { paymentStatus: "FAILED" },
      });

      await prisma.orderTrackingEvent.create({
        data: {
          orderId: order.id,
          status: "PENDING",
          description: `Razorpay payment signature verification failed. Payment ID: ${razorpay_payment_id}. DO NOT fulfill.`,
        },
      });

      return NextResponse.json(
        { error: "Payment verification failed — signature mismatch" },
        { status: 400 }
      );
    }

    // ── 7. Signature valid → Update order as paid ──
    const newPaymentStatus = order.isCOD ? "ADVANCE_PAID" : "PAID";
    const paidAmount = order.isCOD ? COD_ADVANCE_AMOUNT : Number(order.totalAmount);

    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: newPaymentStatus,
        status: "PROCESSING",
        paymentGatewayPaymentId: razorpay_payment_id,
        advancePaid: paidAmount,
      },
    });

    // ── 8. Add tracking event ──
    await prisma.orderTrackingEvent.create({
      data: {
        orderId: order.id,
        status: "PROCESSING",
        description:
          newPaymentStatus === "PAID"
            ? `Payment of ₹${paidAmount} verified via Razorpay. Payment ID: ${razorpay_payment_id}`
            : `COD advance ₹${COD_ADVANCE_AMOUNT} verified via Razorpay. Balance ₹${order.balanceDue} payable on delivery. Payment ID: ${razorpay_payment_id}`,
      },
    }).catch(() => null);

    // ── 9. Deduct inventory ──
    try {
      for (const item of order.items) {
        if (item.variantId) {
          await prisma.inventory.updateMany({
            where: { variantId: item.variantId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }
    } catch (stockErr) {
      console.error("[Razorpay Verify] Stock deduction error:", stockErr);
    }

    // ── 10. Admin notifications ──
    try {
      const admins = await prisma.user.findMany({ where: { role: "ADMIN" }, select: { id: true } });
      for (const admin of admins) {
        await prisma.notification.create({
          data: {
            userId: admin.id,
            title: `💰 Razorpay Order #${order.id.slice(-6)}`,
            message:
              newPaymentStatus === "ADVANCE_PAID"
                ? `COD advance ₹${COD_ADVANCE_AMOUNT} received via Razorpay. Total: ₹${order.totalAmount}. Balance: ₹${order.balanceDue}`
                : `₹${paidAmount} received via Razorpay for order by ${order.user?.name || "Customer"}`,
            linkUrl: `/admin/orders/${order.id}`,
          },
        });
      }
    } catch (e) {
      console.error("[Razorpay Verify] Admin notification error:", e);
    }

    // ── 11. Trigger SMS ──
    const phone = order.customerPhone || order.shippingAddress?.phone || "";
    const customerName = order.user?.name || `${order.shippingAddress?.firstName || "Customer"}`;

    if (phone) {
      try {
        if (order.isCOD) {
          await sendCODAdvanceSMS(phone, {
            customerName,
            orderId: order.id.slice(-8).toUpperCase(),
            advancePaid: COD_ADVANCE_AMOUNT.toString(),
            balanceDue: order.balanceDue.toString(),
          });
        } else {
          await sendPaymentSuccessSMS(phone, {
            customerName,
            orderId: order.id.slice(-8).toUpperCase(),
            amount: paidAmount.toString(),
            paymentMethod: "Razorpay",
          });
        }
      } catch (smsErr) {
        console.error("[Razorpay Verify] SMS error:", smsErr);
      }
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      transactionRef: order.transactionRef,
      status: newPaymentStatus,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error("[Razorpay Verify] Error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
