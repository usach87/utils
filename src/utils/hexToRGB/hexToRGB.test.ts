import { hexToRGB } from './hexToRGB';

describe('hexToRGB', () => {
  test('if a string of css color is passed, the string is returned in rgba format', () => {
    const fakeColor = '#fc0000';
    const expectedResult = 'rgba(252, 0, 0, 0.7)';

    const result = hexToRGB(fakeColor, 0.7);

    expect(result).toEqual(expectedResult);
  });

  test('if an invalid string format is passed, a string with an invalid rgba color is returned', () => {
    const invalidFakeColor = '------';
    const expectedResult = 'rgba(NaN, NaN, NaN, 0.7)';

    const result = hexToRGB(invalidFakeColor, 0.7);

    expect(result).toEqual(expectedResult);
  });
});
