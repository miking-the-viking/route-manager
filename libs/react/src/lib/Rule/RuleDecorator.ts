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
 * Retrieves the factory config from FACTORIES, or throws an error
 */
export function getRuleConfig<T>(Target: ConstructorTypeWithCreate<T>) {
  if (!RULES[Target.name])
    throw Error(
      `${Target.name} is not a registered factory class. Add the @FactoryModel decorator to it`
    );
  return RULES[Target.name];
}

/**
 * Decorator to register a class as a model that should be used with the `evaluator` calls
 */
function RuleDecorator<T>(Target: ConstructorTypeWithCreate<T>) {
  const classMetadata = Reflect.getMetadata(PROPERTY_KEY, Target);
  console.log(classMetadata);
  // TODO: Decorate evaluator function
  // const { defaults, options } = Object.keys(classMetadata).reduce(
  //   (acc, key) => {
  //     // grab any values from property decorators to apply here
  //     // acc.defaults[key] = classMetadata[key].defaultValue;
  //     // acc.options[key] = classMetadata[key].options;

  //     return acc;
  //   },
  //   { defaults: {}, options: {} } as any
  // );

  const instance = Target.create({}) as InstanceType<typeof Target>;
  RULES[Target.name] = {
    class: Target,
    instance,
  };

  return Target;
}

export default RuleDecorator;
