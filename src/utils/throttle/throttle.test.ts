import { throttle } from './throttle';
import Mock = jest.Mock;

let handleFunc: Mock;

describe('throttle', () => {
  beforeEach(() => {
    handleFunc = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should not call passed func until provided time is passed', () => {
    jest.useFakeTimers();
    const throttledFunc = throttle(handleFunc, 500);

    throttledFunc();
    throttledFunc();

    jest.runAllTimers();

    expect(handleFunc).toHaveBeenCalledTimes(1);
  });

  test('should allow to call passed func when provided time is passed', () => {
    jest.useFakeTimers();
    const throttledFunc = throttle(handleFunc, 500);

    throttledFunc();
    jest.runAllTimers();
    throttledFunc();

    expect(handleFunc).toHaveBeenCalledTimes(2);
  });
});
