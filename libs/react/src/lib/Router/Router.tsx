import SafeLink from '../components/SafeLink/SafeLink';
import Route from '../Route/Route';

type KeyOfRoutes<
  Key extends string,
  AppState extends Record<string, any>
> = Route<Key, AppState>['key'];

class Router<Key extends string, AppState extends Record<string, any>> {
  public readonly Link: typeof SafeLink<KeyOfRoutes<Key, AppState>>;
  constructor(public readonly routes: Route<Key, AppState>[]) {
    this.Link = SafeLink;
  }

  /**
   * `generate` is used for an applications router file.
   * Use this to generate type-safe router methods based on the application routes
   */
  static generate<Key extends string, State extends Record<string, any>>(
    routes: Route<Key, State>[]
  ) {
    return new Router(routes);
  }
}

export default Router;
