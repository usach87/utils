export const trimObjectStringValues = (value: { [key: string]: any }) => {
  const type = typeof value;
  const target = value;

  if (!!target && type === 'object') {
    return Object.keys(target).reduce((acc, key) => {
      if (target[key] && typeof target[key] === 'string') {
        target[key] = target[key].trim();
      }

      return acc;
    }, target);
  }

  return target;
};

export const trimObjectStringValuesV2 = <T extends { [key: string]: any }>(target: T): T => {
  const type = typeof target;

  if (!!target && type === 'object') {
    return Object.keys(target).reduce((acc, key) => {
      if (acc[key] && typeof acc[key] === 'string') {
        return {
          ...acc,
          [key]: acc[key].trim(),
        };
      }

      return acc;
    }, target);
  }

  return target;
};
