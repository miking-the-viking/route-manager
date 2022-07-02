// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RuleEvaluator<
  T extends Record<string, any>,
  P extends Record<string, any> = Record<string, any>
> = (params: P, state: T) => null | string;
export default RuleEvaluator;
