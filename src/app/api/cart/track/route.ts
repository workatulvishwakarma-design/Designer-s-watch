/**
 * POST /api/cart/track
 * 
 * Logs anonymous cart events for analytics.
 * Uses cart_id cookie for tracking across sessions.
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cartId, productSlug, productName, action, quantity } = body;

    if (!cartId || !productSlug || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Extract session data from request headers
    const sessionData = {
      userAgent: req.headers.get("user-agent") || "unknown",
      referrer: req.headers.get("referer") || "",
      ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "",
      timestamp: new Date().toISOString(),
    };

    await prisma.cartEvent.create({
      data: {
        cartId,
        productSlug,
        productName: productName || productSlug,
        action, // "ADD" | "REMOVE" | "UPDATE_QTY"
        quantity: quantity || 1,
        sessionData,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CartTrack] Error:", error);
    return NextResponse.json({ error: "Failed to track cart event" }, { status: 500 });
  }
}
