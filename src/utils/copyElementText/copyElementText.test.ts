import { copyElementText } from './copyElementText';

const originExecCommand = document.execCommand;
const originClipboard = window.navigator.clipboard;

describe('copyElementText', () => {
  beforeAll(() => {
    document.execCommand = jest.fn();

    Object.defineProperty(window.navigator, 'clipboard', {
      value: {
        writeText: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterAll(() => {
    document.execCommand = originExecCommand;

    Object.defineProperty(window.navigator, 'clipboard', {
      value: originClipboard,
      writable: false,
    });
  });

  test('should call writeText method of clipboard with inner text of passed element', async () => {
    const element = document.createElement('span');

    element.innerText = 'test';

    await copyElementText(element);

    expect(window.navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(window.navigator.clipboard.writeText).toBeCalledWith('test');
  });

  test('should call writeText method of clipboard with empty string'
    + ' when passed element has no inner text', async () => {
    const element = document.createElement('span');

    element.innerText = '';

    await copyElementText(element);

    expect(window.navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(window.navigator.clipboard.writeText).toBeCalledWith('');
  });

  test('should throw exception when writeText is failed and window has no selection object', async () => {
    const element = document.createElement('span');

    element.innerText = 'test';

    (window.navigator.clipboard.writeText as jest.Mock).mockRejectedValue(null);
    jest.spyOn(window, 'getSelection').mockReturnValue(null);

    await expect(copyElementText(element)).rejects.toThrow('Copying to clipboard is not available');
  });

  test('should not throw exception and call execCommand'
    + ' when writeText is failed and window has selection object', async () => {
    const element = document.createElement('span');

    element.innerText = 'test';

    (window.navigator.clipboard.writeText as jest.Mock).mockRejectedValue(null);
    jest.spyOn(window, 'getSelection');

    await expect(copyElementText(element)).resolves.toBeUndefined();
    expect(window.getSelection).toHaveLastReturnedWith(expect.any(Selection));
    expect(document.execCommand).toBeCalledWith('copy');
  });
});
