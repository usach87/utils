import { arrayToObject } from './arrayToObject';

interface IFakeItem {
  id: string;
  value: string;
}

describe('arrayToObject', () => {
  test('if empty list is passed then empty object is returned', () => {
    const list: IFakeItem[] = [];

    const result = arrayToObject(list, 'id');

    expect(result).toEqual({});
  });

  test('if not empty list and id key are passed then result consists of objects grouped by id is returned', () => {
    const item1 = {
      id: '1',
      value: 'First item',
    };

    const item2 = {
      id: '2',
      value: 'Second item',
    };

    const list: IFakeItem[] = [{
      ...item1,
    }, {
      ...item2,
    }];

    const expectedResult = {
      1: item1,
      2: item2,
    };

    const result = arrayToObject(list, 'id');

    expect(result).toEqual(expectedResult);
  });
});
