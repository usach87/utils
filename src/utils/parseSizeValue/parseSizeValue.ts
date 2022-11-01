export const parseSizeValue = (size?: number | string): string | null => {
  if (size === undefined || size === '') {
    return null;
  }
  const sizeAsNumber = Number(size);

  return Number.isNaN(sizeAsNumber)
    ? (size as string)
    : `${sizeAsNumber}px`;
};
