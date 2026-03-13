"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { stocks, stockList, INTELLIGENCE_TICKERS } from "@/lib/stocks";
import "./press-intelligence.css";

/* ═══════════════════════════════════════════════════════════════════════════
   STOCK FEED CONFIGURATION
   Add new stocks here. The page auto-adapts — no other changes needed.
   ═══════════════════════════════════════════════════════════════════════════ */

interface FeedConfig {
  ticker: string;
  endpoint: string;
  accent: string;        // CSS variable name (cyan, violet, mint)
  color: string;         // hex for pill & badge
  colorDim: string;      // hex at 15% for badge bg
  grade: "A" | "B" | "C" | "D" | "F";  // monitoring priority from review 2026-03-12
  sourceFilter: (source: string) => boolean;
  headlineFilter: (headline: string) => boolean;  // relevance gate — must mention company
  parseResponse?: (json: any) => any[];  // custom response parser (default: QuoteMedia nested)
  categories: Record<string, (headline: string) => boolean>;
}

/* ─── Shared category matchers (reused across many FEED_CONFIGS) ─── */
const CAT_EARNINGS = (h: string) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h);
const CAT_CORPORATE = (h: string) => /acqui|merger|board|director|appoint|officer|ceo|cfo/i.test(h);
const CAT_CORPORATE_DIV = (h: string) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend/i.test(h);
const CAT_CORPORATE_DIV_BUYBACK = (h: string) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend|buyback/i.test(h);
const CAT_CAPITAL_MARKETS = (h: string) => /notes|offering|convert|shares|capital|repurchase|debt|\$\d/i.test(h);
const CAT_PARTNERSHIPS = (h: string) => /partner|agreement|contract|deal|alliance|collaborat|launch|integrat/i.test(h);

const PAYMENT_CATEGORIES: Record<string, (h: string) => boolean> = {
  Earnings: CAT_EARNINGS,
  Payments: (h) => /payment|transaction|card|contactless|tap|digital|tokeniz|wallet|network/i.test(h),
  Partnerships: CAT_PARTNERSHIPS,
  Corporate: CAT_CORPORATE_DIV_BUYBACK,
  "Capital Markets": CAT_CAPITAL_MARKETS,
};

const TELECOM_CATEGORIES = (networkExtra: string): Record<string, (h: string) => boolean> => ({
  Earnings: CAT_EARNINGS,
  "Network & 5G": (h) => new RegExp(`5g|network|spectrum|wireless|broadband|fiber|mobile${networkExtra}`, "i").test(h),
  Partnerships: (h) => /partner|agreement|contract|deal|alliance|satellite/i.test(h),
  Corporate: CAT_CORPORATE_DIV,
  "Capital Markets": CAT_CAPITAL_MARKETS,
});

/* ─── Shared feed defaults for simple QM tickers ─── */
const QM_DEFAULTS = {
  sourceFilter: () => true as const,
  headlineFilter: () => true as const,
  parseResponse: (json: any) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
};

