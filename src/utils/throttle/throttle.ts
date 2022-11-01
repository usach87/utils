// eslint-disable-next-line @typescript-eslint/ban-types
export function throttle(fn: Function, timeout: number): () => void {
  let isCalled = false;

  return (...args: any[]) => {
    if (!isCalled) {
      fn(...args);
      isCalled = true;
      setTimeout(() => {
        isCalled = false;
      }, timeout);
    }
  };
}
