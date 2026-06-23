import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

// Always run fresh — we want the live track, not a cached one.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const nowPlaying = await getNowPlaying();
    return NextResponse.json(nowPlaying, {
      headers: {
        // small CDN cache so we don't hammer Spotify on every visit
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=30",
      },
    });
  } catch {
    // Fail quietly — the card just shows the offline state.
    return NextResponse.json(null);
  }
}