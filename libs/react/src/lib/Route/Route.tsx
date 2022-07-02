import { lazy, Suspense } from 'react';
import RouteWrapper from '../components/RouteWrapper/RouteWrapper';
import IRoute from './IRoute.interface';
import RouteProps from './RouteProps.type';

/**
 * This `Route` class is used to both define a Route Manager Route and a React Router Route (the configuration aligns)
 *
 * Simply use the `Route.create` method to get a typesafe initialization of a Route instance which can be plugged directly into React Router, if necessary.
 */
class Route<
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
