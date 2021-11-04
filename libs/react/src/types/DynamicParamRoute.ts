import DynamicParam from './DynamicParam';

/**
 * A route can support additional strings, divided by '/' around the dynamic parameter slug.
 *
 * Using Covaraiance and Contravariance (worth really reading up on and getting academic familiarity)
 *
 * @example
 * DynamicParamRoute<'param1' | 'param2'> = (":param1" | `${string}/:param1/${string}` | `:param1/${string}` | `${string}/:param1`) & (":param2" | `${string}/:param2/${string}` | `:param2/${string}` | `${string}/:param2`)
 * // Which basically works out to any valid route that inclues both those route parameters
 */
type DynamicParamRoute<T extends string> = (
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

export default DynamicParamRoute;
