import { parseBoolean } from './parseBoolean';

describe('parseBoolean', () => {
  test.each([
    [null, false],
    [undefined, false],
    [true, true],
    [false, false],
    [1, false],
    [0, false],
    ['true', true],
    ['True', true],
    ['TRUE', true],
    ['', false],
    [' true', false],
    ['true ', false],
    [' true ', false],
    ['false', false],
    ['1', false],
    ['0', false],
    ['null', false],
    ['undefined', false],
  ])('when "%s" is passed then "%s" should be returned', (value, expectedResult) => {
    expect(parseBoolean(value)).toBe(expectedResult);
  });
});
