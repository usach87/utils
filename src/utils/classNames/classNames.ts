export interface ClassDictionary {
  [key: string]: any;
}
export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
export interface ClassArray extends Array<ClassValue> { }

function toVal(mix: any) {
  let k;
  let y;
  let str = '';

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          y = toVal(mix[k]);
          if (y) {
            if (str) {
              str += ' ';
            }
            str += y;
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix[k]) {
          if (str) {
            str += ' ';
          }
          str += k;
        }
      }
    }
  }

  return str;
}

export function classNames(...args: ClassValue[]): string {
  let i = 0;
  let tmp;
  let x;
  let str = '';

  while (i < args.length) {
    tmp = args[i++];
    if (tmp) {
      x = toVal(tmp);
      if (x) {
        if (str) {
          str += ' ';
        }
        str += x;
      }
    }
  }

  return str;
}
