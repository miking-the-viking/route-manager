import { lazy, Suspense } from 'react';
import RouteWrapper from '../components/RouteWrapper/RouteWrapper';
import DynamicParamPath from '../types/DynamicParamPath';
import IRoute from './IRoute.interface';
import RouteProps from './RouteProps.type';

type ImportComponentFunc = () => Promise<
  Record<string, any> | { default: Element }
>;

type UseTitle = string | (() => string);

/**
 * AbstractRoute defines the shared abstract basics of a Route
 *
 *    - `key` - a Generic extending `string`, should be the unique string literal representing this Route in the application
 *    - `path` - a Generic that *should* extend `string`, should be the type-safe path for this route
 */
export abstract class AbstractRoute<Key extends string, Path> {
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
     * Hook for the Router to compute the page's title, or static title value
     */
    public readonly useTitle: UseTitle,
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
export class StaticRoute<Key extends string> extends AbstractRoute<
  Key,
  string
> {
  constructor(
    key: Key,
    path: string,
    importComponent: ImportComponentFunc,
    useTitle: UseTitle,
    children?: AbstractRoute<Key, string>[]
  ) {
    super(key, path, importComponent, useTitle, children);
  }

  static create<Key extends string, Path extends string>({
    key,
    path,
    importComponent,
    children,
    useTitle,
  }: {
    key: Key;
    path: string;
    importComponent: ImportComponentFunc;
    children?: AbstractRoute<Key, Path>[];
    useTitle: UseTitle;
  }) {
    return new StaticRoute<Key>(key, path, importComponent, useTitle, children);
  }
}

/**
 * A ParameterizedRoute is requires parameters, leading to a dynamic path string literal, like `users/:id` or `:company/users/:id`
 *
 * It requires an additional generic to represent the keys of `params` in order to properly restrict the Path generic of the AbstractRoute
 *
 */
export class ParameterizedRoute<
  Key extends string,
  ParamKeys extends string
> extends AbstractRoute<Key, DynamicParamPath<ParamKeys>> {
  constructor(
    key: Key,
    public override readonly path: DynamicParamPath<ParamKeys>,
    public readonly params: Record<ParamKeys, string>,
    importComponent: ImportComponentFunc,
    useTitle: UseTitle,
    children?: AbstractRoute<Key, DynamicParamPath<ParamKeys>>[]
  ) {
    super(key, path, importComponent, useTitle, children);
  }
  static create<Key extends string, ParamKeys extends string>({
    key,
    path,
    params,
    importComponent,
    useTitle,
    children,
  }: {
    key: Key;
    path: DynamicParamPath<ParamKeys>;
    params: Record<ParamKeys, string>;
    importComponent: ImportComponentFunc;
    useTitle: UseTitle;
    children?: AbstractRoute<Key, DynamicParamPath<ParamKeys>>[];
  }) {
    return new ParameterizedRoute<Key, ParamKeys>(
      key,
      path,
      params,
      importComponent,
      useTitle,
      children
    );
  }
}

const StaticOrParameterizedRoute: typeof StaticRoute &
  typeof ParameterizedRoute = ParameterizedRoute as any;

class Route {
  /**
   * Create a Route instance from a RouteInput object
   */
  static create = StaticOrParameterizedRoute.create;
}

const FAKE_IMPORT_COMPONENT = () =>
  Promise.resolve({ default: () => <p>test</p> });

const SHARED = {
  importComponent: FAKE_IMPORT_COMPONENT,
  useTitle: () => 'computed page title',
};

// Allows for static route with `*` path
Route.create({
  ...SHARED,
  key: 'static *',
  path: '*',
});

// Allows for static route with `string` path
Route.create({
  ...SHARED,
  key: 'static string',
  path: 'scooby-dooby/doo',
});

// Allows for type-safe, parameterized `path` string literal using optionally defined `params`
Route.create({
  ...SHARED,
  key: 'parameterized route',
  params: {
    param1: 'test',
  },
  path: ':param1',
});

// Error if missing defined parameters in path,
// Route.create({
//   importComponent: () => Promise.resolve({ default: () => <p>test</p> }),
//   useTitle() {
//     return 'page title';
//   },
//   key: 'parameterized route error',
//   params: {
//     param1: 'test',
//     param2: 'test',
//   },
//   path: ':param1/:param2',
// });

export default Route;
