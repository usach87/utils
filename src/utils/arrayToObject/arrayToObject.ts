type ArrayToObject<T> = Record<keyof T, T>

export function arrayToObject<T>(array: T[], keyField: keyof T): ArrayToObject<T>  {
  return array.reduce((acc, item) => {
    const keyValue = String(item[keyField]);

    return {
      ...acc,
      [keyValue]: item,
    };
  }, {} as ArrayToObject<T>);
}
