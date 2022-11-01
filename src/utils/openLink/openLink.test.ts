import { openLink, openLinkV2 } from './openLink';

describe('openLink', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(() => {
    global.open = jest.fn();
  });

  test('should open provided link in new tab and with noopener noreferrer params', () => {
    const testUrl = 'https://google.com';

    openLink(testUrl);
    expect(global.open).toHaveBeenCalledTimes(1);
    expect(global.open).toHaveBeenCalledWith(testUrl, '_blank', 'noopener, noreferrer');
  });

  test('should do nothing if empty string provided', () => {
    openLink('');
    expect(global.open).toHaveBeenCalledTimes(0);
  });
});

describe('openLinkV2', () => {
  beforeAll(() => {
    global.open = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should open provided link in new tab and without noopener noreferrer params', () => {
    const testUrl = 'https://google.com';

    openLinkV2(testUrl);

    expect(global.open).toHaveBeenCalledTimes(1);
    expect(global.open).toHaveBeenCalledWith(testUrl, '_blank');
  });

  test('should do nothing if empty string provided', () => {
    openLinkV2('');

    expect(global.open).toHaveBeenCalledTimes(0);
  });
});
