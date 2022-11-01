export function getByPath<T = string>(obj: Record<string, unknown>, path: string, defaultValue?: T): T | null {
  return path
    .split('.')
    .reduce((acc, key) => (acc?.[key] ?? (defaultValue || null)), obj) as T;
}
