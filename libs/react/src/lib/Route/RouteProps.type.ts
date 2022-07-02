import IRoute from './IRoute.interface';

type RouteProps<Key extends string, State extends Record<string, any>> = {
  /**
   * Unique identifier for the Route
   *
   * @todo Should this by a symbol?
   */
  key: IRoute<Key, State>['key'];
  /**
   * The Route's `path`, direct translation to RouteObject
   */
  path: IRoute<Key, State>['path'];

  /**
   * The Route's `title`, used for titling the page with an option to use a hook
   */
  useTitle: IRoute<Key, State>['useTitle'];

  /**
   * `children` is used for the `children` of the the RouterObject
   */
  children?: IRoute<Key, State>['children'];

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
  rules?: IRoute<Key, State>['rules'];
};

export default RouteProps;
