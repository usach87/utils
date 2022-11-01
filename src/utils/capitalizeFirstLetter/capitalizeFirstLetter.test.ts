import { capitalizeFirstLetter } from './capitalizeFirstLetter';

describe('capitalizeFirstLetter', () => {
  test.each([
    ['test', 'Test'],
    ['тест', 'Тест'],
    ['тестовый тест', 'Тестовый тест'],
  ])('should capitalize first letter of the string', (string, expectedResult) => {
    expect(capitalizeFirstLetter(string)).toEqual(expectedResult);
  });
});
