import { getLocationSpy } from '../../testMocks/getLocationSpy';
import { getIsDebugMode } from './getIsDebugMode';

describe('getIsDebugMode', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test.each([
    ['http://yandex.ru', false],
    ['http://yandex.ru?debug', false],
    ['http://yandex.ru?debugmode', true],
    ['http://yandex.ru?debugmode=true', true],
    ['http://yandex.ru?debugmode=false', false],
    ['http://yandex.ru?debugmode=somethingelse', true],
  ])('if url is "%s" should return "%s"', (url, expectedResult) => {
    getLocationSpy(url);

    const result = getIsDebugMode();

    expect(result).toEqual(expectedResult);
  });
});
