import { decimaltoHex } from '../decimaltoHex/decimaltoHex';

/**
 * Возвращает псевдослучайное число в зависимости от строки
 * @see https://en.wikipedia.org/wiki/Linear_congruential_generator
 * @param value
 * @param max
 */
export function lcg(value?: string, max?: number): number {
  if (!(value && max)) {
    return 0;
  }
  const charCodes = [...value].map((l) => l.charCodeAt(0));
  const len = charCodes.length;
  const a = (len % (max - 1)) + 1;
  const c = charCodes.reduce((current, next) => current + next) % max;
  let random = charCodes[0] % max;

  for (let i = 0; i < len; i += 1) {
    random = (a * random + c) % max;
  }

  return random;
}

/**
 * Возвращает случайную строку
 * @param length
 */
export function plainId(length = 8): string {
  return [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
}

/**
 * Возвращает случайную строку в формате ISO-8601
 */
export function timeString(randomizeDate = false):string {
  if (randomizeDate) {
    return new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)).toISOString();
  }

  return new Date().toISOString();
}

/**
 * Возвращает случайную строку с hex цветом
 * @param withLeadingSharp
 */
export function colorHEX(withLeadingSharp = false):string {
  let r;
  let g;
  let b;
  let rg;
  let gb;
  let rb;
  const range = 255;
  const sep = range / 4;

  do {
    r = Math.floor(Math.random() * range);
    g = Math.floor(Math.random() * range);
    b = Math.floor(Math.random() * range);
    rg = Math.abs(r - g);
    gb = Math.abs(g - b);
    rb = Math.abs(r - b);
  } while (rg < sep || gb < sep || rb < sep);

  return [withLeadingSharp ? '#' : '', decimaltoHex(r), decimaltoHex(g), decimaltoHex(b)].join('');
}

/**
 * Возвращает случайный элемент списка
 * @param arr
 */
export function arrayElement(arr: any[]): any {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Возвращает метку времени
 * @param inSeconds
 */
export function getTimestamp(inSeconds = false):number {
  if (inSeconds) {
    return Math.round(new Date().getTime() / 1000);
  }

  return new Date().getTime();
}
