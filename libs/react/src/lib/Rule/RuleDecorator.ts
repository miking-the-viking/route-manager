import 'reflect-metadata';
import ConstructorTypeWithCreate from '../types/ConstructorTypeWithCreate';
import RuleConfig from '../types/RuleConfig';
/**
 * Map of all class RuleConfigs
 */
type RuleMap<T> = Record<string, RuleConfig<T>>;

const RULES: RuleMap<any> = {};
const PROPERTY_KEY = Symbol('rules');

/**
 * Decorator to register a class as a model that should be used with the `evaluator` calls
 */
function RuleDecorator<T>(Target: ConstructorTypeWithCreate<T>) {
  const classMetadata = Reflect.getMetadata(PROPERTY_KEY, Target);
  console.log(classMetadata);
  // const { defaults, options } = Object.keys(classMetadata).reduce(
  //   (acc, key) => {
  //     // grab any values from property decorators to apply here
  //     // acc.defaults[key] = classMetadata[key].defaultValue;
  //     // acc.options[key] = classMetadata[key].options;

  //     return acc;
  //   },
  //   { defaults: {}, options: {} } as any
  // );
  RULES[Target.name] = {
    class: Target,
  };

  return Target;
}

export default RuleDecorator;
