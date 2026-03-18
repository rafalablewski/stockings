#!/usr/bin/env bash
#
# check-barrel-exports.sh — Zero-dependency barrel export completeness checker.
#
# Scans every ticker data directory under src/data/ for:
#   1. Data files (.ts) not imported by the barrel index.ts
#   2. Named exports (const/function/class/enum) not re-exported from the barrel
#
# Exit code 1 if any orphans found. Can run in CI without node_modules.
#
# Usage: bash scripts/check-barrel-exports.sh

set -euo pipefail

DATA_DIR="src/data"
EXIT_CODE=0
TOTAL_ORPHANS=0

# Auto-discover ticker directories (any dir with an index.ts inside src/data/)
# Skip non-ticker dirs (shared/, schemas/) that have different export conventions.
for TICKER_DIR in "$DATA_DIR"/*/; do
  [ -f "${TICKER_DIR}index.ts" ] || continue
  DIRNAME=$(basename "$TICKER_DIR")
  [[ "$DIRNAME" == "shared" || "$DIRNAME" == "schemas" ]] && continue

  TICKER=$(basename "$TICKER_DIR" | tr '[:lower:]' '[:upper:]')
  BARREL="${TICKER_DIR}index.ts"
  BARREL_CONTENT=$(cat "$BARREL")
  ORPHAN_COUNT=0

  for FILE in "${TICKER_DIR}"*.ts; do
    FILENAME=$(basename "$FILE")
    [ "$FILENAME" = "index.ts" ] && continue

    STEM="${FILENAME%.ts}"

    # Check 1: Is the file imported in the barrel?
    if ! echo "$BARREL_CONTENT" | grep -qE "'./${STEM}'|\"\./${STEM}\""; then
      echo "  ✗ ORPHAN FILE: $TICKER/$FILENAME — not imported in barrel index.ts"
      ORPHAN_COUNT=$((ORPHAN_COUNT + 1))
      continue
    fi

    # Check 2: Are all named exports re-exported?
    EXPORTS=$(grep -oP '^export\s+(?:const|function|class|enum|let|var)\s+\K\w+' "$FILE" 2>/dev/null || true)
    for NAME in $EXPORTS; do
      if ! echo "$BARREL_CONTENT" | grep -qF "$NAME"; then
        echo "  ✗ ORPHAN EXPORT: $NAME (in $TICKER/$FILENAME) — not re-exported from barrel"
        ORPHAN_COUNT=$((ORPHAN_COUNT + 1))
      fi
    done

    # Check 3: Type/interface exports (warning only)
    TYPE_EXPORTS=$(grep -oP '^export\s+(?:interface|type)\s+\K\w+' "$FILE" 2>/dev/null || true)
    for NAME in $TYPE_EXPORTS; do
      if ! echo "$BARREL_CONTENT" | grep -qF "$NAME"; then
        echo "  ⚠ ORPHAN TYPE: $NAME (in $TICKER/$FILENAME) — not re-exported from barrel"
        ORPHAN_COUNT=$((ORPHAN_COUNT + 1))
      fi
    done
  done

  if [ "$ORPHAN_COUNT" -eq 0 ]; then
    FILE_COUNT=$(find "${TICKER_DIR}" -maxdepth 1 -name '*.ts' ! -name 'index.ts' | wc -l)
    echo "  ✓ $TICKER: All $FILE_COUNT data files and exports wired to barrel"
  else
    EXIT_CODE=1
  fi

  TOTAL_ORPHANS=$((TOTAL_ORPHANS + ORPHAN_COUNT))
done

echo ""
if [ "$TOTAL_ORPHANS" -gt 0 ]; then
  echo "FAILED: $TOTAL_ORPHANS orphan(s) found. Fix barrel exports before committing."
else
  echo "PASSED: All barrel exports complete."
fi

exit $EXIT_CODE
