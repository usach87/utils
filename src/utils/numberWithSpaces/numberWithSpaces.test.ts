import { numberWithSpaces } from './numberWithSpaces';

describe('numberWithSpaces', () => {
  test.each([
    [1, '1'],
    [10, '10'],
    [100, '100'],
    [1000, '1 000'],
    [10000, '10 000'],
    [100000, '100 000'],
    [1000000, '1 000 000'],
  ])('should add space every 3 digits in number', (number, expectedString) => {
    const result = numberWithSpaces(number);

    expect(result).toEqual(expectedString);
  });
});
