export function capitalize(str: string): string {
  if (!str || !str.length) return str;
  return str[0].toUpperCase() + str.slice(1);
}
