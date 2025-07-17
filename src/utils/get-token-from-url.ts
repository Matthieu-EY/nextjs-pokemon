/*
export function getTokenFromUrl(url: string, index: number) {
  const tokens = url.split(/[/?=&]+/).filter((value) => value.trim() !== '');
  if (tokens.length <= 0 || index < 0) return '';
  if (index > tokens.length) return tokens[tokens.length - 1];
  return tokens[index];
}
*/

export function parseUrlAndGetParam(url: string, paramName?: string) {
  const parsed = URL.parse(url);
  if (parsed == null) return '';
  if (paramName) return parsed.searchParams.get(paramName);
  const tokens = parsed.pathname
    .split(/[/?=&]+/)
    .filter((value) => value.trim() !== '');
  return tokens[tokens.length - 1];
}
