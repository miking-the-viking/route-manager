import ConstructorTypeWithCreate from './ConstructorTypeWithCreate';

/**
 * Map of a class constructor and its parameters default values for the factory
 */
type RuleConfig<R> = {
  class: ConstructorTypeWithCreate<R>;
  instance: InstanceType<ConstructorTypeWithCreate<R>>;
};

export default RuleConfig;
