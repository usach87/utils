export interface IScroller {
  scrollTo: (to: number, duration: number) => void;
  cancelScroll: () => void;
}

function easeInOutQuad(currentTime: number, start: number, change: number, duration: number) {
  let time = currentTime;

  time /= duration / 2;

  if (time < 1) {
    return (change / 2) * time * time + start;
  }

  time -= 1;

  return (-change / 2) * (time * (time - 2) - 1) + start;
}

export function createScroller(element: HTMLElement): IScroller {
  let scrollId = 0;

  function cancelScroll() {
    scrollId += 1;
  }

  function scrollTo(to: number, duration: number) {
    cancelScroll();

    const start = element.scrollTop;
    const change = to - start;

    let startTimestamp = 0;

    const animateScroll = (timestamp: number, id: number) => {
      if (scrollId !== id) {
        return;
      }

      if (startTimestamp === 0) {
        startTimestamp = timestamp;
      }

      if (timestamp - startTimestamp < duration) {
        element.scrollTop = easeInOutQuad(timestamp - startTimestamp, start, change, duration);

        window.requestAnimationFrame((time) => animateScroll(time, id));
      }
    };

    window.requestAnimationFrame((time) => animateScroll(time, scrollId));
  }

  return {
    cancelScroll,
    scrollTo,
  };
}

export function getScrollHeight(element: HTMLElement): number {
  return Math.max(element.scrollHeight, element.offsetHeight, element.clientHeight);
}

interface IOptions {
  behavior: 'smooth' | 'auto',
  block: 'center' | 'end' | 'start' | 'nearest';
}

export const scrollElementById = (elementId: string, options?: IOptions): void => {
  const element = document.getElementById(elementId);

  if (!element) {
    return;
  }

  const { behavior = 'smooth', block = 'center' } = options || {};

  // TODO: для ие 11 и сафари не будет анимации, нужен полифилл
  element.scrollIntoView({
    behavior,
    block,
  });
};
