import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url =
      "https://www.accesswire.com/qm/data/getHeadlines.json?" +
      new URLSearchParams({
        topics: "ASTS",
        excludeTopics: "NONCOMPANY",
        noSrc: "qmr",
        src: "pzo,bayaw,prn,bwi,TheNewsWire,nfil,actw,irw,acn,cnw,nwd,glpr,nwmw",
        summary: "true",
        summLen: "300",
        thumbnailurl: "true",
        start: "1000-01-01",
        end: "3000-01-01",
      });

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
        "Cache-Control": "s-maxage=300, stale-while-revalidate",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
