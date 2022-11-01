type TAnyDict = {
  [key: string]: any;
}

export type TDataQAResult = {
  [key: string]: string;
}

type TDataQAKey = string | TAnyDict;
type TDataQAValue = string | number | TAnyDict | undefined | null;

// Приводим ключ к lower-kebab-case
const normalizeKey = (() => {
  const RE_ALL_THE_THINGS = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;

  return (str = ''): string => {
    const matchedStr = str.match(RE_ALL_THE_THINGS) ?? [];

    return matchedStr.join('-').toLowerCase()
  };
})();

const DEFAULT_QA_PREFIX = 'data-qa';
const DEFAULT_LOCATOR_PROPERTY = 'data-qa-locator';

export const buildLocator = (key: string, skipPrefix = false): string => {
  if (!key) {
    return DEFAULT_QA_PREFIX;
  }

  if (skipPrefix) {
    return normalizeKey(`${key}`);
  }

  return `${DEFAULT_QA_PREFIX}-${normalizeKey(`${key}`)}`;
};

// Собираем data-qa-key="value"
export const buildProperty = (key: string, value: TDataQAValue = null): TDataQAResult => {
  const prop = buildLocator(key);

  if (typeof value !== 'string') {
    value = JSON.stringify(value, null, 0);
  }

  if (value && prop === DEFAULT_LOCATOR_PROPERTY) {
    value = buildLocator(value, true);
  }

  return {
    [prop]: value,
  };
};

/**
 * ex:
 * {...dataQA({
        locator: 'progress',
        value,
      })}
 {...dataQA('Hello Cruel     World', { a: 1, b: [1, 2, 3], c: null })}
 {...dataQA('some-random-   data-Prop')}
 {...dataQA('shouldSplitThisString')}
 *
 * =>
 *  data-qa-locator="progress"
 *  data-qa-value="10"
 *  data-qa-hello-cruel-world="{&quot;a&quot;:1,&quot;b&quot;:[1,2,3],&quot;c&quot;:null}"
 *  data-qa-some-random-data-prop="null"
 *  data-qa-should-split-this-string="null"
 */
export const dataQA = (key: TDataQAKey, value?: TDataQAValue): TDataQAResult => {
  if (typeof key === 'string') {
    if (value) {
      return buildProperty(key, value);
    }

    return buildProperty('locator', key);
  }

  return Object.keys(key)
    .reduce((memo: TDataQAResult, prop: string) => ({
      ...memo,
      ...buildProperty(prop, key[prop]),
    }), {});
};

type TProps = { [key: string]: any };
type TDataQAProps = { [key: string]: string };

export const extractDataQAFromProps = (props: TProps): TDataQAProps => (
  Object.keys(props).reduce((acc, key) => (
    key.includes(DEFAULT_QA_PREFIX) ? { ...acc, [key]: `${props[key]}` } : acc
  ), {})
);

export const getQALocatorSelector = (selector: string): string => {
  const [key, value] = Object.entries(buildProperty('locator', selector))[0];

  return `[${key}="${value}"]`;
};
