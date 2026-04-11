/**
 * POST /api/payment/webhook
 * 
 * Cashfree webhook handler.
 * Verifies signature → updates order → triggers SMS.
 * This is the PRIMARY source of truth for payment status.
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyCashfreeWebhook, isCashfreeConfigured, COD_ADVANCE_AMOUNT } from "@/lib/cashfree";
import { sendPaymentSuccessSMS, sendCODAdvanceSMS } from "@/lib/sms";
import { PaymentStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const timestamp = req.headers.get("x-webhook-timestamp") || "";
    const signature = req.headers.get("x-webhook-signature") || "";

    // ── 1. Verify webhook signature (skip if not configured) ──
    if (isCashfreeConfigured() && signature) {
      const isValid = verifyCashfreeWebhook(rawBody, timestamp, signature);
      if (!isValid) {
        console.error("[Webhook] Invalid signature");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    // ── 2. Parse webhook payload ──
    const payload = JSON.parse(rawBody);
    const eventType = payload.type; // "PAYMENT_SUCCESS_WEBHOOK" | "PAYMENT_FAILED_WEBHOOK"
    const orderData = payload.data?.order;
    const paymentData = payload.data?.payment;

    if (!orderData?.order_id) {
      console.error("[Webhook] Missing order_id in payload");
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const transactionRef = orderData.order_id;
    console.log(`[Webhook] Received ${eventType} for ${transactionRef}`);

    // ── 3. Find order by transactionRef ──
    const order = await prisma.order.findUnique({
      where: { transactionRef },
      include: {
        user: { select: { name: true, email: true } },
        shippingAddress: true,
      },
    });

    if (!order) {
      console.error(`[Webhook] Order not found: ${transactionRef}`);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // ── 4. Prevent duplicate processing ──
    if (order.paymentStatus === "PAID" || order.paymentStatus === "ADVANCE_PAID") {
      console.log(`[Webhook] Order ${transactionRef} already processed`);
      return NextResponse.json({ message: "Already processed" });
    }

    // ── 5. Map payment status ──
    let newPaymentStatus: PaymentStatus;
    let newOrderStatus: "PENDING" | "PROCESSING" | "CANCELLED";

    if (eventType === "PAYMENT_SUCCESS_WEBHOOK" || paymentData?.payment_status === "SUCCESS") {
      newPaymentStatus = order.isCOD ? "ADVANCE_PAID" : "PAID";
      newOrderStatus = "PROCESSING";
    } else if (paymentData?.payment_status === "FAILED") {
      newPaymentStatus = "FAILED";
      newOrderStatus = "PENDING";
    } else if (paymentData?.payment_status === "CANCELLED") {
      newPaymentStatus = "CANCELLED";
      newOrderStatus = "CANCELLED";
    } else {
      newPaymentStatus = "PENDING";
      newOrderStatus = "PENDING";
    }

    // ── 6. Update order ──
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: newPaymentStatus,
        status: newOrderStatus,
        paymentGatewayPaymentId: paymentData?.cf_payment_id?.toString() || null,
        advancePaid: order.isCOD && newPaymentStatus === "ADVANCE_PAID"
          ? COD_ADVANCE_AMOUNT
          : newPaymentStatus === "PAID"
          ? Number(order.totalAmount.toString())
          : 0,
      },
    });

    // ── 7. Add tracking event ──
    await prisma.orderTrackingEvent.create({
      data: {
        orderId: order.id,
        status: newOrderStatus,
        description: newPaymentStatus === "PAID"
          ? `Payment of ₹${orderData.order_amount} received via Cashfree. Payment ID: ${paymentData?.cf_payment_id}`
          : newPaymentStatus === "ADVANCE_PAID"
          ? `COD advance of ₹${COD_ADVANCE_AMOUNT} received. Balance ₹${order.balanceDue} payable on delivery.`
          : `Payment ${newPaymentStatus.toLowerCase()}. ${paymentData?.payment_message || ""}`,
      },
    });

    // ── 8. Create admin notification ──
    try {
      const admins = await prisma.user.findMany({ where: { role: "ADMIN" }, select: { id: true } });
      for (const admin of admins) {
        await prisma.notification.create({
          data: {
            userId: admin.id,
            title: newPaymentStatus === "PAID" || newPaymentStatus === "ADVANCE_PAID"
              ? `💰 New Order #${order.id.slice(-6)}`
              : `⚠️ Payment ${newPaymentStatus} #${order.id.slice(-6)}`,
            message: newPaymentStatus === "ADVANCE_PAID"
              ? `COD advance ₹${COD_ADVANCE_AMOUNT} received. Total: ₹${order.totalAmount}. Balance: ₹${order.balanceDue}`
              : `₹${orderData.order_amount} ${newPaymentStatus.toLowerCase()} for order by ${order.user?.name || "Customer"}`,
            linkUrl: `/admin/orders/${order.id}`,
          },
        });
      }
    } catch (e) {
      console.error("[Webhook] Admin notification error:", e);
    }

    // ── 9. Trigger SMS ──
    const phone = order.customerPhone || order.shippingAddress?.phone || "";
    const customerName = order.user?.name || `${order.shippingAddress?.firstName || "Customer"}`;

    if (phone && (newPaymentStatus === "PAID" || newPaymentStatus === "ADVANCE_PAID")) {
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
          amount: orderData.order_amount?.toString() || order.totalAmount.toString(),
          paymentMethod: paymentData?.payment_group || "Online",
        });
      }
    }

    // ── 10. Deduct inventory for DB products ──
    if (newPaymentStatus === "PAID" || newPaymentStatus === "ADVANCE_PAID") {
      try {
        const orderItems = await prisma.orderItem.findMany({
          where: { orderId: order.id },
        });
        for (const item of orderItems) {
          await prisma.inventory.updateMany({
            where: { productId: item.productId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      } catch (e) {
        console.error("[Webhook] Stock deduction error:", e);
      }
    }

    return NextResponse.json({ success: true, status: newPaymentStatus });
  } catch (error) {
    console.error("[Webhook] Processing error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
