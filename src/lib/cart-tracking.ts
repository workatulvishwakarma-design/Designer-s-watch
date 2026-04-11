/**
 * ─────────────────────────────────────────────────────────
 *  Anonymous Cart Tracking (Client-Side)
 *  Generates dw_cart_id cookie for every visitor.
 *  Fires tracking events to /api/cart/track on cart changes.
 * ─────────────────────────────────────────────────────────
 */

const CART_ID_KEY = "dw_cart_id";

/** Get or create anonymous cart ID */
export function getCartId(): string {
  if (typeof window === "undefined") return "";

  // Check existing cookie
  let cartId = getCookie(CART_ID_KEY);
  if (cartId) return cartId;

  // Check localStorage fallback
  cartId = localStorage.getItem(CART_ID_KEY);
  if (cartId) {
    setCookie(CART_ID_KEY, cartId, 365);
    return cartId;
  }

  // Generate new ID
  cartId = `cart_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;
  setCookie(CART_ID_KEY, cartId, 365);
  localStorage.setItem(CART_ID_KEY, cartId);
  return cartId;
}

/** Track a cart event (non-blocking fire-and-forget) */
export function trackCartEvent(
  productSlug: string,
  productName: string,
  action: "ADD" | "REMOVE" | "UPDATE_QTY",
  quantity: number = 1
) {
  const cartId = getCartId();
  if (!cartId) return;

  // Fire and forget — don't await
  fetch("/api/cart/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cartId,
      productSlug,
      productName,
      action,
      quantity,
    }),
  }).catch((err) => {
    console.debug("[CartTrack] Failed to log event:", err);
  });
}

// ─── Cookie utilities ───

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}
