type IStyleConfig = any;

interface List<T> extends ReadonlyArray<T> {
  readonly size: number;

  get(index: number, notSetValue?: T): T | undefined;
  set(index: number, value: T): List<T>;
  push(...values: T[]): List<T>;
  pop(): List<T>;
  unshift(...values: T[]): List<T>;
  shift(): List<T>;
  insert(index: number, value: T): List<T>;
  delete(index: number): List<T>;
  remove(index: number): List<T>;
  clear(): List<T>;
  update(index: number, updater: (value: T | undefined) => T): List<T>;
  map<U>(
    mapper: (value: T, index: number, iter: List<T>) => U,
    context?: unknown,
  ): List<U>;
  filter<S extends T>(
    predicate: (value: T, index: number, iter: List<T>) => value is S,
    context?: unknown,
  ): List<S>;
  filter(
    predicate: (value: T, index: number, iter: List<T>) => unknown,
    context?: unknown,
  ): List<T>;
  reduce<U>(
    reducer: (reduction: U, value: T, index: number, iter: List<T>) => U,
    initialReduction: U,
    context?: unknown,
  ): U;
  forEach(
    sideEffect: (value: T, index: number, iter: List<T>) => unknown,
    context?: unknown,
  ): number;
  find(
    predicate: (value: T, index: number, iter: List<T>) => unknown,
    context?: unknown,
    notSetValue?: T,
  ): T | undefined;
  first(notSetValue?: T): T | undefined;
  last(notSetValue?: T): T | undefined;
  includes(value: T): boolean;
  isEmpty(): boolean;
  count(): number;
  toArray(): T[];
  toJS(): unknown[];
}

declare module "immutable" {
  export { List };
}

declare module "*.png" {
  const value: any;
  export = value;
}

declare module "antd" {
  const value: any;
  export = {
    Progress: any
  }
}
declare module "classnames" {
  export = any
}
declare module "echarts" {
  export = any
}
