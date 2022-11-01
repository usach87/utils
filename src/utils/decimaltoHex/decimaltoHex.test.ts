import { decimaltoHex } from './decimaltoHex';

describe('decimaltoHex', () => {
  test.each([
    [10, '0a'],
    [0, '00'],
    [158, '9e'],
    [255, 'ff'],
  ])('should convert number to format string hex', (decimal, expectedHex) => {
    const result = decimaltoHex(decimal);

    expect(result).toEqual(expectedHex);
  });
});
