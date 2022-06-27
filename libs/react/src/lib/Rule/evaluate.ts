import ConstructorTypeWithCreate from '../types/ConstructorTypeWithCreate';
import { getRuleConfig } from './RuleDecorator';

function evaluate<
  T extends { new (...args: any[]): InstanceType<T> } & {
    create(args: Record<string, any>): InstanceType<T>;
  }
>(Target: ConstructorTypeWithCreate<T>) {
  const { instance } = getRuleConfig(Target);

  return instance.evaluate;
}

export default evaluate;
