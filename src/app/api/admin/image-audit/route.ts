import { NextResponse } from "next/server";
import { performImageAudit, getLatestAuditReport } from "@/lib/imageAuditScanner";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let report = getLatestAuditReport();
    if (!report) {
      report = performImageAudit();
    }
    return NextResponse.json(report);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve audit data" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const report = performImageAudit();
    return NextResponse.json(report);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to execute image audit" },
      { status: 500 }
    );
  }
}
