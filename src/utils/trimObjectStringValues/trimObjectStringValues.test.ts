import { trimObjectStringValuesV2, trimObjectStringValues } from './trimObjectStringValues';

describe('trimObjectStringValues', () => {
  test('should return empty object if empty object passed', () => {
    const result = trimObjectStringValues({});

    expect(result).toEqual({});
  });

  test('should trim string values', () => {
    const testString1 = 'test string 1   ';
    const testString2 = '  test string 2';
    const testString3 = 'teststring3';

    const result = trimObjectStringValues({ testString1, testString2, testString3 });

    expect(result.testString1).toEqual(testString1.trim());
    expect(result.testString2).toEqual(testString2.trim());
    expect(result.testString3).toEqual(testString3.trim());
  });

  test('should perform trimming only for 1st level of values', () => {
    const level2Str = ' level2 ';
    const result = trimObjectStringValues({ level2: { level2Str } });

    expect(result.level2.level2Str).toEqual(level2Str);
  });

  test('should return mutated object', () => {
    const testString1 = 'test string 1   ';
    const testString2 = '  test string 2';
    const testString3 = 'teststring3';
    const object = { testString1, testString2, testString3 };

    const result = trimObjectStringValues(object);

    expect(result).toStrictEqual(object);
  });
});

describe('trimObjectStringValuesV2', () => {
  test('should return empty object if empty object passed', () => {
    const result = trimObjectStringValuesV2({});

    expect(result).toEqual({});
  });

  test('should trim string values', () => {
    const testString1 = 'test string 1   ';
    const testString2 = '  test string 2';
    const testString3 = 'teststring3';

    const result = trimObjectStringValuesV2({ testString1, testString2, testString3 });

    expect(result.testString1).toEqual(testString1.trim());
    expect(result.testString2).toEqual(testString2.trim());
    expect(result.testString3).toEqual(testString3.trim());
  });

  test('should perform trimming only for 1st level of values', () => {
    const level2Str = ' level2 ';
    const result = trimObjectStringValuesV2({ level2: { level2Str } });

    expect(result.level2.level2Str).toEqual(level2Str);
  });

  test('should return new object', () => {
    const testString1 = 'test string 1   ';
    const testString2 = '  test string 2';
    const testString3 = 'teststring3';
    const object = { testString1, testString2, testString3 };

    const result = trimObjectStringValuesV2(object);

    expect(result).not.toStrictEqual(object);
  });
});
