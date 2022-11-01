import { getByPath } from './getByPath';

describe('getByPath', () => {
  test('should return null when not existed path is passed and default value is not passed', () => {
    const result = getByPath({}, 'not.existed.path');

    expect(result).toBeNull();
  });

  test('should return default value when not existed path and default value are passed', () => {
    const defaultValue = 1000;
    const result = getByPath({}, 'not.existed.path', defaultValue);

    expect(result).toEqual(defaultValue);
  });

  test('should return expected value when existed path is passed', () => {
    const value = 'Desired value';

    const result = getByPath({
      firstLevel: {
        second: {
          third: value,
        },
      },
      test: '123',
    }, 'firstLevel.second.third');

    expect(result).toEqual(value);
  });
});
