#!/usr/bin/env bash
# code-review plugin hook for Claude Code
# Source: claude-plugins-official/code-review@1.0.0
#
# This hook runs before and after file edits to enforce code quality standards.
# It reads rules from review-rules.json and checks modified files for violations.

set -euo pipefail

PHASE="${1:-}"        # "pre" or "post"
TOOL_NAME="${2:-}"    # Edit, Write, NotebookEdit
FILE_PATH="${3:-}"    # Path to the file being modified

PLUGIN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RULES_FILE="$PLUGIN_DIR/review-rules.json"
PROJECT_ROOT="$(cd "$PLUGIN_DIR/../../.." && pwd)"

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

log_error()   { echo -e "${RED}[code-review] ERROR:${NC} $*" >&2; }
log_warn()    { echo -e "${YELLOW}[code-review] WARN:${NC} $*" >&2; }
log_info()    { echo -e "${BLUE}[code-review] INFO:${NC} $*" >&2; }
log_success() { echo -e "${GREEN}[code-review] OK:${NC} $*" >&2; }

# Get file extension
get_extension() {
    local file="$1"
    echo "${file##*.}"
}

# Check if file matches any ignore pattern from the rules file
should_ignore() {
    local file="$1"
    local ignore_patterns
    ignore_patterns=$(python3 -c "
import json
with open('$RULES_FILE') as f:
    data = json.load(f)
for p in data.get('ignoreFiles', []):
    print(p)
" 2>/dev/null || true)

    while IFS= read -r pattern; do
        [[ -z "$pattern" ]] && continue
        case "$pattern" in
            *"/**")
                # Directory glob like "node_modules/**"
                local dir="${pattern%/**}"
                if [[ "$file" == *"/$dir/"* || "$file" == *"$dir/"* ]]; then
                    return 0
                fi
                ;;
            *)
                # Filename glob like "*.config.*" or "*.d.ts"
                local base
                base=$(basename "$file")
                # Convert glob to a simple check
                if [[ "$base" == $pattern ]]; then
                    return 0
                fi
                ;;
        esac
    done <<< "$ignore_patterns"
    return 1
}

# Run all pattern-based checks from review-rules.json dynamically
run_dynamic_checks() {
    local file="$1"
    local ext
    ext=$(get_extension "$file")

    # Use python3 to extract all pattern-based rules as tab-separated lines:
    # category \t id \t severity \t pattern \t message \t fileTypes(comma-sep) \t ignorePatterns(comma-sep) \t prerequisite
    local rules_output
    rules_output=$(python3 -c "
import json
with open('$RULES_FILE') as f:
    data = json.load(f)
for category, section in data.get('rules', {}).items():
    if not section.get('enabled', True):
        continue
    default_severity = section.get('severity', 'warning')
    for check in section.get('checks', []):
        pattern = check.get('pattern', '')
        if not pattern:
            continue
        check_id = check.get('id', '')
        severity = check.get('severity', default_severity)
        message = check.get('message', '')
        file_types = ','.join(check.get('fileTypes', []))
        ignore_pats = ','.join(check.get('ignorePatterns', []))
        # Mark checks that need special prerequisite logic
        prerequisite = ''
        if check_id == 'no-server-secrets-in-client':
            prerequisite = 'use-client'
        print(f'{category}\t{check_id}\t{severity}\t{pattern}\t{message}\t{file_types}\t{ignore_pats}\t{prerequisite}')
" 2>/dev/null || true)

    if [[ -z "$rules_output" ]]; then
        log_warn "Could not parse rules from $RULES_FILE — skipping dynamic checks"
        return 0
    fi

    while IFS=$'\t' read -r category check_id severity pattern message file_types ignore_pats prerequisite; do
        [[ -z "$check_id" ]] && continue

        # Check if file type matches
        if [[ -n "$file_types" ]]; then
            local type_match=false
            IFS=',' read -ra types <<< "$file_types"
            for ft in "${types[@]}"; do
                if [[ "$ext" == "$ft" ]]; then
                    type_match=true
                    break
                fi
            done
            if [[ "$type_match" == false ]]; then
                continue
            fi
        fi

        # Check ignore patterns (file path based)
        if [[ -n "$ignore_pats" ]]; then
            local should_skip=false
            IFS=',' read -ra pats <<< "$ignore_pats"
            for pat in "${pats[@]}"; do
                if [[ "$file" == *"$pat"* ]]; then
                    should_skip=true
                    break
                fi
                # Handle glob-like patterns
                local base
                base=$(basename "$file")
                if [[ "$base" == $pat ]]; then
                    should_skip=true
                    break
                fi
            done
            if [[ "$should_skip" == true ]]; then
                continue
            fi
        fi

        # Handle prerequisites
        if [[ "$prerequisite" == "use-client" ]]; then
            if ! grep -q "'use client'" "$file" 2>/dev/null && ! grep -q '"use client"' "$file" 2>/dev/null; then
                continue
            fi
        fi

        # Run the pattern check
        local matches
        matches=$(grep -nP "$pattern" "$file" 2>/dev/null | head -5 || true)
        if [[ -n "$matches" ]]; then
            case "$severity" in
                error)   log_error "$file: $message ($check_id)" ;;
                warning) log_warn "$file: $message ($check_id)" ;;
                info)    log_info "$file: $message ($check_id)" ;;
                *)       log_warn "$file: $message ($check_id)" ;;
            esac
        fi
    done <<< "$rules_output"

    return 0
}

