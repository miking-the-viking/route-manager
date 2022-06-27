import ConstructorType from './ConstructorType';

/**
 * The rule requires a way to initialize the model from an object for easy key overrides.
 * The create static method must take in an object of model parameters, and return a new instance of the model
 */
type ConstructorTypeWithCreate<R> = ConstructorType<R> & {
  // eslint-disable-next-line @typescript-eslint/ban-types
  create(args: Record<string, any>): InstanceType<ConstructorType<R>>;
};

export default ConstructorTypeWithCreate;
