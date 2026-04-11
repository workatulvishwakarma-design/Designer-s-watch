/**
 * ─────────────────────────────────────────────────────────
 *  SMS Notification Service — MSG91 Integration
 *  Currently logs to console in dev mode.
 *  Add MSG91_AUTH_KEY to .env to activate real SMS.
 * ─────────────────────────────────────────────────────────
 */

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY || "";
const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID || "DSGNRW";
const MSG91_FLOW_API = "https://control.msg91.com/api/v5/flow/";

// Template IDs — set these in .env after DLT approval
const TEMPLATES = {
  ORDER_PLACED: process.env.MSG91_TPL_ORDER_PLACED || "",
  PAYMENT_SUCCESS: process.env.MSG91_TPL_PAYMENT_SUCCESS || "",
  COD_ADVANCE: process.env.MSG91_TPL_COD_ADVANCE || "",
  ORDER_SHIPPED: process.env.MSG91_TPL_ORDER_SHIPPED || "",
  OUT_FOR_DELIVERY: process.env.MSG91_TPL_OUT_FOR_DELIVERY || "",
  DELIVERED: process.env.MSG91_TPL_DELIVERED || "",
  ORDER_CANCELLED: process.env.MSG91_TPL_ORDER_CANCELLED || "",
};

/** Check if MSG91 is configured */
export function isSMSConfigured(): boolean {
  return Boolean(MSG91_AUTH_KEY);
}

/** SMS payload for logging */
export interface SMSPayload {
  template: keyof typeof TEMPLATES;
  phone: string;
  variables: Record<string, string>;
}

/**
 * Send SMS via MSG91 Flow API.
 * Falls back to console.log in dev/unconfigured mode.
 */
export async function sendSMS(payload: SMSPayload): Promise<{ success: boolean; message: string }> {
  const { template, phone, variables } = payload;
  const templateId = TEMPLATES[template];

  // Format phone for MSG91 (91XXXXXXXXXX)
  let formattedPhone = phone.replace(/\D/g, "");
  if (formattedPhone.length === 10) formattedPhone = "91" + formattedPhone;
  if (!formattedPhone.startsWith("91")) formattedPhone = "91" + formattedPhone;

  // ═══════ DEV MODE: Log to console ═══════
  if (!isSMSConfigured() || !templateId) {
    const logMsg = `\n📱 [SMS ${template}] → ${formattedPhone}\n` +
      `   Template: ${template} (${templateId || 'NOT_CONFIGURED'})\n` +
      Object.entries(variables).map(([k, v]) => `   ${k}: ${v}`).join("\n") + "\n";
    
    console.log(logMsg);
    return { success: true, message: `[DEV] SMS logged to console: ${template}` };
  }

  // ═══════ PRODUCTION MODE: Send via MSG91 ═══════
  try {
    const recipientVars: Record<string, string> = { mobiles: formattedPhone };
    Object.entries(variables).forEach(([key, value]) => {
      recipientVars[key] = value;
    });

    const response = await fetch(MSG91_FLOW_API, {
      method: "POST",
      headers: {
        "authkey": MSG91_AUTH_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template_id: templateId,
        sender: MSG91_SENDER_ID,
        short_url: "0",
        recipients: [recipientVars],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`[SMS] Sent ${template} to ${formattedPhone}:`, data);
      return { success: true, message: `SMS sent: ${template}` };
    } else {
      console.error(`[SMS] Failed ${template}:`, data);
      return { success: false, message: `SMS failed: ${data.message || response.status}` };
    }
  } catch (error) {
    console.error(`[SMS] Network error for ${template}:`, error);
    return { success: false, message: `SMS network error: ${error}` };
  }
}

// ═══════ Pre-built SMS Templates ═══════

export async function sendOrderPlacedSMS(phone: string, vars: {
  customerName: string;
  orderId: string;
  totalAmount: string;
  deliveryETA?: string;
}) {
  return sendSMS({
    template: "ORDER_PLACED",
    phone,
    variables: {
      var1: vars.customerName,
      var2: vars.orderId,
      var3: vars.totalAmount,
      var4: vars.deliveryETA || "3-5 business days",
    },
  });
}

export async function sendPaymentSuccessSMS(phone: string, vars: {
  customerName: string;
  orderId: string;
  amount: string;
  paymentMethod: string;
}) {
  return sendSMS({
    template: "PAYMENT_SUCCESS",
    phone,
    variables: {
      var1: vars.customerName,
      var2: vars.orderId,
      var3: vars.amount,
      var4: vars.paymentMethod,
    },
  });
}

export async function sendCODAdvanceSMS(phone: string, vars: {
  customerName: string;
  orderId: string;
  advancePaid: string;
  balanceDue: string;
}) {
  return sendSMS({
    template: "COD_ADVANCE",
    phone,
    variables: {
      var1: vars.customerName,
      var2: vars.orderId,
      var3: vars.advancePaid,
      var4: vars.balanceDue,
    },
  });
}

export async function sendShippingSMS(phone: string, vars: {
  customerName: string;
  orderId: string;
  trackingInfo?: string;
  deliveryETA?: string;
}) {
  return sendSMS({
    template: "ORDER_SHIPPED",
    phone,
    variables: {
      var1: vars.customerName,
      var2: vars.orderId,
      var3: vars.trackingInfo || "N/A",
      var4: vars.deliveryETA || "2-3 days",
    },
  });
}

export async function sendDeliveredSMS(phone: string, vars: {
  customerName: string;
  orderId: string;
}) {
  return sendSMS({
    template: "DELIVERED",
    phone,
    variables: {
      var1: vars.customerName,
      var2: vars.orderId,
    },
  });
}
