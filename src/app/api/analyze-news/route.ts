/**
 * /api/analyze-news — Agentic News Analysis Endpoint
 *
 * Upgraded from the simple check-analyzed classifier to a full AI agent:
 * - Uses Claude Sonnet 4.5 (upgraded from Haiku) for deeper reasoning
 * - Scrapes full article content instead of headline-only analysis
 * - Returns rich classification: category, materiality, summary, sentiment
 * - Proposes database entries for untracked, material news via tool use
 * - Falls back to the old check-analyzed logic when no API key is set
 *
 * POST body: { ticker, articles: [{ headline, date, url }] }
 * Response: { ticker, results: [...], proposedEntries: [...] }
 */

import { NextRequest, NextResponse } from 'next/server';
import { scrapeArticles } from '@/lib/article-scraper';

// ── Types ────────────────────────────────────────────────────────────────────

interface ArticleInput {
  headline: string;
  date: string;
  url: string;
}

interface AnalysisEntry {
  date: string;
  headline: string;
  detail?: string;
}

interface AnalysisResult {
  index: number;
  tracked: boolean;
  category: string;
  materiality: string;
  summary: string;
  matchedEntry: string | null;
  sentiment: string;
}

interface ProposedEntry {
  articleIndex: number;
  entryType: string;
  date: string;
  headline: string;
  detail: string;
  category: string;
  impact: string;
  reasoning: string;
}

// ── Anthropic API tool definitions ──────────────────────────────────────────

