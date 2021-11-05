/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { lazy } from 'react';
import AsyncComponent from './AsyncComponent';
import RouteComponentWrapper from './RouteComponentWrapper';

export type RouteInput<RouterState extends Record<string, any>> = {
  /**
   * Distinct key for this route which can be used anywhere in the application as distinct identifier
   *
   * @example
   * ```
   * export const USERS_PROFILE = Symbol('UsersProfile');
   * ```
   *
   * @todo Used in conjunction with `allowedRouteBySymbol` to immediately retrieve the absolute route for a given route by the rotue symbol and optional parameters
   */
  key: symbol;

  /**
   * The relative url path that router should match to
   */
  path: string;

  /**
   * The name of the route
   */
  name: string;
  /**
   * Function which imports the component.
   *
   * The function definition ensures that it is imported lazily
   *
   * @example
   * ```
   * // since the WELCOME.route is a sibling file of the Welcome.tsx component
   * importComponent: () => import('./Welcome'),
   * ```
   */
  importComponent: () => Promise<any>;

  /**
   * Indicate if this is to be the default fallback route
   */
  default?: boolean;

  /**
   * If the route has nested children, they will be defined here
   */
  children?: Route<RouterState>[];

  /**
   *
   */
  slugs?: (
    state?: RouterState
  ) => Promise<{ name: string; params: Record<string, any> }[]>;
};

class Route<RouterState extends Record<string, any>> {
  public readonly key: symbol;
  public readonly path: string;
  public readonly name: string;
  public readonly element: JSX.Element;
  public readonly default: boolean;
  public readonly children?: Route<RouterState>[];

  /**
   * A Static route is one that does not contain any dynamic slugs, may still be a descendant of a dynamic slug route.
   */
  static Static<RouterState extends Record<string, any>>(
    routeProps: RouteInput<RouterState>
  ) {
    return new Route<RouterState>(routeProps);
  }

  static Dynamic<RouterState extends Record<string, any>>(
    routeProps: RouteInput<RouterState>
  ) {
    return new Route<RouterState>(routeProps);
  }

  constructor({
    path,
    key,
    name,
    importComponent: componentImportFunction,
    default: defaultInput = false,
    children,
  }: RouteInput<RouterState>) {
    this.key = key;
    this.path = path;
    this.name = name;
    this.children = children;
    this.default = defaultInput;

    const lazyLoadedComponent = lazy(async () => {
      const Component = await componentImportFunction();
      return {
        default: RouteComponentWrapper(this, Component.default),
      };
    });

    this.element = <AsyncComponent Component={lazyLoadedComponent} />;
  }
}

export default Route;
