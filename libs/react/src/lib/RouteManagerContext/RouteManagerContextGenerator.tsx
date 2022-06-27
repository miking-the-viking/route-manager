import React from 'react';
import { Helmet } from 'react-helmet-async';
import Route from '../Route/Route';

export interface RouteManagerState<
  RouterState extends Record<string, unknown>
> {
  routes: Route<RouterState>[];
  // allowedRoutes: ProcessedRouteConfig<RouterState>[];
  state: RouterState;
  // setVariantState: (
  //   key: keyof RouterState,
  //   value: RouterState[typeof key]
  // ) => void;
  // activeRoute:
  //   | ProcessedRouteConfig<RouterState>
  //   | {
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
  // redirectCheck: (route: Route, params: Record<string, any>) => void;
}

function RouteManagerContextGenerator<T extends Record<string, any>>({
  routes,
  state,
}: {
  routes: Route<T>[];
  state: T;
}) {
  const RouteManagerContext = React.createContext<RouteManagerState<any>>({
    routes: [],
    // allowedRoutes: [],
    // activeRoute: null,
    // setVariantState: () => {
    //   /** */
    // },
    state: {},
    // allowedRouteBySymbol: () => null,
    // redirectCheck: () => {
    //
    // },
  });
  const RouteManagerConsumer = RouteManagerContext.Consumer;
  /**
   *
   * Convenience hook for `useContext(RouteManagerContext)`
   */
  const useRouteManagerContext = () => React.useContext(RouteManagerContext);

  /**
   * Convenience hook used to check a Route config against the current Router state,
   * redirecting if the rules fail.
   *
   * @param route
   */
  function useRouteRedirectCheck<
    RouterState extends Record<string, unknown> = any
  >(route: Route<RouterState>) {
    return null;
    // const { state, redirectCheck, allowedRouteBySymbol } =
    //   useRouteManagerContext();

    // const params = useParams();

    // useEffect(() => {
    //   redirectCheck(route, params);
    // }, [redirectCheck, params, route, state]);

    // return allowedRouteBySymbol(route.key, params);
  }

  /**
   * RouteEvaluationWrapper is a function used to bind the Route configuration object to its Page component.
   *
   * This handles applying any automatic redirect rules as necessary, defined by the Route config.
   *
   */
  const RouteEvaluationWrapper =
    <State extends Record<string, any>>(route: Route<State>, Component: any) =>
    () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      //   const loadingState = useRouteRedirectCheck(route);
      // TODO: check redirects

      // eslint-disable-next-line react-hooks/rules-of-hooks
      // const params = useParams();
      //   console.log('hey');

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const title =
        typeof route.useTitle === 'string' ? route.useTitle : route.useTitle();

      const HelmetWrappedComponent = () => (
        <>
          <Helmet>
            <title>{title}</title>
          </Helmet>
          {/* Must not render the component unless the useRouteRedirectCheck returns true */}
          {/* {loadingState ? <Component /> : null} */}
          <Component />
        </>
      );

      return <HelmetWrappedComponent />;
    };

  return {
    RouteManagerContext,
    RouteManagerConsumer,
    useRouteManagerContext,
    useRouteRedirectCheck,
    RouteEvaluationWrapper,
  };
}

export default RouteManagerContextGenerator;
