import { convertBytesToKb } from './convertBytesToKb';

describe('convertBytesToKb', () => {
  test('should convert bytes to kilobytes', () => {
    const bytes = 2048;
    const kB = 2;

    const result = convertBytesToKb(bytes);

    expect(result).toEqual(kB);
  });

  test('should round kilobytes to ceil', () => {
    const bytes = 2049;
    const kB = 3;

    const result = convertBytesToKb(bytes);

    expect(result).toEqual(kB);
  });
});