const FEED_CONFIGS: FeedConfig[] = [
  {
    ticker: "ASTS",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=ASTS",
    accent: "cyan",
    color: "#22D3EE",
    colorDim: "rgba(34,211,238,0.15)",
    sourceFilter: (src) => src.toLowerCase().includes("business wire"),
    headlineFilter: (h) => /ast\s*spacemobile|asts/i.test(h),
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d/i.test(h),
      Launches: (h) => /launch|bluebird|satellite|orbit|unfold|spacex/i.test(h),
      Partnerships: (h) => /partner|agreement|definitive|carrier|vodafone|verizon|at&t|telus|vi |stc/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|note repurchase|\$\d/i.test(h),
    },
  },
  {
    ticker: "BMNR",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=BMNR",
    accent: "violet",
    color: "#A78BFA",
    colorDim: "rgba(167,139,250,0.15)",
    sourceFilter: (src) => {
      const s = src.toLowerCase();
      return s.includes("pr newswire") || s.includes("prnewswire") || s.includes("business wire") || s.includes("accesswire") || s.includes("globe newswire");
    },
    headlineFilter: (h) => /bitmine|bmnr|bit\s*mine/i.test(h),
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Ethereum: (h) => /eth|ethereum|staking|crypto|digital asset|blockchain|treasury/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|name|ceo|cfo/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|warrant|stock|note repurchase|\$\d/i.test(h),
    },
  },
  {
    ticker: "IRDM",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=IRDM",
    accent: "gold",
    color: "#F59E0B",
    colorDim: "rgba(245,158,11,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for "iridium"
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Satellite: (h) => /satellite|launch|orbit|iot|certus|l-band|constellation/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|award|select|government|dod/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend|buyback/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|\$\d/i.test(h),
    },
  },
  {
    ticker: "GSAT",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=GSAT",
    accent: "orange",
    color: "#FB923C",
    colorDim: "rgba(251,146,60,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for "globalstar"
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Satellite: (h) => /satellite|launch|orbit|spectrum|band|constellation|apple/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|award|apple|qualcomm|government/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|\$\d/i.test(h),
    },
  },
  {
    ticker: "VZ",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=VZ",
    accent: "rose",
    color: "#F472B6",
    colorDim: "rgba(244,114,182,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for "verizon"
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      "5G & Network": (h) => /5g|network|spectrum|fios|wireless|broadband|c-band|mmwave|lte/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|award|select|deal|alliance/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend|buyback/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "VSAT",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=VSAT",
    accent: "indigo",
    color: "#818CF8",
    colorDim: "rgba(129,140,248,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for "viasat"
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Satellite: (h) => /satellite|launch|orbit|ka-band|broadband|inflight|connectivity|viasat-3/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|award|select|government|dod|military|airline/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend|buyback/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "RKLB",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=RKLB",
    accent: "fuchsia",
    color: "#D946EF",
    colorDim: "rgba(217,70,239,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for "rocket lab"
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Launch: (h) => /launch|electron|neutron|mission|payload|deploy|liftoff|rocket/i.test(h),
      Satellite: (h) => /satellite|spacecraft|photon|constellation|orbit|space\s*systems/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|award|select|government|dod|military|nasa/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend|buyback/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "SATS",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=SATS",
    accent: "pink",
    color: "#EC4899",
    colorDim: "rgba(236,72,153,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for "echostar/hughes"
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Satellite: (h) => /satellite|launch|orbit|spectrum|broadband|jupiter|s-band|ku-band|hughes/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|award|select|government|dod|military|fcc/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend|buyback|dish/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "LUNR",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=LUNR",
    accent: "yellow",
    color: "#FACC15",
    colorDim: "rgba(250,204,21,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for "intuitive machines"
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Lunar: (h) => /lunar|moon|lander|landing|artemis|clps|south\s*pole/i.test(h),
      Satellite: (h) => /satellite|orbit|relay|data\s*transmission|deep\s*space|navigation/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|award|select|government|nasa|dod|military/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend|buyback/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "T",
    grade: "B",
    endpoint: "/api/press-intelligence?ticker=T",
    accent: "sky",
    color: "#38BDF8",
    colorDim: "rgba(56,189,248,0.15)",
    sourceFilter: () => true,  // API pre-filters across 5 sources
    headlineFilter: () => true,  // API pre-filters for AT&T
    parseResponse: (json: any) => Array.isArray(json) ? json : [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      "5G & Network": (h) => /5g|network|spectrum|firstnet|fiber|wireless|broadband/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|award|select|deal|alliance/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend|buyback/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "AMZLEO",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=AMZLEO",
    accent: "emerald",
    color: "#34D399",
    colorDim: "rgba(52,211,153,0.15)",
    sourceFilter: () => true,
    headlineFilter: () => true,
    parseResponse: (json: any) => json?.news || [],
    categories: {
      Satellite: (h) => /satellite|kuiper|leo|orbit|launch|space|constellation/i.test(h),
      Connectivity: (h) => /connect|broadband|internet|coverage|rural|wireless|network/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|carrier|telco|operator|government/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|hire|team/i.test(h),
    },
  },
  {
    ticker: "MSTR",
    grade: "C",
    endpoint: "/api/press-intelligence?ticker=MSTR",
    accent: "amber",
    color: "#F59E0B",
    colorDim: "rgba(245,158,11,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for strategy/microstrategy
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Bitcoin: (h) => /bitcoin|btc|digital asset|crypto|treasury|hodl|acquisition/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|name change|rebrand/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "MARA",
    grade: "C",
    endpoint: "/api/press-intelligence?ticker=MARA",
    accent: "lime",
    color: "#84CC16",
    colorDim: "rgba(132,204,22,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for marathon/mara
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Mining: (h) => /mining|hash|hashrate|exahash|block|mined|production|energize/i.test(h),
      Bitcoin: (h) => /bitcoin|btc|digital asset|crypto|treasury/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "RIOT",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=RIOT",
    accent: "red",
    color: "#EF4444",
    colorDim: "rgba(239,68,68,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for riot
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Mining: (h) => /mining|hash|hashrate|exahash|block|mined|production|megawatt|facility/i.test(h),
      Bitcoin: (h) => /bitcoin|btc|digital asset|crypto|treasury/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "CLSK",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=CLSK",
    accent: "green",
    color: "#22C55E",
    colorDim: "rgba(34,197,94,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for cleanspark
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Mining: (h) => /mining|hash|hashrate|exahash|block|mined|production|megawatt|facility/i.test(h),
      Bitcoin: (h) => /bitcoin|btc|digital asset|crypto|treasury/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "HUT",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=HUT",
    accent: "stone",
    color: "#A8A29E",
    colorDim: "rgba(168,162,158,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for "hut 8"
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Mining: (h) => /mining|hash|hashrate|exahash|block|mined|production|megawatt|facility|data\s*center/i.test(h),
      Bitcoin: (h) => /bitcoin|btc|digital asset|crypto|treasury/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "IREN",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=IREN",
    accent: "teal",
    color: "#2DD4BF",
    colorDim: "rgba(45,212,191,0.15)",
    sourceFilter: () => true,
    headlineFilter: () => true,
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Mining: (h) => /mining|hash|hashrate|exahash|block|mined|production|megawatt|facility|data\s*center/i.test(h),
      Bitcoin: (h) => /bitcoin|btc|digital asset|crypto|treasury/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "NBIS",
    grade: "C",
    endpoint: "/api/press-intelligence?ticker=NBIS",
    accent: "indigo",
    color: "#818CF8",
    colorDim: "rgba(129,140,248,0.15)",
    sourceFilter: () => true,
    headlineFilter: () => true,
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      "AI & Cloud": (h) => /\bai\b|artificial|cloud|gpu|compute|inference|training|model|data\s*center/i.test(h),
      Product: (h) => /launch|platform|product|service|partner|integrat|sdk|api/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|ipo|stock|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "FRMM",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=FRMM",
    accent: "purple",
    color: "#A855F7",
    colorDim: "rgba(168,85,247,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for forum/ethzilla
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Tokenization: (h) => /token|rwa|real.world|aviation|loan|portfolio|securit/i.test(h),
      Ethereum: (h) => /eth|ethereum|staking|crypto|digital asset|blockchain|treasury|validator/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|name change|rebrand|forum|ethzilla/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|warrant|stock|\$\d/i.test(h),
    },
  },
  {
    ticker: "COIN",
    grade: "B",
    endpoint: "/api/press-intelligence?ticker=COIN",
    accent: "blue",
    color: "#3B82F6",
    colorDim: "rgba(59,130,246,0.15)",
    sourceFilter: () => true,  // API pre-filters
    headlineFilter: () => true,  // API pre-filters for coinbase
    parseResponse: (json) => Array.isArray(json) ? json : json?.results?.news?.[0]?.newsitem || [],
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial/i.test(h),
      Exchange: (h) => /exchange|trading|listing|delist|custody|staking|base\b|layer\s*2/i.test(h),
      Regulatory: (h) => /sec|regulat|compliance|license|legal|lawsuit|settlement|approval/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|partnership/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|buyback|repurchase|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "CRCL",
    grade: "B",
    endpoint: "/api/press-intelligence?ticker=CRCL",
    accent: "mint",
    color: "#34D399",
    colorDim: "rgba(52,211,153,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Stablecoin: (h) => /usdc|stablecoin|stable\s*coin|dollar|peg|mint|redeem|reserve|circle/i.test(h),
      Regulatory: (h) => /sec|regulat|compliance|license|legal|lawsuit|mica|framework|approval/i.test(h),
      Partnerships: CAT_PARTNERSHIPS,
      Corporate: CAT_CORPORATE,
      "Capital Markets": CAT_CAPITAL_MARKETS,
    },
  },
  // ─── Fintech & Payments ───
  {
    ticker: "MA",
    grade: "C",
    endpoint: "/api/press-intelligence?ticker=MA",
    accent: "orange",
    color: "#F97316",
    colorDim: "rgba(249,115,22,0.15)",
    ...QM_DEFAULTS,
    categories: PAYMENT_CATEGORIES,
  },
  {
    ticker: "V",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=V",
    accent: "blue",
    color: "#2563EB",
    colorDim: "rgba(37,99,235,0.15)",
    ...QM_DEFAULTS,
    categories: PAYMENT_CATEGORIES,
  },
  {
    ticker: "SOFI",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=SOFI",
    accent: "cyan",
    color: "#06B6D4",
    colorDim: "rgba(6,182,212,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Banking: (h) => /bank|lending|loan|mortgage|deposit|savings|checking|interest/i.test(h),
      Investing: (h) => /invest|brokerage|etf|stock|crypto|robo|advisory/i.test(h),
      Corporate: CAT_CORPORATE_DIV_BUYBACK,
      "Capital Markets": CAT_CAPITAL_MARKETS,
    },
  },
  {
    ticker: "AXP",
    grade: "B",
    endpoint: "/api/press-intelligence?ticker=AXP",
    accent: "sky",
    color: "#0EA5E9",
    colorDim: "rgba(14,165,233,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      "Cards & Payments": (h) => /card|payment|member|reward|point|travel|lounge|cobrand/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|deal|alliance|collaborat|launch/i.test(h),
      Corporate: CAT_CORPORATE_DIV_BUYBACK,
      "Capital Markets": CAT_CAPITAL_MARKETS,
    },
  },
  {
    ticker: "AFRM",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=AFRM",
    accent: "violet",
    color: "#7C3AED",
    colorDim: "rgba(124,58,237,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      BNPL: (h) => /buy.now|bnpl|installment|pay.later|checkout|merchant|consumer|loan/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|deal|alliance|collaborat|launch|integrat|shopify|amazon/i.test(h),
      Corporate: CAT_CORPORATE,
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|debt|securitiz|\$\d/i.test(h),
    },
  },
  {
    ticker: "SEZL",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=SEZL",
    accent: "purple",
    color: "#9333EA",
    colorDim: "rgba(147,51,234,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      BNPL: (h) => /buy.now|bnpl|installment|pay.later|checkout|merchant|consumer/i.test(h),
      Partnerships: CAT_PARTNERSHIPS,
      Corporate: CAT_CORPORATE,
      "Capital Markets": CAT_CAPITAL_MARKETS,
    },
  },
  {
    ticker: "SQ",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=SQ",
    accent: "emerald",
    color: "#10B981",
    colorDim: "rgba(16,185,129,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Payments: (h) => /square|cash\s*app|payment|pos|point.of.sale|merchant|seller/i.test(h),
      Bitcoin: (h) => /bitcoin|btc|crypto|digital asset|blockchain|tbd|web5/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|afterpay/i.test(h),
      "Capital Markets": CAT_CAPITAL_MARKETS,
    },
  },
  {
    ticker: "PYPL",
    grade: "F",
    endpoint: "/api/press-intelligence?ticker=PYPL",
    accent: "blue",
    color: "#3B82F6",
    colorDim: "rgba(59,130,246,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Payments: (h) => /payment|checkout|venmo|braintree|merchant|digital wallet|xoom/i.test(h),
      Crypto: (h) => /crypto|bitcoin|stablecoin|pyusd|blockchain|digital currency/i.test(h),
      Corporate: CAT_CORPORATE,
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|debt|buyback|\$\d/i.test(h),
    },
  },
  {
    ticker: "UPST",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=UPST",
    accent: "fuchsia",
    color: "#C026D3",
    colorDim: "rgba(192,38,211,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      "AI Lending": (h) => /\bai\b|artificial|model|lending|loan|auto|personal|heloc|underwriting/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|deal|bank|credit union|origination/i.test(h),
      Corporate: CAT_CORPORATE,
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|debt|securitiz|\$\d/i.test(h),
    },
  },
  // ─── Digital Assets ───
  {
    ticker: "GLXY",
    grade: "D",
    endpoint: "/api/press-intelligence?ticker=GLXY",
    accent: "amber",
    color: "#D97706",
    colorDim: "rgba(217,119,6,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      "Digital Assets": (h) => /bitcoin|btc|crypto|digital asset|blockchain|defi|trading|custody|staking/i.test(h),
      "Asset Management": (h) => /fund|etf|asset manag|portfolio|venture|invest/i.test(h),
      Corporate: CAT_CORPORATE,
      "Capital Markets": CAT_CAPITAL_MARKETS,
    },
  },
  {
    ticker: "HOOD",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=HOOD",
    accent: "lime",
    color: "#65A30D",
    colorDim: "rgba(101,163,13,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Trading: (h) => /trading|option|equity|crypto|margin|gold|24.hour|commission|retail/i.test(h),
      Product: (h) => /launch|feature|product|app|wallet|credit card|ira|retirement/i.test(h),
      Corporate: CAT_CORPORATE,
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|debt|buyback|\$\d/i.test(h),
    },
  },
  {
    ticker: "BITF",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=BITF",
    accent: "yellow",
    color: "#CA8A04",
    colorDim: "rgba(202,138,4,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Mining: (h) => /mining|hash|hashrate|exahash|block|mined|production|megawatt|facility|data\s*center/i.test(h),
      Bitcoin: (h) => /bitcoin|btc|digital asset|crypto|treasury/i.test(h),
      Corporate: CAT_CORPORATE,
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
  // ─── Financial Services ───
  {
    ticker: "BLK",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=BLK",
    accent: "slate",
    color: "#64748B",
    colorDim: "rgba(100,116,139,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      "Asset Management": (h) => /etf|ishares|fund|aum|asset|flow|index|aladdin|portfolio/i.test(h),
      "Digital Assets": (h) => /bitcoin|crypto|digital asset|blockchain|tokeniz|ibit/i.test(h),
      Corporate: CAT_CORPORATE,
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|debt|dividend|buyback|\$\d/i.test(h),
    },
  },
  {
    ticker: "HSBC",
    grade: "D",
    endpoint: "/api/press-intelligence?ticker=HSBC",
    accent: "red",
    color: "#DC2626",
    colorDim: "rgba(220,38,38,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial|profit/i.test(h),
      Banking: (h) => /bank|wealth|private|commercial|retail|loan|deposit|mortgage/i.test(h),
      "Digital Assets": (h) => /bitcoin|crypto|digital asset|blockchain|tokeniz|cbdc/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|restructur/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|debt|dividend|\$\d/i.test(h),
    },
  },
  {
    ticker: "C",
    grade: "C",
    endpoint: "/api/press-intelligence?ticker=C",
    accent: "sky",
    color: "#0284C7",
    colorDim: "rgba(2,132,199,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial|profit/i.test(h),
      Banking: (h) => /bank|wealth|institutional|commercial|consumer|loan|deposit|treasury/i.test(h),
      "Digital Assets": (h) => /bitcoin|crypto|digital asset|blockchain|tokeniz|cbdc|stablecoin/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|restructur/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|debt|dividend|\$\d/i.test(h),
    },
  },
  {
    ticker: "CME",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=CME",
    accent: "indigo",
    color: "#4F46E5",
    colorDim: "rgba(79,70,229,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Derivatives: (h) => /futures|options|derivatives|clearing|volume|open interest|contract|index/i.test(h),
      "Digital Assets": (h) => /bitcoin|crypto|digital asset|ether|micro|reference rate/i.test(h),
      Corporate: CAT_CORPORATE_DIV,
      "Capital Markets": CAT_CAPITAL_MARKETS,
    },
  },
  {
    ticker: "ICE",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=ICE",
    accent: "teal",
    color: "#0D9488",
    colorDim: "rgba(13,148,136,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Exchanges: (h) => /nyse|exchange|clearing|data|index|listing|ipo|fixed income|mortgage/i.test(h),
      "Digital Assets": (h) => /bitcoin|crypto|digital asset|bakkt|blockchain/i.test(h),
      Corporate: CAT_CORPORATE_DIV,
      "Capital Markets": CAT_CAPITAL_MARKETS,
    },
  },
  // ─── Telecom ───
  {
    ticker: "VOD",
    grade: "F",
    endpoint: "/api/press-intelligence?ticker=VOD",
    accent: "rose",
    color: "#E11D48",
    colorDim: "rgba(225,29,72,0.15)",
    ...QM_DEFAULTS,
    categories: {
      ...TELECOM_CATEGORIES("|openran"),
      Partnerships: (h) => /partner|agreement|contract|deal|alliance|ast\s*spacemobile|satellite/i.test(h),
    },
  },
  {
    ticker: "ORAN",
    grade: "F",
    endpoint: "/api/press-intelligence?ticker=ORAN",
    accent: "orange",
    color: "#EA580C",
    colorDim: "rgba(234,88,12,0.15)",
    ...QM_DEFAULTS,
    categories: TELECOM_CATEGORIES("|africa|europe"),
  },
  {
    ticker: "TU",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=TU",
    accent: "green",
    color: "#16A34A",
    colorDim: "rgba(22,163,74,0.15)",
    ...QM_DEFAULTS,
    categories: {
      ...TELECOM_CATEGORIES("|purefibr"),
      "Health & Digital": (h) => /health|agriculture|digital|security|smart|iot/i.test(h),
    },
  },
  {
    ticker: "BCE",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=BCE",
    accent: "sky",
    color: "#0369A1",
    colorDim: "rgba(3,105,161,0.15)",
    ...QM_DEFAULTS,
    categories: {
      ...TELECOM_CATEGORIES("|bell"),
      Media: (h) => /media|crave|tsn|ctv|broadcast|streaming|content/i.test(h),
    },
  },
  // ─── Infrastructure & Tech ───
  {
    ticker: "AMT",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=AMT",
    accent: "zinc",
    color: "#71717A",
    colorDim: "rgba(113,113,122,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: (h) => /earnings|results|revenue|q[1-4]\s*20\d\d|financial|ffo/i.test(h),
      Towers: (h) => /tower|cell site|data center|infrastructure|lease|tenant|colocation|edge/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|deal|carrier|operator|build|deploy/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend|reit/i.test(h),
      "Capital Markets": CAT_CAPITAL_MARKETS,
    },
  },
  {
    ticker: "RKUNF",
    grade: "F",
    endpoint: "/api/press-intelligence?ticker=RKUNF",
    accent: "rose",
    color: "#BE123C",
    colorDim: "rgba(190,18,60,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Mobile: (h) => /mobile|5g|openran|network|spectrum|wireless|rakuten\s*mobile|symphony/i.test(h),
      "E-Commerce": (h) => /e.commerce|marketplace|shopping|retail|merchant|fintech|payment/i.test(h),
      Corporate: CAT_CORPORATE_DIV,
      "Capital Markets": CAT_CAPITAL_MARKETS,
    },
  },
  {
    ticker: "GOOGL",
    grade: "F",
    endpoint: "/api/press-intelligence?ticker=GOOGL",
    accent: "emerald",
    color: "#059669",
    colorDim: "rgba(5,150,105,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      "AI & Cloud": (h) => /\bai\b|gemini|cloud|gcp|tpu|deepmind|artificial|model|vertex/i.test(h),
      Product: (h) => /search|android|pixel|youtube|waymo|chrome|maps|workspace/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|alphabet/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|repurchase|debt|buyback|\$\d/i.test(h),
    },
  },
  // ─── Aerospace & Defense ───
  {
    ticker: "PL",
    grade: "F",
    endpoint: "/api/press-intelligence?ticker=PL",
    accent: "sky",
    color: "#0284C7",
    colorDim: "rgba(2,132,199,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Satellite: (h) => /satellite|orbit|launch|constellation|flock|pelican|skysat/i.test(h),
      Imaging: (h) => /imaging|earth|observation|geospatial|data|analytics|monitoring/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|award|government|nasa|dod|defense/i.test(h),
      Corporate: CAT_CORPORATE,
    },
  },
  {
    ticker: "BA",
    grade: "F",
    endpoint: "/api/press-intelligence?ticker=BA",
    accent: "blue",
    color: "#1D4ED8",
    colorDim: "rgba(29,78,216,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Commercial: (h) => /737|747|767|777|787|dreamliner|commercial|airline|order|deliver/i.test(h),
      Defense: (h) => /defense|military|fighter|f-15|f.18|apache|chinook|tanker|weapon|dod|pentagon/i.test(h),
      Space: (h) => /space|starliner|sls|satellite|launch|orbit|nasa/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|safety|faa/i.test(h),
    },
  },
  {
    ticker: "LMT",
    grade: "F",
    endpoint: "/api/press-intelligence?ticker=LMT",
    accent: "slate",
    color: "#475569",
    colorDim: "rgba(71,85,105,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Defense: (h) => /f-35|f.35|missile|patriot|himars|thaad|weapon|defense|military|contract|dod/i.test(h),
      Space: (h) => /space|satellite|orion|gps|sbirs|launch|orbit|nasa|rocket/i.test(h),
      Cyber: (h) => /cyber|security|classified|intelligence|sikorsky|helicopter/i.test(h),
      Corporate: CAT_CORPORATE_DIV,
    },
  },
  // ─── Semiconductors & Telecom Equipment ───
  {
    ticker: "QCOM",
    grade: "F",
    endpoint: "/api/press-intelligence?ticker=QCOM",
    accent: "blue",
    color: "#2563EB",
    colorDim: "rgba(37,99,235,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      "5G & Modem": (h) => /5g|modem|snapdragon|chip|processor|spectrum|wireless|lte|cellular/i.test(h),
      Automotive: (h) => /auto|vehicle|car|drive|cockpit|adas|ride/i.test(h),
      "AI & IoT": (h) => /\bai\b|artificial|iot|edge|compute|cloud|machine\s*learn/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|licens/i.test(h),
    },
  },
  {
    ticker: "NOK",
    grade: "F",
    endpoint: "/api/press-intelligence?ticker=NOK",
    accent: "indigo",
    color: "#4338CA",
    colorDim: "rgba(67,56,202,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Networks: (h) => /5g|network|ran|openran|radio|fiber|optical|ip|routing|mobile/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|award|operator|carrier|deploy/i.test(h),
      "IP & Licensing": (h) => /patent|licens|intellectual|royalt|technolog/i.test(h),
      Corporate: CAT_CORPORATE_DIV,
    },
  },
  {
    ticker: "ERIC",
    grade: "F",
    endpoint: "/api/press-intelligence?ticker=ERIC",
    accent: "blue",
    color: "#1E40AF",
    colorDim: "rgba(30,64,175,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Networks: (h) => /5g|network|ran|openran|radio|cloud\s*ran|core|transport|mobile/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|award|operator|carrier|deploy|managed/i.test(h),
      Enterprise: (h) => /enterprise|private\s*network|iot|industry|vonage|api/i.test(h),
      Corporate: CAT_CORPORATE_DIV,
    },
  },
  {
    ticker: "TMUS",
    grade: "D",
    endpoint: "/api/press-intelligence?ticker=TMUS",
    accent: "pink",
    color: "#DB2777",
    colorDim: "rgba(219,39,119,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Network: (h) => /5g|network|coverage|spectrum|tower|mid.band|speed|lte|advanced/i.test(h),
      Consumer: (h) => /plan|offer|unlimited|home\s*internet|customer|price|promo|launch/i.test(h),
      Enterprise: (h) => /enterprise|business|iot|private\s*network|first\s*responder/i.test(h),
      Corporate: CAT_CORPORATE_DIV_BUYBACK,
    },
  },
  {
    ticker: "NVDA",
    grade: "B",
    endpoint: "/api/press-intelligence?ticker=NVDA",
    accent: "lime",
    color: "#65A30D",
    colorDim: "rgba(101,163,13,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      "AI & Data Center": (h) => /\bai\b|artificial|gpu|data\s*center|h100|a100|b100|blackwell|hopper|grace|tensor|cuda/i.test(h),
      Gaming: (h) => /geforce|rtx|gaming|gamer|shield|console/i.test(h),
      Automotive: (h) => /auto|drive|vehicle|orin|atlan|car|self.driv/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend|split/i.test(h),
    },
  },
  {
    ticker: "IBM",
    grade: "B",
    endpoint: "/api/press-intelligence?ticker=IBM",
    accent: "blue",
    color: "#1E3A8A",
    colorDim: "rgba(30,58,138,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      "AI & Cloud": (h) => /\bai\b|watsonx|watson|cloud|hybrid|red\s*hat|openshift|quantum/i.test(h),
      Consulting: (h) => /consult|service|digital\s*transform|automat|enterprise/i.test(h),
      Partnerships: (h) => /partner|agreement|contract|award|government|federal/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|dividend|spin/i.test(h),
    },
  },
  // ─── Bitcoin Mining (additional) ───
  {
    ticker: "CIFR",
    grade: "F",
    endpoint: "/api/press-intelligence?ticker=CIFR",
    accent: "emerald",
    color: "#047857",
    colorDim: "rgba(4,120,87,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Mining: (h) => /mining|hash|hashrate|exahash|block|mined|production|megawatt|facility|data\s*center/i.test(h),
      Bitcoin: (h) => /bitcoin|btc|digital asset|crypto|treasury/i.test(h),
      Corporate: CAT_CORPORATE,
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "HIVE",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=HIVE",
    accent: "yellow",
    color: "#CA8A04",
    colorDim: "rgba(202,138,4,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Mining: (h) => /mining|hash|hashrate|exahash|block|mined|production|megawatt|facility|data\s*center/i.test(h),
      Bitcoin: (h) => /bitcoin|btc|digital asset|crypto|ethereum|eth/i.test(h),
      "AI & HPC": (h) => /\bai\b|artificial|gpu|hpc|high.performance|compute|cloud/i.test(h),
      Corporate: CAT_CORPORATE,
    },
  },
  {
    ticker: "CORZ",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=CORZ",
    accent: "orange",
    color: "#C2410C",
    colorDim: "rgba(194,65,12,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Mining: (h) => /mining|hash|hashrate|exahash|block|mined|production|megawatt|facility|data\s*center/i.test(h),
      "AI & HPC": (h) => /\bai\b|artificial|gpu|hpc|high.performance|compute|coreweave|hosting/i.test(h),
      Corporate: (h) => /acqui|merger|board|director|appoint|officer|ceo|cfo|bankruptcy|restructur/i.test(h),
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "APLD",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=APLD",
    accent: "violet",
    color: "#7C3AED",
    colorDim: "rgba(124,58,237,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      "AI & HPC": (h) => /\bai\b|artificial|gpu|hpc|high.performance|compute|cloud|data\s*center/i.test(h),
      Mining: (h) => /mining|hash|hashrate|bitcoin|btc|crypto|block/i.test(h),
      Corporate: CAT_CORPORATE,
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "CAN",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=CAN",
    accent: "amber",
    color: "#D97706",
    colorDim: "rgba(217,119,6,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Mining: (h) => /mining|miner|asic|hashrate|hash|avalon|bitcoin|btc/i.test(h),
      Product: (h) => /product|chip|hardware|machine|immersion|new\s*model|launch/i.test(h),
      Corporate: CAT_CORPORATE,
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "ARBK",
    grade: "F",
    endpoint: "/api/press-intelligence?ticker=ARBK",
    accent: "cyan",
    color: "#0891B2",
    colorDim: "rgba(8,145,178,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Mining: (h) => /mining|hash|hashrate|exahash|block|mined|production|megawatt|facility/i.test(h),
      Bitcoin: (h) => /bitcoin|btc|digital asset|crypto|treasury/i.test(h),
      Corporate: CAT_CORPORATE,
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
  {
    ticker: "BKKT",
    grade: "A",
    endpoint: "/api/press-intelligence?ticker=BKKT",
    accent: "fuchsia",
    color: "#A21CAF",
    colorDim: "rgba(162,28,175,0.15)",
    ...QM_DEFAULTS,
    categories: {
      Earnings: CAT_EARNINGS,
      Crypto: (h) => /bitcoin|btc|crypto|digital asset|custody|trading|exchange/i.test(h),
      Platform: (h) => /platform|loyalty|reward|payment|merchant|partner/i.test(h),
      Corporate: CAT_CORPORATE,
      "Capital Markets": (h) => /notes|offering|convert|shares|capital|atm|stock|debt|\$\d/i.test(h),
    },
  },
];

