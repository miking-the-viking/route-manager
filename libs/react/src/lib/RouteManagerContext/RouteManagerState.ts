import Route from '../Route/Route';

export interface RouteManagerState<RouterState extends Record<string, any>> {
  /**
   * Application state used for route generation and rule evaluation
   */
  state: RouterState;
  /**
   * All known routes in the application
   */
  routes: Route<RouterState>[];

  /**
   * Check if route is accessible
   *
   * Returns true if the route can be accessed, false otherwise
   */
  checkRoute: (route: Route<RouterState>) => boolean;

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
