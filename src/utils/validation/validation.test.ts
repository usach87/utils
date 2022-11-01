import { validateCyrillicName, validateEmail } from './validation';

describe('validation', () => {
  describe('validateEmail', () => {
    test.each([
      ['email@example.com', true],
      ['firstname.lastname@example.com', true],
      ['email@subdomain.example.com', true],
      ['firstname+lastname@example.com', true],
      ['email@[123.123.123.123]', true],
      ['"email"@example.com', true],
      ['1234567890@example.com', true],
      ['email@example-one.com', true],
      ['_______@example.com', true],
      ['email@example.name', true],
      ['email@example.museum', true],
      ['email@example.co.jp', true],
      ['firstname-lastname@example.com', true],

      ['plainaddress', false],
      ['#@%^%#$@#$@#.com', false],
      ['@example.com', false],
      ['Joe Smith <email@example.com>', false],
      ['email.example.com', false],
      ['email@example@example.com', false],
      ['.email@example.com', false],
      ['email.@example.com', false],
      ['email..email@example.com', false],
      ['email@example.com (Joe Smith)', false],
      ['email@example', false],
      ['email@111.222.333.44444', false],
      ['email@example..com', false],
      ['Abc..123@example.com', false],
      ['”(),:;<>[\]@example.com', false],
      ['this\ is"really"not\allowed@example.com', false],
    ])('email address %s should give validation result: %s', (email, expectedIsValid) => {
      expect(validateEmail(email)).toEqual(expectedIsValid);
    });
  });

  describe('validateCyrillicName', () => {
    test.each([
      ['василий', true],
      ['Василий', true],
      ['василий пупкин', true],
      ['Василий Пупкин', true],
      ['Василий Пупкин-Корсаков', true],

      ['vasily', false],
      ['василий 666', false],
      ['__василий__', false],
      ['Василий (Пупкин)', false],
    ])('name %s should give validation result: $s', (name, expectedIsValid) => {
      expect(validateCyrillicName(name)).toEqual(expectedIsValid);
    });
  });
});
