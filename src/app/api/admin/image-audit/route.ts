import { NextResponse } from "next/server";
import { performImageAudit, getLatestAuditReport } from "@/lib/imageAuditScanner";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
