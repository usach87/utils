enum MouseEventButtonType {
  Main = 0,
  Auxiliary = 1,
  Secondary = 2,
  Fourth = 3,
  Fifth = 4,
}

export type RemoveEventListener = () => void;

export function forEachElementsBySelector(
  parentElement: HTMLElement,
  selector: string,
  callback: (element: HTMLElement) => void,
): void {
  const elements = parentElement.querySelectorAll(selector);

  if (elements && elements.length > 0) {
    // Fix for Google Chrome < v49
    Array.prototype.forEach.call(elements, callback);
  }
}

/**
 * Helper function to emulate middle button click listener. Because IE and Safari don't support auxclick event.
 */
export function addOnMiddleButtonClickEventListener(
  element: HTMLElement,
  listener: EventListener,
): RemoveEventListener {
  let removeMouseUpEventListener: RemoveEventListener | null = null;

  const isAuxiliaryButtonEvent = (event: MouseEvent) => event.button === MouseEventButtonType.Auxiliary;

  const mouseDownListener = (event: MouseEvent) => {
    if (!isAuxiliaryButtonEvent(event)) {
      return;
    }

    if (!event.target) {
      return;
    }

    const mouseUpListener = (mouseUpEvent: MouseEvent) => {
      if (isAuxiliaryButtonEvent(mouseUpEvent)) {
        listener(mouseUpEvent);
      }
    };

    removeMouseUpEventListener = () => {
      if (!event.target) {
        return;
      }

      event.target.removeEventListener('mouseup', mouseUpListener);
    };

    event.target.addEventListener('mouseup', mouseUpListener, { once: true });

    /**
     * Если нажать кнопку над element, а опустить в другом месте, то mouseUpListener-ы будут копиться.
     * Для того, чтобы это не происходило, добавлено удаление этого listener-а, если mouseup событие всплывет
     * до window.
     */
    window.addEventListener('mouseup', removeMouseUpEventListener, { once: true });
  };

  element.addEventListener('mousedown', mouseDownListener);

  return () => {
    element.removeEventListener('mousedown', mouseDownListener);

    if (removeMouseUpEventListener) {
      removeMouseUpEventListener();
    }
  };
}

export function addOnClickListenerToHyperlinks(
  parentElement: HTMLElement,
  listener: EventListener,
): RemoveEventListener {
  const arrayOfFunctionsToRemoveEventListener: RemoveEventListener[] = [];

  forEachElementsBySelector(parentElement, 'a', (element) => {
    element.addEventListener('click', listener);
    arrayOfFunctionsToRemoveEventListener.push(() => element.removeEventListener('click', listener));

    arrayOfFunctionsToRemoveEventListener.push(addOnMiddleButtonClickEventListener(element, listener));
  });

  return () => {
    arrayOfFunctionsToRemoveEventListener.forEach((removeListener) => removeListener());
  };
}
