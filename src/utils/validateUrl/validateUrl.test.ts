import { isUrlValid, validateUrl } from './validateUrl';

describe('isUrlValid', () => {
  test.each([
    'https://google.com',
    'https://211.23.44.156',
    'https://id2.action-media.ru/products/my-products',
  ])('for valid url "%s" should return true', (url) => {
    const result = isUrlValid(url);

    expect(result).toEqual(true);
  });

  test.each([
    'http://localhost',
    '123231',
    'www.google.com',
  ])('for invalid url "%s" should return false', (url) => {
    const result = isUrlValid(url);

    expect(result).toEqual(false);
  });
});

describe('validateUrl', () => {
  test.each([
    ['https://google.com', undefined, 'https://google.com'],
    ['https://google.com', 'https://yandex.ru', 'https://google.com'],
    ['www.google.com', undefined, ''],
    ['www.google.com', 'https://yandex.ru', 'https://yandex.ru'],
  ])('for given url: "%s" and fallback url: "%s" should return "%s"', (url, fallbackUrl, expectedResult) => {
    const result = validateUrl(url, fallbackUrl);

    expect(result).toEqual(expectedResult);
  });
});
