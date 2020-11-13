export function toNumber(value: string | undefined, fallback: number): number {
  if (value === undefined) {
    return fallback;
  }
  try {
    return parseInt(value, 10);
  } catch (_error) {
    return fallback;
  }
}
