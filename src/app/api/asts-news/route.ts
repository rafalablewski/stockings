import { NextResponse } from "next/server";

const QM_ENDPOINTS = [
  "https://feeds.issuerdirect.com/qm/data/getHeadlines.json",
  "https://www.accessnewswire.com/qm/data/getHeadlines.json",
  "https://www.accesswire.com/qm/data/getHeadlines.json",
];

const QM_PARAMS = new URLSearchParams({
  topics: "ASTS",
  excludeTopics: "NONCOMPANY",
  noSrc: "qmr",
  src: "pzo,bayaw,prn,bwi,TheNewsWire,nfil,actw,irw,acn,cnw,nwd,glpr,nwmw",
  summary: "true",
  summLen: "300",
  thumbnailurl: "true",
  start: "1000-01-01",
  end: "3000-01-01",
}).toString();

export async function GET() {
  const errors: string[] = [];

  for (const baseUrl of QM_ENDPOINTS) {
    const url = `${baseUrl}?${QM_PARAMS}`;
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "application/json",
          Referer: "https://feeds.issuerdirect.com/",
        },
      });

      if (!response.ok) {
        errors.push(`${baseUrl}: HTTP ${response.status}`);
        continue;
      }

      const data = await response.json();

      // Check if the response has news items
      const news = data?.results?.news;
      const hasItems = Array.isArray(news)
        ? news.some(
            (n: Record<string, unknown>) =>
              Array.isArray(n.newsitem) && n.newsitem.length > 0
          )
        : false;

      console.log(
        `[asts-news] ${baseUrl}: hasItems=${hasItems}, news length=${Array.isArray(news) ? news.length : "not array"}`
      );

      if (hasItems) {
        return NextResponse.json(data, {
          headers: {
            "Cache-Control": "s-maxage=300, stale-while-revalidate",
          },
        });
      }

      errors.push(`${baseUrl}: 0 items`);
    } catch (err) {
      errors.push(
        `${baseUrl}: ${err instanceof Error ? err.message : "unknown error"}`
      );
    }
  }

  console.error("[asts-news] all endpoints failed:", errors);
  return NextResponse.json(
    { error: "All upstream endpoints returned no data", details: errors },
    { status: 502 }
  );
}
