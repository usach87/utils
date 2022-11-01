import { mergeDeep } from './mergeDeep';

describe('mergeDeep', () => {
  test('should return new object with values from provided objects', () => {
    const listOfObjects = [
      { a: 1 },
      { b: 2, bar: 'foo' },
      { foo: 'bar' },
    ];
    const expectedObject = {
      a: 1,
      b: 2,
      bar: 'foo',
      foo: 'bar',
    };

    expect(mergeDeep(...listOfObjects)).toEqual(expectedObject);
  });

  test('should overwrite primitive values with same name', () => {
    const listOfObjects = [
      { a: 1 },
      { a: 2 },
      { a: 'he who remains' },
    ];
    const expectedObject = {
      a: 'he who remains',
    };

    expect(mergeDeep(...listOfObjects)).toEqual(expectedObject);
  });

  test('should make deep merge of object values', () => {
    const listOfObjects = [
      { a: { b: { c: 1 } } },
      { a: { b: { d: 2 } } },
      { a: { b: { e: 3 } } },
    ];
    const expectedObject = {
      a: { b: { c: 1, d: 2, e: 3 } },
    };

    expect(mergeDeep(...listOfObjects)).toEqual(expectedObject);
  });

  test('should concat array values', () => {
    const listOfObjects = [
      { a: { b: { c: ['one'] } } },
      { a: { b: { c: ['two'] } } },
      { a: { b: { c: ['three'] } } },
    ];
    const expectedObject = {
      a: { b: { c: ['one', 'two', 'three'] } },
    };

    expect(mergeDeep(...listOfObjects)).toEqual(expectedObject);
  });
});
