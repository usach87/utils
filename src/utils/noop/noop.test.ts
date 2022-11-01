import { noop } from './noop';

describe('noop', () => {
  test('should be callable', () => {
    const object = { noop };
    const spying = jest.spyOn(object, 'noop');

    object.noop();

    expect(spying).toHaveBeenCalledTimes(1);
  });
});
