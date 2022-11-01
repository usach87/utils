import { rgbStringToHex } from './rgbStringToHex';

describe('rgbStringToHex', () => {
  test.each([
    ['rgb(0,0,0)', '#000000'],
    ['rgba(156, 244, 45, 0.5)', '#9cf42d'],
    ['rgba(64,22,67,.78)', '#401643'],
    ['rgb(42, 244, 57)', '#2af439'],
  ])('should return hex value of rgb color', (rgb, expectedHex) => {
    const result = rgbStringToHex(rgb);

    expect(result).toEqual(expectedHex);
  });

  test('should return original string if no rgb match was found', () => {
    const originalString = 'some random test string';
    const result = rgbStringToHex(originalString);

    expect(result).toEqual(originalString);
  });

  test.each([
    ['rgb(0'],
    ['rgba(8788,89)'],
    ['rgba(90900,13, 77)'],
    ['rgb(, 57)'],
  ])('should return original string if invalid rgb string provided', (invalidString) => {
    const result = rgbStringToHex(invalidString);

    expect(result).toEqual(invalidString);
  });
});
