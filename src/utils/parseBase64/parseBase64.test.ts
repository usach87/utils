import { parseBase64 } from './parseBase64';

describe('parseBase64', () => {
  test('should parse valid JSON encoded as base64 string', () => {
    const result = parseBase64('eyAia2VrIjogImNoZWJ1cmVrIiB9');
    const expectedObject = { kek: 'cheburek' };

    expect(result).toEqual(expectedObject);
  });

  test('should return undefined for invalid JSON encoded as base64 string', () => {
    const result = parseBase64('0L/QtdC70YzQvNC10L3QuA==');

    expect(result).toEqual(undefined);
  });
});
