export function uniqBy<T>(list: T[], comparator: (item: T) => unknown): T[] {
  const itemsByKeys = list.reduce<Record<string, T>>((acc, item) => {
    // Letter 'a' was added to the beginning of the key to prevent items order changes
    const key = `a${String(comparator(item))}`;

    if (!(key in acc)) {
      acc[key] = item;
    }

    return acc;
  }, {});

  return Object.values<T>(itemsByKeys);
}