/* Build merged category set from all configs */
const ALL_CATEGORIES = (() => {
  const set = new Set<string>();
  for (const cfg of FEED_CONFIGS) {
    for (const cat of Object.keys(cfg.categories)) set.add(cat);
  }
  return ["All", ...Array.from(set)];
})();

/* ═══════════════════════════════════════════════════════════════════════════ */

interface NewsItem {
  newsid?: string;
  id?: string;
  headline?: string;
  title?: string;
  summary?: string;
  description?: string;
  datetime: string;
  source?: string;
  _ticker: string;      // injected after fetch
  _config: FeedConfig;   // injected after fetch
  _inDb?: boolean;       // true if item was already stored in database
}

const formatDate = (str: string) => {
  if (!str) return "";
  const d = new Date(str);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const formatTime = (str: string) => {
  if (!str) return "";
  const d = new Date(str);
  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${m} ${ampm}`;
};

const isThisYear = (str: string) => new Date(str).getFullYear() === new Date().getFullYear();
const isThisMonth = (str: string) => {
  const d = new Date(str);
  const n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth();
};

const isToday = (str: string) => {
  const d = new Date(str);
  const n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate();
};

/* ═══════════════════════════════════════════════════════════════════════════ */

/* ── Methodology types ── */
interface MethodologySource {
  name: string;
  type: string;
  detail: string;
  sourceFilter?: string;
}

interface MethodologyData {
  ticker: string;
  grade: string;
  type: string;
  sources: MethodologySource[];
  headlineFilter: string | null;
  dbStats?: {
    totalRows: number;
    oldest: string;
    newest: string;
    distinctSources: number;
    topSources: { source: string; count: number }[];
  };
}

export default function PressIntelligencePage() {
  const [feedsByTicker, setFeedsByTicker] = useState<Record<string, NewsItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [refreshing, setRefreshing] = useState(false);
  const [refreshLog, setRefreshLog] = useState<string[]>([]);

  /* Methodology popup */
  const [methodologyTicker, setMethodologyTicker] = useState<string | null>(null);
  const [methodologyData, setMethodologyData] = useState<MethodologyData | null>(null);
  const [methodologyLoading, setMethodologyLoading] = useState(false);

  const openMethodology = useCallback(async (ticker: string) => {
    setMethodologyTicker(ticker);
    setMethodologyLoading(true);
    setMethodologyData(null);
    try {
      const res = await fetch(`/api/press-intelligence?ticker=${ticker}&mode=methodology`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMethodologyData(data);
    } catch (e: any) {
      setMethodologyData(null);
    }
    setMethodologyLoading(false);
  }, []);

  /* Filters */
  const [activeTicker, setActiveTicker] = useState("ALL");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [daysFilter, setDaysFilter] = useState(30);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  /* ── Fetch all feeds in parallel ── */
  const loadAll = useCallback(async (mode: "db" | "refresh" = "db") => {
    const results: Record<string, NewsItem[]> = {};
    const errs: Record<string, string> = {};
    const isRefresh = mode === "refresh";
    const log = (msg: string) => {
      if (isRefresh) setRefreshLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    if (isRefresh) {
      log(`Starting refresh for ${FEED_CONFIGS.length} tickers...`);
    }

    let completed = 0;
    await Promise.allSettled(
      FEED_CONFIGS.map(async (cfg) => {
        try {
          if (isRefresh) log(`${cfg.ticker}: fetching upstream + DB persist...`);
          const url = `${cfg.endpoint}&mode=${mode}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          const parse = cfg.parseResponse || ((j: any) => j?.results?.news?.[0]?.newsitem || []);
          const raw: any[] = parse(json);
          const filtered: NewsItem[] = raw
            .filter((item: any) => cfg.sourceFilter(item.source || "") && cfg.headlineFilter(item.headline || item.title || ""))
            .sort((a: any, b: any) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
            .map((item: any) => ({ ...item, _ticker: cfg.ticker, _config: cfg }));
          results[cfg.ticker] = filtered;
          if (isRefresh) log(`${cfg.ticker}: ✓ ${filtered.length} items`);
        } catch (e: any) {
          errs[cfg.ticker] = e.message;
          if (isRefresh) log(`${cfg.ticker}: ✗ error — ${e.message}`);
        } finally {
          completed++;
          if (isRefresh) log(`Progress: ${completed}/${FEED_CONFIGS.length} done`);
        }
      })
    );

    const totalItems = Object.values(results).reduce((sum, list) => sum + list.length, 0);
    const errorCount = Object.keys(errs).length;
    if (isRefresh) {
      log(`Refresh complete: ${totalItems} total items, ${errorCount} errors`);
      log(`All data read from database — no cache or in-memory state used`);
    }

    setFeedsByTicker(results);
    setErrors(errs);
    setLastUpdated(new Date());
    setLoading(false);
    setRefreshing(false);
  }, []);

  /* Page load: serve from database only */
  useEffect(() => { loadAll("db"); }, [loadAll]);

  /* Refresh button: fetch upstream, compare with DB, mark new items */
  const handleRefresh = () => {
    setRefreshLog([]);
    setRefreshing(true);
    loadAll("refresh");
  };

  /* ── Merged & filtered feed ── */
  const allItems = useMemo(() => {
    let items: NewsItem[] = [];
    for (const [ticker, list] of Object.entries(feedsByTicker)) {
      if (activeTicker !== "ALL" && ticker !== activeTicker) continue;
      items = items.concat(list);
    }
    /* Date filter */
    if (daysFilter > 0) {
      const cutoff = Date.now() - daysFilter * 86400000;
      items = items.filter((i) => new Date(i.datetime).getTime() >= cutoff);
    }
    /* Sort chronologically (newest first) */
    items.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
    return items;
  }, [feedsByTicker, activeTicker, daysFilter]);

  const visibleItems = useMemo(() => {
    let items = allItems;

    /* Category filter */
    if (activeCategory !== "All") {
      items = items.filter((item) => {
        const headline = item.headline || item.title || "";
        const cfg = item._config;
        const fn = cfg.categories[activeCategory];
        return fn ? fn(headline) : false;
      });
    }

    /* Search filter */
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((item) => {
        const headline = (item.headline || item.title || "").toLowerCase();
        const summary = (item.summary || (item as any).qmsummary || item.description || "").toLowerCase();
        return headline.includes(q) || summary.includes(q);
      });
    }

    return items;
  }, [allItems, activeCategory, searchQuery]);

  /* Reset to page 1 when filters change */
  useEffect(() => { setPage(1); }, [activeTicker, activeCategory, searchQuery, daysFilter]);

  /* ── Pagination ── */
  const PAGE_SIZE = 20;
  const totalPages = Math.max(1, Math.ceil(visibleItems.length / PAGE_SIZE));
  const pagedItems = visibleItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* ── Aggregate stats ── */
  const stats = useMemo(() => {
    const total = allItems.length;
    const thisYear = allItems.filter((i) => isThisYear(i.datetime)).length;
    const thisMonth = allItems.filter((i) => isThisMonth(i.datetime)).length;
    const today = allItems.filter((i) => isToday(i.datetime)).length;
    const latest = allItems[0] ? formatDate(allItems[0].datetime) : "\u2014";

    const perStock: Record<string, number> = {};
    for (const cfg of FEED_CONFIGS) {
      perStock[cfg.ticker] = (feedsByTicker[cfg.ticker] || []).length;
    }

    return { total, thisYear, thisMonth, today, latest, perStock };
  }, [allItems, feedsByTicker]);

  /* ── Has errors? ── */
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="pi-app">
      {/* ── Sticky Header ── */}
      <div className="pi-header">
        <div className="pi-title-row">
          <div className="pi-brand">
            <div className="pi-pulse" />
            <div>
              <div className="pi-title">Press Intelligence</div>
              <div className="pi-subtitle">Real-time wire feed</div>
            </div>
          </div>

          <div className="pi-controls">
            <div className="pi-search-wrap">
              <span className="pi-search-icon">/</span>
              <input
                className="pi-search"
                type="text"
                placeholder="Search headlines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="pi-days-group">
              {[{ days: 7, label: "7d" }, { days: 30, label: "30d" }, { days: 90, label: "90d" }, { days: 0, label: "All" }].map((opt) => (
                <button
                  key={opt.days}
                  className="pi-days-btn"
                  data-active={daysFilter === opt.days}
                  onClick={() => setDaysFilter(opt.days)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button className="pi-refresh-btn" onClick={handleRefresh} disabled={refreshing}>
              <span className="pi-refresh-icon" data-spinning={refreshing ? "true" : undefined}>
                &#x27F3;
              </span>
              Refresh
            </button>
          </div>
        </div>

        {/* ── Refresh Log ── */}
        {refreshLog.length > 0 && (
          <div className="pi-refresh-log">
            <div className="pi-refresh-log-header">
              <span className="pi-refresh-log-title">
                {refreshing ? "⟳ Refresh in progress..." : "✓ Refresh complete"}
              </span>
              {!refreshing && (
                <button className="pi-refresh-log-close" onClick={() => setRefreshLog([])}>
                  &times;
                </button>
              )}
            </div>
            <div className="pi-refresh-log-body">
              {refreshLog.map((entry, i) => (
                <div key={i} className={`pi-refresh-log-entry${entry.includes("✗") ? " pi-log-error" : entry.includes("✓") ? " pi-log-success" : ""}`}>
                  {entry}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── KPI Strip ── */}
        {!loading && (
          <div className="pi-kpi-strip">
            <div className="pi-kpi">
              <span className="pi-kpi-value">{stats.total}</span>
              <span className="pi-kpi-label">Total</span>
            </div>
            <div className="pi-kpi">
              <span className="pi-kpi-value">{stats.today}</span>
              <span className="pi-kpi-label">Today</span>
            </div>
            <div className="pi-kpi">
              <span className="pi-kpi-value">{stats.thisMonth}</span>
              <span className="pi-kpi-label">This Month</span>
            </div>
            <div className="pi-kpi">
              <span className="pi-kpi-value">{stats.thisYear}</span>
              <span className="pi-kpi-label">This Year</span>
            </div>
            <div className="pi-kpi">
              <span className="pi-kpi-value pi-kpi-value-sm">{stats.latest}</span>
              <span className="pi-kpi-label">Latest</span>
            </div>

            {/* Per-stock counts — click to open methodology */}
            <div className="pi-stock-summary-wrap">
              <div className="pi-stock-summary">
                {FEED_CONFIGS.map((cfg) => (
                  <div
                    key={cfg.ticker}
                    className="pi-stock-stat pi-stock-stat-clickable"
                    data-grade={cfg.grade}
                    onClick={() => openMethodology(cfg.ticker)}
                    title={`Click for ${cfg.ticker} methodology`}
                  >
                    <span className="pi-stock-dot" data-accent={cfg.accent} />
                    <span className="pi-stock-stat-count">{stats.perStock[cfg.ticker] || 0}</span>
                    <span className="pi-stock-stat-label">{cfg.ticker}</span>
                    <span className="pi-grade-dot" data-grade={cfg.grade} title={`Grade ${cfg.grade}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Filter Panel ── */}
        <div className="pi-filter-panel">
          <div className="pi-filter-group">
            <span className="pi-filter-group-label">Stock</span>
            <button
              className="pi-stock-pill"
              data-active={activeTicker === "ALL"}
              data-accent="all"
              onClick={() => setActiveTicker("ALL")}
            >
              ALL
            </button>
            {FEED_CONFIGS.map((cfg) => (
              <button
                key={cfg.ticker}
                className="pi-stock-pill"
                data-active={activeTicker === cfg.ticker}
                data-accent={cfg.accent}
                data-grade={cfg.grade}
                onClick={() => setActiveTicker(cfg.ticker)}
              >
                {cfg.ticker}
                {cfg.grade !== "A" && (
                  <span className="pi-grade-badge" data-grade={cfg.grade}>{cfg.grade}</span>
                )}
              </button>
            ))}
          </div>

          <div className="pi-divider" />

          <div className="pi-filter-group">
            <span className="pi-filter-group-label">Type</span>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className="pi-cat-tab"
                data-active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
                {activeCategory === cat && cat !== "All" && (
                  <span className="pi-filter-count">{visibleItems.length}</span>
                )}
              </button>
            ))}
          </div>

          {(activeTicker !== "ALL" || activeCategory !== "All" || searchQuery || daysFilter !== 30) && (
            <button
              className="pi-filter-clear"
              onClick={() => { setActiveTicker("ALL"); setActiveCategory("All"); setSearchQuery(""); setDaysFilter(30); }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Feed ── */}
      <div className="pi-feed">
        {/* Result bar */}
        {!loading && (
          <div className="pi-result-bar">
            <span className="pi-result-count">
              <strong>{(page - 1) * PAGE_SIZE + 1}&ndash;{Math.min(page * PAGE_SIZE, visibleItems.length)}</strong> of {visibleItems.length} releases
              {activeTicker !== "ALL" && <> &middot; {activeTicker}</>}
              {activeCategory !== "All" && <> &middot; {activeCategory}</>}
              {searchQuery && <> &middot; &ldquo;{searchQuery}&rdquo;</>}
            </span>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="pi-skeleton" />
        ))}

        {/* Errors */}
        {!loading && hasErrors && (
          <div className="pi-errors-wrap">
            {Object.entries(errors).map(([ticker, msg]) => (
              <div key={ticker} className="pi-empty pi-error-item">
                <span className="pi-error">{ticker}: {msg}</span>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !hasErrors && visibleItems.length === 0 && (
          <div className="pi-empty">
            {searchQuery ? `No results for "${searchQuery}"` : "No releases match current filters"}
          </div>
        )}

        {/* News cards */}
        {!loading && pagedItems.map((item) => {
          const id = `${item._ticker}-${item.newsid || item.id}`;
          const expanded = expandedId === id;
          const headline = item.headline || item.title || "";
          const summary = item.summary || (item as any).qmsummary || item.description || "";
          const date = formatDate(item.datetime);
          const time = formatTime(item.datetime);
          const source = (item.source || "").split(" ").slice(0, 2).join(" ");
          const cfg = item._config;
          const permalink = (item as any).permalink || (item as any).storyurl || "";
          const link = permalink && permalink.startsWith("http")
            ? permalink
            : `https://feeds.issuerdirect.com/news-release.html?newsid=${item.newsid || item.id}&symbol=${cfg.ticker}`;

          return (
            <div
              key={id}
              className="pi-card"
              data-expanded={expanded}
              onClick={() => setExpandedId(expanded ? null : id)}
            >
              <div className="pi-card-inner">
                <div className="pi-card-top">
                  <span
                    className="pi-card-ticker"
                    data-accent={cfg.accent}
                  >
                    {cfg.ticker}
                  </span>
                  <span className="pi-card-headline">{headline}</span>
                  <div className="pi-card-meta">
                    <span className="pi-card-source">{source}</span>
                    <span className="pi-card-date">
                      {isToday(item.datetime) ? time : date}
                    </span>
                    {!item._inDb && (
                      <span className="pi-new-badge">NEW</span>
                    )}
                  </div>
                </div>
              </div>

              {expanded && (
                <div className="pi-card-expand">
                  {summary && <div className="pi-card-summary">{summary}</div>}
                  <div className="pi-card-actions">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pi-card-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      &#x2197; Full Release
                    </a>
                    <a
                      href={`/research/${cfg.ticker}`}
                      className="pi-card-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      &#x2192; {stocks[cfg.ticker]?.name || cfg.ticker} Research
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="pi-pagination">
            <button
              className="pi-page-btn"
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              &larr; Prev
            </button>
            <span className="pi-page-info">
              Page {page} of {totalPages}
            </span>
            <button
              className="pi-page-btn"
              disabled={page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            >
              Next &rarr;
            </button>
          </div>
        )}

        {/* Timestamp */}
        {lastUpdated && !loading && (
          <div className="pi-timestamp">
            Last updated {lastUpdated.toLocaleTimeString()} &middot; {visibleItems.length} of {allItems.length} releases
          </div>
        )}
      </div>

      {/* ── Methodology Modal ── */}
      {methodologyTicker && (
        <div className="pi-modal-overlay" onClick={() => setMethodologyTicker(null)}>
          <div className="pi-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pi-modal-header">
              <h2 className="pi-modal-title">
                {methodologyTicker} &mdash; Data Methodology
              </h2>
              <button className="pi-modal-close" onClick={() => setMethodologyTicker(null)}>
                &times;
              </button>
            </div>

            {methodologyLoading && (
              <div className="pi-modal-body">
                <div className="pi-modal-loading">Loading methodology...</div>
              </div>
            )}

            {!methodologyLoading && methodologyData && (
              <div className="pi-modal-body">
                {/* Grade & type */}
                <div className="pi-method-section">
                  <div className="pi-method-row">
                    <span className="pi-method-label">Grade</span>
                    <span className="pi-method-value">
                      <span className="pi-grade-dot-lg" data-grade={methodologyData.grade} />
                      {methodologyData.grade}
                    </span>
                  </div>
                  <div className="pi-method-row">
                    <span className="pi-method-label">Fetcher Type</span>
                    <span className="pi-method-value">{methodologyData.type}</span>
                  </div>
                </div>

                {/* Sources */}
                <div className="pi-method-section">
                  <h3 className="pi-method-heading">Data Sources</h3>
                  {methodologyData.sources.map((src, i) => (
                    <div key={i} className="pi-method-source">
                      <div className="pi-method-source-header">
                        <span className="pi-method-source-name">{src.name}</span>
                        <span className="pi-method-source-type" data-type={src.type}>
                          {src.type}
                        </span>
                      </div>
                      <div className="pi-method-source-detail">{src.detail}</div>
                      {src.sourceFilter && (
                        <div className="pi-method-source-detail">
                          <strong>Source filter:</strong> {src.sourceFilter}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Headline filter */}
                {methodologyData.headlineFilter && (
                  <div className="pi-method-section">
                    <h3 className="pi-method-heading">Headline Filter</h3>
                    <code className="pi-method-code">{methodologyData.headlineFilter}</code>
                  </div>
                )}

                {/* DB stats */}
                {methodologyData.dbStats && (
                  <div className="pi-method-section">
                    <h3 className="pi-method-heading">Database Statistics</h3>
                    <div className="pi-method-row">
                      <span className="pi-method-label">Total rows</span>
                      <span className="pi-method-value">{methodologyData.dbStats.totalRows.toLocaleString()}</span>
                    </div>
                    <div className="pi-method-row">
                      <span className="pi-method-label">Date range</span>
                      <span className="pi-method-value">
                        {methodologyData.dbStats.oldest ? formatDate(methodologyData.dbStats.oldest) : "n/a"}
                        {" "}&mdash;{" "}
                        {methodologyData.dbStats.newest ? formatDate(methodologyData.dbStats.newest) : "n/a"}
                      </span>
                    </div>
                    <div className="pi-method-row">
                      <span className="pi-method-label">Distinct sources</span>
                      <span className="pi-method-value">{methodologyData.dbStats.distinctSources}</span>
                    </div>
                    {methodologyData.dbStats.topSources && methodologyData.dbStats.topSources.length > 0 && (
                      <>
                        <h4 className="pi-method-subheading">Top Sources in DB</h4>
                        <div className="pi-method-table">
                          {methodologyData.dbStats.topSources.map((s, i) => (
                            <div key={i} className="pi-method-table-row">
                              <span className="pi-method-table-source">{s.source}</span>
                              <span className="pi-method-table-count">{s.count.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Frontend count */}
                <div className="pi-method-section">
                  <h3 className="pi-method-heading">Frontend Display</h3>
                  <div className="pi-method-row">
                    <span className="pi-method-label">Items shown</span>
                    <span className="pi-method-value">
                      {stats.perStock[methodologyTicker] || 0} (after source + headline filters)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {!methodologyLoading && !methodologyData && (
              <div className="pi-modal-body">
                <div className="pi-modal-loading">Failed to load methodology data.</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
