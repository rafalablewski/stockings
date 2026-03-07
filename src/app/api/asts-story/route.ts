import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const storyId = request.nextUrl.searchParams.get("storyId");
  if (!storyId) {
    return NextResponse.json({ error: "Missing storyId" }, { status: 400 });
  }

  try {
    const url =
      "https://www.accesswire.com/qm/data/getStory.json?" +
      new URLSearchParams({ storyId, newslang: "en" });

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Upstream error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
