/**
 * GET /api/payment/razorpay/health
 *
 * Diagnostic endpoint to verify Razorpay credentials.
 * Tests API authentication by creating a minimal test order.
 * NEVER exposes the secret key — only reports status.
 */
import { NextResponse } from "next/server";
import {
  isRazorpayConfigured,
  getRazorpayKeyId,
  getRazorpayMode,
} from "@/lib/razorpay";

export async function GET() {
  const keyId = getRazorpayKeyId();
  const configured = isRazorpayConfigured();

  if (!configured) {
    return NextResponse.json({
      status: "not_configured",
      message:
        "RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing from environment",
      keyIdPresent: !!keyId,
    });
  }

  // Test the credentials by calling a lightweight Razorpay API endpoint
  try {
    const authHeader =
      "Basic " +
      Buffer.from(
        `${keyId}:${process.env.RAZORPAY_KEY_SECRET}`
      ).toString("base64");

    // Create a minimal order to test auth (₹1 = 100 paise)
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        amount: 100,
        currency: "INR",
        receipt: `health-check-${Date.now()}`,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({
        status: "ok",
        message: "Razorpay credentials are valid and working",
        keyId: keyId.substring(0, 12) + "...",
        testOrderId: data.id,
        testAmount: data.amount,
        mode: getRazorpayMode(),
        webhookSecretConfigured: !!process.env.RAZORPAY_WEBHOOK_SECRET,
      });
    } else {
      return NextResponse.json(
        {
          status: "auth_failed",
          message:
            "Razorpay returned an authentication error. The credentials are invalid or expired.",
          keyId: keyId.substring(0, 12) + "...",
          razorpayError:
            data.error?.description || `HTTP ${response.status}`,
          httpStatus: response.status,
          mode: getRazorpayMode(),
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: "network_error",
        message: "Could not reach Razorpay API",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 503 }
    );
  }
}
