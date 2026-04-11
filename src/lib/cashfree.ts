/**
 * ─────────────────────────────────────────────────────────
 *  Cashfree Payment Gateway — Server-Side Configuration
 *  Uses cashfree-pg SDK for server-side order creation
 *  and payment verification.
 *
 *  Sandbox-ready: just paste CASHFREE_APP_ID and
 *  CASHFREE_SECRET_KEY in .env to activate.
 * ─────────────────────────────────────────────────────────
 */

// We use the REST API directly instead of the SDK to avoid
// potential ESM/CJS issues. This is more reliable in Next.js.

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID || "";
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY || "";
const CASHFREE_ENV = process.env.CASHFREE_ENV || "SANDBOX";

const BASE_URL =
  CASHFREE_ENV === "PRODUCTION"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";

const API_VERSION = process.env.CASHFREE_API_VERSION || "2023-08-01";

/** Check if Cashfree credentials are configured */
export function isCashfreeConfigured(): boolean {
  return Boolean(CASHFREE_APP_ID && CASHFREE_SECRET_KEY);
}

/** Get Cashfree environment mode */
export function getCashfreeMode(): "sandbox" | "production" {
  return CASHFREE_ENV === "PRODUCTION" ? "production" : "sandbox";
}

/** Common headers for Cashfree API */
function getHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    "x-client-id": CASHFREE_APP_ID,
    "x-client-secret": CASHFREE_SECRET_KEY,
    "x-api-version": API_VERSION,
  };
}

/** ═══════ Create Cashfree Order ═══════ */
export interface CreateOrderPayload {
  order_id: string;
  order_amount: number;
  order_currency?: string;
  customer_details: {
    customer_id: string;
    customer_phone: string;
    customer_email?: string;
    customer_name?: string;
  };
  order_meta?: {
    return_url?: string;
    notify_url?: string;
  };
  order_note?: string;
}

export interface CashfreeOrderResponse {
  cf_order_id: string;
  order_id: string;
  order_status: string;
  payment_session_id: string;
  order_amount: number;
  order_currency: string;
}

export async function createCashfreeOrder(
  payload: CreateOrderPayload
): Promise<{ success: true; data: CashfreeOrderResponse } | { success: false; error: string }> {
  if (!isCashfreeConfigured()) {
    return { success: false, error: "Cashfree credentials not configured. Add CASHFREE_APP_ID and CASHFREE_SECRET_KEY to .env" };
  }

  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        ...payload,
        order_currency: payload.order_currency || "INR",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[Cashfree] Create order failed:", data);
      return { success: false, error: data.message || `HTTP ${response.status}` };
    }

    return { success: true, data: data as CashfreeOrderResponse };
  } catch (error) {
    console.error("[Cashfree] Network error:", error);
    return { success: false, error: "Failed to connect to Cashfree API" };
  }
}

/** ═══════ Verify Payment Status ═══════ */
export interface CashfreePayment {
  cf_payment_id: string;
  order_id: string;
  payment_status: "SUCCESS" | "FAILED" | "PENDING" | "CANCELLED" | "VOID";
  payment_amount: number;
  payment_method: {
    upi?: { upi_id?: string };
    card?: { card_number?: string; card_type?: string; card_bank_name?: string };
    netbanking?: { netbanking_bank_name?: string };
    app?: { provider?: string };
  };
  payment_time?: string;
}

export async function getOrderPayments(
  orderId: string
): Promise<{ success: true; payments: CashfreePayment[] } | { success: false; error: string }> {
  if (!isCashfreeConfigured()) {
    return { success: false, error: "Cashfree credentials not configured" };
  }

  try {
    const response = await fetch(`${BASE_URL}/orders/${orderId}/payments`, {
      method: "GET",
      headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || `HTTP ${response.status}` };
    }

    return { success: true, payments: data as CashfreePayment[] };
  } catch (error) {
    return { success: false, error: "Failed to connect to Cashfree API" };
  }
}

/** ═══════ Verify Webhook Signature ═══════ */
import { createHmac } from "crypto";

export function verifyCashfreeWebhook(
  rawBody: string,
  timestamp: string,
  signature: string
): boolean {
  if (!CASHFREE_SECRET_KEY) return false;

  const data = timestamp + rawBody;
  const expectedSignature = createHmac("sha256", CASHFREE_SECRET_KEY)
    .update(data)
    .digest("base64");

  return expectedSignature === signature;
}

/** ═══════ Generate unique order ID ═══════ */
export function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DW-${ts}-${rand}`;
}

/** ═══════ COD Advance amount ═══════ */
export const COD_ADVANCE_AMOUNT = 299;
