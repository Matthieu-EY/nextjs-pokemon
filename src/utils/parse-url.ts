export function parseUrlAndGetParam(url: string, paramName?: string) {
  const parsed = URL.parse(url);
  if (parsed == null) return '';
  if (paramName) return parsed.searchParams.get(paramName);
  const tokens = parsed.pathname
    .split(/[/?=&]+/)
    .filter((value) => value.trim() !== '');
  return tokens[tokens.length - 1];
}

export function parseUrlAndGetParamInt(url: string, paramName?: string) {
  return parseInt(parseUrlAndGetParam(url, paramName) ?? "", 10);
}
