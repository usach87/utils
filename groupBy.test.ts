import { groupBy, groupByKey, groupByKeys } from './groupBy';

interface IFakeItem {
  id: number;
  name: string;
  field1?: string;
  field2?: string;
}

describe('groupBy', () => {
  describe('groupBy', () => {
    test('if empty list is passed then empty object is returned', () => {
      const list: IFakeItem[] = [];

      const result = groupBy(list, 'id');

      expect(result).toEqual({});
    });

    test('if list contained items with duplicated ids and id key are passed'
      + ' then result has the last of duplicated items', () => {
      const id = 11;
      const anotherId = 999;

      const item1 = { id, name: 'First item' };
      const item2 = { id, name: 'Second item' };
      const item3 = { id: anotherId, name: 'Third item' };

      const list: IFakeItem[] = [
        { ...item1 },
        { ...item2 },
        { ...item3 },
      ];

      const expectedResult = {
        [id]: [item1, item2],
        [anotherId]: [item3],
      };

      const result = groupBy(list, 'id');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('groupByKey', () => {
    test('if empty list is passed then empty object is returned', () => {
      const list: IFakeItem[] = [];

      const result = groupByKey(list, 'id');

      expect(result).toEqual({});
    });

    test('if not empty list and id key are passed then result consists of objects grouped by id is returned', () => {
      const item1 = {
        id: 1,
        name: 'First item',
      };

      const item2 = {
        id: 2,
        name: 'Second item',
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

      const result = groupByKey(list, 'id');

      expect(result).toEqual(expectedResult);
    });

    test('if list contained items with duplicated ids and id key are passed'
      + ' then result has the last of duplicated items', () => {
      const id = 11;

      const item1 = {
        id,
        name: 'First item',
      };

      const item2 = {
        id,
        name: 'Second item',
      };

      const list: IFakeItem[] = [{
        ...item1,
      }, {
        ...item2,
      }];

      const expectedResult = {
        [id]: item2,
      };

      const result = groupByKey(list, 'id');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('groupByKeys', () => {
    test('if empty list is passed then empty object is returned', () => {
      const list: IFakeItem[] = [];

      const result = groupByKeys(list, ['id']);

      expect(result).toEqual({});
    });

    test('if not empty list and several keys are passed'
      + ' then result consists of objects grouped by keys is returned', () => {
      const id1 = 1;
      const id2 = 2;
      const commonField2 = 'common-field2';

      const item1 = {
        id: id1,
        name: 'First item',
        field1: 'First field1',
        field2: commonField2,
      };

      const item2 = {
        id: id2,
        name: 'Second item',
        field1: 'First field2',
        field2: commonField2,
      };

      const item3 = {
        id: id2,
        name: 'Third item',
        field1: 'First field3',
        field2: commonField2,
      };

      const list: IFakeItem[] = [{
        ...item1,
      }, {
        ...item2,
      }, {
        ...item3,
      }];

      const expectedResult = {
        [id1]: {
          [commonField2]: {
            'First field1': item1,
          },
        },
        [id2]: {
          [commonField2]: {
            'First field2': item2,
            'First field3': item3,
          },
        },
      };

      const result = groupByKeys(list, ['id', 'field2', 'field1']);

      expect(result).toEqual(expectedResult);
    });
  });
});
