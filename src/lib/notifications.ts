/**
 * ─────────────────────────────────────────────────────────
 *  Order Notification Dispatcher
 *  Centralized system for sending SMS, email, and admin
 *  notifications on order lifecycle events.
 *  
 *  Uses MSG91 when configured, otherwise logs to console.
 * ─────────────────────────────────────────────────────────
 */

import { prisma } from "@/lib/db";
import {
  sendOrderPlacedSMS,
  sendPaymentSuccessSMS,
  sendCODAdvanceSMS,
  sendShippingSMS,
  sendDeliveredSMS,
} from "@/lib/sms";

/** Notify on new order placed (after payment success) */
export async function notifyOrderPlaced(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: { select: { name: true, email: true } },
        shippingAddress: true,
      },
    });
    if (!order) return;

    const phone = order.customerPhone || order.shippingAddress?.phone || "";
    const name = order.user?.name || order.shippingAddress?.firstName || "Customer";
    const total = Number(order.totalAmount).toLocaleString("en-IN");

    // Send SMS
    await sendOrderPlacedSMS(phone, {
      customerName: name,
      orderId: order.id.slice(-8).toUpperCase(),
      totalAmount: `₹${total}`,
      deliveryETA: order.deliveryETA
        ? order.deliveryETA.toLocaleDateString("en-IN")
        : "3-5 business days",
    });

    // Admin notification
    await createAdminNotification(
      `🛍️ New Order #${order.id.slice(-6)}`,
      `${name} placed an order for ₹${total}. ${order.isCOD ? "COD Order." : "Prepaid."}`,
      `/admin/orders/${order.id}`
    );
  } catch (e) {
    console.error("[Notify] Order placed error:", e);
  }
}

/** Notify on payment success */
export async function notifyPaymentSuccess(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: { select: { name: true } },
        shippingAddress: true,
      },
    });
    if (!order) return;

    const phone = order.customerPhone || order.shippingAddress?.phone || "";
    const name = order.user?.name || "Customer";

    if (order.isCOD) {
      await sendCODAdvanceSMS(phone, {
        customerName: name,
        orderId: order.id.slice(-8).toUpperCase(),
        advancePaid: Number(order.advancePaid).toString(),
        balanceDue: Number(order.balanceDue).toLocaleString("en-IN"),
      });
    } else {
      await sendPaymentSuccessSMS(phone, {
        customerName: name,
        orderId: order.id.slice(-8).toUpperCase(),
        amount: `₹${Number(order.totalAmount).toLocaleString("en-IN")}`,
        paymentMethod: order.paymentMethod || "Online",
      });
    }
  } catch (e) {
    console.error("[Notify] Payment success error:", e);
  }
}

/** Notify on order shipped */
export async function notifyOrderShipped(orderId: string, trackingInfo?: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: { select: { name: true } },
        shippingAddress: true,
      },
    });
    if (!order) return;

    await sendShippingSMS(order.customerPhone || order.shippingAddress?.phone || "", {
      customerName: order.user?.name || "Customer",
      orderId: order.id.slice(-8).toUpperCase(),
      trackingInfo,
      deliveryETA: order.deliveryETA
        ? order.deliveryETA.toLocaleDateString("en-IN")
        : "2-3 days",
    });
  } catch (e) {
    console.error("[Notify] Shipped error:", e);
  }
}

/** Notify on order delivered */
export async function notifyOrderDelivered(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: { select: { name: true } },
        shippingAddress: true,
      },
    });
    if (!order) return;

    await sendDeliveredSMS(order.customerPhone || order.shippingAddress?.phone || "", {
      customerName: order.user?.name || "Customer",
      orderId: order.id.slice(-8).toUpperCase(),
    });
  } catch (e) {
    console.error("[Notify] Delivered error:", e);
  }
}

/** Create notification for all admin users */
async function createAdminNotification(title: string, message: string, linkUrl?: string) {
  try {
    const admins = await prisma.user.findMany({
      where: { role: "ADMIN" },
      select: { id: true },
    });

    for (const admin of admins) {
      await prisma.notification.create({
        data: {
          userId: admin.id,
          title,
          message,
          linkUrl,
        },
      });
    }
  } catch (e) {
    console.error("[Notify] Admin notification error:", e);
  }
}
