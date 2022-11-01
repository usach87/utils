import { trimStringAndRemoveExtraSpacing } from './trimStringAndRemoveExtraSpacing';

describe('trimStringAndRemoveExtraSpacing', () => {
  test('should trim spaces', () => {
    const testString = '   so much space around        ';
    const expectedResult = 'so much space around';

    const result = trimStringAndRemoveExtraSpacing(testString);

    expect(result).toEqual(expectedResult);
  });

  test('should remove extra spacing', () => {
    const testString = 'so   much  space     inside';
    const expectedResult = 'so much space inside';

    const result = trimStringAndRemoveExtraSpacing(testString);

    expect(result).toEqual(expectedResult);
  });
});
