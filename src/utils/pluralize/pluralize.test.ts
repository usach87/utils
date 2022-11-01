import { getPlural, pluralize } from './pluralize';

const plurals = ['тест', 'теста', 'тестов'];

describe('getPlural', () => {
  test.each([
    [1, plurals[0]],
    [2, plurals[1]],
    [3, plurals[1]],
    [4, plurals[1]],
    [5, plurals[2]],
    [6, plurals[2]],
    [7, plurals[2]],
    [8, plurals[2]],
    [9, plurals[2]],
    [10, plurals[2]],
  ])('for number %s should provide plural %s', (number, expectedPlural) => {
    const result = getPlural(number, plurals);

    expect(result).toEqual(expectedPlural);
  });
});

describe('pluralize', () => {
  test.each([
    [1, plurals[0]],
    [2, plurals[1]],
    [3, plurals[1]],
    [4, plurals[1]],
    [5, plurals[2]],
    [6, plurals[2]],
    [7, plurals[2]],
    [8, plurals[2]],
    [9, plurals[2]],
    [10, plurals[2]],
  ])('should return correct pluralized string with number: %s %s', (number, expectedPlural) => {
    const result = pluralize(number, plurals);
    const expectedString = `${number} ${expectedPlural}`;

    expect(result).toEqual(expectedString);
  });
});
