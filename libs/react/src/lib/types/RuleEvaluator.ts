// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RuleEvaluator<T extends Record<string, any>> = (state: T) => null | string;
export default RuleEvaluator;
