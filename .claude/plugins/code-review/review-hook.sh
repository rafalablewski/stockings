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

# Check if file should be ignored
should_ignore() {
    local file="$1"
    case "$file" in
        */node_modules/*|*/.next/*|*.config.*|*.d.ts)
            return 0
            ;;
    esac
    return 1
}

# Get file extension
get_extension() {
    local file="$1"
    echo "${file##*.}"
}

# Run pattern-based security checks on a file
run_security_checks() {
    local file="$1"
    local ext
    ext=$(get_extension "$file")
    local found_issues=0

    # no-eval check
    if [[ "$ext" =~ ^(ts|tsx|js|jsx)$ ]]; then
        if grep -nP '\beval\s*\(' "$file" 2>/dev/null; then
            log_error "$file: Avoid using eval() - code injection risk (no-eval)"
            found_issues=$((found_issues + 1))
        fi
    fi

    # no-hardcoded-secrets check
    if [[ "$ext" =~ ^(ts|tsx|js|jsx)$ ]]; then
        if grep -niP '(password|secret|api_key|apikey|token)\s*[:=]\s*['"'"'"][^'"'"'"]+['"'"'"]' "$file" 2>/dev/null | grep -v '.env.example' | grep -v '.test.' | grep -v '.spec.' | head -3; then
            log_warn "$file: Possible hardcoded secret detected - use environment variables (no-hardcoded-secrets)"
            found_issues=$((found_issues + 1))
        fi
    fi

    # dangerouslySetInnerHTML check
    if [[ "$ext" =~ ^(tsx|jsx)$ ]]; then
        if grep -n 'dangerouslySetInnerHTML' "$file" 2>/dev/null; then
            log_warn "$file: Review dangerouslySetInnerHTML usage for XSS risk (no-innerhtml)"
            found_issues=$((found_issues + 1))
        fi
    fi

    return 0
}

# Run quality checks on a file
run_quality_checks() {
    local file="$1"
    local ext
    ext=$(get_extension "$file")
    local found_issues=0

    # no-console-log check (skip scripts and tests)
    if [[ "$ext" =~ ^(ts|tsx)$ ]]; then
        case "$file" in
            */scripts/*|*.test.*|*.spec.*) ;;
            *)
                local count
                count=$(grep -c 'console\.log(' "$file" 2>/dev/null | tail -1 || echo "0")
                if [[ "$count" =~ ^[0-9]+$ ]] && [ "$count" -gt 0 ]; then
                    log_info "$file: Found $count console.log statement(s) - consider removing (no-console-log)"
                fi
                ;;
        esac
    fi

    return 0
}

# Run React-specific checks
run_react_checks() {
    local file="$1"
    local ext
    ext=$(get_extension "$file")

    if [[ ! "$ext" =~ ^(tsx|jsx)$ ]]; then
        return 0
    fi

    # no-index-key check
    if grep -nP 'key=\{(index|i|idx)\}' "$file" 2>/dev/null; then
        log_info "$file: Avoid using array index as key (no-index-key)"
    fi

    return 0
}

# Run Next.js-specific checks
run_nextjs_checks() {
    local file="$1"
    local ext
    ext=$(get_extension "$file")

    if [[ "$ext" != "tsx" ]]; then
        return 0
    fi

    # Check for non-NEXT_PUBLIC_ env access in client components
    if grep -q "'use client'" "$file" 2>/dev/null || grep -q '"use client"' "$file" 2>/dev/null; then
        if grep -nP 'process\.env\.(?!NEXT_PUBLIC_)' "$file" 2>/dev/null; then
            log_error "$file: Non-NEXT_PUBLIC_ env vars accessed in client component (no-server-secrets-in-client)"
        fi
    fi

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

        run_security_checks "$FILE_PATH" || true
        run_quality_checks "$FILE_PATH" || true
        run_react_checks "$FILE_PATH" || true
        run_nextjs_checks "$FILE_PATH" || true

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
