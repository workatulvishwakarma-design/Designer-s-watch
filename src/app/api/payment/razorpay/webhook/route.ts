/**
 * POST /api/payment/razorpay/webhook
 *
 * Razorpay webhook handler — the AUTHORITATIVE source of truth
 * for payment status.  Works alongside the verify endpoint to
 * provide double-confirmation of payment outcomes.
 *
 * Supports events:
 *   - payment.captured  → mark order PAID
 *   - payment.failed    → mark order FAILED
 *   - order.paid        → mark order PAID (belt-and-suspenders)
 *
 * Security:
 *   - Verifies x-razorpay-signature using RAZORPAY_WEBHOOK_SECRET
 *   - Idempotent (duplicate events are silently accepted)
 *   - Never trusts the client
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  verifyRazorpayWebhookSignature,
  isRazorpayConfigured,
  fetchRazorpayPayment,
} from "@/lib/razorpay";
import { COD_ADVANCE_AMOUNT } from "@/lib/cashfree";
import { sendPaymentSuccessSMS, sendCODAdvanceSMS } from "@/lib/sms";

export async function POST(req: NextRequest) {
  try {
    // ── 0. Read raw body (required for signature verification) ──
    const rawBody = await req.text();
    const receivedSignature = req.headers.get("x-razorpay-signature") || "";

    // ── 1. Verify webhook signature ──
    if (!verifyRazorpayWebhookSignature(rawBody, receivedSignature)) {
      console.error("[Razorpay Webhook] Signature verification failed");
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    // ── 2. Parse payload ──
    const payload = JSON.parse(rawBody);
    const event = payload.event as string;
    const paymentEntity = payload.payload?.payment?.entity;
    const orderEntity = payload.payload?.order?.entity;

    console.log(
      `[Razorpay Webhook] Received event: ${event}, payment_id: ${paymentEntity?.id || "N/A"}, order_id: ${paymentEntity?.order_id || orderEntity?.id || "N/A"}`
    );

    // ── 3. Extract the razorpay order_id ──
    const razorpayOrderId =
      paymentEntity?.order_id || orderEntity?.id || null;

    if (!razorpayOrderId) {
      console.warn("[Razorpay Webhook] No order_id in payload — ignoring");
      return NextResponse.json({ status: "ignored", reason: "no_order_id" });
    }

    // ── 4. Find our internal order by paymentGatewayOrderId ──
    const order = await prisma.order.findFirst({
      where: { paymentGatewayOrderId: razorpayOrderId },
      include: {
        items: true,
        user: { select: { name: true, email: true } },
        shippingAddress: true,
      },
    });

    if (!order) {
      console.warn(
        `[Razorpay Webhook] No internal order found for Razorpay order ${razorpayOrderId}`
      );
      // Return 200 anyway — Razorpay will keep retrying on non-2xx
      return NextResponse.json({
        status: "ignored",
        reason: "order_not_found",
      });
    }

    // ── 5. Handle events ──
    if (
      event === "payment.captured" ||
      event === "order.paid"
    ) {
      // ── 5a. Idempotency: already paid? ──
      if (
        order.paymentStatus === "PAID" ||
        order.paymentStatus === "ADVANCE_PAID"
      ) {
        console.log(
          `[Razorpay Webhook] Order ${order.id} already ${order.paymentStatus} — skipping`
        );
        return NextResponse.json({
          status: "already_processed",
          paymentStatus: order.paymentStatus,
        });
      }

      // ── 5b. Optional: cross-check payment amount ──
      const razorpayPaymentId = paymentEntity?.id || null;
      const capturedAmount = paymentEntity?.amount; // in paise
      const expectedAmountPaise = order.isCOD
        ? Math.round(COD_ADVANCE_AMOUNT * 100)
        : Math.round(Number(order.totalAmount) * 100);

      if (capturedAmount && capturedAmount !== expectedAmountPaise) {
        console.error(
          `[Razorpay Webhook] AMOUNT MISMATCH for order ${order.id}: ` +
          `expected ${expectedAmountPaise} paise, received ${capturedAmount} paise`
        );
        // Mark as failed to prevent fulfillment
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: "FAILED" },
        });
        await prisma.orderTrackingEvent.create({
          data: {
            orderId: order.id,
            status: "PENDING",
            description: `⚠️ Webhook: Amount mismatch — expected ₹${expectedAmountPaise / 100}, received ₹${capturedAmount / 100}. Payment ID: ${razorpayPaymentId}. DO NOT fulfill.`,
          },
        });
        return NextResponse.json({
          status: "amount_mismatch",
          expected: expectedAmountPaise,
          received: capturedAmount,
        });
      }

      // ── 5c. Mark order as paid ──
      const newPaymentStatus = order.isCOD ? "ADVANCE_PAID" : "PAID";
      const paidAmount = order.isCOD
        ? COD_ADVANCE_AMOUNT
        : Number(order.totalAmount);

      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: newPaymentStatus,
          status: "PROCESSING",
          paymentGatewayPaymentId:
            razorpayPaymentId || order.paymentGatewayPaymentId,
          advancePaid: paidAmount,
        },
      });

      // ── 5d. Tracking event ──
      await prisma.orderTrackingEvent
        .create({
          data: {
            orderId: order.id,
            status: "PROCESSING",
            description:
              newPaymentStatus === "PAID"
                ? `✅ Payment of ₹${paidAmount} verified via Razorpay webhook. Payment ID: ${razorpayPaymentId}`
                : `✅ COD advance ₹${COD_ADVANCE_AMOUNT} verified via Razorpay webhook. Balance ₹${order.balanceDue} payable on delivery. Payment ID: ${razorpayPaymentId}`,
          },
        })
        .catch(() => null);

      // ── 5e. Deduct inventory ──
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
        console.error("[Razorpay Webhook] Stock deduction error:", stockErr);
      }

      // ── 5f. Admin notification ──
      try {
        const admins = await prisma.user.findMany({
          where: { role: "ADMIN" },
          select: { id: true },
        });
        for (const admin of admins) {
          await prisma.notification.create({
            data: {
              userId: admin.id,
              title: `💰 Razorpay ${event === "payment.captured" ? "Payment" : "Order"} #${order.id.slice(-6)}`,
              message:
                newPaymentStatus === "ADVANCE_PAID"
                  ? `COD advance ₹${COD_ADVANCE_AMOUNT} received via Razorpay. Total: ₹${order.totalAmount}. Balance: ₹${order.balanceDue}`
                  : `₹${paidAmount} received via Razorpay for order by ${order.user?.name || "Customer"}`,
              linkUrl: `/admin/orders/${order.id}`,
            },
          });
        }
      } catch (e) {
        console.error("[Razorpay Webhook] Admin notification error:", e);
      }

      // ── 5g. SMS ──
      const phone =
        order.customerPhone || order.shippingAddress?.phone || "";
      const customerName =
        order.user?.name ||
        `${order.shippingAddress?.firstName || "Customer"}`;

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
          console.error("[Razorpay Webhook] SMS error:", smsErr);
        }
      }

      console.log(
        `[Razorpay Webhook] Order ${order.id} marked ${newPaymentStatus}`
      );
      return NextResponse.json({
        status: "success",
        paymentStatus: newPaymentStatus,
      });
    }

    if (event === "payment.failed") {
      // Only mark as failed if not already paid
      if (
        order.paymentStatus !== "PAID" &&
        order.paymentStatus !== "ADVANCE_PAID"
      ) {
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: "FAILED" },
        });

        await prisma.orderTrackingEvent
          .create({
            data: {
              orderId: order.id,
              status: "PENDING",
              description: `❌ Payment failed via Razorpay. Reason: ${paymentEntity?.error_description || paymentEntity?.error_reason || "Unknown"}. Payment ID: ${paymentEntity?.id || "N/A"}`,
            },
          })
          .catch(() => null);
      }

      return NextResponse.json({ status: "failed_recorded" });
    }

    // ── 6. Unhandled event ──
    console.log(`[Razorpay Webhook] Unhandled event: ${event} — ignoring`);
    return NextResponse.json({ status: "ignored", event });
  } catch (error) {
    console.error("[Razorpay Webhook] Error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
