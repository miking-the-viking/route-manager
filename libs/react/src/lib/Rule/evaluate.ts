import ConstructorTypeWithCreate from '../types/ConstructorTypeWithCreate';
import RuleEvaluator from '../types/RuleEvaluator';
import Rule from './Rule';
import { getRuleConfig } from './RuleDecorator';

function evaluate<
  T extends { new (...args: any[]): InstanceType<T> } & {
    create(args: Record<string, any>): InstanceType<T>;
  },
  P extends Record<string, any>
>(Target: ConstructorTypeWithCreate<T>): RuleEvaluator<T, P> {
  // TODO: This needs to be safer
  const { instance } = getRuleConfig(Target);
  return (instance as Rule<T>).evaluator;
}

export default evaluate;
