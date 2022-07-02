import { lazy, Suspense } from 'react';
import RouteWrapper from '../components/RouteWrapper/RouteWrapper';
import DynamicParamPath from '../types/DynamicParamPath';
import IRoute from './IRoute.interface';
import RouteProps from './RouteProps.type';

type ImportComponentFunc = () => Promise<
  Record<string, any> | { default: Element }
>;

/**
 * AbstractRoute defines the shared abstract basics of a Route
 *
 *    - `key` - a Generic extending `string`, should be the unique string literal representing this Route in the application
 *    - `path` - a Generic that *should* extend `string`, should be the type-safe path for this route
 */
abstract class AbstractRoute<Key extends string, Path> {
  /**
   * React Router `element`, the JSX Element that will be rendered by this route
   */
  public readonly element: JSX.Element;

  constructor(
    /**
     * Distinct `key` used to identify this route uniquely in the application from other registered component routes
     */
    public readonly key: Key,
    /**
     * The Route's `path`
     */
    public readonly path: Path,
    /**
     * Import method for default export component file to be used as the rendered page
     */
    importComponent: ImportComponentFunc,
    /**
     * The Route's `children`
     */
    public readonly children?: AbstractRoute<Key, Path>[]
  ) {
    this.element = AbstractRoute<Key, Path>.lazyElement(importComponent, this);
  }

  /**
   * Given the `importComponent` prop and the corresponding `Route` instance will utilize the `default`
   * export of the `importComponent` and apply the `RouteWrapper` to it.
   *
   * This will then return a suspenseful Lazily loaded component.
   */
  private static lazyElement<Key extends string, Path>(
    importComponent: ImportComponentFunc,
    route: AbstractRoute<Key, Path>
  ) {
    // setup the `element` property using the `importComponent` method
    // this will be a lazily loaded component and will simultaneously provide
    // an entry point for evaluating redirection rules
    const LazilyLoadedComponent = lazy(async () => {
      const Component = await importComponent();
      return {
        // TODO: RouteWrapper uses State
        default: RouteWrapper<Key, Path>(route, Component.default),
      };
    });
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <LazilyLoadedComponent />
      </Suspense>
    );
  }
}

/**
 * A StaticRoute is non-parameterized ensuring that the `path` will always be consistent, like `'welcome'` or `'*'`
 *
 * In this case it extends the AbstractRoute with the `path` being any `string`
 */
class StaticRoute<Key extends string> extends AbstractRoute<Key, string> {
  constructor(
    key: Key,
    path: string,
    importComponent: ImportComponentFunc,
    children?: AbstractRoute<Key, string>[]
  ) {
    super(key, path, importComponent, children);
  }

  static create<Key extends string, Path extends string>({
    key,
    path,
    importComponent,
    children,
  }: {
    key: Key;
    path: string;
    importComponent: ImportComponentFunc;
    children?: AbstractRoute<Key, Path>[];
  }) {
    return new StaticRoute<Key>(key, path, importComponent, children);
  }
}

/**
 * A ParameterizedRoute is requires parameters, leading to a dynamic path string literal, like `users/:id` or `:company/users/:id`
 *
 * It requires an additional generic to represent the keys of `params` in order to properly restrict the Path generic of the AbstractRoute
 *
 */
class ParameterizedRoute<
  Key extends string,
  ParamKeys extends string
> extends AbstractRoute<Key, DynamicParamPath<ParamKeys>> {
  constructor(
    key: Key,
    public override readonly path: DynamicParamPath<ParamKeys>,
    public readonly params: Record<ParamKeys, string>,
    importComponent: ImportComponentFunc,
    children?: AbstractRoute<Key, DynamicParamPath<ParamKeys>>[]
  ) {
    super(key, path, importComponent, children);
  }
  static create<Key extends string, ParamKeys extends string>({
    key,
    path,
    params,
    importComponent,
  }: {
    key: Key;
    path: DynamicParamPath<ParamKeys>;
    params: Record<ParamKeys, string>;
    importComponent: ImportComponentFunc;
    children?: AbstractRoute<Key, DynamicParamPath<ParamKeys>>[];
  }) {
    return new ParameterizedRoute<Key, ParamKeys>(
      key,
      path,
      params,
      importComponent
    );
  }
}

/**
 * Typesafe casting of StaticRoute and ParameterizedRoute
 */
const StaticOrParameterizedRoute: typeof StaticRoute &
  typeof ParameterizedRoute = ParameterizedRoute as any;

