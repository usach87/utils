import { getCookie, parseCookie } from './cookies';

// eslint-disable-next-line max-len
const testCookie = 'batman=iambatman; numberOfTheBeast=666; kenobi=["hello", "there"]; grievous={"general": "kenobi"}; someNull=null; true=true; undefined=undefined';
const expectedObject = {
  batman: 'iambatman',
  grievous: { general: 'kenobi' },
  kenobi: ['hello', 'there'],
  numberOfTheBeast: 666,
  someNull: null,
  true: true,
  undefined: 'undefined',
};

describe('cookies', () => {
  beforeAll(() => {
    Object.defineProperty(global.document, 'cookie', {
      value: testCookie,
      writable: true,
    });
  });

  describe('parseCookie', () => {
    test('should return object with key-value pairs of parsed cookies', () => {
      expect(parseCookie()).toEqual(expectedObject);
    });
  });

  describe('getCookie', () => {
    test('should return value for provided name', () => {
      const cookieName = 'kenobi';

      expect(getCookie(cookieName)).toEqual(expectedObject[cookieName]);
    });

    test('should return undefined if no value found', () => {
      expect(getCookie('someUnexpectedCookieName')).toEqual(undefined);
    });
  });
});
