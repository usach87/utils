import { promiseDelay } from './promiseDelay';

describe('promiseDelay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test('should not resolve until timeout has elapsed', async () => {
    const spy = jest.fn();

    promiseDelay(100).then(spy);

    jest.advanceTimersByTime(80);
    await Promise.resolve();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('should resolve until timeout has elapsed', async () => {
    const spy = jest.fn();

    promiseDelay(100).then(spy);

    jest.advanceTimersByTime(200);
    await Promise.resolve();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
