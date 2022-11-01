import { buildLocator, dataQA } from './dataQA';

const PREFIX = 'data-qa';

describe('dataQA', () => {
  it('сохраняет префикс локаторов', () => {
    expect(buildLocator('')).toEqual(`${PREFIX}`);
    expect(buildLocator('test')).toEqual(`${PREFIX}-test`);
  });

  describe.each([
    ['Hello Cruel     World', `${PREFIX}-hello-cruel-world`],
    ['some-random-   data-Prop', `${PREFIX}-some-random-data-prop`],
    ['shouldSplitThisString', `${PREFIX}-should-split-this-string`],
  ])('правильно сериализует ключ %s', (key, expected) => {
    it(`should return ${expected}`, () => {
      expect(buildLocator(key)).toBe(expected);
    });
  });

  it('для одного параметра подставляет locator', () => {
    expect(dataQA('test')).toEqual({ [`${PREFIX}-locator`]: 'test' });
  });

  it('формирует правильный объект', () => {
    expect(dataQA('onlyLocator')).toEqual({
      [`${PREFIX}-locator`]: 'only-locator',
    });

    expect(dataQA({ locator: 'progress', value: 1 })).toEqual({
      [`${PREFIX}-locator`]: 'progress',
      [`${PREFIX}-value`]: '1',
    });

    const randomValues = { a: 1, b: [1, 2, 3], c: null };

    expect(dataQA('Hello Cruel     World', randomValues)).toEqual({
      [`${PREFIX}-hello-cruel-world`]: JSON.stringify(randomValues, null, 0),
    });
  });
});
