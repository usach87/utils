import { canUseDOM } from './canUseDOM';

describe('canUseDOM', () => {
  const { window } = global;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete global.window;
  });
  afterAll(() => {
    global.window = window;
  });
  test('when window is undefined', () => {
    const result = canUseDOM();

    expect(result).toEqual(false);
  });
});
