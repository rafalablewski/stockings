#!/usr/bin/env bash
# code-simplifier plugin v1.0.0
# Flags overly complex code patterns after edits

set -euo pipefail

PLUGIN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$PLUGIN_DIR/plugin.json"

# Read thresholds from plugin.json config (with fallback defaults)
read_config() {
  local key="$1" default="$2"
  local val
  val=$(python3 -c "
import json
with open('$CONFIG_FILE') as f:
    data = json.load(f)
print(data.get('config', {}).get('$key', '$default'))
" 2>/dev/null || echo "$default")
  echo "$val"
}

MAX_FUNC_LINES=$(read_config maxFunctionLines 50)
MAX_NESTING=$(read_config maxNestingDepth 4)
MAX_PARAMS=$(read_config maxParameters 5)
MAX_CONDITION_CLAUSES=$(read_config maxConditionClauses 3)
MAX_LINE_LEN=$(read_config maxLineLength 120)

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

# Read JSON input from stdin (Claude Code hooks protocol)
INPUT_JSON=$(cat)
TOOL_NAME=$(echo "$INPUT_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_name',''))" 2>/dev/null || true)
FILE_PATH=$(echo "$INPUT_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('file_path',''))" 2>/dev/null || true)

log_info()  { echo -e "${CYAN}[simplifier]${NC} INFO: $1"; }
log_warn()  { echo -e "${YELLOW}[simplifier]${NC} WARN: $1"; }
log_ok()    { echo -e "${GREEN}[simplifier]${NC} OK: $1"; }

# Only registered as PostToolUse, but guard just in case
PHASE=$(echo "$INPUT_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin).get('hook_event_name',''))" 2>/dev/null || true)
if [[ "$PHASE" != "PostToolUse" ]]; then
  exit 0
fi

# Skip if no file path
if [[ -z "$FILE_PATH" || ! -f "$FILE_PATH" ]]; then
  exit 0
fi

# Only check supported file types
case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx) ;;
  *) exit 0 ;;
esac