const AGENT_TOOLS = [
  {
    name: 'search_database',
    description:
      'Search the existing research database for entries matching a query. Use this to check if a specific topic, company, or event is already tracked before classifying an article.',
    input_schema: {
      type: 'object' as const,
      properties: {
        query: {
          type: 'string' as const,
          description: 'Search query — keywords, company name, or event description',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'submit_analysis',
    description:
      'Submit your classification results for all articles. Call this once after you have analyzed every article.',
    input_schema: {
      type: 'object' as const,
      properties: {
        results: {
          type: 'array' as const,
          items: {
            type: 'object' as const,
            properties: {
              index: { type: 'number' as const, description: '1-based article index' },
              tracked: { type: 'boolean' as const, description: 'Whether the event is already in the database' },
              category: {
                type: 'string' as const,
                enum: ['company', 'partner', 'competitor', 'industry', 'financial', 'market'],
                description: 'Article category',
              },
              materiality: {
                type: 'string' as const,
                enum: ['high', 'medium', 'low'],
                description: 'Materiality to investment thesis',
              },
              summary: { type: 'string' as const, description: 'One-line summary of what the article covers' },
              matchedEntry: {
                type: 'string' as const,
                description: 'Headline of the matched database entry, or null if untracked',
              },
              sentiment: {
                type: 'string' as const,
                enum: ['bullish', 'bearish', 'neutral'],
                description: 'Sentiment for the stock',
              },
            },
            required: ['index', 'tracked', 'category', 'materiality', 'summary', 'sentiment'],
          },
        },
      },
      required: ['results'],
    },
  },
  {
    name: 'propose_entry',
    description:
      'Propose a new database entry for an untracked, material article. Only call this for HIGH materiality untracked articles that warrant adding to the research database.',
    input_schema: {
      type: 'object' as const,
      properties: {
        articleIndex: { type: 'number' as const, description: '1-based article index' },
        entryType: {
          type: 'string' as const,
          enum: ['timeline', 'catalyst', 'partner_news', 'competitor_news', 'press_release'],
          description: 'Which database collection this entry belongs in',
        },
        date: { type: 'string' as const, description: 'ISO date YYYY-MM-DD' },
        headline: { type: 'string' as const, description: 'Concise entry headline' },
        detail: { type: 'string' as const, description: 'Professional summary suitable for institutional research' },
        category: { type: 'string' as const, description: 'Category tag (e.g. Technology, Partnership, Financial, Regulatory)' },
        impact: {
          type: 'string' as const,
          enum: ['Bullish', 'Bearish', 'Neutral'],
          description: 'Impact assessment for the stock',
        },
        reasoning: { type: 'string' as const, description: 'Why this article warrants a new database entry' },
      },
      required: ['articleIndex', 'entryType', 'date', 'headline', 'detail', 'category', 'impact', 'reasoning'],
    },
  },
];

// ── System prompt ───────────────────────────────────────────────────────────

function buildSystemPrompt(ticker: string): string {
  return `You are a senior equity research analyst AI agent specializing in small-cap stock analysis. You are analyzing news articles for ticker ${ticker}.

YOUR CAPABILITIES:
1. CLASSIFY each article by category, materiality, and sentiment
2. DETERMINE if the article covers events already tracked in the research database
3. PROPOSE new database entries for important untracked news

WORKFLOW:
1. Review the existing database entries and article content provided
2. If you need to verify whether a specific topic is tracked, use search_database
3. Call submit_analysis with your classification for ALL articles
4. For any HIGH materiality untracked articles, call propose_entry to suggest database additions

CLASSIFICATION GUIDE:

Category:
- company: Direct company news (earnings, filings, management, operations)
- partner: Partner/ecosystem news (MNO activities, supplier updates)
- competitor: Competitive intelligence (rival launches, partnerships, tech advances)
- industry: Sector-wide trends, regulations, market dynamics
- financial: Capital raises, debt, stock price movements, analyst coverage
- market: General market conditions affecting the stock

Materiality:
- high: Material event — earnings, major contract, regulatory decision, product launch, capital raise, key partnership
- medium: Notable but not material — minor partnerships, updates, incremental progress
- low: Routine — price movement commentary, analyst reiterations, general market noise

Sentiment (for the stock, not the article tone):
- bullish: Positive for the stock thesis
- bearish: Negative for the stock thesis
- neutral: No clear directional impact

MATCHING RULES:
- Match on SUBSTANCE, not phrasing. "Company X Raises $1B" and "Company X Announces Convertible Notes Offering" may be the same event
- Different outlets covering the same event both count as tracked
- An article about a topic discussed in an existing entry's detail/summary counts as tracked
- Stock price articles with no underlying tracked event = untracked

When proposing entries, write professional, concise content suitable for an institutional research database. Keep headlines under 100 characters. Keep details under 300 characters.`;
}

// ── Database search tool implementation ─────────────────────────────────────

function searchDatabase(query: string, analysisData: AnalysisEntry[]): string {
  const queryWords = new Set(
    query
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2)
  );

  if (queryWords.size === 0) return 'No results found.';

  const scored = analysisData
    .map(entry => {
      const text = `${entry.headline} ${entry.detail || ''}`.toLowerCase();
      let score = 0;
      for (const word of queryWords) {
        if (text.includes(word)) score++;
      }
      return { entry, score };
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  if (scored.length === 0) return 'No matching entries found in the database.';

  return scored
    .map(s => {
      const detail = s.entry.detail ? ` — ${s.entry.detail.slice(0, 200)}` : '';
      return `[${s.entry.date}] ${s.entry.headline}${detail}`;
    })
    .join('\n');
}

// ── Load analysis data (reused from check-analyzed) ─────────────────────────

async function getAnalysisData(ticker: string): Promise<AnalysisEntry[]> {
  const entries: AnalysisEntry[] = [];

  try {
    if (ticker === 'ASTS') {
      const [partners, competitors, catalysts, pressReleases, compsTimeline, timelineEvents] = await Promise.all([
        import('@/data/asts/partners'),
        import('@/data/asts/competitors'),
        import('@/data/asts/catalysts'),
        import('@/data/asts/press-releases'),
        import('@/data/asts/comps-timeline'),
        import('@/data/asts/timeline-events'),
      ]);

      if (partners.PARTNER_NEWS) {
        for (const n of partners.PARTNER_NEWS) entries.push({ date: n.date, headline: n.headline, detail: n.summary });
      }
      if (competitors.COMPETITOR_NEWS) {
        for (const n of competitors.COMPETITOR_NEWS) entries.push({ date: n.date, headline: n.headline, detail: n.summary });
      }
      if (compsTimeline.COMPS_TIMELINE) {
        for (const n of compsTimeline.COMPS_TIMELINE) {
          const detail = [n.details?.join('; '), n.astsComparison].filter(Boolean).join(' | ');
          entries.push({ date: n.date, headline: n.headline, detail });
        }
      }
      if (timelineEvents.ASTS_TIMELINE_EVENTS) {
        for (const e of timelineEvents.ASTS_TIMELINE_EVENTS) {
          const detail = [e.summary, e.details?.join('; ')].filter(Boolean).join(' | ');
          entries.push({ date: e.date, headline: e.title, detail });
        }
      }
      if (catalysts.COMPLETED_MILESTONES) {
        for (const m of catalysts.COMPLETED_MILESTONES) entries.push({ date: m.date, headline: m.event });
      }
      if (catalysts.UPCOMING_CATALYSTS) {
        for (const c of catalysts.UPCOMING_CATALYSTS) entries.push({ date: c.timeline, headline: c.event });
      }
      if (pressReleases.PRESS_RELEASES) {
        for (const pr of pressReleases.PRESS_RELEASES) entries.push({ date: pr.date, headline: pr.headline });
      }
    } else if (ticker === 'BMNR') {
      const [catalysts, competitorNews, timelineEvents, adoption] = await Promise.all([
        import('@/data/bmnr/catalysts'),
        import('@/data/bmnr/competitor-news'),
        import('@/data/bmnr/timeline-events'),
        import('@/data/bmnr/ethereum-adoption'),
      ]);
      if (catalysts.COMPLETED_MILESTONES) {
        for (const m of catalysts.COMPLETED_MILESTONES) entries.push({ date: m.date, headline: m.event });
      }
      if (catalysts.UPCOMING_CATALYSTS) {
        for (const c of catalysts.UPCOMING_CATALYSTS) entries.push({ date: c.timeline, headline: c.event });
      }
      if (competitorNews.BMNR_COMPETITOR_NEWS) {
        for (const n of competitorNews.BMNR_COMPETITOR_NEWS) entries.push({ date: n.date, headline: n.headline, detail: n.bmnrComparison });
      }
      if (timelineEvents.BMNR_TIMELINE_EVENTS) {
        for (const e of timelineEvents.BMNR_TIMELINE_EVENTS) entries.push({ date: e.date, headline: e.title, detail: e.notes });
      }
      if (adoption.BMNR_ADOPTION_TIMELINE) {
        for (const e of adoption.BMNR_ADOPTION_TIMELINE) {
          const detail = [e.summary, e.bmnrImplication].filter(Boolean).join(' | ');
          entries.push({ date: e.date, headline: e.title, detail });
        }
      }
    } else if (ticker === 'CRCL') {
      const [timeline, catalysts, competitorNews] = await Promise.all([
        import('@/data/crcl/timeline'),
        import('@/data/crcl/catalysts'),
        import('@/data/crcl/competitor-news'),
      ]);
      if (timeline.TIMELINE) {
        for (const t of timeline.TIMELINE) entries.push({ date: t.date, headline: t.event });
      }
      if (catalysts.COMPLETED_MILESTONES) {
        for (const m of catalysts.COMPLETED_MILESTONES) entries.push({ date: m.date, headline: m.event });
      }
      if (catalysts.UPCOMING_CATALYSTS) {
        for (const c of catalysts.UPCOMING_CATALYSTS) entries.push({ date: c.timeline, headline: c.event });
      }
      if (competitorNews.CRCL_COMPETITOR_NEWS) {
        for (const n of competitorNews.CRCL_COMPETITOR_NEWS) entries.push({ date: n.date, headline: n.headline, detail: n.crclComparison });
      }
    }
  } catch (error) {
    console.error(`Failed to load analysis data for ${ticker}:`, error);
  }

  // Deduplicate by headline
  const seen = new Set<string>();
  return entries.filter(e => {
    const key = e.headline.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 80);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ── Local fallback (same as check-analyzed) ─────────────────────────────────

function extractKeywords(text: string): Set<string> {
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'has', 'have', 'had', 'be', 'been', 'being', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'do', 'does', 'did', 'not', 'no', 'its', 'it', 'this', 'that', 'these', 'those', 'their', 'our', 'your', 'my', 'we', 'he', 'she', 'they', 'i', 'me', 'us', 'him', 'her', 'them', 'up', 'out', 'over', 'into', 'about', 'after', 'before', 'between', 'through', 'during', 'than', 'more', 'most', 'very', 'also', 'just', 'so', 'if', 'then', 'when', 'where', 'how', 'what', 'which', 'who', 'whom', 'why', 'all', 'each', 'every', 'any', 'few', 'some', 'new', 'said', 'says', 'according']);
  return new Set(
    text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.has(w))
  );
}

function localMatch(articleHeadline: string, analysisData: AnalysisEntry[]): boolean {
  const articleWords = extractKeywords(articleHeadline);
  if (articleWords.size === 0) return false;

  for (const entry of analysisData) {
    const entryText = entry.detail ? `${entry.headline} ${entry.detail}` : entry.headline;
    const entryWords = extractKeywords(entryText);
    let matches = 0;
    for (const w of articleWords) {
      if (entryWords.has(w)) matches++;
    }
    const overlap = matches / articleWords.size;
    if (overlap >= 0.5 && matches >= 3) return true;
  }
  return false;
}

// Heuristic keyword sets for classification when no API key available
const PARTNER_KEYWORDS = new Set(['partner', 'partnership', 'mno', 'operator', 'carrier', 'vodafone', 'att', 'verizon', 'telefonica', 'rakuten', 'bell', 'telstra', 'orange', 'bharti', 'airtel', 'roaming']);
const COMPETITOR_KEYWORDS = new Set(['competitor', 'rival', 'iridium', 'starlink', 'spacex', 'lynk', 'skylo', 'kuiper', 'amazon', 'qualcomm', 'globalstar', 'oneplus']);
const FINANCIAL_KEYWORDS = new Set(['earnings', 'revenue', 'convertible', 'offering', 'dilution', 'shares', 'stock', 'price', 'analyst', 'upgrade', 'downgrade', 'target', 'sec', 'filing', 'debt', 'cash', 'capital', 'raise', 'atm']);
const HIGH_MAT_KEYWORDS = new Set(['launch', 'fcc', 'fda', 'approval', 'contract', 'earnings', 'revenue', 'satellite', 'constellation', 'commercial', 'offering', 'convertible', 'regulatory', 'milestone']);
const BULLISH_KEYWORDS = new Set(['launch', 'approval', 'partnership', 'contract', 'milestone', 'expansion', 'growth', 'upgrade', 'commercial', 'record', 'breakthrough']);
const BEARISH_KEYWORDS = new Set(['delay', 'loss', 'dilution', 'downgrade', 'fail', 'lawsuit', 'warning', 'decline', 'cut']);

function localAnalyze(
  headline: string,
  analysisData: AnalysisEntry[],
  ticker: string,
): {
  tracked: boolean;
  matchedEntry: string | null;
  category: string;
  materiality: string;
  sentiment: string;
} {
  const words = extractKeywords(headline);
  const headlineLower = headline.toLowerCase();

  // Find best matching entry
  let bestMatch: AnalysisEntry | null = null;
  let bestScore = 0;
  for (const entry of analysisData) {
    const entryText = entry.detail ? `${entry.headline} ${entry.detail}` : entry.headline;
    const entryWords = extractKeywords(entryText);
    let matches = 0;
    for (const w of words) {
      if (entryWords.has(w)) matches++;
    }
    const overlap = words.size > 0 ? matches / words.size : 0;
    if (overlap >= 0.5 && matches >= 3 && matches > bestScore) {
      bestScore = matches;
      bestMatch = entry;
    }
  }

  const tracked = bestMatch !== null;

  // Classify category by keyword presence
  let category = 'company';
  let partnerHits = 0, competitorHits = 0, financialHits = 0;
  for (const w of words) {
    if (PARTNER_KEYWORDS.has(w)) partnerHits++;
    if (COMPETITOR_KEYWORDS.has(w)) competitorHits++;
    if (FINANCIAL_KEYWORDS.has(w)) financialHits++;
  }
  if (competitorHits > partnerHits && competitorHits > financialHits) category = 'competitor';
  else if (partnerHits > financialHits) category = 'partner';
  else if (financialHits > 0) category = 'financial';
  // Check if it mentions the ticker or company name directly
  const COMPANY_NAMES: Record<string, string[]> = {
    ASTS: ['ast spacemobile', 'ast space', 'asts'],
    BMNR: ['bitmine', 'bitmine immersion', 'bmnr'],
    CRCL: ['circle', 'crcl'],
  };
  const companyAliases = COMPANY_NAMES[ticker] || [ticker.toLowerCase()];
  const mentionsCompany = companyAliases.some(alias => headlineLower.includes(alias));
  if (!mentionsCompany && category === 'company') {
    category = 'industry';
  }

  // Materiality
  let highHits = 0;
  for (const w of words) {
    if (HIGH_MAT_KEYWORDS.has(w)) highHits++;
  }
  const materiality = highHits >= 2 ? 'high' : highHits === 1 ? 'medium' : 'low';

  // Sentiment
  let bullishHits = 0, bearishHits = 0;
  for (const w of words) {
    if (BULLISH_KEYWORDS.has(w)) bullishHits++;
    if (BEARISH_KEYWORDS.has(w)) bearishHits++;
  }
  const sentiment = bullishHits > bearishHits ? 'bullish' : bearishHits > bullishHits ? 'bearish' : 'neutral';

  return {
    tracked,
    matchedEntry: bestMatch?.headline || null,
    category,
    materiality,
    sentiment,
  };
}

// ── Agentic loop ────────────────────────────────────────────────────────────

const MAX_AGENT_TURNS = 6;

interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string | ClaudeContentBlock[];
}

interface ClaudeContentBlock {
  type: 'text' | 'tool_use' | 'tool_result';
  text?: string;
  id?: string;
  name?: string;
  input?: Record<string, unknown>;
  tool_use_id?: string;
  content?: string;
}

async function runAgentLoop(
  apiKey: string,
  systemPrompt: string,
  userMessage: string,
  analysisData: AnalysisEntry[],
): Promise<{ results: AnalysisResult[]; proposedEntries: ProposedEntry[] }> {
  const messages: ClaudeMessage[] = [
    { role: 'user', content: userMessage },
  ];

  let collectedResults: AnalysisResult[] = [];
  const collectedProposals: ProposedEntry[] = [];

  for (let turn = 0; turn < MAX_AGENT_TURNS; turn++) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 4096,
        system: systemPrompt,
        tools: AGENT_TOOLS,
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[analyze-news] Claude API error:', errText);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const contentBlocks: ClaudeContentBlock[] = data.content || [];
    const stopReason: string = data.stop_reason;

    // Add assistant response to conversation
    messages.push({ role: 'assistant', content: contentBlocks });

    // Process tool calls
    const toolUses = contentBlocks.filter(
      (b: ClaudeContentBlock) => b.type === 'tool_use'
    );

    if (toolUses.length === 0 || stopReason === 'end_turn') {
      // Agent is done — we should have results by now
      break;
    }

    // Execute tools and build tool results
    const toolResults: ClaudeContentBlock[] = [];

    for (const toolUse of toolUses) {
      const { id, name, input } = toolUse;

      if (name === 'search_database') {
        const query = (input as { query: string }).query;
        const result = searchDatabase(query, analysisData);
        toolResults.push({
          type: 'tool_result',
          tool_use_id: id,
          content: result,
        });
      } else if (name === 'submit_analysis') {
        const { results } = input as { results: AnalysisResult[] };
        collectedResults = results;
        toolResults.push({
          type: 'tool_result',
          tool_use_id: id,
          content: `Analysis submitted for ${results.length} articles. Now propose entries for any high-materiality untracked articles, or finish.`,
        });
      } else if (name === 'propose_entry') {
        const entry = input as unknown as ProposedEntry;
        collectedProposals.push(entry);
        toolResults.push({
          type: 'tool_result',
          tool_use_id: id,
          content: `Entry proposed: "${entry.headline}". Continue proposing more entries or finish.`,
        });
      } else {
        toolResults.push({
          type: 'tool_result',
          tool_use_id: id,
          content: `Unknown tool: ${name}`,
        });
      }
    }

    // Send tool results back
    messages.push({ role: 'user', content: toolResults });
  }

  return { results: collectedResults, proposedEntries: collectedProposals };
}

// ── Main handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const ANTHROPIC_API_KEY = (process.env as Record<string, string | undefined>)['ANTHROPIC_API_KEY'] || '';

  try {
    const body = await request.json();
    const { ticker, articles } = body as { ticker: string; articles: ArticleInput[] };

    if (!ticker || !articles?.length) {
      return NextResponse.json({ error: 'Missing ticker or articles' }, { status: 400 });
    }

    const analysisData = await getAnalysisData(ticker.toUpperCase());

    // ── Fallback: no API key → local keyword matching with rich heuristic results ──
    if (!ANTHROPIC_API_KEY) {
      const results = articles.map((a) => {
        const { tracked, matchedEntry, category, materiality, sentiment } =
          localAnalyze(a.headline, analysisData, ticker.toUpperCase());
        return {
          headline: a.headline,
          date: a.date,
          url: a.url,
          analysis: {
            tracked,
            category,
            materiality,
            summary: tracked && matchedEntry
              ? `Matches existing database entry covering this event.`
              : `Untracked — no matching entry found in the ${ticker.toUpperCase()} research database.`,
            matchedEntry,
            sentiment,
          },
        };
      });
      return NextResponse.json({ ticker, results, proposedEntries: [], agent: true });
    }

    // ── Step 1: Scrape article content in parallel ──
    const urls = articles.map(a => a.url).filter(Boolean);
    const scrapedContent = await scrapeArticles(urls);
    const contentMap = new Map(scrapedContent.map(s => [s.url, s.content]));

    // ── Step 2: Build the user message with full context ──
    const existingSummary = analysisData
      .slice(0, 150)
      .map(e => {
        const detail = e.detail ? ` — ${e.detail.slice(0, 200)}` : '';
        return `[${e.date}] ${e.headline}${detail}`;
      })
      .join('\n');

    const articleList = articles
      .map((a, i) => {
        const content = contentMap.get(a.url);
        const contentSection = content
          ? `\n   ARTICLE CONTENT: ${content}`
          : '\n   (Article content could not be fetched — analyze based on headline only)';
        return `${i + 1}. [${a.date}] ${a.headline}\n   URL: ${a.url}${contentSection}`;
      })
      .join('\n\n');

    const userMessage = `EXISTING RESEARCH DATABASE (${analysisData.length} entries):
${existingSummary}

---

NEW ARTICLES TO ANALYZE (${articles.length}):

${articleList}

---

Please analyze all ${articles.length} articles. Use search_database if you need to verify whether a specific topic is tracked. Then call submit_analysis with your results. For any HIGH materiality untracked articles, also call propose_entry.`;

    // ── Step 3: Run the agentic loop ──
    const systemPrompt = buildSystemPrompt(ticker.toUpperCase());
    const { results: agentResults, proposedEntries } = await runAgentLoop(
      ANTHROPIC_API_KEY,
      systemPrompt,
      userMessage,
      analysisData,
    );

    // ── Step 4: Map results back to articles ──
    const output = articles.map((article, i) => {
      const result = agentResults.find(r => r.index === i + 1);
      return {
        headline: article.headline,
        date: article.date,
        url: article.url,
        analysis: result
          ? {
              tracked: result.tracked,
              category: result.category,
              materiality: result.materiality,
              summary: result.summary,
              matchedEntry: result.matchedEntry || null,
              sentiment: result.sentiment,
            }
          : {
              tracked: false,
              category: 'company',
              materiality: 'medium',
              summary: '',
              matchedEntry: null,
              sentiment: 'neutral',
            },
      };
    });

    return NextResponse.json({
      ticker,
      results: output,
      proposedEntries,
      agent: true,
    });
  } catch (error) {
    console.error('[analyze-news] Error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
