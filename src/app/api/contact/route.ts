import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { sendContactFormEmail } from "@/lib/emailService";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  message: z.string().min(1, "Message is required"),
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
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        subject: formData.get("subject"),
        message: formData.get("message"),
        enquiryType: formData.get("enquiryType"),
      };
    } else {
      try {
        body = await req.json();
      } catch {
        body = {};
      }
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid contact form data" },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = parsed.data;
    const enquiryType = body.enquiryType as string | undefined;
    const finalSubject = subject
      ? `${enquiryType ? `[${enquiryType}] ` : ""}${subject}`
      : enquiryType || "Website Inquiry";

    await prisma.contactQuery.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? String(phone).trim() : null,
        subject: finalSubject.trim(),
        message: message.trim(),
        status: "PENDING",
        isRead: false,
      },
    });

    // Send email notification to info@dsigner.com
    await sendContactFormEmail({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? String(phone).trim() : null,
      subject: finalSubject.trim(),
      message: message.trim(),
    }).catch((err) => {
      console.warn("[Contact Email Dispatch Warning]:", err);
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully! Our team will contact you shortly.",
    });
  } catch (error: any) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { error: "Failed to submit message. Please try again later." },
      { status: 500 }
    );
  }
}
