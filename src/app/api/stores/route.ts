import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stores = await prisma.store.findMany({
      where: { isActive: true },
      orderBy: [
        { sortOrder: "asc" },
        { name: "asc" }
      ]
    });
    return NextResponse.json({ stores });
  } catch (error: any) {
    console.error("Error fetching active stores:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch stores" }, { status: 500 });
  }
}