# Run ESLint on the file if available
run_lint_check() {
    local file="$1"
    local ext
    ext=$(get_extension "$file")

    if [[ ! "$ext" =~ ^(ts|tsx|js|jsx|mjs)$ ]]; then
        return 0
    fi

    if command -v npx &>/dev/null && [ -f "$PROJECT_ROOT/node_modules/.bin/eslint" ]; then
        local lint_output
        if lint_output=$(cd "$PROJECT_ROOT" && npx eslint --no-error-on-unmatched-pattern --format compact "$file" 2>&1); then
            log_success "ESLint passed: $(basename "$file")"
        else
            log_warn "ESLint issues in $(basename "$file"):"
            echo "$lint_output" | head -20 >&2
        fi
    fi

    return 0
}

# Run TypeScript type check
run_type_check() {
    local file="$1"
    local ext
    ext=$(get_extension "$file")

    if [[ ! "$ext" =~ ^(ts|tsx)$ ]]; then
        return 0
    fi

    if command -v npx &>/dev/null && [ -f "$PROJECT_ROOT/tsconfig.json" ]; then
        local tsc_output
        if tsc_output=$(cd "$PROJECT_ROOT" && npx tsc --noEmit --pretty false 2>&1 | grep "$(basename "$file")" | head -10); then
            if [ -n "$tsc_output" ]; then
                log_warn "TypeScript issues in $(basename "$file"):"
                echo "$tsc_output" >&2
            else
                log_success "TypeScript check passed: $(basename "$file")"
            fi
        fi
    fi

    return 0
}

# --- Main ---

if [ -z "$FILE_PATH" ]; then
    exit 0
fi

# Resolve to absolute path if relative
if [[ "$FILE_PATH" != /* ]]; then
    FILE_PATH="$PROJECT_ROOT/$FILE_PATH"
fi

# Skip ignored files
if should_ignore "$FILE_PATH"; then
    exit 0
fi

# Skip if file doesn't exist (deleted)
if [ ! -f "$FILE_PATH" ]; then
    exit 0
fi

case "$PHASE" in
    pre)
        # Pre-edit phase: log that review will happen after edit
        log_info "Reviewing changes to $(basename "$FILE_PATH")..."
        ;;
    post)
        # Post-edit phase: run all checks
        log_info "Running code review on $(basename "$FILE_PATH")..."

        # Run dynamic pattern-based checks from review-rules.json
        run_dynamic_checks "$FILE_PATH" || true

        # Lint and type checks are heavier - run only in post phase
        run_lint_check "$FILE_PATH" || true
        run_type_check "$FILE_PATH" || true

        log_success "Code review complete for $(basename "$FILE_PATH")"
        ;;
    *)
        log_error "Unknown phase: $PHASE (expected 'pre' or 'post')"
        exit 1
        ;;
esac

exit 0
