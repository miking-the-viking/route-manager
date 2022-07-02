import { lazy, Suspense } from 'react';
import RouteWrapper from '../RouteWrapper/RouteWrapper';
import ConstructorTypeWithCreate from '../types/ConstructorTypeWithCreate';

type RouteInput<State extends Record<string, any>> = {
  /**
   * The Route's `path`, direct translation to RouteObject
   */
  path: string;

  /**
   * The Route's `title`, used for titling the page with an option to use a hook
   */
  useTitle: string | (() => string);

  /**
   * `children` is used for the `children` of the the RouterObject
   */
  children?: Route<State>[];

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

  /**
   * Optional access rules
   */
  rules?: Array<ConstructorTypeWithCreate<State>>;
};

class Route<State extends Record<string, any>> {
  public readonly element: JSX.Element;
  constructor(
    public readonly useTitle: RouteInput<State>['useTitle'],
    public readonly path: RouteInput<State>['path'],
    importComponent: RouteInput<State>['importComponent'],
    public readonly children: RouteInput<State>['children'],
    public readonly rules: RouteInput<State>['rules']
  ) {
    // setup the `element` property using the `importComponent` method
    // this will be a lazily loaded component and will simultaneously provide
    // an entry point for evaluating redirection rules
    const LazilyLoadedComponent = lazy(async () => {
      const Component = await importComponent();
      return {
        default: RouteWrapper<State>(this, Component.default),
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
    useTitle,
    path,
    importComponent,
    children,
    rules,
  }: RouteInput<State>) {
    return new Route(useTitle, path, importComponent, children, rules);
  }
}

export default Route;
