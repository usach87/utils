import { guid } from './guid';

describe('guid', () => {
  test('should generate guid string', () => {
    const testRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;

    expect(guid()).toMatch(testRegex);
  });
});
