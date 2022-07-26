/* eslint-disable @typescript-eslint/ban-types */
import 'reflect-metadata';

/**
 * Utility type for defining a construtor
 */
type ConstructorType<R> = R extends { new (...args: any[]): {} } ? R : never;

/**
 * The factory requires a way to initialize the model from JSON for easy key overrides.
 * The fromJSON method must take in an object of model parameters, and return a new instance of the model
 */
// type ConstructorTypeWithFromJSON<R> = ConstructorType<R> & {
//   fromJSON(args: Record<string, any>): {};
// };
type ConstructorTypeWithKey<R, Key extends string> = ConstructorType<R> & {
  key: Key;
};

/**
 * Map of a class constructor and its parameters default values for the route
 */
type RouteConfig<R, K extends string> = {
  class: ConstructorTypeWithKey<R, K>;
  //   defaults: Parameters<ConstructorTypeWithFromJSON<R>['fromJSON']>;
  options: Options<any>;
};

/**
 * Map of all class RouteConfigs
 */
type RouteMap<T, K extends string> = Record<K, RouteConfig<T, K>>;

const ROUTES = {};
const PROPERTY_KEY = Symbol('routes');

function getRoutes<T, K extends string>(): RouteMap<T, K> {
  return ROUTES as RouteMap<T, K>;
}

/**
 * Retrieves the route config from ROUTES, or throws an error
 */
function getRouteConfig<T, K extends string>(
  Target: ConstructorTypeWithKey<T, K>
) {
  console.log(ROUTES);
  if (!ROUTES[Target.name])
    throw Error(
      `${Target.name} is not a registered route class. Add the @RouteModel decorator to it`
    );
  return ROUTES[Target.name];
}

type Options<Params extends string> = {
  dependsOn?: [...Params[], (fields: Record<Params, any>) => any];
};

// /**
//  * Use this decorator to set a default value for class properties that need to be factoried
//  */
// export function RouteDefault<Params extends string>(
//   defaultValue: any,
//   // TODO: Working on opts to add `dependsOn` syntax
//   // TODO: need object syntax that we can get multiple inputs such as patientFactory's fhirPatient depending on
//   opts?: Options<Params>
// ): PropertyDecorator {
//   return (target, property) => {
//     console.log(opts);
//     const classConstructor = target.constructor;
//     const metadata = Reflect.getMetadata(PROPERTY_KEY, classConstructor) || {};
//     metadata[property] = { defaultValue, options: opts };
//     Reflect.defineMetadata(PROPERTY_KEY, metadata, classConstructor);
//   };
// }

/**
 * Decorator to register a class as a model that should be used with the `factory` calls
 */
export function RouteModel<T>(Target: ConstructorTypeWithKey<T>) {
  const classMetadata = Reflect.getMetadata(PROPERTY_KEY, Target);
  console.log(classMetadata);
  const { defaults, options } = Object.keys(classMetadata).reduce(
    (acc, key) => {
      acc.defaults[key] = classMetadata[key].defaultValue;
      acc.options[key] = classMetadata[key].options;

      return acc;
    },
    { defaults: {}, options: {} } as any
  );
  ROUTES[Target.name] = {
    class: Target,
    // defaults,
    options,
  };

  return Target;
}

/**
 * type safe function using registered routes and params
 */
export function routeLink<
  T extends { new (...args: any[]): InstanceType<T> } & {
    fromJSON(args: Record<string, any>): {};
  }
>(Target: ConstructorTypeWithKey<T>) {
  const { class: Class, options } = getRouteConfig(Target);

  // need default params dependsOn

  // defaults can depend on 1...N other fields, sorting by length of required parameters would be ideal
  //   const dependsOnLeastToMost = Object.keys(defaults).sort((a, b) => {
  //     const [A, B] = [(options as any)[a], (options as any)[b]]; /* ? */
  //     return A?.dependsOn.length < B?.dependsOn.length
  //       ? -1
  //       : A?.dependsOn.length > B?.dependsOn.length
  //       ? 1
  //       : 0;
  //   });

  const routeCall = (args: Partial<InstanceType<T>> = {}) =>
    Class.fromJSON(args);

  return routeCall;
}

// =====================================================================
// Sample Classes
// =====================================================================

@RouteModel
class Static1 {
  public key = 'static - 1' as const;
}

// @FactoryModel
// class User2 {
//   @FactoryDefault('abc-123')
//   public id!: string

//   @FactoryDefault('thing')
//   public thing!: string

//   @FactoryDefault('this is my default name', {
//     dependsOn: [
//       'id',
//       'thing',
//       ({ id, thing }: { id: string; thing: string }) =>
//         `name is id ${id} and thing is ${thing}`
//     ]
//   })
//   public name!: string

//   constructor(id: string, name: string, thing: string) {
//     this.id = id
//     this.name = name
//     this.thing = thing
//   }

//   /**
//    * fromJSON method must be implemented and present
//    */
//   static fromJSON({ id, name, thing }: User2) {
//     return new User2(id, name, thing)
//   }
// }

// factory(User2)({ id: 'tester' }) /* ? */
