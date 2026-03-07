// /api/asts-news.js
// Place this file at: your-project/api/asts-news.js

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

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
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate"); // 5 min cache
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
