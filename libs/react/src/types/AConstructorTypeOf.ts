// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AConstructorTypeOf<T> = new (...args: any[]) => T;

export default AConstructorTypeOf;
