/**
 * Utility type for defining a construtor
 */
// eslint-disable-next-line @typescript-eslint/ban-types
type ConstructorType<R> = R extends { new (...args: any[]): {} } ? R : never;
export default ConstructorType;
