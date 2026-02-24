#!/usr/bin/env bash
# claude-md-management plugin v1.0.0
# Validates and manages CLAUDE.md project instruction files

set -euo pipefail

PLUGIN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$PLUGIN_DIR/../../.." && pwd)"
CLAUDE_MD="$PROJECT_ROOT/CLAUDE.md"

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m'

# Read JSON input from stdin (Claude Code hooks protocol)
INPUT_JSON=$(cat)
TOOL_NAME=$(echo "$INPUT_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_name',''))" 2>/dev/null || true)
FILE_PATH=$(echo "$INPUT_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('file_path',''))" 2>/dev/null || true)

log_info()  { echo -e "${BLUE}[claude-md]${NC} INFO: $1"; }
log_warn()  { echo -e "${YELLOW}[claude-md]${NC} WARN: $1"; }
log_ok()    { echo -e "${GREEN}[claude-md]${NC} OK: $1"; }
log_error() { echo -e "${RED}[claude-md]${NC} ERROR: $1"; }

# Load config
CONFIG_FILE="$PLUGIN_DIR/plugin.json"

# Helper: extract JSON array of strings using python3
json_string_array() {
  local file="$1" path="$2"
  python3 -c "
import json, sys
with open('$file') as f:
    data = json.load(f)
keys = '$path'.split('.')
for k in keys:
    data = data[k]
for item in data:
    print(item)
" 2>/dev/null
}

# Only registered as PostToolUse, but guard just in case
PHASE=$(echo "$INPUT_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin).get('hook_event_name',''))" 2>/dev/null || true)
if [[ "$PHASE" != "PostToolUse" ]]; then
  exit 0
fi

# --- Case 1: CLAUDE.md was directly edited ---
if [[ "$FILE_PATH" == *"CLAUDE.md"* ]]; then
  log_info "CLAUDE.md was modified — validating structure..."

  if [[ ! -f "$CLAUDE_MD" ]]; then
    log_warn "CLAUDE.md does not exist at project root."
    exit 0
  fi

  ERRORS=0

  # Check for required sections (read from plugin.json config)
  REQUIRED_SECTIONS=()
  while IFS= read -r section; do
    [[ -n "$section" ]] && REQUIRED_SECTIONS+=("$section")
  done < <(json_string_array "$CONFIG_FILE" "config.requiredSections")
  # Fallback if config parsing fails
  if [[ ${#REQUIRED_SECTIONS[@]} -eq 0 ]]; then
    REQUIRED_SECTIONS=("Project Overview" "Tech Stack" "Development Commands" "Code Conventions")
  fi
  for section in "${REQUIRED_SECTIONS[@]}"; do
    if ! grep -qi "^#.*${section}" "$CLAUDE_MD" 2>/dev/null; then
      log_warn "Missing recommended section: '${section}'"
      ERRORS=$((ERRORS + 1))
    fi
  done

  # Check for empty file
  if [[ ! -s "$CLAUDE_MD" ]]; then
    log_error "CLAUDE.md is empty."
    exit 0
  fi

  # Check it starts with a heading
  FIRST_LINE=$(head -n 1 "$CLAUDE_MD")
  if [[ ! "$FIRST_LINE" =~ ^#\  ]]; then
    log_warn "CLAUDE.md should start with a top-level heading (# Title)."
    ERRORS=$((ERRORS + 1))
  fi

  # Check for overly long file (>500 lines can slow down context)
  LINE_COUNT=$(wc -l < "$CLAUDE_MD")
  if [[ "$LINE_COUNT" -gt 500 ]]; then
    log_warn "CLAUDE.md is ${LINE_COUNT} lines. Consider keeping it under 500 lines to avoid slowing context loading."
  fi

  if [[ "$ERRORS" -eq 0 ]]; then
    log_ok "CLAUDE.md structure is valid."
  else
    log_warn "${ERRORS} structural issue(s) found. These are recommendations, not blockers."
  fi
  exit 0
fi

# --- Case 2: Config files changed — check for convention drift ---
CONFIG_PATTERNS=(
  "package.json"
  "tsconfig.json"
  "eslint.config"
  ".eslintrc"
  "next.config"
  "drizzle.config"
  "tailwind.config"
)

IS_CONFIG_FILE=false
for pattern in "${CONFIG_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    IS_CONFIG_FILE=true
    break
  fi
done

if [[ "$IS_CONFIG_FILE" == true ]]; then
  if [[ ! -f "$CLAUDE_MD" ]]; then
    log_info "Config file changed ($(basename "$FILE_PATH")) but no CLAUDE.md exists."
    log_info "Consider creating a CLAUDE.md to document project conventions."
    exit 0
  fi

  BASENAME=$(basename "$FILE_PATH")
  log_info "Config file '${BASENAME}' was modified."

  # Check if the changed config is referenced in CLAUDE.md
  if ! grep -qi "$BASENAME" "$CLAUDE_MD" 2>/dev/null; then
    log_warn "'${BASENAME}' changed but is not referenced in CLAUDE.md. Consider updating project documentation."
  else
    log_ok "'${BASENAME}' is documented in CLAUDE.md."
  fi
fi
