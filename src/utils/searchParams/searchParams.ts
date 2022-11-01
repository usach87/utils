import { trimObjectStringValuesV2 } from '../trimObjectStringValues/trimObjectStringValues';

export function stringifySearchParams<T extends { [key: string]: any }>(params: T): string {
  return Object.keys(params)
    .reduce((acc: string[], name) => {
      if (!params[name]) {
        return acc;
      }

      const arr = Array.isArray(params[name])
        ? params[name].map(
          (value: string) => `${name}=${encodeURIComponent(value)}`,
        )
        : [`${name}=${encodeURIComponent(params[name])}`];

      return [...acc, ...arr];
    }, [])
    .join('&');
}

export function stringifySearchParamsV2<T extends { [key: string]: any }>(params: T, showEmpty?: boolean): string {
  return Object.keys(params)
    .reduce((acc: any, name) => {
      if (!params[name] && !showEmpty) {
        return acc;
      }

      const arr = Array.isArray(params[name])
        ? params[name].map((v: string) => `${name}=${v ? encodeURIComponent(v.toString()) : ''}`)
        : [`${name}=${params[name] ? encodeURIComponent(params[name].toString()) : ''}`];

      return [...acc, ...arr];
    }, [])
    .join('&');
}

export function parseSearchParams(search: string): { [key: string]: any; } {
  return search
    ? search
      .replace(/^\?/, '')
      .split('&')
      .reduce((dict: { [key: string]: any; }, pair) => {
        const [name, value] = pair.split('=');

        if (!name) {
          return dict;
        }

        const decodedValue = decodeURIComponent(value);

        return {
          ...dict,
          [name]: name in dict
            ? Array.isArray(dict[name])
              ? [...dict[name], decodedValue]
              : [dict[name], decodedValue]
            : decodedValue,
        };
      }, {})
    : {};
}

export function getSearchParam(search: string, param: string): string {
  const params = parseSearchParams(search);

  return params[param] || '';
}

export function getDomain(url: string): string {
  if (!url || !url.length) {
    return '';
  }

  const domain = url.match(
    /^(http:\/\/|https:\/\/)[A-Za-z0-9.-]+(?!.*\|\w*$)/gim,
  );

  return domain && domain.length ? domain[0] : '';
}

export function setQueryStringParams(
  url: string,
  params: { [key: string]: string },
): string {
  if (!url) {
    return '';
  }
  if (!params) {
    return url;
  }

  const [baseWithoutAnchor, anchor] = url.split('#', 2);
  const [partBase, query] = baseWithoutAnchor.split('?');

  const nextSearch = trimObjectStringValuesV2({
    ...parseSearchParams(query),
    ...params,
  });

  let partQuery = stringifySearchParams(nextSearch);

  if (partQuery && partQuery.indexOf('?') === -1) {
    partQuery = `?${partQuery}`;
  }

  const partAnchor = anchor ? `#${anchor}` : '';

  return [partBase, partQuery, partAnchor].join('');
}

export const normalizeQueryValue = (value?: string | string[], defaultValue = ''): string => (
  (Array.isArray(value) ? value[0] : value) || defaultValue
);
