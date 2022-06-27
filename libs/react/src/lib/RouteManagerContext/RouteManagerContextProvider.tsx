import { PropsWithChildren, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Route from '../Route/Route';
import evaluate from '../Rule/evaluate';
import RouteManagerContext from './RouteManagerContext';
import { RouteManagerState } from './RouteManagerState';

type RouteManagerContextProviderProps<State extends Record<string, any>> = {
  state: State; // | () => State// TODO: Will a function be better?
  routes: Route<State>[];
} & PropsWithChildren;

const RouteManagerContextProvider = <State extends Record<string, any>>({
  children,
  state,
  routes,
}: RouteManagerContextProviderProps<State>) => {
  console.log('RouteManagerContextProvider');

  const params = useParams();
  const checkRoute = useCallback(
    (route: Route<State>) => {
      console.log('checkRoute', route, params);

      // if route does not have rules, they can access it
      if (!route.rules || route.rules.length === 0) return true;

      // all rules must pass to access the route
      const failureMessage = route.rules
        .map((rule) => {
          console.log('Evaluating rule ', rule);
          evaluate(rule);
          return undefined;
        })
        .filter((v) => !!v);

      console.log('failure message: ', failureMessage);
      return false;
    },
    [params]
  );

  // Type safety to the RouteManagerContext, for convenience
  const AppStateTypedRouteManagerContext = RouteManagerContext as React.Context<
    RouteManagerState<State>
  >;

  return (
    <AppStateTypedRouteManagerContext.Provider
      value={{
        routes,
        state,
        checkRoute,
      }}
    >
      {children}
    </AppStateTypedRouteManagerContext.Provider>
  );
};

export default RouteManagerContextProvider;
