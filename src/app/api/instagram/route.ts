import { NextResponse } from "next/server";
import { fetchInstagramFeed } from "@/lib/instagram";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const feed = await fetchInstagramFeed();
    return NextResponse.json(feed, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("[API Instagram] Error returning feed:", error);
    return NextResponse.json(
      { error: "Failed to retrieve Instagram feed" },
      { status: 500 }
    );
  }
}
