interface DebounceResult<T> {
  debounced(...args: T[]): void;
  clear(): void;
}

export function debounce<T>(func: (...args: T[]) => void, wait: number): DebounceResult<T> {
  let timeout: NodeJS.Timeout;

  function debounced(...args: T[]) {
    const later = () => {
      // eslint-disable-next-line
      // @ts-ignore
      func.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }

  const clear = () => {
    clearTimeout(timeout);
  };

  return { clear, debounced };
}
