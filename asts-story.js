// /api/asts-story.js
// Place this file at: your-project/api/asts-story.js

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { storyId } = req.query;
  if (!storyId) {
    return res.status(400).json({ error: "Missing storyId" });
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
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate"); // 1hr cache per story
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
