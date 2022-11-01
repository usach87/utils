export const getPlural = (num: number, titles: Array<string>): string => {
  const cases = [2, 0, 1, 1, 1, 2];

  return `${titles[num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]]}`;
};

export const pluralize = (num: number, titles: Array<string>): string => (
  `${num} ${getPlural(num, titles)}`
);
