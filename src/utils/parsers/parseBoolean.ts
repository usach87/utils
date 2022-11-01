export function parseBoolean(value: string | boolean | number | null | undefined): boolean {
  if (value === true) {
    return true;
  }

  if (typeof value === 'string') {
    return value.toLowerCase() === String(true);
  }

  return false;
}
