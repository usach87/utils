import { cutText } from './cutText';

describe('cutText', () => {
  test('should return provided string if its length more that symbols to cut', () => {
    const testString = 'Some test string to cut';

    const result = cutText(testString, testString.length + 10);

    expect(result).toEqual(testString);
  });

  test('should cut string by provided length and add ellipsis at end', () => {
    const testString = 'Some test string to cut';
    const symbolsToCut = 10;
    const expectedResult = 'Some test ...';

    const result = cutText(testString, symbolsToCut);

    expect(result).toEqual(expectedResult);
  });
});
