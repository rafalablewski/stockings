#!/usr/bin/env bash
# doc-change-detector plugin v1.0.0
# Automatically detects UI/UX/CSS/component changes and suggests documentation updates.
#
# PHASE 1 (pre): Snapshots the file before edit (baseline capture)
# PHASE 2 (post): Diffs baseline vs current, detects meaningful changes,
#                  logs structured deltas, and warns if docs need updating.
#
# The delta log (.jsonl) can be consumed by humans, CI, or LLM agents
# to generate changelogs and doc updates.

set -euo pipefail

PLUGIN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$PLUGIN_DIR/plugin.json"
PROJECT_ROOT="$(cd "$PLUGIN_DIR/../../.." && pwd)"
SNAPSHOT_DIR="$PLUGIN_DIR/.snapshots"
DELTA_LOG="$PLUGIN_DIR/change-log.jsonl"

# Colors
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

PHASE="${1:-}"
TOOL_NAME="${2:-}"
FILE_PATH="${3:-}"

log_doc()  { echo -e "${MAGENTA}[doc-detect]${NC} $1" >&2; }
log_info() { echo -e "${CYAN}[doc-detect]${NC} $1" >&2; }
log_warn() { echo -e "${YELLOW}[doc-detect]${NC} $1" >&2; }
log_ok()   { echo -e "${GREEN}[doc-detect]${NC} $1" >&2; }

# Skip if no file path
if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

