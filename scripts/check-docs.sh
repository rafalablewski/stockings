#!/usr/bin/env bash
# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║  DOCUMENTATION FRESHNESS CHECK                                             ║
# ║  Runs as a pre-commit hook. Warns when CSS/component changes are staged    ║
# ║  but the documentation (docs page or CSS comments) is not updated.         ║
# ╚══════════════════════════════════════════════════════════════════════════════╝
#
# INSTALLATION (automatic — see bottom of this file):
#   npm run install-hooks   OR   cp scripts/check-docs.sh .git/hooks/pre-commit
#
# BEHAVIOR:
#   - Checks staged files for changes to CSS classes, components, or design tokens
#   - If docs/page.tsx and stock-model-styles.ts are NOT in the staged changes,
#     prints a clear warning message
#   - Does NOT block the commit — just warns (exit 0 always)
#   - Override: set SKIP_DOCS_CHECK=1 to suppress the warning

set -euo pipefail

# Allow skipping via environment variable
if [ "${SKIP_DOCS_CHECK:-0}" = "1" ]; then
  exit 0
fi

# ── Watched file patterns ─────────────────────────────────────────────────
# These are the files whose changes should trigger a docs-update reminder.
WATCHED_PATTERNS=(
  "src/components/stocks/stock-model-styles.ts"
  "src/components/shared/StockModelUI.tsx"
  "src/components/shared/StockNavigation.tsx"
  "src/components/shared/SharedWallStreetTab.tsx"
  "src/components/shared/SharedInvestmentTab.tsx"
  "src/components/shared/SharedEdgarTab.tsx"
  "src/components/shared/SharedSourcesTab.tsx"
  "src/components/shared/SharedAIAgentsTab.tsx"
  "src/components/shared/StockChart.tsx"
  "src/components/stocks/ASTS.tsx"
  "src/components/stocks/BMNR.tsx"
  "src/components/stocks/CRCL.tsx"
  "src/app/layout.tsx"
  "src/app/globals.css"
)

# ── Documentation files ───────────────────────────────────────────────────
# If ANY watched file is staged, at least ONE of these should also be staged.
DOC_FILES=(
  "src/app/docs/page.tsx"
  "src/components/stocks/stock-model-styles.ts"
)

# ── Get staged files ──────────────────────────────────────────────────────
STAGED=$(git diff --cached --name-only --diff-filter=ACMR 2>/dev/null || true)

if [ -z "$STAGED" ]; then
  exit 0
fi

# ── Check if any watched file is staged ────────────────────────────────────
WATCHED_CHANGED=()
for pattern in "${WATCHED_PATTERNS[@]}"; do
  if echo "$STAGED" | grep -qF "$pattern"; then
    WATCHED_CHANGED+=("$pattern")
  fi
done

# No watched files changed — nothing to warn about
if [ ${#WATCHED_CHANGED[@]} -eq 0 ]; then
  exit 0
fi

# ── Check if documentation is also being updated ──────────────────────────
DOCS_UPDATED=false
for doc in "${DOC_FILES[@]}"; do
  if echo "$STAGED" | grep -qF "$doc"; then
    DOCS_UPDATED=true
    break
  fi
done

if [ "$DOCS_UPDATED" = true ]; then
  exit 0
fi

# ── Print warning ─────────────────────────────────────────────────────────
echo ""
echo "┌──────────────────────────────────────────────────────────────────┐"
echo "│  📖  DOCUMENTATION MAY NEED UPDATING                           │"
echo "├──────────────────────────────────────────────────────────────────┤"
echo "│                                                                  │"
echo "│  The following CSS/component files were modified:                │"
echo "│                                                                  │"

for file in "${WATCHED_CHANGED[@]}"; do
  printf "│    %-58s│\n" "• $file"
done

echo "│                                                                  │"
echo "│  But the documentation was not updated:                          │"
echo "│    • src/app/docs/page.tsx          (Docs page)                  │"
echo "│    • stock-model-styles.ts          (CSS comments)               │"
echo "│                                                                  │"
echo "│  If you added/removed/renamed CSS classes, please update         │"
echo "│  the documentation to keep it in sync.                           │"
echo "│                                                                  │"
echo "│  To skip this check: SKIP_DOCS_CHECK=1 git commit ...           │"
echo "└──────────────────────────────────────────────────────────────────┘"
echo ""

# Warning only — do not block the commit
exit 0
