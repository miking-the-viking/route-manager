// /**
//  * Step 1. Define an object type with a `key` property that's a generic string
//  */
// type Keyed<K extends string> = {
//   key: K;
// };

// /**
//  * Step 2. Easy generator function to eliminate the need of the consumer including `as const`
//  */
// function makeKeyed<K extends string>(keyed: Keyed<K>): Keyed<K> {
//   return keyed;
// }

// /**
//  * Prove that step 2 works
//  */
// const KEYED = makeKeyed({
//   key: 'keyed-uniquely',
// });

// function takesKeyed<K extends string>(keyed: Keyed<K>) {
//   return keyed.key;
// }
// // `uniqueKey` type is 'keyed-uniquely'
// const uniqueKey = takesKeyed(KEYED); //?

// // Step 3. Extend Keyed by defining a `params` Record
// type ParameterizedKeyed<K extends string, P extends string> = Keyed<K> & {
//   params: Record<P, string>;
// };

// // Step 4. Easy generator function to eliminate the need of the consumer including `as const`
// function makeParameterizedKeyed<K extends string, P extends string>(
//   paramKeyed: ParameterizedKeyed<K, P>
// ): ParameterizedKeyed<K, P> {
//   return paramKeyed;
// }

// const KEYED_WITH_PARAMS = makeParameterizedKeyed({
//   key: 'keyed-with-unique-params',
//   params: {
//     param1: 'string value', // function to validate?
//     param2: 'test',
//   },
// });

// function takesParamKeyed<K extends string, P extends string>(
//   parakKeyed: ParameterizedKeyed<K, P>
// ) {
//   return parakKeyed;
// }

// // `uniqueParamKey` is ParameterizedKeyed<"keyed-with-unique-params", "param1" | "param2">
// const uniqueParamKey = takesParamKeyed(KEYED_WITH_PARAMS); //?

// // Step 5. Put it together by overloading a generator function

// function makeKeyedOrParameterized<K extends string>(keyed: Keyed<K>): Keyed<K>;
// function makeKeyedOrParameterized<K extends string, P extends string>(
//   paramed: ParameterizedKeyed<K, P>
// ): ParameterizedKeyed<K, P>;
// function makeKeyedOrParameterized<K extends string, P extends string>(
//   keyedOrParamKeyed: any
// ): any {
//   return keyedOrParamKeyed;
// }

// const keyed = makeKeyedOrParameterized({
//   key: 'only-keyed',
// });

// const parameterized = makeKeyedOrParameterized({
//   key: 'parameterized-keyed',
//   params: {
//     param1: 'test',
//     'mikes-param': 'test2',
//   },
// });

// //
// //
// //

// function isKeyed<K extends string>(what: any): what is Keyed<K> {
//   return what && what.key;
// }

// function isParameterized<K extends string, P extends string>(
//   what: any
// ): what is ParameterizedKeyed<K, P> {
//   return what && what.key && what.params;
// }

// // Overloads must be from most specific to most broad, the last is used for the body and not the signature
// // The compiler will stop at the very first exact match
// function usesKeyedOrParameterized<K extends string, P extends string>(
//   paramed: ParameterizedKeyed<K, P>
// ): [K, ParameterizedKeyed<K, P>['params']];
// function usesKeyedOrParameterized<K extends string>(keyed: Keyed<K>): [K];
// function usesKeyedOrParameterized(keyedOrParamed: any): any {
//   if (isParameterized(keyedOrParamed))
//     return [keyedOrParamed.key, keyedOrParamed.params];
//   if (isKeyed(keyedOrParamed)) return [keyedOrParamed.key];
//   throw Error('Unsupported arg for usesKeyedOrParameterized');
// }

// //[ 'only-keyed' ]
// const res1 = usesKeyedOrParameterized(keyed); //?
// // ["parameterized-keyed", Record<"param1" | "mikes-param", string>]
// const res2 = usesKeyedOrParameterized(parameterized); //?

// //
// //
// //
// //
// const key1 = makeKeyedOrParameterized({
//   key: 'only-key-1',
// });

// const key2 = makeKeyedOrParameterized({
//   key: 'only-key-2',
// });

// const param1 = makeKeyedOrParameterized({
//   key: 'parameterized-1',
//   params: {
//     'first-first': 'test',
//     'first-second': 'test',
//   },
// });

// const param2 = makeKeyedOrParameterized({
//   key: 'parameterized-2',
//   params: {
//     'second-first': 'test',
//     'second-second': 'test',
//   },
// });

// const ALL = [key1, key2, param1, param2];

// type KeyWithPossibleParamsArg<A extends typeof ALL[number]> =
//   A extends ParameterizedKeyed<infer K, infer P>
//     ? [ParameterizedKeyed<K, P>['key'], ParameterizedKeyed<K, P>['params']]
//     : A extends Keyed<infer K>
//     ? [Keyed<K>['key']]
//     : never;

// function doIt<A extends typeof ALL[number]>(
//   ...args: KeyWithPossibleParamsArg<A>
// ) {
//   const [key, params] = args;

//   console.log(key, params);
// }

// doIt('only-key-1');
// doIt('parameterized-1');

// function useOneOfALL<
//   A extends typeof ALL[number],
//   K extends A['key'],
//   P extends A extends ParameterizedKeyed<K, infer Param> ? Param : never
// >(key: K, params: Record<P, any>): ParameterizedKeyed<K, P>;
// function useOneOfALL<
//   A extends typeof ALL[number],
//   K extends A extends Keyed<infer Key> ? Key : never
// >(key: K): Keyed<K>;
// function useOneOfALL<A extends typeof ALL[number], K extends A['key']>(
//   key: K,
//   params?: any
// ): any {
//   const res = ALL.find((k) => k.key === key);

//   if (!res) throw Error(`${key} was not found`);

//   // if definition requires params, but overload missing params then error.
//   // TODO: Try to get this at compile time instead of run time
//   if (isParameterized(res)) {
//     if (res.params && !params)
//       throw Error(`${key} requires params but missing params in function call`);
//     return res;
//   }
//   return res;
// }

// // const missing = useOneOfALL() // function REQUIRES at least one argument
// const k = useOneOfALL('only-key-1');
// const p = useOneOfALL('parameterized-2');
