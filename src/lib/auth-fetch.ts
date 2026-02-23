/**
 * Wrapper around fetch that injects the x-auth-pin header from localStorage.
 * Use this for all calls to protected API routes (workflow/run, edgar/analyze, etc.).
 */
export function authFetch(url: string, init?: RequestInit): Promise<Response> {
  const pin = typeof window !== 'undefined' ? localStorage.getItem('auth-pin') : null;
  const headers = new Headers(init?.headers);
  if (pin) headers.set('x-auth-pin', pin);
  return fetch(url, { ...init, headers });
}
