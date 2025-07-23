// this function parses a URL and tries to get the paramName in the searchParams
// Ex: (https://pokeapi.co/api/v2/pokemon?offset=20&limit=20, offset) => 20
// If no paramName, then parses the url and tries to extract the last token 
// Ex no paramName: https://pokeapi.co/api/v2/pokemon/9/ => 9
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
