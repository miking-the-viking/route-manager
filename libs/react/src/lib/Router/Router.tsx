import SafeLink from '../components/SafeLink/SafeLink';
import ParameterizedRoute from '../Route/ParameterizedRoute/ParameterizedRoute';
import Route from '../Route/Route';
import StaticRoute from '../Route/StaticRoute/StaticRoute';

type KeyOfRoutes<
  Key extends string,
  AppState extends Record<string, any>
> = StaticRoute<Key, AppState>['key'];

class Router<
  Key extends string,
  AppState extends Record<string, any>,
  ParamKeys extends string
> {
  public readonly Link: typeof SafeLink<KeyOfRoutes<Key, AppState>>;
  constructor(
    /**
     * Routes for a router are an array of Static and ParameterizedRoutes
     */
    public readonly routes: (
      | StaticRoute<Key, AppState>
      | ParameterizedRoute<Key, ParamKeys, AppState>
    )[]
  ) {
    this.Link = SafeLink;
  }

  /**
   * `generate` is used for an applications router file.
   * Use this to generate type-safe router methods based on the application routes
   */
  static generate<
    Key extends string,
    State extends Record<string, any>,
    ParamKeys extends string
  >(
    /**
     * Routes are an array of Static and Parameterized routes
     */
    routes: (
      | StaticRoute<Key, State>
      | ParameterizedRoute<Key, ParamKeys, State>
    )[]
  ) {
    return new Router(routes);
  }
}

export default Router;