class Route {
  /**
   * Given the `importComponent` prop and the corresponding `Route` instance will utilize the `default`
   * export of the `importComponent` and apply the `RouteWrapper` to it.
   *
   * This will then return a suspenseful Lazily loaded component.
   */
  private static lazyElement<
    Key extends string,
    State extends Record<string, any>
  >(
    importComponent: () => Promise<Record<string, any> | { default: Element }>,
    route: AbstractRoute<Key, State> // TOOD: is this type right?
  ) {
    // setup the `element` property using the `importComponent` method
    // this will be a lazily loaded component and will simultaneously provide
    // an entry point for evaluating redirection rules
    const LazilyLoadedComponent = lazy(async () => {
      const Component = await importComponent();
      return {
        default: RouteWrapper<Key, State>(route, Component.default),
      };
    });
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <LazilyLoadedComponent />
      </Suspense>
    );
  }

  /**
   * Create a Route instance from a RouteInput object
   */
  static create = StaticOrParameterizedRoute.create;
}

const FAKE_IMPORT_COMPONENT = () =>
  Promise.resolve({ default: () => <p>test</p> });

// Allows for static route with `*` path
Route.create({
  key: 'static *',
  importComponent: FAKE_IMPORT_COMPONENT,
  path: '*',
});

// Allows for static route with `string` path
Route.create({
  key: 'static string',
  importComponent: FAKE_IMPORT_COMPONENT,
  path: 'scooby-dooby/doo',
});

// Allows for type-safe, parameterized `path` string literal using optionally defined `params`
Route.create({
  key: 'parameterized route',
  importComponent: FAKE_IMPORT_COMPONENT,
  params: {
    param1: 'test',
  },
  path: ':param1',
});

// Error if missing defined parameters in path,
// Route.create({
//   key: 'parameterized route error',
//   params: {
//     param1: 'test',
//     param2: 'test',
//   },
//   path: ':param1/',
// });
// BEFORE INTRODUCING PARAMETERIZED-PATH TYPE-SAFETY BELOW

/**
 * This `Route` class is used to both define a Route Manager Route and a React Router Route (the configuration aligns)
 *
 * Simply use the `Route.create` method to get a typesafe initialization of a Route instance which can be plugged directly into React Router, if necessary.
 */
class RouteOld<
  /**
   * Generic to represent the string tuple of all Route `key` values
   */
  Key extends string,
  /**
   * Generic to represent all App State relevant to the Router
   */
  State extends Record<string, any>
> implements IRoute<Key, State>
{
  /**
   * React Router `element`, the JSX Element that will be rendered by this route
   */
  public readonly element: JSX.Element;
  constructor(
    /**
     * Distinct `key` used to identify this route uniquely in the application from other registered component routes
     */
    public readonly key: Key,
    /**
     * Custom route-specific hook used to title the page on load using Helmet
     */
    public readonly useTitle: IRoute<Key, State>['useTitle'],
    /**
     * The Route's `path`
     */
    public readonly path: IRoute<Key, State>['path'],
    /**
     * Import method for default export component file to be used as the rendered page
     */
    importComponent: RouteProps<Key, State>['importComponent'],
    /**
     * The Route's `children`
     */
    public readonly children: IRoute<Key, State>['children'],
    /**
     * The Route's `rules`
     */
    public readonly rules: IRoute<Key, State>['rules']
  ) {
    this.element = Route<Key, State>.lazyElement(importComponent, this);
  }

  /**
   * Given the `importComponent` prop and the corresponding `Route` instance will utilize the `default`
   * export of the `importComponent` and apply the `RouteWrapper` to it.
   *
   * This will then return a suspenseful Lazily loaded component.
   */
  private static lazyElement<
    Key extends string,
    State extends Record<string, any>
  >(
    importComponent: () => Promise<Record<string, any> | { default: Element }>,
    route: Route<Key, State>
  ) {
    // setup the `element` property using the `importComponent` method
    // this will be a lazily loaded component and will simultaneously provide
    // an entry point for evaluating redirection rules
    const LazilyLoadedComponent = lazy(async () => {
      const Component = await importComponent();
      return {
        default: RouteWrapper<Key, State>(route, Component.default),
      };
    });
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <LazilyLoadedComponent />
      </Suspense>
    );
  }

  /**
   * Create a Route instance from a RouteInput object
   */
  static create<Key extends string, State extends Record<string, any>>({
    key,
    useTitle,
    path,
    importComponent,
    children,
    rules,
  }: RouteProps<Key, State>) {
    return new Route<Key, State>(
      key,
      useTitle,
      path,
      importComponent,
      children,
      rules
    );
  }
}

export default Route;
