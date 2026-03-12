# Firecrawl Plugin

Turn any website into clean, LLM-ready markdown or structured data — directly from Claude Code.

The Firecrawl plugin adds the [Firecrawl CLI](https://github.com/firecrawl/cli) as a skill to Claude Code, giving it the ability to scrape, search, crawl, and map the web. All operations include automatic JavaScript rendering, anti-bot handling, and proxy rotation.

## Installation

### 1. Install the Plugin

In Claude Code, run:

```bash
claude plugin install firecrawl@claude-plugins-official
```

### 2. Install the Firecrawl CLI

```bash
npm install -g firecrawl-cli
```

### 3. Authenticate

Authenticate via browser (recommended):

```bash
firecrawl login --browser
```

Or authenticate with an API key directly:

```bash
firecrawl login --api-key "fc-YOUR-API-KEY"
```

You can also set the key as an environment variable (add to `~/.zshrc` or `~/.bashrc` for persistence):

```bash
export FIRECRAWL_API_KEY=fc-YOUR-API-KEY
```

Get your free API key at: [firecrawl.dev/app/api-keys](https://firecrawl.dev/app/api-keys)

### 4. Verify Setup

```bash
firecrawl --status
```

You should see your authentication status, concurrency limit, and remaining credits.

---

## Features

| Feature | Description |
|---------|-------------|
| **Search** | Web search with optional scraping of results (web, news, images) |
| **Scrape** | Extract clean markdown from any webpage with JS rendering |
| **Map** | Discover all URLs on a website |
| **Crawl** | Extract content from entire websites |
| **Agent** | AI-powered web data extraction with structured output |
| **Browser** | Cloud browser sessions for interactive page operations |

---

## Workflow

Follow this escalation pattern when fetching web data:

1. **Search** — Start here when you don't have a specific URL. Find pages, answer questions, discover sources.
2. **Scrape** — You have a URL. Extract its content directly.
3. **Map + Scrape** — The site is large or you need a specific subpage. Use `map --search` to find the right URL, then scrape it.
4. **Crawl** — You need bulk content from an entire site section (e.g., all docs pages).
5. **Browser** — Content is behind interaction (pagination, modals, form submissions). Open a browser session to click through and extract it.

---

## Commands

### Search — Web search with optional scraping

```bash
# Basic search
firecrawl search "your query" -o .firecrawl/search-query.txt

# JSON output (recommended for parsing)
firecrawl search "your query" -o .firecrawl/search-query.json --json

# Limit results
firecrawl search "AI news" --limit 10 -o .firecrawl/search-ai-news.json --json

# Search specific sources
firecrawl search "tech startups" --sources news -o .firecrawl/search-news.json --json
firecrawl search "landscapes" --sources images -o .firecrawl/search-images.json --json

# Time-based search
firecrawl search "AI announcements" --tbs qdr:d -o .firecrawl/search-today.json --json  # Past day
firecrawl search "tech news" --tbs qdr:w -o .firecrawl/search-week.json --json          # Past week

# Location-based search
firecrawl search "restaurants" --location "San Francisco,California,United States" -o .firecrawl/search-sf.json --json

# Search AND scrape content from results
firecrawl search "firecrawl tutorials" --scrape -o .firecrawl/search-scraped.json --json
```

**Options:** `--limit`, `--sources`, `--categories`, `--tbs`, `--location`, `--country`, `--scrape`, `--scrape-formats`, `-o`

### Scrape — Single page content extraction

```bash
# Basic scrape (markdown output)
firecrawl scrape https://example.com -o .firecrawl/example.md

# Get raw HTML
firecrawl scrape https://example.com --html -o .firecrawl/example.html

# Multiple formats (JSON output)
firecrawl scrape https://example.com --format markdown,links -o .firecrawl/example.json

# Main content only (removes nav, footer, ads)
firecrawl scrape https://example.com --only-main-content -o .firecrawl/example.md

# Wait for JS to render
firecrawl scrape https://spa-app.com --wait-for 3000 -o .firecrawl/spa.md

# Include/exclude specific HTML tags
firecrawl scrape https://example.com --include-tags article,main -o .firecrawl/article.md
firecrawl scrape https://example.com --exclude-tags nav,aside,.ad -o .firecrawl/clean.md
```

**Options:** `--format`, `--html`, `--only-main-content`, `--wait-for`, `--include-tags`, `--exclude-tags`, `-o`

### Map — Discover all URLs on a site

```bash
# List all URLs
firecrawl map https://example.com -o .firecrawl/urls.txt

# Search for specific URLs
firecrawl map https://example.com --search "blog" -o .firecrawl/blog-urls.txt

# Include subdomains
firecrawl map https://example.com --include-subdomains -o .firecrawl/all-urls.txt
```

**Options:** `--limit`, `--search`, `--sitemap`, `--include-subdomains`, `--json`, `-o`

### Crawl — Crawl an entire website

```bash
# Start a crawl and wait for completion
firecrawl crawl https://example.com --wait -o .firecrawl/crawl-result.json --pretty

# With progress indicator
firecrawl crawl https://example.com --wait --progress -o .firecrawl/crawl-result.json

# Limit pages and depth
firecrawl crawl https://example.com --limit 100 --max-depth 3 --wait -o .firecrawl/crawl-result.json

# Crawl specific sections only
firecrawl crawl https://example.com --include-paths /blog,/docs --wait -o .firecrawl/crawl-blog.json

# Rate-limited crawl
firecrawl crawl https://example.com --delay 1000 --max-concurrency 2 --wait -o .firecrawl/crawl-result.json
```

**Options:** `--wait`, `--progress`, `--limit`, `--max-depth`, `--include-paths`, `--exclude-paths`, `--allow-subdomains`, `--delay`, `--max-concurrency`, `-o`

### Agent — AI-powered web data extraction

Run an AI agent that autonomously browses and extracts structured data. Tasks typically take 2–5 minutes.

```bash
# Basic usage
firecrawl agent "Find the pricing plans for Firecrawl" --wait -o .firecrawl/agent-pricing.json

# Focus on specific URLs
firecrawl agent "Get the main features listed" --urls https://example.com/features --wait -o .firecrawl/agent-features.json

# Structured output with JSON schema
firecrawl agent "Extract company info" --schema '{"type":"object","properties":{"name":{"type":"string"},"employees":{"type":"number"}}}' --wait -o .firecrawl/agent-company.json

# Load schema from file
firecrawl agent "Extract product data" --schema-file ./product-schema.json --wait -o .firecrawl/agent-products.json
```

**Options:** `--urls`, `--model`, `--schema`, `--schema-file`, `--max-credits`, `--wait`, `--poll-interval`, `--timeout`, `-o`

### Browser — Cloud browser sessions

Launch remote Chromium sessions for interactive page operations.

```bash
# Shorthand (auto-launches session)
firecrawl browser "open https://example.com"
firecrawl browser "snapshot"
firecrawl browser "click @e5"
firecrawl browser "fill @e3 'search query'"
firecrawl browser "scrape" -o .firecrawl/browser-scrape.md

# Session management
firecrawl browser launch-session --ttl 600 --stream -o .firecrawl/browser-session.json --json
firecrawl browser list --json -o .firecrawl/browser-sessions.json
firecrawl browser close

# Playwright Python
firecrawl browser execute --python 'await page.goto("https://example.com")
print(await page.title())' -o .firecrawl/browser-result.txt

# Playwright JavaScript
firecrawl browser execute --node 'await page.goto("https://example.com"); await page.title()' -o .firecrawl/browser-result.txt
```

**Core browser commands:** `open`, `snapshot`, `screenshot`, `click`, `type`, `fill`, `scrape`, `scroll`, `wait`, `eval`

### Credit Usage

```bash
firecrawl credit-usage
firecrawl credit-usage --json --pretty -o .firecrawl/credits.json
```

---

## Output Files

Results are saved to a `.firecrawl/` directory in your project to keep context windows clean. Add `.firecrawl/` to your `.gitignore`.

```
.firecrawl/search-react_server_components.json
.firecrawl/docs.github.com-actions-overview.md
.firecrawl/firecrawl.dev.md
.firecrawl/scratchpad/bulk-scrape.sh
```

---

## Parallelization

Always run independent operations in parallel. Check `firecrawl --status` for your concurrency limit, then run up to that many jobs:

```bash
firecrawl scrape https://site1.com -o .firecrawl/1.md &
firecrawl scrape https://site2.com -o .firecrawl/2.md &
firecrawl scrape https://site3.com -o .firecrawl/3.md &
wait
```

For many URLs, use xargs:

```bash
cat urls.txt | xargs -P 10 -I {} sh -c 'firecrawl scrape "{}" -o ".firecrawl/$(echo {} | md5).md"'
```

---

## Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `FIRECRAWL_API_KEY` | Yes (if not using `firecrawl login`) | Your Firecrawl API key |
| `FIRECRAWL_API_URL` | No | Custom API endpoint (for self-hosted instances) |

### Self-Hosted Deployment

Firecrawl can be self-hosted. Set `FIRECRAWL_API_URL` to point to your instance:

```bash
export FIRECRAWL_API_URL=https://your-firecrawl-instance.com
```

See the [Firecrawl documentation](https://docs.firecrawl.dev) for self-hosting instructions.

---

## Resources

- [Firecrawl Documentation](https://docs.firecrawl.dev)
- [Firecrawl CLI Repository](https://github.com/firecrawl/cli)
- [API Reference](https://docs.firecrawl.dev/api-reference)
- [Get API Key](https://firecrawl.dev)
- [Firecrawl Discord](https://discord.gg/gSmWdAkdwd)
- [GitHub Issues](https://github.com/mendableai/firecrawl/issues)

---

## License

This plugin is licensed under AGPL-3.0, consistent with Firecrawl's open-source license.
