// This file demonstrates using multiple generic overloads
class NestedKey<
  /**
   * Generic to represent the unique string constant for this route
   */
  Key extends string
> {
  constructor(
    /**
     * Distinct `key` used to identify this route uniquely in the application from other registered component routes
     */
    public readonly key: Key,
    public readonly children?: NestedKey<Key>[]
  ) {}

  static create<Key extends string>({
    key,
    children,
  }: {
    key: Key;
    children?: NestedKey<Key>[];
  }) {
    return new NestedKey<Key>(key, children);
  }
}

const FIRST = NestedKey.create({
  // 'first'
  key: 'first',
});
const SECOND = NestedKey.create({
  // 'first' | 'second'
  key: 'second',
  children: [FIRST],
});

//
//
//
//

type DynamicParam<S extends string> = `:${S}`;

/**
 * Given a string literal generic,
 * DynamicParamPath defines a string that requires all the literals in the generic be included as route parameters `:{param}`
 */
type DynamicParamPath<T extends string> = (
  T extends any
    ? (
        x:
          | `${string}/${DynamicParam<T>}/${string}`
          | `${DynamicParam<T>}/${string}`
          | `${string}/${DynamicParam<T>}`
          | `${DynamicParam<T>}`
      ) => void
    : never
) extends (x: infer I) => void
  ? I
  : never;

//
//
//
//

class ParamConstrainedPath<ParamKeys extends string> {
  constructor(
    public readonly path: DynamicParamPath<ParamKeys>,
    public readonly params?: Record<ParamKeys, any>
  ) {}

  static create<ParamKeys extends string>({
    path,
    params,
  }: {
    path: DynamicParamPath<ParamKeys>;
    params?: Record<ParamKeys, any>;
  }) {
    return new ParamConstrainedPath(path, params);
  }
}

/**
 * These params will enforce a path mathing the following string literal type:
 * ```
 * ":test" | `${string}/:test/${string}` | `:test/${string}` | `${string}/:test`
 * ```
 */
const params = {
  test: 'something',
};

//
//
// ERROR FORMATS
//
//
// should force `path` to include `:test:
const PARAM_ERROR = ParamConstrainedPath.create({
  // no bueno - '*' is for a path that is not parameterized
  path: '*',
  params,
});
// 'test' is not a parameter for a path - parameter MUST be ':test'
const PARAM_ENFORCED_ERROR = ParamConstrainedPath.create({
  path: 'test',
  params,
});

// suffixes to a path parameter MUST be after a `/` -  `:test/${string}`
const PARAM_ENFORCED_SUFFIX_ERROR = ParamConstrainedPath.create({
  path: 'test-with-suffix',
  params,
});

// prefixes to a path parameter MUST be before a `/` -  `${string}/:test`
const PARAM_ENFORCED_PREFIX_ERROR = ParamConstrainedPath.create({
  path: 'prefix-for-test',
  params,
});

//
//
// VALID FORMATS
//
//
// Just the parameter `:test`
const PARAM_ENFORCED = ParamConstrainedPath.create({
  path: ':test',
  params,
});
// Parameter with arbitrary amount of suffixes :test + (`/string`)
const PARAM_ENFORCED_SUFFIX = ParamConstrainedPath.create({
  path: ':test/some/path/suffixes',
  params,
});
// Parameter with arbitrary amount of prefixes (`string/`) + :test
const PARAM_ENFORCED_PREFIX = ParamConstrainedPath.create({
  path: 'prefix1/prefix2/:test',
  params,
});
// Parameter with arbitrary amount of prefixes and suffixes (`string/`) + :test + (`/string`)
const PARAM_ENFORCED_PREFIX_SUFFIX = ParamConstrainedPath.create({
  path: 'prefix1/prefix2/:test/suffix1/suffix2',
  params,
});

//
//
//
//
//

/**
 * A Route defines a unique location in an application identified by its `key` string literal.
 *
 * A Route can be nested 0...N levels deep through its optional `children` array property
 */
class Route<Key extends string> extends NestedKey<Key> {
  constructor(
    /**
     * Distinct `key` used to identify this route uniquely in the application from other registered component routes
     */
    key: Key,
    /**
     * Optional children for nesting 0...N deep
     */
    children?: NestedKey<Key>[]
  ) {
    super(key, children);
  }

  static override create<Key extends string>({
    key,
    children,
  }: {
    key: Key;
    children?: Route<Key>[];
  }) {
    return new Route<Key>(key, children);
  }
}

// Route<"route 1">
const ROUTE_1 = Route.create({
  key: 'route 1',
});

// Route<"route 1" | "route 2">
const ROUTE_2 = Route.create({
  key: 'route 2',
  children: [ROUTE_1],
});

//Route<"route 1" | "route 2" | "route 3">
const ROUTE_3 = Route.create({
  key: 'route 3',
  children: [ROUTE_2],
});

// https://stackoverflow.com/questions/49580316/typescript-class-overloading
// overloading a class constructor
export abstract class Abstract<Key extends string, Path> {
  constructor(public readonly key: Key, public readonly path: Path) {}

  static abstractStaticFunc() {
    return true;
  }
}

export class MyClass<Key extends string> extends Abstract<Key, string> {
  constructor(key: Key, path: string) {
    super(key, path);
  }

  static create<Key extends string>({ key, path }: { key: Key; path: string }) {
    return new MyClass<Key>(key, path);
  }
}

export class MyParamClass<
  Key extends string,
  ParamKeys extends string
> extends Abstract<Key, DynamicParamPath<ParamKeys>> {
  constructor(
    key: Key,
    public override readonly path: DynamicParamPath<ParamKeys>,
    public readonly params: Record<ParamKeys, string>
  ) {
    super(key, path);
  }
  static create<Key extends string, ParamKeys extends string>({
    key,
    path,
    params,
  }: {
    key: Key;
    path: DynamicParamPath<ParamKeys>;
    params: Record<ParamKeys, string>;
  }) {
    return new MyParamClass<Key, ParamKeys>(key, path, params);
  }
}

const Both: typeof MyParamClass & typeof MyClass = MyParamClass as any;

const a = new Both('a', '');
const b = new Both('b', ':content/:meta', {
  content: 'something',
  meta: 'things',
});

const a2 = Both.create({
  key: 'a',
  path: '*',
});

const b2 = Both.create({
  key: 'b',
  path: ':param1',
  params: {
    param1: 'test',
  },
});
// error - missing param1
const b2_error = Both.create({
  key: 'b',
  path: ':para1',
  params: {
    param1: 'test',
  },
});

a.key; //?
b.key; //?
b.params; //?
a.params; //?
b.path; //?
a.path; //?

// statics work
Both.abstractStaticFunc(); //?
