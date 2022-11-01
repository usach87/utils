import { parseSizeValue } from './parseSizeValue';

describe('getSizeFromProp', () => {
  test.each([
    ['auto', 'auto'],
    ['100%', '100%'],
    ['100', '100px'],
    [100, '100px'],
    [0, '0px'],
    ['', null],
    [undefined, null],
  ])('Должен возвращать корректное значение css размера %p', (size, expectedParsedSize) => {
    expect(parseSizeValue(size)).toBe(expectedParsedSize);
  });
});
