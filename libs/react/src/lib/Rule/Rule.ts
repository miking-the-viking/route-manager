/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import RuleEvaluator from '../types/RuleEvaluator';

/**
 * Inputs to defining a Rule
 */
type RuleInput<State extends Record<string, any>> = {
  evaluator: RuleEvaluator<State>;
};

class Rule<State extends Record<string, any>> {
  constructor(public readonly evaluator: RuleEvaluator<State>) {}

  static create<State extends Record<string, any>>({
    evaluator,
  }: RuleInput<State>): Rule<State> {
    return new Rule<State>(evaluator);
  }
}

export default Rule;
