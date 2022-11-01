import { getItemsById } from './getItemsById';

interface IFakeItem {
  id: string;
  value: string;
}

describe('getItemsById', () => {
  test('if empty list is passed then empty object is returned', () => {
    const list: IFakeItem[] = [];

    const result = getItemsById(list);

    expect(result).toEqual({});
  });

  test('should return an object by ID of the list items', () => {
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

    const result = getItemsById(list);

    expect(result).toEqual(expectedResult);
  });
});
