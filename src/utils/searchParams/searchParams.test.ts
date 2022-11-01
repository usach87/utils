import {
  getSearchParam, normalizeQueryValue, parseSearchParams, stringifySearchParams, stringifySearchParamsV2,
} from './searchParams';

describe('searchParams', () => {
  describe('stringifySearchParams', () => {
    test('should return empty string if empty object passed', () => {
      const result = stringifySearchParams({});

      expect(result).toEqual('');
    });

    test('should drop falsy values', () => {
      const result = stringifySearchParams({
        val1: undefined,
        val2: null,
        val3: false,
        val4: '',
        val5: 0,
        val6: NaN,
      });

      expect(result).toEqual('');
    });

    test('should collect object values to query string', () => {
      const result = stringifySearchParams({
        val1: 'test',
        val2: 123,
        val3: true,
      });
      const expectedString = 'val1=test&val2=123&val3=true';

      expect(result).toEqual(expectedString);
    });

    test('should collect object array-values to query string with same key', () => {
      const result = stringifySearchParams({ value: ['test1', 'test2'] });
      const expectedString = 'value=test1&value=test2';

      expect(result).toEqual(expectedString);
    });

    test('should return empty string for empty arrays', () => {
      const result = stringifySearchParams({ value: [] });

      expect(result).toEqual('');
    });
  });

  describe('stringifySearchParamsV2', () => {
    test('should return empty string if empty object passed', () => {
      const result = stringifySearchParamsV2({});

      expect(result).toEqual('');
    });

    test('should drop falsy values if showEmpty arg is false', () => {
      const result = stringifySearchParamsV2({
        val1: undefined,
        val2: null,
        val3: false,
        val4: '',
        val5: 0,
        val6: NaN,
      });

      expect(result).toEqual('');
    });

    test('should stringify falsy values if showEmpty arg is true', () => {
      const result = stringifySearchParamsV2({
        val1: undefined,
        val2: null,
        val3: false,
        val4: '',
        val5: 0,
        val6: NaN,
      }, true);

      expect(result).toEqual('val1=&val2=&val3=&val4=&val5=&val6=');
    });

    test('should collect object values to query string', () => {
      const result = stringifySearchParamsV2({
        val1: 'test',
        val2: 123,
        val3: true,
      });
      const expectedString = 'val1=test&val2=123&val3=true';

      expect(result).toEqual(expectedString);
    });

    test('should collect object array-values to query string with same key', () => {
      const result = stringifySearchParamsV2({ value: ['test1', 'test2'] });
      const expectedString = 'value=test1&value=test2';

      expect(result).toEqual(expectedString);
    });

    test('should return empty string for empty arrays', () => {
      const result = stringifySearchParamsV2({ value: [] });

      expect(result).toEqual('');
    });
  });

  describe('parseSearchParams', () => {
    test('should return empty object for empty string', () => {
      const result = parseSearchParams('');

      expect(result).toEqual({});
    });

    test('should return object with values from query string', () => {
      const result = parseSearchParams('val1=1&val2=qwerty&val3=true');
      const expectedObject = {
        val1: '1',
        val2: 'qwerty',
        val3: 'true',
      };

      expect(result).toEqual(expectedObject);
    });

    test('should create array for values with same key', () => {
      const result = parseSearchParams('value=first&value=second&value=third');
      const expectedObject = {
        value: ['first', 'second', 'third'],
      };

      expect(result).toEqual(expectedObject);
    });

    test('should provide empty string value for empty value', () => {
      const result = parseSearchParams('val1=&val2=');
      const expectedObject = { val1: '', val2: '' };

      expect(result).toEqual(expectedObject);
    });

    test('should drop values without keys', () => {
      const result = parseSearchParams('=qwerty&value=true');
      const expectedObject = { value: 'true' };

      expect(result).toEqual(expectedObject);
    });
  });

  describe('getSearchParam', () => {
    test('should return value of search param if exists', () => {
      const key = 'val2';
      const value = 'qwerty';
      const query = `val1=1&${key}=${value}&val3=true`;

      expect(getSearchParam(query, key)).toEqual(value);
    });

    test('should return empty string if param with provided name was not found', () => {
      const query = 'val1=1&val2=qwerty&val3=true';

      expect(getSearchParam(query, 'val4')).toEqual('');
    });
  });

  describe('normalizeQueryValue', () => {
    test('should return first array entry if array of strings given', () => {
      const result = normalizeQueryValue(['test1', 'test2', 'test3']);

      expect(result).toEqual('test1');
    });

    test.each([
      [undefined, 'default', 'default'],
      [undefined, undefined, ''],
      ['', 'test default', 'test default'],
      ['', undefined, ''],
      [['', ''], 'default value', 'default value'],
      [['', ''], '', ''],
    ])('for value "%s" and given default value "%s" should return "%s"', (value, defaultValue, expectedResult) => {
      const result = normalizeQueryValue(value, defaultValue);

      expect(result).toEqual(expectedResult);
    });
  });
});