# Skip ignored paths
case "$FILE_PATH" in
  */node_modules/*|*/.next/*|*.config.*|*.d.ts) exit 0 ;;
esac

WARNINGS=0
BASENAME=$(basename "$FILE_PATH")

log_info "Checking complexity of ${BASENAME}..."

# --- Check 1: Long functions (>${MAX_FUNC_LINES} lines) ---
# Count lines between function/arrow declarations and their closing braces
FUNC_PATTERN='^\s*(export\s+)?(default\s+)?(async\s+)?function\s+\w+|^\s*(export\s+)?(const|let|var)\s+\w+\s*=\s*(async\s+)?\('
LINE_NUM=0
IN_FUNC=false
FUNC_START=0
FUNC_NAME=""
BRACE_DEPTH=0

while IFS= read -r line; do
  LINE_NUM=$((LINE_NUM + 1))

  # Detect function start (simplified heuristic)
  if [[ "$IN_FUNC" == false ]]; then
    if echo "$line" | grep -qE '(function\s+\w+|const\s+\w+\s*=.*=>|const\s+\w+\s*=\s*(async\s+)?function)' 2>/dev/null; then
      if echo "$line" | grep -q '{' 2>/dev/null; then
        IN_FUNC=true
        FUNC_START=$LINE_NUM
        FUNC_NAME=$(echo "$line" | grep -oE '(function\s+)?\w+' | head -1 | sed 's/function //')
        # Count opening braces on this line
        OPEN=$(echo "$line" | tr -cd '{' | wc -c)
        CLOSE=$(echo "$line" | tr -cd '}' | wc -c)
        BRACE_DEPTH=$((OPEN - CLOSE))
        if [[ "$BRACE_DEPTH" -le 0 ]]; then
          IN_FUNC=false
        fi
      fi
    fi
  else
    OPEN=$(echo "$line" | tr -cd '{' | wc -c)
    CLOSE=$(echo "$line" | tr -cd '}' | wc -c)
    BRACE_DEPTH=$((BRACE_DEPTH + OPEN - CLOSE))
    if [[ "$BRACE_DEPTH" -le 0 ]]; then
      FUNC_LENGTH=$((LINE_NUM - FUNC_START))
      if [[ "$FUNC_LENGTH" -gt "$MAX_FUNC_LINES" ]]; then
        log_warn "Function '${FUNC_NAME}' is ${FUNC_LENGTH} lines (line ${FUNC_START}). Consider breaking it into smaller functions."
        WARNINGS=$((WARNINGS + 1))
      fi
      IN_FUNC=false
      BRACE_DEPTH=0
    fi
  fi
done < "$FILE_PATH"

# --- Check 2: Deep nesting (>${MAX_NESTING} levels) ---
MAX_DEPTH=0
while IFS= read -r line; do
  # Count leading whitespace (approximate nesting)
  STRIPPED=$(echo "$line" | sed 's/[^ \t].*//')
  SPACES=${#STRIPPED}
  # Assume 2-space indent
  DEPTH=$((SPACES / 2))
  if [[ "$DEPTH" -gt "$MAX_DEPTH" ]]; then
    MAX_DEPTH=$DEPTH
  fi
done < "$FILE_PATH"

# Nesting threshold = maxNestingDepth config value, doubled for 2-space indent approximation
NESTING_THRESHOLD=$(( MAX_NESTING + MAX_NESTING / 2 ))
if [[ "$MAX_DEPTH" -gt "$NESTING_THRESHOLD" ]]; then
  log_warn "Deep nesting detected (${MAX_DEPTH} levels). Consider early returns or extracting helper functions."
  WARNINGS=$((WARNINGS + 1))
fi

# --- Check 3: Functions with too many parameters (>${MAX_PARAMS}) ---
while IFS= read -r line; do
  if echo "$line" | grep -qE '(function\s+\w+|=>)\s*\(' 2>/dev/null; then
    # Extract parameter list
    PARAMS=$(echo "$line" | grep -oE '\([^)]*\)' | head -1)
    if [[ -n "$PARAMS" ]]; then
      COMMA_COUNT=$(echo "$PARAMS" | tr -cd ',' | wc -c)
      PARAM_COUNT=$((COMMA_COUNT + 1))
      # Don't count empty params
      if echo "$PARAMS" | grep -qE '^\(\s*\)$' 2>/dev/null; then
        PARAM_COUNT=0
      fi
      if [[ "$PARAM_COUNT" -gt "$MAX_PARAMS" ]]; then
        FUNC_NAME=$(echo "$line" | grep -oE '\w+\s*(' | head -1 | sed 's/[( ]//g')
        log_warn "Function '${FUNC_NAME}' has ${PARAM_COUNT} parameters. Consider using an options object."
        WARNINGS=$((WARNINGS + 1))
      fi
    fi
  fi
done < "$FILE_PATH"

# --- Check 4: Complex conditionals (>${MAX_CONDITION_CLAUSES} clauses) ---
LINE_NUM=0
while IFS= read -r line; do
  LINE_NUM=$((LINE_NUM + 1))
  # Count && and || operators in if statements
  if echo "$line" | grep -qE '^\s*if\s*\(' 2>/dev/null; then
    AND_COUNT=$(echo "$line" | grep -oE '&&' | wc -l)
    OR_COUNT=$(echo "$line" | grep -oE '\|\|' | wc -l)
    TOTAL=$((AND_COUNT + OR_COUNT))
    if [[ "$TOTAL" -gt "$MAX_CONDITION_CLAUSES" ]]; then
      log_warn "Complex conditional at line ${LINE_NUM} (${TOTAL} clauses). Consider extracting into a named boolean or helper."
      WARNINGS=$((WARNINGS + 1))
    fi
  fi
done < "$FILE_PATH"

# --- Check 5: Long lines (>${MAX_LINE_LEN} chars) ---
LONG_LINES=0
while IFS= read -r line; do
  if [[ ${#line} -gt "$MAX_LINE_LEN" ]]; then
    LONG_LINES=$((LONG_LINES + 1))
  fi
done < "$FILE_PATH"

if [[ "$LONG_LINES" -gt 5 ]]; then
  log_warn "${LONG_LINES} lines exceed ${MAX_LINE_LEN} characters. Consider breaking them up for readability."
  WARNINGS=$((WARNINGS + 1))
fi

# --- Summary ---
if [[ "$WARNINGS" -eq 0 ]]; then
  log_ok "${BASENAME} looks clean — no complexity issues found."
else
  log_warn "${WARNINGS} complexity issue(s) found in ${BASENAME}. These are suggestions, not blockers."
fi
