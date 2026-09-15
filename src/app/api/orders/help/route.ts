import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const helpSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  category: z.string().min(1, "Please select an issue category"),
  message: z.string().min(1, "Please describe your question or issue"),
  phone: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const body = await req.json().catch(() => ({}));

    const parsed = helpSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid inquiry data" },
        { status: 400 }
      );
    }

    const { orderId, category, message, phone } = parsed.data;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        shippingAddress: true,
        user: { select: { email: true, name: true } },
      },
    });

    const shortId = order ? order.id.slice(-8).toUpperCase() : orderId;
    const ticketId = `HELP-${shortId}-${Math.floor(1000 + Math.random() * 9000)}`;

    const userEmail = order?.user?.email || session?.user?.email || "customer@designerswatch.com";
    const userName =
      order?.user?.name ||
      `${order?.shippingAddress?.firstName || ""} ${order?.shippingAddress?.lastName || ""}`.trim() ||
      "Valued Customer";
    const contactPhone = phone || order?.shippingAddress?.phone || null;

    await prisma.contactQuery.create({
      data: {
        name: userName,
        email: userEmail,
        phone: contactPhone ? String(contactPhone) : null,
        subject: `[Order Help Ticket: ${ticketId}] Order #${shortId} (${category})`,
        message: `Customer opened Help Center query for Order #${shortId}.\nTicket ID: ${ticketId}\nCategory: ${category}\nDetails: ${message}`,
        status: "PENDING",
        isRead: false,
      },
    });

    return NextResponse.json({
      success: true,
      ticketId,
      message: `Support ticket ${ticketId} created! Our luxury concierge team has received your query and will respond shortly.`,
    });
  } catch (error: any) {
    console.error("[Order Help API Error]:", error);
    return NextResponse.json(
      { error: "Failed to submit help query. Please try again later." },
      { status: 500 }
    );
  }
}
