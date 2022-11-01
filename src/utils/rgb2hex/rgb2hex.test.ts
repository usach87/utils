import { rgb2hex } from './rgb2hex';

describe('rgb2hex', () => {
  test('should convert number to format string hex', async () => {
    const expectedResult = '0a';
    const result = rgb2hex(10);

    expect(result).toEqual(expectedResult);
  });
});
