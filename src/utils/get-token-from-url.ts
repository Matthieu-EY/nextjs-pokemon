export function getTokenFromUrl(url: string, index: number) {
  const tokens = url.split(/[/?=&]+/).filter((value) => value.trim() !== '');
  if (tokens.length <= 0 || index < 0) return '';
  if (index > tokens.length) return tokens[tokens.length - 1];
  return tokens[index];
}

export function getIdFromUrl(url: string, index: number) {
  return parseInt(getTokenFromUrl(url, index), 10);
}
