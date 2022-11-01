export function getItemsById<T extends { id: string }>(arr: Array<T>): { [id: string]: T; } {
  const result: { [id: string]: T } = {};

  arr.forEach((item) => {
    result[item.id] = item;
  });

  return result;
}
