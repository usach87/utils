import { debounce, debounceV4, debounceV3 } from './debounce';

import Mock = jest.Mock;

let handleFunc: Mock;

describe('debounce', () => {
  beforeEach(() => {
    handleFunc = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should to mock timers correctly', () => {
    jest.useFakeTimers();
    const debounced = debounce(handleFunc, 1000);

    debounced.debounced();
    debounced.debounced();

    jest.runAllTimers();

    expect(handleFunc).toHaveBeenCalledTimes(1);
  });
});

describe('debounceV3', () => {
  beforeEach(() => {
    handleFunc = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should mock timers correctly', () => {
    jest.useFakeTimers();
    const debounced = debounceV3(handleFunc, 1000);

    debounced();
    debounced();

    jest.runAllTimers();

    expect(handleFunc).toHaveBeenCalledTimes(1);
  });
});

describe('debounceV4', () => {
  beforeEach(() => {
    handleFunc = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should to mock timers correctly', () => {
    jest.useFakeTimers();
    const debounced = debounceV4(handleFunc, 1000);

    debounced.debounced();
    debounced.debounced();

    jest.runAllTimers();

    expect(handleFunc).toHaveBeenCalledTimes(1);
  });
});
