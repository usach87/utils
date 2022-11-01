import { getLocationSpy } from '@product-platform/test-utils/mocks/location/location';
import { debugLog } from './debugLog';

describe('debugLog', () => {
  beforeAll(() => {
    global.window.console.log = jest.fn();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test.each([
    ['http://yandex.ru', 0],
    ['http://yandex.ru?debug', 0],
    ['http://yandex.ru?debugmode', 1],
    ['http://yandex.ru?debugmode=true', 1],
    ['http://yandex.ru?debugmode=false', 0],
  ])('if url is "%s" should call console.log times: "%i"', (url, expectedCallTimes) => {
    getLocationSpy(url);

    debugLog();

    expect(global.window.console.log).toBeCalledTimes(expectedCallTimes);
  });

  test('should call console.log with given arguments', () => {
    const args = [{ foo: 'test' }, 'hello', [1, 2, '13']];

    getLocationSpy('http://yandex.ru?debugmode=true');

    debugLog(...args);

    expect(global.window.console.log).toBeCalledWith(...args);
  });
});
