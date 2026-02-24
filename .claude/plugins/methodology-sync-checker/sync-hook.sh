#!/usr/bin/env bash
# methodology-sync-checker plugin v1.0.0
# Reminds you to review methodology sections when Sources or EDGAR pipeline code changes.

set -euo pipefail

PLUGIN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$PLUGIN_DIR/plugin.json"
PROJECT_ROOT="$(cd "$PLUGIN_DIR/../../.." && pwd)"

# Colors
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
BOLD='\033[1m'
NC='\033[0m'

PHASE="${1:-}"
TOOL_NAME="${2:-}"
FILE_PATH="${3:-}"

# Only run on post phase
if [[ "$PHASE" != "post" ]]; then
  exit 0
fi

if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

# Resolve relative path from project root
if [[ "$FILE_PATH" != /* ]]; then
  ABS_PATH="$PROJECT_ROOT/$FILE_PATH"
else
  ABS_PATH="$FILE_PATH"
fi
REL_PATH="${ABS_PATH#"$PROJECT_ROOT"/}"

# Extract watch config from plugin.json
# Output: domain_key|label|methodology|methodologyFile|methodologyAnchor|type|pattern
# type = "path" or "glob"
WATCHES=$(python3 -c "
import json
with open('$CONFIG_FILE') as f:
    data = json.load(f)
config = data.get('config', {})
domains = config.get('domains', {})

for key, dom in domains.items():
    label = dom.get('label', key)
    meth = dom.get('methodology', '')
    mfile = dom.get('methodologyFile', '')
    anchor = dom.get('methodologyAnchor', '')
    for p in dom.get('watchPaths', []):
        print(f'{key}|{label}|{meth}|{mfile}|{anchor}|path|{p}')
    for g in dom.get('watchDataGlobs', []):
        print(f'{key}|{label}|{meth}|{mfile}|{anchor}|glob|{g}')

# Schema files affect both domains
for sf in config.get('schemaFiles', []):
    for key, dom in domains.items():
        label = dom.get('label', key)
        meth = dom.get('methodology', '')
        mfile = dom.get('methodologyFile', '')
        anchor = dom.get('methodologyAnchor', '')
        print(f'{key}|{label}|{meth}|{mfile}|{anchor}|path|{sf}')
" 2>/dev/null || true)

if [[ -z "$WATCHES" ]]; then
  exit 0
fi

# Convert a simple glob with * wildcards to a regex
glob_to_regex() {
  local pattern="$1"
  local regex
  regex=$(echo "$pattern" | sed 's/\./\\./g; s/\*\*/<<GLOBSTAR>>/g; s/\*/[^\/]*/g; s/<<GLOBSTAR>>/.*/g')
  echo "^${regex}$"
}

MATCHED_DOMAINS=()

while IFS='|' read -r domain_key label methodology mfile anchor match_type pattern; do
  [[ -z "$domain_key" ]] && continue

  HIT=false
  case "$match_type" in
    path)
      REGEX=$(glob_to_regex "$pattern")
      if echo "$REL_PATH" | grep -qE "$REGEX" 2>/dev/null; then
        HIT=true
      fi
      ;;
    glob)
      REGEX=$(glob_to_regex "$pattern")
      if echo "$REL_PATH" | grep -qE "$REGEX" 2>/dev/null; then
        HIT=true
      fi
      ;;
  esac

  if [[ "$HIT" == true ]]; then
    # Skip if editing the methodology section itself — no need to warn about self-edits
    # (only suppress if the file IS the methodology file; edits to API routes etc. always warn)
    if [[ "$REL_PATH" == "$mfile" ]]; then
      # Check if the methodology section was the part being edited
      # We can't know exactly, so we still warn — the user can decide
      :
    fi
    # Deduplicate by domain key
    ALREADY=false
    for d in "${MATCHED_DOMAINS[@]+"${MATCHED_DOMAINS[@]}"}"; do
      if [[ "$d" == "$domain_key|$label|$methodology|$anchor" ]]; then
        ALREADY=true
        break
      fi
    done
    if [[ "$ALREADY" == false ]]; then
      MATCHED_DOMAINS+=("$domain_key|$label|$methodology|$anchor")
    fi
  fi
done <<< "$WATCHES"

if [[ ${#MATCHED_DOMAINS[@]} -eq 0 ]]; then
  exit 0
fi

echo "" >&2
echo -e "${BOLD}${MAGENTA}  METHODOLOGY SYNC CHECK${NC}" >&2
echo -e "${MAGENTA}  Changed: ${REL_PATH}${NC}" >&2
echo "" >&2

for entry in "${MATCHED_DOMAINS[@]}"; do
  IFS='|' read -r domain_key label methodology anchor <<< "$entry"
  echo -e "${YELLOW}[methodology-sync] ${BOLD}${label}${NC}${YELLOW} pipeline was modified${NC}" >&2
  echo -e "${CYAN}  → Review methodology: ${methodology}${NC}" >&2
  echo -e "${CYAN}  → Anchor: ${anchor}${NC}" >&2
  echo "" >&2
done

echo -e "${YELLOW}[methodology-sync]${NC} If the data flow, matching logic, or API contracts changed, update the methodology section to stay in sync." >&2
