#!/usr/bin/env bash
# agent-impact-detector plugin v1.0.0
# Warns when file modifications impact AI agent behavior

set -euo pipefail

PLUGIN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$PLUGIN_DIR/plugin.json"
PROJECT_ROOT="$(cd "$PLUGIN_DIR/../../.." && pwd)"

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
MAGENTA='\033[0;35m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# Read JSON input from stdin (Claude Code hooks protocol)
INPUT_JSON=$(cat)
TOOL_NAME=$(echo "$INPUT_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_name',''))" 2>/dev/null || true)
FILE_PATH=$(echo "$INPUT_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('file_path',''))" 2>/dev/null || true)

log_high() { echo -e "${RED}[agent-impact] HIGH:${NC} $1" >&2; }
log_med()  { echo -e "${YELLOW}[agent-impact] MEDIUM:${NC} $1" >&2; }
log_info() { echo -e "${CYAN}[agent-impact] INFO:${NC} $1" >&2; }
log_ok()   { echo -e "${GREEN}[agent-impact] OK:${NC} $1" >&2; }

# Only registered as PostToolUse, but guard just in case
PHASE=$(echo "$INPUT_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin).get('hook_event_name',''))" 2>/dev/null || true)
if [[ "$PHASE" != "PostToolUse" ]]; then
  exit 0
fi

# Skip if no file path
if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

# Resolve to absolute path for matching, and compute relative path from project root
if [[ "$FILE_PATH" != /* ]]; then
  ABS_PATH="$PROJECT_ROOT/$FILE_PATH"
else
  ABS_PATH="$FILE_PATH"
fi

# Compute path relative to project root for pattern matching
REL_PATH="${ABS_PATH#"$PROJECT_ROOT"/}"
BASENAME=$(basename "$FILE_PATH")

# Load impact zones from plugin.json using python3
# Output format: zone_key|label|severity|description|type|value
# type is "path", "pattern", or "content"
PARSE_ERR=""
ZONES=$(python3 -c "
import json, os
config_path = '$CONFIG_FILE'
with open(config_path) as f:
    data = json.load(f)
zones = data.get('config', {}).get('impactZones', {})
for key, zone in zones.items():
    label = zone.get('label', key)
    severity = zone.get('severity', 'medium')
    desc = zone.get('description', '')
    # Exact paths
    for p in zone.get('paths', []):
        print(f'{key}|{label}|{severity}|{desc}|path|{p}')
    # Glob-like patterns
    for p in zone.get('patterns', []):
        print(f'{key}|{label}|{severity}|{desc}|pattern|{p}')
    # Content patterns (grep-based)
    file_types = ','.join(zone.get('fileTypes', []))
    for p in zone.get('contentPatterns', []):
        print(f'{key}|{label}|{severity}|{desc}|content|{p}|{file_types}')
" 2>&1) || PARSE_ERR="$ZONES"

if [[ -n "$PARSE_ERR" ]]; then
  echo -e "${YELLOW}[agent-impact] Warning: failed to parse plugin.json:${NC}" >&2
  echo -e "${YELLOW}  ${PARSE_ERR}${NC}" >&2
  exit 0
fi

if [[ -z "$ZONES" ]]; then
  exit 0
fi

IMPACTS=()

# Match a glob-like pattern against the relative path
# Supports: exact match, leading *, and directory globs like ".claude/plugins/*/*.sh"
glob_match() {
  local pattern="$1" path="$2"

  # Convert glob pattern to a regex
  # Escape dots, replace * with [^/]* for single segment, ** with .*
  local regex
  regex=$(echo "$pattern" | sed 's/\./\\./g; s/\*\*/<<GLOBSTAR>>/g; s/\*/[^\/]*/g; s/<<GLOBSTAR>>/.*/g')
  regex="^${regex}$"

  [[ "$path" =~ $regex ]]
}

while IFS='|' read -r zone_key label severity desc match_type value extra; do
  [[ -z "$zone_key" ]] && continue

  case "$match_type" in
    path)
      # Exact path match
      if [[ "$REL_PATH" == "$value" ]]; then
        IMPACTS+=("${severity}|${label}|${desc}")
      fi
      ;;
    pattern)
      # Glob pattern match
      if glob_match "$value" "$REL_PATH"; then
        IMPACTS+=("${severity}|${label}|${desc}")
      fi
      # Also check if basename matches (e.g. "CLAUDE.md" anywhere)
      if [[ "$value" == "$BASENAME" ]]; then
        IMPACTS+=("${severity}|${label}|${desc}")
      fi
      ;;
    content)
      # Content pattern — only check matching file types
      if [[ -f "$ABS_PATH" && -n "$extra" ]]; then
        EXT="${ABS_PATH##*.}"
        TYPE_MATCH=false
        IFS=',' read -ra types <<< "$extra"
        for ft in "${types[@]}"; do
          if [[ "$EXT" == "$ft" ]]; then
            TYPE_MATCH=true
            break
          fi
        done
        if [[ "$TYPE_MATCH" == true ]]; then
          if grep -qPi "$value" "$ABS_PATH" 2>/dev/null; then
            IMPACTS+=("${severity}|${label}|${desc}")
          fi
        fi
      fi
      ;;
  esac
done <<< "$ZONES"

# Deduplicate impacts using associative array (O(n) vs O(n^2))
declare -A SEEN=()
UNIQUE_IMPACTS=()
for impact in "${IMPACTS[@]+"${IMPACTS[@]}"}"; do
  if [[ -z "${SEEN[$impact]+x}" ]]; then
    SEEN["$impact"]=1
    UNIQUE_IMPACTS+=("$impact")
  fi
done

# Report
if [[ ${#UNIQUE_IMPACTS[@]} -eq 0 ]]; then
  exit 0
fi

echo "" >&2
echo -e "${BOLD}${MAGENTA}  AI AGENT IMPACT DETECTED${NC}" >&2
echo -e "${MAGENTA}  File: ${REL_PATH}${NC}" >&2
echo "" >&2

for impact in "${UNIQUE_IMPACTS[@]}"; do
  IFS='|' read -r severity label desc <<< "$impact"
  case "$severity" in
    high)   log_high "${BOLD}${label}${NC} — ${desc}" ;;
    medium) log_med "${BOLD}${label}${NC} — ${desc}" ;;
    *)      log_info "${BOLD}${label}${NC} — ${desc}" ;;
  esac
done

echo "" >&2
echo -e "${CYAN}[agent-impact]${NC} Review this change carefully — it may alter how the AI agent behaves in this project." >&2
