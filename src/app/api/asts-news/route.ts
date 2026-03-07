import { NextResponse } from "next/server";

// Try multiple QuoteMedia proxy endpoints — the original accesswire.com one
// may have moved when IssuerDirect rebranded to ACCESS Newswire
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

interface NewsItem {
  newsid: string;
  headline: string;
  datetime: string;
  source: string;
  src: string;
  qmsummary?: string;
  permalink?: string;
  [key: string]: unknown;
}

// Normalize QuoteMedia response into a flat newsArray
function extractNewsItems(data: Record<string, unknown>): NewsItem[] {
  // QuoteMedia may nest news as object or array
  const results = data?.results as Record<string, unknown> | undefined;
  const news = results?.news;

  let items: NewsItem[] = [];

  if (Array.isArray(news)) {
    // news is [{newsitem: [...]}, ...]
    items = news.flatMap((n: Record<string, unknown>) => {
      const ni = n.newsitem;
      return Array.isArray(ni) ? ni : ni ? [ni] : [];
    }) as NewsItem[];
  } else if (news && typeof news === "object") {
    // news is {newsitem: [...]}
    const ni = (news as Record<string, unknown>).newsitem;
    items = (Array.isArray(ni) ? ni : ni ? [ni] : []) as NewsItem[];
  }

  // Normalize field names for the frontend
  return items.map((item) => ({
    ...item,
    newsid: item.newsid || "",
    headline: item.headline || "",
    publishdate: item.datetime || "",
    date: item.datetime || "",
    source: item.source || "",
    src: item.src || item.source || "",
    summary: item.qmsummary || "",
  }));
}

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
      const newsArray = extractNewsItems(data as Record<string, unknown>);

      console.log(
        `[asts-news] ${baseUrl} returned ${newsArray.length} items`
      );

      if (newsArray.length > 0) {
        return NextResponse.json(
          { data: { newsArray } },
          {
            headers: {
              "Cache-Control": "s-maxage=300, stale-while-revalidate",
            },
          }
        );
      }

      // Got a response but no items — try next endpoint
      errors.push(`${baseUrl}: 0 items in response`);
    } catch (err) {
      errors.push(
        `${baseUrl}: ${err instanceof Error ? err.message : "unknown error"}`
      );
    }
  }

  console.error("[asts-news] all endpoints failed:", errors);
  return NextResponse.json(
    {
      error: "All upstream endpoints returned no data",
      details: errors,
      data: { newsArray: [] },
    },
    { status: 502 }
  );
}
