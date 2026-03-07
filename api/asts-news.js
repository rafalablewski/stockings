// api/asts-news.js
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
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
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ABISON/1.0)",
        Accept: "application/json",
        Referer: "https://feeds.issuerdirect.com/",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Upstream: ${response.status}`);
    const str = await response.json(); // unwraps the outer quoted string
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(str);
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
}
