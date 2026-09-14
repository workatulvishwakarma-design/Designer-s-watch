import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  source: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      body = {
        email: formData.get("email"),
        source: formData.get("source"),
      };
    } else {
      try {
        body = await req.json();
      } catch {
        body = {};
      }
    }

    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = parsed.data.email.trim().toLowerCase();
    const source = body.source || "Stay in Time";

    // Check if already subscribed
    const existing = await prisma.contactQuery.findFirst({
      where: {
        email: cleanEmail,
        subject: { contains: "Newsletter" },
      },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "You are already subscribed to Stay in Time updates!",
      });
    }

    await prisma.contactQuery.create({
      data: {
        name: "Stay in Time Subscriber",
        email: cleanEmail,
        phone: null,
        subject: `Newsletter Subscription (${source})`,
        message: `Customer subscribed to Stay in Time updates and new arrivals via ${source}.`,
        status: "PENDING",
        isRead: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to Stay in Time updates!",
    });
  } catch (error: any) {
    console.error("[Newsletter API Error]:", error);
    return NextResponse.json(
      { error: "Unable to subscribe right now. Please try again." },
      { status: 500 }
    );
  }
}
