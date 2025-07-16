import { env } from '~/server/env';

interface RequestOptions {
  path: string;
  params?: Record<string, string | number | boolean>;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
}

const POKE_API_URL = env.POKE_API_URL;

/**
 * Generic fetch function for Poke API
 * @param options - Request options
 * @returns The response data
 */
export async function fetchPoke<T>({
  path,
  params = {},
  method = 'GET',
  body,
}: RequestOptions): Promise<T> {
  const url = new URL(path, POKE_API_URL);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), options);

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as Record<
      string,
      unknown
    >;
    throw new Error(
      `POKE API Error (${response.status}): ${JSON.stringify(errorData)}`,
    );
  }
  return response.json() as Promise<T>;
}

/**
 * Default export for easier importing
 */
export default {
  fetch: fetchPoke,
};
