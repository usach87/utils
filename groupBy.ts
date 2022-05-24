type TRecursiveDictionaryType<T> = {[key: string]: T | TRecursiveDictionaryType<T>};

function mergeByKeys<T>(obj: TRecursiveDictionaryType<T>, item: T, keys: Array<keyof T>): TRecursiveDictionaryType<T> {
  const [key, ...restKeys] = keys;
  const keyValue = String(item[key]);

  if (!restKeys || !restKeys.length) {
    return {
      ...obj,
      [keyValue]: item,
    };
  }

  return {
    ...obj,
    [keyValue]: mergeByKeys((obj[keyValue] || {}) as TRecursiveDictionaryType<T>, item, restKeys),
  };
}

export function groupBy<T>(list: T[], key: keyof T): Record<string, T[]> {
  return list.reduce<Record<string, T[]>>((acc, item) => {
    const preparedKey = String(item[key]);

    if (!acc[preparedKey]) {
      acc[preparedKey] = [];
    }

    acc[preparedKey].push(item);

    return acc;
  }, {});
}

export function groupByKey<T>(list: T[], key: keyof T) {
  return list.reduce((acc, item) => mergeByKeys(acc, item, [key]), {});
}

export function groupByKeys<T>(list: T[], keys: Array<keyof T>) {
  return list.reduce((acc, item) => mergeByKeys(acc, item, keys), {});
}
