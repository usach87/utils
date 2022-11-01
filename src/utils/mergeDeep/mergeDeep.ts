interface IAnyObject {
  [key: string]: any;
}

const isObject = (obj: IAnyObject) => obj && typeof obj === 'object';

export const mergeDeep = (...objects: IAnyObject[]): IAnyObject => objects.reduce((acc, obj) => {
  Object.keys(obj).forEach((key) => {
    const pVal = acc[key];
    const oVal = obj[key];

    if (Array.isArray(pVal) && Array.isArray(oVal)) {
      acc[key] = pVal.concat(...oVal);
    } else if (isObject(pVal) && isObject(oVal)) {
      acc[key] = mergeDeep(pVal, oVal);
    } else {
      acc[key] = oVal;
    }
  });

  return acc;
}, {});
