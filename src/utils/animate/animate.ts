export interface IAnimationOptions {
  ease?: (time: number) => number;
  duration?: number;
}

export type TAnimateType = 'scrollTop' | 'scrollLeft';

export function easeInOutSin(time: number): number {
  return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
}

export function animate(
  property: TAnimateType,
  element: HTMLElement,
  to: number,
  options: IAnimationOptions = {},
): () => void {
  const {
    ease = easeInOutSin,
    duration = 300,
  } = options;

  // TODO: jest dom mock
  let start: number | null = null;
  const from = element[property];
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
  };

  const step = (timestamp: number) => {
    if (cancelled) {
      return;
    }

    if (start === null) {
      start = timestamp;
    }
    const time = Math.min(1, (timestamp - start) / duration);

    // eslint-disable-next-line no-param-reassign
    element[property] = ease(time) * (to - from) + from;

    if (time >= 1) {
      return;
    }

    requestAnimationFrame(step);
  };

  if (from === to) {
    return cancel;
  }

  requestAnimationFrame(step);

  return cancel;
}
