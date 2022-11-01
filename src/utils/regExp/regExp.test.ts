import { escapeTextForRegExp } from './regExp';

describe('escapeTextForRegExp', () => {
  test.each([
    ['[-]', '\\[\\-\\]'],
    ['()', '\\(\\)'],
    ['{}', '\\{\\}'],
    ['?+*', '\\?\\+\\*'],
    ['.', '\\.'],
    ['\\', '\\\\'],
    ['^$', '\\^\\$'],
    ['|', '\\|'],
  ])('should escape characters "%s"', (text: string, expectedString) => {
    const result = escapeTextForRegExp(text);

    expect(result).toEqual(expectedString);
  });

  test.each([
    ['Many people love parties (I don\'t).', 'Many people love parties \\(I don\'t\\)\\.'],
    ['Hi. Could you lend me $50-$100?', 'Hi\\. Could you lend me \\$50\\-\\$100\\?'],
  ])('should escape special characters found in the text: "%s"', (text: string, expectedString) => {
    const result = escapeTextForRegExp(text);

    expect(result).toEqual(expectedString);
  });
});
