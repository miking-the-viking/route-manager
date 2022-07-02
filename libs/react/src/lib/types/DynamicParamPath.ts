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

export default DynamicParamPath;
