import { getLocalStorageItem, setLocalStorageItem } from './localStorage';

describe('localStorage', () => {
  describe('getLocalStorageItem', () => {
    test('should get item from localStorage', () => {
      const value = 'my cool local storage value';
      const key = 'dataKey';

      localStorage.setItem(key, value);

      expect(getLocalStorageItem(key)).toEqual(value);
    });

    test('should return empty string for non-existing value', () => {
      expect(getLocalStorageItem('key')).toEqual('');
    });
  });

  describe('setLocalStorageItem', () => {
    test('should set value by provided key', () => {
      const value = 'my cool local storage value';
      const key = 'dataKey';

      setLocalStorageItem(key, value);

      expect(localStorage.getItem(key)).toEqual(value);
    });
  });
});
