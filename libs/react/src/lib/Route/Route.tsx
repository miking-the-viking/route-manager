import { lazy, Suspense } from 'react';
import RouteEvaluationWrapper from '../RouteEvaluationWrapper/RouteEvaluationWrapper';

type RouteInput<State extends Record<string, any>> = {
  /**
   * The Route's `path`, direct translation to RouteObject
   */
  path: string;

  /**
   * The Route's `title`, used for titling the page with an option to use a hook
   */
  title: string | (() => string);

  /**
   * `children` is used for the `children` of the the RouterObject
   */
  children?: RouteInput<State>[];

  /**
   * Function which imports the component. Used for `element` in the RouterObject
   *
   * The function definition ensures that it is imported lazily
   *
   * THE COMPONENT MUST BE THE DEFAULT EXPORT
   *
   * @example
   * ```
   * // since the WELCOME.route is a sibling file of the Welcome.tsx component
   * importComponent: () => import('./Welcome'),
   * ```
   */
  importComponent: () => Promise<Record<string, any> | { default: Element }>; // TODO: Double check JSX.Element vs. Element
};

class Route<State extends Record<string, any>> {
  public readonly element: JSX.Element;
  constructor(
    public readonly title: RouteInput<State>['title'],
    public readonly path: RouteInput<State>['path'],
    importComponent: RouteInput<State>['importComponent'],
    public readonly children: RouteInput<State>['children']
  ) {
    // setup the `element` property using the `importComponent` method
    // this will be a lazily loaded component and will simultaneously provide
    // an entry point for evaluating redirection rules
    const LazilyLoadedComponent = lazy(async () => {
      const Component = await importComponent();
      return {
        default: RouteEvaluationWrapper<State>(this, Component.default),
      };
    });
    this.element = (
      <Suspense fallback={<p>Loading...</p>}>
        <LazilyLoadedComponent />
      </Suspense>
    );
  }

  /**
   * Create a Route instance from a RouteInput object
   *
   */
  static create<State extends Record<string, any>>({
    title,
    path,
    importComponent,
    children,
  }: RouteInput<State>) {
    return new Route(title, path, importComponent, children);
  }
}

export default Route;
