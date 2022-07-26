/**
 * Step 1. Define a class having a generic `key` property that `extends string` (allows us to go more narrow than `string`)
 * and a static `make` method that is a proxy call for the constructor using an object as the function argument
 */
class Keyed<K extends string> {
  constructor(public readonly key: K) {}

  static make<K extends string>({ key }: { key: K }) {
    return new Keyed(key);
  }

  static isKeyed<K extends string>(what: any): what is Keyed<K> {
    return what && what.key;
  }
}

/**
 * Prove that step 2 works
 *
 * Inferred type is:
 * const KEYED: Keyed<"keyed-uniquely">
 * (property) Keyed<"keyed-uniquely">.key: "keyed-uniquely"
 */
const KEYED = Keyed.make({
  key: 'keyed-uniquely',
});

function takesKeyed<K extends string>(keyed: Keyed<K>) {
  return keyed.key;
}
// `uniqueKey` type is 'keyed-uniquely'
const uniqueKey = takesKeyed(KEYED); //?

//
// Adding Parameters/Props
//

// Step 3. Extend `Keyed` by defining a generic `params` Record
class ParameterizedKeyed<K extends string, P extends string> extends Keyed<K> {
  constructor(key: K, public readonly params: Record<P, string>) {
    super(key);
  }

  static override make<K extends string, P extends string>({
    key,
    params,
  }: {
    key: K;
    params: Record<P, any>;
  }) {
    return new ParameterizedKeyed(key, params);
  }

  static isParameterized<K extends string, P extends string>(
    what: any
  ): what is ParameterizedKeyed<K, P> {
    return what && what.key && what.params;
  }
}

const KEYED_WITH_PARAMS = ParameterizedKeyed.make({
  key: 'keyed-with-unique-params',
  params: {
    param1: 'string value', // TODO: function to validate?
    param2: 'test',
  },
});

const KEYED_WITH_PARAMS_2 = ParameterizedKeyed.make({
  key: 'keyed-with-unique-params2',
  params: {
    paramA: 'string value',
    paramB: 'test',
  },
});

const BOTH_PARAMS = [KEYED_WITH_PARAMS, KEYED_WITH_PARAMS_2];

type OfEither = typeof BOTH_PARAMS[number];

// locked down once type starts matching
const testOfEither: OfEither = {
  key: 'keyed-with-unique-params2',
  params: {
    paramA: 'test',
    paramB: 'another test',
  },
};

/**
 * Need to define a function such that it can narrow down which args can be used, and force them into a specific once
 *
 * Without the generic and `& ParameterizedKeyed<K, P>` the resulting type is too broad, just unioning all the values.
 *
 * const b: ParameterizedKeyed<"keyed-with-unique-params", "param1" | "param2"> | ParameterizedKeyed<"keyed-with-unique-params2", "paramA" | "paramB">
 */
function useOfEither<K extends string, P extends string>(
  test: OfEither & ParameterizedKeyed<K, P>
) {
  // due to the function types, the following is optional really
  // if (ParameterizedKeyed.isParameterized(test)){
  //   return test
  // }
  return test;
}

const b = useOfEither({
  key: 'keyed-with-unique-params2',
  params: {
    paramA: 'test',
    paramB: 'test',
  },
});

function takesParamKeyed<K extends string, P extends string>(
  parakKeyed: ParameterizedKeyed<K, P>
) {
  return parakKeyed;
}

// `uniqueParamKey` is ParameterizedKeyed<"keyed-with-unique-params", "param1" | "param2">
const uniqueParamKey = takesParamKeyed(KEYED_WITH_PARAMS); //?

//
//
//
// Step 5. Put it together by overloading a generator function
/**
 * Returns a type-safe instance of Keyed or ParameterizedKeyed depending on the shape of the passed in argument
 */
function makeKeyedOrParameterized<K extends string, P extends string>(
  paramed: ParameterizedKeyed<K, P>
): ParameterizedKeyed<K, P>;
function makeKeyedOrParameterized<K extends string>(keyed: Keyed<K>): Keyed<K>;
function makeKeyedOrParameterized<K extends string, P extends string>(
  keyedOrParamKeyed: any
): any {
  if (ParameterizedKeyed.isParameterized(keyedOrParamKeyed)) {
    return ParameterizedKeyed.make(keyedOrParamKeyed);
  }
  if (Keyed.isKeyed(keyedOrParamKeyed)) {
    return Keyed.make;
  }
  return keyedOrParamKeyed;
}
//
//
//

const keyed = makeKeyedOrParameterized({
  key: 'keyed',
});

const parameterized = makeKeyedOrParameterized({
  key: 'parameterized-A',
  params: {
    paramA: 'test',
    'mikes-param': 'test2',
  },
});
const parameterized2 = makeKeyedOrParameterized({
  key: 'parameterized-B',
  params: {
    paramB: 'test',
    'mikes-param-B': 'test2',
  },
});

const ALL = [keyed, parameterized, parameterized2];

type EitherOfAll = typeof ALL[number];

/**
 * Using Contravariance to narrow down EitherOfAll type to only the ones matching Parameterized
 */
type ParameterizedOfAll<K extends string, P extends string> = (
  EitherOfAll extends any ? (x: ParameterizedKeyed<K, P>) => void : never
) extends (x: infer I) => void
  ? I
  : never;

function takesOneOfAll<K extends EitherOfAll['key'], P extends string>(
  ofAll: Extract<EitherOfAll, ParameterizedOfAll<K, P>>
): ParameterizedOfAll<K, P>;
function takesOneOfAll<K extends EitherOfAll['key']>(
  // ofAll: Exclude<EitherOfAll, Extract<EitherOfAll, ParameterizedOfAll<K, any>>>
  ofAll: EitherOfAll & Keyed<K>
): Keyed<K>;
function takesOneOfAll(ofAll: EitherOfAll) {
  return ofAll;
}

// CON: No suggestion for `key` value "keyed", but suggestions for "parameterized-A" and "parameterized-B" - WHY?
// PRO: right type: const testOneOfAllKeyed: Keyed<"keyed">,
const testOneOfAllKeyed = takesOneOfAll({
  key: 'keyed',
  // key: 'keyed',
  // key: keyed.key,
});

// PRO: compilation error when adding params to keyed only
const testOfAllExtraParams = takesOneOfAll({
  key: keyed.key,
  // key: 'key',
  params: {
    // should scream here
    paramA: 'test',
  },
});

// right type const testOfAll: ParameterizedKeyed<"parameterized-B", "paramB" | "mikes-param-B">
// PRO: suggests the correct params
const testOfAll = takesOneOfAll({
  key: 'parameterized-B',
  params: {
    'mikes-param-B': 'test',
    paramB: 'test',
  },
});

const testOfAll2 = takesOneOfAll({
  key: 'parameterized-A',
  params: {
    paramA: 'test',
    'mikes-param': 'test',
  },
});
