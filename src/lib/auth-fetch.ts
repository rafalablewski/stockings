/**
 * Wrapper around fetch that injects the x-auth-pin header from localStorage.
 * Also injects x-ai-disabled when the AI toggle is turned off.
 * Use this for all calls to protected API routes (workflow/run, edgar/analyze, etc.).
 */
export function authFetch(url: string, init?: RequestInit): Promise<Response> {
  const pin = typeof window !== 'undefined' ? localStorage.getItem('auth-pin') : null;
  const aiEnabled = typeof window !== 'undefined' ? localStorage.getItem('ai-enabled') : null;
  const headers = new Headers(init?.headers);
  if (pin) headers.set('x-auth-pin', pin);
  if (aiEnabled === 'false') headers.set('x-ai-disabled', 'true');
  return fetch(url, { ...init, headers });
}
