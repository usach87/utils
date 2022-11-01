import { normalizeUrl } from './normalizeUrl';

describe('normalizeUrl', () => {
  test.each([
    ['http://', 'http://yandex.ru', 'http://yandex.ru'],
    ['https://', 'https://google.com', 'https://google.com'],
  ])('should return urls that start with %p as is', (scheme, url, expectedUrl) => {
    expect(normalizeUrl(url)).toEqual(expectedUrl);
  });

  test('should add double slash if string doesnt start with http:// or https://', () => {
    const url = 'id2.action-media.ru/products';
    const expectedUrl = '//id2.action-media.ru/products';

    expect(normalizeUrl(url)).toEqual(expectedUrl);
  });
});
