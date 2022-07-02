import { PropsWithChildren, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Route from '../Route/Route';
import evaluate from '../Rule/evaluate';
import RouteManagerContext from './RouteManagerContext';
import { RouteManagerState } from './RouteManagerState';

type RouteManagerContextProviderProps<State extends Record<string, any>> = {
  // useState: State | (() => State); // TODO: Will a function be better?
  useState: () => State;
  routes: Route<State>[];
} & PropsWithChildren;

const RouteManagerContextProvider = <State extends Record<string, any>>({
  children,
  useState,
  routes,
}: RouteManagerContextProviderProps<State>) => {
  console.log('RouteManagerContextProvider');

  const state = useState();

  const params = useParams();
  const checkRoute = useCallback(
    (route: Route<State>) => {
      console.log('checkRoute', route, params, state);

      // if route does not have rules, they can access it
      if (!route.rules || route.rules.length === 0) return true;

      // all rules must pass to access the route
      const failureMessage = route.rules
        .map((rule) => evaluate(rule as any)(params, state))
        .filter((v) => !!v);

      console.log('failure message: ', failureMessage);
      return false;
    },
    [params, state]
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
