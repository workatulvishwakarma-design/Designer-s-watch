import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const returnSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  reason: z.string().min(1, "Please select a return reason"),
  resolution: z.enum(["EXCHANGE", "REFUND", "STORE_CREDIT"]).default("REFUND"),
  notes: z.string().optional(),
  contactPhone: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const body = await req.json().catch(() => ({}));

    const parsed = returnSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid return request details" },
        { status: 400 }
      );
    }

    const { orderId, reason, resolution, notes, contactPhone } = parsed.data;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        shippingAddress: true,
        user: { select: { email: true, name: true } },
        items: {
          include: {
            variant: {
              include: { family: { select: { name: true } } },
            },
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Security check: If authenticated, verify order belongs to user
    if (session?.user?.id && order.userId && order.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized access to order" }, { status: 403 });
    }

    const shortId = order.id.slice(-8).toUpperCase();
    const returnId = `RET-${shortId}-${Math.floor(1000 + Math.random() * 9000)}`;

    const resolutionLabel =
      resolution === "EXCHANGE"
        ? "Exchange / Replacement"
        : resolution === "STORE_CREDIT"
        ? "Store Credit"
        : "Refund to Original Payment Method";

    const itemNames = order.items
      .map((i) => `${i.variant?.family?.name || i.variant?.sku} (Qty: ${i.quantity})`)
      .join(", ");

    const userEmail = order.user?.email || session?.user?.email || "customer@designerswatch.com";
    const userName = order.user?.name || `${order.shippingAddress?.firstName || ""} ${order.shippingAddress?.lastName || ""}`.trim() || "Valued Customer";
    const phone = contactPhone || order.shippingAddress?.phone || null;

    // 1. Record customer query in ContactQuery / Support tickets
    await prisma.contactQuery.create({
      data: {
        name: userName,
        email: userEmail,
        phone: phone ? String(phone) : null,
        subject: `[Return & Exchange Request] Order #${shortId} (${returnId})`,
        message: `Customer requested a return for Order #${shortId}.\nReturn ID: ${returnId}\nReason: ${reason}\nRequested Resolution: ${resolutionLabel}\nItems: ${itemNames}\nNotes: ${notes || "None provided"}\nShipping Address: ${order.shippingAddress?.city}, ${order.shippingAddress?.state} ${order.shippingAddress?.postalCode}`,
        status: "PENDING",
        isRead: false,
      },
    });

    // 2. Add an event to Order Tracking timeline so customer sees it immediately
    await prisma.trackingEvent.create({
      data: {
        orderId: order.id,
        status: "PROCESSING",
        description: `Return Request Logged (${returnId}) - Reason: ${reason}. Resolution: ${resolutionLabel}. Reverse courier pickup initiated.`,
      },
    }).catch(() => null);

    return NextResponse.json({
      success: true,
      returnId,
      message: `Return request ${returnId} has been successfully submitted! A prepaid reverse courier will be scheduled for pickup within 2 business days.`,
    });
  } catch (error: any) {
    console.error("[Order Return API Error]:", error);
    return NextResponse.json(
      { error: "Unable to process return request at this moment. Please contact concierge support directly." },
      { status: 500 }
    );
  }
}
