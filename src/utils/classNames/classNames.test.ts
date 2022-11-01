import { classNames } from './classNames';

describe('classNames', () => {
  test.each([
    ['className', 'className'],
    [['className'], 'className'],
    [['className', 'classTest'], 'className classTest'],
    [{ classTest: true }, 'classTest'],
    [['className', { classTest: true }], 'className classTest'],
    [['className', { classTest: false }], 'className'],
  ])('should return a string with classes', (result, expectedResult) => {
    expect(classNames(result)).toEqual(expectedResult);
  });
});
