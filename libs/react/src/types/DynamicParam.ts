/**
 * A dynamic route has defined slugs which have matching keys in the params object.
 *
 * For each key, "key" in the params object for a route, a corresponding ":key" must be present in the `path` string
 *
 * @example
 * DynamicParam<'stuff'> = ":stuff"
 */
type DynamicParam<S extends string> = `:${S}`;

export default DynamicParam;
