/**
 * Shared helper for classifying Anthropic API error responses into
 * user-friendly messages. Prevents raw upstream errors like
 * "Your credit balance is too low…" from leaking to the UI.
 */

interface AnthropicErrorInfo {
  /** User-facing error message */
  message: string;
  /** HTTP status to return to the client */
  status: number;
  /** Machine-readable error code for the frontend */
  code: 'credits_exhausted' | 'rate_limited' | 'auth_error' | 'overloaded' | 'upstream_error';
}

/**
 * Parse an Anthropic API error response and return a friendly error.
 *
 * @param httpStatus - The HTTP status code from the Anthropic API
 * @param responseBody - The raw response body text
 */
export function classifyAnthropicError(httpStatus: number, responseBody: string): AnthropicErrorInfo {
  // Try to extract the error message from the JSON body
  let rawMessage = '';
  try {
    const parsed = JSON.parse(responseBody);
    rawMessage = parsed?.error?.message || '';
  } catch {
    rawMessage = responseBody;
  }

  const lower = rawMessage.toLowerCase();

  // Credit / billing exhausted
  if (lower.includes('credit balance is too low') || lower.includes('billing') || lower.includes('purchase credits')) {
    return {
      message: 'Anthropic API credits exhausted. Add credits at console.anthropic.com → Plans & Billing, then retry.',
      status: 402,
      code: 'credits_exhausted',
    };
  }

  // Rate limited
  if (httpStatus === 429 || lower.includes('rate limit')) {
    return {
      message: 'Anthropic API rate limit reached. Please wait a moment and try again.',
      status: 429,
      code: 'rate_limited',
    };
  }

  // Authentication error
  if (httpStatus === 401 || lower.includes('invalid api key') || lower.includes('authentication')) {
    return {
      message: 'Invalid Anthropic API key. Check your ANTHROPIC_API_KEY in .env.',
      status: 401,
      code: 'auth_error',
    };
  }

  // Overloaded
  if (httpStatus === 529 || lower.includes('overloaded')) {
    return {
      message: 'Anthropic API is temporarily overloaded. Please try again in a few minutes.',
      status: 503,
      code: 'overloaded',
    };
  }

  // Generic upstream error
  return {
    message: `AI service error (${httpStatus}). Please try again later.`,
    status: 502,
    code: 'upstream_error',
  };
}
