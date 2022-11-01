import { uniqBy } from './uniqBy';

interface IFakeItem {
  id: number;
  name: string;
}

describe('uniqBy', () => {
  test('if empty list is passed then empty list is returned', () => {
    const list: IFakeItem[] = [];

    const result = uniqBy(list, (item) => item.id);

    expect(result).toEqual([]);
  });

  test('if list contained items with duplicate ids is passed and comparator returns id'
    + ' then result contains only the first of duplicated items', () => {
    const id = 1100;
    const anotherId = 999;

    const item1 = { id, name: 'First item' };
    const item2 = { id, name: 'Second item' };
    const item3 = { id: anotherId, name: 'Third item' };
    const item4 = { id, name: 'Fourth item' };

    const list: IFakeItem[] = [
      { ...item1 },
      { ...item2 },
      { ...item3 },
      { ...item4 },
    ];

    const result = uniqBy(list, (item) => item.id);

    expect(result).toEqual([item1, item3]);
  });
});
