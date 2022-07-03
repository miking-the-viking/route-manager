import ParameterizedRoute from '../../Route/ParameterizedRoute/ParameterizedRoute';
import StaticRoute from '../../Route/StaticRoute/StaticRoute';

export interface RouteManagerState<
  Key extends string,
  RouterState extends Record<string, any>,
  ParamKeys extends string
> {
  /**
   * Application state used for route generation and rule evaluation
   */
  state: RouterState;
  /**
   * All known routes in the application
   */
  routes: Array<
    | StaticRoute<Key, RouterState>
    | ParameterizedRoute<Key, ParamKeys, RouterState>
  >;

  /**
   * Check if route is accessible
   *
   * Returns true if the route can be accessed, false otherwise
   */
  checkRoute: (
    route:
      | StaticRoute<Key, RouterState>
      | ParameterizedRoute<Key, ParamKeys, RouterState>
  ) => boolean;

  // redirectCheck: (route: Route<RouterState>, params: Record<string, any>) => void;

  // allowedRoutes: ProcessedRouteConfig<RouterState>[];
  // setVariantState: (
  //   key: keyof RouterState,
  //   value: RouterState[typeof key]
  // ) => void;
  // activeRoute:
  //   | ProcessedRouteConfig<RouterState>
  //   | {k
  //       [key: string]: ProcessedRouteConfig<RouterState>;
  //     }
  //   | null;
  // activeRoute: string | null;
  /**
   * Resolves an allowed, processed route by it's route symbol and optional route parameters (as defined by the route's configuration)
   */
  // allowedRouteBySymbol: (
  //   routeKey: symbol,
  //   params?: Record<string, unknown>
  // ) => ProcessedRouteConfig<RouterState> | null;
}
