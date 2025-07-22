export function formatName(name: string) {
  const formatted = name.trim().replaceAll(/[-_]/g, ' ');
  return formatted.charAt(0).toLocaleUpperCase('fr') + formatted.slice(1);
}