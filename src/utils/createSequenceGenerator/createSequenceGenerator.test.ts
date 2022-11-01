import { createSequenceGenerator } from './createSequenceGenerator';

describe('createSequenceGenerator', () => {
  describe('step of the sequence should equal 1 if no argument is passed', () => {
    const getId = createSequenceGenerator();

    test.each([
      [1, 1],
      [2, 2],
      [3, 3],
    ])('should return %i on %i call', (expectedId) => {
      const result = getId();

      expect(result).toEqual(expectedId);
    });
  });

  describe('step of the sequence should equal the passed argument', () => {
    const getId = createSequenceGenerator(-5);

    test.each([
      [-5, 1],
      [-10, 2],
      [-15, 3],
    ])('should return %i on %i call', (expectedId) => {
      const result = getId();

      expect(result).toEqual(expectedId);
    });
  });
});
