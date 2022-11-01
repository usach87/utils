export type ExtendProperties<T, E> = {
  [K in keyof T]: T[K] & E;
};

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PartialInsteadOf<T, K extends keyof T> = Partial<Omit<T, K>> & Required<Pick<T, K>>;

export type TAny = any;
