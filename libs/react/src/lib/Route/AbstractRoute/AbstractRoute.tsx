import { lazy, Suspense } from 'react';
import RouteWrapper from '../../components/RouteWrapper/RouteWrapper';
import ImportComponentFunc from '../../types/ImportComponentFunc';
import UseTitle from '../../types/UseTitle';

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

export default AbstractRoute;
