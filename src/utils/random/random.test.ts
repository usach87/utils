import {
  lcg, plainId, timeString, colorHEX, getTimestamp,
} from './random';

describe('lcg', () => {
  test('should return zero if no arguments are passed', () => {
    const result = lcg();

    expect(result).toEqual(0);
  });

  test('should return a pseudo-random number', () => {
    const result = lcg('test', 10);
    const expectedResult = 8;

    expect(result).toEqual(expectedResult);
  });
});

describe('plainId', () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function randomCall(fn: Function) {
    return fn(plainId());
  }

  test('should return any string', () => {
    const mock = jest.fn();

    randomCall(mock);
    expect(mock).toBeCalledWith(expect.any(String));
  });
});

describe('timeString', () => {
  const originalDate = Date;

  beforeEach(() => {
    const MOCK_DATE = new Date(Date.UTC(2020, 0, 1, 0, 0, 0));

    (global as any).Date = jest.fn(() => MOCK_DATE);
    global.Date.UTC = originalDate.UTC;
    global.Date.parse = originalDate.parse;
    global.Date.now = originalDate.now;
  });

  afterEach(() => {
    global.Date = originalDate;
  });

  test('should create correct now Date', () => {
    const now = timeString();

    expect(now).toEqual('2020-01-01T00:00:00.000Z');
  });

  test('should return timestamp', () => {
    const clientTimestamp = getTimestamp();

    expect(clientTimestamp).toEqual(1577836800000);
  });

  test('should return timestamp in seconds', () => {
    const clientTimestamp = getTimestamp(true);

    expect(clientTimestamp).toEqual(1577836800);
  });
});

describe('colorHEX', () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function randomCall(fn: Function) {
    return fn(colorHEX());
  }

  test('should return any string', () => {
    const mock = jest.fn();

    randomCall(mock);
    expect(mock).toBeCalledWith(expect.any(String));
  });
});
