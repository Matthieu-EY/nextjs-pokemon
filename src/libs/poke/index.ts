import { env } from '~/server/env';
import { fetchAPI } from '../fetch';

const POKE_API_URL = env.POKE_API_URL;

/**
 * Fetch function for Poke API
 */
export async function fetchPoke<T>(path: string) {
  return fetchAPI<T>({
    path: `${POKE_API_URL}/${path}`,
  });
}
