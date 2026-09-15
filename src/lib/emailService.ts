import nodemailer from "nodemailer";

export interface ContactEmailPayload {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  source?: string;
}

const DEFAULT_TARGET_EMAIL = "info@dsigner.com";

/**
 * Creates an SMTP transporter from environment variables.
 * Compatible with Gmail, Hostinger, cPanel, Titan, AWS SES, or any standard SMTP.
 */
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587/other
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends a notification email to info@dsigner.com whenever a user submits a contact form.
 */
export async function sendContactFormEmail(payload: ContactEmailPayload): Promise<{ success: boolean; messageId?: string; warning?: string }> {
  const targetEmail = process.env.CONTACT_RECEIVER_EMAIL || DEFAULT_TARGET_EMAIL;
  const transporter = createTransporter();

  const formattedDate = new Date().toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "Asia/Kolkata",
  });

  const emailSubject = `[New Website Inquiry] ${payload.subject || "General Inquiry"} — from ${payload.name}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F4; color: #1A1918; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E8E0D5; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
          .header { background: #1A1918; color: #FAF8F4; padding: 24px 32px; border-bottom: 2px solid #B8935A; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #FFFFFF; }
          .header p { margin: 4px 0 0 0; font-size: 12px; color: #B8935A; letter-spacing: 0.05em; text-transform: uppercase; }
          .body { padding: 32px; }
          .field { margin-bottom: 20px; }
          .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #9C9690; margin-bottom: 4px; font-weight: 600; }
          .field-value { font-size: 15px; color: #1A1918; font-weight: 500; }
          .message-box { background: #FAF8F4; border-radius: 12px; border: 1px solid #E8E0D5; padding: 20px; font-size: 14px; line-height: 1.6; color: #2A2825; white-space: pre-wrap; }
          .reply-button { display: inline-block; background: #1A1918; color: #FFFFFF !important; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 12px; }
          .footer { background: #FAF8F4; border-top: 1px solid #E8E0D5; padding: 16px 32px; font-size: 11px; color: #9C9690; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Designer&apos;s Watch</h1>
            <p>New Website Contact Form Submission</p>
          </div>
          <div class="body">
            <div class="field">
              <div class="field-label">Sender Name</div>
              <div class="field-value">${payload.name}</div>
            </div>
            <div class="field">
              <div class="field-label">Email Address</div>
              <div class="field-value"><a href="mailto:${payload.email}" style="color: #B8935A; text-decoration: none;">${payload.email}</a></div>
            </div>
            ${payload.phone ? `
            <div class="field">
              <div class="field-label">Contact Phone</div>
              <div class="field-value"><a href="tel:${payload.phone}" style="color: #1A1918; text-decoration: none;">${payload.phone}</a></div>
            </div>` : ""}
            <div class="field">
              <div class="field-label">Subject / Purpose</div>
              <div class="field-value">${payload.subject || "General Inquiry"}</div>
            </div>
            <div class="field">
              <div class="field-label">Message Details</div>
              <div class="message-box">${payload.message}</div>
            </div>

            <div style="margin-top: 28px; text-align: left;">
              <a href="mailto:${payload.email}?subject=${encodeURIComponent("Re: " + (payload.subject || "Your Inquiry with Designer's Watch"))}" class="reply-button">
                Reply directly to ${payload.name} &rarr;
              </a>
            </div>
          </div>
          <div class="footer">
            Received on ${formattedDate} &bull; Target inbox: ${targetEmail}
          </div>
        </div>
      </body>
    </html>
  `;

  if (!transporter) {
    console.warn(`[Email Notification] SMTP not configured. Inquiry from ${payload.email} for ${targetEmail} recorded in database.`);
    return {
      success: true,
      warning: "SMTP not configured. Message safely logged to database.",
    };
  }

  try {
    const fromAddress = process.env.SMTP_FROM || `"Designer's Watch" <${process.env.SMTP_USER}>`;
    const info = await transporter.sendMail({
      from: fromAddress,
      to: targetEmail,
      replyTo: `${payload.name} <${payload.email}>`,
      subject: emailSubject,
      text: `New Website Inquiry:\n\nName: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || "N/A"}\nSubject: ${payload.subject || "General Inquiry"}\n\nMessage:\n${payload.message}\n\nDate: ${formattedDate}`,
      html: htmlContent,
    });

    console.log(`[Email Notification] Sent contact email to ${targetEmail} (MessageId: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("[Email Notification Error]:", error);
    // Return gracefully so the user form submission doesn't fail
    return { success: false, warning: error.message };
  }
}
