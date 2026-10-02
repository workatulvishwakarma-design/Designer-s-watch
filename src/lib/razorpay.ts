/**
 * ─────────────────────────────────────────────────────────
 *  Razorpay Payment Gateway — Server-Side Configuration
 *  Standard Web Checkout integration via REST API + HMAC
 *  signature verification.
 *
 *  Environment variables (set in .env locally, or in your
 *  hosting platform's env settings for production):
 *
 *    RAZORPAY_KEY_ID          — Public API key
 *    RAZORPAY_KEY_SECRET      — Private API secret (NEVER expose)
 *    RAZORPAY_WEBHOOK_SECRET  — Webhook signature secret (optional)
 * ─────────────────────────────────────────────────────────
 */

import { createHmac } from "crypto";

/**
 * Read env vars at call time (not module-load time) so that:
 *   - Next.js dev server picks up .env changes on restart
 *   - Production containers receive injected env vars correctly
 */
function getKeyId(): string {
  return process.env.RAZORPAY_KEY_ID || "";
}
function getKeySecret(): string {
  return process.env.RAZORPAY_KEY_SECRET || "";
}
function getWebhookSecret(): string {
  return process.env.RAZORPAY_WEBHOOK_SECRET || "";
}

const RAZORPAY_API_BASE = "https://api.razorpay.com/v1";

/** Check if Razorpay credentials are configured */
export function isRazorpayConfigured(): boolean {
  return Boolean(getKeyId() && getKeySecret());
}

/** Get the public key (safe for frontend) */
export function getRazorpayKeyId(): string {
  return getKeyId();
}

/** Detect if running in live or test mode */
export function getRazorpayMode(): "live" | "test" {
  return getKeyId().startsWith("rzp_live_") ? "live" : "test";
}

/** Common auth header (Basic auth) */
function getAuthHeader(): string {
  return "Basic " + Buffer.from(`${getKeyId()}:${getKeySecret()}`).toString("base64");
}

// ═══════════════════════════════════════════════════════
//  Create Razorpay Order
// ═══════════════════════════════════════════════════════

export interface CreateRazorpayOrderPayload {
  /** Amount in paise (e.g. 50000 = ₹500). Minimum: 100 paise. */
  amount: number;
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: "created" | "attempted" | "paid";
}

export async function createRazorpayOrder(
  payload: CreateRazorpayOrderPayload
): Promise<
  | { success: true; data: RazorpayOrderResponse }
  | { success: false; error: string; isAuthError?: boolean }
> {
  if (!isRazorpayConfigured()) {
    return {
      success: false,
      error: "Razorpay credentials not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env",
    };
  }

  // Enforce minimum amount of 100 paise (₹1)
  if (payload.amount < 100) {
    return { success: false, error: "Amount must be at least 100 paise (₹1)" };
  }

  // Safe diagnostic log — only shows key prefix, never the secret
  const keyId = getKeyId();
  console.log(
    `[Razorpay] Creating order: amount=${payload.amount} paise, currency=${payload.currency || "INR"}, receipt=${payload.receipt}, mode=${getRazorpayMode()}, key=${keyId.substring(0, 12)}...`
  );

  try {
    const response = await fetch(`${RAZORPAY_API_BASE}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({
        amount: payload.amount,
        currency: payload.currency || "INR",
        receipt: payload.receipt,
        notes: payload.notes || {},
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg =
        data.error?.description || data.error?.reason || `HTTP ${response.status}`;
      const isAuthError =
        response.status === 401 || errorMsg.toLowerCase().includes("authentication");

      console.error(
        `[Razorpay] Create order failed (HTTP ${response.status}):`,
        JSON.stringify(data),
        isAuthError
          ? "— AUTH ERROR. Check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET"
          : ""
      );

      return { success: false, error: errorMsg, isAuthError };
    }

    console.log(
      `[Razorpay] Order created: ${data.id}, amount=${data.amount} paise`
    );
    return { success: true, data: data as RazorpayOrderResponse };
  } catch (error) {
    console.error("[Razorpay] Network error:", error);
    return { success: false, error: "Failed to connect to Razorpay API" };
  }
}

// ═══════════════════════════════════════════════════════
//  Verify Payment Signature (checkout callback)
// ═══════════════════════════════════════════════════════

/**
 * Verifies the Razorpay payment signature returned by the
 * checkout modal.  Uses HMAC-SHA256 with the key secret.
 *
 *   generated_signature = HMAC-SHA256(order_id + "|" + payment_id, secret)
 */
export function verifyRazorpaySignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): boolean {
  const secret = getKeySecret();
  if (!secret) return false;

  const body = razorpayOrderId + "|" + razorpayPaymentId;
  const expectedSignature = createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  return expectedSignature === razorpaySignature;
}

// ═══════════════════════════════════════════════════════
//  Verify Webhook Signature
// ═══════════════════════════════════════════════════════

/**
 * Verifies an incoming Razorpay webhook request.
 * Uses HMAC-SHA256 with the dedicated webhook secret.
 *
 * @param rawBody  The raw request body string (NOT parsed JSON)
 * @param receivedSignature  Value from the `x-razorpay-signature` header
 */
export function verifyRazorpayWebhookSignature(
  rawBody: string,
  receivedSignature: string
): boolean {
  const webhookSecret = getWebhookSecret();
  if (!webhookSecret) {
    // If no webhook secret is configured, skip verification
    // but log a warning so the admin knows to set it up
    console.warn(
      "[Razorpay] RAZORPAY_WEBHOOK_SECRET not configured — webhook signature verification skipped. " +
      "Set this in your environment for production security."
    );
    return true;
  }

  const expectedSignature = createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  return expectedSignature === receivedSignature;
}

// ═══════════════════════════════════════════════════════
//  Fetch Payment Details (for server-side cross-check)
// ═══════════════════════════════════════════════════════

export async function fetchRazorpayPayment(
  paymentId: string
): Promise<{ success: true; data: any } | { success: false; error: string }> {
  if (!isRazorpayConfigured()) {
    return { success: false, error: "Razorpay credentials not configured" };
  }

  try {
    const response = await fetch(`${RAZORPAY_API_BASE}/payments/${paymentId}`, {
      method: "GET",
      headers: { Authorization: getAuthHeader() },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error?.description || `HTTP ${response.status}`,
      };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to connect to Razorpay API" };
  }
}