# Resolve paths
if [[ "$FILE_PATH" != /* ]]; then
  ABS_PATH="$PROJECT_ROOT/$FILE_PATH"
else
  ABS_PATH="$FILE_PATH"
fi
REL_PATH="${ABS_PATH#"$PROJECT_ROOT"/}"
BASENAME=$(basename "$FILE_PATH")

# Create snapshot directory
mkdir -p "$SNAPSHOT_DIR"

# Generate a safe snapshot filename from the relative path
snapshot_key() {
  echo "$REL_PATH" | sed 's/[\/.]/_/g'
}

SNAP_KEY=$(snapshot_key)
SNAP_FILE="$SNAPSHOT_DIR/${SNAP_KEY}.snap"

# ═══════════════════════════════════════════════════════════════════
# PHASE 1: PRE — Capture baseline snapshot before edit
# ═══════════════════════════════════════════════════════════════════
if [[ "$PHASE" == "pre" ]]; then
  if [[ -f "$ABS_PATH" ]]; then
    cp "$ABS_PATH" "$SNAP_FILE"
  else
    # New file — empty baseline
    : > "$SNAP_FILE"
  fi
  exit 0
fi

# Only continue for post phase
if [[ "$PHASE" != "post" ]]; then
  exit 0
fi

# ═══════════════════════════════════════════════════════════════════
# PHASE 2: POST — Diff, detect, log, and warn
# ═══════════════════════════════════════════════════════════════════

# If file doesn't exist (deleted), note it
if [[ ! -f "$ABS_PATH" ]]; then
  log_warn "File deleted: ${REL_PATH}"
  # Log deletion
  echo "{\"ts\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",\"file\":\"$REL_PATH\",\"action\":\"deleted\",\"tool\":\"$TOOL_NAME\"}" >> "$DELTA_LOG"
  rm -f "$SNAP_FILE"
  exit 0
fi

# If no snapshot exists (first edit in this session), skip diffing
if [[ ! -f "$SNAP_FILE" ]]; then
  exit 0
fi

# ── Compute diff ──────────────────────────────────────────────────
DIFF_OUTPUT=$(diff -u "$SNAP_FILE" "$ABS_PATH" 2>/dev/null || true)

# No changes detected
if [[ -z "$DIFF_OUTPUT" ]]; then
  rm -f "$SNAP_FILE"
  exit 0
fi

# ── Extract added/removed lines ──────────────────────────────────
ADDED=$(echo "$DIFF_OUTPUT" | grep '^+[^+]' | sed 's/^+//' || true)
REMOVED=$(echo "$DIFF_OUTPUT" | grep '^-[^-]' | sed 's/^-//' || true)
ADDED_COUNT=$(echo "$ADDED" | grep -c '.' || echo 0)
REMOVED_COUNT=$(echo "$REMOVED" | grep -c '.' || echo 0)

# ── Match against watch patterns ─────────────────────────────────
# Uses python3 to parse plugin.json and check if this file + changes
# match any documented watch pattern
MATCHES=$(python3 -c "
import json, re, sys, fnmatch

config_path = '$CONFIG_FILE'
basename = '$BASENAME'
rel_path = '$REL_PATH'

with open(config_path) as f:
    data = json.load(f)

watch = data.get('config', {}).get('watchPatterns', {})
diff_text = sys.stdin.read()

results = []
for key, wp in watch.items():
    # Check if file matches any file pattern
    file_match = False
    for fp in wp.get('filePatterns', []):
        if fnmatch.fnmatch(basename, fp) or fnmatch.fnmatch(rel_path, fp):
            file_match = True
            break
    if not file_match:
        continue

    # Check if diff contains any detect patterns
    detected = []
    for pat in wp.get('detectPatterns', []):
        try:
            matches = re.findall(pat, diff_text, re.MULTILINE)
            if matches:
                detected.extend(matches[:3])  # Cap at 3 examples
        except re.error:
            pass

    if detected:
        label = wp.get('label', key)
        severity = wp.get('severity', 'medium')
        action = wp.get('docAction', 'Review documentation')
        examples = '|'.join(str(d).strip()[:60] for d in detected[:3])
        results.append(f'{severity}|{label}|{action}|{examples}')

for r in results:
    print(r)
" <<< "$DIFF_OUTPUT" 2>/dev/null || true)

# ── Check if doc targets are stale ────────────────────────────────
DOC_DESIGN_SYSTEM="$PROJECT_ROOT/src/app/docs/page.tsx"
DOC_CSS_REF="$PROJECT_ROOT/src/components/stocks/stock-model-styles.ts"

# ── Log structured delta ─────────────────────────────────────────
MATCH_LABELS=""
if [[ -n "$MATCHES" ]]; then
  MATCH_LABELS=$(echo "$MATCHES" | cut -d'|' -f2 | paste -sd',' -)
fi

# Escape strings for JSON
json_escape() {
  echo "$1" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read().strip()))" 2>/dev/null || echo "\"$1\""
}

DELTA_ENTRY="{\"ts\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",\"file\":\"$REL_PATH\",\"tool\":\"$TOOL_NAME\",\"added\":$ADDED_COUNT,\"removed\":$REMOVED_COUNT,\"categories\":$(json_escape "$MATCH_LABELS")}"
echo "$DELTA_ENTRY" >> "$DELTA_LOG"

# ── Report findings ──────────────────────────────────────────────
if [[ -z "$MATCHES" ]]; then
  # File changed but no doc-relevant patterns detected
  rm -f "$SNAP_FILE"
  exit 0
fi

MATCH_COUNT=$(echo "$MATCHES" | grep -c '.' || echo 0)

echo "" >&2
echo -e "${BOLD}${MAGENTA}  DOC CHANGE DETECTED${NC}  ${DIM}${REL_PATH}${NC}" >&2
echo -e "${DIM}  +${ADDED_COUNT} / -${REMOVED_COUNT} lines${NC}" >&2
echo "" >&2

HAS_HIGH=false
while IFS='|' read -r severity label action examples; do
  [[ -z "$severity" ]] && continue
  case "$severity" in
    high)
      HAS_HIGH=true
      echo -e "  ${YELLOW}▸ HIGH${NC}  ${BOLD}${label}${NC}" >&2
      ;;
    medium)
      echo -e "  ${CYAN}▸ MED${NC}   ${label}" >&2
      ;;
    low)
      echo -e "  ${DIM}▸ LOW${NC}   ${label}" >&2
      ;;
  esac
  echo -e "          ${DIM}→ ${action}${NC}" >&2
  if [[ -n "$examples" ]]; then
    echo -e "          ${DIM}  e.g. ${examples}${NC}" >&2
  fi
done <<< "$MATCHES"

echo "" >&2

# Check if doc files have been recently modified (within last 5 min = likely same session)
DOC_STALE=true
for docfile in "$DOC_DESIGN_SYSTEM" "$DOC_CSS_REF"; do
  if [[ -f "$docfile" ]]; then
    DOC_MOD=$(stat -c %Y "$docfile" 2>/dev/null || stat -f %m "$docfile" 2>/dev/null || echo 0)
    NOW=$(date +%s)
    AGE=$(( NOW - DOC_MOD ))
    if [[ $AGE -lt 300 ]]; then
      DOC_STALE=false
      break
    fi
  fi
done

if [[ "$DOC_STALE" == true && "$HAS_HIGH" == true ]]; then
  log_warn "${BOLD}Documentation may be stale.${NC} Consider updating:"
  echo -e "  ${DIM}• src/app/docs/page.tsx${NC}" >&2
  echo -e "  ${DIM}• stock-model-styles.ts (CSS comments)${NC}" >&2
  echo "" >&2
fi

# Update snapshot to new state for next diff
cp "$ABS_PATH" "$SNAP_FILE"

exit 0
