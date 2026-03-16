/**
 * Shared helper for classifying NemoClaw/OpenClaw gateway error responses
 * into user-friendly messages.
 */

interface NemoClawErrorInfo {
  /** User-facing error message */
  message: string;
  /** HTTP status to return to the client */
  status: number;
  /** Machine-readable error code for the frontend */
  code:
    | 'gateway_unreachable'
    | 'sandbox_not_running'
    | 'inference_timeout'
    | 'auth_error'
    | 'rate_limited'
    | 'upstream_error';
}

/**
 * Classify a NemoClaw gateway error into a user-friendly response.
 *
 * @param httpStatus - The HTTP status code from the gateway (0 if connection refused)
 * @param responseBody - The raw response body text
 */
export function classifyNemoClawError(httpStatus: number, responseBody: string): NemoClawErrorInfo {
  const lower = responseBody.toLowerCase();

  // Connection refused / gateway down
  if (httpStatus === 0 || lower.includes('econnrefused') || lower.includes('fetch failed')) {
    return {
      message: 'NemoClaw gateway is not reachable. Ensure the sandbox is running: nemoclaw <name> status',
      status: 503,
      code: 'gateway_unreachable',
    };
  }

  // Sandbox not running
  if (lower.includes('sandbox') && (lower.includes('not found') || lower.includes('not running'))) {
    return {
      message: 'NemoClaw sandbox is not running. Start it with: nemoclaw <name> connect',
      status: 503,
      code: 'sandbox_not_running',
    };
  }

  // Auth error
  if (httpStatus === 401 || httpStatus === 403 || lower.includes('unauthorized') || lower.includes('api key')) {
    return {
      message: 'NemoClaw authentication failed. Check your NEMOCLAW_API_KEY in .env.',
      status: 401,
      code: 'auth_error',
    };
  }

  // Rate limited
  if (httpStatus === 429 || lower.includes('rate limit')) {
    return {
      message: 'NemoClaw rate limit reached. Please wait and try again.',
      status: 429,
      code: 'rate_limited',
    };
  }

  // Inference timeout
  if (httpStatus === 504 || lower.includes('timeout') || lower.includes('timed out')) {
    return {
      message: 'NemoClaw inference timed out. The model may be loading or overloaded.',
      status: 504,
      code: 'inference_timeout',
    };
  }

  // Generic upstream error
  return {
    message: `NemoClaw error (${httpStatus}). Please try again later.`,
    status: 502,
    code: 'upstream_error',
  };
}
