import { capitalize } from './capitalize';

describe('capitalize', () => {
  test.each([
    ['text', 'Text'],
    ['текст', 'Текст'],
    ['текст текст', 'Текст текст'],
  ])('should capitalize first letter of the string', (string, expectedResult) => {
    expect(capitalize(string)).toEqual(expectedResult);
  });
});
