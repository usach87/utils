export function capitalize(str: string): string {
  if (!str) {
    return '';
  }

  const capitalizedFirstLetter = str[0].toUpperCase();
  const restLetters = str.slice(1);

  return `${capitalizedFirstLetter}${restLetters}`;
}
